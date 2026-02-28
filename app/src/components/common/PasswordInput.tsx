import { useState } from "react";
import { GlassInput } from "../glass/GlassInput";

type PasswordInputProps = {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
};

export function PasswordInput({
  label,
  placeholder,
  value,
  onChange,
}: PasswordInputProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <GlassInput
        label={label}
        type={visible ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        className="absolute right-4 top-9 text-xs text-white/70 hover:text-white"
      >
        {visible ? "Hide" : "Show"}
      </button>
    </div>
  );
}
