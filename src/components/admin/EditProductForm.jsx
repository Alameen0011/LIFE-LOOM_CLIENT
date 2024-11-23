import { Button } from "../ui/button";
import { Save, Upload, X } from "lucide-react";
import { Slider } from "../ui/slider";
import { Label } from "../ui/label";
import Cropper from "react-easy-crop";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import {
  useFetchCategoriesQuery,
  useFetchSingleProductQuery,
  useUpdateProductMutation,
} from "@/app/service/adminApiSlice";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getCroppedImg } from "@/utils/getCroppedImg";
import SpinnerOverlay from "../SpinnerOvarlay";

const EditProductForm = () => {
  const { productId } = useParams();
  const {
    data,
    isLoading: isProductLoading,
    isError: productError,
    refetch: refetchProductDetails,
    isFetching,
  } = useFetchSingleProductQuery(productId);
  const { data: categoryData, isLoading: isCategoryLoading } =
    useFetchCategoriesQuery({ page: 1, limit: 4 });
  const [categories, setCategories] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [loading, setLoading] = useState(false);
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

  const [updateProducts, { isLoading: UpdationLoading }] =
    useUpdateProductMutation();

  useEffect(() => {
    // if (!productloading) {
    // console.log(data?.product, "data from fetching the API in useEffect");
    const productData = data?.product;
    // console.log(productData, "product data --  ");
    // console.log("useEffect called");
    if (!isProductLoading) {
      setProduct({
        name: productData?.productName,
        description: productData?.description,
        price: productData?.price.toString(),
        category: productData?.category._id,
        gender: productData?.gender,
        brand: productData?.brand,
        sku: productData?.sku,
        sizes: productData?.sizes
          ? productData.sizes.reduce(
              (acc, size) => {
                acc[size.size] = size.stock.toString();
                return acc;
              },
              { S: "", M: "", L: "", XL: "" }
            )
          : { S: "", M: "", L: "", XL: "" }, // Fallback default if sizes is undefined
        images: productData?.images,
      });
    }
    // }
  }, [data?.product, isProductLoading]);

  useEffect(() => {
    refetchProductDetails();
  }, [refetchProductDetails]);

  // const refetchData = () => {
  //   refetch();
  //   console.log("refetch data triggered");
  // };

  // useEffect(() => {
  //   console.log("product id changed");

  //   if (productId && !isFetching) {
  //     refetchData();
  //     console.log("refetch data called");
  //   }
  // }, [productId]);

  // useEffect(() => {
  //   if (!isFetching && data) {
  //     const productData = data?.product;
  //     setProduct({
  //       name: productData?.productName || "",
  //       description: productData?.description || "",
  //       price: productData?.price ? productData.price.toString() : "",
  //       category: productData?.category._id || "",
  //       gender: productData?.gender || "",
  //       brand: productData?.brand || "",
  //       sku: productData?.sku || "",
  //       sizes: productData?.sizes
  //         ? productData.sizes.reduce((acc, size) => {
  //             acc[size.size] = size.stock.toString();
  //             return acc;
  //           }, { S: "", M: "", L: "", XL: "" })
  //         : { S: "", M: "", L: "", XL: "" }, // Fallback default if sizes is undefined
  //       images: productData?.images || Array(4).fill(""),
  //     });
  //   }
  // }, [data, isFetching]);

  // useEffect(() => {
  //   if (categoryData) {
  //       console.log(categoryData,"category data --  ")
  //     setCategories(categoryData.categories);
  //   }
  // }, [categoryData]);

  // useEffect(() => {
  //   console.log(product,"--product state")
  // },[product])

  const validateFieldValues = (name, value) => {
    let error = "";
    switch (name) {
      case "name":
        if (!value.trim()) {
          error = "Name is required";
        } else if (!/^[a-zA-Z\s]*$/.test(value.trim())) {
          error = "Name should only contain letters and spaces";
        }
        break;

      case "description":
        if (!value.trim()) {
          error = "Description is required";
        } else if (
          !/^[a-zA-Z0-9\s!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?&]*$/.test(
            value.trim()
          )
        ) {
          error =
            "Description should only contain letters, numbers, and specific punctuation.";
        }
        break;

      case "price":
        if (!value.trim()) {
          error = "Price is required";
        } else if (!/^\d+(\.\d{1,2})?$/.test(value) || parseFloat(value) <= 0) {
          error = "Price must be a positive number";
        }
        break;

      case "brand":
        if (!value.trim()) {
          error = "Brand is required";
        }
        break;

      case "category":
        if (!value.trim()) {
          error = "Category is required";
        }
        break;

      case "gender":
        if (!value.trim()) {
          error = "Gender is required";
        }
        break;

      case "sku":
        if (!value.trim()) {
          error = "SKU is required";
        }
        break;

      case "images":
        // Check if there are at least 3 images uploaded
        if (!product.images || product.images.length < 3) {
          error = "At least 3 images are required";
        }
        break;

      default:
        // Validate sizes (for stock of each size)
        if (name.startsWith("sizes.")) {
          if (!/^\d+$/.test(value) || parseInt(value) < 0) {
            error = "Stock must be a non-negative integer";
          }
        }
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    const error = validateFieldValues(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
    setProduct((prev) => ({
      ...prev,
      [name]: name === "price" ? value : value,
    }));
  };

  const handleSizeChange = (size, value) => {
    const trimmedValue = value.trim();
    const error = validateFieldValues(`sizes.${size}`, trimmedValue);
    setErrors((prev) => ({ ...prev, [`sizes.${size}`]: error }));
    setProduct((prev) => ({
      ...prev,
      sizes: {
        ...prev.sizes,
        [size]: trimmedValue,
      },
    }));
  };

  const handleImageChange = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setSelectedImageIndex(index);
    }
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const saveCroppedImage = async () => {
    try {
      const croppedImageBlob = await getCroppedImg(image, croppedAreaPixels);
      const croppedImageURL = URL.createObjectURL(croppedImageBlob);

      console.log(croppedImageURL);

      setProduct((prevProduct) => {
        const newImages = [...prevProduct.images];
        newImages[selectedImageIndex] = croppedImageBlob;
        return { ...prevProduct, images: newImages };
      });

      setImage(null);
      setSelectedImageIndex(null);
    } catch (error) {
      console.error("Error cropping image:", error);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
  

    // Validate all fields
    const newErrors = {};
    Object.entries(product).forEach(([key, value]) => {
      if (typeof value === "string") {
        const error = validateFieldValues(key, value);
        if (error) newErrors[key] = error;
      }
    });
    Object.entries(product.sizes).forEach(([size, stock]) => {
      const error = validateFieldValues(`sizes.${size}`, stock);
      if (error) newErrors[`sizes.${size}`] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please correct the errors before submitting.");
      return;
    }

    setLoading(true);

    const { name, description, price, category, brand, gender, sku, sizes } =
      product;

    const sizeArray = Object.entries(sizes).map(([size, stock]) => ({
      size,
      stock: Number(stock),
    }));

    const imageUrls = await uploadImagesToCloudinary();
    const filteredImages = imageUrls.filter((url) => url !== null);

    if (filteredImages.length === 0) {
      toast("Error uploading images");
      return;
    }

    console.log(category, "category frontend");

    const updateProduct = {
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

    //call to put product to db

    try {
      const res = await updateProducts({
        productId: productId,
        body: updateProduct,
      });
      console.log(res);

      console.log("cart fetched after updation of product");

      if (res) {
        toast.success("product updated successfully");
        navigate("/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("error in uploading product");
    } finally {
      setLoading(false);
    }
  };

  if (!product) {
    console.log(product, "product inside  heyyy");
    return <div>Loading...</div>;
  }

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <main className="flex-1 max-w-4xl mx-auto py-10 px-4">
        <div className="mb-8">
          <h2 className="text-3xl font-semibold font-primary">Edit product</h2>
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
                      value={product.category}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {!isCategoryLoading &&
                          categoryData.categories.map((category) => (
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
                      value={product.gender}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a Gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
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
                      value={product.brand}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Brand" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Forum">Forum</SelectItem>
                        <SelectItem value="UrbanLeaf">UrbanLeaf</SelectItem>
                        <SelectItem value="EarthAura">EarthAura</SelectItem>
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
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={UpdationLoading}
                >
                  {UpdationLoading ? "updating..." : "Edit product"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
        {loading && <SpinnerOverlay message="editing product" color="green" />}

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

export default EditProductForm;
