import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <Link
            href="/"
            className="inline-flex items-center text-white hover:text-gray-300 transition-colors"
            aria-label="Apply Digital - Go to homepage"
          >
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-white text-gray-900 flex items-center justify-center text-xs font-bold">
                ▲
              </div>
              <span className="text-lg font-bold">APPLY</span>
            </div>
          </Link>
        </div>
      </div>
    </footer>
  );
};
