import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../../components/layout/AdminSidebar/AdminSidebar';
import AdminHeader from '../../components/layout/AdminHeader/AdminHeader';
import './AdminLayout.css';

interface AdminLayoutProps {
  children?: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="admin-layout">
      <AdminSidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} />
      <div className={`admin-main ${!isSidebarOpen ? 'sidebar-collapsed' : ''}`}>
        <AdminHeader onMenuClick={toggleSidebar} />
        <main className="admin-content">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout; 