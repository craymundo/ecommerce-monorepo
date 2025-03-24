import React from 'react';
import { Outlet } from 'react-router-dom';
import './AuthLayout.css';

interface AuthLayoutProps {
  children?: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="auth-layout">
      <div className="auth-container">
        <div className="auth-content">
          {children || <Outlet />}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout; 