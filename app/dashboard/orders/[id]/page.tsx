"use client"

import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Package, User, CreditCard, Truck, MapPin, Phone, Mail } from "lucide-react"

// Sample order detail data (in real app, this would come from API)
const sampleOrderDetail = {
  id: "ORD-001",
  productName: "Handwoven Scarf",
  productImage: "/handwoven-scarf.jpg",
  quantity: 2,
  unitPrice: 1200,
  totalPrice: 2400,
  date: "2024-01-15",
  status: "Delivered",
  paymentStatus: "Paid",
  paymentMethod: "UPI",
  customer: {
    name: "Priya Sharma",
    email: "priya.sharma@email.com",
    phone: "+91 98765 43210",
    address: {
      street: "123 MG Road",
      city: "Bangalore",
      state: "Karnataka",
      pincode: "560001",
      country: "India",
    },
  },
  tracking: {
    trackingNumber: "TRK123456789",
    carrier: "Blue Dart",
    estimatedDelivery: "2024-01-16",
  },
  timeline: [
    { status: "Order Placed", date: "2024-01-15 10:30 AM", completed: true },
    { status: "Payment Confirmed", date: "2024-01-15 10:35 AM", completed: true },
    { status: "Processing", date: "2024-01-15 02:00 PM", completed: true },
    { status: "Shipped", date: "2024-01-16 09:00 AM", completed: true },
    { status: "Out for Delivery", date: "2024-01-17 08:00 AM", completed: true },
    { status: "Delivered", date: "2024-01-17 03:30 PM", completed: true },
  ],
}

export default function OrderDetailPage() {
  const params = useParams()
  const router = useRouter()

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-success text-success-foreground"
      case "In Transit":
        return "bg-primary text-primary-foreground"
      case "Processing":
        return "bg-yellow-600 text-white"
      case "Cancelled":
        return "bg-destructive text-destructive-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "Paid":
        return "bg-success text-success-foreground"
      case "Pending":
        return "bg-yellow-600 text-white"
      case "Refunded":
        return "bg-destructive text-destructive-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button asChild variant="outline" size="sm" className="border-border hover:bg-accent bg-transparent">
          <Link href="/dashboard/orders">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Orders
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Order Details</h1>
          <p className="text-muted-foreground">Order {sampleOrderDetail.id}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Summary */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Order Summary
                </span>
                <div className="flex gap-2">
                  <Badge className={getStatusColor(sampleOrderDetail.status)}>{sampleOrderDetail.status}</Badge>
                  <Badge className={getPaymentStatusColor(sampleOrderDetail.paymentStatus)}>
                    {sampleOrderDetail.paymentStatus}
                  </Badge>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                <img
                  src={sampleOrderDetail.productImage || "/placeholder.svg"}
                  alt={sampleOrderDetail.productName}
                  className="w-16 h-16 rounded-md object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{sampleOrderDetail.productName}</h3>
                  <p className="text-sm text-muted-foreground">Quantity: {sampleOrderDetail.quantity}</p>
                  <p className="text-sm text-muted-foreground">Unit Price: ₹{sampleOrderDetail.unitPrice}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-foreground">₹{sampleOrderDetail.totalPrice}</p>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Order Date</p>
                  <p className="font-medium">{sampleOrderDetail.date}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Payment Method</p>
                  <p className="font-medium">{sampleOrderDetail.paymentMethod}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Customer Information */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Customer Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-medium">{sampleOrderDetail.customer.name}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    {sampleOrderDetail.customer.email}
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    {sampleOrderDetail.customer.phone}
                  </p>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Shipping Address
                </p>
                <div className="bg-muted/50 p-3 rounded-lg">
                  <p className="font-medium">{sampleOrderDetail.customer.address.street}</p>
                  <p>
                    {sampleOrderDetail.customer.address.city}, {sampleOrderDetail.customer.address.state}{" "}
                    {sampleOrderDetail.customer.address.pincode}
                  </p>
                  <p>{sampleOrderDetail.customer.address.country}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order Timeline */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5" />
                Order Timeline
              </CardTitle>
              <CardDescription>Track the progress of this order</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sampleOrderDetail.timeline.map((item, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className={`w-3 h-3 rounded-full ${item.completed ? "bg-success" : "bg-muted-foreground"}`} />
                    <div className="flex-1">
                      <p className={`font-medium ${item.completed ? "text-foreground" : "text-muted-foreground"}`}>
                        {item.status}
                      </p>
                      <p className="text-sm text-muted-foreground">{item.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <label className="text-sm font-medium">Update Status</label>
                <Select defaultValue={sampleOrderDetail.status}>
                  <SelectTrigger className="bg-input border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    <SelectItem value="Processing">Processing</SelectItem>
                    <SelectItem value="In Transit">In Transit</SelectItem>
                    <SelectItem value="Delivered">Delivered</SelectItem>
                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full bg-primary hover:bg-primary/90">Update Status</Button>
            </CardContent>
          </Card>

          {/* Shipping Information */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5" />
                Shipping Info
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Tracking Number</p>
                <p className="font-medium">{sampleOrderDetail.tracking.trackingNumber}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Carrier</p>
                <p className="font-medium">{sampleOrderDetail.tracking.carrier}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Estimated Delivery</p>
                <p className="font-medium">{sampleOrderDetail.tracking.estimatedDelivery}</p>
              </div>
              <Button variant="outline" className="w-full border-border hover:bg-accent bg-transparent">
                Track Package
              </Button>
            </CardContent>
          </Card>

          {/* Payment Information */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment Info
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Payment Status</p>
                <Badge className={getPaymentStatusColor(sampleOrderDetail.paymentStatus)}>
                  {sampleOrderDetail.paymentStatus}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Payment Method</p>
                <p className="font-medium">{sampleOrderDetail.paymentMethod}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Amount</p>
                <p className="text-lg font-bold text-foreground">₹{sampleOrderDetail.totalPrice}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
