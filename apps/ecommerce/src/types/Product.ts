export interface Product {
  id: number;
  name: string;
  category: string;
  stock: number;
  price: number;
  tax: number;
  image?: string;
  description?: string;
}

export interface ProductStore {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  initializeProducts: () => void;
  updateStock: (productId: number, quantity: number) => void;
  getProduct: (productId: number) => Product | undefined;
}
