"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Eye, Download, Filter, TrendingUp, Package, DollarSign, Clock } from "lucide-react"

// Sample orders data
const sampleOrders = [
  {
    id: "ORD-001",
    productName: "Handwoven Scarf",
    productImage: "/handwoven-scarf.jpg",
    customerName: "Priya Sharma",
    quantity: 2,
    totalPrice: 2400,
    date: "2024-01-15",
    status: "Delivered",
    paymentStatus: "Paid",
  },
  {
    id: "ORD-002",
    productName: "Ceramic Vase",
    productImage: "/ceramic-vase.png",
    customerName: "Rajesh Kumar",
    quantity: 1,
    totalPrice: 2500,
    date: "2024-01-14",
    status: "In Transit",
    paymentStatus: "Paid",
  },
  {
    id: "ORD-003",
    productName: "Wooden Bowl Set",
    productImage: "/wooden-bowl-set.jpg",
    customerName: "Anita Patel",
    quantity: 1,
    totalPrice: 1800,
    date: "2024-01-13",
    status: "Processing",
    paymentStatus: "Paid",
  },
  {
    id: "ORD-004",
    productName: "Embroidered Cushion",
    productImage: "/embroidered-cushion.jpg",
    customerName: "Vikram Singh",
    quantity: 3,
    totalPrice: 2850,
    date: "2024-01-12",
    status: "Delivered",
    paymentStatus: "Paid",
  },
  {
    id: "ORD-005",
    productName: "Silver Jewelry Set",
    productImage: "/silver-jewelry-set-handcrafted.jpg",
    customerName: "Meera Joshi",
    quantity: 1,
    totalPrice: 3200,
    date: "2024-01-11",
    status: "Cancelled",
    paymentStatus: "Refunded",
  },
  {
    id: "ORD-006",
    productName: "Leather Handbag",
    productImage: "/handcrafted-leather-handbag-brown.jpg",
    customerName: "Deepak Gupta",
    quantity: 1,
    totalPrice: 2800,
    date: "2024-01-10",
    status: "In Transit",
    paymentStatus: "Paid",
  },
  {
    id: "ORD-007",
    productName: "Handwoven Scarf",
    productImage: "/handwoven-scarf.jpg",
    customerName: "Sunita Reddy",
    quantity: 1,
    totalPrice: 1200,
    date: "2024-01-09",
    status: "Delivered",
    paymentStatus: "Paid",
  },
  {
    id: "ORD-008",
    productName: "Ceramic Vase",
    productImage: "/ceramic-vase.png",
    customerName: "Arjun Nair",
    quantity: 2,
    totalPrice: 5000,
    date: "2024-01-08",
    status: "Processing",
    paymentStatus: "Paid",
  },
]

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("all")

  const filteredOrders = sampleOrders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    const matchesDate =
      dateFilter === "all" ||
      (dateFilter === "today" && order.date === "2024-01-15") ||
      (dateFilter === "week" && new Date(order.date) >= new Date("2024-01-09")) ||
      (dateFilter === "month" && new Date(order.date) >= new Date("2024-01-01"))
    return matchesSearch && matchesStatus && matchesDate
  })

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

  // Calculate stats
  const totalRevenue = sampleOrders
    .filter((order) => order.paymentStatus === "Paid")
    .reduce((sum, order) => sum + order.totalPrice, 0)
  const totalOrders = sampleOrders.length
  const pendingOrders = sampleOrders.filter((order) => order.status === "Processing").length
  const deliveredOrders = sampleOrders.filter((order) => order.status === "Delivered").length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Orders & Sales</h1>
        <p className="text-muted-foreground">Track your orders and sales performance.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">₹{totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-success">+12%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{totalOrders}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-success">+8%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{pendingOrders}</div>
            <p className="text-xs text-muted-foreground">Requires attention</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Delivered Orders</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{deliveredOrders}</div>
            <p className="text-xs text-muted-foreground">Successfully completed</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filter Orders
          </CardTitle>
          <CardDescription>Search and filter your orders by various criteria.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by order ID, product, or customer..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-input border-border"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px] bg-input border-border">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Processing">Processing</SelectItem>
                <SelectItem value="In Transit">In Transit</SelectItem>
                <SelectItem value="Delivered">Delivered</SelectItem>
                <SelectItem value="Cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="w-full sm:w-[180px] bg-input border-border">
                <SelectValue placeholder="Date Range" />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="border-border hover:bg-accent bg-transparent">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Order History</CardTitle>
          <CardDescription>Complete list of all your orders and their current status.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-muted/50">
                  <TableHead className="w-[100px]">Order ID</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead className="text-center">Quantity</TableHead>
                  <TableHead className="text-right">Total Price</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id} className="border-border hover:bg-muted/50">
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <img
                          src={order.productImage || "/placeholder.svg"}
                          alt={order.productName}
                          className="w-10 h-10 rounded-md object-cover"
                        />
                        <span className="font-medium">{order.productName}</span>
                      </div>
                    </TableCell>
                    <TableCell>{order.customerName}</TableCell>
                    <TableCell className="text-center">{order.quantity}</TableCell>
                    <TableCell className="text-right font-medium">₹{order.totalPrice.toLocaleString()}</TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getPaymentStatusColor(order.paymentStatus)}>{order.paymentStatus}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" className="hover:bg-accent">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredOrders.length === 0 && (
            <div className="text-center py-12">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-foreground">No orders found</h3>
                <p className="text-muted-foreground">Try adjusting your search or filters.</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
