import Link from "next/link";
import { GlassButton } from "../glass/GlassButton";
import { GlassInput } from "../glass/GlassInput";
import { GlassPanel } from "../glass/GlassPanel";

export function ReservationSection() {
  return (
    <section className="section-wrap">
      <GlassPanel
        heading="Table Reservation"
        description="Reserve your table in advance at the best restaurant in Sultanpur. Perfect for celebrations, meetings, and family dinners."
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <GlassInput label="Date" type="date" />
          <GlassInput label="Time" type="time" />
          <GlassInput label="Guests" type="number" min={1} max={12} />
          <GlassInput label="Table" placeholder="Table 4" />
        </div>
        <div className="mt-6 flex flex-wrap gap-4">
          <Link href="/reservation">
            <GlassButton>Reserve Table</GlassButton>
          </Link>
          <Link href="/order">
            <GlassButton variant="secondary">Order Now</GlassButton>
          </Link>
        </div>
      </GlassPanel>
    </section>
  );
}
