import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout/MainLayout";
import AdminLayout from "../layouts/AdminLayout/AdminLayout";
import AuthLayout from "../layouts/AuthLayout/AuthLayout";
import HomePage from "../pages/home/HomePage";
import AdminHomePage from "../pages/admin/AdminHomePage";
import ProductCatalog from "../pages/products/ProductCatalog";
import CartPage from "../pages/cart/CartPage";
import CheckoutPage from "../pages/checkout/CheckoutPage";
import InvoicePage from "../pages/invoice/InvoicePage";
import AdminOrders from "../pages/admin/AdminOrders";
import AdminOrderDetail from "../pages/admin/AdminOrderDetail";
import LoginPage from "../pages/auth/LoginPage";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Layout Principal */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<ProductCatalog />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/invoice" element={<InvoicePage />} />
          <Route path="/invoice/:orderId" element={<InvoicePage />} />
        </Route>

        {/* Layout de Autenticación */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>

        {/* Layout de Administración */}
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminHomePage />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin/orders/:id" element={<AdminOrderDetail />} />
        </Route>

      </Routes>
    </Router>
  );
};

export default AppRoutes;
