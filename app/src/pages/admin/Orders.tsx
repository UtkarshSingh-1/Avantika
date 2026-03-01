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
    <GlassCard title="Live Orders" subtitle="Incoming orders with full item details.">
      <div className="space-y-4">
        {orders.map((order) => {
          const rows = (order.items || []).map((raw: any) => ({
            name: String(raw?.name ?? raw?.menuItem?.name ?? "Item"),
            price: Number(raw?.price ?? raw?.menuItem?.price ?? 0),
            quantity: Math.max(1, Number(raw?.quantity ?? 1)),
            notes: raw?.notes ? String(raw.notes) : "",
          }));

          return (
            <div key={order.id} className="rounded-2xl border border-white/10 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold">Order #{order.id}</div>
                  <div className="text-sm text-white/60">
                    Table {order.table || "N/A"} | {rows.length} items | INR {order.total}
                  </div>
                </div>
                <span className="text-sm capitalize text-white/70">{order.status}</span>
              </div>

              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="text-white/70">
                      <th className="pb-2">Table</th>
                      <th className="pb-2">Dish</th>
                      <th className="pb-2">Price</th>
                      <th className="pb-2">Qty</th>
                      <th className="pb-2">Notes</th>
                      <th className="pb-2">Line Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((it, idx) => (
                      <tr key={`${order.id}-${idx}`} className="border-t border-white/10">
                        <td className="py-2">{order.table || "N/A"}</td>
                        <td className="py-2">{it.name}</td>
                        <td className="py-2">INR {it.price}</td>
                        <td className="py-2">{it.quantity}</td>
                        <td className="py-2">{it.notes || "-"}</td>
                        <td className="py-2">INR {it.price * it.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
          );
        })}
        {orders.length === 0 && <div className="text-white/70">No live orders yet.</div>}
      </div>
    </GlassCard>
  );
}
