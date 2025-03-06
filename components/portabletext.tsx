// src/components/portabletext.tsx
import { PortableTextReactComponents, PortableTextMarkComponentProps } from "@portabletext/react";
import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/lib/sanity/quires/sanityclient";
import type { PortableTextBlock, PortableTextSpan, TypedObject } from "@portabletext/types";

// ------------------------------------------------------------------
// 1. Define a minimal SanityImageSource interface since the package doesn't export one.
export interface SanityImageSource {
  _ref?: string;
  _type?: string;
  // Add any additional fields as needed.
}

// ------------------------------------------------------------------
// 2. Create the image URL builder using your Sanity client.
const builder = imageUrlBuilder(client);

// Utility function to build image URLs.
export function urlFor(source: SanityImageSource) {
  return builder.image(source).url();
}

// ------------------------------------------------------------------
// 3. A simple slugify function to generate IDs for headings.
const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .normalize()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
};

// ------------------------------------------------------------------
// 4. Define the LinkMark interface.
interface LinkMark extends TypedObject {
  _type: "link";
  href: string;
}

// ------------------------------------------------------------------
// 5. Define the type for image block values.
interface ImageBlock {
  asset: SanityImageSource;
  alt?: string;
}

// ------------------------------------------------------------------
// 6. A helper function to extract text from a block's children.
// PortableTextBlock children are defined as an array of (PortableTextSpan | ArbitraryTypedObject).
// We assume that for headings the first child is a span with a "text" property.
function extractTextFromBlock(value: PortableTextBlock): string {
  if (!value.children || value.children.length === 0) return "";
  const firstChild = value.children[0] as PortableTextSpan;
  return firstChild?.text || "";
}

// ------------------------------------------------------------------
// 7. Define your PortableText components.
export const portableTextComponents: PortableTextReactComponents = {
  types: {
    image: ({ value }: { value: ImageBlock }) => {
      console.log("Image block value:", value);
      const imageUrl = value?.asset ? urlFor(value.asset) : null;
      if (!imageUrl) return null;
      return (
        <div className="flex justify-center my-6">
          <Image
            src={imageUrl}
            alt={value.alt || "Content Image"}
            width={600}
            height={400}
            className="rounded-lg"
          />
        </div>
      );
    },
  },
  block: {
    normal: ({ children }) => (
      <p className="text-theme-charcolBlue font-normal text-[17px] md:text-lg lg:text-xl pb-7 leading-[30px]">
        {children}
      </p>
    ),
    h1: ({ value }: { value: PortableTextBlock }) => {
      const text = extractTextFromBlock(value);
      return (
        <h1
          id={slugify(text)}
          className="text-theme-slateGray text-[35px] sm:text-[40px] md:text-[45px] lg:text-[50px] xl:text-[62px] font-semibold text-left leading-[50px] sm:leading-[55px] md:leading-[60px] lg:leading-[72px]"
        >
          {text}
        </h1>
      );
    },
    h2: ({ value }: { value: PortableTextBlock }) => {
      const text = extractTextFromBlock(value);
      return (
        <h2
          id={slugify(text)}
          className="text-[24px] md:text-[28px] font-semibold font-dm !leading-[1.3] section-title pb-6 pt-8 md:pt-10 lg:pt-11"
        >
          {text}
        </h2>
      );
    },
    h3: ({ value }: { value: PortableTextBlock }) => {
      const text = extractTextFromBlock(value);
      return (
        <h3
          id={slugify(text)}
          className="text-[24px] md:text-[28px] font-semibold font-dm !leading-[1.3] section-title pb-6 pt-8 md:pt-10 lg:pt-11"
        >
          {text}
        </h3>
      );
    },
    h4: ({ value }: { value: PortableTextBlock }) => {
      const text = extractTextFromBlock(value);
      return (
        <h4
          id={slugify(text)}
          className="text-[24px] md:text-[28px] font-semibold font-dm !leading-[1.3] section-title pb-6 pt-8 md:pt-10 lg:pt-11"
        >
          {text}
        </h4>
      );
    },
    h5: ({ value }: { value: PortableTextBlock }) => {
      const text = extractTextFromBlock(value);
      return (
        <h5
          id={slugify(text)}
          className="text-[24px] md:text-[28px] font-semibold font-dm !leading-[1.3] section-title pb-6 pt-8 md:pt-10 lg:pt-11"
        >
          {text}
        </h5>
      );
    },
    h6: ({ value }: { value: PortableTextBlock }) => {
      const text = extractTextFromBlock(value);
      return (
        <h6
          id={slugify(text)}
          className="text-[24px] md:text-[28px] font-semibold font-dm !leading-[1.3] section-title pb-6 pt-8 md:pt-10 lg:pt-11"
        >
          {text}
        </h6>
      );
    },
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-blue-500 pl-4 italic my-4 text-gray-700">
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({
      children,
      value,
    }: PortableTextMarkComponentProps<LinkMark>) => {
      const target = value?.href?.startsWith("http") ? "_blank" : "_self";
      return (
        <a
          href={value?.href || "#"}
          target={target}
          rel={target === "_blank" ? "noopener noreferrer" : undefined}
          className="text-blue-600 underline"
        >
          {children}
        </a>
      );
    },
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside text-theme-charcolBlue font-normal text-[17px] md:text-lg lg:text-xl pb-7 leading-[30px] my-4">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside text-theme-charcolBlue font-normal text-[17px] md:text-lg lg:text-xl pb-7 leading-[30px] my-4">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="ml-4">{children}</li>,
    number: ({ children }) => <li className="ml-4">{children}</li>,
  },
  hardBreak: () => <br />,
  unknownMark: ({ children, markKey }) => (
    <span className="text-red-500">
      [Unknown mark: {markKey}] {children}
    </span>
  ),
  unknownType: ({ value }) => (
    <p className="text-red-500">[Unknown type: {JSON.stringify(value)}]</p>
  ),
  unknownBlockStyle: ({ children, value }) => (
    <p className="text-red-500">
      [Unknown block style: {value.style}] {children}
    </p>
  ),
  unknownList: ({ children }) => (
    <ul className="text-red-500">[Unknown List] {children}</ul>
  ),
  unknownListItem: ({ children }) => (
    <li className="text-red-500">[Unknown List Item] {children}</li>
  ),
};
