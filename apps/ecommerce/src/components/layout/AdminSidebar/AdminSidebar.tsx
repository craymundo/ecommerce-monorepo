import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './AdminSidebar.css';
import closeIcon from "../../../assets/icons/close-icon.svg";

interface AdminSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ isOpen, onToggle }) => {
  const location = useLocation();

  const menuItems = [
    { path: '/admin', icon: '📊', label: 'Dashboard' },
    { path: '/admin/orders', icon: '🛍️', label: 'Órdenes' },
  ];

  return (
    <>
      <div 
        className={`sidebar-overlay ${isOpen ? 'active' : ''}`} 
        onClick={onToggle}
      ></div>
      <aside className={`admin-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h1 className="sidebar-title">Admin Panel</h1>
          <button 
            className="sidebar-close"
            onClick={onToggle}
            aria-label="Close sidebar"
          >
             <img src={closeIcon} alt="Cierre Menú" />
          </button>
        </div>
        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`sidebar-link ${
                location.pathname === item.path ? 'active' : ''
              }`}
            >
              <span className="sidebar-icon">{item.icon}</span>
              <span className="sidebar-text">{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default AdminSidebar; 