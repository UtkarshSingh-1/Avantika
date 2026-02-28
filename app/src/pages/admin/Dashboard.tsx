import { useEffect, useMemo } from "react";
import { GlassCard } from "../../components/glass/GlassCard";
import { useOrderStore } from "../../store/useOrderStore";
import { useReservationStore } from "../../store/useReservationStore";
import { api } from "../../lib/api";
import { useState } from "react";
import type { Table } from "../../types";

export function AdminDashboard() {
  const { orders, loadOrders } = useOrderStore();
  const { reservations, loadReservations } = useReservationStore();
  const [tables, setTables] = useState<Table[]>([]);

  useEffect(() => {
    loadOrders();
    loadReservations();
    api.get<Table[]>("/tables").then(setTables).catch(() => setTables([]));
  }, [loadOrders, loadReservations]);

  const todayOrders = useMemo(() => {
    const today = new Date().toISOString().slice(0, 10);
    return orders.filter((o) => o.createdAt.slice(0, 10) === today).length;
  }, [orders]);

  const revenue = useMemo(
    () => orders.reduce((sum, order) => sum + Number(order.total || 0), 0),
    [orders]
  );

  const stats = [
    { label: "Today's Orders", value: String(todayOrders) },
    { label: "Active Tables", value: String(tables.filter((t) => t.occupied).length) },
    { label: "Reservations", value: String(reservations.length) },
    { label: "Revenue", value: `INR ${revenue}` },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <GlassCard key={stat.label} className="text-center">
          <div className="text-2xl font-semibold">{stat.value}</div>
          <div className="text-sm text-white/70">{stat.label}</div>
        </GlassCard>
      ))}
    </div>
  );
}
