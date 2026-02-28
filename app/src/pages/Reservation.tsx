import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { GlassButton } from "../components/glass/GlassButton";
import { GlassCard } from "../components/glass/GlassCard";
import { GlassInput } from "../components/glass/GlassInput";
import { tables } from "../data/tables";
import { useReservationStore } from "../store/useReservationStore";

export function ReservationPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState(2);
  const [table, setTable] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { createReservation } = useReservationStore();

  const handleSubmit = async () => {
    setError("");
    if (!name || !phone || !date || !time || !table || guests < 1) {
      setError("Please fill all required details.");
      return;
    }
    setLoading(true);
    try {
      await createReservation({
        name,
        phone,
        date,
        time,
        guests,
        table,
      });
      setSuccess(true);
    } catch {
      setError("Reservation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section-wrap pt-32 flex justify-center">
      <GlassCard className="max-w-2xl w-full">
        {!success ? (
          <>
            <h2 className="text-2xl font-display">Reserve a Table</h2>
            <p className="text-white/70 mt-2">
              Book your table reservation restaurant experience in Sultanpur.
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <GlassInput label="Name" value={name} onChange={(e) => setName(e.target.value)} />
              <GlassInput label="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
              <GlassInput label="Date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
              <GlassInput label="Time" type="time" value={time} onChange={(e) => setTime(e.target.value)} />
              <GlassInput
                label="Guests"
                type="number"
                min={1}
                max={12}
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
              />
              <label className="flex flex-col gap-2 text-sm text-white/70">
                Table
                <select
                  className="glass glass-hover rounded-full px-4 py-2 bg-transparent"
                  value={table}
                  onChange={(e) => setTable(e.target.value)}
                >
                  <option value="">Select table</option>
                  {tables.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className="mt-6 flex gap-3">
              <GlassButton onClick={handleSubmit} disabled={loading}>
                {loading ? "Confirming..." : "Confirm Reservation"}
              </GlassButton>
              <GlassButton variant="secondary" onClick={() => router.push("/menu")}>
                Order Now
              </GlassButton>
            </div>
            {error && <p className="mt-4 text-sm text-red-200">{error}</p>}
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-display">Reservation Confirmed</h2>
            <p className="text-white/70 mt-2">
              Your table is reserved. We look forward to serving you at Avantika Food Mall.
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <GlassButton onClick={() => router.push("/menu")}>Order Now</GlassButton>
              <Link href="/">
                <GlassButton variant="secondary">Back to Home</GlassButton>
              </Link>
            </div>
          </div>
        )}
      </GlassCard>
    </div>
  );
}
