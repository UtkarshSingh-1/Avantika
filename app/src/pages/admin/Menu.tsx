import { useEffect, useMemo, useRef, useState } from "react";
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
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [items, setItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<MenuCategory[]>([]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("starters");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [images, setImages] = useState<string[]>([defaultImage]);
  const [imageInput, setImageInput] = useState("");

  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);

  const [error, setError] = useState("");

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

  const selectedCategory = useMemo(
    () => categories.find((c) => c.id === categoryId)?.id || categories[0]?.id || "",
    [categories, categoryId]
  );

  const resetDishForm = () => {
    setName("");
    setPrice("");
    setDescription("");
    setEditingId(null);
    setImages([defaultImage]);
    setImageInput("");
  };

  const resetCategoryForm = () => {
    setCategoryName("");
    setCategoryDescription("");
    setEditingCategoryId(null);
  };

  const addImageUrl = () => {
    const next = imageInput.trim();
    if (!next) return;
    if (images.length >= 7) return;
    setImages((prev) => [...prev, next]);
    setImageInput("");
  };

  const removeImageAt = (index: number) => {
    setImages((prev) => {
      const next = prev.filter((_, i) => i !== index);
      return next.length ? next : [defaultImage];
    });
  };

  const onUploadImages: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const remaining = Math.max(0, 7 - images.length);
    const selectedFiles = files.slice(0, remaining);
    const dataUrls = await Promise.all(
      selectedFiles.map(
        (file) =>
          new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(String(reader.result || ""));
            reader.onerror = reject;
            reader.readAsDataURL(file);
          })
      )
    );
    setImages((prev) => [...prev, ...dataUrls.filter(Boolean)].slice(0, 7));
    e.currentTarget.value = "";
  };

  const saveDish = async () => {
    setError("");
    if (!name.trim() || !price.trim() || !description.trim() || !selectedCategory) {
      setError("Dish name, price, description, and category are required.");
      return;
    }

    const normalizedImages = images.map((img) => img.trim()).filter(Boolean).slice(0, 7);

    const payload = {
      name: name.trim(),
      description: description.trim(),
      price: Number(price),
      image: normalizedImages[0] || defaultImage,
      images: normalizedImages,
      spicy: false,
      popular: false,
      categoryId: selectedCategory,
    };

    if (editingId) {
      const updated = await api.patch<MenuItem>(`/menu/${editingId}`, payload);
      setItems((prev) => prev.map((item) => (item.id === editingId ? updated : item)));
      resetDishForm();
      return;
    }

    const created = await api.post<MenuItem>("/menu", payload);
    setItems((prev) => [created, ...prev]);
    resetDishForm();
  };

  const editDish = (item: MenuItem) => {
    setEditingId(item.id);
    setName(item.name);
    setPrice(String(item.price));
    setDescription(item.description);
    setCategoryId(item.categoryId);
    const source = item.images && item.images.length ? item.images : [item.image];
    setImages(source.slice(0, 7));
    setImageInput("");
  };

  const removeDish = async (id: string) => {
    await api.delete<MenuItem>(`/menu/${id}`);
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const saveCategory = async () => {
    setError("");
    if (!categoryName.trim() || !categoryDescription.trim()) {
      setError("Category name and description are required.");
      return;
    }

    if (editingCategoryId) {
      const updated = await api.patch<MenuCategory>(`/categories/${editingCategoryId}`, {
        name: categoryName.trim(),
        description: categoryDescription.trim(),
      });
      setCategories((prev) => prev.map((c) => (c.id === editingCategoryId ? updated : c)));
      resetCategoryForm();
      return;
    }

    const created = await api.post<MenuCategory>("/categories", {
      name: categoryName.trim(),
      description: categoryDescription.trim(),
    });
    setCategories((prev) => [...prev, created]);
    if (!categoryId) setCategoryId(created.id);
    resetCategoryForm();
  };

  const editCategory = (cat: MenuCategory) => {
    setEditingCategoryId(cat.id);
    setCategoryName(cat.name);
    setCategoryDescription(cat.description);
  };

  const removeCategory = async (id: string) => {
    setError("");
    try {
      await api.delete<MenuCategory>(`/categories/${id}`);
      setCategories((prev) => prev.filter((c) => c.id !== id));
      if (categoryId === id) {
        const next = categories.find((c) => c.id !== id);
        setCategoryId(next?.id || "");
      }
    } catch {
      setError("Category has dishes. Remove or move dishes first.");
    }
  };

  return (
    <div className="space-y-6">
      <GlassCard title="Category Manager" subtitle="Add, edit, and remove menu categories.">
        <div className="grid gap-4 md:grid-cols-2">
          <GlassInput
            label="Category Name"
            placeholder="Starters"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
          <GlassInput
            label="Description"
            placeholder="Category description"
            value={categoryDescription}
            onChange={(e) => setCategoryDescription(e.target.value)}
          />
        </div>
        <div className="mt-4 flex gap-2">
          <GlassButton onClick={saveCategory}>{editingCategoryId ? "Save Category" : "Add Category"}</GlassButton>
          {editingCategoryId && (
            <GlassButton variant="ghost" onClick={resetCategoryForm}>
              Cancel
            </GlassButton>
          )}
        </div>
        <div className="mt-5 space-y-2">
          {categories.map((cat) => (
            <div key={cat.id} className="rounded-2xl border border-white/10 p-3">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="font-semibold">{cat.name}</div>
                  <div className="text-sm text-white/60">{cat.description}</div>
                </div>
                <div className="flex gap-2">
                  <GlassButton variant="secondary" onClick={() => editCategory(cat)}>
                    Edit
                  </GlassButton>
                  <GlassButton variant="ghost" onClick={() => removeCategory(cat.id)}>
                    Remove
                  </GlassButton>
                </div>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      <GlassCard title="Menu Manager" subtitle="Add, edit, and remove dishes with up to 7 images.">
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
              className="glass glass-hover rounded-full bg-transparent px-4 py-2 text-white"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id} style={{ color: "#111" }}>
                  {cat.name}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-[1fr_auto_auto]">
          <GlassInput
            label="Image URL"
            placeholder="https://..."
            value={imageInput}
            onChange={(e) => setImageInput(e.target.value)}
          />
          <div className="flex items-end">
            <GlassButton variant="secondary" onClick={addImageUrl} disabled={images.length >= 7}>
              Add URL
            </GlassButton>
          </div>
          <label className="flex items-end">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={onUploadImages}
            />
            <GlassButton
              variant="secondary"
              onClick={() => fileInputRef.current?.click()}
              disabled={images.length >= 7}
            >
              Upload Image
            </GlassButton>
          </label>
        </div>

        <p className="mt-2 text-xs text-white/60">You can attach up to 7 images per dish.</p>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((img, idx) => (
            <div key={`${img}-${idx}`} className="glass rounded-2xl p-2">
              <img src={img} alt={`Dish image ${idx + 1}`} className="h-28 w-full rounded-xl object-cover" />
              <div className="mt-2 flex items-center justify-between text-xs text-white/70">
                <span>Image {idx + 1}</span>
                <button className="text-red-200 hover:text-red-100" onClick={() => removeImageAt(idx)}>
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex gap-2">
          <GlassButton onClick={saveDish}>{editingId ? "Save Dish" : "Add Dish"}</GlassButton>
          {editingId && (
            <GlassButton variant="ghost" onClick={resetDishForm}>
              Cancel
            </GlassButton>
          )}
        </div>

        {error && <p className="mt-3 text-sm text-red-200">{error}</p>}

        <div className="mt-6 space-y-3">
          {items.map((item) => {
            const imgs = item.images && item.images.length ? item.images : [item.image];
            return (
              <div key={item.id} className="rounded-2xl border border-white/10 p-3">
                <div className="grid gap-3 md:grid-cols-[120px_1fr_auto] md:items-center">
                  <img src={imgs[0]} alt={item.name} className="h-24 w-full rounded-xl object-cover" />
                  <div>
                    <div className="font-semibold">{item.name}</div>
                    <div className="text-sm text-white/60">INR {item.price}</div>
                    <div className="mt-1 text-xs text-white/60">{imgs.length} image(s)</div>
                  </div>
                  <div className="flex gap-2">
                    <GlassButton variant="secondary" onClick={() => editDish(item)}>
                      Edit
                    </GlassButton>
                    <GlassButton variant="ghost" onClick={() => removeDish(item.id)}>
                      Remove
                    </GlassButton>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </GlassCard>
    </div>
  );
}
