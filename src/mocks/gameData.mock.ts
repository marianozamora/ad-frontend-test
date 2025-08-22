import { Game, CartItem } from '@/types/game.type';

export const mockGame: Game = {
  id: '1',
  name: 'Test Game',
  description: 'A test game description',
  price: 29.99,
  image: '/test-image.jpg',
  genre: 'Action',
  isNew: false,
};

export const newMockGame: Game = {
  ...mockGame,
  id: '2',
  name: 'New Test Game',
  isNew: true,
};

export const actionMockGame: Game = {
  ...mockGame,
  id: '3',
  name: 'Action Test Game',
  genre: 'Action',
  price: 69.99,
};

export const rpgMockGame: Game = {
  ...mockGame,
  id: '4',
  name: 'RPG Test Game',
  genre: 'RPG',
  price: 59.99,
};

export const mockCartItem: CartItem = {
  ...mockGame,
  quantity: 1,
};

export const newMockCartItem: CartItem = {
  ...newMockGame,
  quantity: 1,
};

export const mockGames: Game[] = [mockGame, newMockGame, actionMockGame, rpgMockGame];

export const mockCartItems: CartItem[] = [mockCartItem, newMockCartItem];
