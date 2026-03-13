import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "סטודיו קרמיקה ליאת רז | קחי אוויר לנשמה",
  description:
    "סטודיו קרמיקה ליאת רז בראשון לציון - חוגי קרמיקה, סדנאות יצירה, כלי קרמיקה בעבודת יד ושוברי מתנה. בואו לקחת אוויר לנשמה דרך יצירה בחימר.",
  keywords: [
    "קרמיקה",
    "סטודיו קרמיקה",
    "חוגי קרמיקה",
    "סדנאות קרמיקה",
    "ליאת רז",
    "ראשון לציון",
    "כלי קרמיקה",
    "עבודת יד",
  ],
  openGraph: {
    title: "סטודיו קרמיקה ליאת רז | קחי אוויר לנשמה",
    description:
      "סטודיו קרמיקה ליאת רז בראשון לציון - חוגי קרמיקה, סדנאות יצירה, כלי קרמיקה בעבודת יד ושוברי מתנה.",
    locale: "he_IL",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "סטודיו קרמיקה ליאת רז",
  description:
    "סטודיו קרמיקה ליאת רז - חוגי קרמיקה, סדנאות יצירה וכלי קרמיקה בעבודת יד בראשון לציון",
  telephone: "050-4932480",
  address: {
    "@type": "PostalAddress",
    streetAddress: "אהרונוביץ 18, כצנלסון",
    addressLocality: "ראשון לציון",
    addressCountry: "IL",
  },
  url: "https://www.liatraz.co.il",
  image: "/images/studio-og.jpg",
  priceRange: "$$",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Heebo:wght@400;500;600;700&family=Varela+Round&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
