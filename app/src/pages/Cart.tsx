import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { GlassButton } from "../components/glass/GlassButton";
import { GlassCard } from "../components/glass/GlassCard";
import { GlassInput } from "../components/glass/GlassInput";
import { GlassModal } from "../components/glass/GlassModal";
import { Toggle } from "../components/common/Toggle";
import { useCartStore } from "../store/useCartStore";
import { useOrderStore } from "../store/useOrderStore";
import { useAuthStore } from "../store/useAuthStore";
import { useUserStore } from "../store/useUserStore";
import { api } from "../lib/api";
import type { Table } from "../types";

export function CartPage() {
  const router = useRouter();
  const {
    items,
    removeItem,
    updateQuantity,
    setNotes,
    table,
    setTable,
    dineIn,
    toggleDineIn,
    total,
  } = useCartStore();
  const { placeOrder, loading, lastOrder } = useOrderStore();
  const user = useAuthStore((s) => s.user);
  const otpLoggedIn = useUserStore((s) => s.isLoggedIn);
  const isLoggedIn = Boolean(user) || otpLoggedIn;
  const [tables, setTables] = useState<Table[]>([]);
  const [loginPrompt, setLoginPrompt] = useState(false);

  useEffect(() => {
    api.get<Table[]>("/tables")
      .then(setTables)
      .catch(() => setTables([]));
  }, []);

  const canPlaceOrder = items.length > 0 && (!dineIn || Boolean(table));

  const handlePlaceOrder = async () => {
    if (!isLoggedIn) {
      setLoginPrompt(true);
      return;
    }
    await placeOrder();
  };

  return (
    <div className="section-wrap pt-32">
      <GlassModal open={loginPrompt} onClose={() => setLoginPrompt(false)} title="Login Required">
        <p className="text-white/70">
          Please login before placing the order. You can add items to cart without login.
        </p>
        <div className="mt-4 flex gap-3">
          <GlassButton onClick={() => router.push("/login?returnTo=/cart")}>Go to Login</GlassButton>
          <GlassButton variant="secondary" onClick={() => setLoginPrompt(false)}>
            Continue Browsing
          </GlassButton>
        </div>
      </GlassModal>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-6">
          <GlassCard title="Your Cart" subtitle="Review and update your order.">
            {items.length === 0 ? (
              <p className="text-white/70">Your cart is empty.</p>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex flex-col gap-3 border-b border-white/10 pb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold">{item.menuItem.name}</h4>
                        <p className="text-sm text-white/60">
                          INR {item.menuItem.price} x {item.quantity}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="glass rounded-full px-3 py-1" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button className="glass rounded-full px-3 py-1" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                          +
                        </button>
                        <button className="text-white/50 hover:text-white" onClick={() => removeItem(item.id)}>
                          Remove
                        </button>
                      </div>
                    </div>
                    <GlassInput
                      placeholder="Add notes (spice level, no onion, extra sauce)"
                      value={item.notes || ""}
                      onChange={(e) => setNotes(item.id, e.target.value)}
                    />
                  </div>
                ))}
              </div>
            )}
          </GlassCard>

          <GlassCard title="Table Selection" subtitle="Choose your table or let QR auto-assign.">
            <div className="flex flex-wrap gap-2">
              {tables.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTable(t.id)}
                  className={`glass rounded-full px-4 py-2 text-sm ${table === t.id ? "bg-white/20" : ""}`}
                >
                  Table {t.id.replace("T", "")}
                </button>
              ))}
            </div>
            <div className="mt-4">
              <Toggle checked={dineIn} onChange={toggleDineIn} labels={["Dine-in", "Takeaway"]} />
            </div>
            {!dineIn && <p className="mt-3 text-sm text-white/70">Takeaway selected: table is optional.</p>}
          </GlassCard>
        </div>

        <div className="space-y-6">
          <GlassCard title="Order Summary">
            <div className="flex items-center justify-between text-white/70">
              <span>Items</span>
              <span>{items.length}</span>
            </div>
            <div className="mt-2 flex items-center justify-between text-white/70">
              <span>Table</span>
              <span>{table || "Not selected"}</span>
            </div>
            <div className="mt-2 flex items-center justify-between text-white/70">
              <span>Total</span>
              <span className="text-lg font-semibold text-white">INR {total()}</span>
            </div>
            <div className="mt-6 space-y-3">
              <GlassButton disabled={!canPlaceOrder || loading} onClick={handlePlaceOrder}>
                {loading ? "Placing..." : "Place Order"}
              </GlassButton>
              <Link href="/menu">
                <GlassButton variant="secondary">View Menu</GlassButton>
              </Link>
            </div>
            {lastOrder && (
              <div className="mt-6 text-sm text-white/70">
                Order #{lastOrder.id} placed. Status: {lastOrder.status}
              </div>
            )}
          </GlassCard>

          <div className="glass p-4 text-sm text-white/70">
            QR camera hint: scan the table QR to auto-fill table number for seamless ordering.
          </div>
        </div>
      </div>
    </div>
  );
}
