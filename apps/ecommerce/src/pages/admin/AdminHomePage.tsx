import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './AdminHomePage.css';

interface Order {
  id: number;
  date: string;
  total: number;
  status?: string;
}

interface DashboardStats {
  totalOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
  recentOrders: Order[];
}

const AdminHomePage = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalOrders: 0,
    totalRevenue: 0,
    averageOrderValue: 0,
    recentOrders: []
  });

  useEffect(() => {
    const calculateStats = () => {
      const orders: Order[] = JSON.parse(localStorage.getItem('orders') || '[]');
      
      const totalOrders = orders.length;
      const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
      const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
      const recentOrders = orders
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 5);

      setStats({
        totalOrders,
        totalRevenue,
        averageOrderValue,
        recentOrders
      });
    };

    calculateStats();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>Panel de Administración</h1>
        <p className="welcome-message">Bienvenido al panel de control</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon orders-icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <div className="stat-info">
            <h3>Total Órdenes</h3>
            <p className="stat-value">{stats.totalOrders}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon revenue-icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="stat-info">
            <h3>Ingresos Totales</h3>
            <p className="stat-value">${stats.totalRevenue.toFixed(2)}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon average-icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <div className="stat-info">
            <h3>Valor Promedio</h3>
            <p className="stat-value">${stats.averageOrderValue.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card recent-orders">
          <div className="card-header">
            <h2>Órdenes Recientes</h2>
            <Link to="/admin/orders" className="view-all">
              Ver todas
            </Link>
          </div>
          {stats.recentOrders.length > 0 ? (
            <div className="orders-list">
              {stats.recentOrders.map((order) => (
                <Link to={`/admin/orders/${order.id}`} key={order.id} className="order-item">
                  <div className="order-info">
                    <span className="order-id">#{order.id}</span>
                    <span className="order-date">{formatDate(order.date)}</span>
                  </div>
                  <span className="order-amount">${order.total.toFixed(2)}</span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>No hay órdenes recientes</p>
            </div>
          )}
        </div>

        <div className="dashboard-card quick-actions">
          <h2>Acciones Rápidas</h2>
          <div className="actions-grid">
            <Link to="/admin/orders" className="action-button">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Gestionar Órdenes
            </Link>
            <Link to="/admin/products" className="action-button">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              Gestionar Productos
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHomePage;