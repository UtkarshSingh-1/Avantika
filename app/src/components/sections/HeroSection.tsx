import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useScrollHero } from "../../hooks/useScrollHero";
import Link from "next/link";
import { GlassButton } from "../glass/GlassButton";

export function HeroSection() {
  const scrollState = useScrollHero();
  const [style, setStyle] = useState({
    scale: 1,
    translateY: 0,
    overlayOpacity: 0.4,
    textOffset: 0,
  });
  const heroRef = useRef<HTMLElement | null>(null);
  const initRef = useRef(false);
  const frameCount = 240;
  const [frame, setFrame] = useState(1);
  const frameRef = useRef(1);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(() => {
        setStyle({ ...scrollState.current });
        tick();
      });
    };
    tick();
    return () => cancelAnimationFrame(raf);
  }, [scrollState]);

  useEffect(() => {
    if (initRef.current) return;
    initRef.current = true;
    let raf = 0;

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const height = heroRef.current?.offsetHeight || window.innerHeight;
        const progress = Math.min(window.scrollY / Math.max(1, height * 0.9), 1);
        const next = Math.max(
          1,
          Math.min(frameCount, Math.floor(progress * (frameCount - 1)) + 1)
        );
        if (frameRef.current !== next) {
          frameRef.current = next;
          setFrame(next);
        }
        raf = 0;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);


  return (
    <section ref={heroRef} className="relative h-screen w-full overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          transform: `scale(${style.scale}) translateY(${style.translateY}px)`,
          transformOrigin: "center",
          transition: "transform 0.1s linear",
        }}
      >
        <img
          className="h-full w-full object-cover"
          src={`/hero-frames/frame_${String(frame).padStart(4, "0")}.jpg`}
          alt="Hero sequence"
        />
      </div>
      <div
        className="absolute inset-0 bg-hero-overlay"
        style={{ opacity: style.overlayOpacity }}
      />
      <div className="relative z-10 flex h-full items-center justify-center text-center px-6">
        <motion.div
          className="max-w-3xl"
          style={{ transform: `translateY(${style.textOffset}px)` }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-sm uppercase tracking-[0.3em] text-white/70">
            restaurant Avantika Food Mall • Indian cuisine Sultanpur
          </p>
          <h1 className="mt-4 text-4xl sm:text-6xl lg:text-7xl font-display">
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
