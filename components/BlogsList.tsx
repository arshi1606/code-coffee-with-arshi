"use client";

import React, { useState, useMemo, useEffect } from "react";
import BlogNavbar from "./Blogs_Navbar";
import Image from "next/image";
import Link from "next/link";

interface Blog {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt?: string;
  mainImage?: { asset?: { url: string } };
  metaDescription?: string;
  author?: {
    name: string;
    image?: { asset?: { url: string } };
  };
}

interface BlogsListProps {
  blogs: Blog[];
}

const BlogsList: React.FC<BlogsListProps> = ({ blogs }): JSX.Element => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 6; // Display 6 blogs per page

  // Filter blogs based on search term
  const filteredBlogs = useMemo(() => {
    const trimmedSearchTerm = searchTerm.trim().toLowerCase();
    if (trimmedSearchTerm === "") {
      return blogs;
    }
    return blogs.filter(
      (blog) =>
        blog.title.toLowerCase().includes(trimmedSearchTerm) ||
        (blog.metaDescription &&
          blog.metaDescription.toLowerCase().includes(trimmedSearchTerm))
    );
  }, [blogs, searchTerm]);

  // Reset current page to 1 when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const totalPages = Math.ceil(filteredBlogs.length / pageSize);

  // Get blogs for the current page
  const visibleBlogs = filteredBlogs.slice(
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
    <>
      <BlogNavbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {visibleBlogs.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No blogs found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleBlogs.map((blog) => {
            const mainImageUrl = blog?.mainImage?.asset?.url;
            return (
              <article
                key={blog._id}
                className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col"
              >
                {mainImageUrl && (
                  <div className="relative w-full h-60">
                    <Image
                      src={mainImageUrl}
                      alt={blog.title || "Blog Image"}
                      fill
                      style={{ objectFit: "cover" }}
                      className="transition-transform duration-300 hover:scale-110"
                    />
                  </div>
                )}
                <div className="p-6 flex flex-col flex-grow">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-3 hover:text-blue-600 transition-colors">
                    {blog.title}
                  </h2>
                  {blog.author && (
                    <div className="flex items-center mb-4">
                      {blog.author.image?.asset?.url && (
                        <Image
                          src={blog.author.image.asset.url}
                          alt={blog.author.name || "Author"}
                          width={40}
                          height={40}
                          className="rounded-full mr-3 border border-gray-300"
                        />
                      )}
                      <span className="text-sm text-gray-600">
                        by {blog.author.name || "Unknown"}
                      </span>
                    </div>
                  )}
                  {blog.publishedAt && (
                    <p className="text-sm text-gray-500 mb-3">
                      Published on{" "}
                      {new Date(blog.publishedAt).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  )}
                  {blog.metaDescription && (
                    <p className="text-gray-700 mb-4 line-clamp-3 flex-grow">
                      {blog.metaDescription}
                    </p>
                  )}
                  <Link
                    href={`/blog/${blog.slug.current}`}
                    className="mt-auto text-indigo-600 font-medium hover:underline"
                  >
                    Read More
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      )}
      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center items-center space-x-2">
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className="px-4 py-2 border rounded transition-colors bg-white text-[#205161] hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
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
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border rounded transition-colors bg-white text-[#205161] hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </>
  );
};

export default BlogsList;
