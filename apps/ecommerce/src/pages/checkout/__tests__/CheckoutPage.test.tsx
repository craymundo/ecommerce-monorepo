/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, waitFor, act } from '@testing-library/react';
import CheckoutPage from '../CheckoutPage';
import { renderWithRouter } from '../../../test/utils';
import { useCartStore } from '../../../store';

global.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([
      { name: { common: 'Argentina' } },
      { name: { common: 'Brasil' } }
    ]),
  })
) as any;

vi.mock('../../../store', () => ({
  useCartStore: vi.fn()
}));

describe('CheckoutPage', () => {
  beforeEach(() => {
    vi.mocked(useCartStore).mockReturnValue({
      items: [
        { id: 1, name: 'Test Product', price: 100, quantity: 1 }
      ],
      total: 100,
      subtotal: 90,
      tax: 10,
      clearCart: vi.fn(),
      removeItem: vi.fn(),
      updateQuantity: vi.fn(),
      addItem: vi.fn(),
    });
  });

  it('renders checkout form correctly', async () => {
    await act(async () => {
      renderWithRouter(<CheckoutPage />);
    });
    await waitFor(() => {
      expect(screen.getByText('Información de Contacto')).toBeDefined();
      expect(screen.getByLabelText(/correo electrónico/i)).toBeDefined();
    });
  });

}); 