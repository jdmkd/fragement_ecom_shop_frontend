import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { showToast } from "../../lib/toast.tsx"; // Import the new showToast

const ChangePassword = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    old_password: "",
    new_password: "",
    re_new_password: "",
  });
  const [loading, setLoading] = useState(false);

  const { old_password, new_password, re_new_password } = formData;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (new_password !== re_new_password) {
      showToast({
        type: "error",
        title: "Password Mismatch",
        description: "New passwords do not match!",
      });
      setLoading(false);
      return;
    }

    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
      showToast({
        type: "error",
        title: "Authentication Required",
        description: "You are not logged in. Please log in to change your password.",
      });
      navigate("/accounts/login");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}change-password/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ old_password, new_password, re_new_password }),
      });

      const data = await response.json();

      if (response.ok) {
        showToast({
          type: "success",
          title: "Password Changed",
          description: "Your password has been changed successfully.",
        });
        navigate("/accounts/myprofile");
      } else {
        const errorMessage = data.detail || "Password change failed. Please check your old password.";
        showToast({
          type: "error",
          title: "Change Failed",
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
      <h1 className="text-4xl font-bold mb-4 text-center">Change Password</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8 text-center">Update your account password.</p>
      <form onSubmit={handleSubmit} className="space-y-6 w-full">
        <div className="space-y-2">
          <Label htmlFor="old_password" className="text-base">Old Password</Label>
          <Input id="old_password" name="old_password" type="password" placeholder="********" value={old_password} onChange={handleChange} required className="p-3 text-base" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="new_password" className="text-base">New Password</Label>
          <Input id="new_password" name="new_password" type="password" placeholder="********" value={new_password} onChange={handleChange} required className="p-3 text-base" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="re_new_password" className="text-base">Confirm New Password</Label>
          <Input id="re_new_password" name="re_new_password" type="password" placeholder="********" value={re_new_password} onChange={handleChange} required className="p-3 text-base" />
        </div>
        <Button type="submit" className="w-full py-3 text-base" disabled={loading}>
          {loading ? "Changing Password..." : "Change Password"}
        </Button>
      </form>
    </div>
  );
};

export default ChangePassword; 