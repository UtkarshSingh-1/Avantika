import { MainLayout } from "../src/layouts/MainLayout";
import { SignupPage } from "../src/pages/Signup";

export default function SignupRoute() {
  return (
    <MainLayout>
      <SignupPage />
    </MainLayout>
  );
}
