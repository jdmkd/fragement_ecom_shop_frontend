import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { showToast } from "../../lib/toast.tsx";

const VerifyOTP = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const navigate = useNavigate();

  // ✅ Load email from localStorage at mount
  useEffect(() => {
    const storedEmail = localStorage.getItem("unverifiedUserEmail");
    if (!storedEmail) {
      showToast({
        title: "Error",
        description: "No email found for OTP verification. Please register or login again.",
        type: "error",
      });
      navigate("/accounts/login");
    } else {
      setUserEmail(storedEmail);
    }
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value);
  };

  // ✅ Call backend to resend OTP
  const handleResendOtp = async () => {
    if (!userEmail) return;

    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}auth/resend-otp/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userEmail }),
      });

      const data = await response.json();

      if (response.ok) {
        showToast({
          type: "success",
          title: "OTP Resent",
          description: "A new OTP has been sent to your email.",
        });
      } else {
        showToast({
          type: "error",
          title: "Resend Failed",
          description: data.message || "Unable to resend OTP. Please try again.",
        });
      }
    } catch (error) {
      console.error("Resend OTP error:", error);
      showToast({
        type: "error",
        title: "Error",
        description: "Something went wrong while resending OTP.",
      });
    } finally {
      setLoading(false);
    }
  };

  // ✅ Verify OTP
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userEmail) return;

    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}auth/verify-otp/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userEmail, otp }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.removeItem("unverifiedUserEmail"); // Clear stored email
        showToast({
          type: "success",
          title: "Account Verified",
          description: "Your account has been verified. Please login.",
        });
        navigate("/accounts/login");
      } else {
        showToast({
          type: "error",
          title: "Verification Failed",
          description: data.message || "OTP verification failed. Please try again.",
        });
      }
    } catch (error) {
      console.error("Verify OTP error:", error);
      showToast({
        type: "error",
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!userEmail) {
    return null; // show nothing while checking storage
  }

  return (
    <div className="flex flex-col items-center justify-center p-4 w-full max-w-md mx-auto">
      <h1 className="text-4xl font-bold mb-4 text-center">Verify Your Account</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8 text-center">
        An OTP has been sent to{" "}
        <span className="font-semibold text-primary">{userEmail}</span>.  
        Please enter it below to verify your account.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6 w-full">
        <div className="space-y-2">
          <Label htmlFor="otp" className="text-base">OTP Code</Label>
          <Input
            id="otp"
            name="otp"
            type="text"
            placeholder="XXXXXX"
            value={otp}
            onChange={handleChange}
            required
            maxLength={6}
            className="p-3 text-base"
          />
        </div>
        <Button type="submit" className="w-full py-3 text-base" disabled={loading}>
          {loading ? "Verifying..." : "Verify Account"}
        </Button>
      </form>

      <p className="text-sm text-gray-500 mt-8">
        Didn't receive the OTP?{" "}
        <Button
          variant="link"
          className="p-0 h-auto text-primary hover:underline"
          onClick={handleResendOtp}
          disabled={loading}
        >
          Resend OTP
        </Button>
      </p>
    </div>
  );
};

export default VerifyOTP;
