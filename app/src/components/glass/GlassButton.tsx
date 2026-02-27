import type { ButtonHTMLAttributes } from "react";
import { cn } from "../../utils/cn";

type Variant = "primary" | "secondary" | "ghost";

type GlassButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
};

const variants: Record<Variant, string> = {
  primary:
    "bg-gradient-to-r from-cyan-400/70 via-blue-400/60 to-purple-400/60 text-slate-950",
  secondary:
    "bg-white/15 text-white border border-white/20 hover:bg-white/25",
  ghost: "bg-transparent text-white border border-white/20 hover:bg-white/10",
};

export function GlassButton({
  variant = "primary",
  className,
  ...props
}: GlassButtonProps) {
  return (
    <button
      className={cn(
        "glass-hover relative inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-semibold shadow-glass backdrop-blur-xl active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed",
        variants[variant],
        className
      )}
      {...props}
    >
      <span className="glass-reflection" />
      <span className="relative z-10">{props.children}</span>
    </button>
  );
}
