import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import CheckoutPage from '../CheckoutPage';
import { MemoryRouter } from 'react-router-dom';

// Mock simple del store
vi.mock('../../../store', () => ({
  useCartStore: () => ({
    items: [{ id: 1, name: 'Test Product', price: 100, quantity: 1 }],
    total: 100,
    subtotal: 90,
    tax: 10,
    clearCart: vi.fn()
  })
}));

// Mock simple de fetch
global.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([
      { name: { common: 'Argentina' } },
      { name: { common: 'Brasil' } }
    ])
  })
) as any;

describe('CheckoutPage', () => {


  // Test 2: Verificar que se muestra el producto en el resumen
  it('debe mostrar el producto en el resumen', () => {
    render(
      <MemoryRouter>
        <CheckoutPage />
      </MemoryRouter>
    );
    
    const producto = screen.getByText('Test Product');
    expect(producto).toBeInTheDocument();
  });
});