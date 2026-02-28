import type { NextApiRequest, NextApiResponse } from "next";
import { newSession, parseCookies } from "../_store";

const isProd = process.env.NODE_ENV === "production";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { code, state } = req.query;
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const redirectUri = process.env.GOOGLE_REDIRECT_URI;

  const cookies = parseCookies(req.headers.cookie || "");
  if (!code || !state || cookies.oauth_state !== String(state)) {
    return res.status(400).send("Invalid OAuth state");
  }
  res.setHeader(
    "Set-Cookie",
    `oauth_state=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax${
      isProd ? "; Secure" : ""
    }`
  );

  try {
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code: String(code),
        client_id: clientId || "",
        client_secret: clientSecret || "",
        redirect_uri: redirectUri || "",
        grant_type: "authorization_code",
      }),
    });
    const tokenData = await tokenRes.json();
    if (!tokenRes.ok) return res.status(401).json(tokenData);

    const userRes = await fetch(
      "https://openidconnect.googleapis.com/v1/userinfo",
      {
        headers: { Authorization: `Bearer ${tokenData.access_token}` },
      }
    );
    const user = await userRes.json();
    const sessionId = newSession({
      id: user.sub,
      email: user.email,
      name: user.name,
      picture: user.picture,
    });

    res.setHeader(
      "Set-Cookie",
      `session=${encodeURIComponent(
        sessionId
      )}; HttpOnly; Path=/; Max-Age=${60 * 60 * 24 * 7}; SameSite=Lax${
        isProd ? "; Secure" : ""
      }`
    );
    res.redirect("/login?google=success");
  } catch {
    res.status(500).send("OAuth failed");
  }
}
