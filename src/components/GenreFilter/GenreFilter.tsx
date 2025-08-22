'use client';
import { useRouter, useSearchParams } from 'next/navigation';

type GenreFilterProps = {
  genres: string[];
};

export default function GenreFilter({ genres }: GenreFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentGenre = searchParams.get('genre') || 'all';

  const handleGenreChange = (genre: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (genre === 'all') {
      params.delete('genre');
    } else {
      params.set('genre', genre);
    }
    params.delete('page');

    const queryString = params.toString();
    const newUrl = queryString ? `/?${queryString}` : '/';
    router.push(newUrl);
  };

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-gray-600">Genre</span>
      <select
        value={currentGenre}
        onChange={e => handleGenreChange(e.target.value)}
        className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
      >
        <option value="all">All</option>
        {genres.map(genre => (
          <option key={genre} value={genre}>
            {genre}
          </option>
        ))}
      </select>
    </div>
  );
}
