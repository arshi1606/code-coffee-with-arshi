// src/components/portabletext.tsx
import { PortableTextReactComponents, PortableTextMarkComponentProps } from "@portabletext/react";
import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/lib/sanity/quires/sanityclient"; // adjust path as needed
import type { TypedObject } from "@portabletext/types";

// Create the image URL builder using your Sanity client.
const builder = imageUrlBuilder(client);

// Utility function to build image URLs.
export function urlFor(source: any) {
  return builder.image(source).url();
}

// Simple slugify function to generate IDs for headings.
const slugify = (text: any) => {
  return text
    .toString()
    .toLowerCase()
    .normalize()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
};

// Create a LinkMark interface that extends TypedObject.
interface LinkMark extends TypedObject {
  _type: "link";
  href: string;
}

export const portableTextComponents: PortableTextReactComponents = {
  types: {
    image: ({ value }) => {
      // Debug: log the image block data
      console.log("Image block value:", value);
      
      // Check if asset data exists. Note: if your block uses a different structure or type (e.g., "figure"),
      // update this check accordingly.
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
    h1: ({ value }: any) => (
      <h1
        id={slugify(value.children[0].text)}
        className="text-theme-slateGray text-[35px] sm:text-[40px] md:text-[45px] lg:text-[50px] xl:text-[62px] font-semibold text-left leading-[50px] sm:leading-[55px] md:leading-[60px] lg:leading-[72px]"
      >
        {value.children[0].text}
      </h1>
    ),
    h2: ({ value }: any) => (
      <h2
        id={slugify(value.children[0].text)}
        className="text-[24px] md:text-[28px] font-semibold font-dm !leading-[1.3] section-title pb-6 pt-8 md:pt-10 lg:pt-11"
      >
        {value.children[0].text}
      </h2>
    ),
    h3: ({ value }: any) => (
      <h3
        id={slugify(value.children[0].text)}
        className="text-[24px] md:text-[28px] font-semibold font-dm !leading-[1.3] section-title pb-6 pt-8 md:pt-10 lg:pt-11"
      >
        {value.children[0].text}
      </h3>
    ),
    h4: ({ value }: any) => (
      <h4
        id={slugify(value.children[0].text)}
        className="text-[24px] md:text-[28px] font-semibold font-dm !leading-[1.3] section-title pb-6 pt-8 md:pt-10 lg:pt-11"
      >
        {value.children[0].text}
      </h4>
    ),
    h5: ({ value }: any) => (
      <h5
        id={slugify(value.children[0].text)}
        className="text-[24px] md:text-[28px] font-semibold font-dm !leading-[1.3] section-title pb-6 pt-8 md:pt-10 lg:pt-11"
      >
        {value.children[0].text}
      </h5>
    ),
    h6: ({ value }: any) => (
      <h6
        id={slugify(value.children[0].text)}
        className="text-[24px] md:text-[28px] font-semibold font-dm !leading-[1.3] section-title pb-6 pt-8 md:pt-10 lg:pt-11"
      >
        {value.children[0].text}
      </h6>
    ),
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
