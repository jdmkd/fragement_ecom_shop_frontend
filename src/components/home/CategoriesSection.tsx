import { Link } from "react-router-dom";
import clothesCategory from "@/assets/clothes-category.jpg";
import shoesCategory from "@/assets/shoes-category.jpg";
import watchesCategory from "@/assets/watches-category.jpg";
import beltsCategory from "@/assets/belts-category.jpg";
import perfumesCategory from "@/assets/perfumes-category.jpg";
import { useSubcategories } from "@/hooks/useSubcategories";


const CategoriesSection = () => {
  const { subcategories, loading, error } = useSubcategories();
  
    if (loading) return <p>Loading subcategories...</p>;
    if (error) return <p>{error}</p>;
    
  return (
    <section className="py-12 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Title */}
        <div className="mb-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Shop by Categories
          </h2>
          <p className="mt-2 text-gray-600 text-sm md:text-base">
            Explore our wide range of products across popular categories
          </p>
        </div>

        {/* Categories */}
        <div className="flex items-center justify-center overflow-x-auto scrollbar-hide gap-6 md:gap-10">
          {subcategories.map((subcategory) => (
            <Link
              key={subcategory.name}
              to={`/shop/subcategory/${subcategory.slug}`}
              className="group min-w-[120px] flex flex-col items-center"
            >
              <div className="relative my-5  flex items-center justify-center rounded-md 
                bg-gradient-to-tr border shadow-sm
                group-hover:shadow-lg group-hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                <img
                  src={""}
                  // src={categoryImages[subcategory.slug] || "https://via.placeholder.com/150"}
                  alt={subcategory.name}
                  className="w-24 h-24 object-contain group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <span className="text-sm md:text-base font-medium text-gray-800 group-hover:text-primary transition-colors">
                {subcategory.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
