import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Search, Heart, ShoppingCart, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

const navItems = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Products", path: "/products" },
  { name: "Contact", path: "/contact" },
];

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl shadow-md border-b border-border transition-all">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-20">
  {/* Logo */}
  <Link to="/" className="flex items-center space-x-2">
    <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-xl flex items-center justify-center shadow-lg">
      <span className="text-white font-bold text-2xl">F</span>
    </div>
    <span className="font-semibold text-2xl tracking-wide text-gray-900">
      Fragement
    </span>
  </Link>

  {/* Navigation (Desktop) */}
  <nav className="hidden lg:flex items-center space-x-8">
    {navItems.map((item) => (
      <Link
        key={item.name}
        to={item.path}
        className={`text-base font-medium transition-all duration-200 px-2 py-1 rounded-lg hover:text-primary hover:bg-primary/10 ${
          isActive(item.path)
            ? "text-primary bg-primary/10"
            : "text-muted-foreground"
        }`}
      >
        {item.name}
      </Link>
    ))}
  </nav>

  {/* Right Side: Search, Profile, Auth */}
  <div className="flex items-center space-x-3">
    {/* Search field (desktop) */}
    <div className="relative flex-1 min-w-[10px] max-w-xs">
      <input
        type="text"
        placeholder="Search products..."
        className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-gray-200 bg-white/60 backdrop-blur-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
      />
      <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
    </div>

    {/* Profile dropdown (always visible) */}
    {user ? (
      <div className="relative">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setProfileOpen(!profileOpen)}
        >
          <User className="h-7 w-7 text-muted-foreground hover:text-primary transition-colors" />
        </Button>
        {profileOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white/90 backdrop-blur-lg rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50">
            <div className="block px-4 py-2 text-sm text-gray-700 border-b-2">
              Welcome, {user.username || user.email}
            </div>
            <Link
              to="/accounts/myprofile"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary/10 hover:text-primary"
              onClick={() => setProfileOpen(false)}
            >
              My Profile
            </Link>
            <Link
              to="/accounts/orderhistory"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary/10 hover:text-primary"
              onClick={() => setProfileOpen(false)}
            >
              My Orders
            </Link>
            <button
              onClick={() => {
                logout();
                setProfileOpen(false);
              }}
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    ) : (
      <>
        <Button
          onClick={() => navigate("/accounts/login")}
          className="bg-primary text-white rounded-xl px-6 py-2 font-semibold shadow hover:bg-primary/90 transition-all text-base"
        >
          Sign In
        </Button>
        <Button
          variant="outline"
          onClick={() => navigate("/accounts/register")}
          className="rounded-xl px-6 py-2 font-semibold border-primary text-primary hover:bg-primary/10 transition-all text-base"
        >
          Sign Up
        </Button>
      </>
    )}

    {/* Hamburger (Mobile) */}
    <Button
      variant="ghost"
      size="icon"
      className="lg:hidden"
      onClick={() => setDrawerOpen(true)}
    >
      <Menu className="h-7 w-7 text-muted-foreground" />
    </Button>
  </div>
</div>

      {/* Mobile Fullscreen Drawer */}
      {drawerOpen && (
        <div className="fixed lg:hidden mt-0 right-0 top-0 z-50 bg-white/95 rounded-md ">
          {/* Close Button at Top Right */}
          <div className="flex items-center justify-between px-6 py-5 border-b">
            <span className="font-bold text-xl text-primary">Menu</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setDrawerOpen(false)}
            >
              <X className="h-6 w-6 text-muted-foreground" />
            </Button>
          </div>

          {/* Nav Links */}
          <nav className="flex flex-col px-6 py-6 space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setDrawerOpen(false)}
                className={`text-lg font-medium px-4 py-3 rounded-lg transition-all ${
                  isActive(item.path)
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-primary hover:bg-primary/10"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Search bar */}
          <div className="px-6 py-4">
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-3 text-base rounded-xl border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
              />
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Auth buttons at bottom */}
          <div className="flex flex-col px-6 py-6 space-y-4 border-t mt-auto">
            {!user ? (
              <>
                <Button
                  onClick={() => {
                    navigate("/accounts/login");
                    setDrawerOpen(false);
                  }}
                  className="bg-primary text-white rounded-xl px-6 py-3 font-semibold shadow hover:bg-primary/90 transition-all text-lg"
                >
                  Sign In
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    navigate("/accounts/register");
                    setDrawerOpen(false);
                  }}
                  className="rounded-xl px-6 py-3 font-semibold border-primary text-primary hover:bg-primary/10 transition-all text-lg"
                >
                  Sign Up
                </Button>
              </>
            ) : (
              <Button
                onClick={() => {
                  logout();
                  setDrawerOpen(false);
                }}
                className="bg-red-500 text-white rounded-xl px-6 py-3 font-semibold shadow hover:bg-red-600 transition-all text-lg"
              >
                Logout
              </Button>
            )}
          </div>
        </div>
      )}

    </header>
  );
};

export default Header;
