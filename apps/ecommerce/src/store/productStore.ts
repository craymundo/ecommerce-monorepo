import { create } from "zustand";

type Product = {
  id: number;
  name: string;
  category: string;
  stock: number;
  price: number;
  tax: number;
};

interface ProductStore {
  products: Product[];
  reduceStock: (id: number) => void;
}

export const useProductStore = create<ProductStore>((set) => ({
  products: JSON.parse(localStorage.getItem("products") || "[]"),

  reduceStock: (id) =>
    set((state) => {
      const updated = state.products.map((p) =>
        p.id === id ? { ...p, stock: p.stock - 1 } : p
      );

      localStorage.setItem("products", JSON.stringify(updated));

      return { products: updated };
    }),
}));
