import ProductCard from "@/components/ProductCard";
import watchesCategory from "@/assets/watches-category.jpg";

const Watches = () => {
  const products = [
    {
      id: "w1",
      name: "Titan Smart Watch Pro",
      price: 12999,
      originalPrice: 15999,
      rating: 4.6,
      image: watchesCategory,
      category: "watches",
      brand: "Titan",
      inStock: true,
      isNew: true,
    },
    {
      id: "w2",
      name: "Fossil Gen 6 Smartwatch",
      price: 18999,
      rating: 4.5,
      image: watchesCategory,
      category: "watches",
      brand: "Fossil",
      inStock: true,
    },
    {
      id: "w3",
      name: "Casio G-Shock Classic",
      price: 8999,
      originalPrice: 11999,
      rating: 4.8,
      image: watchesCategory,
      category: "watches",
      brand: "Casio",
      inStock: true,
    },
    {
      id: "w4",
      name: "Noise ColorFit Pro 4",
      price: 4999,
      rating: 4.3,
      image: watchesCategory,
      category: "watches",
      brand: "Noise",
      inStock: true,
      isNew: true,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-muted/30 py-12">
        <div className="container-responsive">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">Watches Collection</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Timeless elegance meets modern technology. Discover premium watches from top brands.
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

export default Watches;