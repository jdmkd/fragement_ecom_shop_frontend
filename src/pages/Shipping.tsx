import { Truck, Clock, Shield, MapPin, Package, CreditCard } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Shipping = () => {
  const shippingOptions = [
    {
      name: "Standard Delivery",
      time: "3-7 Business Days",
      cost: "Free above ₹500, ₹50 below",
      description: "Regular delivery to your doorstep",
      icon: Truck
    },
    {
      name: "Express Delivery",
      time: "1-2 Business Days",
      cost: "₹100-200",
      description: "Fast delivery in major cities",
      icon: Clock
    },
    {
      name: "Same Day Delivery",
      time: "Within 24 Hours",
      cost: "₹200-300",
      description: "Available in select areas",
      icon: Package
    }
  ];

  const deliverySteps = [
    {
      step: "1",
      title: "Order Confirmed",
      description: "Your order is confirmed and being prepared"
    },
    {
      step: "2", 
      title: "Order Processed",
      description: "Items are picked, packed and ready to ship"
    },
    {
      step: "3",
      title: "Order Shipped",
      description: "Your order is on its way to you"
    },
    {
      step: "4",
      title: "Out for Delivery",
      description: "Your order is out for delivery"
    },
    {
      step: "5",
      title: "Delivered",
      description: "Order delivered successfully"
    }
  ];

  const policies = [
    {
      icon: Shield,
      title: "Secure Packaging",
      description: "All items are carefully packed to prevent damage during transit"
    },
    {
      icon: MapPin,
      title: "Pan India Delivery",
      description: "We deliver to 95% of pin codes across India"
    },
    {
      icon: Clock,
      title: "Order Tracking",
      description: "Real-time tracking updates via SMS and email"
    },
    {
      icon: CreditCard,
      title: "Cash on Delivery",
      description: "COD available for orders up to ₹5,000"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-muted/30 py-12">
        <div className="container-responsive text-center">
          <h1 className="text-4xl font-bold mb-4">Shipping & Delivery</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Fast, reliable delivery across India. Learn about our shipping options and policies.
          </p>
        </div>
      </div>

      <div className="container-responsive py-12 space-y-12">
        {/* Shipping Options */}
        <section>
          <h2 className="text-3xl font-bold mb-8 text-center">Delivery Options</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {shippingOptions.map((option, index) => (
              <Card key={option.name} className="text-center animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardHeader>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <option.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle>{option.name}</CardTitle>
                  <Badge variant="secondary" className="w-fit mx-auto">
                    {option.time}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-semibold text-primary mb-2">{option.cost}</p>
                  <p className="text-muted-foreground text-sm">{option.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Delivery Process */}
        <section className="bg-muted/30 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-12">
          <div className="container-responsive">
            <h2 className="text-3xl font-bold mb-8 text-center">Order Tracking Process</h2>
            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {/* Progress Line */}
                <div className="absolute top-8 left-8 right-8 h-0.5 bg-border hidden md:block"></div>
                
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                  {deliverySteps.map((step, index) => (
                    <div key={step.step} className="text-center animate-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
                      <div className="relative">
                        <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4 relative z-10">
                          {step.step}
                        </div>
                      </div>
                      <h3 className="font-semibold mb-2">{step.title}</h3>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Policies */}
        <section>
          <h2 className="text-3xl font-bold mb-8 text-center">Our Delivery Promise</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {policies.map((policy, index) => (
              <Card key={policy.title} className="text-center animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <policy.icon className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold mb-2">{policy.title}</h3>
                  <p className="text-sm text-muted-foreground">{policy.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Shipping Zones */}
        <section>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Delivery Zones</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-muted/50 rounded-lg">
                  <div>
                    <h3 className="font-semibold">Metro Cities</h3>
                    <p className="text-sm text-muted-foreground">Mumbai, Delhi, Bangalore, Chennai, Hyderabad, Pune</p>
                  </div>
                  <Badge>1-2 Days</Badge>
                </div>
                <div className="flex justify-between items-center p-4 bg-muted/50 rounded-lg">
                  <div>
                    <h3 className="font-semibold">Tier 1 Cities</h3>
                    <p className="text-sm text-muted-foreground">Major state capitals and business centers</p>
                  </div>
                  <Badge variant="secondary">2-4 Days</Badge>
                </div>
                <div className="flex justify-between items-center p-4 bg-muted/50 rounded-lg">
                  <div>
                    <h3 className="font-semibold">Tier 2/3 Cities</h3>
                    <p className="text-sm text-muted-foreground">Smaller cities and towns</p>
                  </div>
                  <Badge variant="outline">3-7 Days</Badge>
                </div>
              </div>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Important Notes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold">Order Processing</h4>
                  <p className="text-sm text-muted-foreground">
                    Orders placed before 2 PM are processed the same day. Orders placed after 2 PM or on weekends are processed the next business day.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">Delivery Attempts</h4>
                  <p className="text-sm text-muted-foreground">
                    We make 3 delivery attempts. If unsuccessful, the package will be returned to our warehouse.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">Address Accuracy</h4>
                  <p className="text-sm text-muted-foreground">
                    Please ensure your delivery address is accurate and complete to avoid delays.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* FAQ Section */}
        <section>
          <Card>
            <CardHeader>
              <CardTitle>Shipping FAQs</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Can I change my delivery address after placing an order?</h4>
                <p className="text-sm text-muted-foreground">
                  Address changes are possible within 1 hour of placing the order, provided it hasn't been processed for shipping.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">What if I'm not available for delivery?</h4>
                <p className="text-sm text-muted-foreground">
                  Our delivery partner will attempt delivery 3 times. You can also coordinate with them for a convenient time.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Do you deliver on weekends?</h4>
                <p className="text-sm text-muted-foreground">
                  Yes, we deliver Monday through Saturday. Sunday delivery is available in select locations.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Shipping;