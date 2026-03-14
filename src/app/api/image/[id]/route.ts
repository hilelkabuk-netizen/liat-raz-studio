import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const rows = await prisma.$queryRawUnsafe<
      { data: string; contentType: string }[]
    >(
      `SELECT "data", "contentType" FROM "UploadedImage" WHERE "id" = ?`,
      id
    );

    if (!rows || rows.length === 0) {
      return new NextResponse("Not found", { status: 404 });
    }

    const image = rows[0];
    const buffer = Buffer.from(image.data, "base64");

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": image.contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new NextResponse("Error", { status: 500 });
  }
}
