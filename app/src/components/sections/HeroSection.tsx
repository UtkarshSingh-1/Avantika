import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useScrollHero } from "../../hooks/useScrollHero";
import { NavLink } from "react-router-dom";
import { GlassButton } from "../glass/GlassButton";

export function HeroSection() {
  const scrollState = useScrollHero();
  const [style, setStyle] = useState({
    scale: 1,
    translateY: 0,
    overlayOpacity: 0.4,
    textOffset: 0,
  });
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const durationRef = useRef(0);

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
    const video = videoRef.current;
    if (!video) return;

    const onLoaded = () => {
      durationRef.current = video.duration || 0;
      video.currentTime = 0;
      video.pause();
    };

    const onScroll = () => {
      const progress = Math.min(window.scrollY / 700, 1);
      const duration = durationRef.current;
      if (duration > 0) {
        video.currentTime = duration * progress;
      }
    };

    video.addEventListener("loadedmetadata", onLoaded);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      video.removeEventListener("loadedmetadata", onLoaded);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          transform: `scale(${style.scale}) translateY(${style.translateY}px)`,
          transformOrigin: "center",
          transition: "transform 0.1s linear",
        }}
      >
        <video
          className="h-full w-full object-cover"
          ref={videoRef}
          muted
          playsInline
          preload="auto"
        >
          <source src="/Av promo.webm" type="video/webm" />
          <source src="/Av promo.mp4" type="video/mp4" />
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
            <NavLink to="/order">
              <GlassButton>Scan &amp; Order</GlassButton>
            </NavLink>
            <NavLink to="/menu">
              <GlassButton variant="secondary">View Menu</GlassButton>
            </NavLink>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
