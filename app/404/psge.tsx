// app/not-found.js
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="px-6 py-16">
            <h1 className="text-9xl font-bold text-gray-500 mb-4">404</h1>
            <h2 className="text-3xl font-semibold text-gray-900 mb-6">Page Not Found</h2>
            <div className="max-w-md mx-auto">
              <p className="text-lg text-gray-600 mb-8">
                Oops! It seems like you've ventured into uncharted territory. 
                The page you're looking for might have moved or doesn't exist.
              </p>
              <div className="space-y-4">
                <button 
                  onClick={() => router.back()} 
                  className="inline-block px-6 py-3 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 transition-colors duration-200 mr-4"
                >
                  Go Back
                </button>
                <Link 
                  href="/"
                  className="inline-block px-6 py-3 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-900 transition-colors duration-200"
                >
                  Return Home
                </Link>
              </div>
              <div className="mt-12">
                <p className="text-gray-500">
                  If you believe this is a mistake, please don't hesitate to{' '}
                  <Link 
                    href="/contact" 
                    className="text-gray-500 hover:text-gray-600 font-medium"
                  >
                    contact us
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}