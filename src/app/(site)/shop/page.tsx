import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import ShopClient from "./ShopClient";

export const metadata: Metadata = {
  title: "כלי קרמיקה | סטודיו קרמיקה ליאת רז",
  description:
    "כלי קרמיקה בעבודת יד — כלי הגשה, ספלים, צלחות, תבניות אפייה וכלי נוי. רכישה אונליין מסטודיו ליאת רז בראשון לציון.",
};

export const revalidate = 60;

export default async function ShopPage() {
  const products = await prisma.product.findMany({
    where: { active: true, inStock: true },
    orderBy: { order: "asc" },
  });

  const serialized = products.map((p) => ({
    id: p.id,
    name: p.name,
    description: p.description,
    category: p.category,
    price: p.price,
    dimensions: p.dimensions,
    imageUrl: p.imageUrl,
  }));

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="mx-auto max-w-6xl px-6">
        <h1 className="mb-4 text-4xl font-bold text-text-primary">
          כלי קרמיקה
        </h1>
        <p className="mb-10 text-lg text-text-secondary">
          כל כלי מיוצר בעבודת יד בסטודיו — כל אחד ייחודי ומיוחד
        </p>
        <ShopClient products={serialized} />
      </div>
    </div>
  );
}
