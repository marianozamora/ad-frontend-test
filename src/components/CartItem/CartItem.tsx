'use client';
import Image from 'next/image';
import { CartItem as CartItemType } from '@/types/game.type';
import { useCart } from '@/hooks/useCart';

type CartItemProps = {
  item: CartItemType;
};

export default function CartItem({ item }: CartItemProps) {
  const { removeFromCart } = useCart();

  return (
    <div className="flex items-start space-x-4 py-4 border-b border-gray-200 last:border-b-0">
      <div className="flex-shrink-0">
        <Image
          src={item.image}
          alt={item.name}
          width={80}
          height={60}
          className="rounded object-cover"
          onError={e => {
            const target = e.target as HTMLImageElement;
            target.src = '/images/placeholder.jpg';
          }}
        />
        {item.isNew && (
          <span className="inline-block mt-1 bg-yellow-400 text-black text-xs px-1 py-0.5 rounded">
            New
          </span>
        )}
      </div>

      <div className="flex-grow">
        <div className="flex justify-between items-start">
          <div>
            <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">{item.genre}</div>
            <h3 className="text-sm font-medium text-gray-900 mb-1">{item.name}</h3>
            <p className="text-xs text-gray-600">{item.description}</p>
          </div>

          <div className="flex items-start space-x-4">
            <div className="text-right">
              <div className="text-sm font-medium text-gray-900">${item.price}</div>
            </div>

            <button
              onClick={() => removeFromCart(item.id)}
              className="text-gray-400 hover:text-red-600 transition-colors"
              aria-label={`Remove ${item.name} from cart`}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
