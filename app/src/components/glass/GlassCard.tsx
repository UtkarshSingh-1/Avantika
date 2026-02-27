import type { ReactNode } from "react";
import { cn } from "../../utils/cn";

type GlassCardProps = {
  children: ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
};

export function GlassCard({ children, className, title, subtitle }: GlassCardProps) {
  return (
    <div className={cn("glass glass-hover p-5 sm:p-6", className)}>
      <div className="glass-reflection" />
      {title && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          {subtitle && <p className="text-sm text-white/70">{subtitle}</p>}
        </div>
      )}
      {children}
    </div>
  );
}
