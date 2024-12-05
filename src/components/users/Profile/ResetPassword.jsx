import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronRight, KeyRound } from "lucide-react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useResetUserPasswordMutation } from "@/app/service/userApiSlice";
import { toast } from "react-toastify";
import { ResetPasswordUserProfileSchema } from "@/validationSchemas/resetUserProfilePassword";

const ResetPassword = () => {
  const { register,handleSubmit,reset,formState: { errors } } = useForm({ resolver: zodResolver(ResetPasswordUserProfileSchema) });

  console.log("insider resetPassword")

  const [ResetPassword, { isLoading }] = useResetUserPasswordMutation();

  const resetPasswordForm = async (data) => {
    try {
      console.log(data, "data from reset password form");

      const res = await ResetPassword(data).unwrap();

      console.log(res, "response form reset password api");
      if (res.success) {
        toast.success(res.message);
      }

      reset();
    } catch (error) {
      console.log(error, "error while reseting the password");
      toast.error(error.data.message);
      reset();
    }
  };

  return (
    <div className="flex-1 p-6">
      <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
        <Link href="/" className="hover:text-primary transition-colors">
          Home
        </Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/accounts" className="hover:text-primary transition-colors">
          Accounts
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground font-medium">Change Password</span>
      </nav>

      <Card className="max-w-sm mx-auto">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            <KeyRound className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-2xl font-semibold font-primary">
            Update Your Password
          </CardTitle>
        </CardHeader>
        <CardContent className="p-5">
          <form
            onSubmit={handleSubmit(resetPasswordForm)}
            className="space-y-4"
          >
            <div className="space-y-2 font-primary">
              <Label htmlFor="current-password ">Current Password</Label>
              <Input
                id="current-password"
                type="password"
                {...register("currentPassword")}
                placeholder="Enter current password"
              />
              <div className="min-h-[5px]">
                {errors.currentPassword && (
                  <span className="text-red-500 text-sm font-tertiary ">
                    {errors?.currentPassword?.message}
                  </span>
                )}
              </div>
            </div>
            <div className="space-y-2 font-primary">
              <Label htmlFor="new-password">New Password</Label>
              <Input
                id="new-password"
                type="password"
                placeholder="Enter new password"
                {...register("newPassword")}
              />
              <div className="min-h-[5px]">
                {errors.newPassword && (
                  <span className="text-red-500 text-sm font-tertiary ">
                    {errors?.newPassword?.message}
                  </span>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label className=" font-primary" htmlFor="confirm-password">
                Confirm Password
              </Label>
              <Input
                id="confirm-password"
                type="password"
                placeholder="Confirm new password"
                className="font-light font-primary"
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
            <Button disabled={isLoading} className="max-w-36" type="submit">
              {isLoading ? "updating .." : "update password"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPassword;
