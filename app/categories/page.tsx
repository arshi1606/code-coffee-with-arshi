"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/lib/sanity/quires/sanityclient";
import { getCategories } from "@/lib/sanity/quires/getCategories";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

const builder = imageUrlBuilder(client);

function urlFor(source: SanityImageSource) {
  return builder.image(source).url();
}

interface SanityImage {
  asset?: {
    _ref: string;
  };
}

interface Category {
  title: string;
  slug?: { current: string };
  image?: string | SanityImage;
  description?: string;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 6; // Display 6 categories per page

  useEffect(() => {
    async function fetchCategories() {
      const cats: Category[] = await getCategories();
      setCategories(cats);
    }
    fetchCategories();
  }, []);

  const totalPages = Math.ceil(categories.length / pageSize);
  const visibleCategories = categories.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  // Pagination window: display at most 5 numbered page buttons
  const maxPageButtons = 5;
  let startPage: number, endPage: number;
  if (totalPages <= maxPageButtons) {
    startPage = 1;
    endPage = totalPages;
  } else {
    if (currentPage <= Math.ceil(maxPageButtons / 2)) {
      startPage = 1;
      endPage = maxPageButtons;
    } else if (currentPage + Math.floor(maxPageButtons / 2) >= totalPages) {
      startPage = totalPages - maxPageButtons + 1;
      endPage = totalPages;
    } else {
      startPage = currentPage - Math.floor(maxPageButtons / 2);
      endPage = currentPage + Math.floor(maxPageButtons / 2);
    }
  }
  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  return (
    <div className="container mx-auto py-10 px-4 bg-gradient-to-b from-gray-50 to-gray-200 min-h-screen">
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
        Explore Categories
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {visibleCategories.map((category, index) => {
          let imageUrl: string | null = null;
          if (
            typeof category.image === "string" &&
            category.image.trim() !== ""
          ) {
            imageUrl = category.image;
          } else if (
            category.image &&
            (category.image as SanityImage).asset?._ref
          ) {
            imageUrl = urlFor(category.image as SanityImage);
          }

          return (
            <Link
              key={index}
              href={
                category.slug?.current
                  ? `/categories/${category.slug.current}`
                  : "#"
              }
            >
              <div className="border border-gray-200 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-transform duration-300 transform hover:scale-105 cursor-pointer bg-white h-[400px] flex flex-col">
                {imageUrl ? (
                  <div className="relative h-[200px] w-full">
                    <Image
                      src={imageUrl}
                      alt={category.title}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-t-xl"
                    />
                  </div>
                ) : (
                  <div className="h-[200px] bg-gray-300 flex items-center justify-center">
                    <span className="text-gray-700">No Image</span>
                  </div>
                )}
                <div className="p-4 flex-1 overflow-hidden">
                  <h2 className="text-xl font-bold text-gray-900">
                    {category.title}
                  </h2>
                  {category.description && (
                    <p className="mt-2 text-gray-600 overflow-hidden">
                      {category.description}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-8 flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-2">
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className="hidden sm:inline px-4 py-2 border rounded transition-colors bg-white text-[#205161] hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <div className="flex space-x-2">
            {pageNumbers.map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 border rounded transition-colors ${
                  page === currentPage
                    ? "bg-[#205161] text-white"
                    : "bg-white text-[#205161] hover:bg-gray-200"
                }`}
              >
                {page}
              </button>
            ))}
          </div>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="hidden sm:inline px-4 py-2 border rounded transition-colors bg-white text-[#205161] hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
