import React from 'react'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'


const CartNotFound = () => {

    const navigate = useNavigate()
  return (
    <div className="flex flex-col items-center justify-center min-h-[350px] w-full rounded-lg  p-8 text-center">
    <svg
      className="w-16 h-16 mb-4 text-gray-400"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 3h18M3 8h18M5 8v13a2 2 0 002 2h10a2 2 0 002-2V8m-4 4v4m-6-4v4"
      />
    </svg>
    <h2 className="text-xl font-semibold mb-2 text-gray-700">
      Your Cart is Empty
    </h2>
    <p className="text-gray-500 mb-4">
      Looks like you haven&apos;t added anything to your cart yet.
    </p>    
    <Button
      variant="outline"
      onClick={() => navigate("/products")}
      className="text-blue-500 hover:bg-blue-50"
    >
      Go Shopping
    </Button>
  </div>

  )
}

export default CartNotFound