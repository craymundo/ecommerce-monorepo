import { describe, it, expect, vi, beforeEach } from 'vitest';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from '../ProductCard';
import { useCartStore } from '../../../store/useCartStore';
import imageNotFound from '../../../assets/image-not-found-icon.svg';
import userEvent from '@testing-library/user-event';
// Mock del store
const mockAddToCart = vi.fn();
vi.mock('../../../store/useCartStore', () => ({
  useCartStore: vi.fn((selector) => selector({ addItem: mockAddToCart }))
}));

// Mock del componente Button
vi.mock('ui-ecommerce', () => ({
  Button: ({ onClick, children, disabled }: any) => (
    <button 
      onClick={onClick} 
      disabled={disabled}
      data-testid="mock-button"
    >
      {children}
    </button>
  )
}));

describe('ProductCard', () => {
  const mockAddToCart = vi.fn();
  
  const mockProduct = {
    id: 1,
    name: 'Test Product',
    price: 100,
    description: 'Test Description',
    image: 'test.jpg',
    stock: 5,
    category: 'test',
    tax: 0.1
  };

  beforeEach(() => {
    vi.clearAllMocks();
    // Configurar el mock del store para cada test
   

    // vi.mocked(useCartStore).mockImplementation(() => ({
    //   addToCart: mockAddToCart,

    // })
    // );

    (useCartStore as any).mockImplementation(() => ({
      addItem: mockAddToCart,
    }));
  });

  describe('Renderizado', () => {
    it('debe mostrar la información del producto correctamente', () => {
      render(<ProductCard product={mockProduct} />);
      
      expect(screen.getByText(mockProduct.name)).toBeDefined();
      expect(screen.getByText(`$${mockProduct.price.toFixed(2)}`)).toBeDefined();
      expect(screen.getByText(`Stock: ${mockProduct.stock}`)).toBeDefined();
      expect(screen.getByRole('button', { name: /agregar al carrito/i })).toBeDefined();
    });

    it('debe mostrar la imagen del producto cuando está disponible', () => {
      render(<ProductCard product={mockProduct} />);
      
      const image = screen.getByAltText(mockProduct.name) as HTMLImageElement;
      expect(image.src).toContain(mockProduct.image);
    });

    it('debe mostrar la imagen por defecto cuando no hay imagen del producto', () => {
      const productWithoutImage = { ...mockProduct, image: '' };
      render(<ProductCard product={productWithoutImage} />);
      
      const image = screen.getByAltText(mockProduct.name) as HTMLImageElement;
      expect(image.src).toContain(imageNotFound);
    });

    it('debe mostrar el badge de "Agotado" cuando el stock es 0', () => {
      const productOutOfStock = { ...mockProduct, stock: 0 };
      render(<ProductCard product={productOutOfStock} />);
      
      expect(screen.getByText('Agotado')).toBeDefined();
    });

    it('no debe mostrar el badge de "Agotado" cuando hay stock', () => {
      render(<ProductCard product={mockProduct} />);
      
      expect(screen.queryByText('Agotado')).toBeNull();
    });
  });

  describe('Interacciones', () => {

    it('debe manejar errores al agregar al carrito', async () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      mockAddToCart.mockImplementationOnce(() => {
        throw new Error('Error al agregar al carrito');
      });

      const user = userEvent.setup();
      render(<ProductCard product={mockProduct} />);
      
      const addButton = screen.getByTestId('mock-button');
      await user.click(addButton);
      
      expect(consoleSpy).toHaveBeenCalledWith(
        'Error al agregar al carrito:',
        expect.any(Error)
      );
      
      consoleSpy.mockRestore();
    });

    it('debe deshabilitar el botón cuando el producto está agotado', () => {
      const productOutOfStock = { ...mockProduct, stock: 0 };
      render(<ProductCard product={productOutOfStock} />);
      
      const addButton = screen.getByTestId('mock-button');
      expect(addButton).toBeDisabled();
    });
  });

  describe('Accesibilidad', () => {
    it('debe tener la estructura correcta para lectores de pantalla', () => {
      render(<ProductCard product={mockProduct} />);
      
      // Verificar que los elementos importantes sean accesibles
      expect(screen.getByRole('img', { name: mockProduct.name })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /agregar al carrito/i })).toBeInTheDocument();
      expect(screen.getByText(`Stock: ${mockProduct.stock}`)).toBeInTheDocument();
    });
  });
});