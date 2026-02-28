import crypto from "crypto";

export const sessions = new Map<
  string,
  { id: string; email: string; name: string; picture?: string; provider: string }
>();

export const users = new Map<
  string,
  { id: string; email: string; name: string; password: string; role: "user" }
>();

export function newSession(user: {
  id: string;
  email: string;
  name: string;
  picture?: string;
  provider?: string;
}) {
  const sessionId = crypto.randomUUID();
  sessions.set(sessionId, { ...user, provider: user.provider || "local" });
  return sessionId;
}

export function parseCookies(cookieHeader = "") {
  return cookieHeader.split(";").reduce<Record<string, string>>((acc, part) => {
    const [key, ...rest] = part.trim().split("=");
    if (!key) return acc;
    acc[key] = decodeURIComponent(rest.join("="));
    return acc;
  }, {});
}
