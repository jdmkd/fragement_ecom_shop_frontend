import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard, { Product } from "@/components/ProductCard";

interface ProductsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Product[];
}

const SubcategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [products, setProducts] = useState<ProductsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get<ProductsResponse>(
          `http://127.0.0.1:8000/api/catalog/products/?subcategory=${slug}`
        );
        setProducts(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch products for this subcategory.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [slug]);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>{error}</p>;
  if (!products || products.results.length === 0)
    return <p>No products found in this subcategory.</p>;

  return (
    <section className="py-12 max-w-7xl mx-auto px-6">
      <h2 className="text-2xl font-bold mb-6">Products in {slug}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.results.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default SubcategoryPage;
