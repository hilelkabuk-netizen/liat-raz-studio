import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import ProductActions from "./ProductActions";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: { id, active: true },
  });

  if (!product) notFound();

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="mx-auto max-w-4xl px-6">
        <Link
          href="/shop"
          className="mb-8 inline-block text-sm text-text-secondary hover:text-primary transition"
        >
          &larr; חזרה לחנות
        </Link>

        <div className="grid gap-10 md:grid-cols-2">
          {/* Image */}
          <div className="flex aspect-square items-center justify-center rounded-2xl bg-primary-light/20 overflow-hidden">
            {product.imageUrl.startsWith("/") ? (
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <p className="text-lg text-text-secondary">{product.name}</p>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col justify-center">
            <h1 className="text-3xl font-bold text-text-primary mb-2">
              {product.name}
            </h1>

            {product.dimensions && (
              <p className="text-sm text-text-secondary mb-4">
                {product.dimensions}
              </p>
            )}

            {product.description && (
              <p className="text-text-secondary leading-relaxed mb-6">
                {product.description}
              </p>
            )}

            <p className="text-3xl font-bold text-primary mb-8">
              {(product.price / 100).toFixed(0)} &#8362;
            </p>

            <ProductActions
              id={product.id}
              name={product.name}
              price={product.price}
              inStock={product.inStock}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
