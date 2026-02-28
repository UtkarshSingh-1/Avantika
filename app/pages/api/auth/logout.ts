import type { NextApiRequest, NextApiResponse } from "next";
import { parseCookies, sessions } from "./_store";

const isProd = process.env.NODE_ENV === "production";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const cookies = parseCookies(req.headers.cookie || "");
  const sessionId = cookies.session;
  if (sessionId) sessions.delete(sessionId);
  res.setHeader(
    "Set-Cookie",
    `session=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax${
      isProd ? "; Secure" : ""
    }`
  );
  res.status(200).json({ ok: true });
}
