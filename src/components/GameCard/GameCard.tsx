'use client';
import Image from 'next/image';
import { Game } from '../../types/game.type';
import { useCart } from '../../hooks/useCart';

type GameCardProps = {
  game: Game;
};

export default function GameCard({ game }: GameCardProps) {
  const { addToCart, removeFromCart, isInCart } = useCart();
  const inCart = isInCart(game.id);

  const handleCartAction = () => {
    if (inCart) {
      removeFromCart(game.id);
    } else {
      addToCart(game);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="aspect-w-16 aspect-h-9">
        <Image
          src={game.image}
          alt={game.name}
          width={300}
          height={169}
          className="w-full h-40 object-cover"
          onError={e => {
            const target = e.target as HTMLImageElement;
            target.src = '/images/placeholder.jpg';
          }}
        />
      </div>

      <div className="p-4">
        <div className="mb-2">
          <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">{game.genre}</div>
          <h3 className="text-sm font-medium text-gray-900 mb-1">{game.name}</h3>
          <div className="text-lg font-bold text-gray-900">${game.price}</div>
        </div>

        <button
          onClick={handleCartAction}
          className={`w-full py-2 px-4 rounded text-sm font-medium transition-colors ${
            inCart
              ? 'bg-red-600 hover:bg-red-700 text-white'
              : 'bg-gray-900 hover:bg-gray-800 text-white'
          }`}
          aria-label={inCart ? `Remove ${game.name} from cart` : `Add ${game.name} to cart`}
        >
          {inCart ? 'REMOVE' : 'ADD TO CART'}
        </button>
      </div>
    </div>
  );
}
