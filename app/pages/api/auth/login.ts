import type { NextApiRequest, NextApiResponse } from "next";
import { newSession, users } from "./_store";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  const { email, password } = req.body as { email?: string; password?: string };
  if (!email || !password) {
    return res.status(400).json({ error: "Missing fields" });
  }
  const user = users.get(email);
  if (!user || user.password !== password) {
    return res.status(401).json({ error: "Invalid credentials" });
  }
  const sessionId = newSession({
    id: user.id,
    email: user.email,
    name: user.name,
    provider: "local",
    role: user.role,
  });
  res.setHeader(
    "Set-Cookie",
    `session=${encodeURIComponent(
      sessionId
    )}; HttpOnly; Path=/; Max-Age=${60 * 60 * 24 * 7}; SameSite=Lax${
      process.env.NODE_ENV === "production" ? "; Secure" : ""
    }`
  );
  return res.status(200).json({ ok: true, role: user.role });
}
