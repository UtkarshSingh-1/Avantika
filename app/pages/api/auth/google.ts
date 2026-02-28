import type { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const redirectUri = process.env.GOOGLE_REDIRECT_URI;
  if (!clientId || !redirectUri) {
    return res.status(500).json({ error: "Google OAuth not configured" });
  }
  const state = crypto.randomUUID();
  res.setHeader(
    "Set-Cookie",
    `oauth_state=${encodeURIComponent(state)}; HttpOnly; Path=/; Max-Age=600; SameSite=Lax${
      process.env.NODE_ENV === "production" ? "; Secure" : ""
    }`
  );
  const scope = encodeURIComponent("openid email profile");
  const url =
    "https://accounts.google.com/o/oauth2/v2/auth?" +
    `client_id=${encodeURIComponent(clientId)}` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}` +
    "&response_type=code" +
    `&scope=${scope}` +
    `&state=${encodeURIComponent(state)}` +
    "&access_type=offline&prompt=consent";
  res.redirect(url);
}
