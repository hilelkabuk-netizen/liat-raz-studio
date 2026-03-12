import { prisma } from "@/lib/db";
import Link from "next/link";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function deleteClass(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  await prisma.classType.update({ where: { id }, data: { active: false } });
  revalidatePath("/admin/classes");
}

export default async function AdminClassesPage() {
  const classes = await prisma.classType.findMany({
    where: { active: true },
    orderBy: { order: "asc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-text-primary">
          חוגים וסדנאות
        </h1>
        <Link
          href="/admin/classes/new"
          className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90"
        >
          + הוסף חוג
        </Link>
      </div>

      {classes.length === 0 ? (
        <p className="text-gray-500">אין חוגים פעילים. הוסף חוג חדש כדי להתחיל.</p>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-gray-500 border-b">
                <th className="text-start p-4">שם</th>
                <th className="text-start p-4">מחיר</th>
                <th className="text-start p-4">לוח זמנים</th>
                <th className="text-start p-4">פעולות</th>
              </tr>
            </thead>
            <tbody>
              {classes.map((cls) => (
                <tr key={cls.id} className="border-b last:border-0 hover:bg-gray-50">
                  <td className="p-4 font-medium">{cls.name}</td>
                  <td className="p-4">{cls.price}</td>
                  <td className="p-4 text-gray-600">{cls.schedule}</td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <Link
                        href={`/admin/classes/${cls.id}`}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        ערוך
                      </Link>
                      <form action={deleteClass}>
                        <input type="hidden" name="id" value={cls.id} />
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
