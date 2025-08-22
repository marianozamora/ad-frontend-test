import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import GenreFilter from './GenreFilter';

const mockPush = vi.fn();
const mockSearchParams = new URLSearchParams();

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
  useSearchParams: () => mockSearchParams,
}));

describe('GenreFilter', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockSearchParams.delete('genre');
    mockSearchParams.delete('page');
  });

  it('renders genre label and select', () => {
    const genres = ['Action', 'RPG', 'Adventure'];
    render(<GenreFilter genres={genres} />);

    expect(screen.getByText('Genre')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('renders "All" option by default', () => {
    const genres = ['Action', 'RPG'];
    render(<GenreFilter genres={genres} />);

    const select = screen.getByRole('combobox');
    expect(select).toHaveValue('all');
    expect(screen.getByText('All')).toBeInTheDocument();
  });

  it('renders all provided genres as options', () => {
    const genres = ['Action', 'RPG', 'Adventure'];
    render(<GenreFilter genres={genres} />);

    genres.forEach(genre => {
      expect(screen.getByText(genre)).toBeInTheDocument();
    });
  });

  it('calls router.push when genre changes', () => {
    const genres = ['Action', 'RPG'];
    render(<GenreFilter genres={genres} />);

    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'Action' } });

    expect(mockPush).toHaveBeenCalledWith('/?genre=Action');
  });

  it('navigates to root path when "All" is selected', () => {
    const genres = ['Action', 'RPG'];
    render(<GenreFilter genres={genres} />);

    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'all' } });

    expect(mockPush).toHaveBeenCalledWith('/');
  });

  it('shows current genre from search params', () => {
    mockSearchParams.set('genre', 'RPG');
    const genres = ['Action', 'RPG'];
    render(<GenreFilter genres={genres} />);

    const select = screen.getByRole('combobox');
    expect(select).toHaveValue('RPG');
  });
});
