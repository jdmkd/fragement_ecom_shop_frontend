import { useState } from "react";
import { Filter, Grid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ProductCard from "@/components/ProductCard";
import clothesCategory from "@/assets/clothes-category.jpg";

const Clothes = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  const products = [
    {
      id: "c1",
      name: "Premium Cotton Kurta - Royal Blue",
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
      id: "c2",
      name: "Elegant Kurti - Floral Print",
      price: 899,
      originalPrice: 1299,
      rating: 4.3,
      image: clothesCategory,
      category: "clothes",
      brand: "StyleQueen",
      inStock: true,
    },
    {
      id: "c3",
      name: "Western Shirt - Formal White",
      price: 1599,
      rating: 4.6,
      image: clothesCategory,
      category: "clothes",
      brand: "GentleMan",
      inStock: true,
    },
    {
      id: "c4",
      name: "Funky T-Shirt - Graphic Print",
      price: 599,
      originalPrice: 799,
      rating: 4.2,
      image: clothesCategory,
      category: "clothes",
      brand: "TrendyTees",
      inStock: true,
    },
    {
      id: "c5",
      name: "Traditional Saree - Silk",
      price: 2999,
      rating: 4.8,
      image: clothesCategory,
      category: "clothes",
      brand: "SilkHeritage",
      inStock: true,
      isNew: true,
    },
    {
      id: "c6",
      name: "Casual Jeans - Slim Fit",
      price: 1799,
      originalPrice: 2299,
      rating: 4.4,
      image: clothesCategory,
      category: "clothes",
      brand: "DenimCo",
      inStock: false,
    },
  ];

  const categories = [
    { name: "Western Wear", count: 24 },
    { name: "Traditional Wear", count: 18 },
    { name: "Casual Wear", count: 32 },
    { name: "Formal Wear", count: 15 },
    { name: "Ethnic Wear", count: 21 },
  ];

  const brands = [
    { name: "FashionHub", count: 12 },
    { name: "StyleQueen", count: 8 },
    { name: "GentleMan", count: 15 },
    { name: "TrendyTees", count: 20 },
    { name: "SilkHeritage", count: 6 },
  ];

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const priceRanges = [
    { label: "Under ₹500", value: "0-500" },
    { label: "₹500 - ₹1000", value: "500-1000" },
    { label: "₹1000 - ₹2000", value: "1000-2000" },
    { label: "₹2000 - ₹5000", value: "2000-5000" },
    { label: "Above ₹5000", value: "5000+" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-muted/30 py-12">
        <div className="container-responsive">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">Clothing Collection</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Discover the latest fashion trends for men and women. From traditional wear to modern styles.
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
                  <div className="grid grid-cols-3 gap-2">
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

export default Clothes;