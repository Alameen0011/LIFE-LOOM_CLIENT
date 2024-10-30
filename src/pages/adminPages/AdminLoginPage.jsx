import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useDispatch } from "react-redux";

import { toast } from "react-toastify";
import {  useNavigate } from "react-router-dom";
import { useAdminLoginMutation } from "@/app/service/adminApiSlice";
import { setUserCredentials } from "@/app/slices/authSlice";

const AdminLoginPage = () => {

  console.log(useAdminLoginMutation);
  const [AdminLogin, {isLoading,}] = useAdminLoginMutation();

  
 const navigate = useNavigate()
  const dispatch = useDispatch();

  const loginSchema = z.object({
    email: z
      .string()
      .min(1, { message: "email is required" })
      .email({ message: "Invalid email id" }),
    password: z
      .string()
      .min(1, { message: "password is required" })
      .min(5, { message: "password must be atleat 5 character" }),
  });

  const {  register,  handleSubmit,  formState: { errors }} = useForm({ resolver: zodResolver(loginSchema) });

  //async function that handle asynchronous operation like api call and db operation
  const loginForm = async (data) => {
    try {
      console.log(data)
      const res = await AdminLogin(data).unwrap();
      console.log(res)
      console.log(res.message);
    

      dispatch(setUserCredentials(res.data));

      navigate('/admin/dashboard')
      

      toast.success(res.message)
    } catch (error) {
  
    console.error("Error during login: ", error);
    const errorMessage = error?.data?.message || "Something went wrong, please try again";
    toast.error(errorMessage);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className=" p-8 rounded-lg w-96">
        <h2 className="text-2xl font-primary font-bold mb-6 text-left">Admin Login</h2>

        <form onSubmit={handleSubmit(loginForm)}>
          <div className="mb-4">
            <Label
              htmlFor="email"
              className="block text-sm font-primary font-medium text-gray-700"
            >
              Enter your email
            </Label>
            <Input
              type="email"
              {...register("email")}
              id="email"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
            <div className="min-h-[10px]">
              {errors.email && (
                <span className="text-red-500 font-primary text-sm">
                  {errors.email.message}
                </span>
              )}
            </div>
          </div>

          <div className="mb-6">
            <Label
              htmlFor="password"
              className="block text-sm font-primary font-medium text-gray-700"
            >
              Enter your password
            </Label>
            <Input
              type="password"
              {...register("password")}
              id="password"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
            <div className="min-h-[10px]">
              {errors.password && (
                <span className="text-red-500 font-primary text-sm">
                  {errors.password.message}
                </span>
              )}
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-black font-primary text-white p-2 rounded-md mb-4"
          >
            Login
          </Button>
        </form>
      

      
      </div>
    </div>
  );
};

export default AdminLoginPage;
