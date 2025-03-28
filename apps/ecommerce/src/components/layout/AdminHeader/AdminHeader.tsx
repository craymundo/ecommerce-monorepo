import React from 'react';
import './AdminHeader.css';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../store/authStore';
import navIcon from "../../../assets/icons/navicon.svg";

interface AdminHeaderProps {
  onMenuClick: () => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ onMenuClick }) => {
  const userRole = useAuthStore((state) => state.userRole);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="admin-header">
      <div className="admin-header-content">
        <button 
          className="menu-toggle"
          onClick={onMenuClick}
          aria-label="Toggle menu"
        >
          <img src={navIcon} alt="Menú"  />
        </button>
        <div className="admin-header-right">
          <span className="admin-role">Rol: {userRole}</span>
          <button className="logout-button" onClick={handleLogout}>Cerrar Sesión</button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader; 