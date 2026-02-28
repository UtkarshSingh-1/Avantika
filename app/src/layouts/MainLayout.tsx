import Link from "next/link";
import { useRouter } from "next/router";
import type { ReactNode } from "react";
import { useEffect } from "react";
import { GlassNavbar } from "../components/glass/GlassNavbar";
import { GlassButton } from "../components/glass/GlassButton";
import { useCartStore } from "../store/useCartStore";
import { useAuthStore } from "../store/useAuthStore";
import { BottomCartBar } from "../components/common/BottomCartBar";
import { useUserStore } from "../store/useUserStore";

const linkClass =
  "text-sm text-white/70 hover:text-white transition px-3 py-2 rounded-full";

export function MainLayout({ children }: { children: ReactNode }) {
  const itemsCount = useCartStore((s) => s.items.length);
  const router = useRouter();
  const isHome = router.pathname === "/";
  const { user, loadSession, logout } = useAuthStore();
  const isOtpLoggedIn = useUserStore((s) => s.isLoggedIn);
  const isLoggedIn = Boolean(user) || isOtpLoggedIn;

  useEffect(() => {
    loadSession();
  }, [loadSession]);

  return (
    <div className="min-h-screen">
      <GlassNavbar>
        <div className="flex items-center gap-4">
          <span className="font-display text-lg">Avantika Food Mall</span>
          <span className="hidden md:block text-xs text-white/60">
            Restaurant in Sultanpur
          </span>
        </div>
        <div className="hidden md:flex items-center gap-2">
          {[
            { href: "/", label: "Home" },
            { href: "/menu", label: "Menu" },
            { href: "/reservation", label: "Reservation" },
            { href: "/order", label: "Order" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${linkClass} ${
                router.pathname === link.href ? "bg-white/20 text-white" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-3">
          {!isLoggedIn ? (
            <Link href="/login" className="text-sm text-white/70">
              Login
            </Link>
          ) : (
            <>
              <GlassButton variant="secondary">Scan QR</GlassButton>
              <Link href="/cart" className="relative">
                <GlassButton>Cart ({itemsCount})</GlassButton>
              </Link>
              <button
                className="glass px-4 py-2 rounded-full text-sm"
                onClick={() => logout()}
              >
                {user ? user.name.split(" ")[0] : "Profile"} • Logout
              </button>
            </>
          )}
        </div>
      </GlassNavbar>
      <div className={isHome ? "" : "pt-24"}>{children}</div>
      <BottomCartBar />
    </div>
  );
}
