import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useResendForgotOtpMutation, useVerifyForgotMutation } from "@/app/service/authApiSlice";

const ForgotOtp = () => {
  const [otp, setOtp] = useState(Array(6).fill("")); // Initialize with an array of 6 empty strings
  const [timer, setTimer] = useState(60);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const inputRefs = useRef([]);
  const countdownRef = useRef(null);
  const navigate = useNavigate();

  const [verifyForgot,{isLoading}] = useVerifyForgotMutation()
  const [resendForgotOtp,{isLoading:resentLoading}] = useResendForgotOtpMutation()

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
    // Initial countdown on mount
    startCountdown();

    // Clear interval on unmount
    return () => clearInterval(countdownRef.current);
  }, []);

  const startCountdown = () => {
    setIsResendDisabled(true);
    setTimer(60);
    clearInterval(countdownRef.current);
    countdownRef.current = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 1) {
          clearInterval(countdownRef.current);
          setIsResendDisabled(false);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);
  };

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (isNaN(Number(value))) return; // Ensure only numbers are entered

    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    // Move to the next input if the current one is filled
    if (value !== "" && index < otp.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleResendClick = async () => {
    const userEmail = localStorage.getItem("forgotEmail");
    try {
      const res = await resendForgotOtp({ email: userEmail }).unwrap();
      console.log(res, "response from resending otp");
      toast.success(
        res.message || "Otp has been resent to your email addresss"
      );
      console.log(res);
      startCountdown();
    } catch (error) {
      console.log(error, "Error in sending otp");
      toast.error(error.data.message);
    }
    // setIsResendDisabled(true);
    // setTimer(60);
  };

  const handleSubmit = async () => {
    const enteredOTP = otp.join('');
    console.log('Submitting OTP:', enteredOTP);

    try {
        const res = await verifyForgot({ otp: enteredOTP }).unwrap();
        console.log('Verifying OTP', res);

  
        if (res.success) {
          localStorage.setItem("forgotEmail",res.savedUser.email)
          navigate('/auth/updatePassword');
          toast.success(res.message);
        }
      } catch (error) {
        console.log('Error while verifying OTP', error);
        toast.error(error.data?.message);
      }

  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-primary font-bold text-center">
            Enter OTP
          </CardTitle>
          <CardDescription className="text-center font-tertiary">
            We&apos;ve sent a 6-digit code to your email. Please enter it below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center space-x-2 mb-6">
            {otp.map((digit, index) => (
              <Input
                key={index}
                type="text"
                maxLength={1}
                value={digit}
                ref={(input) => (inputRefs.current[index] = input)}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-12 h-12 text-center text-2xl"
              />
            ))}
          </div>
          <div className="text-center mb-2">
            {timer > 0 ? (
              <p className="text-sm font-primary text-muted-foreground">
                Resend OTP in {timer} seconds
              </p>
            ) : (
              <Button
                onClick={handleResendClick}
                disabled={isResendDisabled || resentLoading}
                variant="outline"
                className="w-full font-primary"
              >
                {resentLoading ? "Resending otp" : "Resend"}
              </Button>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button
            disabled={isLoading}
            onClick={handleSubmit}
            className="w-full font-primary"
          >
            {isLoading ? "Submitting" : "Submit"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ForgotOtp;
