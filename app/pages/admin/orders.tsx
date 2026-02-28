import { AdminGate } from "../../src/pages/admin/AdminGate";
import { AdminLayout } from "../../src/pages/admin/AdminLayout";
import { AdminOrders } from "../../src/pages/admin/Orders";

export default function AdminOrdersRoute() {
  return (
    <AdminGate>
      <AdminLayout>
        <AdminOrders />
      </AdminLayout>
    </AdminGate>
  );
}
