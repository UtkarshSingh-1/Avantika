import { NavLink } from "react-router-dom";
import { GlassButton } from "../components/glass/GlassButton";
import { GlassCard } from "../components/glass/GlassCard";
import { GlassInput } from "../components/glass/GlassInput";
import { Toggle } from "../components/common/Toggle";
import { tables } from "../data/tables";
import { useCartStore } from "../store/useCartStore";
import { useOrderStore } from "../store/useOrderStore";

export function CartPage() {
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

  return (
    <div className="section-wrap pt-32">
      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-6">
          <GlassCard title="Your Cart" subtitle="Review and update your order.">
            {items.length === 0 ? (
              <p className="text-white/70">Your cart is empty.</p>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col gap-3 border-b border-white/10 pb-4"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold">{item.menuItem.name}</h4>
                        <p className="text-sm text-white/60">
                          ₹{item.menuItem.price} x {item.quantity}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          className="glass px-3 py-1 rounded-full"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          className="glass px-3 py-1 rounded-full"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                        >
                          +
                        </button>
                        <button
                          className="text-white/50 hover:text-white"
                          onClick={() => removeItem(item.id)}
                        >
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

          <GlassCard
            title="Table Selection"
            subtitle="Choose your table or let QR auto-assign."
          >
            <div className="flex flex-wrap gap-2">
              {tables.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTable(t.id)}
                  className={`glass px-4 py-2 rounded-full text-sm ${
                    table === t.id ? "bg-white/20" : ""
                  }`}
                >
                  {t.name}
                </button>
              ))}
            </div>
            <div className="mt-4">
              <Toggle
                checked={dineIn}
                onChange={toggleDineIn}
                labels={["Dine-in", "Takeaway"]}
              />
            </div>
          </GlassCard>
        </div>

        <div className="space-y-6">
          <GlassCard title="Order Summary">
            <div className="flex items-center justify-between text-white/70">
              <span>Items</span>
              <span>{items.length}</span>
            </div>
            <div className="flex items-center justify-between text-white/70 mt-2">
              <span>Table</span>
              <span>{table || "Not selected"}</span>
            </div>
            <div className="flex items-center justify-between text-white/70 mt-2">
              <span>Total</span>
              <span className="text-lg font-semibold text-white">
                ₹{total()}
              </span>
            </div>
            <div className="mt-6 space-y-3">
              <GlassButton
                disabled={items.length === 0 || !table || loading}
                onClick={() => placeOrder()}
              >
                Place Order
              </GlassButton>
              <NavLink to="/menu">
                <GlassButton variant="secondary">View Menu</GlassButton>
              </NavLink>
            </div>
            {lastOrder && (
              <div className="mt-6 text-sm text-white/70">
                Order #{lastOrder.id} placed. Status: {lastOrder.status}
              </div>
            )}
          </GlassCard>

          <div className="glass p-4 text-sm text-white/70">
            QR camera hint: scan the table QR to auto-fill table number for
            seamless ordering.
          </div>
        </div>
      </div>
    </div>
  );
}
