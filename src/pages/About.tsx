import { Users, Target, Award, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Our Mission",
      description: "To provide high-quality, affordable fashion and lifestyle products to customers across India."
    },
    {
      icon: Users,
      title: "Customer First",
      description: "Every decision we make is centered around providing the best possible experience for our customers."
    },
    {
      icon: Award,
      title: "Quality Assured",
      description: "We partner with trusted brands and suppliers to ensure every product meets our quality standards."
    },
    {
      icon: Heart,
      title: "Community",
      description: "Building a community of fashion-forward individuals who value quality and style."
    }
  ];

  const team = [
    {
      name: "Rahul Sharma",
      position: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300",
      description: "10+ years in e-commerce and retail"
    },
    {
      name: "Priya Patel",
      position: "Head of Design",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612c5d4?w=300",
      description: "Fashion design expert with international experience"
    },
    {
      name: "Amit Kumar",
      position: "Technology Lead",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300",
      description: "Building seamless digital experiences"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-muted/30 py-16">
        <div className="container-responsive text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Fragement </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We're on a mission to democratize fashion and make premium quality products 
            accessible to everyone. Since our inception, we've been committed to delivering 
            exceptional value and service to our customers.
          </p>
        </div>
      </div>

      {/* Story Section */}
      <section className="section-padding">
        <div className="container-responsive">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Our Story</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Founded in 2020,  started as a small venture with a big dream - 
                  to make quality fashion accessible to everyone across India. What began 
                  as a team of three passionate individuals has now grown into a trusted 
                  e-commerce platform serving thousands of customers.
                </p>
                <p>
                  We believe that great style shouldn't come with a hefty price tag. That's 
                  why we work directly with manufacturers and brands to bring you the best 
                  products at competitive prices, without compromising on quality.
                </p>
                <p>
                  Today, we're proud to offer a curated selection of clothing, footwear, 
                  accessories, and lifestyle products that cater to diverse tastes and 
                  preferences. Our commitment to customer satisfaction remains at the 
                  heart of everything we do.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="text-5xl font-bold text-primary">50K+</div>
                  <div className="text-lg text-muted-foreground">Happy Customers</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-muted/30">
        <div className="container-responsive">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              The principles that guide us in everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={value.title} className="text-center animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding">
        <div className="container-responsive">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              The passionate people behind 
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={member.name} className="text-center animate-scale-in" style={{ animationDelay: `${index * 0.2}s` }}>
                <CardContent className="p-6">
                  <div className="w-24 h-24 mx-auto mb-4 overflow-hidden rounded-full">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-semibold text-lg mb-1">{member.name}</h3>
                  <p className="text-primary font-medium mb-2">{member.position}</p>
                  <p className="text-sm text-muted-foreground">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-muted/30">
        <div className="container-responsive">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">50K+</div>
              <div className="text-sm text-muted-foreground">Happy Customers</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">1000+</div>
              <div className="text-sm text-muted-foreground">Products</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">50+</div>
              <div className="text-sm text-muted-foreground">Brands</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">99%</div>
              <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;