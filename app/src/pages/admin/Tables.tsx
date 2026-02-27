import { useState } from "react";
import { GlassCard } from "../../components/glass/GlassCard";
import { GlassButton } from "../../components/glass/GlassButton";
import { tables } from "../../data/tables";

export function AdminTables() {
  const [occupied, setOccupied] = useState<string[]>(["T3", "T7", "T12"]);

  const toggle = (id: string) => {
    setOccupied((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  return (
    <GlassCard title="Tables" subtitle="Assign and monitor table occupancy.">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {tables.map((table) => {
          const isOccupied = occupied.includes(table.id);
          return (
            <div
              key={table.id}
              className="flex items-center justify-between border border-white/10 rounded-2xl p-3"
            >
              <div>
                <div className="font-semibold">{table.name}</div>
                <div className="text-sm text-white/60">
                  {isOccupied ? "Occupied" : "Free"}
                </div>
              </div>
              <GlassButton
                variant={isOccupied ? "primary" : "secondary"}
                onClick={() => toggle(table.id)}
              >
                {isOccupied ? "Release" : "Assign"}
              </GlassButton>
            </div>
          );
        })}
      </div>
    </GlassCard>
  );
}
