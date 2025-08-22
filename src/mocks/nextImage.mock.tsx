import React from 'react';
import { vi } from 'vitest';

export const setupNextImageMock = () => {
  vi.mock('next/image', async () => {
    const actual = await vi.importActual<typeof import('next/image')>('next/image');
    return {
      __esModule: true,
      ...actual,
      default: (props: any) => {
        return <img {...props} />;
      },
    };
  });
};

export const setupLegacyNextImageMock = () => {
  vi.mock('next/image', () => ({
    default: ({ src, alt, onError, ...props }: any) => {
      // eslint-disable-next-line @next/next/no-img-element
      return <img src={src} alt={alt} onError={onError} {...props} />;
    },
  }));
};
