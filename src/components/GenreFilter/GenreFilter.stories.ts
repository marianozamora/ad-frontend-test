import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import GenreFilter from './GenreFilter';

const meta: Meta<typeof GenreFilter> = {
  title: 'Components/GenreFilter',
  component: GenreFilter,
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    genres: ['Action', 'RPG', 'Adventure', 'Strategy', 'Simulation'],
  },
};

export const FewGenres: Story = {
  args: {
    genres: ['Action', 'RPG'],
  },
};

export const ManyGenres: Story = {
  args: {
    genres: [
      'Action',
      'Adventure',
      'RPG',
      'Strategy',
      'Simulation',
      'Sports',
      'Racing',
      'Fighting',
      'Puzzle',
      'Horror',
    ],
  },
};

export const EmptyGenres: Story = {
  args: {
    genres: [],
  },
};
