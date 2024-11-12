import React from "react";

const Spinner = ({ size = "md", color = "blue" }) => {
    console.log("insider spinner")
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  const spinnerColor = {
    blue: "border-t-blue-500",
    red: "border-t-red-500",
    green: "border-t-green-500",
    purple: "border-t-purple-500",
    gray: "border-t-gray-500",
  };

  return (
    <div
      className={`border-4 border-solid rounded-full border-gray-200 animate-spin ${sizeClasses[size]} ${spinnerColor[color]}`}
    ></div>
  );
};

export default Spinner;
