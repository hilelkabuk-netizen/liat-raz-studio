"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import CartIcon from "./CartIcon";

const navLinks = [
  { href: "/", label: "בית" },
  { href: "/classes", label: "חוגים וסדנאות" },
  { href: "/shop", label: "כלי קרמיקה" },
  { href: "/gift-vouchers", label: "שוברי מתנה" },
  { href: "/about", label: "אודות" },
  { href: "/contact", label: "צרי קשר" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change or resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 w-full bg-surface transition-shadow duration-300 ${
        scrolled ? "shadow-md" : "shadow-none"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2"
          onClick={() => setMobileMenuOpen(false)}
        >
          <img
            src="/uploads/logo.jpeg"
            alt="ליאת רז - סטודיו לקרמיקה"
            className="h-14 w-14 rounded-full object-cover"
          />
          <span className="text-xl font-bold text-primary sm:text-2xl">
            ליאת רז | קרמיקה
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-text-primary transition-colors hover:bg-primary/10 hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
          <CartIcon />
        </nav>

        {/* Mobile: Cart + Menu Button */}
        <div className="flex items-center gap-1 md:hidden">
          <CartIcon />
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg p-2 text-text-primary transition-colors hover:bg-primary/10"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? "סגירת תפריט" : "פתיחת תפריט"}
        >
          {mobileMenuOpen ? (
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out md:hidden ${
          mobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col border-t border-primary/10 bg-surface px-4 pb-4 pt-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-3 text-base font-medium text-text-primary transition-colors hover:bg-primary/10 hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
