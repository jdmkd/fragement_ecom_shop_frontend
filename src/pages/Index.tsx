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
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBanner})` }}
        >
          <div className="absolute inset-0 hero-gradient opacity-80" />
        </div>
        
        <div className="relative z-10 text-center text-white space-y-6 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Shop the Latest
            <br />
            <span className="text-secondary">Fashion Trends</span>
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90">
            Discover premium quality products at unbeatable prices. 
            From fashion to lifestyle, we've got everything you need.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="btn-secondary text-lg px-8 py-4">
              Shop Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" className="btn-secondary text-lg px-8 py-4">
              Explore Categories
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="section-padding">
        <div className="container-responsive">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Shop by Category</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Explore our diverse collection of premium products
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {categories.map((category, index) => (
              <Link
                key={category.name}
                to={category.link}
                className={`group animate-scale-in`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Card className="overflow-hidden card-hover bg-gradient-to-br from-white to-muted/30">
                  <CardContent className="p-0">
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-4 text-center">
                      <h3 className="font-semibold text-lg mb-1">{category.name}</h3>
                      <p className="text-muted-foreground text-sm">{category.description}</p>
                    </div>
                  </CardContent>
                </Card>
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