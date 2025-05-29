import { NextResponse } from "next/server"
import { getItemById } from "@/lib/db"

export async function GET(request, { params }) {
  try {
    const { id } = params
    const item = await getItemById(Number.parseInt(id))

    if (!item) {
      return NextResponse.json({ message: "Item not found" }, { status: 404 })
    }

    return NextResponse.json(item)
  } catch (error) {
    console.error("Failed to fetch item:", error)
    return NextResponse.json({ message: "Failed to fetch item" }, { status: 500 })
  }
}
