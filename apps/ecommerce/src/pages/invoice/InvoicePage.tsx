import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./InvoicePage.css";
import { Button } from "ui-ecommerce";
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
  date: string;
  email: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  zipCode: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  total: number;
}

const InvoicePage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = () => {
      try {
        const orders = localStorageUtils.getItem<Order[]>("orders") || [];
        let foundOrder: Order | undefined;

        if (orderId) {
          foundOrder = orders.find((o: Order) => o.id === Number(orderId));
        } else {
          const lastOrderId = localStorage.getItem("lastOrderId");
          if (lastOrderId) {
            foundOrder = orders.find(
              (o: Order) => o.id === Number(lastOrderId)
            );
          } else {
            foundOrder = orders[orders.length - 1];
          }
        }

        if (!foundOrder) {
          navigate("/404");
          return;
        }

        setOrder(foundOrder);
      } catch (error) {
        console.error("Error al cargar la orden:", error);
        navigate("/404");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId, navigate]);

  if (loading) {
    return (
      <div className="invoice-loading">
        <div className="loading-spinner"></div>
        <p>Cargando factura...</p>
      </div>
    );
  }

  if (!order) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="invoice-container">
      <div className="invoice-actions">
        <Button variant="primary" size="md" onClick={handlePrint}>
          Imprimir Factura
        </Button>
      </div>

      <div className="invoice-content">
        <div className="invoice-header">
          <div className="company-info">
            <h1>FACTURA</h1>
            <div className="company-details">
              <h2>Tu Empresa</h2>
              <p>Dirección de la Empresa</p>
              <p>Ciudad, País</p>
              <p>Tel: +1234567890</p>
            </div>
          </div>
          <div className="invoice-details">
            <div className="invoice-number">
              <h3>Factura #</h3>
              <p>{order.id}</p>
            </div>
            <div className="invoice-date">
              <h3>Fecha</h3>
              <p>{formatDate(order.date)}</p>
            </div>
          </div>
        </div>

        <div className="invoice-body">
          <div className="customer-details">
            <h3>Facturar a:</h3>
            <p className="customer-name">{order.name}</p>
            <p>{order.address}</p>
            <p>
              {order.city}, {order.zipCode}
            </p>
            <p>{order.country}</p>
            <p>Email: {order.email}</p>
            <p>Tel: {order.phone}</p>
          </div>

          <div className="invoice-table">
            <table>
              <thead>
                <tr>
                  <th>Descripción</th>
                  <th>Cantidad</th>
                  <th>Precio Unit.</th>
                  <th>Impuesto</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>${item.price.toFixed(2)}</td>
                    <td>
                      ${(item.price * item.quantity * item.tax).toFixed(2)}
                    </td>
                    <td>
                      $
                      {(item.price * item.quantity * (1 + item.tax)).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="invoice-summary">
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>${order.subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Impuestos:</span>
              <span>${order.tax.toFixed(2)}</span>
            </div>
            <div className="summary-row total">
              <span>Total:</span>
              <span>${order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="invoice-footer">
          <p>Gracias por su compra</p>
          <div className="payment-info">
            <h4>Información de Pago</h4>
            <p>Banco: Tu Banco</p>
            <p>Cuenta: XXXX-XXXX-XXXX-XXXX</p>
            <p>Swift: XXXXXXXX</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoicePage;
