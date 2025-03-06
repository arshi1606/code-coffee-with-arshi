"use client";

import React from 'react';
import Link from 'next/link';

export default function NotFound(): JSX.Element {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-8xl font-bold text-gray-900 mb-4">
          4<span className="text-[#2DAA9E]">0</span>4
        </h1>

        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          Page Not Found
        </h2>
        
        <p className="text-lg text-gray-600 mb-8">
          Oops! The page you&apos;re looking for seems to have wandered off.
          Let&apos;s help you find your way back.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#2DAA9E] text-white rounded-lg hover:bg-[#3d5856] transition-colors duration-200"
          >
            <span>Go Home</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
