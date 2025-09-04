import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBanner from "@/assets/hero-banner.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center bg-gradient-to-br from-primary/90 via-accent/70 to-secondary/80 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/2 w-32 h-32 bg-gradient-to-tr from-primary/40 via-accent/30 to-secondary/40 rounded-full blur-2xl opacity-40 animate-pulse" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-16">
        {/* Left */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-8">
            <span className="block mb-2">Elevate Your Style</span>
            <span className="bg-gradient-to-r from-secondary via-primary to-accent bg-clip-text text-transparent">
              Fashion, Reimagined
            </span>
          </h1>
          <p className="text-lg md:text-2xl text-muted-foreground mb-10 max-w-xl mx-auto md:mx-0">
            Discover premium products, curated for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Button size="lg" className="bg-primary text-white px-10 py-5 rounded-2xl shadow-lg hover:scale-105 transition">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="rounded-2xl px-10 py-5 border-2 hover:bg-primary/10">
              Learn More
            </Button>
          </div>
        </div>

        {/* Right */}
        <div className="flex-1 flex items-center justify-center">
          <img
            src={heroBanner}
            alt="Fashion Hero"
            className="w-[340px] h-[340px] object-cover rounded-2xl border-4 border-primary/30 shadow-xl"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
