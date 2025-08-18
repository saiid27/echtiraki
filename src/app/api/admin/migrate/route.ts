import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET() {
  await sql/* sql */`
    CREATE TABLE IF NOT EXISTS products (
      id           SERIAL PRIMARY KEY,
      slug         TEXT NOT NULL UNIQUE,
      name         TEXT NOT NULL,
      short        TEXT,
      description  TEXT,
      cover        TEXT,
      category     TEXT NOT NULL,
      price_cents  INTEGER NOT NULL,
      period_text  TEXT NOT NULL,
      stock        INTEGER NOT NULL DEFAULT 0,
      sold         INTEGER NOT NULL DEFAULT 0,
      active       BOOLEAN NOT NULL DEFAULT TRUE,
      created_at   TIMESTAMP DEFAULT NOW()
    );
  `;
  await sql/* sql */`
    CREATE TABLE IF NOT EXISTS orders (
      id            SERIAL PRIMARY KEY,
      phone         TEXT NOT NULL,
      product_slug  TEXT NOT NULL REFERENCES products(slug),
      status        TEXT NOT NULL DEFAULT 'pending',
      created_at    TIMESTAMP DEFAULT NOW()
    );
  `;
  return NextResponse.json({ ok: true, step: "migrate done" });
}
