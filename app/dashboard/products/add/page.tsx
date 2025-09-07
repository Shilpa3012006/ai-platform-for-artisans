"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Upload, Wand2, DollarSign, QrCode, Sparkles } from "lucide-react"

export default function AddProductPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isGeneratingStory, setIsGeneratingStory] = useState(false)
  const [isGeneratingPrice, setIsGeneratingPrice] = useState(false)
  const [showQRCode, setShowQRCode] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    image: null as File | null,
    basePrice: "",
    category: "",
    description: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }))
    }
  }

  const generateStory = async () => {
    if (!formData.image || !formData.name) {
      alert("Please upload an image and enter a product name first")
      return
    }

    setIsGeneratingStory(true)
    // Simulate AI story generation
    setTimeout(() => {
      const generatedStory = `This exquisite ${formData.name.toLowerCase()} represents the finest in traditional craftsmanship. Each piece is meticulously handcrafted using time-honored techniques passed down through generations of skilled artisans. The attention to detail and quality materials ensure that this unique creation will be treasured for years to come. Perfect for those who appreciate authentic, handmade artistry and want to support traditional craft communities.`
      setFormData((prev) => ({ ...prev, description: generatedStory }))
      setIsGeneratingStory(false)
    }, 2000)
  }

  const generateSmartPrice = async () => {
    if (!formData.basePrice) {
      alert("Please enter a base price first")
      return
    }

    setIsGeneratingPrice(true)
    // Simulate smart pricing
    setTimeout(() => {
      const basePrice = Number.parseFloat(formData.basePrice)
      const suggestedPrice = Math.round(basePrice * 2.5) // 150% markup
      alert(
        `Smart Price Suggestion: ₹${suggestedPrice}\n\nBased on your base cost of ₹${basePrice}, we recommend pricing at ₹${suggestedPrice} for optimal profit margins while remaining competitive in the artisan marketplace.`,
      )
      setIsGeneratingPrice(false)
    }, 1500)
  }

  const generateQRCode = () => {
    setShowQRCode(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate product creation
    setTimeout(() => {
      setIsLoading(false)
      router.push("/dashboard/products")
    }, 1000)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button asChild variant="outline" size="sm" className="border-border hover:bg-accent bg-transparent">
          <Link href="/dashboard/products">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Products
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Add New Product</h1>
          <p className="text-muted-foreground">Create a new listing for your handcrafted product.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Enter the essential details about your product.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name</Label>
                <Input
                  id="name"
                  placeholder="Enter product name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  required
                  className="bg-input border-border"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                  <SelectTrigger className="bg-input border-border">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    <SelectItem value="textiles">Textiles</SelectItem>
                    <SelectItem value="pottery">Pottery</SelectItem>
                    <SelectItem value="woodwork">Woodwork</SelectItem>
                    <SelectItem value="jewelry">Jewelry</SelectItem>
                    <SelectItem value="leather-goods">Leather Goods</SelectItem>
                    <SelectItem value="metalwork">Metalwork</SelectItem>
                    <SelectItem value="glasswork">Glasswork</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="basePrice">Base Price (₹)</Label>
                <div className="flex gap-2">
                  <Input
                    id="basePrice"
                    type="number"
                    placeholder="Enter base cost"
                    value={formData.basePrice}
                    onChange={(e) => handleInputChange("basePrice", e.target.value)}
                    required
                    className="bg-input border-border"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={generateSmartPrice}
                    disabled={isGeneratingPrice}
                    className="border-border hover:bg-accent bg-transparent"
                  >
                    {isGeneratingPrice ? (
                      <Sparkles className="h-4 w-4 animate-spin" />
                    ) : (
                      <DollarSign className="h-4 w-4" />
                    )}
                    Smart Price
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Product Image */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Product Image</CardTitle>
              <CardDescription>Upload a high-quality image of your product.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  {formData.image ? (
                    <div className="space-y-2">
                      <div className="w-32 h-32 mx-auto bg-muted rounded-lg flex items-center justify-center">
                        <img
                          src={URL.createObjectURL(formData.image) || "/placeholder.svg"}
                          alt="Preview"
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                      <p className="text-sm text-foreground">{formData.image.name}</p>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setFormData((prev) => ({ ...prev, image: null }))}
                        className="border-border hover:bg-accent"
                      >
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                      <div>
                        <Label htmlFor="image" className="cursor-pointer">
                          <span className="text-primary hover:text-primary/80">Click to upload</span>
                          <span className="text-muted-foreground"> or drag and drop</span>
                        </Label>
                        <Input
                          id="image"
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Product Description */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Product Description
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={generateStory}
                  disabled={isGeneratingStory}
                  className="border-border hover:bg-accent bg-transparent"
                >
                  {isGeneratingStory ? (
                    <Sparkles className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <Wand2 className="h-4 w-4 mr-2" />
                  )}
                  Generate Story
                </Button>
              </CardTitle>
              <CardDescription>
                Describe your product or use AI to generate a compelling story based on the image.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Enter product description..."
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                rows={6}
                className="bg-input border-border"
              />
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* AI Features */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                AI Features
              </CardTitle>
              <CardDescription>Enhance your listing with AI-powered tools.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                type="button"
                variant="outline"
                className="w-full justify-start border-border hover:bg-accent bg-transparent"
                onClick={generateStory}
                disabled={isGeneratingStory}
              >
                <Wand2 className="h-4 w-4 mr-2" />
                Generate Product Story
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full justify-start border-border hover:bg-accent bg-transparent"
                onClick={generateSmartPrice}
                disabled={isGeneratingPrice}
              >
                <DollarSign className="h-4 w-4 mr-2" />
                Smart Price Coach
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full justify-start border-border hover:bg-accent bg-transparent"
                onClick={generateQRCode}
              >
                <QrCode className="h-4 w-4 mr-2" />
                Generate QR Code
              </Button>
            </CardContent>
          </Card>

          {/* QR Code Display */}
          {showQRCode && (
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Product QR Code</CardTitle>
                <CardDescription>Share this QR code to link directly to your product.</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="w-32 h-32 mx-auto bg-white rounded-lg flex items-center justify-center mb-4">
                  <img src="/qr-code-for-artisan-product.jpg" alt="QR Code" className="w-full h-full" />
                </div>
                <Badge variant="outline" className="border-border">
                  Product + Artisan Profile
                </Badge>
              </CardContent>
            </Card>
          )}

          {/* Actions */}
          <Card className="bg-card border-border">
            <CardContent className="pt-6 space-y-3">
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isLoading}>
                {isLoading ? "Saving Product..." : "Save Product"}
              </Button>
              <Button asChild variant="outline" className="w-full border-border hover:bg-accent bg-transparent">
                <Link href="/dashboard/products">Cancel</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  )
}
