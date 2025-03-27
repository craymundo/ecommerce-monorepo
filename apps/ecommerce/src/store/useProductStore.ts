import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { ProductStore } from "../types/Product";
import { initialProducts } from "../data/initialProducts";

export const useProductStore = create<ProductStore>()(
  devtools(
    persist(
      (set, get) => ({
        products: [],
        isLoading: false,
        error: null,

        initializeProducts: () => {
          const storedProducts = localStorage.getItem("products");
          if (storedProducts) {
            set({ products: JSON.parse(storedProducts) });
          } else {
            set({ products: initialProducts });
            localStorage.setItem("products", JSON.stringify(initialProducts));
          }
        },

        updateStock: (productId: number, quantity: number) => {
          const { products } = get();
          const product = products.find((p) => p.id === productId);

          if (!product) {
            throw new Error("Producto no encontrado");
          }

          if (quantity > 0 && product.stock < quantity) {
            throw new Error("Stock insuficiente");
          }

          const updatedStock = product.stock - quantity;

          const updatedProducts = products.map((p) => {
            if (p.id === productId) {
              return { ...p, stock: updatedStock };
            }
            return p;
          });

          set({ products: updatedProducts });
          localStorage.setItem("products", JSON.stringify(updatedProducts));
        },

        getProduct: (productId: number) => {
          return get().products.find((product) => product.id === productId);
        },
      }),
      {
        name: "product-storage",
        skipHydration: true,
      }
    )
  )
);
