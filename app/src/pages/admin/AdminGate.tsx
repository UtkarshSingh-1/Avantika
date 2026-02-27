import type { ReactNode } from "react";
import { useEffect } from "react";
import { GlassButton } from "../../components/glass/GlassButton";
import { GlassCard } from "../../components/glass/GlassCard";
import { useAdminStore } from "../../store/useAdminStore";

export function AdminGate({ children }: { children: ReactNode }) {
  const { isAdmin, login, hydrate } = useAdminStore();

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <GlassCard className="max-w-md text-center">
          <h2 className="text-2xl font-display">Admin Access</h2>
          <p className="text-white/70 mt-3">
            Demo gate enabled. Click below to access the admin dashboard.
          </p>
          <div className="mt-6">
            <GlassButton onClick={login}>Enter Admin</GlassButton>
          </div>
        </GlassCard>
      </div>
    );
  }

  return <>{children}</>;
}
