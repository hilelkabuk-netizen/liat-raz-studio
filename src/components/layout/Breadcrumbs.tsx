"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const nameMap: Record<string, string> = {
  classes: "חוגים וסדנאות",
  shop: "כלי קרמיקה",
  about: "אודות",
  contact: "צרי קשר",
  "gift-vouchers": "שוברי מתנה",
  checkout: "תשלום",
  success: "הזמנה הושלמה",
};

export default function Breadcrumbs() {
  const pathname = usePathname();

  // Don't show breadcrumbs on homepage
  if (pathname === "/") return null;

  const segments = pathname.split("/").filter(Boolean);

  const crumbs = segments.map((seg, i) => {
    const href = "/" + segments.slice(0, i + 1).join("/");
    const label = nameMap[seg] || decodeURIComponent(seg);
    const isLast = i === segments.length - 1;
    return { href, label, isLast };
  });

  return (
    <nav
      dir="rtl"
      aria-label="פירורי לחם"
      className="mx-auto max-w-6xl px-6 pt-4 pb-1"
    >
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-text-secondary">
        <li>
          <Link
            href="/"
            className="hover:text-primary transition-colors"
          >
            דף הבית
          </Link>
        </li>
        {crumbs.map((crumb) => (
          <li key={crumb.href} className="flex items-center gap-1.5">
            <span className="text-text-secondary/50">/</span>
            {crumb.isLast ? (
              <span className="text-text-primary font-medium">
                {crumb.label}
              </span>
            ) : (
              <Link
                href={crumb.href}
                className="hover:text-primary transition-colors"
              >
                {crumb.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
