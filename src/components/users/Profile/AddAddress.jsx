import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { addressSchema } from "@/validationSchemas/addAddress";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddAddressMutation } from "@/app/service/userApiSlice";
import { toast } from "react-toastify";
import { ChevronRight } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

const AddAddress = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(addressSchema) });


  const [addAddress,{isLoading,isError}] = useAddAddressMutation()
  const navigate = useNavigate()

  const handleAddAddress = async (data) => {
    data.isDefault = Boolean(data.isDefault);
    console.log(data, "data on adding address");

    const res = await addAddress(data).unwrap()
    if(res.success){
      console.log(res,"response from adding address APi")
      toast.success("address added successFully")
      navigate("/profile/myAddress")
      

    }
  
  };



  return (
    <div className="flex-1 p-6">
    <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-muted-foreground ">
      <Link to="/" className="hover:text-foreground">
        Home
      </Link>
      <ChevronRight className="h-4 w-4" />
      <Link to="/accounts" className="hover:text-foreground">
        Accounts
      </Link>
      <ChevronRight className="h-4 w-4" />
      <Link to="/profile/myAddress" className="hover:text-foreground">
        Delivery address
      </Link>
      <ChevronRight className="h-4 w-4" />
      <span className="text-foreground font-medium">Add new address</span>
    </nav>

    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl font-primary">
        
          Add New Address
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleAddAddress)} className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 font-primary">
            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Input {...register("state")} id="state" placeholder="Enter a state" className="text-xs" />
              {errors.state && (
                <span className="text-red-500 text-sm">{errors.state.message}</span>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="district">District</Label>
              <Input {...register("district")} id="district" placeholder="Enter a district" className="text-xs"  />
              {errors.district && (
                <span className="text-red-500 text-sm">{errors.district.message}</span>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input {...register("city")} id="city" placeholder="Enter a city" className="text-xs"  />
              {errors.city && (
                <span className="text-red-500 text-sm ">{errors.city.message}</span>
              )}
            </div>
            <div className="space-y-2 sm:col-span-2 md:col-span-3 font-primary">
              <Label htmlFor="addressName">Address Name</Label>
              <Input {...register("addressName")} id="addressName" placeholder="E.g., Home, Office" className="text-xs" />
              {errors.addressName && (
                <span className="text-red-500 text-sm">{errors.addressName.message}</span>
              )}
            </div>
          </div>

          <div className="space-y-2 font-primary">
            <Label htmlFor="address">Full Address</Label>
            <Input
              {...register("address")}
              id="address"
              placeholder="House Name, House Number, Locality"
              className="text-xs" 
            />
            {errors.address && (
              <span className="text-red-500 text-sm">{errors.address.message}</span>
            )}
          </div>

          <div className="space-y-2 font-primary">
            <Label htmlFor="pinCode">Pin Code</Label>
            <Input
              {...register("pincode")}
              id="pinCode"
              placeholder="Enter 6-digit pin code"
              className="max-w-[200px] text-xs"
              
            />
            {errors.pincode && (
              <span className="text-red-500 text-sm">{errors.pincode.message}</span>
            )}
          </div>

          <div className="flex items-center space-x-2 font-primary">
            <Checkbox id="isDefault" {...register("isDefault")} />
            <Label htmlFor="isDefault">Mark as default address</Label>
            {errors.isDefault && (
              <span className="text-red-500 text-sm">{errors.isDefault.message}</span>
            )}
          </div>

          <div className="flex justify-end font-primary">
            <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90" disabled={isLoading}>
              {isLoading ? "Adding..." : "Add Address"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  </div>
  );
};

export default AddAddress;
