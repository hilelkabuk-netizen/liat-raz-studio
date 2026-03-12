import { prisma } from "@/lib/db";
import Link from "next/link";
import { revalidatePath } from "next/cache";

async function deleteProduct(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  await prisma.product.update({ where: { id }, data: { active: false } });
  revalidatePath("/admin/products");
}

async function toggleStock(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  const current = formData.get("inStock") === "true";
  await prisma.product.update({ where: { id }, data: { inStock: !current } });
  revalidatePath("/admin/products");
}

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    where: { active: true },
    orderBy: { order: "asc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[var(--foreground)]">מוצרים</h1>
        <Link
          href="/admin/products/new"
          className="bg-[var(--primary)] text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90"
        >
          + הוסף מוצר
        </Link>
      </div>

      {products.length === 0 ? (
        <p className="text-gray-500">אין מוצרים. הוסף מוצר חדש כדי להתחיל.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
            >
              {product.imageUrl && (
                <div className="h-40 bg-gray-100 flex items-center justify-center text-4xl">
                  {product.imageUrl.startsWith("/") ? (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    product.imageUrl
                  )}
                </div>
              )}
              <div className="p-4">
                <h3 className="font-semibold">{product.name}</h3>
                <p className="text-sm text-gray-500">{product.category}</p>
                <p className="text-lg font-bold mt-1">
                  ₪{(product.price / 100).toFixed(0)}
                </p>
                <div className="flex items-center gap-2 mt-3">
                  <Link
                    href={`/admin/products/${product.id}`}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    ערוך
                  </Link>
                  <form action={toggleStock} className="inline">
                    <input type="hidden" name="id" value={product.id} />
                    <input
                      type="hidden"
                      name="inStock"
                      value={String(product.inStock)}
                    />
                    <button
                      type="submit"
                      className={`text-sm ${
                        product.inStock
                          ? "text-orange-600 hover:text-orange-800"
                          : "text-green-600 hover:text-green-800"
                      }`}
                    >
                      {product.inStock ? "סמן כאזל" : "סמן כזמין"}
                    </button>
                  </form>
                  <form action={deleteProduct} className="inline">
                    <input type="hidden" name="id" value={product.id} />
                    <button
                      type="submit"
                      className="text-sm text-red-600 hover:text-red-800"
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
