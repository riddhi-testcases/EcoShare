"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, User, Phone, Star, MessageCircle, Heart, Share2 } from "lucide-react"

export default function ItemDetailPage() {
  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const { id } = useParams()
  const { user } = useAuth()

  useEffect(() => {
    if (id) {
      fetchItem()
    }
  }, [id])

  const fetchItem = async () => {
    try {
      const response = await fetch(`/api/items/${id}`)
      if (response.ok) {
        const data = await response.json()
        setItem(data)
      } else {
        setError("Item not found")
      }
    } catch (error) {
      setError("Failed to load item")
    } finally {
      setLoading(false)
    }
  }

  const formatCondition = (condition) => {
    return condition
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  const formatAvailabilityType = (type) => {
    const types = {
      free: "Free",
      rent: "For Rent",
      sell: "For Sale",
      exchange: "For Exchange",
    }
    return types[type] || type
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="aspect-square bg-gray-200 rounded-lg"></div>
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-20 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !item) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Item Not Found</CardTitle>
            <CardDescription>{error || "The item you are looking for does not exist."}</CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Section */}
        <div className="space-y-4">
          <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
            <div className="text-gray-400 text-center">
              <div className="text-4xl mb-2">📷</div>
              <p>Photo coming soon</p>
            </div>
          </div>

          <div className="flex space-x-2">
            <Button variant="outline" size="sm" className="flex items-center space-x-2">
              <Heart className="h-4 w-4" />
              <span>Save</span>
            </Button>
            <Button variant="outline" size="sm" className="flex items-center space-x-2">
              <Share2 className="h-4 w-4" />
              <span>Share</span>
            </Button>
          </div>
        </div>

        {/* Details Section */}
        <div className="space-y-6">
          <div>
            <div className="flex items-start justify-between mb-2">
              <h1 className="text-3xl font-bold text-gray-900">{item.title}</h1>
              <Badge
                variant={item.availability_type === "free" ? "secondary" : "default"}
                className="text-lg px-3 py-1"
              >
                {item.availability_type === "free"
                  ? "Free"
                  : `₹${item.price}${item.availability_type === "rent" ? "/day" : ""}`}
              </Badge>
            </div>

            <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
              <div className="flex items-center space-x-1">
                <MapPin className="h-4 w-4" />
                <span>{item.owner_location}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>Listed {new Date(item.created_at).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="flex space-x-2 mb-4">
              <Badge variant="outline">{item.category_name}</Badge>
              <Badge variant="outline">{formatCondition(item.condition)}</Badge>
              <Badge variant="outline">{formatAvailabilityType(item.availability_type)}</Badge>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Description</h2>
            <p className="text-gray-700 whitespace-pre-wrap">{item.description}</p>
          </div>

          {/* Owner Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Owner Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{item.owner_name}</span>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600">4.8 (24 reviews)</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2 text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span>{item.owner_location}</span>
                </div>

                {user && user.id !== item.owner_id ? (
                  <div className="flex space-x-2 pt-2">
                    <Button className="flex-1 flex items-center space-x-2">
                      <MessageCircle className="h-4 w-4" />
                      <span>Message</span>
                    </Button>
                    <Button variant="outline" className="flex items-center space-x-2">
                      <Phone className="h-4 w-4" />
                      <span>Call</span>
                    </Button>
                  </div>
                ) : user && user.id === item.owner_id ? (
                  <div className="pt-2">
                    <Badge variant="secondary">This is your item</Badge>
                  </div>
                ) : (
                  <div className="pt-2">
                    <p className="text-sm text-gray-600">Sign in to contact the owner</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Safety Tips */}
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-900">Safety Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Meet in a public place for exchanges</li>
                <li>• Inspect items before completing the transaction</li>
                <li>• Trust your instincts and report suspicious activity</li>
                <li>• Keep communication within the platform when possible</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
