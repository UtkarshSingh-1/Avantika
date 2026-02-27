import { useState } from "react";
import { GlassButton } from "../components/glass/GlassButton";
import { GlassCard } from "../components/glass/GlassCard";
import { GlassInput } from "../components/glass/GlassInput";
import { useUserStore } from "../store/useUserStore";

export function OtpPage() {
  const { verifyOtp } = useUserStore();
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");

  const handleVerify = () => {
    const ok = verifyOtp(code);
    setMessage(ok ? "OTP verified! You can place orders now." : "Invalid OTP.");
  };

  return (
    <div className="section-wrap pt-32 flex justify-center">
      <GlassCard className="max-w-lg w-full text-center">
        <h2 className="text-2xl font-display">OTP Verification</h2>
        <p className="text-white/70 mt-2">
          Enter the demo OTP code <span className="text-white">1234</span>
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
