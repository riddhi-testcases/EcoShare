"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Leaf, Recycle, Users, TrendingUp, Award, Globe, Heart, Target } from "lucide-react"

export default function ImpactPage() {
  const stats = [
    {
      icon: Recycle,
      title: "Items Saved from Waste",
      value: "12,450",
      description: "Items given a second life through our platform",
      color: "text-green-600",
    },
    {
      icon: Users,
      title: "Active Community Members",
      value: "8,750",
      description: "People actively participating in sustainable sharing",
      color: "text-blue-600",
    },
    {
      icon: Leaf,
      title: "CO₂ Emissions Reduced",
      value: "2.3 tons",
      description: "Carbon footprint reduced through sharing vs buying new",
      color: "text-green-600",
    },
    {
      icon: TrendingUp,
      title: "Money Saved",
      value: "₹45 Lakhs",
      description: "Total savings by community members",
      color: "text-purple-600",
    },
  ]

  const achievements = [
    {
      title: "Waste Warrior",
      description: "Prevented 100+ items from going to landfill",
      badge: "Gold",
      users: 234,
    },
    {
      title: "Community Builder",
      description: "Helped 50+ people find what they needed",
      badge: "Silver",
      users: 567,
    },
    {
      title: "Eco Champion",
      description: "Shared 25+ items with the community",
      badge: "Bronze",
      users: 1203,
    },
  ]

  const stories = [
    {
      name: "Priya Sharma",
      location: "Mumbai",
      story:
        "Through EcoShare, I found a perfect study table for my daughter instead of buying new. Saved ₹8,000 and made a new friend in my neighborhood!",
      impact: "Saved 1 item from waste",
    },
    {
      name: "Rajesh Kumar",
      location: "Delhi",
      story:
        "I shared my old bicycle that was just sitting in storage. Now it helps a college student commute daily. Feels great to give it purpose again!",
      impact: "Reduced daily commute emissions",
    },
    {
      name: "Anita Patel",
      location: "Bangalore",
      story:
        "Our community group organized a tool library. Now 20 families share tools instead of everyone buying their own. Smart and sustainable!",
      impact: "Created community resource pool",
    },
  ]

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Our Impact</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Together, we're building a more sustainable India. See how our community is making a real difference.
        </p>
      </div>

      {/* Impact Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, index) => (
          <Card key={index} className="text-center">
            <CardHeader>
              <stat.icon className={`h-8 w-8 mx-auto mb-2 ${stat.color}`} />
              <CardTitle className="text-2xl font-bold">{stat.value}</CardTitle>
              <CardDescription className="font-medium">{stat.title}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Environmental Impact */}
      <Card className="mb-12 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Globe className="h-6 w-6 text-green-600" />
            <span>Environmental Impact</span>
          </CardTitle>
          <CardDescription>How sharing helps our planet</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">67%</div>
              <p className="text-sm text-gray-600">Reduction in manufacturing demand</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">89%</div>
              <p className="text-sm text-gray-600">Less packaging waste generated</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">45%</div>
              <p className="text-sm text-gray-600">Lower transportation emissions</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Community Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {achievements.map((achievement, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Award className="h-6 w-6 text-yellow-500" />
                  <Badge variant={achievement.badge === "Gold" ? "default" : "secondary"}>{achievement.badge}</Badge>
                </div>
                <CardTitle className="text-lg">{achievement.title}</CardTitle>
                <CardDescription>{achievement.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">{achievement.users} members earned this</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Success Stories */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Success Stories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stories.map((story, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Heart className="h-5 w-5 text-red-500" />
                  <div>
                    <CardTitle className="text-lg">{story.name}</CardTitle>
                    <CardDescription>{story.location}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-3 italic">"{story.story}"</p>
                <Badge variant="outline" className="text-xs">
                  {story.impact}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Goals */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-6 w-6 text-purple-600" />
            <span>Our 2024 Goals</span>
          </CardTitle>
          <CardDescription>Ambitious targets for an even bigger impact</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Community Growth</h3>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• Reach 25,000 active users</li>
                <li>• Expand to 50+ cities across India</li>
                <li>• Launch 100+ local communities</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Environmental Impact</h3>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• Save 50,000 items from waste</li>
                <li>• Reduce 10 tons of CO₂ emissions</li>
                <li>• Help save ₹2 crores for families</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
