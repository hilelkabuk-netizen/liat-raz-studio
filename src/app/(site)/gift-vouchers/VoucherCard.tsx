"use client";

import { useState } from "react";
import { addToCart } from "@/lib/cart";

interface VoucherCardProps {
  id: string;
  name: string;
  description: string;
  price: number; // agorot
}

export default function VoucherCard({ id, name, description, price }: VoucherCardProps) {
  const [added, setAdded] = useState(false);

  function handleBuy() {
    addToCart({
      id,
      name,
      price: price / 100,
      type: "voucher",
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="flex flex-col rounded-2xl bg-surface p-8 shadow-sm transition hover:shadow-md">
      <div className="mb-4 h-1 w-12 rounded bg-accent" />
      <h2 className="mb-2 text-xl font-bold text-text-primary">{name}</h2>
      <p className="mb-6 flex-1 text-sm leading-relaxed text-text-secondary">
        {description}
      </p>
      <div className="flex items-center justify-between">
        <span className="text-2xl font-bold text-primary">
          ₪{(price / 100).toFixed(0)}
        </span>
        <button
          onClick={handleBuy}
          className={`rounded-lg px-6 py-2.5 font-medium text-white transition ${
            added ? "bg-secondary" : "bg-primary hover:opacity-90"
          }`}
        >
          {added ? "נוסף לסל ✓" : "רכשי שובר"}
        </button>
      </div>
    </div>
  );
}
