import { AdminGate } from "../../src/pages/admin/AdminGate";
import { AdminLayout } from "../../src/pages/admin/AdminLayout";
import { AdminTables } from "../../src/pages/admin/Tables";

export default function AdminTablesRoute() {
  return (
    <AdminGate>
      <AdminLayout>
        <AdminTables />
      </AdminLayout>
    </AdminGate>
  );
}
