import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../../components/layout/AdminSidebar/AdminSidebar';
import AdminHeader from '../../components/layout/AdminHeader/AdminHeader';
import './AdminLayout.css';

interface AdminLayoutProps {
  children?: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-content">
        <AdminHeader />
        <main className="admin-main">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout; 