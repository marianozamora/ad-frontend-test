export type Game = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  genre: string;
  isNew: boolean;
};

export type CartItem = Game & {
  quantity: number;
};

export type ApiGamesResponse = {
  games: Game[];
  availableFilters: string[];
  totalPages: number;
  currentPage: number;
};
