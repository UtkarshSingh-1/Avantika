import type { ReactNode } from "react";
import { cn } from "../../utils/cn";

type GlassPanelProps = {
  children: ReactNode;
  className?: string;
  heading?: string;
  description?: string;
};

export function GlassPanel({
  children,
  className,
  heading,
  description,
}: GlassPanelProps) {
  return (
    <section className={cn("glass glass-hover p-6 sm:p-8", className)}>
      <div className="glass-reflection" />
      {(heading || description) && (
        <div className="mb-6">
          {heading && (
            <h2 className="text-2xl sm:text-3xl font-display">{heading}</h2>
          )}
          {description && (
            <p className="text-white/70 mt-2 text-sm sm:text-base">{description}</p>
          )}
        </div>
      )}
      {children}
    </section>
  );
}
