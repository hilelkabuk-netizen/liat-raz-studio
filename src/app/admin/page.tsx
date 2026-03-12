import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  let stats = { classes: 0, products: 0, vouchers: 0, messages: 0 };
  let error = "";

  try {
    const [classCount, productCount, voucherCount, messageCount] =
      await Promise.all([
        prisma.classType.count(),
        prisma.product.count(),
        prisma.voucherType.count(),
        prisma.contactMessage.count(),
      ]);
    stats = {
      classes: classCount,
      products: productCount,
      vouchers: voucherCount,
      messages: messageCount,
    };
  } catch (e) {
    error = e instanceof Error ? e.message : "שגיאה בטעינת נתונים";
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-6">דשבורד</h1>

      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-4">
          {error}
        </div>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="text-2xl font-bold text-text-primary">{stats.classes}</div>
          <div className="text-sm text-gray-500">חוגים</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="text-2xl font-bold text-text-primary">{stats.products}</div>
          <div className="text-sm text-gray-500">מוצרים</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="text-2xl font-bold text-text-primary">{stats.vouchers}</div>
          <div className="text-sm text-gray-500">שוברי מתנה</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="text-2xl font-bold text-text-primary">{stats.messages}</div>
          <div className="text-sm text-gray-500">הודעות</div>
        </div>
      </div>
    </div>
  );
}
