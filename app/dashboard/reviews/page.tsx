"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Star, Search, Filter, TrendingUp, MessageSquare, ThumbsUp, Award } from "lucide-react"

// Sample reviews data
const sampleReviews = [
  {
    id: "1",
    customerName: "Priya Sharma",
    customerAvatar: "/customer-avatar-1.jpg",
    productName: "Handwoven Scarf",
    productImage: "/handwoven-scarf.jpg",
    rating: 5,
    date: "2024-01-15",
    comment:
      "Absolutely beautiful scarf! The craftsmanship is exceptional and the colors are even more vibrant than in the photos. It's clear that a lot of love and skill went into making this piece. Will definitely be ordering more!",
    helpful: 12,
    verified: true,
  },
  {
    id: "2",
    customerName: "Rajesh Kumar",
    customerAvatar: "/customer-avatar-2.jpg",
    productName: "Ceramic Vase",
    productImage: "/ceramic-vase.png",
    rating: 5,
    date: "2024-01-14",
    comment:
      "This vase is a true work of art. The attention to detail is remarkable, and it's become the centerpiece of our living room. The packaging was excellent too - arrived in perfect condition.",
    helpful: 8,
    verified: true,
  },
  {
    id: "3",
    customerName: "Anita Patel",
    customerAvatar: "/customer-avatar-3.jpg",
    productName: "Wooden Bowl Set",
    productImage: "/wooden-bowl-set.jpg",
    rating: 4,
    date: "2024-01-13",
    comment:
      "Beautiful wooden bowls with a lovely finish. They're well-made and perfect for serving. Only minor issue is that one bowl had a small imperfection, but overall very satisfied with the purchase.",
    helpful: 5,
    verified: true,
  },
  {
    id: "4",
    customerName: "Vikram Singh",
    customerAvatar: "/customer-avatar-4.jpg",
    productName: "Embroidered Cushion",
    productImage: "/embroidered-cushion.jpg",
    rating: 5,
    date: "2024-01-12",
    comment:
      "The embroidery work is absolutely stunning! You can tell this was made with great care and skill. The colors are rich and the fabric quality is excellent. Highly recommend!",
    helpful: 15,
    verified: true,
  },
  {
    id: "5",
    customerName: "Meera Joshi",
    customerAvatar: "/customer-avatar-5.jpg",
    productName: "Silver Jewelry Set",
    productImage: "/silver-jewelry-set-handcrafted.jpg",
    rating: 5,
    date: "2024-01-11",
    comment:
      "Exquisite jewelry set! The silver work is intricate and beautiful. I've received so many compliments when wearing these pieces. The artisan's skill really shows in every detail.",
    helpful: 20,
    verified: true,
  },
  {
    id: "6",
    customerName: "Deepak Gupta",
    customerAvatar: "/customer-avatar-6.jpg",
    productName: "Leather Handbag",
    productImage: "/handcrafted-leather-handbag-brown.jpg",
    rating: 4,
    date: "2024-01-10",
    comment:
      "Good quality leather handbag with nice stitching. The size is perfect for daily use and it has a classic look. Delivery was prompt and packaging was secure.",
    helpful: 7,
    verified: true,
  },
  {
    id: "7",
    customerName: "Sunita Reddy",
    customerAvatar: "/customer-avatar-7.jpg",
    productName: "Handwoven Scarf",
    productImage: "/handwoven-scarf.jpg",
    rating: 5,
    date: "2024-01-09",
    comment:
      "This scarf exceeded my expectations! The texture is so soft and the pattern is unique. It's become my favorite accessory. Thank you for creating such beautiful pieces!",
    helpful: 9,
    verified: true,
  },
]

export default function ReviewsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [ratingFilter, setRatingFilter] = useState("all")
  const [sortBy, setSortBy] = useState("newest")

  const filteredReviews = sampleReviews
    .filter((review) => {
      const matchesSearch =
        review.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.comment.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesRating = ratingFilter === "all" || review.rating.toString() === ratingFilter
      return matchesSearch && matchesRating
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.date).getTime() - new Date(a.date).getTime()
        case "oldest":
          return new Date(a.date).getTime() - new Date(b.date).getTime()
        case "highest":
          return b.rating - a.rating
        case "lowest":
          return a.rating - b.rating
        case "helpful":
          return b.helpful - a.helpful
        default:
          return 0
      }
    })

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`} />
    ))
  }

  // Calculate stats
  const averageRating = (sampleReviews.reduce((sum, review) => sum + review.rating, 0) / sampleReviews.length).toFixed(
    1,
  )
  const totalReviews = sampleReviews.length
  const fiveStarReviews = sampleReviews.filter((r) => r.rating === 5).length
  const responseRate = "95%" // Mock data

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Reviews & Ratings</h1>
        <p className="text-muted-foreground">View customer feedback and ratings for your products.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{averageRating}</div>
            <div className="flex items-center gap-1 mt-1">
              {renderStars(Math.round(Number.parseFloat(averageRating)))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reviews</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{totalReviews}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-success">+5</span> this month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">5-Star Reviews</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{fiveStarReviews}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((fiveStarReviews / totalReviews) * 100)}% of total
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{responseRate}</div>
            <p className="text-xs text-muted-foreground">Excellent response rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filter Reviews
          </CardTitle>
          <CardDescription>Search and filter customer reviews.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search reviews, customers, or products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-input border-border"
                />
              </div>
            </div>
            <Select value={ratingFilter} onValueChange={setRatingFilter}>
              <SelectTrigger className="w-full sm:w-[180px] bg-input border-border">
                <SelectValue placeholder="Rating" />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                <SelectItem value="all">All Ratings</SelectItem>
                <SelectItem value="5">5 Stars</SelectItem>
                <SelectItem value="4">4 Stars</SelectItem>
                <SelectItem value="3">3 Stars</SelectItem>
                <SelectItem value="2">2 Stars</SelectItem>
                <SelectItem value="1">1 Star</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-[180px] bg-input border-border">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="highest">Highest Rating</SelectItem>
                <SelectItem value="lowest">Lowest Rating</SelectItem>
                <SelectItem value="helpful">Most Helpful</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.map((review) => (
          <Card key={review.id} className="bg-card border-border">
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={review.customerAvatar || "/placeholder.svg"} alt={review.customerName} />
                  <AvatarFallback>{review.customerName.charAt(0)}</AvatarFallback>
                </Avatar>

                <div className="flex-1 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-foreground">{review.customerName}</h4>
                        {review.verified && (
                          <Badge variant="outline" className="border-success text-success text-xs">
                            Verified Purchase
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex">{renderStars(review.rating)}</div>
                        <span className="text-sm text-muted-foreground">•</span>
                        <span className="text-sm text-muted-foreground">{review.date}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <img
                      src={review.productImage || "/placeholder.svg"}
                      alt={review.productName}
                      className="w-10 h-10 rounded-md object-cover"
                    />
                    <span className="text-sm font-medium text-foreground">{review.productName}</span>
                  </div>

                  <p className="text-foreground leading-relaxed">{review.comment}</p>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        Helpful ({review.helpful})
                      </Button>
                      <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                        Reply
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredReviews.length === 0 && (
        <Card className="bg-card border-border">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="text-center space-y-2">
              <h3 className="text-lg font-semibold text-foreground">No reviews found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filters.</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
