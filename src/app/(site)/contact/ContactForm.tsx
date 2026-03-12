"use client";

import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: "", phone: "", message: "", honeypot: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", phone: "", message: "", honeypot: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl bg-surface p-8 shadow-sm">
        <span className="mb-4 text-5xl">✅</span>
        <h3 className="mb-2 text-xl font-bold text-text-primary">ההודעה נשלחה!</h3>
        <p className="text-text-secondary">אחזור אלייך בהקדם</p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 text-primary underline"
        >
          שלחי הודעה נוספת
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl bg-surface p-8 shadow-sm">
      <h2 className="mb-6 text-xl font-bold text-text-primary">שלחי הודעה</h2>

      {/* Honeypot - hidden from users */}
      <input
        type="text"
        name="honeypot"
        value={formData.honeypot}
        onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <div className="mb-4">
        <label htmlFor="name" className="mb-1 block text-sm font-medium text-text-primary">
          שם
        </label>
        <input
          id="name"
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-text-primary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="phone" className="mb-1 block text-sm font-medium text-text-primary">
          טלפון
        </label>
        <input
          id="phone"
          type="tel"
          required
          dir="ltr"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-text-primary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="message" className="mb-1 block text-sm font-medium text-text-primary">
          הודעה
        </label>
        <textarea
          id="message"
          required
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-text-primary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-lg bg-primary py-3 font-medium text-white transition hover:opacity-90 disabled:opacity-50"
      >
        {status === "sending" ? "שולחת..." : "שלחי הודעה"}
      </button>

      {status === "error" && (
        <p className="mt-4 text-center text-sm text-red-500">
          שגיאה בשליחה, נסי שוב או צרי קשר בטלפון
        </p>
      )}
    </form>
  );
}
