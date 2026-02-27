import { GlassCard } from "../../components/glass/GlassCard";

const stats = [
  { label: "Today's Orders", value: "86" },
  { label: "Active Tables", value: "24" },
  { label: "Reservations", value: "12" },
  { label: "Revenue", value: "₹1,82,400" },
];

export function AdminDashboard() {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <GlassCard key={stat.label} className="text-center">
          <div className="text-2xl font-semibold">{stat.value}</div>
          <div className="text-sm text-white/70">{stat.label}</div>
        </GlassCard>
      ))}
    </div>
  );
}
