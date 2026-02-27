import { NavLink } from "react-router-dom";
import { GlassButton } from "../glass/GlassButton";

export function FooterSection() {
  return (
    <footer className="section-wrap pt-8">
      <div className="glass p-6 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-2xl font-display">Avantika Food Mall</h3>
          <p className="text-white/70 mt-2 max-w-md">
            Restaurant in Sultanpur serving authentic Indian cuisine with QR code
            restaurant ordering and elegant glass-inspired ambience.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <NavLink to="/order">
            <GlassButton>Order Now</GlassButton>
          </NavLink>
          <NavLink to="/reservation">
            <GlassButton variant="secondary">Reserve Table</GlassButton>
          </NavLink>
        </div>
      </div>
      <div className="mt-6 flex flex-wrap items-center justify-between text-sm text-white/50">
        <span>© 2026 Avantika Food Mall. All rights reserved.</span>
        <span>Online food order Sultanpur • best food near me</span>
      </div>
    </footer>
  );
}
