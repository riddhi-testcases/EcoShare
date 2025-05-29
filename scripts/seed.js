import { neon } from "@neondatabase/serverless"
import { config } from "dotenv"

config()

const sql = neon(process.env.DATABASE_URL)

async function seed() {
  try {
    console.log("Starting database seed...")

    // Create tables
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        phone VARCHAR(20),
        location VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `

    await sql`
      CREATE TABLE IF NOT EXISTS categories (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL UNIQUE,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `

    await sql`
      CREATE TABLE IF NOT EXISTS items (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        category_id INTEGER REFERENCES categories(id),
        owner_id INTEGER REFERENCES users(id),
        condition VARCHAR(50) NOT NULL CHECK (condition IN ('new', 'like_new', 'good', 'fair', 'poor')),
        availability_type VARCHAR(50) NOT NULL CHECK (availability_type IN ('free', 'rent', 'sell', 'exchange')),
        price DECIMAL(10,2),
        status VARCHAR(50) DEFAULT 'available' CHECK (status IN ('available', 'rented', 'sold', 'unavailable')),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `

    // Insert categories
    const categories = [
      { name: "Electronics", description: "Phones, laptops, gadgets, and electronic devices" },
      { name: "Furniture", description: "Tables, chairs, beds, and home furniture" },
      { name: "Books", description: "Textbooks, novels, magazines, and educational materials" },
      { name: "Clothing", description: "Clothes, shoes, and fashion accessories" },
      { name: "Sports & Fitness", description: "Sports equipment, gym gear, and fitness accessories" },
      { name: "Tools & Hardware", description: "Hand tools, power tools, and hardware equipment" },
      { name: "Kitchen & Appliances", description: "Kitchen utensils, appliances, and cookware" },
      { name: "Toys & Games", description: "Children toys, board games, and entertainment" },
      { name: "Vehicles", description: "Bicycles, scooters, and vehicle accessories" },
      { name: "Home & Garden", description: "Home decor, plants, and gardening supplies" },
    ]

    for (const category of categories) {
      await sql`
        INSERT INTO categories (name, description)
        VALUES (${category.name}, ${category.description})
        ON CONFLICT (name) DO NOTHING
      `
    }

    console.log("Database seeded successfully!")
    console.log("Categories created:", categories.length)
  } catch (error) {
    console.error("Error seeding database:", error)
    process.exit(1)
  }
}

seed()
