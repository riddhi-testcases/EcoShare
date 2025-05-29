import { NextResponse } from "next/server"
import { createUser } from "@/lib/db"
import { hashPassword, signToken } from "@/lib/auth"

export async function POST(request) {
  try {
    const { name, email, password, phone, location } = await request.json()

    // Validate required fields
    if (!name || !email || !password || !phone || !location) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ message: "Invalid email format" }, { status: 400 })
    }

    // Validate password strength
    if (password.length < 6) {
      return NextResponse.json({ message: "Password must be at least 6 characters long" }, { status: 400 })
    }

    // Hash password
    const password_hash = hashPassword(password)

    // Create user
    const user = await createUser({
      name,
      email: email.toLowerCase(),
      password_hash,
      phone,
      location,
    })

    // Generate JWT token
    const token = signToken({ userId: user.id, email: user.email })

    // Create response
    const response = NextResponse.json({
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      location: user.location,
    })

    // Set HTTP-only cookie
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    })

    return response
  } catch (error) {
    console.error("Registration error:", error)

    if (error.message.includes("duplicate key") || error.message.includes("unique constraint")) {
      return NextResponse.json({ message: "Email already exists" }, { status: 409 })
    }

    return NextResponse.json({ message: "Registration failed" }, { status: 500 })
  }
}
