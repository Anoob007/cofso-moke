// app/components/Navbar.tsx
"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Menu, X, UserPlus, LogIn } from "lucide-react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { CONTAINER } from "../utils/ui"; // keep your existing container util

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);

  // BRAND COLORS
  const blue = "#124C98";  // primary
  const green = "#059669"; // accent
  const blueSoft = "rgba(18,76,152,0.10)";   // subtle fills
  const blueBorder = "rgba(18,76,152,0.18)"; // subtle borders
  const greenSoft = "rgba(5,150,105,0.10)";

  const links = [
    { name: "Home", href: "/" },
    { name: "Find A Work", href: "#" },
    { name: "Find Talent", href: "#" },
    { name: "How It Works", href: "#" },
  ];

  // Close drawer on ESC
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMobileOpen(false);
    }
    if (mobileOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  // Focus drawer when opened
  useEffect(() => {
    if (mobileOpen && panelRef.current) panelRef.current.focus();
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-50">
      {/* Glass bar with subtle brand underline */}
      <div className="relative bg-white/70 backdrop-blur-md">
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px"
          style={{
            background: `linear-gradient(90deg, transparent 0%, ${blueSoft} 50%, transparent 100%)`,
          }}
        />
        <div className={CONTAINER}>
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <span className="text-lg font-semibold tracking-wide" style={{ color: blue }}>SKILLNODE.</span>
            </Link>

            {/* DESKTOP NAV */}
            <nav
              className="relative hidden items-center gap-2 rounded-full border bg-white/70 px-2 py-1 backdrop-blur md:flex"
              style={{ borderColor: blueBorder }}
            >
              <ul className="relative flex items-center gap-1">
                {links.map((link, i) => {
                  const active = pathname === link.href;
                  const showHighlight = active || hoverIdx === i;
                  return (
                    <li key={link.name} className="relative">
                      <Link
                        href={link.href}
                        onMouseEnter={() => setHoverIdx(i)}
                        onMouseLeave={() => setHoverIdx(null)}
                        className="relative z-10 rounded-full px-4 py-2 text-sm font-medium transition-colors"
                        style={{ color: active ? blue : undefined }}
                      >
                        {link.name}
                      </Link>

                      {showHighlight && (
                        <motion.span
                          layoutId="navHighlight"
                          className="absolute inset-0 -z-10 rounded-full"
                          transition={{ type: "spring", stiffness: 500, damping: 40 }}
                          style={{
                            background: `linear-gradient(135deg, ${blueSoft} 0%, #fff 35%, ${greenSoft} 100%)`,
                            boxShadow: "inset 0 0 0 1px rgba(18,76,152,0.15)",
                          }}
                        />
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* DESKTOP CTAs */}
            <div className="hidden items-center gap-3 md:flex">
              <Link
                href="#"
                className="rounded-full px-4 py-2 text-sm font-medium transition hover:opacity-90"
                style={{ color: blue }}
              >
                Sign Up
              </Link>
              <Link
                href="#"
                className="rounded-full border px-4 py-2 text-sm font-semibold shadow-sm transition hover:shadow"
                style={{
                  color: blue,
                  borderColor: blueBorder,
                  background: `linear-gradient(135deg, #ffffff, ${blueSoft})`,
                }}
              >
                Log In
              </Link>
            </div>

            {/* Mobile trigger */}
            <button
              className="p-2 md:hidden"
              aria-label="Open menu"
              onClick={() => setMobileOpen(true)}
            >
              <Menu size={24} style={{ color: blue }} />
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE DRAWER */}
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
              className="fixed left-0 top-0 z-50 h-dvh w-[19rem] overflow-y-auto rounded-r-2xl bg-white shadow-2xl ring-1"
              style={{ outline: "none", boxShadow: "0 10px 40px rgba(0,0,0,0.15)", borderColor: blueBorder }}
              initial={{ x: -320, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -320, opacity: 0 }}
              transition={{ type: "spring", stiffness: 380, damping: 35 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4">
                <div className="flex items-center gap-3">
                  <div
                    className="grid size-10 place-items-center rounded-xl text-white shadow-lg"
                    style={{
                      background: `linear-gradient(135deg, ${blue}, ${green})`,
                    }}
                  >
                    SN
                  </div>
                  <div className="leading-tight">
                    <p className="text-base font-semibold" style={{ color: blue }}>SKILLNODE</p>
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

              <div className="mx-5 mb-3 h-px" style={{ background: `linear-gradient(90deg, transparent, ${blueSoft}, transparent)` }} />

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
                          className="group relative flex items-center gap-3 rounded-xl px-3 py-3 transition hover:bg-gray-50 hover:text-gray-900"
                          style={{ color: active ? blue : undefined }}
                        >
                          <span
                            className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-full"
                            style={{ backgroundColor: active ? green : "transparent" }}
                          />
                          <span className="text-sm font-medium">{link.name}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              {/* CTA block */}
              <div className="mt-5 px-5">
                <div
                  className="rounded-2xl p-4 text-white shadow-lg"
                  style={{ background: `linear-gradient(135deg, ${blue}, ${green})` }}
                >
                  <p className="text-sm/5 font-medium opacity-95">New here?</p>
                  <p className="text-base font-semibold">Create an account</p>
                  <div className="mt-3 flex gap-3">
                    <Link
                      href="#"
                      onClick={() => setMobileOpen(false)}
                      className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold shadow-sm backdrop-blur transition hover:bg-white"
                      style={{ background: "rgba(255,255,255,0.95)", color: blue }}
                    >
                      <UserPlus className="size-4" /> Sign Up
                    </Link>
                    <Link
                      href="#"
                      onClick={() => setMobileOpen(false)}
                      className="inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-semibold transition hover:bg-white/10"
                      style={{ borderColor: "rgba(255,255,255,0.6)", color: "rgba(255,255,255,0.95)" }}
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
