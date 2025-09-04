import HeroSection from "@/components/home/HeroSection";
import CategoriesSection from "@/components/home/CategoriesSection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import FeaturesSection from "@/components/home/FeaturesSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import NewsletterCTA from "@/components/home/NewsletterCTA";
import SubCategories from "@/components/catalog/SubCategories";

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <CategoriesSection />
      {/* <SubCategories /> */}
      <FeaturedProducts />
      <FeaturesSection />
      <TestimonialsSection />
      <NewsletterCTA />
    </div>
  );
};

export default Index;
