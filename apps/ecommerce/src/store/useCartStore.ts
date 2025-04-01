import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { useProductStore } from "./useProductStore";
import { CartStore } from "../types/Cart";

export const useCartStore = create<CartStore>()(
  devtools(
    persist(
      (set, get) => ({
        items: [],
        subtotal: 0,
        tax: 0,
        total: 0,

        calculateTotals: () => {
          const items = get().items;
          const subtotal = items.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
          );
          const tax = items.reduce(
            (sum, item) => sum + item.price * item.quantity * item.tax,
            0
          );
          const total = subtotal + tax;

          set({ subtotal, tax, total });
        },

        addItem: (productId: number) => {
          try {
            const product = useProductStore.getState().getProduct(productId);
            if (!product) throw new Error("Producto no encontrado");

            if (product.stock <= 0) {
              throw new Error("Stock insuficiente");
            }

            const items = get().items;
            const existingItem = items.find((item) => item.id === productId);

            if (existingItem) {
              if (product.stock < 1) {
                throw new Error("Stock insuficiente");
              }
              useProductStore.getState().updateStock(productId, 1);

              set((state) => {
                const newItems = state.items.map((item) =>
                  item.id === productId
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
                );
                return { items: newItems };
              });
            } else {
              useProductStore.getState().updateStock(productId, 1);

              set((state) => ({
                items: [
                  ...state.items,
                  {
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    quantity: 1,
                    tax: product.tax,
                  },
                ],
              }));
            }
            get().calculateTotals();
          } catch (error) {
            console.error("Error al agregar al carrito:", error);
            throw error;
          }
        },

        removeItem: (productId: number) => {
          const item = get().items.find((i) => i.id === productId);
          if (item) {
            try {
              useProductStore.getState().updateStock(productId, -item.quantity);
              set((state) => ({
                items: state.items.filter((i) => i.id !== productId),
              }));
              get().calculateTotals();
            } catch (error) {
              console.error("Error al eliminar del carrito:", error);
              throw error;
            }
          }
        },

        updateQuantity: (productId: number, newQuantity: number) => {
          const items = get().items;
          const item = items.find((i) => i.id === productId);
          const product = useProductStore.getState().getProduct(productId);

          if (item && product) {
            const quantityDiff = newQuantity - item.quantity;
            const newStock = product.stock - quantityDiff;

            if (newStock < 0) {
              throw new Error("Stock insuficiente para la cantidad solicitada");
            }

            try {
              useProductStore.getState().updateStock(productId, quantityDiff);
              set((state) => ({
                items: state.items.map((i) =>
                  i.id === productId ? { ...i, quantity: newQuantity } : i
                ),
              }));
              get().calculateTotals();
            } catch (error) {
              console.error("Error al actualizar cantidad:", error);
              throw error;
            }
          }
        },

        clearCart: () => {
          set({ items: [], subtotal: 0, tax: 0, total: 0 });
        },
      }),
      {
        name: "cart-storage",
        onRehydrateStorage: () => (state) => {
          if (state) {
            state.calculateTotals();
          }
        },
      }
    )
  )
);
