'use client';
import Link from 'next/link';
import { Header } from '@/components/Header/Header';
import { Footer } from '@/components/Footer/Footer';
import CartItem from '@/components/CartItem/CartItem';
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner';
import { useCart } from '@/hooks/useCart';

export default function CartPage() {
  const { cartItems, getCartTotal, getCartItemsCount, isLoading } = useCart();

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <LoadingSpinner />
        </main>
        <Footer />
      </div>
    );
  }

  const total = getCartTotal();
  const itemCount = getCartItemsCount();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            {/* Header */}
            <div className="flex items-center mb-6">
              <Link
                href="/"
                className="text-gray-600 hover:text-gray-900 flex items-center text-sm"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Back to Catalog
              </Link>
            </div>

            {cartItems.length === 0 ? (
              <div className="text-center py-12">
                <div className="mb-4">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13v6a2 2 0 002 2h6a2 2 0 002-2v-6"
                    />
                  </svg>
                </div>
                <p className="text-gray-600 mb-6">Your cart is empty</p>
                <Link
                  href="/"
                  className="bg-gray-900 text-white px-6 py-2 rounded hover:bg-gray-800"
                >
                  Back to Catalog
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2">
                  <h2 className="text-lg font-semibold mb-4">Your Cart</h2>
                  <div className="text-sm text-gray-600 mb-4">{itemCount} items</div>
                  <div>
                    {cartItems.map(item => (
                      <CartItem key={item.id} item={item} />
                    ))}
                  </div>
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

                    <div className="space-y-2 mb-4">
                      {cartItems.map(item => (
                        <div key={item.id} className="flex justify-between text-sm">
                          <span className="text-gray-600">{item.name}</span>
                          <span className="font-medium">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="border-t pt-4 mb-6">
                      <div className="flex justify-between items-center text-lg font-semibold">
                        <span>Order Total</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                    </div>

                    <button className="w-full bg-gray-900 text-white py-3 rounded hover:bg-gray-800 font-medium">
                      Checkout
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
