import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import "./AdminHeader.css";

const AdminHeader = () => {
  const userRole = useAuthStore((state) => state.userRole);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="admin-header">
      <div className="admin-header__content">
        <h1>Panel de Administrador</h1>
        <div className="admin-header__menu">
          <span>Rol: {userRole}</span>
          <Link to="/admin/orders">Órdenes</Link>
          <button onClick={handleLogout}>Cerrar Sesión</button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;