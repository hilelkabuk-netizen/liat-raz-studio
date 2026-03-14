import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import ImageUpload from "@/components/admin/ImageUpload";

export const dynamic = "force-dynamic";

async function saveItem(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  const data = {
    imageUrl: formData.get("imageUrl") as string,
    alt: formData.get("alt") as string,
    colStart: parseInt(formData.get("colStart") as string) || 1,
    colSpan: parseInt(formData.get("colSpan") as string) || 1,
    rowStart: parseInt(formData.get("rowStart") as string) || 1,
    rowSpan: parseInt(formData.get("rowSpan") as string) || 1,
    order: parseInt(formData.get("order") as string) || 0,
  };

  if (id) {
    await prisma.heroCollageItem.update({ where: { id }, data });
  } else {
    await prisma.heroCollageItem.create({ data });
  }
  revalidatePath("/admin/hero-collage");
  revalidatePath("/");
}

async function deleteItem(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  await prisma.heroCollageItem.update({
    where: { id },
    data: { active: false },
  });
  revalidatePath("/admin/hero-collage");
  revalidatePath("/");
}

async function addItem() {
  "use server";
  const count = await prisma.heroCollageItem.count({ where: { active: true } });
  await prisma.heroCollageItem.create({
    data: {
      imageUrl: "",
      alt: "תמונה חדשה",
      colStart: 1,
      colSpan: 1,
      rowStart: 1,
      rowSpan: 1,
      order: count + 1,
    },
  });
  revalidatePath("/admin/hero-collage");
}

