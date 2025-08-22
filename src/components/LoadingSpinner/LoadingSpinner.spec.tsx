import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import LoadingSpinner from './LoadingSpinner';

describe('LoadingSpinner', () => {
  it('renders loading text', () => {
    render(<LoadingSpinner />);
    expect(screen.getByText('Loading games...')).toBeInTheDocument();
  });

  it('renders spinner element with correct classes', () => {
    render(<LoadingSpinner />);
    const spinner = document.querySelector('.animate-spin');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass('rounded-full', 'h-12', 'w-12', 'border-b-2', 'border-gray-900');
  });

  it('has correct container structure', () => {
    render(<LoadingSpinner />);
    const container = screen.getByText('Loading games...').parentElement;
    expect(container).toHaveClass('flex', 'justify-center', 'items-center', 'py-12');
  });

  it('renders both spinner and text elements', () => {
    const { container } = render(<LoadingSpinner />);
    const spinnerDiv = container.querySelector('.animate-spin');
    const textSpan = screen.getByText('Loading games...');

    expect(spinnerDiv).toBeInTheDocument();
    expect(textSpan).toBeInTheDocument();
    expect(textSpan.tagName).toBe('SPAN');
  });
});
