import { Link, replace } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "@/config/firebase";
import { useDispatch } from "react-redux";
import {
  useGoogleAuthMutation,
  useSignupMutation,
} from "@/app/service/authApiSlice";
import { setUserCredentials } from "@/app/slices/authSlice";
import { registerSchema } from "@/validationSchemas/Signup";

export default function SignupForm() {
  const [signup, { isLoading, isSuccess: signupSuccess, error }] =
    useSignupMutation();
  const [googleAuth] = useGoogleAuthMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(registerSchema) });

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
        firstName: res.name,
        accessToken: res.accessToken,
      };
      console.log(data, "data to redux an issue found");
      dispatch(setUserCredentials(data));
      navigate("/", replace);
    } catch (error) {
      console.log(error, "error while google Auth");
      toast.error(error.data.message);
    }
  };

  //this would be an asynchronous function consist of api calls and db access
  const registerForm = async (data) => {
    try {
      console.log("DATA TO REGISTER", data);
      const res = await signup(data).unwrap();
      console.log("response in signup", res);
      localStorage.setItem("otpEmail", res.email);
      console.log(res.message);
    } catch (error) {
      console.log("Signup error", error);
    }
  };

  useEffect(() => {
    if (signupSuccess) {
      toast.success("an otp is sent to your email account!");
      navigate("/auth/sendotp"); 
    }

    if (error) {
      toast.error(error.data?.message || "Signup failed. Please try again.");
    }
  }, [signupSuccess, error, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center  bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className=" bg-gray-100 p-8 rounded-lg  w-full max-w-md ">
        <div>
          <h2 className="mt-6 text-left font-primary font-bold text-2xl  text-gray-900">
            Signup
          </h2>
          <p className="mt-2 font-secondary text-left text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/auth/login"
              className="font-medium font-tertiary text-indigo-600 hover:text-indigo-500"
            >
              Please login
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6 " onSubmit={handleSubmit(registerForm)}>
          <div className="rounded-md shadow-sm space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="first-name" className=" sr-only">
                  First Name
                </Label>
                <Input
                  id="first-name"
                  name="firstName"
                  type="text"
                  className="font-primary appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="First Name"
                  {...register("firstName")}
                />
                <div className="min-h-[10px]">
                  {errors.firstName && (
                    <span className="text-red-500 text-sm font-tertiary">
                      {errors.firstName.message}
                    </span>
                  )}
                </div>
              </div>
              <div>
                <Label htmlFor="last-name" className="sr-only">
                  Last Name
                </Label>
                <Input
                  id="last-name"
                  name="lastName"
                  type="text"
                  className=" font-primary appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Last Name"
                  {...register("lastName")}
                />
                <div className="min-h-[10px]">
                  {errors.lastName && (
                    <span className="text-red-500 text-sm font-tertiary">
                      {errors.lastName.message}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="email-address" className="sr-only">
                  Email address
                </Label>
                <Input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className=" font-primary  appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  {...register("email")}
                />
                <div className="min-h-[10px]">
                  {errors.email && (
                    <span className="text-red-500 text-sm font-tertiary">
                      {errors.email.message}
                    </span>
                  )}
                </div>
              </div>
              <div>
                <Label htmlFor="phone" className="sr-only">
                  Phone
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  className=" font-primary  appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Phone"
                  {...register("phone")}
                />
                {errors.phone && (
                  <div className="text-red-500 text-sm h-5 font-tertiary">
                    {errors.phone.message}
                  </div>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="password" className="sr-only">
                  Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  className="appearance-none rounded-md relative font-primary block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  {...register("password")}
                />
                {errors.password && (
                  <div className="text-red-500 text-sm h-5 font-tertiary">
                    {errors.password.message}
                  </div>
                )}
              </div>
              <div>
                <Label htmlFor="confirm-password" className="sr-only">
                  Confirm Password
                </Label>
                <Input
                  id="confirm-password"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  className=" font-primary  appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Confirm Password"
                  {...register("confirmPassword")}
                />
                <div className="min-h-[5px]">
                  {errors.confirmPassword && (
                    <span className="text-red-500 text-sm font-tertiary">
                      {errors.confirmPassword.message}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 pb-2">
            <Button
              type="submit"
              disabled={isLoading}
              className=" font-primary group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-grey focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isLoading ? "Registering" : "Signup"}
            </Button>
          </div>
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
      </div>
    </div>
  );
}
