import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const { phone } = await req.json();
  if (!phone) return NextResponse.json({ error: "phone required" }, { status: 400 });
  cookies().set("phone", phone, { httpOnly: true, path: "/", maxAge: 60*60*24*30 });
  return NextResponse.json({ ok: true });
}
