import Link from "next/link";
import type { ReactNode } from "react";
import { GlassButton } from "../../components/glass/GlassButton";
import { useAdminStore } from "../../store/useAdminStore";

const navItems = [
  { label: "Dashboard", path: "/admin" },
  { label: "Orders", path: "/admin/orders" },
  { label: "Menu", path: "/admin/menu" },
  { label: "Tables", path: "/admin/tables" },
  { label: "Reservations", path: "/admin/reservations" },
];

export function AdminLayout({ children }: { children: ReactNode }) {
  const { logout } = useAdminStore();

  return (
    <div className="min-h-screen px-4 sm:px-8 py-10">
      <div className="glass p-4 sm:p-6 mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display">Avantika Food Mall Admin</h1>
          <p className="text-white/60 text-sm">Live operations dashboard</p>
        </div>
        <div className="flex gap-3">
          <GlassButton variant="secondary">Refresh</GlassButton>
          <GlassButton onClick={logout}>Logout</GlassButton>
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
        <aside className="glass p-4 h-fit">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className="rounded-full px-4 py-2 text-sm text-white/60 hover:text-white hover:bg-white/10"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </aside>
        <div className="space-y-6">
          {children}
        </div>
      </div>
    </div>
  );
}
