import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL)

export { sql }

export async function getUser(email) {
  try {
    const users = await sql`SELECT * FROM users WHERE email = ${email}`
    return users[0] || null
  } catch (error) {
    console.error("Database error:", error)
    throw new Error("Failed to fetch user")
  }
}

export async function createUser(userData) {
  try {
    const { name, email, password_hash, phone, location } = userData
    const users = await sql`
      INSERT INTO users (name, email, password_hash, phone, location)
      VALUES (${name}, ${email}, ${password_hash}, ${phone}, ${location})
      RETURNING id, name, email, phone, location, created_at
    `
    return users[0]
  } catch (error) {
    console.error("Database error:", error)
    throw new Error("Failed to create user")
  }
}

export async function getItems(filters = {}) {
  try {
    let query = `
      SELECT i.*, u.name as owner_name, u.location as owner_location, c.name as category_name
      FROM items i
      JOIN users u ON i.owner_id = u.id
      JOIN categories c ON i.category_id = c.id
      WHERE i.status = 'available'
    `

    const params = []

    if (filters.category) {
      query += ` AND c.name = $${params.length + 1}`
      params.push(filters.category)
    }

    if (filters.location) {
      query += ` AND u.location ILIKE $${params.length + 1}`
      params.push(`%${filters.location}%`)
    }

    if (filters.search) {
      query += ` AND (i.title ILIKE $${params.length + 1} OR i.description ILIKE $${params.length + 1})`
      params.push(`%${filters.search}%`)
    }

    query += ` ORDER BY i.created_at DESC`

    if (filters.limit) {
      query += ` LIMIT $${params.length + 1}`
      params.push(filters.limit)
    }

    const items = await sql(query, params)
    return items
  } catch (error) {
    console.error("Database error:", error)
    throw new Error("Failed to fetch items")
  }
}

export async function getItemById(id) {
  try {
    const items = await sql`
      SELECT i.*, u.name as owner_name, u.email as owner_email, u.phone as owner_phone, 
             u.location as owner_location, c.name as category_name
      FROM items i
      JOIN users u ON i.owner_id = u.id
      JOIN categories c ON i.category_id = c.id
      WHERE i.id = ${id}
    `
    return items[0] || null
  } catch (error) {
    console.error("Database error:", error)
    throw new Error("Failed to fetch item")
  }
}

export async function createItem(itemData) {
  try {
    const { title, description, category_id, owner_id, condition, availability_type, price } = itemData
    const items = await sql`
      INSERT INTO items (title, description, category_id, owner_id, condition, availability_type, price)
      VALUES (${title}, ${description}, ${category_id}, ${owner_id}, ${condition}, ${availability_type}, ${price})
      RETURNING *
    `
    return items[0]
  } catch (error) {
    console.error("Database error:", error)
    throw new Error("Failed to create item")
  }
}

export async function getCategories() {
  try {
    const categories = await sql`SELECT * FROM categories ORDER BY name`
    return categories
  } catch (error) {
    console.error("Database error:", error)
    throw new Error("Failed to fetch categories")
  }
}
