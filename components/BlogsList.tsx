"use client";

import React, { useState, useMemo } from "react";
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
  const [visibleCount, setVisibleCount] = useState<number>(9);

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

  // Slice the filtered blogs to show only a limited amount
  const visibleBlogs = filteredBlogs.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 9);
  };

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
      {/* Load More Button */}
      {visibleCount < filteredBlogs.length && (
        <div className="mt-8 text-center">
          <button
            onClick={handleLoadMore}
            className="px-6 py-2 bg-[#205161] text-white rounded-full hover:bg-[#272f31] transition"
          >
            Load More
          </button>
        </div>
      )}
    </>
  );
};

export default BlogsList;
