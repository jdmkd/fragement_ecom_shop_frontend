// src/components/catalog/Products.tsx
import React from "react";
import { useProducts } from "../../hooks/useProducts";
import { Link } from "react-router-dom";

const Products = ({ filters }: { filters?: Record<string, string | number> }) => {
  const { products, loading, error } = useProducts(filters);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <Link
          key={product.id}
          to={`/product/${product.id}`}
          className="bg-white p-4 rounded-lg shadow hover:shadow-md transition flex flex-col"
        >
          <img
            src={product.images[0]?.image}
            alt={product.name}
            className="w-full h-40 object-cover mb-2 rounded"
          />
          <h3 className="text-sm font-semibold">{product.name}</h3>
          <div className="mt-auto flex items-center justify-between">
            <span className="font-bold text-gray-900">₹{product.price}</span>
            {product.discount_price && (
              <span className="text-sm text-gray-400 line-through">
                ₹{product.discount_price}
              </span>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Products;
