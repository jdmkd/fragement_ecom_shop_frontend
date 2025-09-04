import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { showToast } from "../../lib/toast.tsx";
import { useAuth } from '../../context/AuthContext';
import { Eye, EyeOff } from "lucide-react"; // 👈 import icons

const Login = () => {
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // 👈 state for toggle
  const navigate = useNavigate();
  const { login } = useAuth();

  const { identifier, password } = formData;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}auth/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: identifier, password }),
      });

      const data = await response.json();

      if (response.ok) {
        const accessToken = data.data?.access;
        const refreshToken = data.data?.refresh;

        if (accessToken && refreshToken) {
          login(accessToken, refreshToken);
          showToast({
            type: "success",
            title: "Login Successful",
            description: "Login successful!",
          });
          navigate("/");
        } else {
          showToast({
            type: "error",
            title: "Login Failed",
            description: "Login successful, but tokens not received from data.data. Please check backend response structure.",
          });
        }
      } else {
        const errorMessage = data.message || "Login failed. Please check your credentials.";
        console.log("Login error response data1:", data); // Debugging line
        
        if (data.special_code === "account_not_verified") {
          localStorage.setItem("unverifiedUserEmail", identifier);
          console.log("Navigating to /accounts/verify-otp due to unverified account."); // Debugging line
          navigate("/accounts/verify-otp");
          showToast({
            type: "info",
            title: "Account Not Verified",
            // description: data.message,
            description: "Your account is not verified. Please verify your email with the OTP.",
          });
        }else {
          showToast({
            type: "error",
            title: "Login Failed",
            description: data.message || "Login failed. Please check your credentials.",
          });
        }
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
    <div className="flex flex-col items-center justify-center p-4 w-full max-w-sm mx-auto">
      <h1 className="text-4xl font-bold mb-4 text-center">Login</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8 text-center">Sign in to your account</p>
      <form onSubmit={handleSubmit} className="space-y-6 w-full">
        <div className="space-y-2">
          <Label htmlFor="identifier" className="text-base">Username or Email</Label>
          <Input id="identifier" name="identifier" type="text" placeholder="Enter your username or email" value={identifier} onChange={handleChange} required className="p-3 text-base" />
        </div>

        {/* Password field with toggle */}
        <div className="space-y-2 relative">
          <Label htmlFor="password" className="text-base">Password</Label>
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="********"
            value={password}
            onChange={handleChange}
            required
            className="p-3 text-base pr-10"
          />
          <button
            type="button"
            className="absolute right-2 top-[35px] text-gray-500 hover:text-gray-700"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <Link to="/accounts/request-reset-email" className="text-sm font-medium text-primary hover:underline self-end">
          Forgot password?
        </Link>
        <Button type="submit" className="w-full py-3 text-base" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </Button>
      </form>
      <p className="text-sm text-gray-500 mt-8">
        Don't have an account?{" "}
        <Link to="/accounts/register" className="font-medium text-primary hover:underline">
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;
