import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 font-primary">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-gray-900 leading-tight">404</h1>
        <h2 className="text-2xl font-semibold text-gray-600 mt-4">
          Oops! Page Not Found
        </h2>
        <p className="text-gray-500 mt-2 text-lg">
          The page you're looking for doesn't exist
        </p>
        <Link
          to="/"
          className="mt-8 inline-block px-8 py-3 text-base font-semibold bg-black text-white rounded-lg shadow-lg hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300 active:bg-gray-900 transition duration-200"
        >
          Go Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
