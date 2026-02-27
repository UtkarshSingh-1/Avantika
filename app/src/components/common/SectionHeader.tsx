import type { ReactNode } from "react";

type SectionHeaderProps = {
  title: string;
  subtitle: string;
  action?: ReactNode;
};

export function SectionHeader({ title, subtitle, action }: SectionHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-8">
      <div>
        <h2 className="section-title">{title}</h2>
        <p className="section-subtitle mt-3 max-w-2xl">{subtitle}</p>
      </div>
      {action && <div className="flex gap-3">{action}</div>}
    </div>
  );
}
