import { groq } from 'next-sanity';
import Image from 'next/image';
import { PortableText } from '@portabletext/react';
import { portableTextComponents } from '@/components/portabletext';
import { client } from '@/lib/sanity/quires/sanityclient';

// GROQ query to fetch the first (or main) author document with all required fields
const aboutMeQuery = groq`
  *[_type == "author"][0]{
    name,
    "imageUrl": image.asset->url,
    bio
  }
`;

export default async function AboutMePage() {
  // Fetch the author document from Sanity
  const author = await client.fetch(aboutMeQuery);

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <section className="max-w-4xl mx-auto bg-white rounded-lg shadow p-8">
        {author.imageUrl && (
          <div className="relative w-32 h-32 rounded-full overflow-hidden mx-auto mb-4">
            <Image 
              src={author.imageUrl} 
              alt={author.name} 
              fill
              className="object-cover" 
            />
          </div>
        )}
        <h1 className="text-3xl font-bold text-center mb-4">About Me</h1>
        <h2 className="text-xl font-semibold text-center mb-2">{author.name}</h2>
        <div className="prose max-w-none">
          <PortableText 
            value={author.bio} 
            components={portableTextComponents} 
          />
        </div>
      </section>
    </main>
  );
}
