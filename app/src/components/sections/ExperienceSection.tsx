import { NavLink } from "react-router-dom";
import { SectionHeader } from "../common/SectionHeader";
import { GlassButton } from "../glass/GlassButton";
import { GlassCard } from "../glass/GlassCard";
import { experienceImages } from "../../data/experience";

export function ExperienceSection() {
  return (
    <section className="section-wrap">
      <SectionHeader
        title="Restaurant Experience"
        subtitle="A modern dining room with liquid glass details, soft lighting, and immersive ambience."
        action={
          <NavLink to="/reservation">
            <GlassButton variant="secondary">Reserve Table</GlassButton>
          </NavLink>
        }
      />
      <div className="grid gap-6 md:grid-cols-2">
        {experienceImages.map((src, idx) => (
          <GlassCard key={src} className={idx === 0 ? "md:row-span-2" : ""}>
            <img
              src={src}
              alt="Restaurant interior"
              className="h-56 w-full rounded-xl object-cover sm:h-64 lg:h-72"
            />
            {idx === 0 && (
              <div className="mt-4 text-white/80">
                Reserve a table in Sultanpur and enjoy curated music, ambient
                lighting, and attentive service.
              </div>
            )}
          </GlassCard>
        ))}
      </div>
    </section>
  );
}
