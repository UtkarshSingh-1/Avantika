import Link from "next/link";
import { SectionHeader } from "../common/SectionHeader";
import { GlassCard } from "../glass/GlassCard";
import { GlassButton } from "../glass/GlassButton";
import { menuCategories, menuItems } from "../../data/menu";

export function MenuPreviewSection() {
  const preview = menuItems.slice(0, 4);

  return (
    <section className="section-wrap">
      <SectionHeader
        title="Menu Preview"
        subtitle="Explore the signature menu of our restaurant Avantika Food Mall with a quick taste of top categories."
        action={
          <Link href="/menu">
            <GlassButton>View Menu</GlassButton>
          </Link>
        }
      />
      <div className="flex flex-wrap gap-3 mb-6">
        {menuCategories.map((cat) => (
          <span
            key={cat.id}
            className="glass px-4 py-2 rounded-full text-sm text-white/80"
          >
            {cat.name}
          </span>
        ))}
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {preview.map((dish) => (
          <GlassCard key={dish.id} className="flex flex-col gap-3">
            <img
              src={dish.image}
              alt={dish.name}
              className="h-36 w-full rounded-xl object-cover"
            />
            <h4 className="text-lg font-semibold">{dish.name}</h4>
            <p className="text-sm text-white/70">{dish.description}</p>
            <div className="flex items-center justify-between mt-auto">
              <span className="font-semibold">₹{dish.price}</span>
              <GlassButton variant="secondary">Order Now</GlassButton>
            </div>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}
