import { useState } from "react";
import { useRouter } from "next/router";
import { GlassButton } from "../components/glass/GlassButton";
import { GlassCard } from "../components/glass/GlassCard";
import { GlassInput } from "../components/glass/GlassInput";
import { PasswordInput } from "../components/common/PasswordInput";

export function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleReset = () => {
    setError("");
    if (!email.trim() || !password.trim()) {
      setError("Email and new password required.");
      return;
    }
    sessionStorage.setItem(
      "pending_reset",
      JSON.stringify({ email: email.trim(), password })
    );
    fetch("/api/auth/otp/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.trim() }),
    }).then(() => {
      router.push(`/otp?email=${encodeURIComponent(email.trim())}&mode=reset`);
    });
  };

  return (
    <div className="section-wrap pt-32 flex justify-center">
      <GlassCard className="max-w-lg w-full">
        <h2 className="text-2xl font-display">Reset Password</h2>
        <p className="text-white/70 mt-2">
          Enter your email and new password. We will verify with OTP.
        </p>
        <div className="mt-6 space-y-4">
          <GlassInput
            label="Email"
            placeholder="you@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <PasswordInput
            label="New Password"
            placeholder="New password"
            value={password}
            onChange={setPassword}
          />
        </div>
        <div className="mt-6 flex gap-3">
          <GlassButton onClick={handleReset}>Send OTP</GlassButton>
        </div>
        {error && <p className="mt-4 text-sm text-red-200">{error}</p>}
      </GlassCard>
    </div>
  );
}
