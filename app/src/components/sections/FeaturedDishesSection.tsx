import Link from "next/link";
import { GlassCard } from "../glass/GlassCard";
import { GlassButton } from "../glass/GlassButton";
import { SectionHeader } from "../common/SectionHeader";
import { menuItems } from "../../data/menu";

export function FeaturedDishesSection() {
  const featured = menuItems.filter((item) => item.popular).slice(0, 3);

  return (
    <section className="section-wrap">
      <SectionHeader
        title="Featured Dishes"
        subtitle="Curated for the best food near me lovers in Sultanpur. Discover signature plates from our restaurant in Sultanpur."
        action={
          <Link href="/order">
            <GlassButton variant="secondary">Order Now</GlassButton>
          </Link>
        }
      />
      <div className="grid gap-6 lg:grid-cols-3">
        {featured.map((dish, idx) => (
          <GlassCard
            key={dish.id}
            className={`flex flex-col gap-4 ${idx === 1 ? "float-slow" : ""}`}
          >
            <img
              src={dish.image}
              alt={dish.name}
              className="h-48 w-full rounded-xl object-cover"
            />
            <div>
              <h3 className="text-xl font-semibold">{dish.name}</h3>
              <p className="text-white/70 text-sm mt-2">{dish.description}</p>
            </div>
            <div className="flex items-center justify-between mt-auto">
              <span className="text-lg font-semibold">₹{dish.price}</span>
              <Link href="/order">
                <GlassButton variant="primary">Order Now</GlassButton>
              </Link>
            </div>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}
