import { GlassButton } from "../components/glass/GlassButton";
import { GlassCard } from "../components/glass/GlassCard";
import { GlassInput } from "../components/glass/GlassInput";
import { useUserStore } from "../store/useUserStore";

export function LoginPage() {
  const { login } = useUserStore();

  return (
    <div className="section-wrap pt-32 flex justify-center">
      <GlassCard className="max-w-lg w-full">
        <h2 className="text-2xl font-display">Customer Login</h2>
        <p className="text-white/70 mt-2">
          Secure access to online food order Sultanpur and table reservations.
        </p>
        <div className="mt-6 space-y-4">
          <GlassInput label="Email" placeholder="you@email.com" />
          <GlassInput label="Password" type="password" placeholder="••••••••" />
        </div>
        <div className="mt-6 flex gap-3">
          <GlassButton onClick={login}>Login</GlassButton>
          <GlassButton variant="secondary">Guest Order</GlassButton>
        </div>
      </GlassCard>
    </div>
  );
}
