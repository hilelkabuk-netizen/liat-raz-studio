import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const FROM_EMAIL =
  process.env.EMAIL_FROM || "סטודיו ליאת רז <onboarding@resend.dev>";

export async function sendOrderConfirmation({
  customerName,
  customerEmail,
  orderId,
  totalAmount,
  items,
}: {
  customerName: string;
  customerEmail: string;
  orderId: string;
  totalAmount: number;
  items: { name: string; quantity: number; price: number }[];
}) {
  if (!resend) {
    console.log("[Email] Resend not configured, skipping order confirmation");
    return;
  }

  const itemsHtml = items
    .map(
      (item) =>
        `<tr><td style="padding:8px;border-bottom:1px solid #eee">${item.name}</td><td style="padding:8px;border-bottom:1px solid #eee;text-align:center">${item.quantity}</td><td style="padding:8px;border-bottom:1px solid #eee;text-align:left">₪${item.price}</td></tr>`
    )
    .join("");

  await resend.emails.send({
    from: FROM_EMAIL,
    to: customerEmail,
    subject: `אישור הזמנה — סטודיו קרמיקה ליאת רז`,
    html: `
      <div dir="rtl" style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px">
        <h1 style="color:#C4704B">תודה על הזמנתך, ${customerName}!</h1>
        <p>ההזמנה שלך התקבלה בהצלחה.</p>

        <table style="width:100%;border-collapse:collapse;margin:20px 0">
          <thead>
            <tr style="background:#f9f6f3">
              <th style="padding:8px;text-align:right">פריט</th>
              <th style="padding:8px;text-align:center">כמות</th>
              <th style="padding:8px;text-align:left">מחיר</th>
            </tr>
          </thead>
          <tbody>${itemsHtml}</tbody>
        </table>

        <p style="font-size:18px;font-weight:bold">סה"כ: ₪${(totalAmount / 100).toFixed(0)}</p>
        <p style="font-size:12px;color:#999">מספר הזמנה: ${orderId}</p>

        <hr style="margin:20px 0;border:none;border-top:1px solid #eee" />

        <p>שאלות? צרי קשר:</p>
        <p>📞 <a href="tel:+972504932480">050-4932480</a></p>
        <p>💬 <a href="https://wa.me/972504932480">וואטסאפ</a></p>

        <p style="color:#999;font-size:12px;margin-top:30px">סטודיו קרמיקה ליאת רז | אהרונוביץ 18, כצנלסון, ראשון לציון</p>
      </div>
    `,
  });
}

export async function sendContactNotification({
  name,
  phone,
  message,
}: {
  name: string;
  phone: string;
  message: string;
}) {
  if (!resend) {
    console.log("[Email] Resend not configured, skipping contact notification");
    return;
  }

  const adminEmail = process.env.ADMIN_EMAIL || "liat.raz770@gmail.com";

  await resend.emails.send({
    from: FROM_EMAIL,
    to: adminEmail,
    subject: `הודעה חדשה מ${name} — האתר`,
    html: `
      <div dir="rtl" style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px">
        <h2 style="color:#C4704B">הודעה חדשה מהאתר</h2>
        <p><strong>שם:</strong> ${name}</p>
        <p><strong>טלפון:</strong> <a href="tel:${phone}">${phone}</a></p>
        <p><strong>הודעה:</strong></p>
        <p style="background:#f9f6f3;padding:15px;border-radius:8px">${message}</p>
        <p style="margin-top:20px">
          <a href="https://wa.me/972${phone.replace(/^0/, "").replace(/-/g, "")}" style="background:#25D366;color:white;padding:10px 20px;border-radius:8px;text-decoration:none">
            שלחי וואטסאפ
          </a>
        </p>
      </div>
    `,
  });
}
