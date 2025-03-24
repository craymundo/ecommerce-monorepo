import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../components/layout/Header/Header';
import Footer from '../../components/layout/Footer/Footer';
import './MainLayout.css';

interface MainLayoutProps {
  children?: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="main-layout">
      <Header />
      <main className="main-content">
        {children || <Outlet />}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout; 