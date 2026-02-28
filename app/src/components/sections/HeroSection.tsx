import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { GlassButton } from "../glass/GlassButton";

export function HeroSection() {
  const heroRef = useRef<HTMLElement | null>(null);
  const frameCount = 240;
  const [progress, setProgress] = useState(0);
  const [frame, setFrame] = useState(1);
  const loadedFramesRef = useRef<Set<number>>(new Set());
  const lastRequestedFrameRef = useRef(1);

  const getClosestLoadedFrame = (target: number) => {
    const loaded = loadedFramesRef.current;
    if (loaded.has(target)) return target;
    for (let offset = 1; offset < frameCount; offset += 1) {
      const prev = target - offset;
      const next = target + offset;
      if (prev >= 1 && loaded.has(prev)) return prev;
      if (next <= frameCount && loaded.has(next)) return next;
    }
    return 1;
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const height = heroRef.current?.offsetHeight || window.innerHeight || 1;
      const nextProgress = Math.min(window.scrollY / Math.max(1, height * 0.9), 1);
      setProgress(nextProgress);
      const targetFrame = Math.max(
        1,
        Math.min(frameCount, Math.floor(nextProgress * (frameCount - 1)) + 1)
      );
      lastRequestedFrameRef.current = targetFrame;
      setFrame(getClosestLoadedFrame(targetFrame));
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };

    const onResize = onScroll;

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    onScroll();

    for (let i = 1; i <= frameCount; i += 1) {
      const img = new Image();
      img.onload = () => {
        loadedFramesRef.current.add(i);
        if (i === 1) setFrame(1);
        if (i === lastRequestedFrameRef.current) {
          setFrame(i);
        }
      };
      img.src = `/hero-frames/frame_${String(i).padStart(4, "0")}.jpg`;
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [frameCount]);

  const style = useMemo(
    () => ({
      scale: 1 + progress * 0.12,
      translateY: -progress * 80,
      overlayOpacity: 0.4 + progress * 0.3,
      textOffset: -progress * 60,
    }),
    [progress]
  );

  return (
    <section ref={heroRef} className="relative h-screen w-full overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          transform: `scale(${style.scale}) translateY(${style.translateY}px)`,
          transformOrigin: "center",
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
      </div>

      <div
        className="absolute inset-0 bg-hero-overlay"
        style={{ opacity: style.overlayOpacity }}
      />

      <div className="relative z-10 flex h-full items-center justify-center px-6 text-center">
        <motion.div
          className="max-w-3xl"
          style={{ transform: `translateY(${style.textOffset}px)` }}
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
