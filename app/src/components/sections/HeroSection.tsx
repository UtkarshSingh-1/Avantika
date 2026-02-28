import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { GlassButton } from "../glass/GlassButton";

export function HeroSection() {
  const [style, setStyle] = useState({
    scale: 1,
    translateY: 0,
    overlayOpacity: 0.4,
    textOffset: 0,
  });
  const heroRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const durationRef = useRef(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let raf = 0;
    const updateFromScroll = () => {
      raf = 0;
      const height = heroRef.current?.offsetHeight || window.innerHeight;
      const progress = Math.min(window.scrollY / Math.max(1, height * 0.9), 1);

      setStyle({
        scale: 1 + progress * 0.12,
        translateY: -progress * 80,
        overlayOpacity: 0.4 + progress * 0.3,
        textOffset: -progress * 60,
      });

      if (durationRef.current > 0) {
        const targetTime = durationRef.current * progress;
        if (Math.abs(video.currentTime - targetTime) > 0.025) {
          video.currentTime = targetTime;
        }
      }
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(updateFromScroll);
    };
    const onResize = onScroll;
    const onLoadedMetadata = () => {
      durationRef.current = Number.isFinite(video.duration) ? video.duration : 0;
      onScroll();
    };

    video.pause();
    video.muted = true;
    video.playsInline = true;
    video.addEventListener("loadedmetadata", onLoadedMetadata);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    onScroll();

    return () => {
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
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
          willChange: "transform",
        }}
      >
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          muted
          playsInline
          preload="auto"
        >
          <source src="/gemini_generated_video_049c7940.webm" type="video/webm" />
          <source src="/gemini_generated_video_049c7940.mp4" type="video/mp4" />
        </video>
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
