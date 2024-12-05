import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {  ShoppingCart } from "lucide-react";

const CartNotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-[350px] w-full rounded-lg  p-8 text-center font-primary">
      <div>
        <ShoppingCart className="w-16 h-16 text-gray-300 mb-4" />
      </div>
      <h2 className="text-xl font-semibold mb-2 text-gray-700">
        Your Cart is Empty
      </h2>
      <p className="text-gray-500 mb-4">
        Looks like you haven&apos;t added anything to your cart yet.
      </p>
      <Button onClick={() => navigate("/products")}>Go Shopping</Button>
    </div>
  );
};

export default CartNotFound;
