// app/api/products/route.ts
import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const cat = searchParams.get("cat");

    const r =
      cat && cat !== "all"
        ? await sql/* sql */`
            select id, slug, name, short, cover, category,
                   price_cents, period_text, stock, sold, active
            from products
            where active = true and category = ${cat}
            order by id desc;
          `
        : await sql/* sql */`
            select id, slug, name, short, cover, category,
                   price_cents, period_text, stock, sold, active
            from products
            where active = true
            order by id desc;
          `;

    return NextResponse.json(r.rows); // ✅ JSON أكيد
  } catch (e: any) {
    console.error("API /products error:", e);
    return NextResponse.json(
      { error: "internal_error", message: String(e?.message || e) },
      { status: 500 }
    );
  }
}
