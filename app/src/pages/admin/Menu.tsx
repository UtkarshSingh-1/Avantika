import { useEffect, useMemo, useState } from "react";
import { GlassCard } from "../../components/glass/GlassCard";
import { GlassButton } from "../../components/glass/GlassButton";
import { GlassInput } from "../../components/glass/GlassInput";
import { api } from "../../lib/api";
import type { MenuCategory, MenuItem } from "../../types";

type MenuResponse = {
  categories: MenuCategory[];
  items: MenuItem[];
};

const defaultImage =
  "https://images.unsplash.com/photo-1666819691822-29a09f0992e5?auto=format&fit=crop&fm=jpg&q=80&w=1200";

export function AdminMenu() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("starters");
  const [editingId, setEditingId] = useState<string | null>(null);

  const load = async () => {
    const data = await api.get<MenuResponse>("/menu");
    setItems(data.items);
    setCategories(data.categories);
    if (!categoryId && data.categories[0]) setCategoryId(data.categories[0].id);
  };

  useEffect(() => {
    load().catch(() => {
      setItems([]);
      setCategories([]);
    });
  }, []);

  const resetForm = () => {
    setName("");
    setPrice("");
    setDescription("");
    setEditingId(null);
  };

  const selectedCategory = useMemo(
    () => categories.find((c) => c.id === categoryId)?.id || "starters",
    [categories, categoryId]
  );

  const saveDish = async () => {
    if (!name.trim() || !price.trim() || !description.trim()) return;
    const payload = {
      name: name.trim(),
      description: description.trim(),
      price: Number(price),
      image: defaultImage,
      spicy: false,
      popular: false,
      categoryId: selectedCategory,
    };

    if (editingId) {
      const updated = await api.patch<MenuItem>(`/menu/${editingId}`, payload);
      setItems((prev) => prev.map((item) => (item.id === editingId ? updated : item)));
      resetForm();
      return;
    }

    const created = await api.post<MenuItem>("/menu", payload);
    setItems((prev) => [created, ...prev]);
    resetForm();
  };

  const editDish = (item: MenuItem) => {
    setEditingId(item.id);
    setName(item.name);
    setPrice(String(item.price));
    setDescription(item.description);
    setCategoryId(item.categoryId);
  };

  const removeItem = async (id: string) => {
    await api.delete<MenuItem>(`/menu/${id}`);
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <GlassCard title="Menu Manager" subtitle="Add, edit, or remove dishes for the live menu.">
      <div className="grid gap-4 md:grid-cols-2">
        <GlassInput
          label="Dish Name"
          placeholder="Paneer Lababdar"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <GlassInput
          label="Price"
          type="number"
          placeholder="420"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <GlassInput
          label="Description"
          placeholder="Dish details"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label className="flex flex-col gap-2 text-sm text-white/70">
          Category
          <select
            className="glass glass-hover rounded-full bg-transparent px-4 py-2"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-4 flex gap-2">
        <GlassButton onClick={saveDish}>{editingId ? "Save Dish" : "Add Dish"}</GlassButton>
        {editingId && (
          <GlassButton variant="ghost" onClick={resetForm}>
            Cancel
          </GlassButton>
        )}
      </div>

      <div className="mt-6 space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between rounded-2xl border border-white/10 p-3"
          >
            <div>
              <div className="font-semibold">{item.name}</div>
              <div className="text-sm text-white/60">INR {item.price}</div>
            </div>
            <div className="flex gap-2">
              <GlassButton variant="secondary" onClick={() => editDish(item)}>
                Edit
              </GlassButton>
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
