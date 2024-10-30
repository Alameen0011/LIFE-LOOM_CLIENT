import axios from "axios";
import { useCallback, useState } from "react";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Save, Upload, X } from "lucide-react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import Cropper from "react-easy-crop";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { getCroppedImg } from "@/utils/getCroppedImg";
import {
  useAddProductMutation,
  useFetchCategoriesQuery,
} from "@/app/service/adminApiSlice";
import { Slider } from "../ui/slider";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ProductForm = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [image, setImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    gender: "",
    brand: "",
    sku: "",
    sizes: { S: "", M: "", L: "", XL: "" },
    images: Array(4).fill(null),
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const { data, isLoading } = useFetchCategoriesQuery();
  const [addProduct] = useAddProductMutation();

  console.log(data);

  //---Form validation helper function --
  const isValidName = (text) => {
    const regex = /^[a-zA-Z\s]*$/;
    return regex.test(text);
  };

  const isValidDescription = (text) => {
    const regex = /^[a-zA-Z0-9\s!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]*$/;
    return regex.test(text);
  };

  //--form validation
  const validateForm = useCallback(() => {
    let newErrors = {};

    // Name validation
    if (!product.name.trim()) {
      newErrors.name = "Name is required";
    } else if (!isValidName(product.name.trim())) {
      newErrors.name = "Name can only contain letters and spaces";
    }

    // Description validation
    if (!product.description.trim()) {
      newErrors.description = "Description is required";
    } else if (!isValidDescription(product.description.trim())) {
      newErrors.description = "Description contains invalid characters";
    }

    // Price validation
    if (!product.price || isNaN(product.price) || Number(product.price) <= 0) {
      newErrors.price = "Price must be a positive number";
    }

    // Category, gender, brand, and SKU validations
    if (!product.category) newErrors.category = "Category is required";
    if (!product.gender) newErrors.gender = "Gender is required";
    if (!product.brand) newErrors.brand = "Brand is required";
    if (!product.sku) newErrors.sku = "sku is required";

    // Image validation (checks if at least 3 images are uploaded)
    if (!product.images || product.images.length < 3) {
      newErrors.images = "At least 3 images is required";
    }

    // Sizes validation
    Object.entries(product.sizes).forEach(([size, stock]) => {
      if (stock === "" || isNaN(stock) || Number(stock) < 0) {
        newErrors[`sizes.${size}`] = "Stock must be a non-negative number";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [product]);

  //-----------+++++++++++++++++++++++++++++++

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;

    // Update the product state directly
    setProduct((prev) => ({ ...prev, [name]: value }));

    // Real-time validation logic
    let newError = null;

    if (name === "name") {
      if (!isValidName(value)) {
        newError = "Name can only contain letters and spaces";
      }
    } else if (name === "description") {
      if (!isValidDescription(value)) {
        newError = "Description contains invalid characters";
      }
    } else if (name === "price") {
      if (!value || isNaN(value) || Number(value) <= 0) {
        newError = "Price must be a positive number";
      }
    }
    // Set the error if there is one, otherwise clear it
    setErrors((prev) => ({ ...prev, [name]: newError }));
  }, []);

  //---------------+++++++++++++++
  const handleSizeChange = (size, value) => {
    setProduct({
      ...product,
      sizes: {
        ...product.sizes,
        [size]: value,
      },
    });

    if (errors[`sizes.${size}`]) {
      setErrors({ ...errors, [`sizes.${size}`]: null });
    }
  };

  //------------ for review purpose ---------++++++++++
  const handleImageChange = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setSelectedImageIndex(index);
    }
  };

  //------On crop completion ---------------
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  //------- saving cropped image
  const saveCroppedImage = async () => {
    try {
      const croppedImageBlob = await getCroppedImg(image, croppedAreaPixels);
      const croppedImageURL = URL.createObjectURL(croppedImageBlob);

      console.log(croppedImageURL);

      const newImages = [...product.images];
      newImages[selectedImageIndex] = croppedImageBlob;

      setProduct({ ...product, images: newImages });
      setImage(null);
      setSelectedImageIndex(null);
    } catch (error) {
      console.error("Error  while cropping image:", error);
    }
  };

  // ----------upload image to cloudinary
  const uploadImagesToCloudinary = async () => {
    const uploadPromises = product.images.map(async (file) => {
      if (!file) return null;

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "my_preset");

      try {
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/ddwfnwt9r/image/upload",
          formData
        );
        console.log(response, "response from cloudinary");
        return response.data.secure_url;
      } catch (error) {
        console.error("Error uploading image:", error);
        return null;
      }
    });

    return await Promise.all(uploadPromises);
  };

  //---------submitting the addproduct
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("on submit");
    if (!validateForm()) {
      toast.error("Please add valid credentials");
      return;
    }

    const { name, description, price, category, brand, gender, sku, sizes } =
      product;

    const sizeArray = Object.entries(sizes).map(([size, stock]) => ({
      size,
      stock: Number(stock) || 0,
    }));

    const imageUrls = await uploadImagesToCloudinary();
    const filteredImages = imageUrls.filter((url) => url !== null);

    if (filteredImages.length === 0 ) {
      toast.error("Error uploading images");

      return;
    }else if(filteredImages.length < 3){
      toast.error("at least three images are required")
      return
    }

    const newProduct = {
      name,
      description,
      price: Number(price),
      category,
      brand,
      gender,
      sku,
      sizes: sizeArray,
      images: filteredImages,
    };

    try {
      const response = await addProduct(newProduct);
      console.log(response, "response from addproduct");
      if (response) {
        navigate("/admin/products");
        toast.success(response?.data?.message);
      } else {
        toast.error("Failed to add product.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error adding product.");
    }
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <main className="flex-1 max-w-4xl mx-auto py-10 px-4">
        <div className="mb-8">
          <h2 className="text-3xl font-bold">Add Product</h2>
          <p className="text-gray-500">Dashboard &gt; product &gt; add</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <div className="grid gap-6">
                <div>
                  <Input
                    placeholder="Enter product Name"
                    label="Product Name"
                    name="name"
                    value={product.name}
                    onChange={handleChange}
                    error={errors.name} // Pass the error to the Input if your component supports it
                    max={20}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm">{errors.name}</p>
                  )}{" "}
                  {/* Error message */}
                </div>

                <div>
                  <Textarea
                    placeholder="Enter description"
                    label="Description"
                    name="description"
                    value={product.description}
                    onChange={handleChange}
                    error={errors.description}
                  />
                  {errors.description && (
                    <p className="text-red-500 text-sm">{errors.description}</p>
                  )}{" "}
                  {/* Error message */}
                </div>

                <div>
                  <Input
                    placeholder="₹ 3000"
                    label="Price"
                    name="price"
                    value={product.price}
                    onChange={handleChange}
                    error={errors.price}
                    type="number"
                    className="w-60"
                  />
                  {errors.price && (
                    <p className="text-red-500 text-sm">{errors.price}</p>
                  )}
                </div>
                <div>
                  <Input
                    placeholder="Enter SKU"
                    label="SKU"
                    name="sku"
                    value={product.sku}
                    onChange={handleChange}
                    error={errors.sku}
                    className="w-60"
                  />
                  {errors.sku && (
                    <p className="text-red-500 text-sm">{errors.sku}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <Select
                      onValueChange={(value) =>
                        setProduct({ ...product, category: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {data?.categories?.map((category) => (
                          <SelectItem key={category._id} value={category._id}>
                            {category.categoryName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.category && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.category}
                      </p>
                    )}
                  </div>

                  <div>
                    <Select
                      onValueChange={(value) =>
                        setProduct({ ...product, gender: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Kids">Kids</SelectItem>
                        <SelectItem value="unisex">Unisex</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.gender && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.gender}
                      </p>
                    )}
                  </div>
                  <div>
                    <Select
                      onValueChange={(value) =>
                        setProduct({ ...product, brand: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Brand" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="riyah">Forum</SelectItem>
                        <SelectItem value="abha">Yeso</SelectItem>
                        <SelectItem value="boni">Abha</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.brand && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.brand}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <Label className="text-base block ">
                    Sizes & Stock Management
                  </Label>
                  <div className="grid grid-cols-1 gap-4 justify-center">
                    {["S", "M", "L", "XL"].map((size) => (
                      <div
                        key={size}
                        className="flex flex-col items-start space-y-1"
                      >
                        <div className="flex items-center space-x-2">
                          <Label htmlFor={`size-${size}`} className="w-8">
                            {size}
                          </Label>
                          <Input
                            id={`size-${size}`}
                            placeholder="35"
                            value={product.sizes[size]}
                            onChange={(e) =>
                              handleSizeChange(size, e.target.value)
                            }
                            type="number"
                            min="0"
                            step="1"
                            className="w-24" /* Set a fixed width */
                          />
                        </div>
                        {/* Display individual error for each size below the input */}
                        {errors[`sizes.${size}`] && (
                          <p className="text-red-500 text-sm">
                            {errors[`sizes.${size}`]}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Array.from({ length: 4 }, (_, index) => (
                    <div key={index} className="space-y-2">
                      <Label
                        htmlFor={`image-${index}`}
                        className="text-sm font-medium text-gray-700"
                      >
                        Image {index + 1}
                      </Label>
                      <div className="flex items-center space-x-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() =>
                            document.getElementById(`image-${index}`).click()
                          }
                        >
                          <Upload className="h-4 w-4" />
                        </Button>
                        <input
                          id={`image-${index}`}
                          type="file"
                          accept="image/*"
                          onChange={(event) => handleImageChange(index, event)}
                          className="hidden"
                        />
                        {product.images[index] && (
                          <img
                            src={
                              typeof product.images[index] === "string"
                                ? product.images[index]
                                : URL.createObjectURL(product.images[index])
                            }
                            alt={`preview-${index}`}
                            className="w-16 h-16 object-cover rounded-md"
                          />
                        )}
                      </div>
                    </div>
                  ))}
                  {/* Display Image Error */}
                  {errors.images && (
                    <div className="text-red-500 text-sm">{errors.images}</div>
                  )}
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Uploading..." : "Add Product"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>

        {image && (
          <div className="fixed pt-10 inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-sm">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">Image Crop</CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2"
                  onClick={() => setImage(null)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="aspect-square relative">
                  <Cropper
                    image={image}
                    crop={crop}
                    zoom={zoom}
                    aspect={2 / 3}
                    onCropChange={setCrop}
                    onZoomChange={setZoom}
                    onCropComplete={onCropComplete}
                  />
                </div>
                <div className="mt-4 space-y-2">
                  <Label htmlFor="zoom">Zoom</Label>
                  <Slider
                    id="zoom"
                    min={1}
                    max={3}
                    step={0.1}
                    value={[zoom]}
                    onValueChange={(value) => setZoom(value[0])}
                  />
                </div>
                <Button onClick={saveCroppedImage} className="mt-4 w-full">
                  <Save className="h-4 w-4 mr-2" />
                  Save Cropped Image
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
};

export default ProductForm;
