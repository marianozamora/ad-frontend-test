import { vi } from 'vitest';

export const mockAddToCart = vi.fn();
export const mockRemoveFromCart = vi.fn();
export const mockIsInCart = vi.fn();
export const mockUpdateQuantity = vi.fn();
export const mockGetCartTotal = vi.fn();
export const mockGetCartItemsCount = vi.fn();
export const mockClearCart = vi.fn();

export const mockUseCart = () => ({
  cartItems: [],
  addToCart: mockAddToCart,
  removeFromCart: mockRemoveFromCart,
  updateQuantity: mockUpdateQuantity,
  isInCart: mockIsInCart,
  getCartTotal: mockGetCartTotal,
  getCartItemsCount: mockGetCartItemsCount,
  clearCart: mockClearCart,
  isLoading: false,
});

export const resetCartMocks = () => {
  vi.clearAllMocks();
  mockIsInCart.mockReturnValue(false);
  mockGetCartTotal.mockReturnValue(0);
  mockGetCartItemsCount.mockReturnValue(0);
};

export const setupUseCartMock = () => {
  vi.mock('@/hooks/useCart', () => ({
    useCart: mockUseCart,
  }));
};

export const setupCartContextMock = () => {
  vi.mock('@/contexts/CartContext', () => ({
    useCart: mockUseCart,
    CartProvider: ({ children }: { children: React.ReactNode }) => children,
  }));
};
