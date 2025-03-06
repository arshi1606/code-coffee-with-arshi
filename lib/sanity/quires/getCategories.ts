import { client } from "../sanity";
import { groq } from 'next-sanity';

// Fetch all categories (for other uses)
export async function getCategories() {
  const query = `
    *[_type == "category"] {
      title,
      image,
      description,
      slug
    }
  `;
  const categories = await client.fetch(query);
  return categories;
}

// Query a single category by slug
export const categoryBySlugQuery = groq`
  *[_type == "category" && slug.current == $slug][0] {
    _id,
    title,
    description,
    image {
      asset-> {
        url
      }
    },
    slug
  }
`;

// Query to get all blogs that reference this category
export const blogsByCategoryQuery = groq`
  *[_type == "blog" && $categoryId in categories[]._ref && defined(publishedAt) && publishedAt <= now()]
  | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    mainImage {
      asset-> {
        url
      }
    },
    metaDescription
  }
`;

// Query to get 4 categories in descending order of title (reverse alphabetical order)
export const categoriesQuery = groq`
  *[_type == "category"] | order(title desc)[0...4] {
    _id,
    title,
    description,
    image {
      asset-> {
        url
      }
    },
    slug
  }
`;

// Function to fetch a single category by slug (including related blogs)
export async function getCategoryBySlug(slug: string) {
  const query = groq`
    *[_type == "category" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      image,
      description,
      "blogs": *[_type == "blog" && references(^._id)]{
        _id,
        title,
        slug,
        mainImage,
        excerpt
      }
    }
  `;
  const category = await client.fetch(query, { slug });
  return category;
}

// Query to get a category based on slug (removed subcategories field)
export const categoryOrSubCategoryQuery = groq`
  *[
    _type == "category" && slug.current == $slug
  ]{
    title,
    description,
    image {
      asset-> {
        url
      }
    },
    blogs[]->{
      _id,
      title,
      metaDescription,
      slug,
      mainImage {
        asset-> {
          url
        }
      }
    }
  }[0]
`;
export const categoryQuery = groq`
  *[_type == "category" && slug.current == $slug][0] {
    title,
    description,
    image {
      asset-> { url }
    },
    "blogs": *[
      _type == "blog" && references(^._id) && defined(publishedAt) && publishedAt <= now()
    ] | order(publishedAt desc) {
      _id,
      title,
      metaDescription,
      slug,
      mainImage {
        asset-> { url }
      },
      "author": author-> {
        name,
        image { asset-> { url } }
      }
    }
  }
`;

