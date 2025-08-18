import type { NextApiRequest, NextApiResponse } from "next";
import { createUsersTable, insertUser } from "../../lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await createUsersTable();
  await insertUser("Mohamed", "mohamed@example.com");
  
  res.status(200).json({ message: "Table created and user inserted!" });
}
