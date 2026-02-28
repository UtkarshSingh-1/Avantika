import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";
import { generateOtp, otpStore } from "./_store";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  const { email } = req.body as { email?: string };
  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  const host = process.env.BREVO_SMTP_HOST;
  const port = Number(process.env.BREVO_SMTP_PORT || 587);
  const user = process.env.BREVO_SMTP_LOGIN;
  const pass = process.env.BREVO_SMTP_PASSWORD;
  const sender = process.env.BREVO_SENDER_EMAIL;

  if (!host || !user || !pass || !sender) {
    return res.status(500).json({ error: "SMTP not configured" });
  }

  const otp = generateOtp();
  otpStore.set(email, { code: otp, expiresAt: Date.now() + 5 * 60 * 1000 });

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: false,
    auth: { user, pass },
  });

  await transporter.sendMail({
    from: `Avantika Food Mall <${sender}>`,
    to: email,
    subject: "Your Avantika Food Mall OTP",
    text: `Your OTP is ${otp}. It expires in 5 minutes.`,
    html: `<div style="font-family:Arial,sans-serif;">
      <h2>Your OTP</h2>
      <p>Use this OTP to continue login:</p>
      <div style="font-size:24px;font-weight:700;letter-spacing:4px;">${otp}</div>
      <p style="color:#666;">Expires in 5 minutes.</p>
    </div>`,
  });

  return res.status(200).json({ ok: true });
}
