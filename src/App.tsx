import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import Layout from "./components/Layout";
import AuthLayout from "./components/AuthLayout";
import Index from "./pages/Index";
import Clothes from "./pages/Clothes";
import Shoes from "./pages/Shoes";
import Watches from "./pages/Watches";
import Belts from "./pages/Belts";
import Perfumes from "./pages/Perfumes";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import Shipping from "./pages/Shipping";
import TrackOrder from "./pages/TrackOrder";
import NotFound from "./pages/NotFound";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import VerifyOTP from "./pages/auth/VerifyOTP";
import RequestResetEmail from "./pages/auth/RequestResetEmail";
import PasswordResetConfirm from "./pages/auth/PasswordResetConfirm";
import ChangePassword from "./pages/auth/ChangePassword";
import MyProfile from "./pages/MyProfile"; 

import { AuthProvider, useAuth } from "./context/AuthContext";
import { ReactNode } from "react";

const OrderHistory = () => <div>Order History Page</div>;

const queryClient = new QueryClient();

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading authentication...</div>;
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/accounts/login" replace />;
};

const PublicOnlyRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading authentication...</div>;
  }
  
  return isAuthenticated ? <Navigate to="/" replace /> : <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Layout><Index /></Layout>} />
            <Route path="/clothes" element={<Layout><Clothes /></Layout>} />
            <Route path="/shoes" element={<Layout><Shoes /></Layout>} />
            <Route path="/watches" element={<Layout><Watches /></Layout>} />
            <Route path="/belts" element={<Layout><Belts /></Layout>} />
            <Route path="/perfumes" element={<Layout><Perfumes /></Layout>} />
            <Route path="/shop" element={<Layout><Shop /></Layout>} />
            <Route path="/product/:id" element={<Layout><ProductDetail /></Layout>} />
            <Route path="/about" element={<Layout><About /></Layout>} />
            <Route path="/contact" element={<Layout><Contact /></Layout>} />
            <Route path="/faq" element={<Layout><FAQ /></Layout>} />
            <Route path="/shipping" element={<Layout><Shipping /></Layout>} />
            <Route path="/track-order" element={<Layout><TrackOrder /></Layout>} />

            <Route path="/accounts/register" element={<PublicOnlyRoute><AuthLayout><Register /></AuthLayout></PublicOnlyRoute>} />
            <Route path="/accounts/login" element={<PublicOnlyRoute><AuthLayout><Login /></AuthLayout></PublicOnlyRoute>} />
            <Route path="/accounts/verify-otp" element={<AuthLayout><VerifyOTP /></AuthLayout>} />
            <Route path="/accounts/request-reset-email" element={<PublicOnlyRoute><AuthLayout><RequestResetEmail /></AuthLayout></PublicOnlyRoute>} />
            <Route path="/accounts/password-reset-confirm/:uidb64/:token" element={<PublicOnlyRoute><AuthLayout><PasswordResetConfirm /></AuthLayout></PublicOnlyRoute>} />

            <Route path="/accounts/change-password" element={<PrivateRoute><AuthLayout><ChangePassword /></AuthLayout></PrivateRoute>} />
            <Route path="/accounts/myprofile" element={<PrivateRoute><Layout><MyProfile /></Layout></PrivateRoute>} />
            <Route path="/accounts/orderhistory" element={<PrivateRoute><Layout><OrderHistory /></Layout></PrivateRoute>} />

            <Route path="*" element={<Layout><NotFound /></Layout>} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
