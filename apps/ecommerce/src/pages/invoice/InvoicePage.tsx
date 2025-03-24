import { useCartStore } from "../../store/cartStore";

const InvoicePage = () => {
  const cart = useCartStore((state) => state.cart);

  const totalPrice = cart.reduce((acc, item) => acc + item.price * (item.quantity ?? 1), 0).toFixed(2);

  return (
    <div>
      <h1>Factura</h1>
      {cart.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <>
          <ul>
            {cart.map((item) => (
              <li key={item.id}>
                {item.name} - ${item.price.toFixed(2)} x {item.quantity ?? 1} = ${(item.price * (item.quantity ?? 1)).toFixed(2)}
              </li>
            ))}
          </ul>
          <h2>Total: ${totalPrice}</h2>
        </>
      )}
    </div>
  );
};

export default InvoicePage;
