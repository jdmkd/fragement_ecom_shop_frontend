import { Link } from "react-router-dom";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin,
  CreditCard,
  Shield,
  Truck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/30 border-t border-border">
      {/* Main Footer */}
      <div className="container-responsive py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">Fragement </span>
              </div>
              <span className="font-bold text-xl gradient-text">Fragement </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Your one-stop destination for fashion, lifestyle, and premium products. 
              Quality guaranteed with fast delivery across India.
            </p>
            <div className="flex space-x-3">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Youtube className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link to="/faq" className="text-muted-foreground hover:text-primary transition-colors">FAQ</Link></li>
              <li><Link to="/shipping" className="text-muted-foreground hover:text-primary transition-colors">Shipping Policy</Link></li>
              <li><Link to="/returns" className="text-muted-foreground hover:text-primary transition-colors">Returns Policy</Link></li>
              <li><Link to="/track-order" className="text-muted-foreground hover:text-primary transition-colors">Track Order</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/clothes" className="text-muted-foreground hover:text-primary transition-colors">Clothing</Link></li>
              <li><Link to="/shoes" className="text-muted-foreground hover:text-primary transition-colors">Footwear</Link></li>
              <li><Link to="/watches" className="text-muted-foreground hover:text-primary transition-colors">Watches</Link></li>
              <li><Link to="/belts" className="text-muted-foreground hover:text-primary transition-colors">Belts</Link></li>
              <li><Link to="/perfumes" className="text-muted-foreground hover:text-primary transition-colors">Perfumes</Link></li>
              <li><Link to="/shop" className="text-muted-foreground hover:text-primary transition-colors">All Products</Link></li>
            </ul>
          </div>

          {/* Newsletter & Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Stay Connected</h3>
            <p className="text-muted-foreground text-sm">
              Subscribe to get updates on new arrivals and exclusive offers.
            </p>
            <div className="flex space-x-2">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1"
              />
              <Button variant="default" size="sm" className="btn-secondary">
                Subscribe
              </Button>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>support@.com</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>Mumbai, Maharashtra, India</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Bar */}
      <div className="border-t border-border bg-muted/50">
        <div className="container-responsive py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="flex items-center justify-center space-x-3">
              <Truck className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">Free Shipping Above ₹500</span>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <Shield className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">Secure Payment</span>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <CreditCard className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">Easy Returns</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="container-responsive py-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              © {currentYear} . All rights reserved.
            </p>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <Link to="/privacy" className="hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-primary transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;