import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import sharp from "sharp";
import { put } from "@vercel/blob";

const MAX_SIZE = 10 * 1024 * 1024; // 10MB
const MAX_WIDTH = 1920;

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "לא מורשה" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "לא נבחר קובץ" }, { status: 400 });
  }

  if (file.size > MAX_SIZE) {
    return NextResponse.json(
      { error: "הקובץ גדול מדי (מקסימום 10MB)" },
      { status: 400 }
    );
  }

  const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/avif"];
  if (!allowedTypes.includes(file.type)) {
    return NextResponse.json(
      { error: "סוג קובץ לא נתמך. השתמש ב-JPEG, PNG או WebP" },
      { status: 400 }
    );
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  // Process with Sharp — resize and convert to WebP
  const processed = await sharp(buffer)
    .resize(MAX_WIDTH, undefined, { withoutEnlargement: true })
    .webp({ quality: 82 })
    .toBuffer();

  // Generate unique filename
  const timestamp = Date.now();
  const safeName = file.name
    .replace(/\.[^/.]+$/, "")
    .replace(/[^a-zA-Z0-9-_]/g, "_")
    .slice(0, 50);
  const filename = `${safeName}-${timestamp}.webp`;

  // Upload to Vercel Blob
  const blob = await put(`uploads/${filename}`, processed, {
    access: "public",
    contentType: "image/webp",
  });

  return NextResponse.json({ url: blob.url, filename });
}
