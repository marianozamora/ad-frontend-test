import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import GameCard from './GameCard';
import { mockGame } from '@/mocks';

const mockAddToCart = vi.fn();
const mockRemoveFromCart = vi.fn();
const mockIsInCart = vi.fn();

vi.mock('@/hooks/useCart', () => ({
  useCart: () => ({
    addToCart: mockAddToCart,
    removeFromCart: mockRemoveFromCart,
    isInCart: mockIsInCart,
  }),
}));

vi.mock('next/image', () => ({
  default: ({ src, alt, onError, ...props }: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} onError={onError} {...props} />;
  },
}));

describe('GameCard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockIsInCart.mockReturnValue(false);
  });

  it('renders game information correctly', () => {
    render(<GameCard game={mockGame} />);

    expect(screen.getByText('Test Game')).toBeInTheDocument();
    expect(screen.getByText('$29.99')).toBeInTheDocument();
    expect(screen.getByText('Action')).toBeInTheDocument();
    expect(screen.getByAltText('Test Game')).toBeInTheDocument();
  });

  it('shows "ADD TO CART" button when item is not in cart', () => {
    mockIsInCart.mockReturnValue(false);
    render(<GameCard game={mockGame} />);

    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('ADD TO CART');
    expect(button).toHaveClass('bg-gray-900');
  });

  it('shows "REMOVE" button when item is in cart', () => {
    mockIsInCart.mockReturnValue(true);
    render(<GameCard game={mockGame} />);

    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('REMOVE');
    expect(button).toHaveClass('bg-red-600');
  });

  it('calls addToCart when clicking "ADD TO CART"', () => {
    mockIsInCart.mockReturnValue(false);
    render(<GameCard game={mockGame} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(mockAddToCart).toHaveBeenCalledWith(mockGame);
    expect(mockRemoveFromCart).not.toHaveBeenCalled();
  });

  it('calls removeFromCart when clicking "REMOVE"', () => {
    mockIsInCart.mockReturnValue(true);
    render(<GameCard game={mockGame} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(mockRemoveFromCart).toHaveBeenCalledWith(mockGame.id);
    expect(mockAddToCart).not.toHaveBeenCalled();
  });

  it('has proper accessibility labels', () => {
    mockIsInCart.mockReturnValue(false);
    render(<GameCard game={mockGame} />);

    const button = screen.getByLabelText('Add Test Game to cart');
    expect(button).toBeInTheDocument();
  });

  it('handles image error correctly', () => {
    render(<GameCard game={mockGame} />);

    const image = screen.getByAltText('Test Game');
    fireEvent.error(image);

    expect(image).toHaveAttribute('src', '/images/placeholder.jpg');
  });
});
