import { useState } from "react";
import { Filter, Grid, List, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ProductCard from "@/components/ProductCard";
import clothesCategory from "@/assets/clothes-category.jpg";
import shoesCategory from "@/assets/shoes-category.jpg";
import watchesCategory from "@/assets/watches-category.jpg";
import beltsCategory from "@/assets/belts-category.jpg";
import perfumesCategory from "@/assets/perfumes-category.jpg";

const Shop = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState("");

  const allProducts = [
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
      name: "Woodland Leather Belt",
      price: 1299,
      originalPrice: 1799,
      rating: 4.4,
      image: beltsCategory,
      category: "belts",
      brand: "Woodland",
      inStock: true,
    },
    {
      id: "5",
      name: "Fogg Scent Perfume",
      price: 699,
      originalPrice: 999,
      rating: 4.3,
      image: perfumesCategory,
      category: "perfumes",
      brand: "Fogg",
      inStock: true,
    },
    {
      id: "6",
      name: "Adidas Ultraboost",
      price: 6499,
      rating: 4.7,
      image: shoesCategory,
      category: "shoes",
      brand: "Adidas",
      inStock: true,
      isNew: true,
    },
  ];

  const filteredProducts = allProducts.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.brand?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-muted/30 py-12">
        <div className="container-responsive">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">All Products</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Explore our complete collection of premium products from top brands.
            </p>
          </div>
        </div>
      </div>

      <div className="container-responsive py-8">
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search products, brands, categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex items-center space-x-4">
              <Select defaultValue="all">
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="clothes">Clothes</SelectItem>
                  <SelectItem value="shoes">Shoes</SelectItem>
                  <SelectItem value="watches">Watches</SelectItem>
                  <SelectItem value="belts">Belts</SelectItem>
                  <SelectItem value="perfumes">Perfumes</SelectItem>
                </SelectContent>
              </Select>

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
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
            {searchQuery && ` for "${searchQuery}"`}
          </p>
        </div>

        {/* Products Grid */}
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
            : 'grid-cols-1'
        }`}>
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No products found matching your search.</p>
            <Button
              variant="outline"
              onClick={() => setSearchQuery("")}
              className="mt-4"
            >
              Clear Search
            </Button>
          </div>
        )}

        {/* Load More */}
        {filteredProducts.length > 0 && (
          <div className="mt-12 text-center">
            <Button variant="outline" size="lg">
              Load More Products
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;