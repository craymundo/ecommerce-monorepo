import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import AdminHeader from "../../components/AdminHeader";
import "./AdminOrderDetail.css";

const AdminOrderDetail = () => {
  const { id } = useParams();

  interface Order {
    id: number;
    name: string;
    total: number;
    country: string;
    date: string;
    items: { id: number; name: string; price: number; quantity: number }[];
  }

  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const storedOrders: Order[] = JSON.parse(localStorage.getItem("orders") || "[]");
    const foundOrder = storedOrders.find((o: Order) => o.id === parseInt(id || "0"));
    setOrder(foundOrder || null);
  }, [id]);

  if (!order) return <p className="loading">Cargando...</p>;

  return (
    <div>
      <AdminHeader />
      <div className="order-detail-container">
        <div className="order-card">
          <h1>Detalle de la Orden #{order.id}</h1>
          <div className="order-info">
            <p><strong>Cliente:</strong> {order.name}</p>
            <p><strong>Total:</strong> ${order.total}</p>
            <p><strong>País:</strong> {order.country}</p>
            <p><strong>Fecha:</strong> {order.date}</p>
          </div>
          <h2>Productos:</h2>
          <ul className="order-items">
            {order.items.map((item) => (
              <li key={item.id}>
                {item.name} - ${item.price} x {item.quantity}
              </li>
            ))}
          </ul>
          <div className="order-actions">
            <Link to="/admin/orders" className="back-button">Regresar al Listado</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrderDetail;