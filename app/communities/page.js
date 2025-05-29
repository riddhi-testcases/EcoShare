"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, MapPin, Calendar, MessageCircle, Plus } from "lucide-react"

export default function CommunitiesPage() {
  const communities = [
    {
      id: 1,
      name: "Green Mumbai",
      description: "Sustainable living community in Mumbai focused on reducing waste and sharing resources.",
      members: 1250,
      location: "Mumbai, Maharashtra",
      category: "Sustainability",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 2,
      name: "Delhi Sharers",
      description: "Active community of Delhi residents sharing everything from books to tools.",
      members: 890,
      location: "Delhi, NCR",
      category: "General Sharing",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 3,
      name: "Bangalore Tech Exchange",
      description: "Tech professionals sharing gadgets, books, and knowledge in Bangalore.",
      members: 650,
      location: "Bangalore, Karnataka",
      category: "Technology",
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Communities</h1>
        <p className="text-gray-600">Join local communities and connect with like-minded people</p>
      </div>

      {/* Create Community CTA */}
      <Card className="mb-8 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Plus className="h-5 w-5" />
            <span>Start Your Own Community</span>
          </CardTitle>
          <CardDescription>Create a community for your neighborhood, interests, or cause</CardDescription>
        </CardHeader>
        <CardContent>
          <Button>Create Community</Button>
        </CardContent>
      </Card>

      {/* Communities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {communities.map((community) => (
          <Card key={community.id} className="hover:shadow-lg transition-shadow">
            <div className="aspect-video bg-gray-200 rounded-t-lg"></div>
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{community.name}</CardTitle>
                <Badge variant="outline">{community.category}</Badge>
              </div>
              <CardDescription className="line-clamp-2">{community.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>{community.members.toLocaleString()} members</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>{community.location}</span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button className="flex-1">Join Community</Button>
                  <Button variant="outline" size="sm">
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Community Features */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Join Communities?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <Users className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Connect Locally</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Meet neighbors and build relationships with people in your area who share your values.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <MessageCircle className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Share Knowledge</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Exchange tips, advice, and experiences about sustainable living and sharing.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Calendar className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Organize Events</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Participate in community events, swap meets, and sustainability initiatives.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
