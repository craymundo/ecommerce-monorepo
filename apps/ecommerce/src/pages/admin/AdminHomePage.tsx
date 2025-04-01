import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './AdminHomePage.css';

import recentOrders from './../../assets/icons/recent-orders.svg';
import dollarTotal from './../../assets/icons/dollar-total.svg';
import ordersTotal from './../../assets/icons/orders-total.svg';
import dollarAverage from './../../assets/icons/dollar-average.svg';
import { localStorageUtils } from '../../utils/localStorageUtils';

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
      const orders = localStorageUtils.getItem<Order[]>('orders') || [];
      
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
           

            <img src={ordersTotal} alt="Total Ordenes"  className='icon-class' />
          </div>
          <div className="stat-info">
            <h3>Total Órdenes</h3>
            <p className="stat-value">{stats.totalOrders}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon revenue-icon">
            
            <img src={dollarTotal} alt="Valor Promedio"  className='icon-class'/>
          </div>
          <div className="stat-info">
            <h3>Ingresos Totales</h3>
            <p className="stat-value">${stats.totalRevenue.toFixed(2)}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon average-icon">
            
            <img src={dollarAverage} alt="Valor Promedio"  className='icon-class' />
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
            <img src={recentOrders} alt="Gestionar Ordenes" className='icon-class' />
              Gestionar Órdenes
            </Link>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHomePage;