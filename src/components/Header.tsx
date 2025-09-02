import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, ShoppingCart, User, Menu, X, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import profileUserIcon from '../assets/images/profileicons/profile-user.png'
import AccountIcon from "../assets/images/profileicons/account.png"
import logOutIcon from '../assets/images/profileicons/log-out.png'
import settingsIcon from '../assets/images/profileicons/settings.png'
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const [menuActive, setMenuActive] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const { user, isAuthenticated, logout, loading } = useAuth();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Clothes", path: "/clothes" },
    { name: "Shoes", path: "/shoes" },
    { name: "Watches", path: "/watches" },
    { name: "Belts", path: "/belts" },
    { name: "Perfumes", path: "/perfumes" },
    { name: "Shop", path: "/shop" },
  ];

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    const handleMenuToggle = () => {
      setMenuActive(prev => !prev);
    };

    const menuActiveElement = document.querySelector('menu-btn');

    if (menuActiveElement) {
      menuActiveElement.addEventListener('click', handleMenuToggle);
    }

    return () => {
        if (menuActiveElement) {
          menuActiveElement.removeEventListener('click', handleMenuToggle);
        }
    };
}, []);

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container-responsive">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">F</span>
            </div>
            <span className="font-bold text-xl gradient-text">Fragement</span>
          </Link>

          <nav className="hidden lg:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive(item.path) 
                    ? "text-primary border-b-2 border-primary" 
                    : "text-muted-foreground"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center flex-1 max-w-md mx-6">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 bg-muted/50 border-0 focus:bg-white"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <Heart className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-secondary text-secondary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="hidden sm:flex">
                  <img src={profileUserIcon} alt="User profile icon" height={20} width={20} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                {loading ? (
                    <DropdownMenuLabel>Loading...</DropdownMenuLabel>
                ) : isAuthenticated && user ? (
                  <>
                    <DropdownMenuLabel>Welcome: {user.username || user.email}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem>
                        <img src={profileUserIcon} height={20} width={20} alt="Profile icon" className="mr-2" />
                        <Link to="/accounts/myprofile">My Profile</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleLogout}>
                        <img src={logOutIcon} height={20} width={20} alt="Logout icon" className="mr-2" />
                        <span>Logout</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <img src={settingsIcon} height={20} width={20} alt="Order history icon" className="mr-2" />
                        <Link to="/accounts/orderhistory">Order History</Link>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </>
                ) : (
                  <>
                    <DropdownMenuLabel>My Profile</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <img src={AccountIcon} height={20} width={20} alt="Login icon" className="mr-2" />
                      <Link to="/accounts/login">Login or Register</Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        <div className="md:hidden pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 bg-muted/50 border-0"
            />
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden border-t border-border bg-background">
          <nav className="container-responsive py-4">
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-sm font-medium py-2 px-3 rounded-md transition-colors ${
                    isActive(item.path)
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-primary hover:bg-muted/50"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;