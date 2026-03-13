import Link from "next/link";
import { prisma } from "@/lib/db";

export const revalidate = 60;

export default async function HomePage() {
  const [classes, products, galleryImages] = await Promise.all([
    prisma.classType.findMany({
      where: { active: true },
      orderBy: { order: "asc" },
      take: 4,
    }),
    prisma.product.findMany({
      where: { active: true, inStock: true },
      orderBy: { order: "asc" },
      take: 4,
    }),
    prisma.galleryImage.findMany({
      where: { active: true },
      orderBy: { order: "asc" },
      take: 6,
    }),
  ]);

  return (
    <main dir="rtl" className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
          <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
            {/* Right side - Text */}
            <div className="order-2 md:order-1 text-center md:text-right">
              <h1 className="font-display text-5xl font-bold leading-tight text-text-primary sm:text-6xl lg:text-7xl">
                יש רגעים שצריך
                <br />
                לעצור, <span className="text-primary">לנשום,</span>
                <br />
                <span className="text-primary">וליצור</span>
              </h1>
              <p className="mt-6 max-w-lg text-lg text-text-secondary sm:text-xl md:mr-0">
                הסטודיו לקרמיקה של ליאת רז בראשון לציון — מרחב ליצירה בידיים,
                לשקט פנימי ולרגע שהוא רק שלך
              </p>
              <div className="mt-10 flex flex-wrap items-center justify-center md:justify-start gap-4">
                <Link
                  href="/contact"
                  className="rounded-lg bg-primary px-8 py-3 text-lg font-medium text-white transition hover:opacity-90 shadow-md"
                >
                  הירשמי לחוג
                </Link>
                <Link
                  href="/gift-vouchers"
                  className="rounded-lg border-2 border-primary bg-white/80 px-8 py-3 text-lg font-medium text-primary transition hover:bg-primary hover:text-white shadow-md"
                >
                  שוברי מתנה
                </Link>
              </div>
            </div>

            {/* Left side - Image collage */}
            <div className="order-1 md:order-2">
              <div className="grid grid-cols-4 grid-rows-3 gap-2.5 h-[420px] sm:h-[500px]">
                {/* Child sculpting - medium, tall, closest to title */}
                <div className="col-start-1 row-start-1 row-span-2 overflow-hidden rounded-2xl">
                  <img src="/uploads/child-sculpting.png" alt="ילד יוצר" className="h-full w-full object-cover" />
                </div>
                {/* Large - studio activity */}
                <div className="col-start-2 col-span-2 row-start-1 row-span-2 overflow-hidden rounded-2xl">
                  <img src="/uploads/studio-activity.jpeg" alt="פעילות בסטודיו" className="h-full w-full object-cover" />
                </div>
                {/* Studio interior */}
                <div className="col-start-4 row-start-1 overflow-hidden rounded-2xl">
                  <img src="/uploads/studio-interior.png" alt="פנים הסטודיו" className="h-full w-full object-cover" />
                </div>
                {/* Studio workshop - small */}
                <div className="col-start-4 row-start-2 overflow-hidden rounded-2xl">
                  <img src="/uploads/studio-workshop.png" alt="סדנה בסטודיו" className="h-full w-full object-cover" />
                </div>
                {/* Studio wheels */}
                <div className="col-start-1 row-start-3 overflow-hidden rounded-2xl">
                  <img src="/uploads/studio-wheels.jpeg" alt="אופנים בסטודיו" className="h-full w-full object-cover" />
                </div>
                {/* Studio palette painting - wide */}
                <div className="col-start-2 col-span-2 row-start-3 overflow-hidden rounded-2xl">
                  <img src="/uploads/studio-palette.jpeg" alt="ציור בסטודיו" className="h-full w-full object-cover" />
                </div>
                {/* Pottery wheel */}
                <div className="col-start-4 row-start-3 overflow-hidden rounded-2xl">
                  <img src="/uploads/pottery-wheel.jpg" alt="אופן קרמיקה" className="h-full w-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Decorative strip */}
      <div className="flex gap-2 overflow-hidden h-32 sm:h-40">
        <img src="/uploads/ceramic-flower-pot.jpeg" alt="" className="w-1/4 object-cover" />
        <img src="/uploads/ceramic-painted-bowl.jpeg" alt="" className="w-1/4 object-cover" />
        <img src="/uploads/ceramic-owl-plate.jpeg" alt="" className="w-1/4 object-cover" />
        <img src="/uploads/ceramic-flower-jar.jpeg" alt="" className="w-1/4 object-cover" />
      </div>

      {/* Classes Preview */}
      <section className="bg-surface py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="font-display mb-12 text-center text-4xl font-bold text-text-primary">
            מה מחכה לך?
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {classes.map((cls) => (
              <Link
                key={cls.id}
                href="/classes"
                className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition hover:shadow-lg"
              >
                <div className="aspect-[4/3] overflow-hidden bg-primary-light/20">
                  {cls.imageUrl ? (
                    <img
                      src={cls.imageUrl}
                      alt={cls.name}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <svg className="h-10 w-10 text-primary/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-lg font-bold text-text-primary">
                    {cls.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary line-clamp-2">
                    {cls.description}
                  </p>
                  <div className="mt-auto pt-4">
                    <span className="text-sm font-medium text-primary group-hover:underline">
                      לפרטים נוספים &larr;
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-background py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="font-display mb-12 text-center text-4xl font-bold text-text-primary">
            מהסטודיו
          </h2>
          <div className="columns-2 gap-4 sm:columns-3">
            {galleryImages.length > 0
              ? galleryImages.map((img) => (
                  <div
                    key={img.id}
                    className="mb-4 break-inside-avoid rounded-xl overflow-hidden"
                  >
                    {img.imageUrl ? (
                      <img
                        src={img.imageUrl}
                        alt={img.alt}
                        className="w-full h-auto"
                        loading="lazy"
                      />
                    ) : (
                      <div className="bg-primary-light/20 p-12 text-center">
                        <p className="text-sm text-text-secondary">
                          {img.alt}
                        </p>
                      </div>
                    )}
                  </div>
                ))
              : Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="mb-4 break-inside-avoid rounded-xl bg-primary-light/20 p-12 text-center"
                  >
                    <p className="text-sm text-text-secondary">תמונה מהסטודיו</p>
                  </div>
                ))}
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="bg-surface py-20">
        <div className="mx-auto grid max-w-5xl gap-10 px-6 md:grid-cols-2 md:items-center">
          <div className="aspect-[4/3] overflow-hidden rounded-2xl">
            <img
              src="/uploads/liat-profile.jpg"
              alt="ליאת רז בסטודיו הקרמיקה"
              className="w-full h-full object-cover object-[center_20%]"
            />
          </div>

          <div>
            <h2 className="font-display mb-6 text-4xl font-bold text-text-primary">
              קצת עליי
            </h2>
            <p className="text-lg leading-relaxed text-text-secondary">
              20 שנות ניסיון, תואר B.Ed בהוראת אמנות, סביבה נשית חמה
              ומשפחתית. בסטודיו שלי תמצאי מקום ללמוד, ליצור ולהתחבר — כל אחת
              בקצב שלה.
            </p>
            <Link
              href="/about"
              className="mt-6 inline-block text-lg font-medium text-primary underline underline-offset-4 transition hover:opacity-80"
            >
              קראי עוד
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-background py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="font-display mb-12 text-center text-4xl font-bold text-text-primary">
            כלי קרמיקה
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/shop/${product.id}`}
                className="rounded-xl bg-surface p-5 shadow-sm transition hover:shadow-md"
              >
                <div className="mb-4 flex aspect-square items-center justify-center rounded-lg bg-primary-light/20 overflow-hidden">
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <p className="text-sm text-text-secondary">{product.name}</p>
                  )}
                </div>
                <h3 className="text-sm font-semibold text-text-primary">
                  {product.name}
                </h3>
              </Link>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/shop"
              className="inline-block rounded-lg border-2 border-primary px-8 py-3 text-lg font-medium text-primary transition hover:bg-primary hover:text-white"
            >
              לחנות המלאה
            </Link>
          </div>
        </div>
      </section>

      {/* Studio atmosphere strip */}
      <div className="flex gap-2 overflow-hidden h-32 sm:h-48">
        <img src="/uploads/pottery-wheel.jpg" alt="" className="w-1/3 object-cover" />
        <img src="/uploads/studio-activity.jpeg" alt="" className="w-1/3 object-cover" />
        <img src="/uploads/ceramic-garden-stakes.jpg" alt="" className="w-1/3 object-cover" />
      </div>

      {/* CTA Section */}
      <section className="relative bg-primary/10 py-20 overflow-hidden">
        <div className="absolute right-8 top-1/2 -translate-y-1/2 w-40 h-40 overflow-hidden opacity-[0.08] hidden sm:block pointer-events-none">
          <img
            src="/uploads/logo.jpeg"
            alt=""
            className="w-full object-cover"
          />
        </div>
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-display mb-4 text-4xl font-bold text-text-primary">
            רוצה לשמוע עוד?
          </h2>
          <p className="mb-10 text-lg text-text-secondary">
            אשמח לענות על כל שאלה — בטלפון או בוואטסאפ
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="tel:+972504932480"
              className="rounded-lg bg-primary px-8 py-3 text-lg font-medium text-white transition hover:opacity-90"
            >
              התקשרי אליי
            </a>
            <a
              href="https://wa.me/972504932480"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border-2 border-secondary bg-secondary px-8 py-3 text-lg font-medium text-white transition hover:opacity-90"
            >
              שלחי וואטסאפ
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
