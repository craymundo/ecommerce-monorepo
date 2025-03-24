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
            // Si no hay productos en localStorage, usar los productos iniciales
            set({ products: initialProducts });
            localStorage.setItem("products", JSON.stringify(initialProducts));
          }
        },

        updateStock: (productId: number, quantity: number) => {
          const { products } = get();
          const updatedProducts = products.map((product) => {
            if (product.id === productId) {
              const newStock = product.stock - quantity;
              if (newStock < 0) {
                throw new Error("Stock insuficiente");
              }
              return { ...product, stock: newStock };
            }
            return product;
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
