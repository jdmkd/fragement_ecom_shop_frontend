import { useState } from "react";
import { Search, Package, Truck, CheckCircle, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";

interface OrderItem {
  name: string;
  brand: string;
  size: string;
  quantity: number;
  price: number;
  image: string;
}

interface TimelineStep {
  status: string;
  description: string;
  timestamp: string;
  completed: boolean;
  icon: React.ElementType;
  current?: boolean;
}

interface ShippingAddress {
  name: string;
  address: string;
  city: string;
  phone: string;
}

interface DeliveryPartner {
  name: string;
  trackingNumber: string;
  phone: string;
}

interface OrderDetails {
  orderId: string;
  status: string;
  estimatedDelivery: string;
  items: OrderItem[];
  timeline: TimelineStep[];
  shippingAddress: ShippingAddress;
  deliveryPartner: DeliveryPartner;
}

const mockOrderData: OrderDetails = {
  orderId: "ELS123456789",
  status: "Out for Delivery",
  estimatedDelivery: "Today, 6:00 PM",
  items: [
    {
      name: "Premium Cotton Kurta - Royal Blue",
      brand: "FashionHub",
      size: "L",
      quantity: 1,
      price: 1299,
      image: "/placeholder.svg"
    },
    {
      name: "Nike Air Max Sneakers",
      brand: "Nike",
      size: "9",
      quantity: 1,
      price: 5999,
      image: "/placeholder.svg"
    }
  ],
  timeline: [
    {
      status: "Order Placed",
      description: "Your order has been successfully placed",
      timestamp: "Dec 15, 2023 at 2:30 PM",
      completed: true,
      icon: CheckCircle
    },
    {
      status: "Order Confirmed",
      description: "Your order has been confirmed and is being prepared",
      timestamp: "Dec 15, 2023 at 3:00 PM",
      completed: true,
      icon: CheckCircle
    },
    {
      status: "Order Shipped",
      description: "Your order has been shipped from our warehouse",
      timestamp: "Dec 16, 2023 at 10:00 AM",
      completed: true,
      icon: CheckCircle
    },
    {
      status: "Out for Delivery",
      description: "Your order is out for delivery",
      timestamp: "Dec 17, 2023 at 8:00 AM",
      completed: true,
      icon: Truck,
      current: true
    },
    {
      status: "Delivered",
      description: "Your order will be delivered",
      timestamp: "Expected: Dec 17, 2023 by 6:00 PM",
      completed: false,
      icon: Package
    }
  ],
  shippingAddress: {
    name: "Rahul Sharma",
    address: "123 Business Park, Andheri East",
    city: "Mumbai, Maharashtra - 400069",
    phone: "+91 98765 43210"
  },
  deliveryPartner: {
    name: "Express Logistics",
    trackingNumber: "EXP987654321",
    phone: "+91 98765 43211"
  }
};

const TrackOrder = () => {
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [orderId, setOrderId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleTrackOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId.trim()) return;

    setIsLoading(true);
    
    setTimeout(() => {
      if (orderId.toLowerCase().includes("els") || orderId === "123456789") {
        setOrderDetails(mockOrderData);
      } else {
        setOrderDetails(null);
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-muted/30 py-12">
        <div className="container-responsive text-center">
          <h1 className="text-4xl font-bold mb-4">Track Your Order</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Enter your order ID to get real-time updates on your package delivery status.
          </p>
        </div>
      </div>

      <div className="container-responsive py-12">
        {/* Search Form */}
        <Card className="max-w-md mx-auto mb-12">
          <CardHeader>
            <CardTitle className="text-center">Enter Order Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleTrackOrder} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="orderId">Order ID</Label>
                <Input
                  id="orderId"
                  type="text"
                  placeholder="e.g., ELS123456789"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  className="text-center font-mono"
                />
                <p className="text-xs text-muted-foreground text-center">
                  You can find your Order ID in your confirmation email
                </p>
              </div>
              <Button 
                type="submit" 
                className="w-full btn-primary" 
                disabled={isLoading || !orderId.trim()}
              >
                {isLoading ? (
                  <>
                    <Clock className="h-4 w-4 mr-2 animate-spin" />
                    Tracking...
                  </>
                ) : (
                  <>
                    <Search className="h-4 w-4 mr-2" />
                    Track Order
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Order Details */}
        {orderDetails && (
          <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
            {/* Order Status Header */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">Order #{orderDetails.orderId}</h2>
                    <div className="flex items-center space-x-4">
                      <Badge variant="secondary" className="text-sm">
                        {orderDetails.status}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        Expected: {orderDetails.estimatedDelivery}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Tracking Number</p>
                    <p className="font-mono text-sm">{orderDetails.deliveryPartner.trackingNumber}</p>
                    <p className="text-sm text-muted-foreground">via {orderDetails.deliveryPartner.name}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Progress Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Order Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {orderDetails.timeline.map((step: TimelineStep, index: number) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                        step.completed 
                          ? step.current 
                            ? 'bg-primary text-primary-foreground animate-pulse' 
                            : 'bg-success text-success-foreground'
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        <step.icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className={`font-semibold ${step.current ? 'text-primary' : ''}`}>
                            {step.status}
                          </h3>
                          <span className="text-sm text-muted-foreground">
                            {step.timestamp}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Order Items */}
              <Card>
                <CardHeader>
                  <CardTitle>Order Items</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {orderDetails.items.map((item: OrderItem, index: number) => (
                      <div key={index} className="flex items-center space-x-4 p-3 bg-muted/30 rounded-lg">
                        <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                          <Package className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium truncate">{item.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {item.brand} • Size: {item.size} • Qty: {item.quantity}
                          </p>
                          <p className="text-sm font-semibold text-primary">
                            ₹{item.price.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Delivery Details */}
              <Card>
                <CardHeader>
                  <CardTitle>Delivery Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-primary" />
                      Delivery Address
                    </h4>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p className="font-medium text-foreground">{orderDetails.shippingAddress.name}</p>
                      <p>{orderDetails.shippingAddress.address}</p>
                      <p>{orderDetails.shippingAddress.city}</p>
                      <p>{orderDetails.shippingAddress.phone}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 flex items-center">
                      <Truck className="h-4 w-4 mr-2 text-primary" />
                      Delivery Partner
                    </h4>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p className="font-medium text-foreground">{orderDetails.deliveryPartner.name}</p>
                      <p>Contact: {orderDetails.deliveryPartner.phone}</p>
                      <p>Tracking: {orderDetails.deliveryPartner.trackingNumber}</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <Button variant="outline" className="w-full">
                      Contact Delivery Partner
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* No Order Found */}
        {orderDetails === null && orderId && !isLoading && (
          <Card className="max-w-md mx-auto text-center animate-fade-in">
            <CardContent className="p-8">
              <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Order Not Found</h3>
              <p className="text-muted-foreground mb-6">
                We couldn't find an order with ID "{orderId}". Please check your order ID and try again.
              </p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setOrderId("");
                  setOrderDetails(null);
                }}
              >
                Try Again
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Help Section */}
        <Card className="mt-12 bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-8 text-center">
            <h3 className="text-xl font-bold mb-4">Need Help?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              If you're having trouble tracking your order or have any questions about delivery, 
              our customer support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline">
                Contact Support
              </Button>
              <Button variant="outline">
                Live Chat
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TrackOrder;