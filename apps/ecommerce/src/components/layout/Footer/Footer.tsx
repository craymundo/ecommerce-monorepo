import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Sobre Nosotros</h3>
          <p>Tu tienda en línea de confianza para todas tus necesidades de compra.</p>
        </div>
        <div className="footer-section">
          <h3>Enlaces Rápidos</h3>
          <ul>
            <li><a href="/catalog">Catálogo</a></li>
            <li><a href="/cart">Carrito</a></li>
            <li><a href="/checkout">Checkout</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Contacto</h3>
          <ul>
            <li>Email: info@ecommerce.com</li>
            <li>Teléfono: (123) 456-7890</li>
            <li>Dirección: Calle Principal 123</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Ecommerce. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer; 