import Link from "next/link";

const quickLinks = [
  { href: "/", label: "בית" },
  { href: "/classes", label: "חוגים וסדנאות" },
  { href: "/shop", label: "כלי קרמיקה" },
  { href: "/gift-vouchers", label: "שוברי מתנה" },
  { href: "/about", label: "אודות" },
  { href: "/contact", label: "צרי קשר" },
];

export default function Footer() {
  return (
    <footer className="relative bg-text-primary text-background overflow-hidden">
      <div className="absolute left-6 top-6 w-24 h-24 overflow-hidden opacity-[0.5] pointer-events-none">
        <img
          src="/uploads/logo.jpeg"
          alt=""
          className="w-full object-cover"
        />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Studio Info */}
          <div>
            <h3 className="mb-4 text-xl font-bold text-primary-light">
              סטודיו קרמיקה ליאת רז
            </h3>
            <p className="text-sm leading-relaxed text-background/80">
              סטודיו קרמיקה ליאת רז מזמין אתכם לקחת אוויר לנשמה דרך יצירה
              בחימר. חוגים, סדנאות וכלי קרמיקה ייחודיים בעבודת יד.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-xl font-bold text-primary-light">
              קישורים מהירים
            </h3>
            <nav className="flex flex-col gap-2">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-background/80 transition-colors hover:text-primary-light"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 text-xl font-bold text-primary-light">
              צרי קשר
            </h3>
            <address className="flex flex-col gap-3 text-sm not-italic text-background/80">
              <a
                href="tel:0504932480"
                className="flex items-center gap-2 transition-colors hover:text-primary-light"
              >
                <svg
                  className="h-4 w-4 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                  />
                </svg>
                050-4932480
              </a>

              <a
                href="mailto:liat.raz770@gmail.com"
                className="flex items-center gap-2 transition-colors hover:text-primary-light"
              >
                <svg
                  className="h-4 w-4 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                  />
                </svg>
                liat.raz770@gmail.com
              </a>

              <div className="flex items-start gap-2">
                <svg
                  className="mt-0.5 h-4 w-4 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                  />
                </svg>
                <span>אהרונוביץ 18, כצנלסון, ראשון לציון</span>
              </div>
            </address>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 border-t border-background/20 pt-6 text-center">
          <p className="text-sm text-background/60">
            &copy; 2026 סטודיו קרמיקה ליאת רז. כל הזכויות שמורות.
          </p>
        </div>
      </div>
    </footer>
  );
}
