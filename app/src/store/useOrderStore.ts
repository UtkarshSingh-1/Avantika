import { create } from "zustand";
import type { Order } from "../types";
import { api } from "../lib/api";
import { useCartStore } from "./useCartStore";

type OrderState = {
  orders: Order[];
  lastOrder: Order | null;
  loading: boolean;
  loadOrders: () => Promise<void>;
  placeOrder: () => Promise<Order | null>;
  updateStatus: (id: string, status: Order["status"]) => Promise<void>;
};

export const useOrderStore = create<OrderState>((set, get) => ({
  orders: [],
  lastOrder: null,
  loading: false,
  loadOrders: async () => {
    set({ loading: true });
    try {
      const data = await api.get<Order[]>("/orders");
      set({ orders: data });
    } catch {
      set({ orders: [] });
    } finally {
      set({ loading: false });
    }
  },
  placeOrder: async () => {
    const cart = useCartStore.getState();
    if (cart.items.length === 0 || (cart.dineIn && !cart.table)) return null;
    set({ loading: true });
    try {
      const newOrder = await api.post<Order>("/orders", {
        table: cart.table,
        items: cart.items,
        total: cart.total(),
        dineIn: cart.dineIn,
      });
      if (cart.dineIn && cart.table) {
        await api.patch(`/tables/${cart.table}`, { occupied: true });
      }
      set({ lastOrder: newOrder, orders: [newOrder, ...get().orders] });
      cart.clear();
      return newOrder;
    } finally {
      set({ loading: false });
    }
  },
  updateStatus: async (id, status) => {
    await api.patch<Order>(`/orders/${id}`, { status });
    set({
      orders: get().orders.map((o) => (o.id === id ? { ...o, status } : o)),
    });
  },
}));
