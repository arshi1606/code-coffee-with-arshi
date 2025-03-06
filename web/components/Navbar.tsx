import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getNavbar } from "@/lib/sanity/quires/Navbarquires";
import { TfiAlignJustify as ReorderIcon } from "react-icons/tfi";

export const revalidate = 60;

interface MenuItem {
  title: string;
  link: string;
}

interface NavbarType {
  menuItems: MenuItem[];
}

export default async function Navbar() {
  const navbar: NavbarType = await getNavbar();
  return <NavbarContent navbar={navbar} />;
}

function NavbarContent({ navbar }: { navbar: NavbarType }) {
  return (
    <header
      id="header"
      className="sticky top-0 left-0 right-0 z-50 border-b border-gray-200 bg-white"
    >
      {/* Desktop view (Logo - Menu) */}
      <div className="hidden lg:block">
        <div className="container mx-auto max-w-screen-xl px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Left: Logo */}
            <Logo />
            {/* Right: Nav Menu */}
            <DesktopMenu navbar={navbar} />
          </div>
        </div>
      </div>
      {/* Mobile view remains unchanged */}
      <MobileMenuToggle navbar={navbar} />
    </header>
  );
}

function Logo() {
  return (
    <Link href="/">
      <Image
        src="/logo.png"
        alt="Logo"
        width={175}
        height={75}
        priority
        className="w-auto"
      />
    </Link>
  );
}

function LogoSmall() {
  return (
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
}

function DesktopMenu({ navbar }: { navbar: NavbarType }) {
  return (
    <nav className="flex items-center gap-12">
      {navbar.menuItems.map((item, index) => (
        <Link
          key={index}
          href={item.link}
          className="text-[#27667B] font-semibold hover:opacity-80 transition-opacity duration-200"
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
}

function MobileMenuToggle({ navbar }: { navbar: NavbarType }) {
  return (
    <div className="lg:hidden">
      <input type="checkbox" id="mobile-menu-toggle" className="peer hidden" />
      <div className="w-full">
        <div className="container mx-auto max-w-screen-xl px-6 py-3 flex items-center justify-between">
          <LogoSmall />
          <label htmlFor="mobile-menu-toggle" className="cursor-pointer">
            <ReorderIcon className="text-2xl text-black" />
          </label>
        </div>
      </div>
      <div
        className="peer-checked:translate-x-0 translate-x-full fixed top-0 right-0 w-full h-full 
                   bg-gradient-to-b from-[#27667B] to-[#1F4E5B] text-white p-6 transition-transform 
                   duration-300 z-50 backdrop-blur-md"
      >
        <div className="flex justify-end mb-6">
          <label htmlFor="mobile-menu-toggle" className="cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#fff"
              className="w-7 h-7"
            >
              <path d="M10.5859 12L2.79297 4.20706L4.20718 2.79285L12.0001 10.5857L19.793 2.79285L21.2072 4.20706L13.4143 12L21.2072 19.7928L19.793 21.2071L12.0001 13.4142L4.20718 21.2071L2.79297 19.7928L10.5859 12Z" />
            </svg>
          </label>
        </div>
        <nav className="flex flex-col gap-8">
          {navbar.menuItems.map((item, index) => (
            <Link
              key={index}
              href={item.link}
              className="text-2xl font-bold hover:opacity-80 transition-opacity duration-200"
            >
              {item.title}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
