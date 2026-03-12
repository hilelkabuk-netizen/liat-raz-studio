"use client";

import { useState } from "react";
import { addToCart } from "@/lib/cart";

interface ProductActionsProps {
  id: string;
  name: string;
  price: number;
  inStock: boolean;
}

export default function ProductActions({ id, name, price, inStock }: ProductActionsProps) {
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addToCart({
      id,
      name,
      price: price / 100,
      type: "product",
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  if (!inStock) {
    return (
      <p className="text-sm text-gray-400 font-medium">אזל מהמלאי</p>
    );
  }

  return (
    <button
      onClick={handleAdd}
      className={`w-full rounded-lg py-3 text-lg font-medium text-white transition ${
        added ? "bg-secondary" : "bg-primary hover:opacity-90"
      }`}
    >
      {added ? "נוסף לסל" : "הוסיפי לסל"}
    </button>
  );
}
