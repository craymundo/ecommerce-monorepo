import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { useProductStore } from "./useProductStore";
import { CartStore } from "../types/Cart";

export const useCartStore = create<CartStore>()(
  devtools(
    persist(
      (set, get) => ({
        items: [],

        addItem: (productId: number) => {
          try {
            const product = useProductStore.getState().getProduct(productId);
            if (!product) throw new Error("Producto no encontrado");

            const items = get().items;
            const existingItem = items.find((item) => item.id === productId);

            if (existingItem) {
              // Verificar stock antes de incrementar
              useProductStore.getState().updateStock(productId, 1);

              set({
                items: items.map((item) =>
                  item.id === productId
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
                ),
              });
            } else {
              // Verificar stock antes de agregar
              useProductStore.getState().updateStock(productId, 1);

              set({
                items: [
                  ...items,
                  {
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    quantity: 1,
                    tax: product.tax,
                  },
                ],
              });
            }
          } catch (error) {
            console.error("Error al agregar al carrito:", error);
            throw error;
          }
        },

        removeItem: (productId: number) => {
          const item = get().items.find((i) => i.id === productId);
          if (item) {
            // Restaurar el stock al eliminar del carrito
            try {
              useProductStore.getState().updateStock(productId, -item.quantity);
              set({
                items: get().items.filter((item) => item.id !== productId),
              });
            } catch (error) {
              console.error("Error al eliminar del carrito:", error);
              throw error;
            }
          }
        },

        updateQuantity: (productId: number, newQuantity: number) => {
          const items = get().items;
          const item = items.find((i) => i.id === productId);

          if (item) {
            const quantityDiff = newQuantity - item.quantity;
            try {
              useProductStore.getState().updateStock(productId, quantityDiff);
              set({
                items: items.map((item) =>
                  item.id === productId
                    ? { ...item, quantity: newQuantity }
                    : item
                ),
              });
            } catch (error) {
              console.error("Error al actualizar cantidad:", error);
              throw error;
            }
          }
        },

        clearCart: () => {
          // Restaurar todo el stock al vaciar el carrito
          get().items.forEach((item) => {
            useProductStore.getState().updateStock(item.id, -item.quantity);
          });
          set({ items: [] });
        },

        get subtotal() {
          return get().items.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
          );
        },

        get tax() {
          return get().items.reduce(
            (sum, item) => sum + item.price * item.quantity * item.tax,
            0
          );
        },

        get total() {
          return get().subtotal + get().tax;
        },
      }),
      {
        name: "cart-storage",
      }
    )
  )
);
