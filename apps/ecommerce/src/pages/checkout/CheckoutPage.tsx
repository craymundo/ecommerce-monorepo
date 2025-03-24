import { useState, useEffect } from "react";
import { useCartStore } from "../../store/cartStore";
import { useProductStore } from "../../store/productStore";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);
  const reduceStock = useProductStore((state) => state.reduceStock);
  const [form, setForm] = useState({ name: "", phone: "", email: "", country: "" });
  const [countries, setCountries] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/region/america")
      .then((res) => res.json())
      .then((data) => setCountries(data.map((c: any) => c.name.common)));
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!countries.includes(form.country)) {
      alert("El país no pertenece a América.");
      return;
    }

    if (cart.length === 0) {
      alert("Tu carrito está vacío.");
      return;
    }

    // Guardar la orden en LocalStorage
    const orders = JSON.parse(localStorage.getItem("orders") || "[]");
    const newOrder = {
      id: Date.now(),
      name: form.name,
      phone: form.phone,
      email: form.email,
      country: form.country,
      items: cart,
      total: cart.reduce((acc, item) => acc + item.price * (item.quantity || 0), 0).toFixed(2),
      date: new Date().toLocaleString(),
    };

    localStorage.setItem("orders", JSON.stringify([...orders, newOrder]));

    // Reducir stock en el catálogo
    cart.forEach((item) => reduceStock(item.id));

    // Vaciar el carrito
    clearCart();

    alert("Compra realizada con éxito. Tu factura ha sido generada.");
    navigate("/invoice");
  };

  return (
    <div>
      <h1>Finalizar Compra</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="tel"
          placeholder="Teléfono"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Correo"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <select value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} required>
          <option value="">Selecciona un país</option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
        <button type="submit">Confirmar compra</button>
      </form>
    </div>
  );
};

export default CheckoutPage;
