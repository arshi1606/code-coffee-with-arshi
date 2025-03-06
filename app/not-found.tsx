"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function NotFound(): JSX.Element {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center justify-center min-h-screen p-8 bg-gradient-to-b from-gray-50 to-gray-100"
    >
      <div className="text-center max-w-2xl mx-auto">
        <motion.h1
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-8xl font-bold text-gray-900 mb-4"
        >
          4<span className="text-[#2DAA9E]">0</span>4
        </motion.h1>

        <motion.h2
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-semibold text-gray-800 mb-4"
        >
          Page Not Found
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-lg text-gray-600 mb-8"
        >
          Oops! The page you&apos;re looking for seems to have wandered off.
          Let&apos;s help you find your way back.
        </motion.p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#2DAA9E] text-white rounded-lg hover:bg-[#3d5856] transition-colors duration-200"
          >
            <span>Go Home</span>
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-[#2DAA9E] text-[#2DAA9E] rounded-lg hover:bg-[#2DAA9E] hover:text-white transition-colors duration-200"
          >
            <span>Contact Support</span>
          </Link>
        </div>
      </div>
    </motion.main>
  );
}
