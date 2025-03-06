"use client";

import React from "react";
import Link from "next/link";

interface BlogNavbarProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

const BlogNavbar: React.FC<BlogNavbarProps> = ({ searchTerm, setSearchTerm }): JSX.Element => {
  return (
    <div className="flex justify-between items-center w-full mb-16">
      {/* Left side: Blog navigation */}
      <div className="flex items-center space-x-4">
        <Link href="/blogs">
          <h1 className="md:text-5xl font-extrabold text-gray-800 tracking-tight">
            All Blogs Post
          </h1>
        </Link>
      </div>
      
      {/* Right side: Enhanced search bar */}
      <div className="relative w-64">
        <input
          className="w-full pr-12 pl-4 py-2 bg-white border border-gray-300 rounded-full text-lg placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition duration-300 transform hover:scale-105"
          id="search"
          type="search"
          placeholder="Search..."
          autoComplete="off"
          value={searchTerm}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
        />
        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.3333 15.5L9.08333 10.25C8.66667 10.5833 8.1875 10.8472 7.64583 11.0417C7.10417 11.2361 6.52778 11.3333 5.91667 11.3333C4.40278 11.3333 3.12153 10.809 2.07292 9.76042C1.02431 8.71181 0.5 7.43056 0.5 5.91667C0.5 4.40278 1.02431 3.12153 2.07292 2.07292C3.12153 1.02431 4.40278 0.5 5.91667 0.5C7.43056 0.5 8.71181 1.02431 9.76042 2.07292C10.809 3.12153 11.3333 4.40278 11.3333 5.91667C11.3333 6.52778 11.2361 7.10417 11.0417 7.64583C10.8472 8.1875 10.5833 8.66667 10.25 9.08333L15.5 14.3333L14.3333 15.5ZM5.91667 9.66667C6.95833 9.66667 7.84375 9.30208 8.57292 8.57292C9.30208 7.84375 9.66667 6.95833 9.66667 5.91667C9.66667 4.875 9.30208 3.98958 8.57292 3.26042C7.84375 2.53125 6.95833 2.16667 5.91667 2.16667C4.875 2.16667 3.98958 2.53125 3.26042 3.26042C2.53125 3.98958 2.16667 4.875 2.16667 5.91667C2.16667 6.95833 2.53125 7.84375 3.26042 8.57292C3.98958 9.30208 4.875 9.66667 5.91667 9.66667Z"
              fill="#1C1B1F"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default BlogNavbar;
