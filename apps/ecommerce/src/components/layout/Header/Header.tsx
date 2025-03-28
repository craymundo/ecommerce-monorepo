import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCartStore } from "../../../store/useCartStore";
import cartIcon from "../../../assets/icons/cart.svg";
import navIcon from "../../../assets/icons/navicon.svg";
import closeIcon from "../../../assets/icons/close-icon.svg";

import "./Header.css";
import CartDropdown from "../../common/cart-dropdown/CartDropdown";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { items } = useCartStore();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isCartOpen) setIsCartOpen(false);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
    if (isMenuOpen) setIsMenuOpen(false);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="header-logo">
          Tienda Virtual
        </Link>
        <button
          className="mobile-menu-button"
          onClick={toggleMenu}
          aria-label="Menú"
        >
          {isMenuOpen ? (
            <img src={closeIcon} alt="Cierre Menú" />
          ) : (
            <img src={navIcon} alt="Menú" />
          )}
        </button>
        <nav className={`header-nav ${isMenuOpen ? "active" : ""}`}>
          <Link
            to="/catalog"
            className="nav-link"
            onClick={() => setIsMenuOpen(false)}
          >
            Catálogo
          </Link>
          <div className="cart-icon-container" onClick={toggleCart}>
            <img src={cartIcon} alt="Carrito" className="cart-icon-img" />
            {items.length > 0 && (
              <span className="cart-count">{items.length}</span>
            )}
            {isCartOpen && <CartDropdown onClose={closeCart} />}
          </div>
          <Link
            to="/login"
            className="nav-link"
            onClick={() => setIsMenuOpen(false)}
          >
            Iniciar Sesión
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
