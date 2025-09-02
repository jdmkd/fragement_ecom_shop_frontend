import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Star, Heart, ShoppingCart, Truck, Shield, ArrowLeft, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import clothesCategory from "@/assets/clothes-category.jpg";

const ProductDetail = () => {
  const { id } = useParams();
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  const product = {
    id: "1",
    name: "Premium Cotton Kurta - Royal Blue",
    price: 1299,
    originalPrice: 1799,
    rating: 4.5,
    reviewCount: 156,
    image: clothesCategory,
    images: [clothesCategory, clothesCategory, clothesCategory],
    category: "clothes",
    brand: "FashionHub",
    inStock: true,
    isNew: true,
    description: "Comfortable and stylish premium cotton kurta perfect for any occasion. Made with high-quality fabric that ensures durability and comfort.",
    features: [
      "100% Pure Cotton",
      "Machine Washable",
      "Comfortable Fit",
      "Premium Quality",
      "Wrinkle Resistant"
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    specifications: [
      { label: "Material", value: "100% Cotton" },
      { label: "Fit", value: "Regular" },
      { label: "Care", value: "Machine Wash" },
      { label: "Country", value: "India" }
    ]
  };

  const reviews = [
    {
      name: "Rajesh Kumar",
      rating: 5,
      comment: "Excellent quality and perfect fit. Highly recommended!",
      date: "2 weeks ago"
    },
    {
      name: "Priya Sharma",
      rating: 4,
      comment: "Good product, fast delivery. Worth the price.",
      date: "1 month ago"
    }
  ];

  const discountPercentage = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <div className="min-h-screen bg-background">
      <div className="container-responsive py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link to="/shop" className="flex items-center text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Shop
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg border">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {product.images.map((image, index) => (
                <div key={index} className="aspect-square overflow-hidden rounded-lg border cursor-pointer hover:opacity-80 transition-opacity">
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                {product.isNew && (
                  <Badge variant="secondary">New</Badge>
                )}
                <Badge variant="outline">{product.brand}</Badge>
              </div>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-muted-foreground'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold text-primary">
                ₹{product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-muted-foreground line-through">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                  <Badge variant="destructive" className="bg-discount text-white">
                    {discountPercentage}% OFF
                  </Badge>
                </>
              )}
            </div>

            {/* Description */}
            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>

            {/* Size Selection */}
            <div>
              <h3 className="font-semibold mb-3">Size</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <Button
                    key={size}
                    variant={selectedSize === size ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedSize(size)}
                    className="w-12 h-12"
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="font-semibold mb-3">Quantity</h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center border rounded-lg">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="px-4 py-2 font-medium">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="btn-primary flex-1"
                disabled={!product.inStock || !selectedSize}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
              <Button
                size="lg"
                variant="outline"
                disabled={!product.inStock || !selectedSize}
                className="flex-1"
              >
                Buy Now
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => setIsFavorite(!isFavorite)}
                className={isFavorite ? "text-red-500 border-red-500" : ""}
              >
                <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <Truck className="h-5 w-5 text-primary" />
                <span className="text-sm">Free delivery above ₹500</span>
              </div>
              <div className="flex items-center space-x-3">
                <Shield className="h-5 w-5 text-primary" />
                <span className="text-sm">Secure payment</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="description">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Product Description</h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {product.description}
                  </p>
                  <h4 className="font-semibold mb-3">Key Features</h4>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-muted-foreground">
                        <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="specifications" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Product Specifications</h3>
                  <div className="space-y-4">
                    {product.specifications.map((spec, index) => (
                      <div key={index} className="flex justify-between py-2 border-b border-border last:border-0">
                        <span className="font-medium">{spec.label}:</span>
                        <span className="text-muted-foreground">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Customer Reviews</h3>
                  <div className="space-y-6">
                    {reviews.map((review, index) => (
                      <div key={index} className="border-b border-border last:border-0 pb-4 last:pb-0">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{review.name}</span>
                          <span className="text-sm text-muted-foreground">{review.date}</span>
                        </div>
                        <div className="flex items-center mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-muted-foreground'
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-muted-foreground">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;