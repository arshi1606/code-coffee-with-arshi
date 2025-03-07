// page.tsx
import { blogsQuery } from '@/lib/sanity/quires/getblogs';
import { client } from '@/lib/sanity/quires/sanityclient';
import BlogsList from '@/components/BlogsList'; // adjust the path as needed

interface Blog {
  _id: string;
  title: string;
  slug: { current: string };
  mainImage?: { asset: { url: string } };
  publishedAt: string;
  // add any additional fields as needed
}

export default async function BlogsPage() {
  const blogs = await client.fetch<Blog[]>(blogsQuery());
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 py-16">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12">
        <BlogsList blogs={blogs} />
      </div>
    </main>
  );
}
