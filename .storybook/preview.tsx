import type { Preview } from '@storybook/react';
import React from 'react';
import '../src/app/globals.css';
import { CartProvider } from '../src/contexts/CartContext';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#ffffff',
        },
        {
          name: 'dark',
          value: '#333333',
        },
      ],
    },
  },
  decorators: [
    Story => (
      <CartProvider>
        <Story />
      </CartProvider>
    ),
  ],
};

export default preview;
