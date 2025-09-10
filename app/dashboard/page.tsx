"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, Package, ShoppingCart, DollarSign, Eye } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

// Sample data for the sales trend chart
const salesData = [
  { month: "Jan", sales: 12000 },
  { month: "Feb", sales: 15000 },
  { month: "Mar", sales: 18000 },
  { month: "Apr", sales: 22000 },
  { month: "May", sales: 25000 },
  { month: "Jun", sales: 28000 },
]

// Sample recent orders data
const recentOrders = [
  {
    id: "ORD-001",
    product: "Handwoven Scarf",
    image: "/handwoven-scarf.jpg",
    date: "2024-01-15",
    status: "Delivered",
    amount: "₹1,200",
  },
  {
    id: "ORD-002",
    product: "Ceramic Vase",
    image: "/ceramic-vase.png",
    date: "2024-01-14",
    status: "In Transit",
    amount: "₹2,500",
  },
  {
    id: "ORD-003",
    product: "Wooden Bowl Set",
    image: "/wooden-bowl-set.jpg",
    date: "2024-01-13",
    status: "Processing",
    amount: "₹1,800",
  },
  {
    id: "ORD-004",
    product: "Embroidered Cushion",
    image: "/embroidered-cushion.jpg",
    date: "2024-01-12",
    status: "Delivered",
    amount: "₹950",
  },
]

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard Overview</h1>
        <p className="text-muted-foreground">Welcome back! Here's what's happening with your artisan business.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">₹25,000</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-success">+12%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">123</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-success">+8%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Products Listed</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">45</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-success">+3</span> new this month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Profile Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">1,234</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-success">+15%</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Trend Chart */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Sales Trend
            </CardTitle>
            <CardDescription>Your sales performance over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333333" />
                  <XAxis dataKey="month" stroke="#b0b0b0" />
                  <YAxis stroke="#b0b0b0" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1e1e1e",
                      border: "1px solid #333333",
                      borderRadius: "8px",
                      color: "#e0e0e0",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="sales"
                    stroke="#1e88e5"
                    strokeWidth={2}
                    dot={{ fill: "#1e88e5", strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Recent Orders */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Your latest customer orders</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center gap-4 p-3 rounded-lg bg-secondary/50">
                  <img
                    src={order.image || "/placeholder.svg"}
                    alt={order.product}
                    className="w-10 h-10 rounded-md object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{order.product}</p>
                    <p className="text-xs text-muted-foreground">{order.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-foreground">{order.amount}</p>
                    <Badge
                      variant={
                        order.status === "Delivered"
                          ? "default"
                          : order.status === "In Transit"
                            ? "secondary"
                            : "outline"
                      }
                      className={
                        order.status === "Delivered"
                          ? "bg-success text-success-foreground"
                          : order.status === "In Transit"
                            ? "bg-primary text-primary-foreground"
                            : "border-border text-muted-foreground"
                      }
                    >
                      {order.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4 border-border hover:bg-accent bg-transparent">
              View All Orders
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
