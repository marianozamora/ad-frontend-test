import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Header } from './Header';

vi.mock('@/hooks/useCart', () => ({
  useCart: vi.fn(() => ({
    getCartItemsCount: vi.fn(() => 0),
  })),
}));

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe('Header', () => {
  it('renders the logo/brand name', () => {
    render(<Header />);
    expect(screen.getByText('GamerShop')).toBeInTheDocument();
  });

  it('renders the cart link with correct href', () => {
    render(<Header />);
    const cartLink = screen.getByLabelText(/shopping cart with/i);
    expect(cartLink).toHaveAttribute('href', '/cart');
  });

  it('does not show cart count when cart is empty', () => {
    render(<Header />);
    expect(screen.queryByText(/^\d+$/)).not.toBeInTheDocument();
  });

  it('renders cart icon SVG', () => {
    render(<Header />);
    const svgElement = document.querySelector('svg');
    expect(svgElement).toBeInTheDocument();
    expect(svgElement).toHaveClass('w-6', 'h-6');
  });
});
