import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { GlassButton } from "../components/glass/GlassButton";
import { GlassCard } from "../components/glass/GlassCard";
import { SectionHeader } from "../components/common/SectionHeader";
import { useMenuStore } from "../store/useMenuStore";
import { useCartStore } from "../store/useCartStore";
import { useMediaQuery } from "../hooks/useMediaQuery";

export function MenuPage() {
  const [params] = useSearchParams();
  const { categories, items, selectedCategory, setCategory, loadMenu } =
    useMenuStore();
  const addItem = useCartStore((s) => s.addItem);
  const setTable = useCartStore((s) => s.setTable);
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    loadMenu();
  }, [loadMenu]);

  useEffect(() => {
    const table = params.get("table");
    if (table) setTable(table);
  }, [params, setTable]);

  const filtered =
    selectedCategory === "all"
      ? items
      : items.filter((item) => item.categoryId === selectedCategory);

  return (
    <div className="section-wrap pt-32">
      <SectionHeader
        title="Avantika Food Mall Menu"
        subtitle="Browse our Indian cuisine Sultanpur selection. Online food order Sultanpur made easy with QR ordering."
        action={
          <>
            <GlassButton>Order Now</GlassButton>
            <GlassButton variant="secondary">Reserve Table</GlassButton>
          </>
        }
      />
      <div className="flex flex-wrap gap-3 mb-8">
        <button
          className={`glass px-4 py-2 rounded-full text-sm ${
            selectedCategory === "all" ? "bg-white/20" : ""
          }`}
          onClick={() => setCategory("all")}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`glass px-4 py-2 rounded-full text-sm ${
              selectedCategory === cat.id ? "bg-white/20" : ""
            }`}
            onClick={() => setCategory(cat.id)}
          >
            {cat.name}
          </button>
        ))}
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((dish) => (
          <GlassCard key={dish.id} className="flex flex-col gap-4">
            <img
              src={dish.image}
              alt={dish.name}
              className="h-44 w-full rounded-xl object-cover"
            />
            <div>
              <h3 className="text-xl font-semibold">{dish.name}</h3>
              <p className="text-sm text-white/70 mt-2">{dish.description}</p>
            </div>
            <div className="flex items-center justify-between mt-auto">
              <span className="text-lg font-semibold">₹{dish.price}</span>
              <GlassButton onClick={() => addItem(dish)}>Add to Cart</GlassButton>
            </div>
          </GlassCard>
        ))}
      </div>
      {isMobile && (
        <div className="fixed bottom-20 right-4 z-40">
          <GlassButton>Order Now</GlassButton>
        </div>
      )}
    </div>
  );
}
