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

export function AdminCategories() {
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [items, setItems] = useState<MenuItem[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  const load = async () => {
    const data = await api.get<MenuResponse>("/menu");
    setCategories(data.categories);
    setItems(data.items);
  };

  useEffect(() => {
    load().catch(() => {
      setCategories([]);
      setItems([]);
    });
  }, []);

  const usageCount = useMemo(() => {
    const map = new Map<string, number>();
    for (const item of items) {
      map.set(item.categoryId, (map.get(item.categoryId) || 0) + 1);
    }
    return map;
  }, [items]);

  const reset = () => {
    setName("");
    setDescription("");
    setEditingId(null);
  };

  const save = async () => {
    setError("");
    if (!name.trim() || !description.trim()) {
      setError("Category name and description are required.");
      return;
    }

    if (editingId) {
      const updated = await api.patch<MenuCategory>(`/categories/${editingId}`, {
        name: name.trim(),
        description: description.trim(),
      });
      setCategories((prev) => prev.map((c) => (c.id === editingId ? updated : c)));
      reset();
      return;
    }

    const created = await api.post<MenuCategory>("/categories", {
      name: name.trim(),
      description: description.trim(),
    });
    setCategories((prev) => [...prev, created]);
    reset();
  };

  const onEdit = (cat: MenuCategory) => {
    setEditingId(cat.id);
    setName(cat.name);
    setDescription(cat.description);
  };

  const onDelete = async (id: string) => {
    setError("");
    try {
      await api.delete<MenuCategory>(`/categories/${id}`);
      setCategories((prev) => prev.filter((c) => c.id !== id));
    } catch {
      setError("Category has dishes. Move/remove dishes first from Menu Manager.");
    }
  };

  return (
    <GlassCard title="Category Manager" subtitle="Add, edit, update, and delete categories.">
      <div className="grid gap-4 md:grid-cols-2">
        <GlassInput label="Category Name" placeholder="Starters" value={name} onChange={(e) => setName(e.target.value)} />
        <GlassInput label="Description" placeholder="Category description" value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>

      <div className="mt-4 flex gap-2">
        <GlassButton onClick={save}>{editingId ? "Update Category" : "Add Category"}</GlassButton>
        {editingId && (
          <GlassButton variant="ghost" onClick={reset}>
            Cancel
          </GlassButton>
        )}
      </div>

      {error && <p className="mt-3 text-sm text-red-200">{error}</p>}

      <div className="mt-6 space-y-3">
        {categories.map((cat) => (
          <div key={cat.id} className="rounded-2xl border border-white/10 p-3">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="font-semibold">{cat.name}</div>
                <div className="text-sm text-white/60">{cat.description}</div>
                <div className="text-xs text-white/50 mt-1">Used by {usageCount.get(cat.id) || 0} dish(es)</div>
              </div>
              <div className="flex gap-2">
                <GlassButton variant="secondary" onClick={() => onEdit(cat)}>
                  Edit
                </GlassButton>
                <GlassButton variant="ghost" onClick={() => onDelete(cat.id)}>
                  Delete
                </GlassButton>
              </div>
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
