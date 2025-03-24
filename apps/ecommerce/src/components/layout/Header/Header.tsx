import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../../../store/useCartStore';
import cartIcon from '../../../assets/icons/cart.svg';
import './Header.css';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { items, total } = useCartStore();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isCartOpen) setIsCartOpen(false);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
    if (isMenuOpen) setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="header-logo">
          Ecommerce
        </Link>
        <button 
          className="mobile-menu-button"
          onClick={toggleMenu}
          aria-label="Menú"
        >
          {isMenuOpen ? '✕' : '☰'}
        </button>
        <nav className={`header-nav ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/catalog" className="nav-link" onClick={() => setIsMenuOpen(false)}>
            Catálogo
          </Link>
          <div className="cart-icon-container" onClick={toggleCart}>
            <img
              src={cartIcon}
              alt="Carrito"
              className="cart-icon-img"
            />
            {items.length > 0 && (
              <span className="cart-count">{items.length}</span>
            )}
          </div>
          <Link to="/login" className="nav-link" onClick={() => setIsMenuOpen(false)}>
            Iniciar Sesión
          </Link>
        </nav>
        {isCartOpen && (
          <div className="cart-dropdown">
            <h3>Carrito de Compras</h3>
            {items.length > 0 ? (
              <>
                <ul>
                  {items.map((item) => (
                    <li key={item.id}>
                      {item.name} - ${item.price} x {item.quantity}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 font-bold">Total: ${total.toFixed(2)}</p>
              </>
            ) : (
              <p>El carrito está vacío</p>
            )}
            <Link 
              to="/cart" 
              className="view-cart-link"
              onClick={() => setIsCartOpen(false)}
            >
              Ver Carrito Completo
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header; 