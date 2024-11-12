import { useEffect, useState } from "react";
import {
  ShoppingCart,
  ArrowRightCircle,
  Info,
  CheckCircle,
  Package,
  Truck,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const OrderSuccess = () => {
  const [orderNumber, setOrderNumber] = useState("");

  useEffect(() => {
    // Generate a UUID for the order number
    const newOrderNumber = uuidv4();
    setOrderNumber(newOrderNumber);
  }, []);
  // const orderDetails = {
  //   items: [
  //     { productName: 'Bamboo T-Shirt', size: 'M', quantity: 2, price: 25.0 },
  //     { productName: 'Bamboo Pants', size: 'L', quantity: 1, price: 40.0 },
  //   ],
  //   totalAmount: 90.0,
  // };

  // const shippingDetails = {
  //   recipientName: 'John Doe',
  //   streetAddress: '123 Bamboo Street',
  //   city: 'Greenville',
  //   state: 'CA',
  //   zip: '90210',
  //   country: 'USA',
  //   phoneNumber: '123-456-7890',
  // };

  // const paymentDetails = {
  //   method: 'Credit Card',
  //   status: 'Paid',
  // };

  const nextSteps = [
    { icon: CheckCircle, text: "Your order is confirmed and being processed." },
    {
      icon: Package,
      text: "Your order will be packaged within 1-2 business days.",
    },
    {
      icon: Truck,
      text: "Once shipped, you'll receive a tracking number via email.",
    },
    { icon: Info, text: "You can contact support if you have any questions." },
  ];

  const navigate = useNavigate();

  return (
    <div className="min-h-screen  to-slate-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-gray-200 m-10 p-10 rounded-xl">
        <div className="flex justify-center">
          <div className="rounded-full bg-green-100 p-4">
            <svg
              className="w-24 h-24 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        <div className="text-center">
          <h1 className="mt-6 text-3xl font-extrabold text-gray-900">
            Order Confirmed!
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Thank you for your purchase. Your order has been successfully placed
            and is being processed.
          </p>
          <p className="mt-4 text-lg font-semibold text-customColorTertiary">
            Order Number: {orderNumber}orderNo
          </p>
        </div>

        {/* <div className="mt-8">
          <div className="bg-gray-50 p-6 rounded-md">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              What's Next?
            </h2>
            <ul className="space-y-4">
              {nextSteps.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center space-x-3 text-sm text-gray-600"
                >
                  <item.icon className="h-5 w-5 text-customColorTertiary" />
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div> */}

        <div className="mt-6 space-y-4">
          <button
            onClick={() => navigate("/profile/orders")}
            className="group relative w-full flex justify-center py-3 px-4 border border-customColorTertiary text-sm font-medium rounded-md text-customColorTertiary bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-customColorTertiary transition duration-150 ease-in-out"
          >
            <ShoppingCart className="h-5 w-5 mr-2" />
            View My Orders
          </button>

          <button
            onClick={() => navigate("/products")}
            className="group relative w-full flex justify-center py-3 px-4 border border-customColorTertiary text-sm font-medium rounded-md text-customColorTertiary bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-customColorTertiary transition duration-150 ease-in-out"
          >
            <ArrowRightCircle className="h-5 w-5 mr-2" />
            Continue Shopping
          </button>
        </div>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500">
            Need help?{" "}
            <a
              href="/contact"
              className="text-customColorTertiary hover:text-customColorTertiaryLight"
            >
              Contact our support team
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
