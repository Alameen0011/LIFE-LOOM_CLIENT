import { useState } from "react";
import {
  useClearCartMutation,
  useGetCartQuery,
  useUpdateCartQuantityMutation,
} from "@/app/service/cartApiSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CartNotFound from "./CartNotFound";
import UserLoading from "@/components/UserLoading";
import OrderHistoryReModal from "@/components/users/OrderHistoryReModal";


const Cart = () => {
  const [showModal, setShowModal] = useState(false);
  const [itemId, setItemId] = useState(null);

  const { data: cartItems ,isLoading } = useGetCartQuery();
  const [updateCartQuantity] = useUpdateCartQuantityMutation();
  const [clearCart] = useClearCartMutation();
  const navigate = useNavigate();

  console.log(cartItems, "cart Items");

  const updateQuantity = async (productId, newQuantity, size) => {
    if (newQuantity < 1) return;

    console.log(productId, "product id");
    console.log(newQuantity, "quantity");
    console.log(size, "size");

    const updateCredentials = {
      productId: productId,
      newQuantity,
      size,
    };

    try {
      // Await the update and unwrap the response if necessary
      const res = await updateCartQuantity(updateCredentials);

      console.log(res, "response from updateCartQuantity");

      // Handle a successful response (optional)
      if (res?.data?.success) {
        toast.success();
      } else if (res?.error) {
        console.log(res);
        console.log(res.error.data.message);
        toast.error(res.error.data.message);
      } else {
        console.error("Update failed:", res.message);
        toast.error(res.message);
      }
    } catch (error) {
      // Catch and log any errors that occur during the update
      console.error("Error updating quantity:", error);
    }
  };

  const handleCartRemoveRequest = (itemId) => {
    console.log(itemId);
    setItemId(itemId);
    setShowModal(true);
  };

  const handleConfirmCancel = async () => {
    try {
      console.log(itemId, "product item id for clearing cart");

      const res = await clearCart({ productId: itemId }).unwrap();

      console.log(res, "response from clearing product from cart ");
      if (res.success) {
        toast.success("item removed successFully");
      }
    } catch (error) {
      console.log(error, "error while removing from cart");
    } finally {
      setShowModal(false);
    }
  };

  const handleCheckout = () => {
    navigate("/order/checkout");
  };

  const subTotal =
    cartItems?.cart?.items?.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0) || 0;
  console.log(subTotal, "subtotal");

  const total = subTotal;


  if(isLoading){
    return <UserLoading/>
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto max-w-5xl  px-4">
        <h1 className="text-xl font-semibold mb-4 font-primary">
          Shopping CartPage
        </h1>
        <div className="flex flex-col justify-between lg:flex-row gap-8">
          {cartItems?.cart?.items?.length === 0 ? (
            <CartNotFound />
          ) : (
            <div className="lg:w-2/3">
              {cartItems?.cart?.items?.map((item) => (
                <div
                  key={item._id}
                  className=" bg-white rounded-lg shadow-lg p-6 mb-4"
                >
                  <div className="flex flex-col sm:flex-row items-center">
                    <img
                      src={item?.image}
                      alt={item?.productName}
                      className="w-24 h-24 object-contain rounded mb-4 sm:mb-0 sm:mr-4"
                    />
                    <div className="flex-1">
                      <h2 className="text-lg font-semibold font-primary">
                        {item.productName}
                      </h2>
                      <p className="text-sm font-primary pt-2 text-muted-foreground">
                        Size: {item.size}
                      </p>
                      <p className="text-sm font-primary pt-2 text-muted-foreground">
                        {(() => {
                          const stock = item.productId.sizes.find(
                            (size) => item.size === size.size
                          )?.stock;
                          if (stock < 3 && stock > 0) {
                            return (
                              <span className="text-red-500">
                                Only {stock} left in stock! Hurry up!
                              </span>
                            );
                          } else if (stock == 0) {
                            return (
                              <span className="text-red-500">
                                Not enough stock available
                              </span>
                            );
                          } else {
                            return (
                              <span className="text-green-400">
                                {stock} left in stock
                              </span>
                            );
                          }
                        })()}
                      </p>
                      <p className="text-lg font-semibold mt-2">
                        ₹{item.price.toFixed(2)}
                      </p>
                      <div className="flex items-center mt-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => {
                            console.log(
                              item?.productId?._id + "product id",
                              item.quantity - 1,
                              item.size
                            );
                            updateQuantity(
                              item?.productId?._id,
                              item.quantity - 1,
                              item.size
                            );
                          }}
                          className="h-8 w-8"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <Input
                          type="text"
                          min="0"
                          readOnly
                          value={item.quantity}
                          // onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                          className="w-16 mx-2 text-center"
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() =>
                            updateQuantity(
                              item?.productId?._id,
                              item.quantity + 1,
                              item.size
                            )
                          }
                          className="h-8 w-8"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        handleCartRemoveRequest(item?.productId?._id)
                      }
                      className="mt-4 sm:mt-0"
                    >
                      <Trash2 className="h-5 w-5 text-red-500" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {cartItems?.cart?.items?.length !== 0 ? (
            <div className="lg:w-1/3">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold mb-4 font-primary">
                  Order Summary
                </h2>
                <div className="flex justify-between mb-2 font-primary">
                  <span>Subtotal</span>
                  <span>₹{subTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2 font-primary">
                  <span>shipping</span>
                  <span>Free</span>
                </div>
                {/* <Separator className="my-4" /> */}
                <div className="flex justify-between mb-4 font-primary">
                  <span className="font-semibold">Total</span>
                  <span className="font-semibold">₹{total.toFixed(2)}</span>
                </div>
                {cartItems?.cart?.items?.length === 0 ? (
                  <Button
                    disabled={true}
                    onClick={handleCheckout}
                    className="w-full font-primary"
                  >
                    Proceed to Checkout
                  </Button>
                ) : (
                  <Button onClick={handleCheckout} className="w-full">
                    Proceed to Checkout
                  </Button>
                )}
              </div>
            </div>
          ) : (
            null
          )}
        </div>
      </div>

      <OrderHistoryReModal
        title="Are you sure you want to remove this product?"
        message="This action cannot be undone."
        isOpen={showModal}
        onConfirm={handleConfirmCancel}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
};

export default Cart;
