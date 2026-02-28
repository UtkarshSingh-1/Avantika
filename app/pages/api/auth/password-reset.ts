import type { NextApiRequest, NextApiResponse } from "next";
import { users } from "./_store";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  const { email, password } = req.body as { email?: string; password?: string };
  if (!email || !password) {
    return res.status(400).json({ error: "Missing fields" });
  }
  const user = users.get(email);
  if (!user) return res.status(404).json({ error: "User not found" });
  users.set(email, { ...user, password });
  return res.status(200).json({ ok: true });
}
