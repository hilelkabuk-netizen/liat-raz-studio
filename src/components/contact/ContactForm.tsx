"use client";

import { useState, type FormEvent } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to send");
      setStatus("success");
      setFormData({ name: "", phone: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* שם */}
      <div>
        <label
          htmlFor="name"
          className="mb-2 block text-sm font-medium text-text-primary"
        >
          שם
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full rounded-xl border border-primary/20 bg-background px-4 py-3 text-text-primary placeholder:text-text-secondary/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          placeholder="השם שלך"
        />
      </div>

      {/* טלפון */}
      <div>
        <label
          htmlFor="phone"
          className="mb-2 block text-sm font-medium text-text-primary"
        >
          טלפון
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          required
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full rounded-xl border border-primary/20 bg-background px-4 py-3 text-text-primary placeholder:text-text-secondary/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          placeholder="050-0000000"
          dir="ltr"
        />
      </div>

      {/* הודעה */}
      <div>
        <label
          htmlFor="message"
          className="mb-2 block text-sm font-medium text-text-primary"
        >
          הודעה
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
          className="w-full resize-none rounded-xl border border-primary/20 bg-background px-4 py-3 text-text-primary placeholder:text-text-secondary/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          placeholder="במה אוכל לעזור?"
        />
      </div>

      {/* כפתור שליחה */}
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-xl bg-primary px-6 py-3 text-base font-semibold text-white transition-colors duration-200 hover:bg-primary-light disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "loading" ? "שולחת..." : "שליחה"}
      </button>

      {/* Status Messages */}
      {status === "success" && (
        <p className="rounded-xl bg-secondary/10 p-4 text-center text-sm font-medium text-secondary">
          ההודעה נשלחה בהצלחה! אחזור אליך בהקדם.
        </p>
      )}
      {status === "error" && (
        <p className="rounded-xl bg-red-50 p-4 text-center text-sm font-medium text-red-600">
          אירעה שגיאה. אנא נסי שוב או צרי קשר בטלפון.
        </p>
      )}
    </form>
  );
}
