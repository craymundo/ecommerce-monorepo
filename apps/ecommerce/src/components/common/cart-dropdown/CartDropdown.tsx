import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCartStore } from "../../../store/useCartStore";
import "./CartDropdown.css";

interface CartDropdownProps {
  onClose?: () => void;
}

const CartDropdown: React.FC<CartDropdownProps> = ({ onClose = () => {} }) => {
  const { items, total, removeItem } = useCartStore();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [onClose]);

  return (
    <div ref={dropdownRef} className="cart-dropdown">
      <div className="cart-dropdown-content">
        <h3 className="cart-dropdown-title">Carrito de Compras</h3>
        
        {items.length > 0 ? (
          <>
            <ul className="cart-items-list">
              {items.map((item) => (
                <li key={item.id} className="cart-item">
                  <div className="cart-item-details">
                    <span className="cart-item-name">{item.name}</span>
                    <div className="cart-item-price">
                      ${item.price} x {item.quantity}
                    </div>
                  </div>
                  <button 
                    onClick={() => removeItem(item.id)}
                    className="cart-item-remove"
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
            
            <div className="cart-total-section">
              <div className="cart-total-container">
                <span className="cart-total-label">Total:</span>
                <span className="cart-total-amount">${total.toFixed(2)}</span>
              </div>
              
              <Link 
                to="/cart" 
                className="cart-view-button"
              >
                Ver Carrito Completo
              </Link>
            </div>
          </>
        ) : (
          <p className="cart-empty-message">El carrito está vacío</p>
        )}
      </div>
    </div>
  );
};

export default CartDropdown;