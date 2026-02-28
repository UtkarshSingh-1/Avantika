import { AdminGate } from "../../src/pages/admin/AdminGate";
import { AdminLayout } from "../../src/pages/admin/AdminLayout";
import { AdminDashboard } from "../../src/pages/admin/Dashboard";

export default function AdminIndex() {
  return (
    <AdminGate>
      <AdminLayout>
        <AdminDashboard />
      </AdminLayout>
    </AdminGate>
  );
}
