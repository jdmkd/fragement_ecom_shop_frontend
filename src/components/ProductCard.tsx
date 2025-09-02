import { useState } from "react";
import { Heart, Star, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  image: string;
  category: string;
  brand?: string;
  inStock: boolean;
  isNew?: boolean;
  discount?: number;
}

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onToggleFavorite?: (productId: string) => void;
  isFavorite?: boolean;
}

const ProductCard = ({ 
  product, 
  onAddToCart, 
  onToggleFavorite, 
  isFavorite = false 
}: ProductCardProps) => {
  const [isImageLoading, setIsImageLoading] = useState(true);

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="group relative bg-card rounded-xl border border-border overflow-hidden card-hover">
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
        {isImageLoading && (
          <div className="absolute inset-0 bg-muted animate-pulse" />
        )}
        <img
          src={product.image}
          alt={product.name}
          className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 ${
            isImageLoading ? 'opacity-0' : 'opacity-100'
          }`}
          onLoad={() => setIsImageLoading(false)}
        />
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.isNew && (
            <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
              New
            </Badge>
          )}
          {discountPercentage > 0 && (
            <Badge variant="destructive" className="bg-discount text-white">
              {discountPercentage}% OFF
            </Badge>
          )}
        </div>

        {/* Favorite Button */}
        <Button
          variant="ghost"
          size="icon"
          className={`absolute top-2 right-2 h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm transition-all duration-200 ${
            isFavorite 
              ? 'text-red-500 hover:text-red-600' 
              : 'text-muted-foreground hover:text-red-500'
          }`}
          onClick={() => onToggleFavorite?.(product.id)}
        >
          <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
        </Button>

        {/* Quick Add to Cart - appears on hover */}
        <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Button
            variant="default"
            size="sm"
            className="w-full btn-primary"
            onClick={() => onAddToCart?.(product)}
            disabled={!product.inStock}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </Button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-2">
        {/* Brand */}
        {product.brand && (
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            {product.brand}
          </p>
        )}

        {/* Name */}
        <h3 className="font-medium text-sm line-clamp-2 text-foreground leading-tight">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center space-x-1">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${
                  i < Math.floor(product.rating)
                    ? 'text-yellow-400 fill-current'
                    : 'text-muted-foreground'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">
            ({product.rating})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center space-x-2">
          <span className="price-text text-lg">
            ₹{product.price.toLocaleString()}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ₹{product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* Stock Status */}
        {!product.inStock && (
          <p className="text-xs text-destructive font-medium">Out of Stock</p>
        )}
      </div>
    </div>
  );
};

export default ProductCard;