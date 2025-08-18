import { NextResponse } from "next/server";
import { cookies } from "next/headers";
export async function POST(req: Request) {
  const { pass } = await req.json();
  if (pass !== process.env.ADMIN_PASS) return NextResponse.json({ ok:false }, { status: 401 });
  cookies().set("admin", "1", { httpOnly: true, path: "/", maxAge: 60*60*6 });
  return NextResponse.json({ ok:true });
}
