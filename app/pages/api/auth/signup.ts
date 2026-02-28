import type { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto";
import { newSession, users } from "./_store";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  const { name, email, password } = req.body as {
    name?: string;
    email?: string;
    password?: string;
  };
  if (!name || !email || !password) {
    return res.status(400).json({ error: "Missing fields" });
  }
  if (users.has(email)) {
    return res.status(409).json({ error: "User already exists" });
  }
  const user = {
    id: crypto.randomUUID(),
    name,
    email,
    password,
    role: "user" as const,
  };
  users.set(email, user);
  const sessionId = newSession({ id: user.id, email, name, provider: "local" });
  res.setHeader(
    "Set-Cookie",
    `session=${encodeURIComponent(
      sessionId
    )}; HttpOnly; Path=/; Max-Age=${60 * 60 * 24 * 7}; SameSite=Lax${
      process.env.NODE_ENV === "production" ? "; Secure" : ""
    }`
  );
  return res.status(200).json({ ok: true, role: "user" });
}
