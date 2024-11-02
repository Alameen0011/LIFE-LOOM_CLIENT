import React from "react";
import SideBar from "./SideBar";
import EditAddress from "./EditAddress";
import { useParams } from "react-router-dom";

const MyEditAddress = () => {

    const {id} = useParams()
        console.log(id,"id to edit profile")


  return (
    <div className="flex min-h-screen mx-auto max-w-5xl my-10 bg-background">
      {/* Sidebar */}
      <SideBar />

      {/* Main Content */}
      <EditAddress />
    </div>
  );
};

export default MyEditAddress;
