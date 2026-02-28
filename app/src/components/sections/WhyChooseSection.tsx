import Link from "next/link";
import { SectionHeader } from "../common/SectionHeader";
import { GlassCard } from "../glass/GlassCard";
import { GlassButton } from "../glass/GlassButton";

const stats = [
  { label: "Daily Orders", value: "1.2k+" },
  { label: "Live Tables", value: "45" },
  { label: "5-Star Reviews", value: "3.8k+" },
  { label: "Chef Awards", value: "12" },
];

const reasons = [
  "Authentic Indian cuisine Sultanpur with modern plating.",
  "Fast QR code restaurant ordering for dine-in ease.",
  "Premium ingredients from trusted local farms.",
  "Table reservation restaurant experience with live availability.",
];

export function WhyChooseSection() {
  return (
    <section className="section-wrap">
      <SectionHeader
        title="Why Choose Us"
        subtitle="Restaurant Avantika Food Mall blends heritage recipes with a liquid glass dining atmosphere."
        action={
          <Link href="/reservation">
            <GlassButton variant="secondary">Reserve Table</GlassButton>
          </Link>
        }
      />
      <div className="grid gap-6 lg:grid-cols-3">
        <GlassCard className="lg:col-span-2">
          <ul className="grid gap-3 text-white/80">
            {reasons.map((reason) => (
              <li key={reason} className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-cyan-300" />
                <span>{reason}</span>
              </li>
            ))}
          </ul>
        </GlassCard>
        <div className="grid gap-4">
          {stats.map((stat) => (
            <GlassCard key={stat.label} className="text-center">
              <div className="text-3xl font-semibold">{stat.value}</div>
              <div className="text-sm text-white/70">{stat.label}</div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
