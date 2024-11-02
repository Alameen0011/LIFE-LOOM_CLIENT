import React from "react";
import SideBar from "./SideBar";
import ResetPassword from "./ResetPassword";

const MyResetPassword = () => {
  return (
    <div className="flex min-h-screen mx-auto max-w-5xl my-10 bg-background">
      {/* Sidebar */}
      <SideBar />

      {/* Main Content */}
      <ResetPassword />
    </div>
  );
};

export default MyResetPassword;
