import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    const admin = await prisma.admin.findUnique({
      where: { email: "liat@studio.com" },
    });

    if (!admin) {
      return NextResponse.json({ ok: false, error: "Admin not found" });
    }

    const passwordMatch = await bcrypt.compare("liat2024", admin.password);

    return NextResponse.json({
      ok: true,
      adminFound: true,
      adminEmail: admin.email,
      passwordMatch,
      passwordHashStart: admin.password.substring(0, 10),
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
