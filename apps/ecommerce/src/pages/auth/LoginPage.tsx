import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import "./LoginPage.css";

const LoginPage = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const setUserRole = useAuthStore((state) => state.setUserRole);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Mock de credenciales
    if (form.username === "admin" && form.password === "admin") {
      setUserRole("admin");
      navigate("/admin");
    } else {
      alert("Credenciales incorrectas");
    }
  };

  return (
    <div className="login-container">
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
        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
};

export default LoginPage;