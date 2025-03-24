export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  tax: number;
}

export interface CartStore {
  items: CartItem[];
  addItem: (productId: number) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  total: number;
  subtotal: number;
  tax: number;
}
