import React from "react";
import Link from "next/link";
import { getBlogBySlug } from "@/lib/sanity/quires/getblogs";
import { PortableText } from "@portabletext/react";
import { portableTextComponents } from "@/components/portabletext";

interface HeadingBlock {
  _type: string;
  style: string;
  children: Array<{ text: string }>;
  _key: string;
}

interface Blog {
  title: string;
  mainImage: { asset: { url: string } };
  publishedAt: string;
  body: any;
  heading?: HeadingBlock[];
  author?: {
    name: string;
    image?: { asset?: { url: string } };
  };
}

interface BlogDetailsProps {
  params: {
    slug: string;
  };
}

const slugify = (text: string) => {
  return text
    .toLowerCase()
    .normalize("NFD")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
};

// Helper to extract heading blocks from the PortableText body
const extractHeadings = (blocks: any[]): HeadingBlock[] => {
  return blocks
    .filter(
      (block: any) =>
        block._type === "block" &&
        typeof block.style === "string" &&
        /^h\d/.test(block.style)
    )
    .map((block: any) => ({
      _type: block._type,
      style: block.style,
      children: block.children,
      _key: block._key,
    }));
};

export default async function MirrorBlogDetails({ params: { slug } }: BlogDetailsProps) {
  const blogData = await getBlogBySlug(slug);
  const blog: Blog | null = blogData?.[0] ?? null;

  if (!blog) {
    return <p className="text-center text-lg text-[#205161] mt-10">Blog not found.</p>;
  }

  // Use the heading field if it exists and has items; otherwise, extract from the body.
  const headings: HeadingBlock[] =
    blog.heading && blog.heading.length > 0 ? blog.heading : extractHeadings(blog.body);

  return (
    // Increased container width: max-w-7xl instead of max-w-5xl
    <div className="max-w-7xl mx-auto px-6 pt-16 pb-10">
      {/* Header */}
      <div className="flex flex-col gap-6 mb-12">
        <h1 className="text-4xl sm:text-5xl md:text-6xl text-center font-extrabold text-[#205161]">
          {blog.title}
        </h1>
        <div className="flex justify-center items-center gap-3">
          {blog.author?.image?.asset?.url && (
            <img
              alt={blog.author?.name || "Unknown"}
              className="rounded-full w-10 h-10 border-2 border-[#205161]"
              src={blog.author.image.asset.url}
            />
          )}
          <span className="text-base text-[#205161]">
            By {blog.author?.name || "Unknown"}
          </span>
          <span className="text-base text-[#205161] mx-2">|</span>
          <span className="text-base text-[#205161]">
            {new Date(blog.publishedAt).toDateString()}
          </span>
        </div>
      </div>

      {/* Main Image Banner (smaller & centered) */}
      {blog.mainImage?.asset?.url && (
        <div className="mb-10 flex justify-center">
          <img
            src={blog.mainImage.asset.url}
            alt={blog.title}
            className="w-3/4 rounded-lg shadow-lg"
          />
        </div>
      )}

      {/* Content & Table of Contents (Mirrored Layout) */}
      <div className="flex flex-col md:flex-row-reverse gap-10">
        {/* Sidebar with Back Button & TOC */}
        <aside className="hidden md:block md:w-1/4 sticky top-32 h-[calc(100vh-8rem)] overflow-auto p-6 rounded-lg shadow-lg">
          <div className="mb-6">
            <Link
              href="/blogs"
              className="flex items-center justify-center gap-2 bg-[#205161] text-white font-medium px-4 py-2 rounded-full hover:bg-[#17394a] transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Back to Articles
            </Link>
          </div>
          <h2 className="text-lg font-semibold text-[#205161] mb-4">Table of Contents</h2>
          <nav className="flex flex-col gap-2">
            {headings.map((item) => {
              const text = item.children.map((child) => child.text).join("") || "Untitled";
              const anchor = slugify(text);
              return (
                <a
                  key={item._key}
                  href={`#${anchor}`}
                  className="text-sm py-1 px-2 rounded-md hover:bg-[#205161] hover:text-white transition-colors"
                >
                  {text}
                </a>
              );
            })}
          </nav>
        </aside>

        {/* Blog Body */}
        <main className="w-full md:w-3/4">
          <article className="prose max-w-none pb-16 text-[#205161]">
            <PortableText value={blog.body} components={portableTextComponents} />
          </article>
        </main>
      </div>
    </div>
  );
}
