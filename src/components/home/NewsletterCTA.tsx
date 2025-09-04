import { Button } from "@/components/ui/button";

const NewsletterCTA = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-primary to-accent text-white">
      <div className="max-w-3xl mx-auto text-center space-y-6 px-6">
        <h2 className="text-3xl md:text-4xl font-bold">Stay Updated</h2>
        <p className="text-lg opacity-90">
          Subscribe to our newsletter and be the first to know about new arrivals and offers.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-3 rounded-lg text-gray-900" />
          <Button className="bg-white text-primary hover:bg-gray-100 font-semibold px-8">Subscribe</Button>
        </div>
      </div>
    </section>
  );
};

export default NewsletterCTA;
