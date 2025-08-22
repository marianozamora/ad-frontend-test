import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import CartItem from './CartItem';
import {
  mockRemoveFromCart,
  resetCartMocks,
  setupNextImageMock,
  mockCartItem,
  newMockCartItem,
} from '@/mocks';

import { vi } from 'vitest';
vi.mock('@/hooks/useCart', () => ({
  useCart: () => ({
    removeFromCart: mockRemoveFromCart,
  }),
}));

setupNextImageMock();

describe('CartItem', () => {
  beforeEach(() => {
    resetCartMocks();
  });

  it('renders cart item information correctly', () => {
    render(<CartItem item={mockCartItem} />);

    expect(screen.getByText('Test Game')).toBeInTheDocument();
    expect(screen.getByText('$29.99')).toBeInTheDocument();
    expect(screen.getByText('Action')).toBeInTheDocument();
    expect(screen.getByText('A test game description')).toBeInTheDocument();
    expect(screen.getByAltText('Test Game')).toBeInTheDocument();
  });

  it('displays "New" badge for new games', () => {
    render(<CartItem item={newMockCartItem} />);

    expect(screen.getByText('New')).toBeInTheDocument();
    expect(screen.getByText('New')).toHaveClass('bg-yellow-400');
  });

  it('does not display "New" badge for regular games', () => {
    render(<CartItem item={mockCartItem} />);

    expect(screen.queryByText('New')).not.toBeInTheDocument();
  });

  it('calls removeFromCart when remove button is clicked', () => {
    render(<CartItem item={mockCartItem} />);

    const removeButton = screen.getByLabelText('Remove Test Game from cart');
    fireEvent.click(removeButton);

    expect(mockRemoveFromCart).toHaveBeenCalledWith(mockCartItem.id);
    expect(mockRemoveFromCart).toHaveBeenCalledTimes(1);
  });

  it('has proper accessibility labels', () => {
    render(<CartItem item={mockCartItem} />);

    const removeButton = screen.getByLabelText('Remove Test Game from cart');
    expect(removeButton).toBeInTheDocument();
    expect(removeButton).toHaveAttribute('aria-label', 'Remove Test Game from cart');
  });

  it('handles image error correctly', () => {
    render(<CartItem item={mockCartItem} />);

    const image = screen.getByAltText('Test Game');
    fireEvent.error(image);

    expect(image).toHaveAttribute('src', '/images/placeholder.jpg');
  });

  it('displays genre in uppercase', () => {
    render(<CartItem item={mockCartItem} />);

    const genreElement = screen.getByText('Action');
    expect(genreElement).toHaveClass('uppercase');
  });
});
