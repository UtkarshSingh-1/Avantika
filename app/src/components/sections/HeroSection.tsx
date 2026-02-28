import { useEffect, useRef } from "react";
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
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const durationRef = useRef(0);
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
    const video = videoRef.current;
    if (!video) return;

    const onLoadedMetadata = () => {
      durationRef.current = Number.isFinite(video.duration) ? video.duration : 0;
    };

    video.pause();
    video.muted = true;
    video.playsInline = true;
    video.addEventListener("loadedmetadata", onLoadedMetadata);

    return () => {
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
    };
  }, []);

  useMotionValueEvent(smoothProgress, "change", (p) => {
    const video = videoRef.current;
    if (!video || durationRef.current <= 0) return;
    const progress = Math.min(Math.max(p, 0), 1);
    const targetTime = durationRef.current * progress;
    if (Math.abs(video.currentTime - targetTime) > 0.02) {
      video.currentTime = targetTime;
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
      </motion.div>
      <motion.div
        className="absolute inset-0 bg-hero-overlay"
        style={{ opacity: overlayOpacity }}
      />
      <div className="relative z-10 flex h-full items-center justify-center text-center px-6">
        <motion.div
          className="max-w-3xl"
          style={{ y: textOffset }}
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
