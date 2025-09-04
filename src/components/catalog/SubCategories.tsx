// src/components/catalog/SubCategories.tsx
import React from "react";
import { useSubcategories } from "../../hooks/useSubcategories";
import { Link } from "react-router-dom";

const SubCategories = () => {
  const { subcategories, loading, error } = useSubcategories();

  if (loading) return <p>Loading subcategories...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {subcategories.map((sub) => (
        <Link
          key={sub.id}
          to={`/shop/subcategory/${sub.slug}`}
          className="flex flex-col items-center p-3 bg-white rounded-lg shadow hover:shadow-md transition"
        >
          <span className="text-sm font-medium">{sub.name}</span>
          <p className="text-xs text-gray-500">{sub.description}</p>
        </Link>
      ))}
    </div>
  );
};

export default SubCategories;
