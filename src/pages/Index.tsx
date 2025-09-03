import { Link } from "react-router-dom";
import { ArrowRight, Star, Truck, Shield, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ProductCard from "@/components/ProductCard";
import heroBanner from "@/assets/hero-banner.jpg";
import clothesCategory from "@/assets/clothes-category.jpg";
import shoesCategory from "@/assets/shoes-category.jpg";
import watchesCategory from "@/assets/watches-category.jpg";
import beltsCategory from "@/assets/belts-category.jpg";
import perfumesCategory from "@/assets/perfumes-category.jpg";

const Index = () => {
  const categories = [
    {
      name: "Clothes",
      image: clothesCategory,
      link: "/clothes",
      description: "Latest fashion trends",
    },
    {
      name: "Shoes",
      image: shoesCategory,
      link: "/shoes",
      description: "Comfort meets style",
    },
    {
      name: "Watches",
      image: watchesCategory,
      link: "/watches",
      description: "Timeless elegance",
    },
    {
      name: "Belts",
      image: beltsCategory,
      link: "/belts",
      description: "Premium accessories",
    },
    {
      name: "Perfumes",
      image: perfumesCategory,
      link: "/perfumes",
      description: "Signature fragrances",
    },
  ];

  const featuredProducts = [
    {
      id: "1",
      name: "Premium Cotton Kurta",
      price: 1299,
      originalPrice: 1799,
      rating: 4.5,
      image: clothesCategory,
      category: "clothes",
      brand: "FashionHub",
      inStock: true,
      isNew: true,
    },
    {
      id: "2",
      name: "Nike Air Max Sneakers",
      price: 5999,
      originalPrice: 7999,
      rating: 4.8,
      image: shoesCategory,
      category: "shoes",
      brand: "Nike",
      inStock: true,
    },
    {
      id: "3",
      name: "Titan Smart Watch",
      price: 12999,
      rating: 4.6,
      image: watchesCategory,
      category: "watches",
      brand: "Titan",
      inStock: true,
    },
    {
      id: "4",
      name: "Fogg Scent Perfume",
      price: 699,
      originalPrice: 999,
      rating: 4.3,
      image: perfumesCategory,
      category: "perfumes",
      brand: "Fogg",
      inStock: true,
    },
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      rating: 5,
      comment: "Amazing quality and fast delivery! Highly recommended.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612c5d4?w=100",
    },
    {
      name: "Rajesh Kumar",
      rating: 5,
      comment: "Great shopping experience. Products exactly as described.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
    },
    {
      name: "Sneha Patel",
      rating: 4,
      comment: "Love the variety and quality. Will shop again!",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center bg-gradient-to-br from-primary/90 via-accent/70 to-secondary/80 overflow-hidden">
        {/* Animated Abstract Background */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <svg className="absolute top-0 left-0 w-2/3 h-2/3 animate-pulse opacity-25" viewBox="0 0 600 600">
            <ellipse cx="300" cy="300" rx="280" ry="180" fill="#fff" fillOpacity="0.13" />
          </svg>
          <svg className="absolute bottom-0 right-0 w-1/3 h-1/3 animate-spin-slow opacity-15" viewBox="0 0 300 300">
            <rect x="0" y="0" width="300" height="300" rx="80" fill="#fff" fillOpacity="0.10" />
          </svg>
          <div className="absolute top-1/4 left-1/2 w-32 h-32 bg-gradient-to-tr from-primary/40 via-accent/30 to-secondary/40 rounded-full blur-2xl opacity-40 animate-float" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-16">
          {/* Left: Text */}
          <div className="flex-1 animate-fade-in-up text-center md:text-left">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-8 tracking-tight drop-shadow-xl">
              <span className="block mb-2">Elevate Your Style</span>
              <span className="bg-gradient-to-r from-secondary via-primary to-accent bg-clip-text text-transparent animate-gradient-x">
                Fashion, Reimagined
              </span>
            </h1>
            <p className="text-lg md:text-2xl text-muted-foreground mb-10 max-w-xl mx-auto md:mx-0 font-medium opacity-95">
              Discover premium products, curated for you.<br className="hidden md:block" />
              Shop the latest trends with seamless experience and exclusive offers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button
                size="lg"
                className="bg-primary text-white rounded-2xl shadow-xl hover:bg-primary/80 hover:scale-105 transition-all text-lg px-10 py-5 font-semibold focus:ring-4 focus:ring-primary/30"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-2xl border-2 border-primary text-primary bg-white/80 hover:bg-primary/10 hover:scale-105 transition-all text-lg px-10 py-5 font-semibold focus:ring-4 focus:ring-primary/20"
              >
                Learn More
              </Button>
            </div>
          </div>

          {/* Right: Illustration/Product Image */}
          <div className="flex-1 flex items-center justify-center animate-scale-in">
            <div className="relative bg-white/30 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl p-8 md:p-12 flex items-center justify-center glass-card transition-all duration-500 hover:scale-105 border border-white/40">
              <img
                src={heroBanner}
                alt="Fashion Hero"
                className="w-[340px] h-[340px] object-cover rounded-2xl border-4 border-primary/30 shadow-lg transition-transform duration-500 hover:scale-105"
              />
              {/* Decorative gradient ring */}
              <span className="absolute -inset-3 rounded-[2.5rem] border-4 border-accent/30 pointer-events-none"></span>
              {/* Floating icon or badge */}
              <span className="absolute top-6 right-8 bg-primary text-white px-4 py-2 rounded-full shadow-lg text-sm font-bold animate-fade-in">
                #Trending
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Modern & Clean Categories Section */}
<section className="py-10 bg-white border-b">
  <div className="max-w-7xl mx-auto px-6">
    <div className="flex items-center justify-between overflow-x-auto scrollbar-hide gap-12">
      {categories.map((category) => (
        <Link
          key={category.name}
          to={category.link}
          className="flex flex-col items-center group min-w-[100px] transition-transform duration-300 hover:-translate-y-1.5"
        >
          {/* Icon Wrapper */}
          <div className="w-20 h-20 flex items-center justify-center rounded-xl bg-gray-50 border border-gray-200 shadow-sm group-hover:border-primary/40 group-hover:shadow-md transition-all duration-300 overflow-visible">
            <img
              src={category.image}
              alt={category.name}
              className="w-12 h-12 object-contain transition-transform duration-300 group-hover:scale-110"
            />
          </div>


          {/* Category Label */}
          <span className="mt-3 text-sm font-medium text-gray-800 group-hover:text-primary transition-colors text-center truncate max-w-[100px]">
            {category.name}
          </span>
        </Link>
      ))}
    </div>
  </div>
</section>


      {/* Featured Products */}
      <section className="section-padding bg-muted/30">
        <div className="container-responsive">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">Bestsellers</h2>
              <p className="text-muted-foreground text-lg">Discover our most loved products</p>
            </div>
            <Link to="/shop">
              <Button variant="outline" className="group">
                View All
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <div
                key={product.id}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding">
        <div className="container-responsive">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4 animate-fade-in">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Truck className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Free Shipping</h3>
              <p className="text-muted-foreground">
                Free delivery on orders above ₹500 across India
              </p>
            </div>
            
            <div className="text-center space-y-4 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
                <Shield className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold">Secure Payment</h3>
              <p className="text-muted-foreground">
                Your payment information is safe and secure
              </p>
            </div>
            
            <div className="text-center space-y-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto">
                <CreditCard className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold">Easy Returns</h3>
              <p className="text-muted-foreground">
                Hassle-free returns within 30 days of purchase
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-muted/30">
        <div className="container-responsive">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">What Our Customers Say</h2>
            <p className="text-muted-foreground text-lg">
              Join thousands of satisfied customers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card
                key={testimonial.name}
                className={`animate-scale-in bg-white`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <CardContent className="p-6 text-center space-y-4">
                  <div className="flex justify-center">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-muted-foreground italic">"{testimonial.comment}"</p>
                  <div className="flex items-center justify-center space-x-3">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <span className="font-semibold">{testimonial.name}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="section-padding bg-gradient-to-r from-primary to-accent text-white">
        <div className="container-responsive text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">Stay Updated</h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Subscribe to our newsletter and be the first to know about new arrivals, 
            exclusive offers, and fashion trends.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500"
            />
            <Button className="bg-white text-primary hover:bg-gray-100 font-semibold px-8">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;