import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { showToast } from "../../lib/toast.tsx";
import { useAuth } from "../../context/AuthContext";
import { Eye, EyeOff } from "lucide-react";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    fullname: "",
    email: "",
    phonenumber: "",
    password: "",
    password2: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const { username, fullname, email, phonenumber, password, password2 } = formData;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (password !== password2) {
      showToast({
        type: "error",
        title: "Registration Failed",
        description: "Passwords do not match!",
      });
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}auth/register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, fullname, email, phonenumber, password, password2 }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("unverifiedUserEmail", email);
        showToast({
          type: "success",
          title: "Registration Successful",
          description: "Registration successful! Please check your email for verification.",
        });
        navigate("/accounts/verify-otp");
      } else {
        const errorMessage =
          data.username ? data.username[0] : data.email ? data.email[0] : data.detail || "Registration failed.";
        showToast({
          type: "error",
          title: "Registration Failed",
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
    <div className="flex flex-col items-center justify-center p-4 w-full max-w-sm mx-auto">
      <h1 className="text-4xl font-bold mb-4 text-center">Register</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8 text-center">
        Create your account to get started
      </p>
      <form onSubmit={handleSubmit} className="space-y-6 w-full">
        <div className="space-y-2">
          <Label htmlFor="username" className="text-base">Username</Label>
          <Input
            id="username"
            name="username"
            type="text"
            placeholder="johndoe"
            value={username}
            onChange={handleChange}
            required
            className="p-3 text-base"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="fullname" className="text-base">Full Name</Label>
          <Input
            id="fullname"
            name="fullname"
            type="text"
            placeholder="John Doe"
            value={fullname}
            onChange={handleChange}
            required
            className="p-3 text-base"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" className="text-base">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="m@example.com"
            value={email}
            onChange={handleChange}
            required
            className="p-3 text-base"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phonenumber" className="text-base">Phone Number</Label>
          <Input
            id="phonenumber"
            name="phonenumber"
            type="tel"
            placeholder="+1234567890"
            value={phonenumber}
            onChange={handleChange}
            required
            className="p-3 text-base"
          />
        </div>

        {/* Password */}
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

        {/* Confirm Password */}
        <div className="space-y-2 relative">
          <Label htmlFor="password2" className="text-base">Confirm Password</Label>
          <Input
            id="password2"
            name="password2"
            type={showPassword2 ? "text" : "password"}
            placeholder="********"
            value={password2}
            onChange={handleChange}
            required
            className="p-3 text-base pr-10"
          />
          <button
            type="button"
            className="absolute right-2 top-[35px] text-gray-500 hover:text-gray-700"
            onClick={() => setShowPassword2((prev) => !prev)}
          >
            {showPassword2 ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <Button type="submit" className="w-full py-3 text-base" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </Button>
      </form>
      <p className="text-sm text-gray-500 mt-8">
        Already have an account?{" "}
        <Link to="/accounts/login" className="font-medium text-primary hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
