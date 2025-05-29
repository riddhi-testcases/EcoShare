"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Upload } from "lucide-react"

export default function ListItemPage() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category_id: "",
    condition: "",
    availability_type: "",
    price: "",
  })
  const [errors, setErrors] = useState({})
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/categories")
      if (response.ok) {
        const data = await response.json()
        setCategories(data)
      }
    } catch (error) {
      console.error("Failed to fetch categories:", error)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.title.trim()) {
      newErrors.title = "Title is required"
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required"
    }

    if (!formData.category_id) {
      newErrors.category_id = "Category is required"
    }

    if (!formData.condition) {
      newErrors.condition = "Condition is required"
    }

    if (!formData.availability_type) {
      newErrors.availability_type = "Availability type is required"
    }

    if ((formData.availability_type === "rent" || formData.availability_type === "sell") && !formData.price) {
      newErrors.price = "Price is required for rent/sell items"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setLoading(true)

    try {
      const response = await fetch("/api/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        const item = await response.json()
        router.push(`/item/${item.id}`)
      } else {
        const error = await response.json()
        setErrors({ submit: error.message })
      }
    } catch (error) {
      setErrors({ submit: "Failed to create item. Please try again." })
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Authentication Required</CardTitle>
            <CardDescription>Please sign in to list an item</CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">List an Item</h1>
        <p className="text-gray-600">Share your unused items with the community</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Plus className="h-5 w-5" />
            <span>Item Details</span>
          </CardTitle>
          <CardDescription>Provide details about the item you want to share</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter item title"
                className={errors.title ? "border-red-500" : ""}
              />
              {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your item in detail"
                rows={4}
                className={errors.description ? "border-red-500" : ""}
              />
              {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category_id">Category *</Label>
                <Select
                  id="category_id"
                  name="category_id"
                  value={formData.category_id}
                  onChange={handleChange}
                  className={errors.category_id ? "border-red-500" : ""}
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </Select>
                {errors.category_id && <p className="text-red-500 text-sm">{errors.category_id}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="condition">Condition *</Label>
                <Select
                  id="condition"
                  name="condition"
                  value={formData.condition}
                  onChange={handleChange}
                  className={errors.condition ? "border-red-500" : ""}
                >
                  <option value="">Select condition</option>
                  <option value="new">New</option>
                  <option value="like_new">Like New</option>
                  <option value="good">Good</option>
                  <option value="fair">Fair</option>
                  <option value="poor">Poor</option>
                </Select>
                {errors.condition && <p className="text-red-500 text-sm">{errors.condition}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="availability_type">Availability Type *</Label>
                <Select
                  id="availability_type"
                  name="availability_type"
                  value={formData.availability_type}
                  onChange={handleChange}
                  className={errors.availability_type ? "border-red-500" : ""}
                >
                  <option value="">Select type</option>
                  <option value="free">Free</option>
                  <option value="rent">Rent</option>
                  <option value="sell">Sell</option>
                  <option value="exchange">Exchange</option>
                </Select>
                {errors.availability_type && <p className="text-red-500 text-sm">{errors.availability_type}</p>}
              </div>

              {(formData.availability_type === "rent" || formData.availability_type === "sell") && (
                <div className="space-y-2">
                  <Label htmlFor="price">
                    Price (₹) *
                    {formData.availability_type === "rent" && <span className="text-sm text-gray-500"> per day</span>}
                  </Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="Enter price"
                    className={errors.price ? "border-red-500" : ""}
                  />
                  {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label>Photos</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Photo upload coming soon</p>
                <p className="text-sm text-gray-400">For now, you can add photos after listing</p>
              </div>
            </div>

            {errors.submit && <div className="text-red-500 text-sm">{errors.submit}</div>}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Creating..." : "List Item"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
