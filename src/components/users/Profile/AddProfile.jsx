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
      <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="#" className="hover:text-foreground">
          Home
        </Link>
        <span>/</span>
        <Link href="#" className="hover:text-foreground">
          Accounts
        </Link>
        <span>/</span>
        <span className="text-foreground">Profile</span>
      </div>

      <div className="mx-auto max-w-md space-y-6 rounded-lg border p-6">
        <div className="text-center">
          <h2 className="text-lg font-medium">Profile</h2>
          <p className="text-sm text-gray-500"></p>
        </div>
        <form onSubmit={handleSubmit(handleUpdateUser)}>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                First name
              </label>
              <Input
                {...register("firstName")}
                type="text"
                placeholder="Enter you first name"
                defaultValue={userData?.user?.firstName}
              />
              <div className="min-h-[10px]">
                {" "}
                {/* Reserve space for error messages */}
                {errors.firstName && (
                  <span className="text-red-500 text-sm font-tertiary">
                    {errors?.firstName?.message}
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Last name
              </label>
              <Input
                {...register("lastName")}
                type="text"
                placeholder="Enter  your lastname"
                defaultValue={userData?.user?.lastName}
              />
              <div className="min-h-[10px]">
                {" "}
                {/* Reserve space for error messages */}
                {errors.lastName && (
                  <span className="text-red-500 text-sm font-tertiary">
                    {errors?.lastName?.message}
                  </span>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                contant number
              </label>
              <Input
                {...register("phone")}
                type="tel"
                placeholder="Enter your phone number"
                defaultValue={userData?.user?.phone}
              />
              <div className="min-h-[10px]">
                {" "}
                {/* Reserve space for error messages */}
                {errors.phone && (
                  <span className="text-red-500 text-sm font-tertiary">
                    {errors.phone.message}
                  </span>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                email
              </label>
              <Input
                {...register("email")}
                type="email"
                placeholder="Enter new password"
                defaultValue={userData?.user?.email}
              />
              <div className="min-h-[10px]">
                {" "}
                {/* Reserve space for error messages */}
                {errors.email && (
                  <span className="text-red-500 text-sm font-tertiary">
                    {errors.email.message}
                  </span>
                )}
              </div>
            </div>

            <Button
              disabled={isLoading}
              type="submit"
              className="w-full bg-black text-white hover:bg-gray-800"
            >
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProfile;
