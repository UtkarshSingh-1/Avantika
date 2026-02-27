import { cn } from "../../utils/cn";

type ToggleProps = {
  checked: boolean;
  onChange: () => void;
  labels?: [string, string];
};

export function Toggle({ checked, onChange, labels }: ToggleProps) {
  return (
    <button
      type="button"
      onClick={onChange}
      className="glass glass-hover flex items-center gap-2 px-3 py-2 rounded-full text-sm"
    >
      {labels && (
        <span className="text-white/70">{checked ? labels[0] : labels[1]}</span>
      )}
      <span
        className={cn(
          "relative inline-flex h-6 w-12 items-center rounded-full border border-white/20 bg-white/10"
        )}
      >
        <span
          className={cn(
            "inline-block h-5 w-5 transform rounded-full bg-white/70 transition",
            checked ? "translate-x-6" : "translate-x-1"
          )}
        />
      </span>
    </button>
  );
}
