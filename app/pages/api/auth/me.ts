import type { NextApiRequest, NextApiResponse } from "next";
import { parseCookies, sessions } from "./_store";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const cookies = parseCookies(req.headers.cookie || "");
  const sessionId = cookies.session;
  if (!sessionId || !sessions.has(sessionId)) {
    return res.status(401).json({ error: "Not authenticated" });
  }
  return res.status(200).json({ user: sessions.get(sessionId) });
}
