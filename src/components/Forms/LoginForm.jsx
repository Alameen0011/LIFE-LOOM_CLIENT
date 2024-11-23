import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FcGoogle } from "react-icons/fc";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "@/config/firebase";
import {
  useFogotPasswordMutation,
  useGoogleAuthMutation,
  useUserLoginMutation,
} from "@/app/service/authApiSlice";
import { setUserCredentials } from "@/app/slices/authSlice";
import { loginSchema } from "@/validationSchemas/Login";
import { forgotPasswordSchema } from "@/validationSchemas/forgotEmail";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";


const LoginForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });

  const {
    register: registerForgotPassword,
    handleSubmit: handleSubmitForgotPassword,
    formState: { errors: forgotPasswordErrors },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
  })

  const [userLogin, { isLoading }] = useUserLoginMutation();
  const [googleAuth] = useGoogleAuthMutation();
  const [forgotPassword,{isLoading:forgotPassLoading}] = useFogotPasswordMutation()

  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  console.log(location?.state?.from?.pathname);

  const handleGoogleAuth = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log(user, "user");
      const idToken = await user.getIdToken();
      console.log(idToken, "ID TOKEN FROM google auth");

      const res = await googleAuth({ idToken }).unwrap();
      console.log(res, "Response from api");
      const data = {
        user: res._id,
        role: res.role,
        accessToken: res.accessToken,
      };
      console.log(data, "data to redux an issue found");
      dispatch(setUserCredentials(data));
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Error code:", error.code);
    }
  };

  const loginSubmit = async (data) => {
    try {
      const res = await userLogin(data).unwrap();
      console.log("login Response", res);
      console.log({ ...res });
      dispatch(setUserCredentials({ ...res }));

      toast.success(res.message);
      if (res) {
        navigate(from, { replace: true });
      }
    } catch (error) {
      console.log("Error in login submission", error);
      toast.error(error?.data?.message);
    }
  };

  const handleForgotPassword = async(data) => {

    try {
      const res = await forgotPassword(data).unwrap()
      if(res.success){
        toast.success("An otp has been sent to your email")
        navigate("/auth/forgotOtp")
      }




      
    } catch (error) {
      console.log(error,"error while requessting otp for new pass")
      toast.error(error.data.message)
    }

  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className=" p-8 rounded-lg  w-96">
        <h2 className="mb-6 text-left font-primary text-2xl font-bold  text-gray-900">
          Login
        </h2>

        <form onSubmit={handleSubmit(loginSubmit)}>
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
                <span className="text-red-500 text-sm">
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
              className="mt-1 block w-full p-2 font-primary border border-gray-300 rounded-md"
            />
            <div className="min-h-[10px]">
              {errors.password && (
                <span className="text-red-500 text-sm">
                  {errors.password.message}
                </span>
              )}
            </div>
            <div className="mt-2 text-right">
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen} className="font-primary">
              <DialogTrigger asChild>
                <Button variant="solid" className="p-0 h-auto font-normal no-underline">
                  Forgot Password?
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="font-primary">Reset Password</DialogTitle>
                  <DialogDescription className=" font-primary">
                    Enter your email address and we&apos;ll send you a link to reset your password.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmitForgotPassword(handleForgotPassword)} className="space-y-4">
                  <div>
                    {/* <Label htmlFor="reset-email" className="font-primary">Email</Label> */}
                    <Input
                      id="reset-email"
                      type="email"
                      {...registerForgotPassword('email')}
                      placeholder="Enter your email"
                    />
                    {forgotPasswordErrors.email && (
                      <p className="text-sm text-red-500 mt-1 font-primary">{forgotPasswordErrors.email.message}</p>
                    )}
                  </div>
                  <Button disabled={forgotPassLoading} type="submit" className="w-40 bg:black ">
                   {forgotPassLoading ? "sending..." : "send"}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-black font-primary text-white p-2 rounded-md mb-4"
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </form>
        <div className="pt-2 pb-4">
          <Button
            onClick={handleGoogleAuth}
            type="button"
            className=" font-primary  group relative w-full flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <span className="absolute left-6 inset-y-0 flex items-center pl-3">
              <FcGoogle className="h-5 w-5" aria-hidden="true" />
            </span>
            Sign up with Google
          </Button>
        </div>
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <Link
              to="/auth/signup"
              className="text-black  font-primary  hover:text-indigo-500 font-medium"
            >
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
