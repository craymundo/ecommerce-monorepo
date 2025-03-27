import { useCartStore } from "../../store/";
import { Link } from "react-router-dom";
import "./CartPage.css";
import imageNotFound from "../../assets/image-not-found-icon.svg";

const CartPage = () => {
  const { items, total, subtotal, tax, removeItem, clearCart, updateQuantity } = useCartStore();

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (newQuantity > 0) {
      try {
        updateQuantity(productId, newQuantity);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="cart-container">
      <div className="cart-content">
        <h1 className="cart-title">Carrito de Compras</h1>
        
        {items.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-cart-icon">🛒</div>
            <h2>Tu carrito está vacío</h2>
            <p>¿No sabes qué comprar? ¡Miles de productos te esperan!</p>
            <Link to="/catalog" className="button-primary">
              Continuar Comprando
            </Link>
          </div>
        ) : (
          <div className="cart-grid">
            <div className="cart-items">
              {items.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="item-image">
                    <img src={imageNotFound} alt={item.name} />
                  </div>
                  <div className="item-details">
                    <h3>{item.name}</h3>
                    <p className="item-price">${item.price.toFixed(2)}</p>
                    <div className="item-actions">
                      <div className="quantity-controls">
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          className="quantity-button"
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span className="quantity">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="quantity-button"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="remove-button"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="cart-summary">
              <h2>Resumen de la Orden</h2>
              <div className="summary-details">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Impuestos</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="summary-row total">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              <div className="cart-actions">
                <Link to="/checkout" className="button-primary">
                  Proceder al Pago
                </Link>
                <button onClick={clearCart} className="button-secondary">
                  Vaciar Carrito
                </button>
                <Link to="/catalog" className="button-link">
                  Seguir Comprando
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;