export const otpStore = new Map<
  string,
  { code: string; expiresAt: number }
>();

export function generateOtp() {
  return String(Math.floor(100000 + Math.random() * 900000));
}
