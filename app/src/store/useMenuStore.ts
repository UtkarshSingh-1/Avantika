import { create } from "zustand";
import { menuCategories, menuItems } from "../data/menu";
import type { MenuCategory, MenuItem } from "../types";
import { api } from "../lib/api";

type MenuState = {
  categories: MenuCategory[];
  items: MenuItem[];
  loading: boolean;
  selectedCategory: string | "all";
  setCategory: (id: string | "all") => void;
  loadMenu: () => Promise<void>;
};

export const useMenuStore = create<MenuState>((set) => ({
  categories: menuCategories,
  items: menuItems,
  loading: false,
  selectedCategory: "all",
  setCategory: (id) => set({ selectedCategory: id }),
  loadMenu: async () => {
    set({ loading: true });
    try {
      const data = await api.get<{ categories: MenuCategory[]; items: MenuItem[] }>(
        "/menu"
      );
      set({ categories: data.categories, items: data.items });
    } catch {
      set({ categories: menuCategories, items: menuItems });
    } finally {
      set({ loading: false });
    }
  },
}));
