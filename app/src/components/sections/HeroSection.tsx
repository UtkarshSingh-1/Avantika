import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { GlassButton } from "../glass/GlassButton";

export function HeroSection() {
  const heroRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const frameCount = 240;
  const [progress, setProgress] = useState(0);

  const targetFrameRef = useRef(1);
  const drawnFrameRef = useRef(0);
  const imagesRef = useRef<(HTMLImageElement | null)[]>(
    Array.from({ length: frameCount + 1 }, () => null)
  );

  const fitCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const width = Math.max(1, canvas.clientWidth);
    const height = Math.max(1, canvas.clientHeight);
    const nextWidth = Math.floor(width * dpr);
    const nextHeight = Math.floor(height * dpr);

    if (canvas.width !== nextWidth || canvas.height !== nextHeight) {
      canvas.width = nextWidth;
      canvas.height = nextHeight;
    }
  };

  const drawFrame = (index: number) => {
    const canvas = canvasRef.current;
    const image = imagesRef.current[index];
    if (!canvas || !image || !image.complete || image.naturalWidth === 0) return;

    fitCanvas();
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = image.naturalWidth;
    const ih = image.naturalHeight;
    const scale = Math.max(cw / iw, ch / ih);
    const dw = iw * scale;
    const dh = ih * scale;
    const dx = (cw - dw) / 2;
    const dy = (ch - dh) / 2;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(image, dx, dy, dw, dh);
    drawnFrameRef.current = index;
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
      targetFrameRef.current = targetFrame;
      drawFrame(targetFrame);
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };

    const onResize = () => {
      fitCanvas();
      if (drawnFrameRef.current > 0) {
        drawFrame(drawnFrameRef.current);
      } else {
        drawFrame(1);
      }
      onScroll();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    // Preload all frames; draw current target only when that frame is loaded.
    for (let i = 1; i <= frameCount; i += 1) {
      const img = new Image();
      img.decoding = "async";
      img.onload = () => {
        if (i === 1 && drawnFrameRef.current === 0) {
          drawFrame(1);
          return;
        }
        if (i === targetFrameRef.current) {
          drawFrame(i);
        }
      };
      img.src = `/hero-frames/frame_${String(i).padStart(4, "0")}.jpg`;
      imagesRef.current[i] = img;
    }

    onResize();

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
        <canvas ref={canvasRef} className="h-full w-full" aria-label="Avantika hero sequence" />
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
