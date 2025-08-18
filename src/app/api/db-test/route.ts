import { sql } from "@vercel/postgres";

export async function GET() {
  const result = await sql`SELECT NOW();`;
  return Response.json(result);
}