async function seedCollage() {
  "use server";
  // Create table if it doesn't exist
  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "HeroCollageItem" (
      "id" TEXT NOT NULL PRIMARY KEY,
      "imageUrl" TEXT NOT NULL,
      "alt" TEXT NOT NULL,
      "colStart" INTEGER NOT NULL,
      "colSpan" INTEGER NOT NULL DEFAULT 1,
      "rowStart" INTEGER NOT NULL,
      "rowSpan" INTEGER NOT NULL DEFAULT 1,
      "order" INTEGER NOT NULL DEFAULT 0,
      "active" BOOLEAN NOT NULL DEFAULT true,
      "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);

  const count = await prisma.heroCollageItem.count();
  if (count > 0) return;

  const items = [
    { imageUrl: "/uploads/child-clay-sculpting.png", alt: "ילד מפסל מחומר", colStart: 1, colSpan: 1, rowStart: 1, rowSpan: 2, order: 1 },
    { imageUrl: "/uploads/studio-activity.jpeg", alt: "פעילות בסטודיו", colStart: 2, colSpan: 2, rowStart: 1, rowSpan: 1, order: 2 },
    { imageUrl: "/uploads/studio-interior.png", alt: "פנים הסטודיו", colStart: 4, colSpan: 1, rowStart: 1, rowSpan: 1, order: 3 },
    { imageUrl: "/uploads/studio-workshop-group.jpeg", alt: "סדנה קבוצתית בסטודיו", colStart: 4, colSpan: 1, rowStart: 2, rowSpan: 1, order: 4 },
    { imageUrl: "/uploads/studio-wheels.jpeg", alt: "אופנים בסטודיו", colStart: 1, colSpan: 1, rowStart: 3, rowSpan: 1, order: 5 },
    { imageUrl: "/uploads/studio-palette.jpeg", alt: "ציור בסטודיו", colStart: 2, colSpan: 2, rowStart: 3, rowSpan: 1, order: 6 },
    { imageUrl: "/uploads/pottery-wheel.jpg", alt: "אופן קרמיקה", colStart: 4, colSpan: 1, rowStart: 3, rowSpan: 1, order: 7 },
  ];

  for (const item of items) {
    await prisma.heroCollageItem.create({ data: item });
  }
  revalidatePath("/admin/hero-collage");
  revalidatePath("/");
}

export default async function HeroCollagePage() {
  let items: Awaited<ReturnType<typeof prisma.heroCollageItem.findMany>> = [];
  try {
    items = await prisma.heroCollageItem.findMany({
      where: { active: true },
      orderBy: { order: "asc" },
    });
  } catch {
    // Table might not exist yet
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-6">
        קולאז' תמונות ראשי
      </h1>

      {items.length === 0 && (
        <form action={seedCollage} className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-6 text-center">
          <p className="text-yellow-800 mb-3">אין תמונות בקולאז'. לחץ כדי לטעון את התמונות הקיימות:</p>
          <button type="submit" className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:opacity-90">
            טען תמונות
          </button>
        </form>
      )}

      {/* Live Preview */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
        <h2 className="text-lg font-semibold mb-3">תצוגה מקדימה</h2>
        <div
          dir="rtl"
          className="grid grid-cols-4 grid-rows-3 gap-1.5 h-[200px] sm:h-[260px] bg-gray-50 rounded-lg overflow-hidden"
        >
          {items.map((item) => (
            <div
              key={item.id}
              className="overflow-hidden rounded-lg bg-gray-200 relative"
              style={{
                gridColumnStart: item.colStart,
                gridColumnEnd: `span ${item.colSpan}`,
                gridRowStart: item.rowStart,
                gridRowEnd: `span ${item.rowSpan}`,
              }}
            >
              {item.imageUrl ? (
                <img
                  src={item.imageUrl}
                  alt={item.alt}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center text-gray-400 text-xs">
                  אין תמונה
                </div>
              )}
              <div className="absolute bottom-0 right-0 left-0 bg-black/50 text-white text-[10px] px-1 py-0.5 truncate">
                {item.alt}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Items list */}
      <div className="space-y-4 mb-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-4"
          >
            <form action={saveItem}>
              <input type="hidden" name="id" value={item.id} />
              <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-4">
                {/* Image */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    תמונה
                  </label>
                  <ImageUpload name="imageUrl" currentUrl={item.imageUrl} />
                </div>

                {/* Settings */}
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      תיאור
                    </label>
                    <input
                      name="alt"
                      defaultValue={item.alt}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-5 gap-2">
                    <div>
                      <label className="block text-xs font-medium mb-1">
                        עמודה
                      </label>
                      <select
                        name="colStart"
                        defaultValue={item.colStart}
                        className="w-full px-2 py-2 border border-gray-300 rounded-lg text-sm"
                      >
                        {[1, 2, 3, 4].map((n) => (
                          <option key={n} value={n}>
                            {n}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1">
                        רוחב
                      </label>
                      <select
                        name="colSpan"
                        defaultValue={item.colSpan}
                        className="w-full px-2 py-2 border border-gray-300 rounded-lg text-sm"
                      >
                        {[1, 2, 3].map((n) => (
                          <option key={n} value={n}>
                            {n}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1">
                        שורה
                      </label>
                      <select
                        name="rowStart"
                        defaultValue={item.rowStart}
                        className="w-full px-2 py-2 border border-gray-300 rounded-lg text-sm"
                      >
                        {[1, 2, 3].map((n) => (
                          <option key={n} value={n}>
                            {n}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1">
                        גובה
                      </label>
                      <select
                        name="rowSpan"
                        defaultValue={item.rowSpan}
                        className="w-full px-2 py-2 border border-gray-300 rounded-lg text-sm"
                      >
                        {[1, 2, 3].map((n) => (
                          <option key={n} value={n}>
                            {n}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1">
                        סדר
                      </label>
                      <input
                        name="order"
                        type="number"
                        defaultValue={item.order}
                        className="w-full px-2 py-2 border border-gray-300 rounded-lg text-sm"
                      />
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90"
                    >
                      שמור
                    </button>
                  </div>
                </div>
              </div>
            </form>

            {/* Delete */}
            <form action={deleteItem} className="mt-2">
              <input type="hidden" name="id" value={item.id} />
              <button
                type="submit"
                className="text-xs text-red-600 hover:text-red-800"
              >
                מחק תמונה
              </button>
            </form>
          </div>
        ))}
      </div>

      {/* Add new item */}
      <form action={addItem}>
        <button
          type="submit"
          className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:opacity-90"
        >
          + הוסף תמונה חדשה
        </button>
      </form>
    </div>
  );
}
