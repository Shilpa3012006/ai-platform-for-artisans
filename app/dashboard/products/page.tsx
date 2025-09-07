"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Edit, Eye, Trash2 } from "lucide-react"

// Sample products data
const sampleProducts = [
  {
    id: "1",
    name: "Handwoven Scarf",
    image: "/handwoven-scarf.jpg",
    price: "₹1,200",
    category: "Textiles",
    status: "In Stock",
    stock: 15,
    views: 234,
  },
  {
    id: "2",
    name: "Ceramic Vase",
    image: "/ceramic-vase.png",
    price: "₹2,500",
    category: "Pottery",
    status: "In Stock",
    stock: 8,
    views: 189,
  },
  {
    id: "3",
    name: "Wooden Bowl Set",
    image: "/wooden-bowl-set.jpg",
    price: "₹1,800",
    category: "Woodwork",
    status: "Low Stock",
    stock: 2,
    views: 156,
  },
  {
    id: "4",
    name: "Embroidered Cushion",
    image: "/embroidered-cushion.jpg",
    price: "₹950",
    category: "Textiles",
    status: "In Stock",
    stock: 12,
    views: 98,
  },
  {
    id: "5",
    name: "Silver Jewelry Set",
    image: "/silver-jewelry-set-handcrafted.jpg",
    price: "₹3,200",
    category: "Jewelry",
    status: "Out of Stock",
    stock: 0,
    views: 267,
  },
  {
    id: "6",
    name: "Leather Handbag",
    image: "/handcrafted-leather-handbag-brown.jpg",
    price: "₹2,800",
    category: "Leather Goods",
    status: "In Stock",
    stock: 6,
    views: 145,
  },
]

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredProducts = sampleProducts.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter
    const matchesStatus = statusFilter === "all" || product.status === statusFilter
    return matchesSearch && matchesCategory && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Stock":
        return "bg-success text-success-foreground"
      case "Low Stock":
        return "bg-yellow-600 text-white"
      case "Out of Stock":
        return "bg-destructive text-destructive-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Product Listings</h1>
          <p className="text-muted-foreground">Manage your artisan products and inventory.</p>
        </div>
        <Button asChild className="bg-primary hover:bg-primary/90">
          <Link href="/dashboard/products/add">
            <Plus className="h-4 w-4 mr-2" />
            Add New Product
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <Card className="bg-card border-border">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-input border-border"
                />
              </div>
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-[180px] bg-input border-border">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Textiles">Textiles</SelectItem>
                <SelectItem value="Pottery">Pottery</SelectItem>
                <SelectItem value="Woodwork">Woodwork</SelectItem>
                <SelectItem value="Jewelry">Jewelry</SelectItem>
                <SelectItem value="Leather Goods">Leather Goods</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px] bg-input border-border">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="In Stock">In Stock</SelectItem>
                <SelectItem value="Low Stock">Low Stock</SelectItem>
                <SelectItem value="Out of Stock">Out of Stock</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="bg-card border-border hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="aspect-square relative mb-4 rounded-lg overflow-hidden bg-muted">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2">
                  <Badge className={getStatusColor(product.status)}>{product.status}</Badge>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold text-foreground truncate">{product.name}</h3>
                <p className="text-sm text-muted-foreground">{product.category}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-primary">{product.price}</span>
                  <span className="text-sm text-muted-foreground">Stock: {product.stock}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    {product.views} views
                  </span>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="flex-1 border-border hover:bg-accent bg-transparent"
                >
                  <Link href={`/dashboard/products/edit/${product.id}`}>
                    <Edit className="h-3 w-3 mr-1" />
                    Edit
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground bg-transparent"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <Card className="bg-card border-border">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="text-center space-y-2">
              <h3 className="text-lg font-semibold text-foreground">No products found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filters, or add a new product.</p>
              <Button asChild className="mt-4 bg-primary hover:bg-primary/90">
                <Link href="/dashboard/products/add">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Product
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
