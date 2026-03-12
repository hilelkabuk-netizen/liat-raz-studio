import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ההזמנה התקבלה | סטודיו קרמיקה ליאת רז",
  robots: { index: false, follow: false },
};

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ orderId?: string }>;
}) {
  const { orderId } = await searchParams;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-12">
      <div className="mx-auto max-w-md px-6 text-center">
        <div className="bg-white rounded-2xl p-10 shadow-sm">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-text-primary mb-2">
            ההזמנה התקבלה!
          </h1>
          <p className="text-gray-500 mb-6">
            תודה על הזמנתך. ליאת תיצור איתך קשר בהקדם לתיאום.
          </p>

          {orderId && (
            <p className="text-sm text-gray-400 mb-6">
              מספר הזמנה: {orderId.slice(0, 8)}...
            </p>
          )}

          <div className="space-y-3">
            <Link
              href="/"
              className="block w-full rounded-lg bg-primary py-3 font-medium text-white hover:opacity-90 transition"
            >
              חזרה לדף הבית
            </Link>
            <Link
              href="/shop"
              className="block w-full rounded-lg border border-gray-300 py-3 font-medium text-gray-700 hover:bg-gray-50 transition"
            >
              המשיכי לקניות
            </Link>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100">
            <p className="text-sm text-gray-500 mb-2">שאלות? דברי איתנו</p>
            <div className="flex justify-center gap-4">
              <a
                href="tel:+972504932480"
                className="text-primary hover:underline text-sm"
              >
                050-4932480
              </a>
              <a
                href="https://wa.me/972504932480"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 hover:underline text-sm"
              >
                וואטסאפ
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
