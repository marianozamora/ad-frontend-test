import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import CartItem from './CartItem';
import { CartItem as CartItemType } from '@/types/game.type';

const meta: Meta<typeof CartItem> = {
  title: 'Components/CartItem',
  component: CartItem,
  parameters: {
    layout: 'padded',
  },
  decorators: [
    Story => (
      <div className="max-w-md bg-white border rounded-lg p-4">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockCartItem: CartItemType = {
  id: '1',
  name: 'Cyberpunk 2077',
  description: 'An open-world, action-adventure RPG set in the dark future of Night City.',
  price: 59.99,
  image: '/game-images/cyberpunk2077.jpeg',
  genre: 'RPG',
  isNew: false,
  quantity: 1,
};

const newCartItem: CartItemType = {
  ...mockCartItem,
  id: '2',
  name: 'Starfield',
  description: 'Bethesda Game Studios epic space exploration RPG.',
  isNew: true,
};

const actionCartItem: CartItemType = {
  ...mockCartItem,
  id: '3',
  name: 'Call of Duty: Modern Warfare III',
  description: 'The latest installment in the iconic Call of Duty franchise.',
  genre: 'Action',
  price: 69.99,
};

export const Default: Story = {
  args: {
    item: mockCartItem,
  },
};

export const NewGame: Story = {
  args: {
    item: newCartItem,
  },
};

export const ActionGame: Story = {
  args: {
    item: actionCartItem,
  },
};

export const LongDescription: Story = {
  args: {
    item: {
      ...mockCartItem,
      id: '4',
      name: 'The Elder Scrolls VI',
      description:
        'The highly anticipated next chapter in the Elder Scrolls saga that will transport players to new realms of adventure and discovery in a vast, immersive open world filled with countless quests, characters, and stories.',
    },
  },
};
