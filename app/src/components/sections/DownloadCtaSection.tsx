import { NavLink } from "react-router-dom";
import { GlassButton } from "../glass/GlassButton";
import { GlassPanel } from "../glass/GlassPanel";

export function DownloadCtaSection() {
  return (
    <section className="section-wrap">
      <GlassPanel
        heading="Order Anywhere, Anytime"
        description="Download the Avantika Food Mall mobile menu or scan QR at your table for lightning-fast ordering."
        className="relative overflow-hidden"
      >
        <div className="absolute -top-20 -right-10 h-52 w-52 rounded-full bg-cyan-400/30 blur-3xl" />
        <div className="absolute -bottom-20 left-10 h-52 w-52 rounded-full bg-purple-400/30 blur-3xl" />
        <div className="relative z-10 flex flex-wrap gap-4">
          <NavLink to="/order">
            <GlassButton>Order Now</GlassButton>
          </NavLink>
          <NavLink to="/order">
            <GlassButton variant="secondary">Scan QR</GlassButton>
          </NavLink>
          <NavLink to="/menu">
            <GlassButton variant="ghost">View Menu</GlassButton>
          </NavLink>
        </div>
      </GlassPanel>
    </section>
  );
}
