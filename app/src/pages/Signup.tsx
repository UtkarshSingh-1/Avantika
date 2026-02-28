import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { GlassButton } from "../components/glass/GlassButton";
import { GlassCard } from "../components/glass/GlassCard";
import { GlassInput } from "../components/glass/GlassInput";
import { PasswordInput } from "../components/common/PasswordInput";
import { useUserStore } from "../store/useUserStore";

export function SignupPage() {
  const router = useRouter();
  const { setEmail } = useUserStore();
  const [name, setName] = useState("");
  const [phone, setPhoneInput] = useState("");
  const [email, setEmailInput] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = () => {
    setError("");
    if (!name.trim() || !email.trim() || !password.trim()) {
      setError("Name, email, and password are required.");
      return;
    }
    setEmail(email.trim());
    sessionStorage.setItem(
      "pending_signup",
      JSON.stringify({ name: name.trim(), email: email.trim(), password })
    );
    fetch("/api/auth/otp/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.trim() }),
    }).then(() => {
      router.push(`/otp?email=${encodeURIComponent(email.trim())}&mode=signup`);
    });
  };

  return (
    <div className="section-wrap pt-32 flex justify-center">
      <GlassCard className="max-w-lg w-full">
        <h2 className="text-2xl font-display">Create Account</h2>
        <p className="text-white/70 mt-2">
          Sign up to track orders, get table reservations, and exclusive offers.
        </p>
        <div className="mt-6 space-y-4">
          <GlassInput
            label="Full Name"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <GlassInput
            label="Phone Number (optional)"
            placeholder="+91 98765 43210"
            value={phone}
            onChange={(e) => setPhoneInput(e.target.value)}
          />
          <GlassInput
            label="Email"
            placeholder="you@email.com"
            value={email}
            onChange={(e) => setEmailInput(e.target.value)}
          />
          <PasswordInput
            label="Password"
            placeholder="Create a password"
            value={password}
            onChange={setPassword}
          />
        </div>
        <div className="mt-6 flex gap-3">
          <GlassButton onClick={handleSignup}>Send OTP</GlassButton>
          <Link href="/login">
            <GlassButton variant="secondary">Back to Login</GlassButton>
          </Link>
        </div>
        {error && <p className="mt-4 text-sm text-red-200">{error}</p>}
      </GlassCard>
    </div>
  );
}
