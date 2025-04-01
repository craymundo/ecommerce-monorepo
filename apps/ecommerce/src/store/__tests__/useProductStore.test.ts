import { beforeEach, describe, expect, it, vi } from "vitest";
import { useProductStore } from "../useProductStore";
import { localStorageUtils } from "../../utils/localStorageUtils";
import { initialProducts } from "../../data/initialProducts";

// Mock de localStorageUtils
vi.mock("../../utils/localStorageUtils", () => ({
  localStorageUtils: {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
  },
}));

describe("useProductStore", () => {
  beforeEach(() => {
    // Limpiar el store y los mocks antes de cada test
    useProductStore.setState({
      products: [],
      isLoading: false,
      error: null,
    });
    vi.clearAllMocks();
  });

  describe("initializeProducts", () => {
    it("debe cargar productos desde localStorage si existen", () => {
      const mockProducts = [
        { id: 1, name: "Test Product", price: 10, stock: 5, tax: 0.1 },
      ];
      vi.mocked(localStorageUtils.getItem).mockReturnValue(mockProducts);

      useProductStore.getState().initializeProducts();

      expect(useProductStore.getState().products).toEqual(mockProducts);
      expect(localStorageUtils.getItem).toHaveBeenCalledWith("products");
    });

    it("debe inicializar con productos por defecto si no hay datos en localStorage", () => {
      vi.mocked(localStorageUtils.getItem).mockReturnValue(null);

      useProductStore.getState().initializeProducts();

      expect(useProductStore.getState().products).toEqual(initialProducts);
      expect(localStorageUtils.setItem).toHaveBeenCalledWith(
        "products",
        initialProducts
      );
    });
  });

  describe("updateStock", () => {
    beforeEach(() => {
      useProductStore.setState({
        products: [
          { id: 1, name: "Test Product", price: 10, stock: 5, tax: 0.1 },
        ],
      });
    });

    it("debe actualizar correctamente el stock de un producto", () => {
      useProductStore.getState().updateStock(1, 2);

      const updatedProduct = useProductStore.getState().products[0];
      expect(updatedProduct.stock).toBe(3);
      expect(localStorageUtils.setItem).toHaveBeenCalled();
    });

    it("debe lanzar error si el producto no existe", () => {
      expect(() => useProductStore.getState().updateStock(999, 1)).toThrow(
        "Producto no encontrado"
      );
    });

    it("debe lanzar error si no hay stock suficiente", () => {
      expect(() => useProductStore.getState().updateStock(1, 6)).toThrow(
        "Stock insuficiente"
      );
    });
  });

  describe("getProduct", () => {
    it("debe retornar el producto correcto por ID", () => {
      const mockProduct = {
        id: 1,
        name: "Test Product",
        price: 10,
        stock: 5,
        tax: 0.1,
      };
      useProductStore.setState({
        products: [mockProduct],
      });

      const product = useProductStore.getState().getProduct(1);
      expect(product).toEqual(mockProduct);
    });

    it("debe retornar undefined si el producto no existe", () => {
      const product = useProductStore.getState().getProduct(999);
      expect(product).toBeUndefined();
    });
  });
});
