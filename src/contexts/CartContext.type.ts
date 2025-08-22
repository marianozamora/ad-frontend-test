import { CartItem, Game } from '@/types/game.type';
import { ReactNode } from 'react';

export type CartContextType = {
  cartItems: CartItem[];
  addToCart: (game: Game) => void;
  removeFromCart: (gameId: string) => void;
  updateQuantity: (gameId: string, quantity: number) => void;
  isInCart: (gameId: string) => boolean;
  getCartTotal: () => number;
  getCartItemsCount: () => number;
  clearCart: () => void;
  isLoading: boolean;
};

export type CartProviderProps = {
  children: ReactNode;
};
