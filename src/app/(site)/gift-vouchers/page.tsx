import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import VoucherCard from "./VoucherCard";

export const metadata: Metadata = {
  title: "שוברי מתנה | סטודיו קרמיקה ליאת רז",
  description:
    "תני לה מתנה של זמן לעצמה — שוברי מתנה לחוגי קרמיקה וסדנאות בסטודיו ליאת רז. רכישה אונליין עם שליחה דיגיטלית.",
};

export const revalidate = 60;

export default async function GiftVouchersPage() {
  const vouchers = await prisma.voucherType.findMany({
    where: { active: true },
    orderBy: { order: "asc" },
  });

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="mx-auto max-w-4xl px-6">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-text-primary">שוברי מתנה</h1>
          <p className="text-xl text-text-secondary">
            תני לה מתנה של זמן לעצמה
          </p>
        </div>

        {/* Decorative image */}
        <div className="mb-10 overflow-hidden rounded-2xl h-48 sm:h-64">
          <img
            src="/uploads/ceramic-candle-holders.jpeg"
            alt="פמוטי קרמיקה בעבודת יד"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {vouchers.map((voucher) => (
            <VoucherCard
              key={voucher.id}
              id={voucher.id}
              name={voucher.name}
              description={voucher.description}
              price={voucher.price}
            />
          ))}
        </div>

        <div className="mt-16 rounded-2xl bg-primary/10 p-8 text-center">
          <h3 className="mb-3 text-2xl font-bold text-text-primary">איך זה עובד?</h3>
          <div className="mx-auto grid max-w-2xl gap-6 sm:grid-cols-3">
            <div>
              <span className="mb-2 block text-3xl font-bold text-primary">1</span>
              <p className="text-sm text-text-secondary">בחרי שובר ושלמי אונליין</p>
            </div>
            <div>
              <span className="mb-2 block text-3xl font-bold text-primary">2</span>
              <p className="text-sm text-text-secondary">קבלי שובר דיגיטלי (PDF) במייל</p>
            </div>
            <div>
              <span className="mb-2 block text-3xl font-bold text-primary">3</span>
              <p className="text-sm text-text-secondary">הדפיסי או שלחי לחברה</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
