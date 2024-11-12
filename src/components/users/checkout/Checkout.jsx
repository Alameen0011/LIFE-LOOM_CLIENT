import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { CreditCard, Edit2, Plus, ShoppingCart, Wallet } from "lucide-react";
import {
  useAddAddressMutation,
  useGetAllAddressQuery,
} from "@/app/service/userApiSlice";
import { useGetCartQuery } from "@/app/service/cartApiSlice";
import { toast } from "react-toastify";
import { usePlaceOrderMutation } from "@/app/service/orderApiSlice";
import { useNavigate } from "react-router-dom";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addressSchema } from "@/validationSchemas/addAddress";

const Checkout = () => {
  const { data: addressData } = useGetAllAddressQuery();
  const { data: cartItems } = useGetCartQuery();
  const [placeOrder] = usePlaceOrderMutation();

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);

  const [isNewAddressModalOpen, setIsNewAddressModalOpen] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(addressSchema) });

  const [addAddress, { isLoading, isError }] = useAddAddressMutation();

  const handleAddNewAddress = async (data) => {
    data.isDefault = Boolean(data.isDefault);
    console.log(data, "data on adding address");

    try {
      const res = await addAddress(data).unwrap();
      if (res.success) {
        console.log(res, "response from adding address APi");
        toast.success("address added successFully");
        reset()
        
    
      }
    } catch (error) {
      console.log(error);
    }finally{
      setIsNewAddressModalOpen(false)
    }
  };


  const handleApplyPromoCode = () => {
    console.log("apply promo code");
  };

  const subTotal =
    cartItems?.cart?.items?.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0) || 0;
  console.log(subTotal, "subtotal");
  const shippingCharge = 0;
  const shipping = subTotal * shippingCharge;
  const total = shipping + subTotal;

  const handlePlaceOrder = async() => {
    console.log("place order");

    if (!selectedAddress) {
      console.log(selectedAddress);
      toast.info("please select an address");
      console.log("please add an address");
      return;
    }

    console.log(paymentMethod, "payment method");
    console.log(selectedAddress, "selected Address");

    if (!paymentMethod) {
      console.log("please select a payment method");
      toast.info("please select an payment method");
      return;
    }

    if (!cartItems || cartItems.cart.items.length == 0) {
      console.log("no items in the cart");
      return;
    }

    const orderData = {
      items: cartItems.cart.items.map((item) => ({
        product: item?.productId?._id,
        price: item.price,
        size: item.size,
        quantity: item.quantity,
      })),
      shippingDetails: addressData.addresses.find(
        (address) => address._id === selectedAddress
      ),
      paymentDetails: {
        method: paymentMethod,
        status: "Pending",
      },
      totalAmount: Number(total.toFixed(2)),
    };

    try {
      const res =await placeOrder(orderData).unwrap();

      console.log(res, "response from place order");
  
      if (res.success) {
        navigate("/order/confirmation");
      }
      
    } catch (error) {
      console.log(error,"error while placing order")
      toast.error(error?.data?.message)
      
    }

 
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold text-gray-900 mb-8">Checkout</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Address Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Select Delivery Address</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {addressData?.addresses?.map((address) => (
                  <div
                    key={address._id}
                    className="flex items-center space-x-2 mb-4"
                  >
                    <input
                      type="radio"
                      id={`address-${address._id}`}
                      name="address"
                      value={address._id}
                      className="form-radio text-blue-600 h-4 w-4"
                      onChange={() => setSelectedAddress(address._id)}
                      checked={selectedAddress === address._id}
                    />
                    <Label
                      htmlFor={`address-${address._id}`}
                      className="flex-grow"
                    >
                      <div>
                        <p className="font-medium">
                          {address?.user?.firstName} {address?.user?.lastName}
                        </p>
                        <p className="text-sm text-gray-500">
                          {address?.city}, {address?.district}, {address?.state}{" "}
                          {address?.pincode}
                        </p>
                        <p className="text-sm text-gray-500">
                          {address?.user?.phone}
                        </p>
                      </div>
                    </Label>
                  
                  </div>
                ))}
              </div>
              <Dialog
                open={isNewAddressModalOpen}
                onOpenChange={setIsNewAddressModalOpen}
              >
                <DialogTrigger asChild>
                  <Button className="w-full mt-4">
                    <Plus className="mr-2 h-4 w-4" /> Add New Address
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Address</DialogTitle>
                  </DialogHeader>
                  <form
                    className="space-y-4"
                    onSubmit={handleSubmit(handleAddNewAddress)}
                  >
                    <div>
                      <Label htmlFor="state">State</Label>
                      <Input
                        {...register("state")}
                        id="state"
                        placeholder="Enter state"
                      />
                      {errors.state && (
                        <span className="text-red-500 text-sm">
                          {errors.state.message}
                        </span>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="district">District</Label>
                      <Input
                        {...register("district")}
                        id="district"
                        placeholder="Enter district"
                      />
                      {errors.district && (
                        <span className="text-red-500 text-sm">
                          {errors.district.message}
                        </span>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input
                          {...register("city")}
                          id="city"
                          placeholder="Enter city"
                        />
                        {errors.city && (
                          <span className="text-red-500 text-sm">
                            {errors.city.message}
                          </span>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="pinCode">Pin Code</Label>
                        <Input
                          {...register("pincode")}
                          id="pinCode"
                          placeholder="Enter 6-digit pin code"
                          className="max-w-[200px]"
                        />
                        {errors.pincode && (
                          <span className="text-red-500 text-sm">
                            {errors.pincode.message}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="grid gap-4">
                      <div>
                        <Label htmlFor="addressName">Address Name</Label>
                        <Input
                          {...register("addressName")}
                          id="addressName"
                          placeholder="E.g., Home, Office, etc."
                        />
                        {errors.addressName && (
                          <span className="text-red-500 text-sm">
                            {errors.addressName.message}
                          </span>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="address">Full Address</Label>
                        <Input
                          {...register("address")}
                          id="address"
                          placeholder="House Name, House Number, Locality"
                        />
                        {errors.address && (
                          <span className="text-red-500 text-sm">
                            {errors.address.message}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="isDefault" {...register("isDefault")} />
                      <Label htmlFor="isDefault">Mark as default address</Label>
                      {errors.isDefault && (
                        <span className="text-red-500 text-sm">
                          {errors.isDefault.message}
                        </span>
                      )}
                    </div>
                    <Button type="submit" className="w-full">
                      Save Address
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>

          {/* Order Summary and Payment */}
          <div className="space-y-8">
            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Sample product */}
                  {cartItems?.cart?.items?.map((item) => (
                    <div
                      key={item?._id}
                      className="flex items-center space-x-4"
                    >
                      <img
                        src={item?.image}
                        alt={item?.productName}
                        className="w-16 h-16 bg rounded-md"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium">{item?.productName}</h3>
                        <p className="text-sm text-gray-500">
                          Size: {item?.size}, Qty: {item.quantity}
                        </p>
                      </div>
                      <p className="font-medium">₹{item?.price}</p>
                    </div>
                  ))}

                  {/* Add more products here */}
                  <div className="border-t pt-4">
                    <div className="flex justify-between">
                      <p className="font-medium">Subtotal</p>
                      <p className="font-medium">₹{subTotal.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between mt-2">
                      <p className="font-medium">Shipping</p>
                      <p className="font-medium">₹{shipping.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between mt-4 text-lg font-semibold">
                      <p>Total</p>
                      <p>₹{total.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={paymentMethod}
                  onValueChange={setPaymentMethod}
                >
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="wallet" id="wallet" />
                      <Label
                        htmlFor="wallet"
                        className="flex items-center space-x-2"
                      >
                        <Wallet className="h-5 w-5" />
                        <span>Wallet</span>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="upi" id="upi" />
                      <Label
                        htmlFor="upi"
                        className="flex items-center space-x-2"
                      >
                        <svg
                          className="h-5 w-5"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M8 12H16"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M12 16V8"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span>UPI</span>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="razorpay" id="razorpay" />
                      <Label
                        htmlFor="razorpay"
                        className="flex items-center space-x-2"
                      >
                        <svg
                          className="h-5 w-5"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M21 4H3C1.89543 4 1 4.89543 1 6V18C1 19.1046 1.89543 20 3 20H21C22.1046 20 23 19.1046 23 18V6C23 4.89543 22.1046 4 21 4Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M1 10H23"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span>Razor Pay</span>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="cod" id="cod" />
                      <Label
                        htmlFor="cod"
                        className="flex items-center space-x-2"
                      >
                        <CreditCard className="h-5 w-5" />
                        <span>Cash on Delivery</span>
                      </Label>
                    </div>
                  </div>
                </RadioGroup>

                {/* Promo Code Section */}
                <div className="mt-6 space-y-2">
                  <Label htmlFor="promoCode">Promo Code</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="promoCode"
                      placeholder="Enter promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-grow"
                    />
                    <Button onClick={handleApplyPromoCode}>Apply</Button>
                  </div>
                </div>

                <Button className="w-full mt-6" onClick={handlePlaceOrder}>
                  <ShoppingCart className="mr-2 h-4 w-4" /> Place Order
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
