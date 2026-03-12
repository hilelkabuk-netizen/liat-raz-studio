import { prisma } from "@/lib/db";
import Link from "next/link";
import { revalidatePath } from "next/cache";

async function deleteVoucher(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  await prisma.voucherType.update({ where: { id }, data: { active: false } });
  revalidatePath("/admin/vouchers");
}

export default async function AdminVouchersPage() {
  const vouchers = await prisma.voucherType.findMany({
    where: { active: true },
    orderBy: { order: "asc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-text-primary">
          שוברי מתנה
        </h1>
        <Link
          href="/admin/vouchers/new"
          className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90"
        >
          + הוסף שובר
        </Link>
      </div>

      {vouchers.length === 0 ? (
        <p className="text-gray-500">אין שוברים. הוסף שובר חדש כדי להתחיל.</p>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-gray-500 border-b">
                <th className="text-start p-4">שם</th>
                <th className="text-start p-4">תיאור</th>
                <th className="text-start p-4">מחיר</th>
                <th className="text-start p-4">פעולות</th>
              </tr>
            </thead>
            <tbody>
              {vouchers.map((voucher) => (
                <tr
                  key={voucher.id}
                  className="border-b last:border-0 hover:bg-gray-50"
                >
                  <td className="p-4 font-medium">{voucher.name}</td>
                  <td className="p-4 text-gray-600 max-w-xs truncate">
                    {voucher.description}
                  </td>
                  <td className="p-4">₪{(voucher.price / 100).toFixed(0)}</td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <Link
                        href={`/admin/vouchers/${voucher.id}`}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        ערוך
                      </Link>
                      <form action={deleteVoucher}>
                        <input type="hidden" name="id" value={voucher.id} />
                        <button
                          type="submit"
                          className="text-red-600 hover:text-red-800"
                        >
                          מחק
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
