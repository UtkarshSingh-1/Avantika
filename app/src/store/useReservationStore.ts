import { create } from "zustand";
import type { Reservation } from "../types";
import { api } from "../lib/api";

type ReservationState = {
  reservations: Reservation[];
  loading: boolean;
  loadReservations: () => Promise<void>;
  createReservation: (data: Omit<Reservation, "id" | "status">) => Promise<void>;
  updateStatus: (id: string, status: Reservation["status"]) => Promise<void>;
};

export const useReservationStore = create<ReservationState>((set, get) => ({
  reservations: [],
  loading: false,
  loadReservations: async () => {
    set({ loading: true });
    try {
      const data = await api.get<Reservation[]>("/reservations");
      set({ reservations: data });
    } catch {
      set({ reservations: [] });
    } finally {
      set({ loading: false });
    }
  },
  createReservation: async (data) => {
    const reservation = await api.post<Reservation>("/reservations", data);
    set({ reservations: [reservation, ...get().reservations] });
  },
  updateStatus: async (id, status) => {
    await api.patch<Reservation>(`/reservations/${id}`, { status });
    set({
      reservations: get().reservations.map((r) =>
        r.id === id ? { ...r, status } : r
      ),
    });
  },
}));
