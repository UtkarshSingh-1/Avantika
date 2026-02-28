import { MainLayout } from "../src/layouts/MainLayout";
import { OrderPage } from "../src/pages/Order";

export default function OrderRoute() {
  return (
    <MainLayout>
      <OrderPage />
    </MainLayout>
  );
}
