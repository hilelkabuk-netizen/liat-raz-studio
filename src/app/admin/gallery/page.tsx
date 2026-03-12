import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import ImageUpload from "@/components/admin/ImageUpload";

async function deleteImage(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  await prisma.galleryImage.update({ where: { id }, data: { active: false } });
  revalidatePath("/admin/gallery");
}

async function addImage(formData: FormData) {
  "use server";
  await prisma.galleryImage.create({
    data: {
      imageUrl: formData.get("imageUrl") as string,
      alt: formData.get("alt") as string,
      order: parseInt(formData.get("order") as string) || 0,
    },
  });
  revalidatePath("/admin/gallery");
  revalidatePath("/");
}

export default async function AdminGalleryPage() {
  const images = await prisma.galleryImage.findMany({
    where: { active: true },
    orderBy: { order: "asc" },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-[var(--foreground)] mb-6">גלריה</h1>

      {/* Add new image form */}
      <form
        action={addImage}
        className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6"
      >
        <h2 className="text-lg font-semibold mb-4">הוסף תמונה חדשה</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">תמונה</label>
            <ImageUpload name="imageUrl" required />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                תיאור (alt)
              </label>
              <input
                name="alt"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none"
                placeholder="כלי קרמיקה בעבודת יד"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">סדר</label>
              <input
                name="order"
                type="number"
                defaultValue={0}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none"
              />
            </div>
            <div className="flex items-end">
              <button
                type="submit"
                className="bg-[var(--primary)] text-white px-6 py-3 rounded-lg font-medium hover:opacity-90"
              >
                הוסף
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* Gallery grid */}
      {images.length === 0 ? (
        <p className="text-gray-500">אין תמונות בגלריה עדיין.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image) => (
            <div
              key={image.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group relative"
            >
              <div className="aspect-square bg-gray-100 flex items-center justify-center">
                {image.imageUrl.startsWith("/") ? (
                  <img
                    src={image.imageUrl}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-4xl">{image.imageUrl}</span>
                )}
              </div>
              <div className="p-3">
                <p className="text-sm text-gray-600 truncate">{image.alt}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-gray-400">סדר: {image.order}</span>
                  <form action={deleteImage}>
                    <input type="hidden" name="id" value={image.id} />
                    <button
                      type="submit"
                      className="text-xs text-red-600 hover:text-red-800"
                    >
                      מחק
                    </button>
                  </form>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
