"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { CONTAINER } from "../utils/ui";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { name: "Home", href: "/" },
    { name: "Find a Work", href: "#" },
    { name: "Find Talent", href: "#" },
    { name: "How It Works", href: "#" },
  ];

  return (
    <header className="bg-white">
        <div className={CONTAINER}>
        {/* Border only under logo-to-login */}
        <div className="flex justify-between items-center h-16 border-b border-gray-300">
          
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span className="font-semibold text-lg tracking-wide">
              SKILLNODE.
            </span>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`relative group font-medium transition-colors ${
                  pathname === link.href
                    ? " text-md"
                    : "text-gray-700 hover:text-black text-sm"
                }`}
              
              style={ pathname === link.href ? { color: "#e61d88ff" } : {}}
              >
                {link.name}
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-black transition-all group-hover:w-full"
                 style={{
          backgroundColor: pathname === link.href ? "#cf237fff" : "#000000",
        }}
                
                ></span>
              </Link>
            ))}
          </nav>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center gap-4 font-medium">
            <Link
              href="#"
              className="text-gray-700 hover:text-black transition-colors"
            >
              Sign Up
            </Link>
            <Link
              href="#"
              className="border border-gray-400 rounded-full px-4 py-1 hover:bg-gray-100 transition-colors"
            >
              Log In
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Dropdown with Animation */}
      <div
        className={`md:hidden bg-white overflow-hidden transition-all duration-300 ease-in-out ${
          mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col p-4 gap-3 font-medium">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`transition-colors ${
                pathname === link.href
                  ? "text-blue-600"
                  : "text-gray-700 hover:text-black"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link href="#" onClick={() => setMobileOpen(false)}>Sign Up</Link>
          <Link href="#" onClick={() => setMobileOpen(false)}>Log In</Link>
        </nav>
      </div>
    </header>
  );
}
