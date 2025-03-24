import React from 'react';
import { Link } from 'react-router-dom';
import './AdminHeader.css';

const AdminHeader: React.FC = () => {
  return (
    <header className="admin-header">
      <div className="admin-header-container">
        <div className="admin-header-left">
          <h1>Panel de Administración</h1>
        </div>
        <div className="admin-header-right">
          <Link to="/" className="admin-header-link">
            Ver Tienda
          </Link>
          <button className="admin-header-button">
            Cerrar Sesión
          </button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader; 