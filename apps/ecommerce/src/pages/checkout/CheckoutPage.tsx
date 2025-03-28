import { useState } from "react";
import { useCartStore } from "../../store";
import { useNavigate } from "react-router-dom";
import "./CheckoutPage.css";
import { CheckoutFormData, FormErrors } from "../../types/hooks.types";
import { useCountries } from "../../hooks/api/useCountries";
import { Button } from "ui-ecommerce";

const CheckoutPage = () => {
  const { items, total, subtotal, tax, clearCart } = useCartStore();
  const navigate = useNavigate();
  const { countries, loading: loadingCountries, error: countryError } = useCountries();

  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState<CheckoutFormData>({
    email: "",
    name: "",
    phone: "",
    country: "",
    address: "",
    city: "",
    zipCode: ""
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case "email":
        if (!value) return "El correo electrónico es requerido";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return "Ingrese un correo electrónico válido";
        }
        break;
      case "name":
        if (!value) return "El nombre es requerido";
        if (value.length < 3) return "El nombre debe tener al menos 3 caracteres";
        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value)) {
          return "El nombre solo debe contener letras";
        }
        break;
      case "phone":
        if (!value) return "El teléfono es requerido";
        if (!/^\+?[\d\s-]{8,}$/.test(value)) {
          return "Ingrese un número de teléfono válido";
        }
        break;
      case "country":
        if (!value) return "El país es requerido";
        if (!countries.includes(value)) return "Por favor seleccione un país válido de América";
        break;
      case "address":
        if (!value) return "La dirección es requerida";
        if (value.length < 5) return "Ingrese una dirección válida";
        break;
      case "city":
        if (!value) return "La ciudad es requerida";
        if (value.length < 2) return "Ingrese una ciudad válida";
        break;
      case "zipCode":
        if (!value) return "El código postal es requerido";
        if (!/^\d{4,6}$/.test(value)) {
          return "Ingrese un código postal válido";
        }
        break;
    }
    return "";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (touched[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: validateField(name, value)
      }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    setErrors(prev => ({
      ...prev,
      [name]: validateField(name, value)
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;
  
    (Object.keys(formData) as (keyof CheckoutFormData)[]).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
        isValid = false;
      }
    });
  
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    if (items.length === 0) {
      alert("Tu carrito está vacío");
      return;
    }

    setIsSubmitting(true);

    try {
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log(formData);
      const order = {
        id: Date.now(),
        ...formData,
        items,
        subtotal,
        tax,
        total,
        date: new Date().toISOString()
      };

      const orders = JSON.parse(localStorage.getItem("orders") || "[]");
      localStorage.setItem("orders", JSON.stringify([...orders, order]));

      clearCart();
      navigate(`/invoice/${order.id}`);
    } catch (error) {
      console.error("Error al procesar la orden:", error);
      alert("Hubo un error al procesar tu orden. Por favor intenta nuevamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="checkout-container">
      <div className="checkout-content">
        <div className="checkout-form-section">
          <h1>Información de Contacto</h1>
          <form onSubmit={handleSubmit} className="checkout-form">
            <div className="form-group">
              <label htmlFor="email">Correo Electrónico</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.email ? 'error' : ''}
                placeholder="tu@email.com"
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="name">Nombre Completo</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.name ? 'error' : ''}
                placeholder="Juan Pérez"
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="phone">Teléfono</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.phone ? 'error' : ''}
                  placeholder="+1234567890"
                />
                {errors.phone && <span className="error-message">{errors.phone}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="country">País</label>
                <select
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.country ? 'error' : ''}
                  disabled={loadingCountries}
                >
                  <option value="">
                    {loadingCountries 
                      ? "Cargando países..." 
                      : "Selecciona un país"}
                  </option>
                  {countries.map(country => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
                {errors.country && (
                  <span className="error-message">{errors.country}</span>
                )}
                {countryError && (
                  <span className="error-message">{countryError}</span>
                )}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="address">Dirección</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.address ? 'error' : ''}
                placeholder="Calle Principal #123"
              />
              {errors.address && <span className="error-message">{errors.address}</span>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="city">Ciudad</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.city ? 'error' : ''}
                  placeholder="Ciudad"
                />
                {errors.city && <span className="error-message">{errors.city}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="zipCode">Código Postal</label>
                <input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.zipCode ? 'error' : ''}
                  placeholder="12345"
                />
                {errors.zipCode && <span className="error-message">{errors.zipCode}</span>}
              </div>
            </div>
          </form>
        </div>

        <div className="checkout-summary-section">
          <div className="order-summary">
            <h2>Resumen del Pedido</h2>
            <div className="order-items">
              {items.map(item => (
                <div key={item.id} className="order-item">
                  <div className="item-info">
                    <span className="item-name">{item.name}</span>
                    <span className="item-quantity">x{item.quantity}</span>
                  </div>
                  <span className="item-price">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            
            <div className="order-totals">
              <div className="total-row">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="total-row">
                <span>Impuestos</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="total-row grand-total">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

           

            <Button
                            variant="primary"
                            size="md"
                            fullWidth={true}
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? 'Procesando...' : 'Confirmar Pedido'}
                          </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
