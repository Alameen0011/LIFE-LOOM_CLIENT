import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema } from "@/validationSchemas/updateProfile";
import {
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
} from "@/app/service/userApiSlice";
import { toast } from "react-toastify";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ChevronRight } from "lucide-react";

const AddProfile = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(profileSchema) });
  const { data: userData } = useGetUserProfileQuery();
  const [updateProfile, { data, isLoading, isError }] =
    useUpdateUserProfileMutation();

  const handleUpdateUser = async (data) => {
    console.log(data);
    const res = await updateProfile(data).unwrap();

    console.log(res);
    toast.success("user updated successFully");
  };

  return (
    <div className="flex-1 p-6">
      <div className=" mb-6 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="#" className="hover:text-foreground">
          Home
        </Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="#" className="hover:text-foreground">
          Accounts
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground  font-medium ">Profile</span>
      </div>

      <Card className="w-full  max-w-2xl bg-gray-50 mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold font-primary">
            Profile
          </CardTitle>
          <CardDescription className="font-primary">
            Update your personal information
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(handleUpdateUser)}>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName" >
                  First name
                </Label>
                <Input
                  id="firstName"
                  className="font-primary text-sm "
                  defaultValue={userData?.user?.firstName}
                  {...register("firstName")}
                  placeholder="Enter your first name"
                />
                {errors.firstName && (
                  <p className="text-sm text-red-500">
                    {errors.firstName.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last name</Label>
                <Input
                  id="lastName"
                  defaultValue={userData?.user?.lastName}
                  {...register("lastName")}
                     className="font-primary text-sm "
                  placeholder="Enter your last name"
                />
                {errors.lastName && (
                  <p className="text-sm text-red-500">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone number</Label>
              <Input
                id="phone"
                {...register("phone")}
                type="tel"
                defaultValue={userData?.user?.phone}
                placeholder="Enter your phone number"
                   className="font-primary text-sm "
              />
              {errors.phone && (
                <p className="text-sm text-red-500">{errors.phone.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                {...register("email")}
                type="email"
                defaultValue={userData?.user?.email}
                   className="font-primary text-sm "
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className="w-full sm:w-auto"
              disabled={isLoading}
            >
              {isLoading && (
                // <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                <h2>HII Loading</h2>
              )}
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default AddProfile;
