import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import Link from "next/link";
import { GlassButton } from "../glass/GlassButton";

export function HeroSection() {
  const heroRef = useRef<HTMLElement | null>(null);
  const frameCount = 240;
  const [frame, setFrame] = useState(1);
  const frameRef = useRef(1);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.25,
  });

  const scale = useTransform(smoothProgress, [0, 1], [1, 1.12]);
  const translateY = useTransform(smoothProgress, [0, 1], [0, -80]);
  const overlayOpacity = useTransform(smoothProgress, [0, 1], [0.4, 0.7]);
  const textOffset = useTransform(smoothProgress, [0, 1], [0, -60]);

  useEffect(() => {
    const preloadCount = 60;
    for (let i = 1; i <= preloadCount; i += 1) {
      const img = new Image();
      img.src = `/hero-frames/frame_${String(i).padStart(4, "0")}.jpg`;
    }
  }, []);

  useMotionValueEvent(smoothProgress, "change", (p) => {
    const progress = Math.min(Math.max(p, 0), 1);
    const next = Math.max(
      1,
      Math.min(frameCount, Math.floor(progress * (frameCount - 1)) + 1)
    );

    if (frameRef.current !== next) {
      frameRef.current = next;
      setFrame(next);
    }
  });

  return (
    <section ref={heroRef} className="relative h-screen w-full overflow-hidden">
      <motion.div
        className="absolute inset-0"
        style={{
          scale,
          y: translateY,
          willChange: "transform",
        }}
      >
        <img
          className="h-full w-full object-cover"
          src={`/hero-frames/frame_${String(frame).padStart(4, "0")}.jpg`}
          alt="Avantika hero sequence"
          loading="eager"
          decoding="async"
        />
      </motion.div>

      <motion.div
        className="absolute inset-0 bg-hero-overlay"
        style={{ opacity: overlayOpacity }}
      />

      <div className="relative z-10 flex h-full items-center justify-center px-6 text-center">
        <motion.div
          className="max-w-3xl"
          style={{ y: textOffset }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-sm uppercase tracking-[0.3em] text-white/70">
            restaurant Avantika Food Mall | Indian cuisine Sultanpur
          </p>
          <h1 className="mt-4 font-display text-4xl sm:text-6xl lg:text-7xl">
            Authentic Taste of Avantika Food Mall
          </h1>
          <p className="mt-5 text-lg text-white/80">
            Order fresh food instantly at your table. Experience the best food near
            me with QR code restaurant ordering and curated Avantika Food Mall favorites.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/order">
              <GlassButton>Scan &amp; Order</GlassButton>
            </Link>
            <Link href="/menu">
              <GlassButton variant="secondary">View Menu</GlassButton>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
