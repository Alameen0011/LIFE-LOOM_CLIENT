import {usePasswordChangeMutation, useResendForgotOtpMutation, useResendOtpMutation,} from "@/app/service/authApiSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ResetPasswordSchema } from "@/validationSchemas/resetPassword";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import {  useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ResetPasswordPage = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(ResetPasswordSchema) });

  const [passwordChange,{isLoading}] = usePasswordChangeMutation();




  const handlePasswordSubmit = async (data) => {
    try {
      let forgotEmail = localStorage.getItem("forgotEmail");

      let newData = {
        ...data,
        email: forgotEmail,
      };

      console.log(newData, "new data with email");

      const res = await passwordChange(newData).unwrap();
      console.log("login Response", res);
      if (res.success) {
        toast.success("password updated successfully");
        navigate("/auth/login");

        toast.warning("please login");

        // console.log({ ...res });
        // dispatch(setUserCredentials({ ...res }));

        // toast.success(res.message);
        // navigate(from, { replace: true });
      }
    } catch (error) {
      console.log("Error in login submission", error);
      toast.error(error?.data?.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className=" p-8 rounded-lg  w-96">
        <h2 className="mb-6 text-left font-primary text-2xl font-bold  text-gray-900">
          Enter new password
        </h2>

        <form onSubmit={handleSubmit(handlePasswordSubmit)}>
          <div className="mb-4">
            <Label
              htmlFor="password"
              className="block text-sm font-primary font-medium text-gray-700"
            >
              Enter new password
            </Label>
            <Input
              type="password"
              {...register("password")}
              id="password"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
            <div className="min-h-[10px]">
              {errors.password && (
                <span className="text-red-500 text-sm">
                  {errors.password.message}
                </span>
              )}
            </div>
          </div>

          <div className="mb-6">
            <Label
              htmlFor="confirmPassword"
              className="block text-sm font-primary font-medium text-gray-700"
            >
              confirm password
            </Label>
            <Input
              type="confirmPassword"
              {...register("confirmPassword")}
              id="confirmPassword"
              className="mt-1 block w-full p-2 font-primary border border-gray-300 rounded-md"
            />
            <div className="min-h-[10px]">
              {errors.confirmPassword && (
                <span className="text-red-500 text-sm">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-black font-primary text-white p-2 rounded-md mb-4"
          >
            {isLoading ? "changing ..." : "update"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
