import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect, notFound } from "next/navigation";
import ImageUpload from "@/components/admin/ImageUpload";

async function saveClass(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  const data = {
    name: formData.get("name") as string,
    description: formData.get("description") as string,
    price: formData.get("price") as string,
    schedule: formData.get("schedule") as string,
    imageUrl: (formData.get("imageUrl") as string) || null,
    order: parseInt(formData.get("order") as string) || 0,
  };

  if (id === "new") {
    await prisma.classType.create({ data });
  } else {
    await prisma.classType.update({ where: { id }, data });
  }

  revalidatePath("/admin/classes");
  revalidatePath("/classes");
  revalidatePath("/");
  redirect("/admin/classes");
}

export default async function EditClassPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const isNew = id === "new";

  const classType = isNew
    ? null
    : await prisma.classType.findUnique({ where: { id } });

  if (!isNew && !classType) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-[var(--foreground)] mb-6">
        {isNew ? "הוסף חוג חדש" : `ערוך: ${classType!.name}`}
      </h1>

      <form action={saveClass} className="max-w-xl space-y-5">
        <input type="hidden" name="id" value={id} />

        <div>
          <label className="block text-sm font-medium mb-1">שם החוג</label>
          <input
            name="name"
            defaultValue={classType?.name ?? ""}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none"
            placeholder="למשל: חוג שבועי"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">תיאור</label>
          <textarea
            name="description"
            defaultValue={classType?.description ?? ""}
            required
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none"
            placeholder="תיאור מפורט של החוג"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">תמונת החוג</label>
          <ImageUpload
            currentUrl={classType?.imageUrl ?? ""}
            name="imageUrl"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">מחיר</label>
            <input
              name="price"
              defaultValue={classType?.price ?? ""}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none"
              placeholder="₪380 לחודש"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">סדר הצגה</label>
            <input
              name="order"
              type="number"
              defaultValue={classType?.order ?? 0}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">לוח זמנים</label>
          <input
            name="schedule"
            defaultValue={classType?.schedule ?? ""}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none"
            placeholder="כל יום א'-ה', 09:00-11:30"
          />
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-[var(--primary)] text-white px-6 py-3 rounded-lg font-medium hover:opacity-90"
          >
            {isNew ? "הוסף" : "שמור שינויים"}
          </button>
          <a
            href="/admin/classes"
            className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            ביטול
          </a>
        </div>
      </form>
    </div>
  );
}
