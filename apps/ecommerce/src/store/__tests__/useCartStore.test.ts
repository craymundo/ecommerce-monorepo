import { beforeEach, describe, expect, it, vi } from "vitest";
import { useCartStore } from "../useCartStore";
import { useProductStore } from "../useProductStore";

const mockGetProduct = vi.fn();
const mockUpdateStock = vi.fn();

vi.mock("../useProductStore", () => ({
  useProductStore: {
    getState: vi.fn(() => ({
      getProduct: mockGetProduct,
      updateStock: mockUpdateStock,
    })),
  },
}));

describe("useCartStore", () => {
  const mockProduct = {
    id: 1,
    name: "Test Product",
    price: 10,
    stock: 5,
    tax: 0.1,
  };

  beforeEach(() => {
    useCartStore.setState({
      items: [],
      subtotal: 0,
      tax: 0,
      total: 0,
    });
    vi.clearAllMocks();
    // Configurar el comportamiento por defecto del mock
    mockGetProduct.mockReturnValue(mockProduct);
  });

  describe("calculateTotals", () => {
    it("debe calcular correctamente los totales", () => {
      useCartStore.setState({
        items: [
          { id: 1, name: "Product 1", price: 10, quantity: 2, tax: 0.1 },
          { id: 2, name: "Product 2", price: 20, quantity: 1, tax: 0.1 },
        ],
      });

      useCartStore.getState().calculateTotals();

      const state = useCartStore.getState();
      expect(state.subtotal).toBe(40); // (10 * 2) + (20 * 1)
      expect(state.tax).toBe(4); // (10 * 2 * 0.1) + (20 * 1 * 0.1)
      expect(state.total).toBe(44); // 40 + 4
    });
  });

  describe("addItem", () => {
    it("debe agregar un nuevo item al carrito", () => {
      useCartStore.getState().addItem(1);

      const items = useCartStore.getState().items;
      expect(items).toHaveLength(1);
      expect(items[0]).toEqual({
        id: 1,
        name: "Test Product",
        price: 10,
        quantity: 1,
        tax: 0.1,
      });
    });

    it("debe incrementar la cantidad si el item ya existe", () => {
      useCartStore.setState({
        items: [
          {
            id: 1,
            name: "Test Product",
            price: 10,
            quantity: 1,
            tax: 0.1,
          },
        ],
      });

      useCartStore.getState().addItem(1);

      const items = useCartStore.getState().items;
      expect(items[0].quantity).toBe(2);
    });

    it("debe lanzar error si no hay stock suficiente", () => {
      mockGetProduct.mockReturnValue({
        ...mockProduct,
        stock: 0,
      });

      // Envolver en una función para capturar el error
      const addItemWithNoStock = () => {
        useCartStore.getState().addItem(1);
      };

      // Verificar que se lance el error
      expect(addItemWithNoStock).toThrow("Stock insuficiente");
    });
  });

  describe("removeItem", () => {
    it("debe eliminar un item del carrito", () => {
      useCartStore.setState({
        items: [
          {
            id: 1,
            name: "Test Product",
            price: 10,
            quantity: 1,
            tax: 0.1,
          },
        ],
      });

      useCartStore.getState().removeItem(1);

      expect(useCartStore.getState().items).toHaveLength(0);
    });
  });

  describe("updateQuantity", () => {
    it("debe actualizar la cantidad de un item", () => {
      useCartStore.setState({
        items: [
          {
            id: 1,
            name: "Test Product",
            price: 10,
            quantity: 1,
            tax: 0.1,
          },
        ],
      });

      useCartStore.getState().updateQuantity(1, 3);

      expect(useCartStore.getState().items[0].quantity).toBe(3);
    });

    //

    it("debe lanzar error si no hay stock suficiente", () => {
      // Configurar el estado inicial del carrito
      useCartStore.setState({
        items: [
          {
            id: 1,
            name: "Test Product",
            price: 10,
            quantity: 1,
            tax: 0.1,
          },
        ],
      });

      // Configurar el mock para retornar un producto con stock limitado
      mockGetProduct.mockReturnValue({
        ...mockProduct,
        stock: 2,
      });

      // Envolver en una función para capturar el error
      const updateQuantityOverStock = () => {
        useCartStore.getState().updateQuantity(1, 4);
      };

      // Verificar que se lance el error
      expect(updateQuantityOverStock).toThrow(
        "Stock insuficiente para la cantidad solicitada"
      );
    });
    //
  });

  describe("clearCart", () => {
    it("debe limpiar el carrito", () => {
      useCartStore.setState({
        items: [
          {
            id: 1,
            name: "Test Product",
            price: 10,
            quantity: 1,
            tax: 0.1,
          },
        ],
        subtotal: 10,
        tax: 1,
        total: 11,
      });

      useCartStore.getState().clearCart();

      const state = useCartStore.getState();
      expect(state.items).toHaveLength(0);
      expect(state.subtotal).toBe(0);
      expect(state.tax).toBe(0);
      expect(state.total).toBe(0);
    });
  });
});
