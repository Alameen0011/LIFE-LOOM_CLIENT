import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useRazorpay } from "react-razorpay";
import { useGetUserProfileQuery } from "@/app/service/userApiSlice";

const RazorpayOrg = ({ handlePlaceOrder,amount,btnTxt,}) => {
  const [userInfo, setUserInfo] = useState({});

  const { data: user } = useGetUserProfileQuery();

  useEffect(() => {
    if (user) {
      console.log(user);
      setUserInfo({
        name: user.user.firstName + " " + user.user.lastName,
        email: user.user.email,
        contact: user.user.phone,
      });
    }
  }, [user]);

  console.log(amount);

  const { error, isLoading, Razorpay } = useRazorpay();



  const handlePayment = async () => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_API_KEY,
      amount: Number(amount).toFixed(0) * 100,
      currency: "INR",
      name: "",
      description: "",
      orderId: "",
      handler: async (response) => {
        console.log(response);
        try {
          if (response.razorpay_payment_id) {
            await handlePlaceOrder("Paid");
          }
        } catch (error) {
          console.log(error, "error while placing order");
        }
      },
      prefill: {
        name: userInfo.name,
        email: userInfo.email,
        contact: userInfo.contact,
      },
      theme: {
        color: "#007BFF",
      },
      modal: {
        ondismiss: async () => {
          await handlePlaceOrder("Failed");
        },
      },
    };

    console.log("jsut before opnig iinstance")

    const razorpayInstance = new Razorpay(options);
    razorpayInstance.open();
  };

  return (
    <div>
      {isLoading && <p className="text-center">Loading Razorpay...</p>}
      {error && <p className="text-center">Error loading Razorpay: {error}</p>}

      {!isLoading && !error && (
        <Button className="w-full mt-6" size="lg" onClick={handlePayment}>
          {btnTxt}
        </Button>
      )}
    </div>
  );
};

export default RazorpayOrg;
