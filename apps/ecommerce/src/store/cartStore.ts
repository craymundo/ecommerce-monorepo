import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity?: number;
};

interface CartStore {
  cart: CartItem[];
  addToCart: (product: CartItem) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>((set) => ({
  cart: JSON.parse(localStorage.getItem("cart") || "[]"),

  addToCart: (product) =>
    set((state) => {
      const existingItem = state.cart.find((item) => item.id === product.id);

      let updatedCart;
      if (existingItem) {
        updatedCart = state.cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: (item.quantity ?? 0) + 1 }
            : item
        );
      } else {
        updatedCart = [...state.cart, { ...product, quantity: 1 }];
      }

      localStorage.setItem("cart", JSON.stringify(updatedCart));

      return { cart: updatedCart };
    }),
  updateQuantity: (id, quantity) =>
    set((state) => {
      const updatedCart = state.cart.map((item) =>
        item.id === id ? { ...item, quantity } : item
      );

      localStorage.setItem("cart", JSON.stringify(updatedCart));

      return { cart: updatedCart }; // Update the `cart` property, not `items`
    }),
  removeFromCart: (id) =>
    set((state) => {
      const updatedCart = state.cart.filter((item) => item.id !== id);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return { cart: updatedCart };
    }),

  clearCart: () => {
    localStorage.removeItem("cart");
    return { cart: [] };
  },
}));
