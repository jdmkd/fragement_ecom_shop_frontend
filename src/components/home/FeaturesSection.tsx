import { Truck, Shield, CreditCard } from "lucide-react";

const features = [
  { icon: Truck, title: "Free Shipping", text: "Free delivery on orders above ₹500" },
  { icon: Shield, title: "Secure Payment", text: "Your payment information is safe" },
  { icon: CreditCard, title: "Easy Returns", text: "Hassle-free returns within 30 days" },
];

const FeaturesSection = () => {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map(({ icon: Icon, title, text }) => (
          <div key={title} className="text-center space-y-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <Icon className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">{title}</h3>
            <p className="text-muted-foreground">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
