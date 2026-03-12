"use client";

import { useState } from "react";
import Link from "next/link";

type Product = {
  id: string;
  name: string;
  description: string | null;
  category: string;
  price: number;
  dimensions: string | null;
  imageUrl: string;
};

export default function ShopClient({ products }: { products: Product[] }) {
  const [activeCategory, setActiveCategory] = useState("הכל");

  const categories = [
    "הכל",
    ...Array.from(new Set(products.map((p) => p.category))),
  ];

  const filtered =
    activeCategory === "הכל"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <>
      {/* Categories */}
      <div className="mb-10 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
              activeCategory === cat
                ? "border-primary bg-primary text-white"
                : "border-primary/30 text-text-primary hover:bg-primary hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
        {filtered.map((product) => (
          <Link
            key={product.id}
            href={`/shop/${product.id}`}
            className="group rounded-xl bg-surface p-4 shadow-sm transition hover:shadow-md"
          >
            <div className="mb-4 flex aspect-square items-center justify-center rounded-lg bg-primary-light/20 overflow-hidden">
              {product.imageUrl.startsWith("/") ? (
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <p className="text-sm text-text-secondary">{product.name}</p>
              )}
            </div>
            <h3 className="text-sm font-semibold text-text-primary sm:text-base">
              {product.name}
            </h3>
            {product.dimensions && (
              <p className="mt-1 text-xs text-text-secondary">
                {product.dimensions}
              </p>
            )}
          </Link>
        ))}
      </div>
    </>
  );
}
