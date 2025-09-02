import { useState } from "react";
import { Filter, Grid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ProductCard from "@/components/ProductCard";
import shoesCategory from "@/assets/shoes-category.jpg";

const Shoes = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  const products = [
    {
      id: "s1",
      name: "Nike Air Max 270 - Black/White",
      price: 5999,
      originalPrice: 7999,
      rating: 4.8,
      image: shoesCategory,
      category: "shoes",
      brand: "Nike",
      inStock: true,
      isNew: true,
    },
    {
      id: "s2", 
      name: "Adidas Ultraboost 22 - Blue",
      price: 6499,
      originalPrice: 8999,
      rating: 4.7,
      image: shoesCategory,
      category: "shoes",
      brand: "Adidas",
      inStock: true,
    },
    {
      id: "s3",
      name: "Puma RS-X3 - White/Red",
      price: 4299,
      rating: 4.5,
      image: shoesCategory,
      category: "shoes", 
      brand: "Puma",
      inStock: true,
    },
    {
      id: "s4",
      name: "Bata Formal Shoes - Brown Leather",
      price: 2999,
      originalPrice: 3999,
      rating: 4.3,
      image: shoesCategory,
      category: "shoes",
      brand: "Bata",
      inStock: true,
    },
    {
      id: "s5",
      name: "Converse Chuck Taylor - Classic Black",
      price: 2799,
      rating: 4.6,
      image: shoesCategory,
      category: "shoes",
      brand: "Converse",
      inStock: true,
      isNew: true,
    },
    {
      id: "s6",
      name: "Reebok Classic Leather - White",
      price: 3999,
      originalPrice: 4999,
      rating: 4.4,
      image: shoesCategory,
      category: "shoes",
      brand: "Reebok",
      inStock: false,
    },
  ];

  const categories = [
    { name: "Sneakers", count: 32 },
    { name: "Formal Shoes", count: 18 },
    { name: "Sports Shoes", count: 24 },
    { name: "Casual Shoes", count: 28 },
    { name: "Sandals", count: 15 },
  ];

  const brands = [
    { name: "Nike", count: 15 },
    { name: "Adidas", count: 12 },
    { name: "Puma", count: 10 },
    { name: "Bata", count: 8 },
    { name: "Reebok", count: 7 },
    { name: "Converse", count: 6 },
  ];

  const sizes = ["6", "7", "8", "9", "10", "11", "12"];
  const priceRanges = [
    { label: "Under ₹2000", value: "0-2000" },
    { label: "₹2000 - ₹4000", value: "2000-4000" },
    { label: "₹4000 - ₹6000", value: "4000-6000" },
    { label: "₹6000 - ₹10000", value: "6000-10000" },
    { label: "Above ₹10000", value: "10000+" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-muted/30 py-12">
        <div className="container-responsive">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">Footwear Collection</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Step up your style with our premium collection of shoes. From sports to formal wear.
            </p>
          </div>
        </div>
      </div>

      <div className="container-responsive py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Filters
                  <Button
                    variant="ghost"
                    size="sm"
                    className="lg:hidden"
                    onClick={() => setShowFilters(false)}
                  >
                    ×
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Categories */}
                <div>
                  <h3 className="font-semibold mb-3">Categories</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category.name} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Checkbox id={category.name} />
                          <label htmlFor={category.name} className="text-sm cursor-pointer">
                            {category.name}
                          </label>
                        </div>
                        <span className="text-xs text-muted-foreground">({category.count})</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h3 className="font-semibold mb-3">Price Range</h3>
                  <div className="space-y-2">
                    {priceRanges.map((range) => (
                      <div key={range.value} className="flex items-center space-x-2">
                        <Checkbox id={range.value} />
                        <label htmlFor={range.value} className="text-sm cursor-pointer">
                          {range.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Brands */}
                <div>
                  <h3 className="font-semibold mb-3">Brands</h3>
                  <div className="space-y-2">
                    {brands.map((brand) => (
                      <div key={brand.name} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Checkbox id={brand.name} />
                          <label htmlFor={brand.name} className="text-sm cursor-pointer">
                            {brand.name}
                          </label>
                        </div>
                        <span className="text-xs text-muted-foreground">({brand.count})</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sizes */}
                <div>
                  <h3 className="font-semibold mb-3">Sizes</h3>
                  <div className="grid grid-cols-4 gap-2">
                    {sizes.map((size) => (
                      <Button
                        key={size}
                        variant="outline"
                        size="sm"
                        className="h-8 text-xs"
                      >
                        {size}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6 bg-white p-4 rounded-lg border">
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="lg:hidden"
                  onClick={() => setShowFilters(true)}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
                <span className="text-sm text-muted-foreground">
                  Showing {products.length} products
                </span>
              </div>

              <div className="flex items-center space-x-4">
                <Select defaultValue="featured">
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Customer Rating</SelectItem>
                    <SelectItem value="newest">Newest First</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex border rounded-lg overflow-hidden">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3' 
                : 'grid-cols-1'
            }`}>
              {products.map((product, index) => (
                <div
                  key={product.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>

            {/* Load More */}
            <div className="mt-12 text-center">
              <Button variant="outline" size="lg">
                Load More Products
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shoes;