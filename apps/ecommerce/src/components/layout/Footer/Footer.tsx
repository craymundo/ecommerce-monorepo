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
            <li>Email: calvarador17@gmail.com</li>
            <li>Teléfono: (+51) 958649975</li>
            <li>Dirección: Lima - Miraflores</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Tienda Virtual. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer; 