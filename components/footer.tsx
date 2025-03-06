// components/Footer.tsx
import React from "react";
import Link from "next/link";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#205161] text-white py-10">
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
    </footer>
  );
}
