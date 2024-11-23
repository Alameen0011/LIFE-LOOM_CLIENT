import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import {
  useFetchWishlistQuery,
  useRemoveWishlistMutation,
} from "@/app/service/userApiSlice";
import { useAddToCartMutation } from "@/app/service/cartApiSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const WishlistItem = ({ item, onRemove }) => {
  const [selectedSize, setSelectedSize] = useState("large");
  const [addToCart] = useAddToCartMutation();
  const navigate = useNavigate();

  const handleSizeChange = (value) => {
    setSelectedSize(value); // Update the state with the selected size
  };

  const handleAddToCart = async () => {
    try {
      const cartData = {
        productId: item?._id,
        size: selectedSize,
        price: item?.price,
        image: item?.images[0],
        productName: item?.productName,
      };

      console.log(cartData, "data for adding to cart is going");

      const res = await addToCart(cartData).unwrap();

      if (res.success) {
        toast.success("added to cart Successfully");
      }

      console.log(res, "response from adding to cart");
      // navigate("/cart");
    } catch (error) {
      console.error("Failed to add item to cart:", error);
      toast.error("please login to add to cart");
    }
  };

  return (
    <div className="  flex flex-col  sm:flex-row items-center gap-4 p-4 bg-white rounded-lg shadow">
      <img
        src={item.images[0]}
        alt={item.productName}
        width={100}
        height={100}
        className="rounded-md object-cover"
      />
      <div className="flex-1 text-center sm:text-left">
        <h3 className=" font-medium mb-2">{item.productName}</h3>

        {/* Size Selection */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {item.sizes && item.sizes.length > 0 ? (
              item.sizes.map((size) => (
                <button
                  key={size._id}
                  className={`px-3 py-2 border-2 rounded-md font-medium text-sm ${
                    selectedSize === size.size
                      ? "border-black text-black"
                      : "border-gray-300 text-gray-700 hover:border-gray-400"
                  }`}
                  disabled={size.stock === 0} 
                  onClick={() => setSelectedSize(size.size)} 
                >
                  {size.size} 
                  {size.stock === 0 && (
                    <span className="ml-2 text-xs text-red-500">
                      (Out of Stock)
                    </span>
                  )}
                </button>
              ))
            ) : (
              <p className="text-sm text-gray-500">No sizes available</p>
            )}
          </div>
        </div>

        {/* Selected Size Feedback */}
        <p className="mt-2 text-sm text-gray-500">
          Selected Size: {selectedSize || "None"}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <Button onClick={handleAddToCart} className="w-full sm:w-auto">
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add to Cart
        </Button>
        <Button
          variant="outline"
          onClick={() => onRemove(item._id)}
          className="w-full sm:w-auto"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Remove
        </Button>
      </div>
    </div>
  );
};

const EmptyState = () => {  
  const navigate = useNavigate()


  return (
    <div className="flex flex-col items-center  justify-center h-[50vh] text-center ">
    <Heart className="w-16 h-16 text-gray-300 mb-4" />
    <h2 className="text-2xl font-semibold mb-2">Your wishlist is empty</h2>
    <p className="text-gray-500 mb-4">
      Start adding items to your wishlist to keep track of what you love.
    </p>
    <Button onClick={() => navigate("/products")}>Start Shopping</Button>
  </div>

  )

}

const Wishlist = () => {
  const { data: wishListData } = useFetchWishlistQuery();
  const [removeWishlist] = useRemoveWishlistMutation();
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    console.log(wishListData, "wishlist data from api ");
    if (wishListData?.wishlist) {
      console.log(wishListData, "wishlist result from api");
      setWishlistItems(wishListData?.wishlist);
    }
  }, [wishListData]);

  const handleRemoveWishlistItem = async (itemId) => {
    console.log(itemId, "item id from on remove part");
    try {
      const res = await removeWishlist({ productId: itemId }).unwrap();
      console.log(res, "response form removing wishlist item");
      if (res.success) {
        toast.success("removed from wishlist successfully");
      }
    } catch (error) {
      console.log(error, "error while removing item from wishlist");
    }
  };

  return (
    <div className="flex-1 container mx-auto max-w-3xl p-6 bg-gray-20 min-h-screen font-primary">
      <h1 className="text-xl font-bold mb-6">My Wishlist</h1>
      {wishlistItems?.products?.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid gap-4">
          {console.log(wishlistItems)}
          {wishlistItems?.products?.map((item) => (
            <WishlistItem
              key={item._id}
              item={item}
              onRemove={handleRemoveWishlistItem}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
