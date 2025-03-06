"use client";

import React, { useState } from "react";
import { FiSearch, FiX } from "react-icons/fi";

export default function SearchBar() {
  const [query, setQuery] = useState("");

  const handleCancel = () => {
    setQuery("");
  };

  return (
    <div className="flex items-center bg-white rounded-full px-4 py-2 border border-black w-full max-w-sm">
      <FiSearch className="text-gray-600 mr-2" />
      <input
        type="text"
        placeholder="Search..."
        className="flex-grow outline-none text-gray-800 placeholder-gray-500"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {query && (
        <button onClick={handleCancel} className="ml-2">
          <FiX className="text-gray-600" />
        </button>
      )}
    </div>
  );
}
