import { groq } from 'next-sanity';
import { client } from "@/lib/sanity/quires/sanityclient";

// export const blogsQuery = groq`
//   *[_type == "blog" && defined(publishedAt) && publishedAt <= now()] 
//   | order(publishedAt desc) {
//     _id,
//     title,
//     slug,
//     publishedAt,
//     "author": author->{
//       name,
//       image { asset-> { url } }
//     },
//     mainImage {
//       asset-> {
//         url
//       }
//     },
//     metaDescription,
//     "categories": categories[]->title
//   }
// `;

export async function getBlogBySlug(slug: string) {
  const query = groq`
    *[_type == "blog" && slug.current == $slug && defined(publishedAt) && publishedAt <= now()]{
      title,
      mainImage {
        asset->{
          url
        }
      },
      publishedAt,
      body,
      heading[]{
        _type,
        style,
        children[]{
          text
        },
        _key
      },
      author->{
        name,
        image{
          asset->{
            url
          }
        }
      },
      slug
    }
  `;
  const params = { slug };
  return client.fetch(query, params);
}

export const latestBlogsQuery = groq`
  *[_type == "blog" && defined(publishedAt) && publishedAt <= now()] 
  | order(publishedAt desc)[0...3] {
    _id,
    title,
    slug,
    publishedAt,
    "author": author->{
      name,
      image { asset-> { url } }
    },
    mainImage {
      asset->{
        url
      }
    },
    metaDescription,
    "categories": categories[]->title
  }
`;

export const blogsQuery = (searchTerm = "") => {
  const searchFilter = searchTerm
    ? ` && (title match "*${searchTerm}*" || metaDescription match "*${searchTerm}*" || categories[]->title match "*${searchTerm}*")`
    : "";
  return `*[_type == "blog"${searchFilter}] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    mainImage{
      asset->{
        url
      }
    },
    author->{
      name,
      image{
        asset->{
          url
        }
      }
    },
    metaDescription
  }`;
};
