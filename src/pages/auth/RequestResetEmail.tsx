import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { showToast } from "../../lib/toast.tsx"; // Import the new showToast

const RequestResetEmail = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}auth/request-reset-email/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        showToast({
          type: "success",
          title: "Reset Link Sent",
          description: "Password reset link sent to your email.",
        });
      } else {
        const errorMessage = data.email ? data.email[0] : data.detail || "Failed to send reset email.";
        showToast({
          type: "error",
          title: "Reset Link Failed",
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
      <h1 className="text-4xl font-bold mb-4 text-center">Forgot Password</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8 text-center">Enter your email to receive a password reset link.</p>
      <form onSubmit={handleSubmit} className="space-y-6 w-full">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-base">Email</Label>
          <Input id="email" name="email" type="email" placeholder="m@example.com" value={email} onChange={handleChange} required className="p-3 text-base" />
        </div>
        <Button type="submit" className="w-full py-3 text-base" disabled={loading}>
          {loading ? "Sending..." : "Send Reset Link"}
        </Button>
      </form>
      <p className="text-sm text-gray-500 mt-8">
        Remember your password?{" "}
        <Link to="/accounts/login" className="font-medium text-primary hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
};

export default RequestResetEmail; 