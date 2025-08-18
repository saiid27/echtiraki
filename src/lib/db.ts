import { sql } from "@vercel/postgres";

export async function createUsersTable() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL
      );
    `;
    console.log("✅ Table created successfully");
  } catch (error) {
    console.error("❌ Error creating table:", error);
  }
}

export async function insertUser(name: string, email: string) {
  try {
    const result = await sql`
      INSERT INTO users (name, email)
      VALUES (${name}, ${email})
      RETURNING *;
    `;
    console.log("✅ User inserted:", result.rows[0]);
  } catch (error) {
    console.error("❌ Error inserting user:", error);
  }
}
