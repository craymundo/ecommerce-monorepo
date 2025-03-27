import { Link } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => (
  <div className="home-container">
    <section className="hero-section">
      <div className="hero-content">
        <h1>Descubre Nuestra Colección</h1>
        <p className="hero-subtitle">Productos de calidad para tu estilo de vida</p>
        <Link to="/catalog" className="cta-button">
          Explorar Catálogo
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>
    </section>

    <section className="features-section">
      <div className="feature-card">
        <div className="feature-icon">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        </div>
        <h3>Calidad Premium</h3>
        <p>Productos seleccionados cuidadosamente para garantizar la mejor calidad</p>
      </div>

      <div className="feature-card">
        <div className="feature-icon">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3>Mejores Precios</h3>
        <p>Precios competitivos y ofertas especiales para nuestros clientes</p>
      </div>

      <div className="feature-card">
        <div className="feature-icon">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3>Garantía Total</h3>
        <p>Satisfacción garantizada en todos nuestros productos</p>
      </div>
    </section>

    <section className="cta-section">
      <div className="cta-content">
        <h2>¿Listo para comenzar?</h2>
        <p>Explora nuestra colección y encuentra lo que necesitas</p>
        <Link to="/catalog" className="secondary-cta">
          Ver Catálogo Completo
        </Link>
      </div>
    </section>
  </div>
);

export default HomePage;