import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { groq } from "next-sanity";
import { client } from "@/lib/sanity/quires/sanityclient";
import { categoryQuery } from "@/lib/sanity/quires/getCategories";

// Generate static params for Next.js 13 app router
export async function generateStaticParams() {
  const categories: { slug?: { current?: string } }[] = await client.fetch(
    groq`*[_type == "category"] { slug }`
  );

  // Filter out documents with invalid slugs
  const validCategories = categories.filter(
    (category) => category.slug && category.slug.current
  );

  return validCategories.map((category) => ({
    slug: category.slug!.current,
  }));
}

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function CategoryPage({ params }: PageProps) {
  // Fetch data based on the slug parameter using the updated query
  const categoryData = await client.fetch(categoryQuery, {
    slug: params.slug,
  });

  if (!categoryData) {
    notFound();
  }

  const { title, description, image, blogs } = categoryData;

  return (
    <div className="container mx-auto bg-gradient-to-b from-gray-50 to-gray-200 py-10 px-4 min-h-screen">
      <h1 className="text-4xl font-extrabold text-center text-gray-800">
        {title}
      </h1>

      {image?.asset?.url && (
        <div className="flex justify-center my-6">
          <Image
            src={image.asset.url}
            alt={title}
            width={600}  // Image is a bit smaller now
            height={300} // Image is a bit smaller now
            className="rounded-lg shadow-lg"
          />
        </div>
      )}

      <p className="text-center text-gray-600 mt-4">{description}</p>

      {/* Display blogs if they exist */}
      {blogs?.length > 0 ? (
        <div className="mt-10">
          <h2 className="text-2xl font-semibold">All Blogs</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
            {blogs.map(
              (blog: {
                _id: string;
                slug: { current: string };
                title: string;
                metaDescription: string;
                mainImage: { asset: { url: string } };
                author?: {
                  name: string;
                  image?: { asset?: { url: string } };
                };
              }) => (
                <Link key={blog._id} href={`/blog/${blog.slug.current}`}>
                  <div className="border rounded-lg overflow-hidden shadow hover:shadow-lg cursor-pointer flex flex-col h-96">
                    {blog.mainImage?.asset?.url && (
                      <div className="relative h-1/2 w-full">
                        <Image
                          src={blog.mainImage.asset.url}
                          alt={blog.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="p-4 flex flex-col justify-between flex-grow">
                      <h3 className="text-lg text-black font-semibold">{blog.title}</h3>
                      <p className="text-sm text-gray-600">
                        {blog.metaDescription}
                      </p>
                      <div className="mt-4 flex items-center">
                        {blog.author?.image?.asset?.url && (
                          <div className="relative h-8 w-8 mr-2">
                            <Image
                              src={blog.author.image.asset.url}
                              alt={blog.author.name}
                              fill
                              className="object-cover rounded-full"
                            />
                          </div>
                        )}
                        <span className="text-xs text-gray-500">
                          {blog.author?.name}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              )
            )}
          </div>
        </div>
      ) : (
        <p className="text-center mt-6 text-gray-600">
          No blogs available in this category.
        </p>
      )}
    </div>
  );
}
