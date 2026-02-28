import type { NextApiRequest, NextApiResponse } from "next";
import { otpStore } from "./_store";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  const { email, code } = req.body as { email?: string; code?: string };
  if (!email || !code) {
    return res.status(400).json({ error: "Email and code required" });
  }
  const record = otpStore.get(email);
  if (!record) return res.status(400).json({ error: "OTP not found" });
  if (Date.now() > record.expiresAt) {
    otpStore.delete(email);
    return res.status(400).json({ error: "OTP expired" });
  }
  if (record.code !== code) {
    return res.status(400).json({ error: "Invalid OTP" });
  }
  otpStore.delete(email);
  return res.status(200).json({ ok: true });
}
