import React from 'react';

const ShimmerEffect = () => (
  <div className="container mx-auto p-6">
    <div className="mb-10"></div>
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-1/4 md:sticky top-4 p-6 shadow-lg rounded-lg md:h-screen overflow-y-auto">
        <div className="bg-gray-300 h-8 rounded mb-6 animate-pulse"></div>
        <div className="space-y-4">
          <div className="bg-gray-300 h-10 w-2/3 rounded animate-pulse"></div>
          <div className="bg-gray-300 h-10 w-1/2 rounded animate-pulse"></div>
          <div className="bg-gray-300 h-10 w-3/4 rounded animate-pulse"></div>
        </div>
      </div>

      <div className="w-full md:w-3/4 p-6">
        <div className="flex items-center mb-6 space-x-4">
          <div className="bg-gray-300 h-6 w-32 rounded animate-pulse"></div>
          <div className="flex-grow flex justify-center">
            <div className="flex items-center border border-gray-300 rounded-md overflow-hidden w-full max-w-72">
              <div className="p-2 bg-gray-300 w-5 h-5 rounded-full animate-pulse"></div>
              <input
                type="text"
                placeholder="Search products..."
                className="flex-grow p-2 outline-none text-sm placeholder-gray-500 border-r bg-gray-100 animate-pulse"
              />
            </div>
          </div>
          <div className="ml-4">
            <div className="bg-gray-300 h-10 w-52 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Shimmer effect for product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-9">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col animate-pulse"
            >
              <div className="relative pb-[300px] bg-gray-300 animate-pulse"></div>
              <div className="p-4">
                <div className="bg-gray-300 h-6 w-3/4 rounded animate-pulse mb-2"></div>
                <div className="bg-gray-300 h-4 w-1/2 rounded animate-pulse mb-4"></div>
                <div className="bg-gray-300 h-6 w-1/4 rounded animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default ShimmerEffect;
