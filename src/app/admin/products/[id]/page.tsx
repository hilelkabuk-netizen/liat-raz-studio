import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect, notFound } from "next/navigation";
import ImageUpload from "@/components/admin/ImageUpload";

async function saveProduct(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  const data = {
    name: formData.get("name") as string,
    description: (formData.get("description") as string) || null,
    category: formData.get("category") as string,
    price: Math.round(parseFloat(formData.get("price") as string) * 100),
    dimensions: (formData.get("dimensions") as string) || null,
    imageUrl: formData.get("imageUrl") as string,
    inStock: formData.get("inStock") === "on",
    order: parseInt(formData.get("order") as string) || 0,
  };

  if (id === "new") {
    await prisma.product.create({ data });
  } else {
    await prisma.product.update({ where: { id }, data });
  }

  revalidatePath("/admin/products");
  revalidatePath("/shop");
  redirect("/admin/products");
}

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const isNew = id === "new";

  const product = isNew
    ? null
    : await prisma.product.findUnique({ where: { id } });

  if (!isNew && !product) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-6">
        {isNew ? "הוסף מוצר חדש" : `ערוך: ${product!.name}`}
      </h1>

      <form action={saveProduct} className="max-w-xl space-y-5">
        <input type="hidden" name="id" value={id} />

        <div>
          <label className="block text-sm font-medium mb-1">שם המוצר</label>
          <input
            name="name"
            defaultValue={product?.name ?? ""}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">תיאור</label>
          <textarea
            name="description"
            defaultValue={product?.description ?? ""}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">קטגוריה</label>
            <select
              name="category"
              defaultValue={product?.category ?? "כלי הגשה"}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            >
              <option value="כלי הגשה">כלי הגשה</option>
              <option value="ספלים">ספלים</option>
              <option value="קערות">קערות</option>
              <option value="צלחות">צלחות</option>
              <option value="אגרטלים">אגרטלים</option>
              <option value="פריטי נוי">פריטי נוי</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">מחיר (₪)</label>
            <input
              name="price"
              type="number"
              step="1"
              defaultValue={product ? product.price / 100 : ""}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">מידות</label>
            <input
              name="dimensions"
              defaultValue={product?.dimensions ?? ""}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              placeholder='למשל: 15x10 ס"מ'
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">סדר הצגה</label>
            <input
              name="order"
              type="number"
              defaultValue={product?.order ?? 0}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">תמונת מוצר</label>
          <ImageUpload
            name="imageUrl"
            currentUrl={product?.imageUrl ?? undefined}
            required
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="inStock"
            id="inStock"
            defaultChecked={product?.inStock ?? true}
            className="w-4 h-4"
          />
          <label htmlFor="inStock" className="text-sm">
            במלאי
          </label>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:opacity-90"
          >
            {isNew ? "הוסף" : "שמור שינויים"}
          </button>
          <a
            href="/admin/products"
            className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            ביטול
          </a>
        </div>
      </form>
    </div>
  );
}
