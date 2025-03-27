import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';

import CartDropdown from '../CartDropdown';
import { renderWithRouter } from '../../../../test/utils';

vi.mock('../../../../store/useCartStore', () => ({
  useCartStore: () => ({
    items: [
      { id: 1, name: 'Test Product', price: 100, quantity: 1 }
    ],
    total: 100,
    removeItem: vi.fn(),
  }),
}));

describe('CartDropdown', () => {
  it('renders cart items correctly', () => {
    renderWithRouter(
      <CartDropdown onClose={() => {}} />
    );
    
    expect(screen.getByText('Test Product')).toBeDefined();
    expect(screen.getByText('$100.00')).toBeDefined();
  });
}); 