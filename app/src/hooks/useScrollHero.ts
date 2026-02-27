import { useEffect, useRef } from "react";

export type ScrollHeroState = {
  scale: number;
  translateY: number;
  overlayOpacity: number;
  textOffset: number;
};

export function useScrollHero() {
  const state = useRef<ScrollHeroState>({
    scale: 1,
    translateY: 0,
    overlayOpacity: 0.4,
    textOffset: 0,
  });

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const progress = Math.min(scrollY / 500, 1);
        state.current = {
          scale: 1 + progress * 0.12,
          translateY: -progress * 80,
          overlayOpacity: 0.4 + progress * 0.3,
          textOffset: -progress * 60,
        };
        raf = 0;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return state;
}
