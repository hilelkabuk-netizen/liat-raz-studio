import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect, notFound } from "next/navigation";

async function saveVoucher(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  const data = {
    name: formData.get("name") as string,
    description: formData.get("description") as string,
    price: Math.round(parseFloat(formData.get("price") as string) * 100),
    order: parseInt(formData.get("order") as string) || 0,
  };

  if (id === "new") {
    await prisma.voucherType.create({ data });
  } else {
    await prisma.voucherType.update({ where: { id }, data });
  }

  revalidatePath("/admin/vouchers");
  revalidatePath("/gift-vouchers");
  redirect("/admin/vouchers");
}

export default async function EditVoucherPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const isNew = id === "new";

  const voucher = isNew
    ? null
    : await prisma.voucherType.findUnique({ where: { id } });

  if (!isNew && !voucher) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-6">
        {isNew ? "הוסף שובר חדש" : `ערוך: ${voucher!.name}`}
      </h1>

      <form action={saveVoucher} className="max-w-xl space-y-5">
        <input type="hidden" name="id" value={id} />

        <div>
          <label className="block text-sm font-medium mb-1">שם השובר</label>
          <input
            name="name"
            defaultValue={voucher?.name ?? ""}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            placeholder="למשל: שובר לשיעור פרטי"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">תיאור</label>
          <textarea
            name="description"
            defaultValue={voucher?.description ?? ""}
            required
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">מחיר (₪)</label>
            <input
              name="price"
              type="number"
              step="1"
              defaultValue={voucher ? voucher.price / 100 : ""}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">סדר הצגה</label>
            <input
              name="order"
              type="number"
              defaultValue={voucher?.order ?? 0}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            />
          </div>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:opacity-90"
          >
            {isNew ? "הוסף" : "שמור שינויים"}
          </button>
          <a
            href="/admin/vouchers"
            className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            ביטול
          </a>
        </div>
      </form>
    </div>
  );
}
