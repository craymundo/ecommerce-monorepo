import { useCartStore } from "../../store/cartStore";
import { Link } from "react-router-dom";
import "./CartPage.css";

const CartPage = () => {
  const { cart, removeFromCart, clearCart } = useCartStore();

  const totalPrice = cart
    .reduce((acc, item) => acc + item.price * (item.quantity ?? 1), 0)
    .toFixed(2);

  return (
    <div className="cart-container">
      <header className="cart-header">
        <h1>Carrito de Compras</h1>
        <Link to="/login" className="login-link">Iniciar Sesión</Link>
      </header>
      <div className="cart-content">
        {cart.length === 0 ? (
          <div className="empty-cart">
            <p>Tu carrito está vacío.</p>
            <Link to="/" className="back-to-catalog">Ir al Catálogo de Productos</Link>
          </div>
        ) : (
          <>
            <table className="cart-table">
              <thead>
                <tr>
                  <th>Imagen</th>
                  <th>Producto</th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <img
                        src="https://via.placeholder.com/100"
                        alt={item.name}
                        className="product-image"
                      />
                    </td>
                    <td>{item.name}</td>
                    <td>${item.price.toFixed(2)}</td>
                    <td>{item.quantity}</td>
                    <td>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="remove-button"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="cart-summary">
              <h2>Total: ${totalPrice}</h2>
              <div className="cart-actions">
                <button onClick={clearCart} className="clear-cart-button">
                  Vaciar Carrito
                </button>
                <Link to="/checkout" className="checkout-button">
                  Ir a Pagar
                </Link>
              </div>
              <Link to="/catalog" className="back-to-catalog">Ir al Catálogo de Productos</Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;