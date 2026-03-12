import type { Metadata } from "next";
import CheckoutClient from "./CheckoutClient";

export const metadata: Metadata = {
  title: "עגלת קניות | סטודיו קרמיקה ליאת רז",
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="mx-auto max-w-3xl px-6">
        <h1 className="mb-8 text-3xl font-bold text-text-primary">
          עגלת קניות
        </h1>
        <CheckoutClient />
      </div>
    </div>
  );
}
