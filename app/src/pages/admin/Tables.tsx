import { useEffect, useState } from "react";
import { GlassCard } from "../../components/glass/GlassCard";
import { GlassButton } from "../../components/glass/GlassButton";
import { api } from "../../lib/api";
import type { Table } from "../../types";

export function AdminTables() {
  const [tables, setTables] = useState<Table[]>([]);

  const loadTables = async () => {
    const data = await api.get<Table[]>("/tables");
    setTables(data);
  };

  useEffect(() => {
    loadTables().catch(() => setTables([]));
  }, []);

  const toggle = async (id: string, occupied: boolean) => {
    try {
      const updated = await api.patch<Table>(`/tables/${id}`, { occupied: !occupied });
      setTables((prev) => prev.map((t) => (t.id === id ? updated : t)));
    } catch {
      // ignore for demo
    }
  };

  return (
    <GlassCard title="Tables" subtitle="Assign and monitor table occupancy.">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {tables.map((table) => {
          const isOccupied = table.occupied;
          return (
            <div
              key={table.id}
              className="flex items-center justify-between rounded-2xl border border-white/10 p-3"
            >
              <div>
                <div className="font-semibold">Table {table.id.replace("T", "")}</div>
                <div className="text-sm text-white/60">
                  {isOccupied ? "Occupied" : "Free"}
                </div>
              </div>
              <GlassButton
                variant={isOccupied ? "primary" : "secondary"}
                onClick={() => toggle(table.id, isOccupied)}
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
