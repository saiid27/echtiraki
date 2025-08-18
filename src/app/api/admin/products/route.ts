import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { cookies } from "next/headers";

function gate() {
  const ck = cookies().get("admin")?.value;
  if (ck !== "1") return false;
  return true;
}

export async function PATCH(req: Request) {
  if (!gate()) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const body = await req.json(); // {slug, priceCents?, stock?, active?, name?, short?, periodText?}
  if (!body.slug) return NextResponse.json({ error: "slug required" }, { status: 400 });

  const fields: string[] = [];
  const values: any[] = [];
  for (const k of ["name","short","description","cover","category","priceCents","periodText","stock","active"]) {
    if (body[k] !== undefined) { fields.push(`${k.replace(/[A-Z]/g, m=>`_${m.toLowerCase()}`)}=$${fields.length+1}`); values.push(body[k]); }
  }
  if (!fields.length) return NextResponse.json({ ok:true });
  await sql.raw(`update products set ${fields.join(", ")} where slug='${body.slug}'`, values as any);
  return NextResponse.json({ ok:true });
}
