"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Menu, X, UserPlus, LogIn } from "lucide-react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { CONTAINER } from "../utils/ui";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);

  const links = [
    { name: "Home", href: "/" },
    { name: "Find A Work", href: "#" },
    { name: "Find Talent", href: "#" },
    { name: "How It Works", href: "#" },
  ];

  // Close on ESC
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMobileOpen(false);
    }
    if (mobileOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  // Focus panel on open
  useEffect(() => {
    if (mobileOpen && panelRef.current) panelRef.current.focus();
  }, [mobileOpen]);

  return (
    <header className="bg-white">
      <div className={CONTAINER}>
        {/* Border only under logo-to-login */}
        <div className="flex h-16 items-center justify-between border-b border-gray-300">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold tracking-wide">
              SKILLNODE.
            </span>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden items-center gap-8 md:flex">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`relative group font-medium transition-colors ${
                  pathname === link.href
                    ? " text-md"
                    : "text-gray-700 hover:text-black text-sm"
                }`}
                style={pathname === link.href ? { color: "#e61d88ff" } : {}}
              >
                {link.name}
                <span
                  className="absolute left-0 -bottom-1 h-[2px] w-0 bg-black transition-all group-hover:w-full"
                  style={{
                    backgroundColor:
                      pathname === link.href ? "#cf237fff" : "#000000",
                  }}
                />
              </Link>
            ))}
          </nav>

          {/* Desktop Buttons */}
          <div className="hidden items-center gap-4 font-medium md:flex">
            <Link
              href="#"
              className="text-gray-700 transition-colors hover:text-black"
            >
              Sign Up
            </Link>
            <Link
              href="#"
              className="rounded-full border border-gray-400 px-4 py-1 transition-colors hover:bg-gray-100"
            >
              Log In
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="p-2 md:hidden"
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Creative Mobile Side Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Overlay */}
            <motion.div
              key="overlay"
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />

            {/* Drawer */}
            <motion.aside
              key="drawer"
              role="dialog"
              aria-label="Mobile navigation"
              tabIndex={-1}
              ref={panelRef}
              className="fixed left-0 top-0 z-50 h-dvh w-[19rem] overflow-y-auto rounded-r-2xl bg-white shadow-2xl ring-1 ring-black/5"
              initial={{ x: -320, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -320, opacity: 0 }}
              transition={{ type: "spring", stiffness: 380, damping: 35 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="grid size-10 place-items-center rounded-xl bg-gradient-to-tr from-fuchsia-600 to-rose-500 text-white shadow-lg">
                    SN
                  </div>
                  <div className="leading-tight">
                    <p className="text-base font-semibold">SKILLNODE</p>
                    <p className="text-xs text-gray-500">Menu</p>
                  </div>
                </div>
                <button
                  aria-label="Close menu"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl p-2 text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
                >
                  <X className="size-5" />
                </button>
              </div>

              <div className="mx-5 mb-3 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

              {/* Links */}
              <nav className="px-3">
                <ul className="flex flex-col gap-1">
                  {links.map((link) => {
                    const active = pathname === link.href;
                    return (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          onClick={() => setMobileOpen(false)}
                          className={[
                            "group relative flex items-center gap-3 rounded-xl px-3 py-3 transition",
                            active
                              ? "text-fuchsia-600"
                              : "text-gray-700 hover:bg-gray-50 hover:text-gray-900",
                          ].join(" ")}
                          style={active ? { color: "#e61d88ff" } : {}}
                        >
                          {/* Accent bar when active */}
                          <span
                            className={[
                              "absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-full",
                              active ? "bg-fuchsia-600" : "bg-transparent",
                            ].join(" ")}
                          />
                          <span className="text-sm font-medium">
                            {link.name}
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              {/* CTA block */}
              <div className="mt-5 px-5">
                <div className="rounded-2xl bg-gradient-to-br from-fuchsia-600 to-rose-500 p-4 text-white shadow-lg">
                  <p className="text-sm/5 font-medium opacity-95">New here?</p>
                  <p className="text-base font-semibold">Create an account</p>
                  <div className="mt-3 flex gap-3">
                    <Link
                      href="#"
                      onClick={() => setMobileOpen(false)}
                      className="inline-flex items-center gap-2 rounded-xl bg-white/95 px-3 py-2 text-sm font-semibold text-fuchsia-700 shadow-sm backdrop-blur transition hover:bg-white"
                    >
                      <UserPlus className="size-4" /> Sign Up
                    </Link>
                    <Link
                      href="#"
                      onClick={() => setMobileOpen(false)}
                      className="inline-flex items-center gap-2 rounded-xl border border-white/60 px-3 py-2 text-sm font-semibold text-white/95 transition hover:bg-white/10"
                    >
                      <LogIn className="size-4" /> Log In
                    </Link>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="px-5 pb-6 pt-6 text-xs text-gray-500">
                <p className="opacity-80">© {new Date().getFullYear()} SKILLNODE</p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
