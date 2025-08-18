import type { NextApiRequest, NextApiResponse } from "next";
import { testConnection } from "../../lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await testConnection();
  res.status(200).json({ message: "Check your terminal for DB connection!" });
}
