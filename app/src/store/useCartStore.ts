import { create } from "zustand";
import type { CartItem, MenuItem } from "../types";

type CartState = {
  items: CartItem[];
  table: string | null;
  dineIn: boolean;
  addItem: (item: MenuItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  setNotes: (id: string, notes: string) => void;
  setTable: (table: string) => void;
  toggleDineIn: () => void;
  clear: () => void;
  total: () => number;
};

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  table: null,
  dineIn: true,
  addItem: (item) => {
    const existing = get().items.find((i) => i.menuItem.id === item.id);
    if (existing) {
      set({
        items: get().items.map((i) =>
          i.menuItem.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        ),
      });
      return;
    }
    set({
      items: [...get().items, { id: `${Date.now()}`, menuItem: item, quantity: 1 }],
    });
  },
  removeItem: (id) =>
    set({
      items: get().items.filter((i) => i.id !== id),
    }),
  updateQuantity: (id, quantity) =>
    set({
      items: get().items.map((i) =>
        i.id === id ? { ...i, quantity: Math.max(1, quantity) } : i
      ),
    }),
  setNotes: (id, notes) =>
    set({
      items: get().items.map((i) => (i.id === id ? { ...i, notes } : i)),
    }),
  setTable: (table) => set({ table }),
  toggleDineIn: () => set({ dineIn: !get().dineIn }),
  clear: () => set({ items: [], table: null }),
  total: () =>
    get().items.reduce((sum, item) => sum + item.menuItem.price * item.quantity, 0),
}));
