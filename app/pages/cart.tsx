import { MainLayout } from "../src/layouts/MainLayout";
import { CartPage } from "../src/pages/Cart";

export default function CartRoute() {
  return (
    <MainLayout>
      <CartPage />
    </MainLayout>
  );
}
