import ProductCard from "@/components/ProductCard";
import perfumesCategory from "@/assets/perfumes-category.jpg";

const Perfumes = () => {
  const products = [
    {
      id: "p1",
      name: "Fogg Scent Absolute",
      price: 699,
      originalPrice: 999,
      rating: 4.3,
      image: perfumesCategory,
      category: "perfumes",
      brand: "Fogg",
      inStock: true,
      isNew: true,
    },
    {
      id: "p2",
      name: "Engage Cologne",
      price: 899,
      rating: 4.4,
      image: perfumesCategory,
      category: "perfumes", 
      brand: "Engage",
      inStock: true,
    },
    {
      id: "p3",
      name: "Zara Oriental Collection",
      price: 1599,
      originalPrice: 1999,
      rating: 4.6,
      image: perfumesCategory,
      category: "perfumes",
      brand: "Zara",
      inStock: true,
    },
    {
      id: "p4",
      name: "Bella Vita Luxury Perfume",
      price: 1299,
      rating: 4.5,
      image: perfumesCategory,
      category: "perfumes",
      brand: "Bella Vita",
      inStock: true,
      isNew: true,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-muted/30 py-12">
        <div className="container-responsive">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">Perfumes Collection</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Signature fragrances that define your personality. Premium perfumes for every occasion.
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

export default Perfumes;