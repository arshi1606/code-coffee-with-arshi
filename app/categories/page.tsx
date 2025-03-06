// pages/categories/index.tsx
import React from "react";
import Link from "next/link";
import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/lib/sanity/quires/sanityclient";
import { getCategories } from "@/lib/sanity/quires/getCategories";

interface SanityImageAsset {
  _ref: string;
}

interface SanityImage {
  asset: SanityImageAsset;
}

interface Category {
  title: string;
  slug?: { current: string };
  image?: string | SanityImage;
  description?: string;
}

// Setup the URL builder for Sanity images
const builder = imageUrlBuilder(client);
function urlFor(source: string | SanityImage): string {
  return builder.image(source).url();
}

export default async function CategoriesPage() {
  const categories: Category[] = await getCategories();

  return (
    <div className="container mx-auto py-10 px-4 bg-gradient-to-b from-gray-50 to-gray-200 min-h-screen">
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
        Explore Categories
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {categories.map((category, index) => {
          let imageUrl: string | null = null;
          // If image is a non-empty string, use it; otherwise, try building the URL from the asset object.
          if (
            typeof category.image === "string" &&
            category.image.trim() !== ""
          ) {
            imageUrl = category.image;
          } else if (
            category.image &&
            typeof category.image !== "string" &&
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
    </div>
  );
}
