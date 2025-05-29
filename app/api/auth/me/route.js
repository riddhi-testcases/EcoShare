import { NextResponse } from "next/server"
import { getTokenFromRequest, verifyToken } from "@/lib/auth"
import { sql } from "@/lib/db"

export async function GET(request) {
  try {
    const token = getTokenFromRequest(request)
    if (!token) {
      return NextResponse.json({ message: "No token provided" }, { status: 401 })
    }

    const payload = verifyToken(token)
    if (!payload) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 })
    }

    // Get user from database
    const users = await sql`
      SELECT id, name, email, phone, location, created_at
      FROM users 
      WHERE id = ${payload.userId}
    `

    if (users.length === 0) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    return NextResponse.json(users[0])
  } catch (error) {
    console.error("Auth check error:", error)
    return NextResponse.json({ message: "Authentication failed" }, { status: 500 })
  }
}
