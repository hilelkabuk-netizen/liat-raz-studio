"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { useState } from "react";

const navItems = [
  { href: "/admin", label: "דשבורד" },
  { href: "/admin/classes", label: "חוגים וסדנאות" },
  { href: "/admin/products", label: "מוצרים" },
  { href: "/admin/vouchers", label: "שוברי מתנה" },
  { href: "/admin/gallery", label: "גלריה" },
  { href: "/admin/orders", label: "הזמנות" },
  { href: "/admin/messages", label: "הודעות" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  const nav = (
    <nav className="flex flex-col h-full">
      <div className="p-4 border-b border-gray-200">
        <Link href="/" className="text-lg font-bold text-[var(--primary)]">
          סטודיו ליאת רז
        </Link>
        <p className="text-xs text-gray-500 mt-1">ממשק ניהול</p>
      </div>

      <ul className="flex-1 py-4 space-y-1 px-2">
        {navItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                isActive(item.href)
                  ? "bg-[var(--primary)] text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="p-4 border-t border-gray-200">
        <Link
          href="/"
          className="block text-sm text-gray-500 hover:text-gray-700 mb-3"
        >
          &larr; חזרה לאתר
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="w-full text-sm text-red-600 hover:text-red-800 text-start"
        >
          התנתק
        </button>
      </div>
    </nav>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-white shadow-md rounded-lg p-2"
        aria-label="תפריט ניהול"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          {mobileOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          )}
        </svg>
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/30 z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar - mobile */}
      <aside
        className={`lg:hidden fixed inset-y-0 right-0 z-40 w-64 bg-white shadow-xl transform transition-transform ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {nav}
      </aside>

      {/* Sidebar - desktop */}
      <aside className="hidden lg:block w-64 bg-white border-l border-gray-200 shrink-0">
        {nav}
      </aside>
    </>
  );
}
