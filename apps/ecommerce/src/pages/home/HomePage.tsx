import { Link } from "react-router-dom";
import "./HomePage.css";
const HomePage = () => (
  <div className="home-container">
    <h1>Bienvenido a nuestra tienda</h1>
    <Link to="/catalog">Ver productos</Link>
  </div>
);

export default HomePage;