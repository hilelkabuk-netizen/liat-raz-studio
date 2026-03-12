import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/db";

export const metadata: Metadata = {
  title: "חוגים וסדנאות | סטודיו קרמיקה ליאת רז",
  description:
    "חוגי קרמיקה וסדנאות יצירה בסטודיו של ליאת רז בראשון לציון. חוגים שבועיים, שיעורים פרטיים, סדנאות יום הולדת וסדנאות מעמיקות.",
};

export const revalidate = 60;

export default async function ClassesPage() {
  const classes = await prisma.classType.findMany({
    where: { active: true },
    orderBy: { order: "asc" },
  });

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold text-text-primary sm:text-5xl">
          חוגים וסדנאות
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-text-secondary">
          מגוון חוגים וסדנאות קרמיקה לכל הרמות — מתחילות ומתקדמות כאחד.
          בואו ליצור באווירה חמה וביתית.
        </p>
      </div>

      {/* Studio images banner */}
      <div className="mb-12 grid grid-cols-3 gap-3 overflow-hidden rounded-2xl">
        <img src="/uploads/pottery-wheel.jpg" alt="עבודה על גלגל הקרמיקה" className="h-40 w-full object-cover sm:h-56" loading="lazy" />
        <img src="/uploads/studio-interior.png" alt="הסטודיו מבפנים" className="h-40 w-full object-cover sm:h-56" loading="lazy" />
        <img src="/uploads/student-with-creation.jpg" alt="משתתפת עם יצירה" className="h-40 w-full object-cover sm:h-56" loading="lazy" />
      </div>

      {/* Class Cards Grid */}
      <div className="grid gap-8 sm:grid-cols-2">
        {classes.map((cls) => (
          <article
            key={cls.id}
            className="flex flex-col rounded-2xl border border-primary/10 bg-surface p-8 shadow-sm transition-shadow duration-300 hover:shadow-lg"
          >
            <h2 className="mb-3 text-2xl font-bold text-primary">
              {cls.name}
            </h2>

            <p className="mb-6 flex-1 leading-relaxed text-text-secondary">
              {cls.description}
            </p>

            <div className="mb-6 space-y-2 border-t border-primary/10 pt-4">
              <div className="flex items-center gap-2 text-text-primary">
                <svg
                  className="h-5 w-5 shrink-0 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                <span className="text-sm font-medium">{cls.schedule}</span>
              </div>
              <div className="flex items-center gap-2 text-text-primary">
                <svg
                  className="h-5 w-5 shrink-0 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
                  />
                </svg>
                <span className="text-lg font-bold text-primary">
                  {cls.price}
                </span>
              </div>
            </div>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-base font-semibold text-white transition-colors duration-200 hover:bg-primary-light"
            >
              צרי קשר להרשמה
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
