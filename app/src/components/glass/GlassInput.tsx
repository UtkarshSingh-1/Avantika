import type { InputHTMLAttributes } from "react";
import { cn } from "../../utils/cn";

type GlassInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export function GlassInput({ label, className, ...props }: GlassInputProps) {
  return (
    <label className="flex flex-col gap-2 text-sm text-white/70">
      {label && <span>{label}</span>}
      <input
        className={cn(
          "glass glass-hover rounded-full px-4 py-2 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/40",
          className
        )}
        {...props}
      />
    </label>
  );
}
