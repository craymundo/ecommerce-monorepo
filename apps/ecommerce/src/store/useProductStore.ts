import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { ProductStore } from "../types/Product";
import { initialProducts } from "../data/initialProducts";
import { localStorageUtils } from "../utils/localStorageUtils";

export const useProductStore = create<ProductStore>()(
  devtools(
    persist(
      (set, get) => ({
        products: [],
        isLoading: false,
        error: null,

        initializeProducts: () => {
          const storedProducts =
            localStorageUtils.getItem<ProductStore["products"]>("products");
          if (storedProducts) {
            set({ products: storedProducts });
          } else {
            set({ products: initialProducts });
            localStorageUtils.setItem("products", initialProducts);
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
          localStorageUtils.setItem("products", updatedProducts);
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
