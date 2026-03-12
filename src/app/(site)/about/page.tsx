import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "אודות ליאת רז | סטודיו קרמיקה",
  description: "ליאת רז, בעלת תואר B.Ed בהוראת אמנות עם מעל 20 שנות ניסיון בקרמיקה. סטודיו ביתי חם בראשון לציון.",
};

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-background py-12 overflow-hidden">
      <div className="absolute left-4 top-24 w-32 h-32 overflow-hidden opacity-[0.07] hidden md:block pointer-events-none">
        <img
          src="/uploads/logo.jpeg"
          alt=""
          className="w-full object-cover"
        />
      </div>
      <div className="relative mx-auto max-w-4xl px-6">
        {/* Hero */}
        <div className="mb-16 text-center">
          <div className="mx-auto mb-8 h-52 w-52 overflow-hidden rounded-full ring-4 ring-primary/20 shadow-lg">
            <img
              src="/uploads/liat-profile.jpg"
              alt="ליאת רז"
              className="w-full h-full object-cover object-[center_20%] brightness-105 contrast-[1.02]"
            />
          </div>
          <h1 className="mb-4 text-4xl font-bold text-text-primary">ליאת רז</h1>
          <p className="text-xl text-text-secondary">קחי אוויר לנשמה</p>
        </div>

        {/* Bio */}
        <div className="mb-12 rounded-2xl bg-surface p-8 shadow-sm">
          <p className="text-lg leading-relaxed text-text-secondary">
            שמי ליאת רז, אני בעלת תואר B.Ed בהוראת אמנות מאוניברסיטת חיפה,
            ועוסקת בקרמיקה מעל 20 שנה. הסטודיו הביתי שלי בראשון לציון הוא מקום
            חם ומשפחתי — מקום שבו נשים ונערות מגיעות ליצור, להתנתק מהשגרה,
            ולקחת רגע של שקט לעצמן.
          </p>
        </div>

        {/* Sections */}
        <div className="grid gap-8 md:grid-cols-3">
          <div className="rounded-2xl bg-surface p-6 shadow-sm">
            <div className="mb-4 h-1 w-12 rounded bg-primary" />
            <h2 className="mb-3 text-xl font-bold text-text-primary">ניסיון</h2>
            <p className="text-sm leading-relaxed text-text-secondary">
              מעל 20 שנות ניסיון בהוראה ויצירה בקרמיקה. תואר B.Ed בהוראת
              אמנות. אלפי תלמידות ומשתתפות בסדנאות לאורך השנים.
            </p>
          </div>
          <div className="rounded-2xl bg-surface p-6 shadow-sm">
            <div className="mb-4 h-1 w-12 rounded bg-accent" />
            <h2 className="mb-3 text-xl font-bold text-text-primary">הגישה שלי</h2>
            <p className="text-sm leading-relaxed text-text-secondary">
              כל אחת בקצב שלה. אני מאמינה שיצירה בקרמיקה היא זמן איכות — לא
              סתם חוג, אלא מפלט שבועי מהשגרה. קבוצות קטנות של 8-9 משתתפות
              באווירה אינטימית.
            </p>
          </div>
          <div className="rounded-2xl bg-surface p-6 shadow-sm">
            <div className="mb-4 h-1 w-12 rounded bg-secondary" />
            <h2 className="mb-3 text-xl font-bold text-text-primary">הסטודיו</h2>
            <p className="text-sm leading-relaxed text-text-secondary">
              סטודיו ביתי, חם ומשפחתי בראשון לציון. סביבה נשית בלבד — מקום
              בטוח ונעים ליצירה. כל הציוד והחומרים כלולים.
            </p>
          </div>
        </div>

        {/* Studio Images */}
        <div className="mt-12 grid gap-4 grid-cols-2 md:grid-cols-3">
          <div className="overflow-hidden rounded-xl">
            <img src="/uploads/studio-interior.png" alt="הסטודיו מבפנים" className="w-full h-48 object-cover" loading="lazy" />
          </div>
          <div className="overflow-hidden rounded-xl">
            <img src="/uploads/pottery-wheel.jpg" alt="עבודה על גלגל האופנים" className="w-full h-48 object-cover" loading="lazy" />
          </div>
          <div className="overflow-hidden rounded-xl">
            <img src="/uploads/studio-workshop.png" alt="סדנה בסטודיו" className="w-full h-48 object-cover" loading="lazy" />
          </div>
          <div className="overflow-hidden rounded-xl">
            <img src="/uploads/student-with-creation.jpg" alt="משתתפת עם יצירה" className="w-full h-48 object-cover" loading="lazy" />
          </div>
          <div className="overflow-hidden rounded-xl">
            <img src="/uploads/child-sculpting.png" alt="ילד יוצר בקרמיקה" className="w-full h-48 object-cover" loading="lazy" />
          </div>
          <div className="overflow-hidden rounded-xl">
            <img src="/uploads/studio-palette.jpeg" alt="פעילות בסטודיו" className="w-full h-48 object-cover" loading="lazy" />
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <h3 className="mb-4 text-2xl font-bold text-text-primary">בואי לבקר בסטודיו</h3>
          <p className="mb-8 text-text-secondary">אשמח להכיר ולספר עוד</p>
          <Link
            href="/contact"
            className="inline-block rounded-lg bg-primary px-8 py-3 text-lg font-medium text-white transition hover:opacity-90"
          >
            צרי קשר
          </Link>
        </div>
      </div>
    </div>
  );
}
