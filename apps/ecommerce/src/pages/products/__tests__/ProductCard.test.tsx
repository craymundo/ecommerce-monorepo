import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';

import ProductCard from '../ProductCard';


vi.mock('../../../store/useCartStore');

describe('ProductCard', () => {
  const mockProduct = {
    id: 1,
    name: 'Test Product',
    price: 100,
    description: 'Test Description',
    image: 'test.jpg',
    stock: 5,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders product information correctly', () => {
    render(<ProductCard product={{...mockProduct, category: 'test', tax: 0.1}} />);
    
    expect(screen.getByText(mockProduct.name)).toBeDefined();
    expect(screen.getByText(`$${mockProduct.price.toFixed(2)}`)).toBeDefined();
  });

  
}); 