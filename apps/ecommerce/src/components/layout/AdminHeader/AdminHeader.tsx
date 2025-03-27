import React from 'react';
import './AdminHeader.css';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../store/authStore';

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
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
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