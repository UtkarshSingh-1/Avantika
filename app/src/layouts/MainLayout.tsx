import { NavLink, Outlet, useLocation } from "react-router-dom";
import { GlassNavbar } from "../components/glass/GlassNavbar";
import { GlassButton } from "../components/glass/GlassButton";
import { useCartStore } from "../store/useCartStore";
import { BottomCartBar } from "../components/common/BottomCartBar";

const linkClass =
  "text-sm text-white/70 hover:text-white transition px-3 py-2 rounded-full";

export function MainLayout() {
  const itemsCount = useCartStore((s) => s.items.length);
  const location = useLocation();
  const isHome = location.pathname === "/";

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
          <NavLink className={linkClass} to="/">
            Home
          </NavLink>
          <NavLink className={linkClass} to="/menu">
            Menu
          </NavLink>
          <NavLink className={linkClass} to="/reservation">
            Reservation
          </NavLink>
          <NavLink className={linkClass} to="/order">
            Order
          </NavLink>
        </div>
        <div className="flex items-center gap-3">
          <GlassButton variant="secondary">Scan QR</GlassButton>
          <NavLink to="/cart" className="relative">
            <GlassButton>Cart ({itemsCount})</GlassButton>
          </NavLink>
        </div>
      </GlassNavbar>
      <div className={isHome ? "" : "pt-24"}>
        <Outlet />
      </div>
      <BottomCartBar />
    </div>
  );
}
