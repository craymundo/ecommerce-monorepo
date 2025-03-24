import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './AdminSidebar.css';

const AdminSidebar: React.FC = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/admin', label: 'Dashboard', icon: '📊' },
    { path: '/admin/orders', label: 'Órdenes', icon: '📦' },
    { path: '/admin/products', label: 'Productos', icon: '🏷️' },
    { path: '/admin/categories', label: 'Categorías', icon: '📁' },
    { path: '/admin/users', label: 'Usuarios', icon: '👥' },
  ];

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-container">
        <div className="admin-sidebar-header">
          <h2>Admin</h2>
        </div>
        <nav className="admin-sidebar-nav">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`admin-sidebar-link ${
                location.pathname === item.path ? 'active' : ''
              }`}
            >
              <span className="admin-sidebar-icon">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default AdminSidebar; 