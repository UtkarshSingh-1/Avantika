import { HeroSection } from "../components/sections/HeroSection";
import { FeaturedDishesSection } from "../components/sections/FeaturedDishesSection";
import { HowQrSection } from "../components/sections/HowQrSection";
import { MenuPreviewSection } from "../components/sections/MenuPreviewSection";
import { ReservationSection } from "../components/sections/ReservationSection";
import { WhyChooseSection } from "../components/sections/WhyChooseSection";
import { ReviewsSection } from "../components/sections/ReviewsSection";
import { ExperienceSection } from "../components/sections/ExperienceSection";
import { DownloadCtaSection } from "../components/sections/DownloadCtaSection";
import { FooterSection } from "../components/sections/FooterSection";

export function Home() {
  return (
    <div>
      <HeroSection />
      <FeaturedDishesSection />
      <HowQrSection />
      <MenuPreviewSection />
      <ReservationSection />
      <WhyChooseSection />
      <ReviewsSection />
      <ExperienceSection />
      <DownloadCtaSection />
      <FooterSection />
    </div>
  );
}
