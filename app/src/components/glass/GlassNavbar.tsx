import type { ReactNode } from "react";
import { cn } from "../../utils/cn";

type GlassNavbarProps = {
  children: ReactNode;
  className?: string;
};

export function GlassNavbar({ children, className }: GlassNavbarProps) {
  return (
    <nav
      className={cn(
        "glass glass-hover fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 py-3 sm:px-8 rounded-none",
        className
      )}
    >
      <div className="glass-reflection" />
      {children}
    </nav>
  );
}
