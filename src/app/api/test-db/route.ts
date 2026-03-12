import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const adminCount = await prisma.admin.count();
    const admins = await prisma.admin.findMany({
      select: { id: true, email: true },
    });
    return NextResponse.json({
      ok: true,
      adminCount,
      admins,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
