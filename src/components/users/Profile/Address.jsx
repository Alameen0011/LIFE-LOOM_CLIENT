import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Edit, MapPin } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useGetAllAddressQuery } from "@/app/service/userApiSlice";

const Address = () => {
  const navigate = useNavigate();
  const { data: addressData } = useGetAllAddressQuery();

  console.log(addressData);

  const handleAddAddress = () => {
    navigate("/profile/addAddress");
  };

  const handleEditAddress = (id) => {

    console.log(id,"Edit address Id")
    navigate(`/profile/editProfile/${id}`)

    
  }

  return (
    <div className="flex-1 p-6">
      <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="#" className="hover:text-foreground">
          Home
        </Link>
        <span>/</span>
        <Link href="#" className="hover:text-foreground">
          Accounts
        </Link>
        <span>/</span>
        <span className="text-foreground">Delivery address</span>
      </div>

      <div className="grid gap-6 md:grid-cols-2  lg:grid-cols-3 ">
        {/* Add New Address Card */}
        <Card className="flex h-[300px] flex-col items-center justify-center">
          <CardContent className="flex flex-col items-center gap-4 p-6">
            <div className="rounded-full bg-primary/10 p-4">
              <MapPin className="h-6 w-6 text-primary" />
            </div>
            <Button onClick={handleAddAddress} variant="outline">
              add new address
            </Button>
          </CardContent>
        </Card>

        {addressData?.addresses?.map((address) => (
          <Card key={address._id}>
            <CardContent className="p-6">
              <div className="flex justify-between">
                <div className="mb-4 h-2 w-2 rounded-full bg-primary" />
                <Button onClick={() => handleEditAddress(address._id)} variant="ghost" size="icon">
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid gap-2">
                <div className="font-medium">{address?.state}</div>
                <div className="text-sm text-muted-foreground">
                  {address?.district}
                </div>
                <div className="text-sm text-muted-foreground">
                  {address?.pincode}
                </div>
                <div className="text-sm text-muted-foreground">
                  {address?.city}
                </div>
                <div className="text-sm text-muted-foreground">
                  {address?.address}
                </div>
                <div className="text-sm text-muted-foreground">
                  {address?.user?.phone}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Address;
