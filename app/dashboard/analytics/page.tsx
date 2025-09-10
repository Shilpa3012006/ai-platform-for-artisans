"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, BarChart3, PieChart, Users, Eye, ShoppingCart, DollarSign } from "lucide-react"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Cell,
} from "recharts"

// Sample data for charts
const salesOverTimeData = [
  { month: "Jul", sales: 18000, orders: 45 },
  { month: "Aug", sales: 22000, orders: 52 },
  { month: "Sep", sales: 19000, orders: 48 },
  { month: "Oct", sales: 25000, orders: 61 },
  { month: "Nov", sales: 28000, orders: 68 },
  { month: "Dec", sales: 32000, orders: 75 },
  { month: "Jan", sales: 35000, orders: 82 },
]

const productPerformanceData = [
  { product: "Handwoven Scarf", sales: 8500, orders: 35, views: 450 },
  { product: "Ceramic Vase", sales: 7200, orders: 18, views: 320 },
  { product: "Wooden Bowl Set", sales: 6800, orders: 22, views: 280 },
  { product: "Embroidered Cushion", sales: 5400, orders: 28, views: 380 },
  { product: "Silver Jewelry", sales: 4800, orders: 12, views: 240 },
  { product: "Leather Handbag", sales: 4200, orders: 8, views: 180 },
]

const categoryData = [
  { name: "Textiles", value: 35, color: "#1e88e5" },
  { name: "Pottery", value: 25, color: "#4caf50" },
  { name: "Woodwork", value: 20, color: "#ff9800" },
  { name: "Jewelry", value: 12, color: "#9c27b0" },
  { name: "Leather Goods", value: 8, color: "#f44336" },
]

const topCustomersData = [
  { name: "Priya Sharma", orders: 8, totalSpent: 12400 },
  { name: "Rajesh Kumar", orders: 6, totalSpent: 9800 },
  { name: "Anita Patel", orders: 5, totalSpent: 8200 },
  { name: "Vikram Singh", orders: 4, totalSpent: 6500 },
  { name: "Meera Joshi", orders: 3, totalSpent: 5100 },
]

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics & Insights</h1>
          <p className="text-muted-foreground">Analyze your business performance and trends.</p>
        </div>
        <Select defaultValue="7days">
          <SelectTrigger className="w-[180px] bg-input border-border">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent className="bg-popover border-border">
            <SelectItem value="7days">Last 7 days</SelectItem>
            <SelectItem value="30days">Last 30 days</SelectItem>
            <SelectItem value="90days">Last 90 days</SelectItem>
            <SelectItem value="1year">Last year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">₹35,000</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-success" />
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
            <div className="text-2xl font-bold text-foreground">82</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-success" />
              <span className="text-success">+8%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Profile Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">1,847</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-success" />
              <span className="text-success">+15%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">4.4%</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingDown className="h-3 w-3 text-destructive" />
              <span className="text-destructive">-2%</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Over Time */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Sales Over Time
            </CardTitle>
            <CardDescription>Revenue and order trends over the last 7 months</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesOverTimeData}>
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
                    name="Sales (₹)"
                  />
                  <Line
                    type="monotone"
                    dataKey="orders"
                    stroke="#4caf50"
                    strokeWidth={2}
                    dot={{ fill: "#4caf50", strokeWidth: 2, r: 4 }}
                    name="Orders"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5 text-primary" />
              Sales by Category
            </CardTitle>
            <CardDescription>Distribution of sales across product categories</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center">
              <div className="w-1/2">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <RechartsPieChart data={categoryData} cx="50%" cy="50%" innerRadius={40} outerRadius={80}>
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </RechartsPieChart>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1e1e1e",
                        border: "1px solid #333333",
                        borderRadius: "8px",
                        color: "#e0e0e0",
                      }}
                    />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
              <div className="w-1/2 space-y-2">
                {categoryData.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm text-foreground">{item.name}</span>
                    <span className="text-sm text-muted-foreground ml-auto">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Product Performance */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Product Performance
            </CardTitle>
            <CardDescription>Sales performance by individual products</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={productPerformanceData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" stroke="#333333" />
                  <XAxis type="number" stroke="#b0b0b0" />
                  <YAxis dataKey="product" type="category" width={120} stroke="#b0b0b0" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1e1e1e",
                      border: "1px solid #333333",
                      borderRadius: "8px",
                      color: "#e0e0e0",
                    }}
                  />
                  <Bar dataKey="sales" fill="#1e88e5" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Top Customers */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Top Customers
            </CardTitle>
            <CardDescription>Your most valuable customers by total spending</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topCustomersData.map((customer, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-medium">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{customer.name}</p>
                      <p className="text-sm text-muted-foreground">{customer.orders} orders</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-foreground">₹{customer.totalSpent.toLocaleString()}</p>
                    <Badge variant="outline" className="border-border text-xs">
                      VIP
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
