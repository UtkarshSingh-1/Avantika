import { MainLayout } from "../src/layouts/MainLayout";
import { LoginPage } from "../src/pages/Login";

export default function LoginRoute() {
  return (
    <MainLayout>
      <LoginPage />
    </MainLayout>
  );
}
