import React from "react";
import { useRouteError, Link } from "react-router-dom";

const ErrorPage = () => {

  const error = useRouteError();
  console.error("Route Error:", error);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-700 font-primary">
    <h1 className="text-2xl font-bold text-red-500">Oops!</h1>
    <p className="mt-4 text-xl">Something went wrong.</p>
    <p className="mt-2 text-gray-500">
      { "An unexpected error occurred."}
    </p>
    <Link
          to="/"
          className="mt-8 inline-block px-8 py-3 text-base font-semibold bg-black text-white rounded-lg shadow-lg hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300 active:bg-gray-900 transition duration-200"
        >
          Go Back to Home
        </Link>
  </div>
  )
}

export default ErrorPage