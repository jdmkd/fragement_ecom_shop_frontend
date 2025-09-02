import { Search, HelpCircle } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const faqCategories = [
    {
      title: "Orders & Shipping",
      faqs: [
        {
          question: "How long does delivery take?",
          answer: "Standard delivery takes 3-7 business days. Express delivery is available for 1-2 days delivery in major cities. Free shipping is available on orders above ₹500."
        },
        {
          question: "Can I track my order?",
          answer: "Yes! Once your order is shipped, you'll receive a tracking number via SMS and email. You can also track your order on our Track Order page using your order ID."
        },
        {
          question: "What are the shipping charges?",
          answer: "Shipping is free for orders above ₹500. For orders below ₹500, standard shipping charges of ₹50 apply. Express delivery charges vary by location."
        },
        {
          question: "Do you deliver to all locations in India?",
          answer: "We deliver to most locations across India. During checkout, you can verify if delivery is available to your pincode. Some remote areas may have extended delivery times."
        }
      ]
    },
    {
      title: "Returns & Exchanges",
      faqs: [
        {
          question: "What is your return policy?",
          answer: "We offer a 30-day return policy from the date of delivery. Items must be in original condition with tags attached. Certain items like undergarments and cosmetics are not returnable for hygiene reasons."
        },
        {
          question: "How do I return or exchange an item?",
          answer: "You can initiate a return through your account dashboard or contact our customer support. We'll arrange a pickup from your address. Refunds are processed within 5-7 business days after we receive the item."
        },
        {
          question: "Is there a return fee?",
          answer: "Returns are free for defective or wrong items sent. For other returns, a nominal return shipping fee may apply depending on your location."
        }
      ]
    },
    {
      title: "Payments",
      faqs: [
        {
          question: "What payment methods do you accept?",
          answer: "We accept Credit Cards, Debit Cards, Net Banking, UPI, Digital Wallets (Paytm, PhonePe, Google Pay), and Cash on Delivery (COD) for eligible orders."
        },
        {
          question: "Is it safe to pay online?",
          answer: "Yes, absolutely! We use SSL encryption and partner with trusted payment gateways. Your payment information is never stored on our servers and is processed securely."
        },
        {
          question: "Can I pay cash on delivery?",
          answer: "COD is available for orders up to ₹5,000 in select cities. A small COD handling fee may apply. Check availability during checkout."
        }
      ]
    },
    {
      title: "Account & Shopping",
      faqs: [
        {
          question: "Do I need an account to shop?",
          answer: "You can browse products without an account, but creating one helps you track orders, save favorites, get personalized recommendations, and checkout faster."
        },
        {
          question: "How do I check product authenticity?",
          answer: "All our products are sourced directly from brands or authorized distributors. We guarantee 100% authenticity. Each product comes with proper tags and authentication markers."
        },
        {
          question: "Can I modify or cancel my order?",
          answer: "You can modify or cancel your order within 1 hour of placing it, provided it hasn't been processed for shipping. Contact customer support immediately for assistance."
        }
      ]
    },
    {
      title: "Size & Fitting",
      faqs: [
        {
          question: "How do I choose the right size?",
          answer: "Each product page has a detailed size chart. Measure yourself and compare with our size guide. For doubts, contact our support team or check customer reviews for fitting insights."
        },
        {
          question: "What if the size doesn't fit?",
          answer: "You can exchange for a different size within 30 days. The item should be unworn with original tags. We offer free size exchange for the first exchange."
        }
      ]
    }
  ];

  const filteredFAQs = faqCategories.map(category => ({
    ...category,
    faqs: category.faqs.filter(faq =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.faqs.length > 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-muted/30 py-12">
        <div className="container-responsive text-center">
          <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
            Find answers to common questions about shopping, orders, returns, and more.
          </p>
          
          {/* Search */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white"
            />
          </div>
        </div>
      </div>

      <div className="container-responsive py-12">
        {/* FAQ Categories */}
        <div className="space-y-8">
          {filteredFAQs.map((category, categoryIndex) => (
            <Card key={category.title} className="animate-fade-in" style={{ animationDelay: `${categoryIndex * 0.1}s` }}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <HelpCircle className="h-5 w-5 mr-2 text-primary" />
                  {category.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {category.faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`${categoryIndex}-${index}`}>
                      <AccordionTrigger className="text-left hover:text-primary">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {searchQuery && filteredFAQs.length === 0 && (
          <div className="text-center py-12">
            <HelpCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No FAQs found</h3>
            <p className="text-muted-foreground mb-6">
              Sorry, we couldn't find any FAQs matching "{searchQuery}". 
              Try searching with different keywords or contact our support team.
            </p>
            <Button variant="outline" onClick={() => setSearchQuery("")}>
              Clear Search
            </Button>
          </div>
        )}

        {/* Contact Support */}
        <Card className="mt-12 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Can't find the answer you're looking for? Our customer support team is here to help you 24/7.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="btn-primary">
                Contact Support
              </Button>
              <Button variant="outline" size="lg">
                Live Chat
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FAQ;