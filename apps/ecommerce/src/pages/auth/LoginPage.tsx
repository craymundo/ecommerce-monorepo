import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import "./LoginPage.css";
import { Button } from "ui-ecommerce";
import arrowLeft from './../../assets/icons/arrow-left.svg';

const LoginPage = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const setUserRole = useAuthStore((state) => state.setUserRole);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.username === "admin" && form.password === "admin") {
      setUserRole("admin");
      navigate("/admin");
    } else {
      alert("Credenciales incorrectas");
    }
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <Link to="/" className="back-to-store">
        <img src={arrowLeft} alt="Regresar"  />
          Regresar a la tienda
        </Link>
        
        <form className="login-form" onSubmit={handleSubmit}>
          <h1>Iniciar Sesión</h1>
          <input
            type="text"
            placeholder="Usuario"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          
              <Button variant="primary" size="md" type="submit">
              Ingresar
                  </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;