"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { HelpCircle, MessageSquare, Phone, Mail, Clock, CheckCircle, AlertCircle } from "lucide-react"

// Sample support tickets data
const supportTickets = [
  {
    id: "TICK-001",
    subject: "Payment not received for order ORD-123",
    status: "Open",
    priority: "High",
    date: "2024-01-15",
    lastUpdate: "2024-01-15",
  },
  {
    id: "TICK-002",
    subject: "How to update product images?",
    status: "Resolved",
    priority: "Low",
    date: "2024-01-12",
    lastUpdate: "2024-01-13",
  },
  {
    id: "TICK-003",
    subject: "Account verification issues",
    status: "In Progress",
    priority: "Medium",
    date: "2024-01-10",
    lastUpdate: "2024-01-14",
  },
]

export default function SupportPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "John Doe",
    email: "john@artisan.com",
    category: "",
    subject: "",
    message: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate form submission
    setTimeout(() => {
      setIsLoading(false)
      alert("Support ticket submitted successfully! We'll get back to you within 24 hours.")
      setFormData((prev) => ({ ...prev, category: "", subject: "", message: "" }))
    }, 1000)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open":
        return "bg-destructive text-destructive-foreground"
      case "In Progress":
        return "bg-yellow-600 text-white"
      case "Resolved":
        return "bg-success text-success-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-destructive text-destructive-foreground"
      case "Medium":
        return "bg-yellow-600 text-white"
      case "Low":
        return "bg-success text-success-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Help & Support</h1>
        <p className="text-muted-foreground">Get help and submit support requests.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Support Form */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Submit Support Request
              </CardTitle>
              <CardDescription>Describe your issue and we'll get back to you as soon as possible.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      required
                      className="bg-input border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                      className="bg-input border-border"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                    <SelectTrigger className="bg-input border-border">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border">
                      <SelectItem value="account">Account Issues</SelectItem>
                      <SelectItem value="payments">Payments & Billing</SelectItem>
                      <SelectItem value="orders">Order Management</SelectItem>
                      <SelectItem value="products">Product Listings</SelectItem>
                      <SelectItem value="technical">Technical Support</SelectItem>
                      <SelectItem value="general">General Inquiry</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    placeholder="Brief description of your issue"
                    value={formData.subject}
                    onChange={(e) => handleInputChange("subject", e.target.value)}
                    required
                    className="bg-input border-border"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Please provide detailed information about your issue..."
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    rows={6}
                    required
                    className="bg-input border-border"
                  />
                </div>

                <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isLoading}>
                  {isLoading ? "Submitting..." : "Submit Request"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Previous Tickets */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Your Support Tickets</CardTitle>
              <CardDescription>Track the status of your previous support requests.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {supportTickets.map((ticket) => (
                  <div key={ticket.id} className="p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-medium text-foreground">{ticket.subject}</h4>
                        <p className="text-sm text-muted-foreground">Ticket ID: {ticket.id}</p>
                      </div>
                      <div className="flex gap-2">
                        <Badge className={getStatusColor(ticket.status)}>{ticket.status}</Badge>
                        <Badge className={getPriorityColor(ticket.priority)}>{ticket.priority}</Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>Created: {ticket.date}</span>
                      <span>•</span>
                      <span>Last update: {ticket.lastUpdate}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Help */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5" />
                Quick Help
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start border-border hover:bg-accent bg-transparent">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Getting Started Guide
                </Button>
                <Button variant="outline" className="w-full justify-start border-border hover:bg-accent bg-transparent">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  Common Issues
                </Button>
                <Button variant="outline" className="w-full justify-start border-border hover:bg-accent bg-transparent">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  FAQ
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>Other ways to reach our support team.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Email Support</p>
                  <p className="text-sm text-muted-foreground">support@artisanmarketplace.com</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Phone Support</p>
                  <p className="text-sm text-muted-foreground">+91 1800-123-4567</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Business Hours</p>
                  <p className="text-sm text-muted-foreground">Mon-Fri: 9 AM - 6 PM IST</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Response Time */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Expected Response Time</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">General Inquiries</span>
                <span className="text-sm font-medium">24 hours</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Technical Issues</span>
                <span className="text-sm font-medium">12 hours</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Payment Issues</span>
                <span className="text-sm font-medium">4 hours</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Urgent Issues</span>
                <span className="text-sm font-medium">2 hours</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
