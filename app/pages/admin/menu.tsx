import { AdminGate } from "../../src/pages/admin/AdminGate";
import { AdminLayout } from "../../src/pages/admin/AdminLayout";
import { AdminMenu } from "../../src/pages/admin/Menu";

export default function AdminMenuRoute() {
  return (
    <AdminGate>
      <AdminLayout>
        <AdminMenu />
      </AdminLayout>
    </AdminGate>
  );
}
