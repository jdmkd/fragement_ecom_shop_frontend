import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { showToast } from "../../lib/toast.tsx"; // Import the new showToast

const PasswordResetConfirm = () => {
  const { uidb64, token } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: "",
    re_password: "",
  });
  const [loading, setLoading] = useState(false);

  const { password, re_password } = formData;

  useEffect(() => {
    if (!uidb64 || !token) {
      showToast({
        type: "error",
        title: "Invalid Link",
        description: "Invalid password reset link.",
      });
      navigate("/accounts/request-reset-email");
    }
  }, [uidb64, token, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (password !== re_password) {
      showToast({
        type: "error",
        title: "Password Mismatch",
        description: "Passwords do not match!",
      });
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}password-reset-confirm/${uidb64}/${token}/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password, re_password }),
      });

      const data = await response.json();

      if (response.ok) {
        showToast({
          type: "success",
          title: "Password Reset",
          description: "Your password has been reset successfully. Please login.",
        });
        navigate("/accounts/login");
      } else {
        const errorMessage = data.detail || "Password reset failed. Please try again.";
        showToast({
          type: "error",
          title: "Reset Failed",
          description: errorMessage,
        });
      }
    } catch (error) {
      showToast({
        type: "error",
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 w-full max-w-md mx-auto">
      <h1 className="text-4xl font-bold mb-4 text-center">Reset Password</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8 text-center">Enter your new password.</p>
      <form onSubmit={handleSubmit} className="space-y-6 w-full">
        <div className="space-y-2">
          <Label htmlFor="password" className="text-base">New Password</Label>
          <Input id="password" name="password" type="password" placeholder="********" value={password} onChange={handleChange} required className="p-3 text-base" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="re_password" className="text-base">Confirm New Password</Label>
          <Input id="re_password" name="re_password" type="password" placeholder="********" value={re_password} onChange={handleChange} required className="p-3 text-base" />
        </div>
        <Button type="submit" className="w-full py-3 text-base" disabled={loading}>
          {loading ? "Resetting..." : "Reset Password"}
        </Button>
      </form>
    </div>
  );
};

export default PasswordResetConfirm; 