import type { Metadata } from "next";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "צרי קשר | סטודיו קרמיקה ליאת רז",
  description: "צרי קשר עם סטודיו קרמיקה ליאת רז בראשון לציון. טלפון, וואטסאפ, או טופס יצירת קשר.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="mx-auto max-w-4xl px-6">
        <div className="mb-10 flex flex-col sm:flex-row items-center gap-6">
          <div className="flex-1">
            <h1 className="mb-4 text-4xl font-bold text-text-primary">צרי קשר</h1>
            <p className="text-lg text-text-secondary">
              אשמח לענות על כל שאלה — בטלפון, בוואטסאפ, או דרך הטופס
            </p>
          </div>
          <div className="w-full sm:w-48 h-48 overflow-hidden rounded-2xl shrink-0">
            <img
              src="/uploads/ceramic-sheep-and-bowl.jpg"
              alt="יצירות קרמיקה מהסטודיו"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Contact Info */}
          <div className="space-y-6">
            <a
              href="tel:+972504932480"
              className="flex items-center gap-4 rounded-xl bg-surface p-6 shadow-sm transition hover:shadow-md"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
              </span>
              <div>
                <h3 className="font-bold text-text-primary">טלפון</h3>
                <p className="text-text-secondary" dir="ltr">050-493-2480</p>
              </div>
            </a>

            <a
              href="https://wa.me/972504932480?text=%D7%A9%D7%9C%D7%95%D7%9D%2C%20%D7%90%D7%A9%D7%9E%D7%97%20%D7%9C%D7%A9%D7%9E%D7%95%D7%A2%20%D7%A4%D7%A8%D7%98%D7%99%D7%9D%20%D7%A2%D7%9C%20%D7%97%D7%95%D7%92%D7%99%20%D7%94%D7%A7%D7%A8%D7%9E%D7%99%D7%A7%D7%94"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 rounded-xl bg-surface p-6 shadow-sm transition hover:shadow-md"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                </svg>
              </span>
              <div>
                <h3 className="font-bold text-text-primary">וואטסאפ</h3>
                <p className="text-text-secondary">שלחי הודעה ישירות</p>
              </div>
            </a>

            <div className="flex items-center gap-4 rounded-xl bg-surface p-6 shadow-sm">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
              </span>
              <div>
                <h3 className="font-bold text-text-primary">כתובת</h3>
                <p className="text-text-secondary">אהרונוביץ 18, כצנלסון, ראשון לציון</p>
              </div>
            </div>

            {/* Google Maps */}
            <div className="overflow-hidden rounded-xl shadow-sm">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3403.5!2d34.7932!3d31.9642!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z15DXlNeo15XXoNeV15HXmdeaIDE4LCDXm9em16DXnNeh15XXnywg16jXkNep15XXnyDXnNem15nXldef!5e0!3m2!1siw!2sil!4v1"
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="מפת הגעה לסטודיו קרמיקה ליאת רז"
              />
            </div>
          </div>

          {/* Contact Form */}
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
