import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import sharp from "sharp";
import { prisma } from "@/lib/db";

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

  // Generate unique ID and convert to base64
  const id = `img_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  const base64Data = processed.toString("base64");

  // Ensure table exists
  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "UploadedImage" (
      "id" TEXT NOT NULL PRIMARY KEY,
      "data" TEXT NOT NULL,
      "contentType" TEXT NOT NULL DEFAULT 'image/webp',
      "filename" TEXT,
      "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Save to database
  await prisma.$executeRawUnsafe(
    `INSERT INTO "UploadedImage" ("id", "data", "contentType", "filename") VALUES (?, ?, ?, ?)`,
    id,
    base64Data,
    "image/webp",
    file.name
  );

  const url = `/api/image/${id}`;
  return NextResponse.json({ url, filename: file.name });
}
