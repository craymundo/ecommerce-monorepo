import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./AdminOrders.css";
import AdminHeader from "../../components/AdminHeader";

const AdminOrders = () => {
  interface Order {
    id: string;
    name: string;
    total: number;
    country: string;
  }

  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    setOrders(storedOrders);
  }, []);

  return (
    <div>
      <AdminHeader />
      <div className="admin-orders">
        <h1>Órdenes de Compra</h1>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Cliente</th>
              <th>Total</th>
              <th>País</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.name}</td>
                <td>${order.total}</td>
                <td>{order.country}</td>
                <td>
                  <Link to={`/admin/orders/${order.id}`}>Ver Detalle</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrders;