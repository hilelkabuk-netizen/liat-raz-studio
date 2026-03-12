import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { sendContactNotification } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, message, honeypot } = body;

    // Spam protection - honeypot field should be empty
    if (honeypot) {
      return NextResponse.json({ success: true });
    }

    if (!name || !phone || !message) {
      return NextResponse.json(
        { error: "כל השדות הם חובה" },
        { status: 400 }
      );
    }

    await prisma.contactMessage.create({
      data: { name, phone, message },
    });

    // Notify admin via email (non-blocking)
    sendContactNotification({ name, phone, message }).catch(console.error);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "שגיאה בשליחת ההודעה" },
      { status: 500 }
    );
  }
}
