import Link from "next/link";
import { SectionHeader } from "../common/SectionHeader";
import { GlassCard } from "../glass/GlassCard";
import { GlassButton } from "../glass/GlassButton";
import { RatingStars } from "../common/RatingStars";
import { reviews } from "../../data/reviews";

export function ReviewsSection() {
  return (
    <section className="section-wrap">
      <SectionHeader
        title="Customer Reviews"
        subtitle="Loved by guests searching for online food order Sultanpur and the best food near me."
        action={
          <Link href="/order">
            <GlassButton variant="secondary">Order Now</GlassButton>
          </Link>
        }
      />
      <div className="grid gap-6 md:grid-cols-3">
        {reviews.map((review) => (
          <GlassCard key={review.name} className="flex flex-col gap-4">
            <RatingStars rating={review.rating} />
            <p className="text-white/80">“{review.text}”</p>
            <div>
              <div className="font-semibold">{review.name}</div>
              <div className="text-sm text-white/60">{review.role}</div>
            </div>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}
