// Navbar.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getNavbar } from "@/lib/sanity/quires/Navbarquires";
import MobileMenuToggle from "./MobileMenuToggle";
import { TfiAlignJustify as ReorderIcon } from "react-icons/tfi";

export const revalidate = 60;

interface MenuItem {
  title: string;
  link: string;
}

export interface NavbarType {
  menuItems: MenuItem[];
}

// This is a Server Component that fetches data
export default async function Navbar(): Promise<JSX.Element> {
  const navbar: NavbarType = await getNavbar();
  return <NavbarContent navbar={navbar} />;
}

interface NavbarContentProps {
  navbar: NavbarType;
}

function NavbarContent({ navbar }: NavbarContentProps): JSX.Element {
  return (
    <header
      id="header"
      className="sticky top-0 left-0 right-0 z-50 border-b border-gray-200 bg-white"
    >
      {/* Desktop view (Logo - Menu) */}
      <div className="hidden lg:block">
        <div className="container mx-auto max-w-screen-xl px-8 py-4">
          <div className="flex items-center justify-between">
            <Logo />
            <DesktopMenu navbar={navbar} />
          </div>
        </div>
      </div>
      {/* Mobile view */}
      <MobileMenuToggle navbar={navbar} />
    </header>
  );
}

function Logo(): JSX.Element {
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

function LogoSmall(): JSX.Element {
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

interface DesktopMenuProps {
  navbar: NavbarType;
}

function DesktopMenu({ navbar }: DesktopMenuProps): JSX.Element {
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
