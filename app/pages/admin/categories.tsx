import { AdminGate } from "../../src/pages/admin/AdminGate";
import { AdminLayout } from "../../src/pages/admin/AdminLayout";
import { AdminCategories } from "../../src/pages/admin/Categories";

export default function AdminCategoriesRoute() {
  return (
    <AdminGate>
      <AdminLayout>
        <AdminCategories />
      </AdminLayout>
    </AdminGate>
  );
}

