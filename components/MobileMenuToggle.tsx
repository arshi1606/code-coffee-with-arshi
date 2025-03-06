// MobileMenuToggle.tsx
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { TfiAlignJustify as ReorderIcon } from "react-icons/tfi";
import { NavbarType } from "./Navbar";

interface MobileMenuToggleProps {
  navbar: NavbarType;
}

export default function MobileMenuToggle({ navbar }: MobileMenuToggleProps): JSX.Element {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const LogoSmall = (): JSX.Element => (
    <Link href="/">
      <Image
        src="/logo.png"
        alt="Logo"
        width={140}
        height={60}
        priority
        className="w-auto"
      />
    </Link>
  );

  return (
    <div className="lg:hidden">
      <div className="w-full">
        <div className="container mx-auto max-w-screen-xl px-6 py-3 flex items-center justify-between">
          <LogoSmall />
          <button onClick={toggleMenu} className="cursor-pointer">
            <ReorderIcon className="text-2xl text-black" />
          </button>
        </div>
      </div>
      {isOpen && (
        <div
          className="fixed top-0 right-0 w-full h-full bg-gradient-to-b from-[#27667B] to-[#1F4E5B] text-white p-6 transition-transform duration-300 z-50 backdrop-blur-md"
        >
          <div className="flex justify-end mb-6">
            <button onClick={closeMenu} className="cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#fff"
                className="w-7 h-7"
              >
                <path d="M10.5859 12L2.79297 4.20706L4.20718 2.79285L12.0001 10.5857L19.793 2.79285L21.2072 4.20706L13.4143 12L21.2072 19.7928L19.793 21.2071L12.0001 13.4142L4.20718 21.2071L2.79297 19.7928L10.5859 12Z" />
              </svg>
            </button>
          </div>
          <nav className="flex flex-col gap-8">
            {navbar.menuItems.map((item, index) => (
              <Link
                key={index}
                href={item.link}
                onClick={closeMenu}
                className="text-2xl font-bold hover:opacity-80 transition-opacity duration-500"
              >
                {item.title}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}
