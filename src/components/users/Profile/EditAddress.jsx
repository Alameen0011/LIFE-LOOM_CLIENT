import { useGetSingleAddressQuery, useUpdateAddressMutation } from "@/app/service/userApiSlice";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate, useParams } from "react-router-dom";
import { EditAddressSchema } from "@/validationSchemas/EditAddress";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const EditAddress = () => {
   const {id} = useParams()

   console.log(id,"params id for editing")

  const { data: singleAddress } = useGetSingleAddressQuery(id);
  const [updateAddress,{data,isLoading,isError}] = useUpdateAddressMutation()
  const navigate = useNavigate()
  const {register,handleSubmit,formState: { errors }} = useForm({ resolver: zodResolver(EditAddressSchema) });

    console.log(singleAddress,"data from fetching single address")

  const handleUpdateAddress = async(data) => {

    console.log(data,"data after client validation")

    const res = await updateAddress({id:id,updateAddressData:data}).unwrap()
    console.log(res,"response from updating adress")
    if(res.success){
        toast.success("addresss updated successfully")
        navigate('/profile/myAddress')
    }


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
        <Link href="#" className="hover:text-foreground">
          Delivery address
        </Link>
        <span>/</span>
        <span className="text-foreground">Edit Address</span>
      </div>

      <Card>
        <CardContent className="p-6">
          <form
            onSubmit={handleSubmit(handleUpdateAddress)}
            className="space-y-6"
          >
            <h2>Edit Address</h2>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input
                  {...register("state")}
                  id="state"
                  defaultValue={singleAddress?.address?.state}
                />
                <div className="min-h-[10px]">
                  {errors.state && (
                    <span className="text-red-500 text-sm font-tertiary ">
                      {errors?.state?.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="district">District</Label>
                <Input
                  {...register("district")}
                  id="district"
                  defaultValue={singleAddress?.address?.district}
                />
                <div className="min-h-[10px]">
                  {errors.district && (
                    <span className="text-red-500 text-sm font-tertiary ">
                      {errors?.district?.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  {...register("city")}
                  id="city"
                  defaultValue={singleAddress?.address?.city}
                />
                <div className="min-h-[10px]">
                  {errors.city && (
                    <span className="text-red-500 text-sm font-tertiary ">
                      {errors?.city?.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="addressType">Address Name</Label>
                <Input
                  {...register("addressName")}
                  id="addressType"
                  defaultValue={singleAddress?.address?.addressName}
                />
                <div className="min-h-[10px]">
                  {errors.addressName && (
                    <span className="text-red-500 text-sm font-tertiary ">
                      {errors?.addressName?.message}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                {...register("address")}
                id="address"
                placeholder="House Name, House Number, Locality"
                defaultValue={singleAddress?.address?.address}
              />
              <div className="min-h-[10px]">
                {errors.address && (
                  <span className="text-red-500 text-sm font-tertiary ">
                    {errors?.address?.message}
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="pinCode">Pin Code</Label>
              <Input
                {...register("pincode")}
                id="pinCode"
                placeholder="Mary"
                className="max-w-[200px]"
                defaultValue={singleAddress?.address?.pincode}
              />
              <div className="min-h-[10px]">
                {errors.pincode && (
                  <span className="text-red-500 text-sm font-tertiary ">
                    {errors?.pincode?.message}
                  </span>
                )}
              </div>
            </div>

            {/* Mark as Default Address Checkbox */}
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  {...register("isDefault")}
                  className="form-checkbox"
                />
                <span>Mark as default address</span>
              </label>
            </div>

            <div className="flex justify-end">
              <Button className="bg-black text-white hover:bg-black/90">
                SAVE
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditAddress;
