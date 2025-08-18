// app/api/orders/route.ts
import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function POST(req: NextRequest) {
  const { phone, productSlug } = await req.json();
  if (!phone || !productSlug) {
    return NextResponse.json({ error: "missing" }, { status: 400 });
  }

  // تحقق من التوفر
  const p = await sql/* sql */`
    select stock from products
    where slug = ${productSlug} and active = true
    limit 1;
  `;
  if (p.rowCount === 0) return NextResponse.json({ error: "product_not_found" }, { status: 404 });
  if (p.rows[0].stock <= 0) return NextResponse.json({ error: "out_of_stock" }, { status: 409 });

  // معاملة بسيطة: انقاص المخزون + إنشاء الطلب
  await sql.begin(async (tx) => {
    await tx/* sql */`update products set stock = stock - 1, sold = sold + 1 where slug = ${productSlug};`;
    await tx/* sql */`insert into orders (phone, product_slug, status) values (${phone}, ${productSlug}, 'pending');`;
  });

  return NextResponse.json({ ok: true });
}
