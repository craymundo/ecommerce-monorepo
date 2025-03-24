import { Product } from "../types/Product";

export const initialProducts: Product[] = [
  {
    id: 1,
    name: "Laptop Pro X",
    description: "Laptop de última generación con procesador i9",
    category: "Electrónicos",
    price: 1299.99,
    stock: 10,
    tax: 0.16,
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: 2,
    name: "Smartphone Galaxy Ultra",
    description: "Smartphone con cámara de 108MP y 5G",
    category: "Electrónicos",
    price: 899.99,
    stock: 15,
    tax: 0.16,
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: 3,
    name: "Auriculares Inalámbricos Pro",
    description: "Auriculares con cancelación de ruido",
    category: "Accesorios",
    price: 199.99,
    stock: 20,
    tax: 0.16,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: 4,
    name: "Tablet Air",
    description: "Tablet ligera y potente con pantalla Retina",
    category: "Electrónicos",
    price: 499.99,
    stock: 8,
    tax: 0.16,
    image:
      "https://images.unsplash.com/photo-1542751110-97427bbecf20?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: 5,
    name: "Smartwatch Series 5",
    description: "Reloj inteligente con monitor cardíaco",
    category: "Accesorios",
    price: 299.99,
    stock: 12,
    tax: 0.16,
    image:
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&q=80&w=400",
  },
];
