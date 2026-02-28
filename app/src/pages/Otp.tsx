import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { GlassButton } from "../components/glass/GlassButton";
import { GlassCard } from "../components/glass/GlassCard";
import { GlassInput } from "../components/glass/GlassInput";
import { useUserStore } from "../store/useUserStore";

export function OtpPage() {
  const { email, setEmail, setOtpVerified, login } = useUserStore();
  const router = useRouter();
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (typeof router.query.email === "string") {
      setEmail(router.query.email);
    }
  }, [router.query.email, setEmail]);

  const handleVerify = async () => {
    setMessage("");
    const res = await fetch("/api/auth/otp/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, code }),
    });
    if (!res.ok) {
      const data = await res.json();
      setMessage(data.error || "Invalid OTP.");
      return;
    }
    setOtpVerified(true);
    const mode = typeof router.query.mode === "string" ? router.query.mode : "";
    if (mode === "signup") {
      const pending = sessionStorage.getItem("pending_signup");
      if (pending) {
        const payload = JSON.parse(pending);
        const signupRes = await fetch("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!signupRes.ok) {
          const data = await signupRes.json();
          setMessage(data.error || "Signup failed.");
          return;
        }
        sessionStorage.removeItem("pending_signup");
      }
      login();
      setMessage("OTP verified! You can place orders now.");
      router.push("/");
      return;
    }
    if (mode === "reset") {
      const pendingReset = sessionStorage.getItem("pending_reset");
      if (pendingReset) {
        const payload = JSON.parse(pendingReset);
        const resetRes = await fetch("/api/auth/password-reset", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!resetRes.ok) {
          const data = await resetRes.json();
          setMessage(data.error || "Password reset failed.");
          return;
        }
        sessionStorage.removeItem("pending_reset");
      }
      setMessage("Password updated. You can login now.");
      router.push("/login");
      return;
    }
    login();
    setMessage("OTP verified! You can place orders now.");
    router.push("/");
  };

  return (
    <div className="section-wrap pt-32 flex justify-center">
      <GlassCard className="max-w-lg w-full text-center">
        <h2 className="text-2xl font-display">OTP Verification</h2>
        <p className="text-white/70 mt-2">
          Enter the OTP sent to <span className="text-white">{email}</span>.
        </p>
        <div className="mt-6">
          <GlassInput
            label="OTP"
            placeholder="1234"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </div>
        <div className="mt-6 flex justify-center">
          <GlassButton onClick={handleVerify}>Verify OTP</GlassButton>
        </div>
        {message && <p className="mt-4 text-white/70">{message}</p>}
      </GlassCard>
    </div>
  );
}
