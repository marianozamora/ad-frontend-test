import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Footer } from './Footer';

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe('Footer', () => {
  it('renders the APPLY brand text', () => {
    render(<Footer />);
    expect(screen.getByText('APPLY')).toBeInTheDocument();
  });

  it('renders the triangle icon', () => {
    render(<Footer />);
    expect(screen.getByText('▲')).toBeInTheDocument();
  });

  it('has a link to homepage', () => {
    render(<Footer />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/');
  });

  it('has proper accessibility label', () => {
    render(<Footer />);
    const link = screen.getByLabelText('Apply Digital - Go to homepage');
    expect(link).toBeInTheDocument();
  });

  it('applies correct styling classes', () => {
    render(<Footer />);
    const footer = screen.getByRole('contentinfo');
    expect(footer).toHaveClass('bg-gray-900', 'text-white');
  });
});
