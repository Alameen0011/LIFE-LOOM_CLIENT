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

    const newOrderNumber = uuidv4();
    setOrderNumber(newOrderNumber);
  }, []);



  const navigate = useNavigate();

  return (
    <div className="min-h-screen  to-slate-50 flex items-center justify-center font-primary px-4 sm:px-6 lg:px-8">
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
          <h1 className="mt-6 text-2xl font-extrabold text-gray-900">
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
