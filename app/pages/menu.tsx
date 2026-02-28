import { MainLayout } from "../src/layouts/MainLayout";
import { MenuPage } from "../src/pages/Menu";

export default function MenuRoute() {
  return (
    <MainLayout>
      <MenuPage />
    </MainLayout>
  );
}
