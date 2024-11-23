import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight, Edit, MapPin, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDeleteAddressMutation, useGetAllAddressQuery } from "@/app/service/userApiSlice";
import { toast } from "react-toastify";

const Address = () => {
  const navigate = useNavigate();
  const { data: addressData } = useGetAllAddressQuery();
  const [deletAddress,{data:dltData,isLoading}] = useDeleteAddressMutation()

  console.log(addressData);

  const handleAddAddress = () => {
    navigate("/profile/addAddress");
  };

  const handleEditAddress = (id) => {
    console.log(id, "Edit address Id");
    navigate(`/profile/editProfile/${id}`);
  };

  const handleDeleteAddress = async(id) => {
    try {
     const res =  await deletAddress(id).unwrap()
     console.log(res,"response from deletion api")
     if(res.success){
      toast.success(res.message)
     }
    } catch (error) {
      console.log(error,"error while deleting address")
    }
  }

  return (
    <div className="flex-1 p-6">
    <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
      <Link to="/" className="hover:text-foreground">
        Home
      </Link>
      <ChevronRight className="h-4 w-4" />
      <Link to="/accounts" className="hover:text-foreground">
        Accounts
      </Link>
      <ChevronRight className="h-4 w-4" />
      <span className="text-foreground font-medium">Delivery Addresses</span>
    </nav>

    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {/* Add New Address Card */}
      <Card className="flex h-[250px] flex-col items-center justify-center transition-shadow hover:shadow-md">
        <CardContent className="flex flex-col items-center gap-4 p-6">
          <div className="rounded-full bg-primary/10 p-4">
            <MapPin className="h-6 w-6 text-primary" />
          </div>
          <Button onClick={handleAddAddress} variant="outline" className="w-full font-primary font-semibold">
            Add New Address
          </Button>
        </CardContent>
      </Card>

      {addressData?.addresses?.map((address) => (
        <Card key={address._id} className="transition-shadow hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 font-primary">
        
            <CardTitle className="text-sm font-medium">
              {address.addressName || "Address"}
            </CardTitle>
            <div className="flex space-x-2">
              <Button
                onClick={() => handleEditAddress(address._id)}
                variant="ghost"
                size="icon"
                aria-label="Edit address"
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                onClick={() => handleDeleteAddress(address._id)}
                variant="ghost"
                size="icon"
                aria-label="Delete address"
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-2 font-primary">
            <div className="grid gap-2">
              <div className="font-medium">{address?.state}</div>
              <div className="text-sm text-muted-foreground">
                {address?.district}, {address?.city}
              </div>
              <div className="text-sm text-muted-foreground">
                {address?.address}
              </div>
              <div className="text-sm text-muted-foreground">
                PIN: {address?.pincode}
              </div>
              <div className="text-sm text-muted-foreground">
                Phone: {address?.user?.phone}
              </div>
              {address.isDefault && (
                 <div className="mt-2 inline-flex items-center">
                 <span className="w-2 h-2 bg-primary rounded-full" />
               </div>
              )}
           
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
  );
};

export default Address;
