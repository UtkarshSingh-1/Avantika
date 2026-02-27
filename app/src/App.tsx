import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import { Home } from "./pages/Home";
import { MenuPage } from "./pages/Menu";
import { OrderPage } from "./pages/Order";
import { CartPage } from "./pages/Cart";
import { ReservationPage } from "./pages/Reservation";
import { LoginPage } from "./pages/Login";
import { OtpPage } from "./pages/Otp";
import { AdminGate } from "./pages/admin/AdminGate";
import { AdminLayout } from "./pages/admin/AdminLayout";
import { AdminDashboard } from "./pages/admin/Dashboard";
import { AdminOrders } from "./pages/admin/Orders";
import { AdminMenu } from "./pages/admin/Menu";
import { AdminTables } from "./pages/admin/Tables";
import { AdminReservations } from "./pages/admin/Reservations";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/reservation" element={<ReservationPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/otp" element={<OtpPage />} />
        </Route>
        <Route
          path="/admin"
          element={
            <AdminGate>
              <AdminLayout />
            </AdminGate>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="menu" element={<AdminMenu />} />
          <Route path="tables" element={<AdminTables />} />
          <Route path="reservations" element={<AdminReservations />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
