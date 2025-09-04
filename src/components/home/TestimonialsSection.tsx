import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  { name: "Priya Sharma", rating: 5, comment: "Amazing quality and fast delivery!", image: "https://i.pravatar.cc/100?img=1" },
  { name: "Rajesh Kumar", rating: 5, comment: "Great shopping experience.", image: "https://i.pravatar.cc/100?img=2" },
  { name: "Sneha Patel", rating: 4, comment: "Love the variety and quality!", image: "https://i.pravatar.cc/100?img=3" },
];

const TestimonialsSection = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">What Our Customers Say</h2>
          <p className="text-muted-foreground">Join thousands of satisfied customers</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <Card key={t.name} className="bg-white shadow-lg">
              <CardContent className="p-6 text-center space-y-4">
                <div className="flex justify-center">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-muted-foreground italic">"{t.comment}"</p>
                <div className="flex items-center justify-center space-x-3">
                  <img src={t.image} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                  <span className="font-semibold">{t.name}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
