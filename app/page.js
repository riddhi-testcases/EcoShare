"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import AuthModal from "@/components/AuthModal"
import { Search, Plus, Recycle, Users, Leaf, ArrowRight, MapPin, Clock } from "lucide-react"

export default function HomePage() {
  const [authModal, setAuthModal] = useState({ isOpen: false, mode: "login" })
  const [featuredItems, setFeaturedItems] = useState([])
  const [stats, setStats] = useState({ users: 0, items: 0, trades: 0 })
  const { user } = useAuth()

  useEffect(() => {
    // Check for auth parameter in URL
    const urlParams = new URLSearchParams(window.location.search)
    const authParam = urlParams.get("auth")
    if (authParam === "login" || authParam === "register") {
      setAuthModal({ isOpen: true, mode: authParam })
    }

    // Fetch featured items and stats
    fetchFeaturedItems()
    fetchStats()
  }, [])

  const fetchFeaturedItems = async () => {
    try {
      const response = await fetch("/api/items?limit=6")
      if (response.ok) {
        const items = await response.json()
        setFeaturedItems(items)
      }
    } catch (error) {
      console.error("Failed to fetch featured items:", error)
    }
  }

  const fetchStats = async () => {
    // Mock stats for now
    setStats({ users: 1250, items: 3400, trades: 890 })
  }

  const features = [
    {
      icon: Search,
      title: "Discover Items",
      description: "Browse thousands of items available for sharing, trading, or borrowing in your area.",
    },
    {
      icon: Plus,
      title: "List Your Items",
      description: "Share items you no longer need and help others while earning or trading.",
    },
    {
      icon: Users,
      title: "Join Communities",
      description: "Connect with like-minded people in your neighborhood and build sustainable communities.",
    },
    {
      icon: Recycle,
      title: "Reduce Waste",
      description: "Contribute to a circular economy by giving items a second life instead of throwing them away.",
    },
  ]

  return (
    <>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-green-50 to-blue-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Share. Trade.
                <span className="text-primary"> Sustain.</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Join India's largest sustainable sharing platform. Give your unused items a new life while building
                stronger communities and protecting our environment.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {user ? (
                  <>
                    <Link href="/browse">
                      <Button size="lg" className="flex items-center space-x-2">
                        <Search className="h-5 w-5" />
                        <span>Browse Items</span>
                      </Button>
                    </Link>
                    <Link href="/list-item">
                      <Button size="lg" variant="outline" className="flex items-center space-x-2">
                        <Plus className="h-5 w-5" />
                        <span>List an Item</span>
                      </Button>
                    </Link>
                  </>
                ) : (
                  <>
                    <Button
                      size="lg"
                      onClick={() => setAuthModal({ isOpen: true, mode: "register" })}
                      className="flex items-center space-x-2"
                    >
                      <span>Get Started</span>
                      <ArrowRight className="h-5 w-5" />
                    </Button>
                    <Button size="lg" variant="outline" onClick={() => setAuthModal({ isOpen: true, mode: "login" })}>
                      Sign In
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-primary mb-2">{stats.users.toLocaleString()}+</div>
                <div className="text-gray-600">Active Users</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">{stats.items.toLocaleString()}+</div>
                <div className="text-gray-600">Items Shared</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">{stats.trades.toLocaleString()}+</div>
                <div className="text-gray-600">Successful Trades</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How EcoShare Works</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Simple steps to start sharing sustainably and building a better future for India.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Items Section */}
        {featuredItems.length > 0 && (
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center mb-12">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Items</h2>
                  <p className="text-gray-600">Discover amazing items shared by our community</p>
                </div>
                <Link href="/browse">
                  <Button variant="outline" className="flex items-center space-x-2">
                    <span>View All</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredItems.map((item) => (
                  <Card key={item.id} className="hover:shadow-lg transition-shadow">
                    <div className="aspect-video bg-gray-200 rounded-t-lg"></div>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg line-clamp-1">{item.title}</CardTitle>
                        <Badge variant={item.availability_type === "free" ? "secondary" : "default"}>
                          {item.availability_type === "free" ? "Free" : `₹${item.price}`}
                        </Badge>
                      </div>
                      <CardDescription className="line-clamp-2">{item.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{item.owner_location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{new Date(item.created_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <Link href={`/item/${item.id}`} className="block mt-4">
                        <Button className="w-full">View Details</Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-20 bg-primary text-white">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <Leaf className="h-16 w-16 mx-auto mb-6 opacity-80" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Make a Difference?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of Indians who are already building a more sustainable future through sharing.
            </p>
            {!user && (
              <Button
                size="lg"
                variant="secondary"
                onClick={() => setAuthModal({ isOpen: true, mode: "register" })}
                className="flex items-center space-x-2 mx-auto"
              >
                <span>Join EcoShare Today</span>
                <ArrowRight className="h-5 w-5" />
              </Button>
            )}
          </div>
        </section>
      </div>

      <AuthModal
        isOpen={authModal.isOpen}
        onClose={() => setAuthModal({ isOpen: false, mode: "login" })}
        defaultMode={authModal.mode}
      />
    </>
  )
}
