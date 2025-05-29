import { NextResponse } from "next/server"
import { getItems, createItem } from "@/lib/db"
import { getTokenFromRequest, verifyToken } from "@/lib/auth"

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const filters = {
      category: searchParams.get("category"),
      location: searchParams.get("location"),
      search: searchParams.get("search"),
      limit: searchParams.get("limit") ? Number.parseInt(searchParams.get("limit")) : undefined,
    }

    const items = await getItems(filters)
    return NextResponse.json(items)
  } catch (error) {
    console.error("Failed to fetch items:", error)
    return NextResponse.json({ message: "Failed to fetch items" }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const token = getTokenFromRequest(request)
    if (!token) {
      return NextResponse.json({ message: "Authentication required" }, { status: 401 })
    }

    const payload = verifyToken(token)
    if (!payload) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 })
    }

    const { title, description, category_id, condition, availability_type, price } = await request.json()

    // Validate required fields
    if (!title || !description || !category_id || !condition || !availability_type) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
    }

    // Validate price for paid items
    if (availability_type === "rent" || availability_type === "sell") {
      if (!price || price <= 0) {
        return NextResponse.json({ message: "Price is required for rent/sell items" }, { status: 400 })
      }
    }

    const itemData = {
      title,
      description,
      category_id: Number.parseInt(category_id),
      owner_id: payload.userId,
      condition,
      availability_type,
      price: availability_type === "free" ? null : Number.parseFloat(price),
    }

    const item = await createItem(itemData)
    return NextResponse.json(item, { status: 201 })
  } catch (error) {
    console.error("Failed to create item:", error)
    return NextResponse.json({ message: "Failed to create item" }, { status: 500 })
  }
}
