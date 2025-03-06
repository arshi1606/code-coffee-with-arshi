import React from "react";
import Link from "next/link";
import { getCategories } from "@/lib/sanity/quires/getCategories";

interface SubCategory {
  title: string;
  slug?: {
    current: string;
  };
}

interface Category {
  title: string;
  slug?: {
    current: string;
  };
  subCategories?: SubCategory[];
}

export default async function CategoriesNavbar() {
  const categories: Category[] = await getCategories();
  return <CategoriesNavbarContent categories={categories} />;
}

function CategoriesNavbarContent({ categories }: { categories: Category[] }) {
  return ( 
    <div className="container mx-auto">
      <ul
        className="
          no-scrollbar
          flex
          flex-nowrap
          gap-4
          whitespace-nowrap
          text-gray-600
          overflow-x-auto
          overflow-y-visible
          bg-gray-200
          py-3
          px-2
        "
      >
        {categories.map((category, index) => (
          <React.Fragment key={index}>
            <li className="relative group">
              <Link
                href={category.slug?.current ? `/categories/${category.slug.current}` : "#"}
                className="hover:text-gray-900 transition-colors"
              >
                {category.title}
              </Link>
              {category.subCategories && category.subCategories.length > 0 && (
                <ul
                  className="
                    absolute
                    left-0
                    mt-2
                    w-48
                    bg-white
                    border
                    border-gray-200
                    text-gray-800
                    opacity-0
                    group-hover:opacity-100
                    transition-opacity
                    duration-300
                    z-20
                  "
                >
                  {category.subCategories.map((subCategory, subIndex) => (
                    <li key={subIndex} className="hover:bg-gray-100">
                      <Link
                        href={
                          category.slug?.current && subCategory.slug?.current
                            ? `/categories/${category.slug.current}/${subCategory.slug.current}`
                            : "#"
                        }
                      >
                        <span className="block px-4 py-2">
                          {subCategory.title}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
            {index !== categories.length - 1 && (
              <li className="flex items-center text-gray-300">|</li>
            )}
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
}
