import type { ReactNode } from "react";
import { useEffect } from "react";
import Link from "next/link";
import { GlassCard } from "../../components/glass/GlassCard";
import { useAdminStore } from "../../store/useAdminStore";

export function AdminGate({ children }: { children: ReactNode }) {
  const { isAdmin, hydrate } = useAdminStore();

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <GlassCard className="max-w-md text-center">
          <h2 className="text-2xl font-display">Admin Access</h2>
          <p className="text-white/70 mt-3">
            Login with admin credentials to access the dashboard.
          </p>
          <div className="mt-6">
            <Link className="glass glass-hover rounded-full px-5 py-2" href="/login">
              Go to Login
            </Link>
          </div>
        </GlassCard>
      </div>
    );
  }

  return <>{children}</>;
}
