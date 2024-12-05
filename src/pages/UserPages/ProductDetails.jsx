import { useEffect, useState } from "react";
import { useGetSingleProductQuery } from "@/app/service/productApiSlice";
import { Button } from "@/components/ui/button";
import { data } from "autoprefixer";
import { ChevronRight, Heart, Star } from "lucide-react";

import { Link, useNavigate, useParams } from "react-router-dom";
import RelatedProducts from "@/components/users/RelatedProducts";
import DescriptReview from "@/components/users/DescriptReview";
import { Box, CircularProgress } from "@mui/material";
import { Badge } from "@/components/ui/badge";
import { useAddToCartMutation } from "@/app/service/cartApiSlice";
import { toast } from "react-toastify";
import { useAddToWishlistMutation } from "@/app/service/userApiSlice";
import UserLoading from "@/components/UserLoading";

const ProductDetails = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("large");
  const [product, setProduct] = useState({});

  const { id } = useParams();
  const navigate = useNavigate();

  const { data: productData, error, isLoading } = useGetSingleProductQuery(id);
  const [addToCart] = useAddToCartMutation();
  const [addToWishlist] = useAddToWishlistMutation()

  const handleAddToCart = async () => {
    try {
      const cartData = {
        productId: product?._id,
        size: selectedSize,
        price: product?.price,
        image: product?.images[0],
        productName: product?.productName,
      };

      console.log(cartData, "data for adding to cart is going");

      const res = await addToCart(cartData).unwrap();

      console.log(res, "response from adding to cart");
      navigate("/cart");

      toast.success("added to cart successFully");
    } catch (error) {
      console.error("Failed to add item to cart:", error);
      toast.error("please login to add to cart");
    }
  };

  const handleAddToWishlist = async(id) => {
 
    try {
      const res = await addToWishlist({productId :id}).unwrap()

      if(res.success){
        toast.success("added to wishlist")
      }


      
    } catch (error) {
      console.log(error,"error while adding to wishList")
      toast.error(error.data.message)
    }
  }

  useEffect(() => {
    if (productData && productData.product) {
      const { product } = productData;
      console.log(product, "==Fetched Product");

      const updatedProduct = product.offer
        ? {
            ...product,
            discountedPrice: Math.round(
              product.price -
                product.price * (product.offer.offerPercentage / 100)
            ),
          }
        : product;

      console.log(
        updatedProduct,
        "=====Updated Product with Discount (if applicable)"
      );

      setProduct(updatedProduct);
    }
  }, [productData]);

  if (isLoading) {
    return <UserLoading/>
  }

  if (error) return <p>Error loading product</p>;

  console.log(data);

  console.log(selectedSize);

  return (
    <div className="container max-w-5xl mt-10 mx-auto px-4 py-8">
      <nav className="mb-6 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ul className="flex flex-wrap items-center gap-2 text-sm text-gray-600 font-primary">
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <ChevronRight className="w-4 h-4" />
       
          <li>{product?.category?.categoryName}</li>
          <ChevronRight className="w-4 h-4" />
          <li>{product?.productName}</li>
        </ul>
      </nav>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Image Gallery */}
        <div className="flex flex-col md:flex-row lg:w-2/3">
          {/* Thumbnails */}
          <div className="flex md:flex-col gap-2 max-w-xl mb-4 md:mb-0 md:mr-4 order-2 md:order-1">
            {product.images &&
              product.images.map((src, index) => (
                <button
                  key={index}
                  className={`relative aspect-w-1 aspect-h-1 rounded-md overflow-hidden w-1/4 md:w-20 ${
                    selectedImage === index ? "ring-2 ring-blue-500" : ""
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img
                    src={src}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
          </div>

          {/* Main Image */}
          <div className="relative h-[550px] mb-4 md:mb-0 order-1 md:order-2 flex-grow">
            <img
              src={product.images && product.images[selectedImage]}
              alt="Product image"
              className="w-full h-full object-contain rounded-lg shadow-lg"
              style={{ maxHeight: "100%", maxWidth: "100%" }} // Ensures the image fits within the container
            />
          </div>
        </div>
        {/* <div className="relative h-[550px] rounded mb-4 md:mb-0 order-1 md:order-2 flex justify-center flex-grow">
            <ReactImageMagnify
              {...{
                smallImage: {
                  alt: "Product image",
                  isFluidWidth: false,
                  src: productData.product.images[selectedImage],
                  height: 550,
                  className:
                    "w-full h-full object-contain rounded-lg shadow-lg",
                  width: 350,
                },
                largeImage: {
                  src: productData.product.images[selectedImage],
                  width: 1600, // Higher resolution image width
                  height: 1800, // Higher resolution image height
                },
                enlargedImageContainerDimensions: {
                  width: "200%",
                  height: "100%",
                },
                enlargedImagePosition: "beside",
              }}
            />
          </div>
        </div> */}

        {/* Product Details Section */}
        <div className="lg:w-1/3 bg-white  p-6 rounded-lg shadow-md">
          <h1 className="text-2xl md:text-2xl font-primary font-semibold mb-2">
            {product?.productName}
          </h1>
          <p className="text-xl md:text-xl lg:text-xl font-primary mb-4  mt-2 group-hover:text-primary transition-colors duration-300">
            { product.discountedPrice ? (
              <>
                <span className="line-through text-red-400">
                  ₹{product.price}
                </span>{" "}
                <span className="text-green-400">
                  ₹{product.discountedPrice}
                </span>
              </>
            ) : (
              `₹${product.price}`
            )}
          </p>

          <p className="mb-4 text-gray-700 font-primary">
            {product?.description}
          </p>
          <div>
            {product?.totalStock === 0 ? (
              <div className="flex pt-2 justify-end">
                <Badge
                  variant="destructive"
                  className="group-hover:animate-pulse"
                >
                  Out of stock!
                </Badge>
              </div>
            ) : (
           product?.totalStock <= 5 && (
                <div className="flex pt-2 justify-end">
                  <Badge
                    variant="destructive"
                    className="group-hover:animate-pulse"
                  >
                    Only {productData.product.totalStock} left!
                  </Badge>
                </div>
              )
            )}
          </div>

          {/* Size Selection */}
          <div className="mb-4">
            <h3 className="font-semibold font-primary mb-2">Choose Size</h3>
            <div className="flex flex-wrap gap-2">
              {console.log(product,"====Product")}
              {product.sizes && product?.sizes.map((size) => (
                <button
                  key={size._id}
                  className={`px-3 py-2 border-2 font-primary rounded-md ${
                    selectedSize === size.size
                      ? "border-black text-red"
                      : "border-gray-300 text-gray-700 hover:border-gray-400"
                  }`}
                  disabled={size.stock === 0}
                  onClick={() => setSelectedSize(size.size)}
                >
                  {size.size}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mb-6">
            <Button
              onClick={handleAddToCart}
              className="flex-1 bg-black text-white py-2 px-4 rounded-md font-primary hover:bg-black transition duration-200"
            >
              Add to Cart
            </Button>
            <button onClick={() => handleAddToWishlist(product._id)}  className="border border-grey p-2 rounded-md hover:bg-gray-100">
              <Heart className="h-4 w-6 text-green-400 fill-green-400" />
            </button>
          </div>

          {/* Offers Section */}
          <div className="space-y-2">
            <p className="text-sm font-primary">
              <span className="font-semibold font-primary">
                Get this for INR 1,299
              </span>
              <br />
              Enjoy a 15% discount on your second purchase. Use Code: SECOND15
            </p>
          </div>
        </div>
      </div>

      <DescriptReview />

      <RelatedProducts relatedProducts={productData.relatedProducts} />
    </div>
  );
};

export default ProductDetails;
