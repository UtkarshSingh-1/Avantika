import Link from "next/link";
import { GlassButton } from "../glass/GlassButton";
import { useCartStore } from "../../store/useCartStore";
import { useMediaQuery } from "../../hooks/useMediaQuery";

export function BottomCartBar() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const items = useCartStore((s) => s.items);
  const total = useCartStore((s) => s.total());

  if (!isMobile || items.length === 0) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-40 glass px-4 py-3 flex items-center justify-between">
      <div>
        <div className="text-sm text-white/70">{items.length} items</div>
        <div className="font-semibold">₹{total}</div>
      </div>
      <Link href="/cart">
        <GlassButton>Go to Cart</GlassButton>
      </Link>
    </div>
  );
}
