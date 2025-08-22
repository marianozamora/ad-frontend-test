'use client';
import { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Game, ApiGamesResponse } from '@/types/game.type';
import { Header } from '@/components/Header/Header';
import { Footer } from '@/components/Footer/Footer';
import GameCard from '@/components/GameCard/GameCard';
import GenreFilter from '@/components/GenreFilter/GenreFilter';
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner';

function CatalogContent() {
  const [games, setGames] = useState<Game[]>([]);
  const [genres, setGenres] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const searchParams = useSearchParams();
  const selectedGenre = searchParams.get('genre') || 'all';

  const loadGames = useCallback(
    async (resetList: boolean = false, page: number = 1) => {
      try {
        if (resetList) {
          setLoading(true);
          setCurrentPage(1);
          setGames([]);
        } else {
          setLoadingMore(true);
        }

        const params = new URLSearchParams();
        if (selectedGenre !== 'all') {
          params.set('genre', selectedGenre);
        }
        params.set('page', page.toString());

        const response = await fetch(`/api/games?${params.toString()}`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: ApiGamesResponse = await response.json();

        if (resetList) {
          setGames(data.games);
          setGenres(data.availableFilters);
        } else {
          setGames(prev => [...prev, ...data.games]);
        }

        setTotalPages(data.totalPages);
        setCurrentPage(data.currentPage);
        setError(null);
      } catch (err) {
        setError('Failed to load games. Please try again.');
        console.error('Error loading games:', err);
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [selectedGenre]
  );

  useEffect(() => {
    loadGames(true);
  }, [selectedGenre, loadGames]);

  const handleSeeMore = () => {
    const nextPage = currentPage + 1;
    loadGames(false, nextPage);
  };

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center text-red-600">
            <p>{error}</p>
            <button
              onClick={() => loadGames(true)}
              className="mt-4 bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-800"
            >
              Try Again
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-xl font-bold text-gray-900">Top Sellers</h1>
              <div className="flex items-center space-x-4">
                <GenreFilter genres={genres} />
              </div>
            </div>

            {loading ? (
              <LoadingSpinner />
            ) : (
              <>
                {games.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-600">No games found for the selected genre.</p>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                      {games.map(game => (
                        <GameCard key={game.id} game={game} />
                      ))}
                    </div>

                    {currentPage < totalPages && (
                      <div className="text-center">
                        <button
                          onClick={handleSeeMore}
                          disabled={loadingMore}
                          className="bg-gray-900 text-white px-6 py-2 rounded hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {loadingMore ? 'Loading...' : 'SEE MORE'}
                        </button>
                      </div>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function CatalogPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <CatalogContent />
    </Suspense>
  );
}
