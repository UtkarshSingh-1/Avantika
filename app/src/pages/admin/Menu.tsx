import { useState } from "react";
import { GlassCard } from "../../components/glass/GlassCard";
import { GlassButton } from "../../components/glass/GlassButton";
import { GlassInput } from "../../components/glass/GlassInput";
import { menuItems } from "../../data/menu";

export function AdminMenu() {
  const [items, setItems] = useState(menuItems);

  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <GlassCard
      title="Menu Manager"
      subtitle="Add, edit, or remove dishes for the live menu."
    >
      <div className="grid gap-4 md:grid-cols-3">
        <GlassInput label="Dish Name" placeholder="Paneer Lababdar" />
        <GlassInput label="Price" type="number" placeholder="420" />
        <GlassInput label="Category" placeholder="Mains" />
      </div>
      <div className="mt-4">
        <GlassButton>Add Dish</GlassButton>
      </div>
      <div className="mt-6 space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between border border-white/10 rounded-2xl p-3"
          >
            <div>
              <div className="font-semibold">{item.name}</div>
              <div className="text-sm text-white/60">₹{item.price}</div>
            </div>
            <div className="flex gap-2">
              <GlassButton variant="secondary">Edit</GlassButton>
              <GlassButton variant="ghost" onClick={() => removeItem(item.id)}>
                Remove
              </GlassButton>
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
