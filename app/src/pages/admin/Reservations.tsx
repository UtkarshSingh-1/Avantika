import { useEffect } from "react";
import { GlassCard } from "../../components/glass/GlassCard";
import { GlassButton } from "../../components/glass/GlassButton";
import { useReservationStore } from "../../store/useReservationStore";

export function AdminReservations() {
  const { reservations, loadReservations, updateStatus } = useReservationStore();

  useEffect(() => {
    loadReservations();
  }, [loadReservations]);

  return (
    <GlassCard
      title="Reservations"
      subtitle="Approve or cancel upcoming reservations."
    >
      <div className="space-y-3">
        {reservations.map((reservation) => (
          <div
            key={reservation.id}
            className="flex flex-wrap items-center justify-between gap-3 border border-white/10 rounded-2xl p-3"
          >
            <div>
              <div className="font-semibold">
                {reservation.name} • {reservation.guests} guests
              </div>
              <div className="text-sm text-white/60">
                {reservation.date} • {reservation.time} • {reservation.table}
              </div>
            </div>
            <div className="flex gap-2">
              <GlassButton
                variant="secondary"
                onClick={() => updateStatus(reservation.id, "approved")}
              >
                Approve
              </GlassButton>
              <GlassButton
                variant="ghost"
                onClick={() => updateStatus(reservation.id, "cancelled")}
              >
                Cancel
              </GlassButton>
            </div>
          </div>
        ))}
        {reservations.length === 0 && (
          <div className="text-white/70">No reservations yet.</div>
        )}
      </div>
    </GlassCard>
  );
}
