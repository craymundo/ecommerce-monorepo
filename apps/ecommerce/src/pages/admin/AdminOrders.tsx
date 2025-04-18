import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./AdminOrders.css";

import search from './../../assets/icons/search.svg';
import { localStorageUtils } from "../../utils/localStorageUtils";

interface Order {
  id: string;
  name: string;
  total: number;
  country: string;
  date: string;
  status?: string;
}

const AdminOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Order;
    direction: 'asc' | 'desc';
  }>({ key: 'date', direction: 'desc' });

  useEffect(() => {
    const storedOrders = localStorageUtils.getItem<Order[]>("orders") || [];
    setOrders(storedOrders);
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const handleSort = (key: keyof Order) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc',
    });
  };

  const sortedOrders = [...orders].sort((a, b) => {
    if (sortConfig.key === 'total') {
      return sortConfig.direction === 'asc' ? a.total - b.total : b.total - a.total;
    }
    
    if (sortConfig.key === 'date') {
      return sortConfig.direction === 'asc' 
        ? new Date(a.date).getTime() - new Date(b.date).getTime()
        : new Date(b.date).getTime() - new Date(a.date).getTime();
    }

    const aValue = String(a[sortConfig.key]);
    const bValue = String(b[sortConfig.key]);
    
    return sortConfig.direction === 'asc'
      ? aValue.localeCompare(bValue)
      : bValue.localeCompare(aValue);
  });

  const filteredOrders = sortedOrders.filter(order => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      order.name.toLowerCase().includes(searchTermLower) ||
      String(order.id).includes(searchTermLower) ||
      order.country.toLowerCase().includes(searchTermLower)
    );
  });

  return (
    <div className="admin-orders">
      <div className="orders-header">
        <h1>Órdenes de Compra</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Buscar por cliente, ID o país..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <img src={search} alt="Buscar Orden" className="search-icon"  />
        </div>
      </div>

      <div className="table-container">
        <table className="orders-table">
          <thead>
            <tr>
              <th onClick={() => handleSort('id')}>
                ID
                <span className="sort-icon">↕</span>
              </th>
              <th onClick={() => handleSort('date')}>
                Fecha
                <span className="sort-icon">↕</span>
              </th>
              <th onClick={() => handleSort('name')}>
                Cliente
                <span className="sort-icon">↕</span>
              </th>
              <th onClick={() => handleSort('total')}>
                Total
                <span className="sort-icon">↕</span>
              </th>
              <th onClick={() => handleSort('country')}>
                País
                <span className="sort-icon">↕</span>
              </th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id}>
                <td data-label="ID">{order.id}</td>
                <td data-label="Fecha">{formatDate(order.date)}</td>
                <td data-label="Cliente">{order.name}</td>
                <td data-label="Total" className="amount">
                  ${order.total.toFixed(2)}
                </td>
                <td data-label="País">{order.country}</td>
                <td data-label="Acciones">
                  <Link to={`/admin/orders/${order.id}`} className="view-button">
                    Ver Detalle
                  </Link>

                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredOrders.length === 0 && (
          <div className="no-results">
            No se encontraron órdenes que coincidan con la búsqueda
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;