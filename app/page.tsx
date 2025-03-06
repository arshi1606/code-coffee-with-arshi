import { latestBlogsQuery } from '@/lib/sanity/quires/getblogs';
import { categoriesQuery } from '@/lib/sanity/quires/getCategories';
import { client } from '@/lib/sanity/quires/sanityclient';
import Image from 'next/image';
import Link from 'next/link';

interface Blog {
  _id: string;
  title: string;
  metaDescription?: string;
  mainImage?: {
    asset?: {
      url: string;
    };
  };
  author?: {
    name?: string;
    image?: {
      asset?: {
        url: string;
      };
    };
  };
  slug: {
    current: string;
  };
}

interface Category {
  title: string;
  slug?: { current?: string };
  image?: {
    asset?: {
      url: string;
    };
  };
}

export default async function HomePage() {
  // Fetch the latest 3 blog posts and up to 4 categories
  const blogs: Blog[] = await client.fetch<Blog[]>(latestBlogsQuery);
  const categories: Category[] = await client.fetch<Category[]>(categoriesQuery, { limit: 4 });

  return (
    <main className="min-h-screen bg-gray-50">
      {/* ✅ Hero Section */}
      <section className="relative bg-[#205161] text-white py-24 md:py-32 flex flex-col items-center text-center shadow-inner">
        <div className="absolute inset-0 bg-black opacity-30 mix-blend-overlay"></div>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 relative z-10 animate-fade-in drop-shadow-lg">
          Discover Ideas, Insights & Inspiration
        </h1>
        <p className="text-lg md:text-xl max-w-4xl text-gray-200 mb-2 relative z-10 animate-slide-in">
          Unlock the power of knowledge with trending stories, expert opinions, and deep insights.
        </p>
        <p className="text-base md:text-lg text-gray-300 relative z-10 mb-6 italic">
          ~ Arshi Patel
        </p>
        <div className="flex flex-col sm:flex-row gap-4 relative z-10">
          <Link
            href="/blogs"
            className="bg-white text-[#205161] px-6 py-3 md:px-8 md:py-3 rounded-full font-semibold transition transform hover:scale-105 hover:bg-gray-100 shadow-md"
          >
            Explore Articles
          </Link>
          <Link
            href="/about"
            className="bg-transparent border border-white text-white px-6 py-3 md:px-8 md:py-3 rounded-full font-semibold transition transform hover:scale-105 hover:bg-white hover:text-[#205161] shadow-md"
          >
            Learn More About Me
          </Link>
        </div>
      </section>

      {/* ✅ Latest Blogs Section */}
      <section className="py-16 px-4 md:px-12">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-0">Blogs</h2>
            <Link href="/blogs" className="text-[#205161] font-medium hover:underline">
              View All Blogs
            </Link>
          </div>
          {blogs && blogs.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {blogs.map((blog: Blog) => {
                const mainImageUrl = blog?.mainImage?.asset?.url;
                return (
                  <article
                    key={blog._id}
                    className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition transform hover:-translate-y-2"
                  >
                    {mainImageUrl && (
                      <div className="relative h-40 md:h-48 w-full">
                        <Image
                          src={mainImageUrl}
                          alt={blog.title || 'Blog Image'}
                          fill
                          style={{ objectFit: 'cover' }}
                          className="transition-transform duration-300 hover:scale-105"
                        />
                      </div>
                    )}
                    <div className="p-4 md:p-6">
                      <h3 className="text-xl md:text-2xl text-black font-black mb-2 hover:text-[#205161] transition-colors">
                        {blog.title}
                      </h3>
                      {blog.metaDescription && (
                        <p className="text-gray-600 mb-3 line-clamp-3 text-sm md:text-base">
                          {blog.metaDescription}
                        </p>
                      )}
                      {/* Author Info Section */}
                      <div className="flex items-center mt-3">
                        {blog.author?.image?.asset?.url ? (
                          <div className="relative h-8 w-8 md:h-10 md:w-10 mr-2">
                            <Image
                              src={blog.author.image.asset.url}
                              alt={blog.author.name || 'Author'}
                              fill
                              style={{ objectFit: 'cover' }}
                              className="rounded-full"
                            />
                          </div>
                        ) : (
                          <div className="h-8 w-8 md:h-10 md:w-10 mr-2 bg-gray-300 rounded-full flex items-center justify-center">
                            <span className="text-xs text-gray-500">NA</span>
                          </div>
                        )}
                        <p className="text-gray-700 font-medium text-sm md:text-base">
                          {blog.author?.name || 'Unknown Author'}
                        </p>
                      </div>
                      <Link
                        href={`/blog/${blog.slug.current}`}
                        className="text-[#205161] font-medium hover:underline mt-3 inline-block text-sm md:text-base"
                      >
                        Read More
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <p className="text-center text-gray-500">No blogs available at the moment.</p>
          )}
        </div>
      </section>

      {/* ✅ Decorative Separator */}
      <div className="flex justify-center my-8 md:my-12">
        <hr className="w-11/12 md:w-3/4 border-t-2 border-gray-300" />
      </div>

      {/* ✅ Categories Section */}
      <section className="py-16 px-4 md:px-12">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-0">Categories</h2>
            <Link href="/categories" className="text-[#205161] font-medium hover:underline">
              View All Categories
            </Link>
          </div>
          {categories && categories.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
              {categories.map((category: Category, index: number) => {
                const imageUrl = category.image?.asset?.url || "";
                return (
                  <Link
                    key={index}
                    href={
                      category.slug?.current
                        ? `/categories/${category.slug.current}`
                        : "#"
                    }
                  >
                    <div className="border border-gray-200 rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-transform duration-300 transform hover:scale-105 cursor-pointer bg-white h-72 md:h-80 flex flex-col">
                      {imageUrl ? (
                        <div className="relative h-40 md:h-56 w-full">
                          <Image
                            src={imageUrl}
                            alt={category.title}
                            fill
                            style={{ objectFit: 'cover' }}
                            className="rounded-t-xl"
                          />
                        </div>
                      ) : (
                        <div className="h-40 md:h-56 bg-gray-300 flex items-center justify-center">
                          <span className="text-gray-700">No Image</span>
                        </div>
                      )}
                      <div className="p-4 flex-1 overflow-hidden">
                        <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                          {category.title}
                        </h2>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <p className="text-center text-gray-500">No categories available at the moment.</p>
          )}
        </div>
      </section>

      {/* ✅ Additional Information Section */}
      <section className="py-16 px-4 md:px-12 bg-gradient-to-b from-gray-100 to-gray-200">
        <div className="max-w-screen-xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-gray-900">Did You Know?</h2>
          <p className="text-base md:text-lg text-gray-700 mb-3">
            My journey began as a spark of curiosity and has evolved into a vibrant community of thinkers and innovators.
          </p>
          <p className="text-base md:text-lg text-gray-700 mb-3">
            Explore surprising stories and insights that challenge the status quo and ignite creative thinking in unexpected ways.
          </p>
          <p className="text-base md:text-lg text-gray-700 mb-6">
            Whether you&apos;re a seasoned professional or just starting out, My platform offers a unique blend of perspectives designed to inspire and inform.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/contact"
              className="bg-[#205161] text-white px-6 py-3 md:px-8 md:py-3 rounded-full font-semibold transition transform hover:scale-105 hover:bg-[#1a3c4e] shadow-md"
            >
              Contact Me
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
