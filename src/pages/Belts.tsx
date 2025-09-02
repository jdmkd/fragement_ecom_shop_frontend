import ProductCard from "@/components/ProductCard";
import beltsCategory from "@/assets/belts-category.jpg";

const Belts = () => {
  const products = [
    {
      id: "b1",
      name: "Woodland Leather Belt - Brown",
      price: 1299,
      originalPrice: 1799,
      rating: 4.4,
      image: beltsCategory,
      category: "belts",
      brand: "Woodland",
      inStock: true,
      isNew: true,
    },
    {
      id: "b2",
      name: "Tommy Hilfiger Classic Belt",
      price: 2499,
      rating: 4.6,
      image: beltsCategory,
      category: "belts",
      brand: "Tommy Hilfiger",
      inStock: true,
    },
    {
      id: "b3",
      name: "Hidesign Premium Leather",
      price: 1899,
      originalPrice: 2399,
      rating: 4.5,
      image: beltsCategory,
      category: "belts",
      brand: "Hidesign",
      inStock: true,
    },
    {
      id: "b4",
      name: "Formal Black Belt",
      price: 899,
      rating: 4.2,
      image: beltsCategory,
      category: "belts",
      brand: "StyleCraft",
      inStock: true,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-muted/30 py-12">
        <div className="container-responsive">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">Belts Collection</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Premium accessories to complete your look. Quality leather belts from top brands.
            </p>
          </div>
        </div>
      </div>

      <div className="container-responsive py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
      </div>
    </div>
  );
};

export default Belts;