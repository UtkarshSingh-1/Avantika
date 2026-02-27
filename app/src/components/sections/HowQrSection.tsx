import { NavLink } from "react-router-dom";
import { GlassCard } from "../glass/GlassCard";
import { GlassButton } from "../glass/GlassButton";
import { SectionHeader } from "../common/SectionHeader";

const steps = [
  {
    title: "Scan the Table QR",
    text: "Open the Avantika Food Mall QR code restaurant ordering link from your table to start instantly.",
  },
  {
    title: "Browse & Customize",
    text: "Choose your Indian cuisine Sultanpur favorites and add notes for spice, crisp, or extra gravy.",
  },
  {
    title: "Confirm & Enjoy",
    text: "Place your order and track live updates while we cook it fresh for your table.",
  },
];

export function HowQrSection() {
  return (
    <section className="section-wrap">
      <SectionHeader
        title="How QR Ordering Works"
        subtitle="Online food order Sultanpur experience designed for speed, convenience, and table service."
        action={
          <NavLink to="/order">
            <GlassButton variant="secondary">Scan QR</GlassButton>
          </NavLink>
        }
      />
      <div className="grid gap-6 md:grid-cols-3">
        {steps.map((step, idx) => (
          <GlassCard key={step.title} className="h-full">
            <div className="text-sm text-white/60">Step {idx + 1}</div>
            <h3 className="text-xl font-semibold mt-3">{step.title}</h3>
            <p className="text-white/70 mt-3">{step.text}</p>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}
