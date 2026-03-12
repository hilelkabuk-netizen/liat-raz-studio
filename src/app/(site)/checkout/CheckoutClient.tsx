"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  getCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  getCartTotal,
  type CartItem,
} from "@/lib/cart";
import Link from "next/link";

export default function CheckoutClient() {
  const router = useRouter();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [step, setStep] = useState<"cart" | "details">("cart");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setCart(getCart());
    const update = () => setCart(getCart());
    window.addEventListener("cart-updated", update);
    return () => window.removeEventListener("cart-updated", update);
  }, []);

  const total = getCartTotal(cart);

  function handleRemove(id: string) {
    removeFromCart(id);
    setCart(getCart());
  }

  function handleQuantity(id: string, qty: number) {
    updateQuantity(id, qty);
    setCart(getCart());
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const customerData = {
      customerName: formData.get("name") as string,
      customerEmail: formData.get("email") as string,
      customerPhone: formData.get("phone") as string,
    };

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: cart, ...customerData }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "שגיאה ביצירת ההזמנה");
        setLoading(false);
        return;
      }

      clearCart();
      router.push(`/checkout/success?orderId=${data.orderId}`);
    } catch {
      setError("שגיאה בתקשורת עם השרת");
      setLoading(false);
    }
  }

  if (cart.length === 0 && step === "cart") {
    return (
      <div className="text-center py-16">
        <svg className="mx-auto mb-4 h-16 w-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
          </svg>
        <p className="text-lg text-gray-500 mb-6">העגלה ריקה</p>
        <Link
          href="/shop"
          className="inline-block rounded-lg bg-primary px-6 py-3 font-medium text-white hover:opacity-90"
        >
          לחנות
        </Link>
      </div>
    );
  }

  return (
    <div>
      {step === "cart" && (
        <>
          {/* Cart Items */}
          <div className="space-y-4 mb-8">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 bg-white rounded-xl p-4 shadow-sm"
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-text-primary">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {item.type === "voucher" ? "שובר מתנה" : "מוצר"}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleQuantity(item.id, item.quantity - 1)}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-lg hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-medium">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => handleQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-lg hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>

                <div className="text-start w-20">
                  <span className="font-bold text-primary">
                    ₪{item.price * item.quantity}
                  </span>
                </div>

                <button
                  onClick={() => handleRemove(item.id)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  הסר
                </button>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
            <div className="flex justify-between items-center text-lg">
              <span className="font-medium">סה&quot;כ לתשלום</span>
              <span className="text-2xl font-bold text-primary">₪{total}</span>
            </div>
          </div>

          <button
            onClick={() => setStep("details")}
            className="w-full bg-primary text-white py-4 rounded-xl font-semibold text-lg hover:opacity-90 transition"
          >
            המשך לפרטי הזמנה
          </button>
        </>
      )}

      {step === "details" && (
        <form onSubmit={handleSubmit} className="space-y-6">
          <button
            type="button"
            onClick={() => setStep("cart")}
            className="text-sm text-gray-500 hover:text-gray-700 mb-2"
          >
            ← חזרה לעגלה
          </button>

          {/* Order Summary */}
          <div className="bg-white rounded-xl p-5 shadow-sm">
            <h2 className="font-semibold mb-3">סיכום הזמנה</h2>
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between text-sm py-1">
                <span>
                  {item.name} x{item.quantity}
                </span>
                <span className="font-medium">
                  ₪{item.price * item.quantity}
                </span>
              </div>
            ))}
            <div className="border-t mt-3 pt-3 flex justify-between font-bold">
              <span>סה&quot;כ</span>
              <span className="text-primary">₪{total}</span>
            </div>
          </div>

          {/* Customer Details */}
          <div className="bg-white rounded-xl p-5 shadow-sm space-y-4">
            <h2 className="font-semibold">פרטים אישיים</h2>

            <div>
              <label className="block text-sm font-medium mb-1">
                שם מלא *
              </label>
              <input
                name="name"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                אימייל *
              </label>
              <input
                name="email"
                type="email"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">טלפון</label>
              <input
                name="phone"
                type="tel"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none"
              />
            </div>
          </div>

          {error && (
            <p className="text-red-600 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-4 rounded-xl font-semibold text-lg hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "שולח הזמנה..." : `שלח הזמנה — ₪${total}`}
          </button>

          <p className="text-center text-xs text-gray-400">
            בשלב הבא תועברי לעמוד תשלום מאובטח
          </p>
        </form>
      )}
    </div>
  );
}
