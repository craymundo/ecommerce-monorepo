import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./AdminOrderDetail.css";
import { localStorageUtils } from "../../utils/localStorageUtils";

interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  tax: number;
}

interface Order {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  zipCode: string;
  date: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  total: number;
}

const AdminOrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = () => {
      try {
        const storedOrders = localStorageUtils.getItem<Order[]>("orders") || [];
        const foundOrder = storedOrders.find((o) => o.id === parseInt(id || "0"));
        setOrder(foundOrder || null);
      } catch (error) {
        console.error("Error al cargar la orden:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Cargando detalles de la orden...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="error-container">
        <h2>Orden no encontrada</h2>
        <Link to="/admin/orders" className="back-button">
          Volver al listado
        </Link>
      </div>
    );
  }

  return (
    <div className="order-detail-container">
      <div className="order-detail-header">
        <Link to="/admin/orders" className="back-link">
          ← Volver al listado
        </Link>
        <h1>Orden #{order.id}</h1>
        <span className="order-date">{formatDate(order.date)}</span>
      </div>

      <div className="order-detail-grid">
        <div className="order-info-card">
          <h2>Información del Cliente</h2>
          <div className="info-grid">
            <div className="info-item">
              <label>Nombre</label>
              <span>{order.name}</span>
            </div>
            <div className="info-item">
              <label>Email</label>
              <span>{order.email}</span>
            </div>
            <div className="info-item">
              <label>Teléfono</label>
              <span>{order.phone}</span>
            </div>
          </div>
        </div>

        <div className="order-info-card">
          <h2>Dirección de Envío</h2>
          <div className="info-grid">
            <div className="info-item">
              <label>Dirección</label>
              <span>{order.address}</span>
            </div>
            <div className="info-item">
              <label>Ciudad</label>
              <span>{order.city}</span>
            </div>
            <div className="info-item">
              <label>País</label>
              <span>{order.country}</span>
            </div>
            <div className="info-item">
              <label>Código Postal</label>
              <span>{order.zipCode}</span>
            </div>
          </div>
        </div>

        <div className="order-items-card">
          <h2>Productos</h2>
          <div className="items-table-container">
            <table className="items-table">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Cantidad</th>
                  <th>Precio Unit.</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item) => (
                  <tr key={item.id}>
                    <td data-label="Producto">{item.name}</td>
                    <td data-label="Cantidad">{item.quantity}</td>
                    <td data-label="Precio Unit.">${item.price.toFixed(2)}</td>
                    <td data-label="Total">${(item.price * item.quantity).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="order-summary-card">
          <h2>Resumen del Pedido</h2>
          <div className="summary-items">
            <div className="summary-item">
              <span>Subtotal</span>
              <span>${order.subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-item">
              <span>Impuestos</span>
              <span>${order.tax.toFixed(2)}</span>
            </div>
            <div className="summary-item total">
              <span>Total</span>
              <span>${order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrderDetail;