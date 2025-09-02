import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { User, Mail, Phone, Hash, Calendar, MapPin, CreditCard, Heart, Settings, HelpCircle, LogOut } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { showToast } from "../lib/toast.tsx"; // Import the new showToast
import axios from "axios";

const MyProfile = () => {
  const { user, loading, authToken, fetchUser, logout: authLogout } = useAuth();
  const [formData, setFormData] = useState({
    fullname: "",
    phonenumber: "",
    dateOfBirth: "",
    gender: "",
    shippingAddress: "",
    billingAddress: "",
    profileImage: null as File | null,
  });
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        fullname: user.fullname || "",
        phonenumber: user.phonenumber || "",
        dateOfBirth: "",
        gender: "",
        shippingAddress: user.address?.shipping || "",
        billingAddress: user.address?.billing || "",
        profileImage: null,
      });
    }
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <p className="text-gray-600 dark:text-gray-400 text-xl font-medium">Loading profile data...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <p className="text-red-600 dark:text-red-400 text-xl font-medium">User data not available. Please log in.</p>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData((prev) => ({ ...prev, profileImage: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setFormData((prev) => ({ ...prev, profileImage: null }));
      setProfileImagePreview(null);
    }
  };

  const handleSaveChanges = async () => {
    setSaveLoading(true);
    try {
      const form = new FormData();
      form.append("fullname", formData.fullname);
      form.append("phonenumber", formData.phonenumber);
      form.append("dateOfBirth", formData.dateOfBirth);
      form.append("gender", formData.gender);
      form.append("shippingAddress", formData.shippingAddress);
      form.append("billingAddress", formData.billingAddress);
      if (formData.profileImage) {
        form.append("profile_image", formData.profileImage);
      }

      const response = await axios.patch(`${import.meta.env.VITE_API_BASE_URL}profile/update/`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.status === 200) {
        showToast({
          type: "success",
          title: "Profile Updated",
          description: "Your profile has been updated successfully!",
        });
        fetchUser(); // Refresh user data in AuthContext
        setIsEditing(false);
      } else {
        showToast({
          type: "error",
          title: "Update Failed",
          description: "Failed to update profile. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      showToast({
        type: "error",
        title: "Error",
        description: "An error occurred while saving changes.",
      });
    } finally {
      setSaveLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    if (user) {
      setFormData({
        fullname: user.fullname || "",
        phonenumber: user.phonenumber || "",
        dateOfBirth: "",
        gender: "",
        shippingAddress: user.address?.shipping || "",
        billingAddress: user.address?.billing || "",
        profileImage: null,
      });
      setProfileImagePreview(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-5xl bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden md:flex">

        <div className="w-full md:w-1/4 p-6 sm:p-8 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">My Account</h3>
          <nav className="space-y-3">
            <Link to="/accounts/myprofile" className="flex items-center p-3 rounded-lg text-primary-600 dark:text-primary-400 font-semibold bg-primary-50 dark:bg-primary-900/20 hover:bg-primary-100 dark:hover:bg-primary-900 transition-colors"><User className="mr-3 h-5 w-5" /> Profile</Link>
            <Link to="/accounts/orders" className="flex items-center p-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"><CreditCard className="mr-3 h-5 w-5" /> My Orders</Link>
            <Link to="/accounts/wishlist" className="flex items-center p-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"><Heart className="mr-3 h-5 w-5" /> Wishlist</Link>
            <Link to="/accounts/payment-methods" className="flex items-center p-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"><CreditCard className="mr-3 h-5 w-5" /> Payment Methods</Link>
            <Link to="/accounts/settings" className="flex items-center p-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"><Settings className="mr-3 h-5 w-5" /> Settings</Link>
            <Link to="/accounts/help" className="flex items-center p-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"><HelpCircle className="mr-3 h-5 w-5" /> Help & Support</Link>
            <Button variant="ghost" onClick={authLogout} className="w-full flex items-center justify-start p-3 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"><LogOut className="mr-3 h-5 w-5" /> Logout</Button>
          </nav>
        </div>

        <div className="w-full md:w-3/4 p-6 sm:p-8 lg:p-10 space-y-8">

          <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-8 pb-6 border-b border-gray-200 dark:border-gray-700">
            <div className="relative">
              <img
                src={profileImagePreview || `https://api.dicebear.com/7.x/initials/svg?seed=${user.username || user.email}`}
                alt="Profile Avatar"
                className="w-28 h-28 rounded-full border-4 border-primary-500 dark:border-primary-400 object-cover shadow-md"
              />
              <Label htmlFor="profile-image-upload" className="absolute bottom-0 right-0 p-2 bg-primary-600 dark:bg-primary-500 rounded-full cursor-pointer hover:bg-primary-700 dark:hover:bg-primary-600 transition-colors shadow-lg">
                <Input id="profile-image-upload" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                <User className="h-5 w-5 text-white" />
              </Label>
            </div>
            <div className="text-center sm:text-left">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight">{user.fullname || user.username}</h1>
              <p className="text-xl text-gray-500 dark:text-gray-400">@{user.username}</p>
              {!isEditing && (
                <Button onClick={() => setIsEditing(true)} className="mt-4 px-6 py-2 text-base rounded-full shadow-sm">Edit Profile</Button>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="fullname">Full Name</Label>
                <Input id="fullname" name="fullname" type="text" value={formData.fullname} onChange={handleChange} disabled={!isEditing} className="p-3" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" value={user.email} disabled className="bg-gray-100 dark:bg-gray-700 cursor-not-allowed p-3" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phonenumber">Phone Number</Label>
                <Input id="phonenumber" name="phonenumber" type="tel" value={formData.phonenumber} onChange={handleChange} disabled={!isEditing} className="p-3" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input id="dateOfBirth" name="dateOfBirth" type="date" value={formData.dateOfBirth} onChange={handleChange} disabled={!isEditing} className="p-3" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select name="gender" value={formData.gender} onValueChange={(value) => handleSelectChange("gender", value)} disabled={!isEditing}>
                  <SelectTrigger className="w-full p-3">
                    <SelectValue placeholder="Select Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Addresses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="shippingAddress">Shipping Address</Label>
                <Textarea id="shippingAddress" name="shippingAddress" value={formData.shippingAddress} onChange={handleChange} disabled={!isEditing} className="p-3 min-h-[100px]" placeholder="Enter your shipping address" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="billingAddress">Billing Address</Label>
                <Textarea id="billingAddress" name="billingAddress" value={formData.billingAddress} onChange={handleChange} disabled={!isEditing} className="p-3 min-h-[100px]" placeholder="Enter your billing address" />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Account Actions</h2>
            <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center space-y-3 sm:space-y-0">
              <Link to="/accounts/change-password" className="text-lg text-primary-600 dark:text-primary-400 hover:underline font-medium">
                Change Password
              </Link>
            </div>
          </div>

          {isEditing && (
            <div className="sticky bottom-0 bg-white dark:bg-gray-800 p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-4">
              <Button variant="outline" onClick={handleCancelEdit} disabled={saveLoading}>Cancel</Button>
              <Button onClick={handleSaveChanges} disabled={saveLoading}>
                {saveLoading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default MyProfile; 