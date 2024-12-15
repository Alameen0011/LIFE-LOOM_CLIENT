import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { LucideActivity } from "lucide-react";
import { useGetUserProfileQuery } from "@/app/service/userApiSlice";
import { useRazorpay } from "react-razorpay";
import { toast } from "react-toastify";
import { useRetryOrderPaymentMutation } from "@/app/service/orderApiSlice";

const RetryPayment = ({amount,orderId}) => {
  const [userInfo, setUserInfo] = useState({});

  const { data: user } = useGetUserProfileQuery();
  const [retryPayment] = useRetryOrderPaymentMutation()

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
            const res = await retryPayment({orderId,status:"Paid"}).unwrap()
            
            if(res.success){
                toast.success("Paid successfully")
            }
          
          }
        } catch (error) {
          console.log(error, "error while retry order payment");
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
           toast.error("payment cancelled ")
        },
      },
    };

    console.log("jsut before opnig iinstance")

    const razorpayInstance = new Razorpay(options);
    razorpayInstance.open();
  };







  return (
    <>
      {/* {isLoading && <p className="text-center">Loading Razorpay...</p>} */}
      {error && <p className="text-center">Error loading Razorpay: {error}</p>}

      <Button
        variant="ghost"
        size="sm"
        className="text-sm"
        onClick={handlePayment}
      >
        Retry Payment
      </Button>
    </>
  );
};

export default RetryPayment;
