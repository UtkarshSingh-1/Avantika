import crypto from "crypto";

export const sessions = new Map<
  string,
  {
    id: string;
    email: string;
    name: string;
    picture?: string;
    provider: string;
    role?: "user" | "admin";
  }
>();

export const users = new Map<
  string,
  {
    id: string;
    email: string;
    name: string;
    password: string;
    role: "user" | "admin";
  }
>();

users.set("user@avantika.com", {
  id: "user-demo-1",
  email: "user@avantika.com",
  name: "Demo User",
  password: "user123",
  role: "user",
});

users.set("admin@avantika.com", {
  id: "admin-demo-1",
  email: "admin@avantika.com",
  name: "Admin",
  password: "admin123",
  role: "admin",
});

export function newSession(user: {
  id: string;
  email: string;
  name: string;
  picture?: string;
  provider?: string;
  role?: "user" | "admin";
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
