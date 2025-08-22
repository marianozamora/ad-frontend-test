import type { Meta, StoryObj } from '@storybook/react-vite';
import GameCard from './GameCard';
import { Game } from '@/types/game.type';

const meta: Meta<typeof GameCard> = {
  title: 'Components/GameCard',
  component: GameCard,
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleGame: Game = {
  id: '1',
  name: 'The Witcher 3: Wild Hunt',
  description: 'An epic fantasy RPG with a massive open world to explore.',
  price: 39.99,
  image: '/game-images/thewitcher3.jpeg',
  genre: 'RPG',
  isNew: false,
};

const newGame: Game = {
  id: '2',
  name: 'Cyberpunk 2077',
  description: 'A futuristic open-world action-adventure game.',
  price: 59.99,
  image: '/game-images/cyberpunk2077.jpeg',
  genre: 'Action',
  isNew: true,
};

const expensiveGame: Game = {
  id: '3',
  name: 'Premium Game Collection',
  description: 'Ultimate gaming experience with all DLCs.',
  price: 99.99,
  image: '/game-images/gta5.jpeg',
  genre: 'Collection',
  isNew: true,
};

export const Default: Story = {
  args: {
    game: sampleGame,
  },
};

export const NewGame: Story = {
  args: {
    game: newGame,
  },
};

export const ExpensiveGame: Story = {
  args: {
    game: expensiveGame,
  },
};

export const LongTitle: Story = {
  args: {
    game: {
      ...sampleGame,
      name: 'The Elder Scrolls V: Skyrim Anniversary Edition Special Collection',
    },
  },
};
