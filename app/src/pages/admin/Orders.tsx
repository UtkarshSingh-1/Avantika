import { useEffect } from "react";
import { GlassCard } from "../../components/glass/GlassCard";
import { GlassButton } from "../../components/glass/GlassButton";
import { useOrderStore } from "../../store/useOrderStore";

const statuses = ["pending", "confirmed", "preparing", "served", "completed"] as const;

export function AdminOrders() {
  const { orders, loadOrders, updateStatus } = useOrderStore();

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  return (
    <GlassCard title="Live Orders" subtitle="Incoming table orders in real time.">
      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="border border-white/10 rounded-2xl p-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold">Order #{order.id}</div>
                <div className="text-sm text-white/60">
                  Table {order.table} • {order.items.length} items
                </div>
              </div>
              <span className="text-sm text-white/70">{order.status}</span>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {statuses.map((status) => (
                <GlassButton
                  key={status}
                  variant={order.status === status ? "primary" : "secondary"}
                  onClick={() => updateStatus(order.id, status)}
                >
                  {status}
                </GlassButton>
              ))}
            </div>
          </div>
        ))}
        {orders.length === 0 && (
          <div className="text-white/70">No live orders yet.</div>
        )}
      </div>
    </GlassCard>
  );
}
