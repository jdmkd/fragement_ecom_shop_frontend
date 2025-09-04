import { Link } from "react-router-dom";
import { ArrowRight, Star, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import clothesCategory from "@/assets/clothes-category.jpg";
import shoesCategory from "@/assets/shoes-category.jpg";
import watchesCategory from "@/assets/watches-category.jpg";
import perfumesCategory from "@/assets/perfumes-category.jpg";
import { useProducts } from "@/hooks/useProducts";

// const featuredProducts = [
//   {
//     id: "1",
//     name: "Premium Cotton Kurta",
//     price: 1299,
//     originalPrice: 1799,
//     rating: 4.5,
//     image: clothesCategory,
//     category: "clothes",
//     brand: "FashionHub",
//     inStock: true,
//     isNew: true,
//   },
//   {
//     id: "2",
//     name: "Nike Air Max Sneakers",
//     price: 5999,
//     originalPrice: 7999,
//     rating: 4.8,
//     image: shoesCategory,
//     category: "shoes",
//     brand: "Nike",
//     inStock: true,
//   },
//   {
//     id: "3",
//     name: "Titan Smart Watch",
//     price: 12999,
//     rating: 4.6,
//     image: watchesCategory,
//     category: "watches",
//     brand: "Titan",
//     inStock: true,
//   },
//   {
//     id: "4",
//     name: "Fogg Scent Perfume",
//     price: 699,
//     originalPrice: 999,
//     rating: 4.3,
//     image: perfumesCategory,
//     category: "perfumes",
//     brand: "Fogg",
//     inStock: true,
//   },
// ];

const FeaturedProducts = ({ filters }: { filters?: Record<string, string | number> }) => {
  const { products, loading, error } = useProducts(filters);
  
    if (loading) return <p>Loading products...</p>;
    if (error) return <p>{error}</p>;

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-2">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold">Bestsellers</h2>
            <p className="text-gray-600 text-sm sm:text-base">
              Discover our most loved products
            </p>
          </div>
          <Link to="/shop" className="ml-auto">
            <Button variant="outline" className="group flex items-center gap-1 text-sm sm:text-base">
              View All
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4 sm:gap-6">
          {products.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.slug}`}
              className="group relative bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md overflow-hidden transition-all duration-300"
            >
              {/* Image */}
              <div className="relative w-full h-30 sm:h-25 overflow-hidden">
                <img
                  src={product.images?.[0]?.image}
                  alt={product.name}
                  className="w-full h-40 object-cover rounded"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.parentElement!.innerHTML = `
                      <div class="w-full h-40 bg-gray-200 rounded animate-pulse flex items-center justify-center">
                        <span class="text-gray-400 text-sm">No Image</span>
                      </div>
                    `;
                  }}
                />
                {/* Badges */}
                <div className="absolute top-2 left-2 flex flex-col gap-1">
                  {product.created_at && (
                    <span className="px-2 py-0.5 text-xs font-semibold text-white bg-blue-500 rounded-full">
                      New
                    </span>
                  )}
                  {/* {product.discount_price && product.price > product.discount_price && (
                    <span className="px-2 py-0.5 text-xs font-semibold text-white bg-red-500 rounded-full">
                      {Math.round(((product.discount_price - product.price) / product.discount_price) * 100)}% OFF
                    </span>
                  )} */}
                </div>
              </div>

              {/* Product Info */}
              <div className="p-3 space-y-1">
                {product.brand && (
                  <p className="text-xs font-medium text-gray-400 uppercase">{product.brand}</p>
                )}
                <h3 className="text-sm font-semibold line-clamp-2">{product.name}</h3>
                <div className="flex items-center gap-1">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${
                          i < 5 ? "text-yellow-400 fill-current" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500">({5})</span>
                </div>
                <div className="flex items-center gap-1">
                  {product.discount_price && (
                    <span className="text-sm font-bold text-gray-900">₹{product.discount_price.toLocaleString()}</span>
                  )}
                  <span className="text-xs text-gray-400 line-through">₹{product.price.toLocaleString()}</span>
                  
                </div>
                {!product.stock && (
                  <span className="text-xs text-red-500 font-medium">Out of Stock</span>
                )}

                
              </div>
              
              {/* Optional small Add to Cart button on hover */}
              {product.stock && (
                <div className="p-1">
                  <Button
                    variant="default"
                    size="sm"
                    className=" w-full rounded-md group-hover:opacity-100 transition-opacity duration-300 text-xs sm:text-sm"
                  >
                    <ShoppingCart className="h-3 w-3" /> Add
                  </Button>
                </div>
              )}
              
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
