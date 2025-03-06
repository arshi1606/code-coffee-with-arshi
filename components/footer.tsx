"use client";
import React from "react";
import Link from "next/link";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

function ScrollUpButton(): JSX.Element {
  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollUp}
      className="absolute bottom-8 right-8 p-3 bg-white text-[#205161] border border-[#205161] rounded-full shadow-lg hover:bg-gray-200 active:bg-transparent transition-colors duration-200"
      aria-label="Scroll to top"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
      </svg>
    </button>
  );
}

export default function Footer(): JSX.Element {
  return (
    <footer className="relative bg-[#205161] text-white py-10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-4">Code & Coffee with Arshi</h2>
            <p className="mb-4 text-gray-300">
              This is a personal blog site showcasing my blogs related to coding and lifestyle.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-black transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/blogs" className="hover:text-black transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-black transition-colors">
                  About Me
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-black transition-colors">
                  Contact Me
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Social Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="https://www.linkedin.com/in/arshi-patel1606/"
                  target="_blank"
                  className="flex items-center hover:text-black transition-colors"
                >
                  <FaLinkedinIn className="mr-2" /> LinkedIn
                </Link>
              </li>
              <li>
                <Link
                  href="https://instagram.com"
                  target="_blank"
                  className="flex items-center hover:text-black transition-colors"
                >
                  <FaInstagram className="mr-2" /> Instagram
                </Link>
              </li>
              <li>
                <Link
                  href="https://facebook.com"
                  target="_blank"
                  className="flex items-center hover:text-black transition-colors"
                >
                  <FaFacebookF className="mr-2" /> Facebook
                </Link>
              </li>
              <li>
                <Link
                  href="https://twitter.com"
                  target="_blank"
                  className="flex items-center hover:text-black transition-colors"
                >
                  <FaTwitter className="mr-2" /> Twitter
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section: centered text */}
        <div className="mt-8 border-t border-gray-700 pt-4 flex justify-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Code & Coffee with Arshi. All Rights Reserved.
          </p>
        </div>
      </div>
      <ScrollUpButton />
    </footer>
  );
}
