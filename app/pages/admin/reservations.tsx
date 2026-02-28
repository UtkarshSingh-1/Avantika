import { AdminGate } from "../../src/pages/admin/AdminGate";
import { AdminLayout } from "../../src/pages/admin/AdminLayout";
import { AdminReservations } from "../../src/pages/admin/Reservations";

export default function AdminReservationsRoute() {
  return (
    <AdminGate>
      <AdminLayout>
        <AdminReservations />
      </AdminLayout>
    </AdminGate>
  );
}
