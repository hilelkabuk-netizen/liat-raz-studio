import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

async function toggleRead(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  const current = formData.get("read") === "true";
  await prisma.contactMessage.update({
    where: { id },
    data: { read: !current },
  });
  revalidatePath("/admin/messages");
}

async function deleteMessage(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  await prisma.contactMessage.delete({ where: { id } });
  revalidatePath("/admin/messages");
}

export default async function AdminMessagesPage() {
  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });

  const unreadCount = messages.filter((m) => !m.read).length;

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <h1 className="text-2xl font-bold text-text-primary">הודעות</h1>
        {unreadCount > 0 && (
          <span className="bg-red-500 text-white text-sm rounded-full px-2 py-0.5">
            {unreadCount} חדשות
          </span>
        )}
      </div>

      {messages.length === 0 ? (
        <p className="text-gray-500">אין הודעות.</p>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`bg-white rounded-xl shadow-sm border p-5 ${
                msg.read ? "border-gray-100" : "border-primary/30 bg-orange-50/30"
              }`}
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <span className="font-semibold">{msg.name}</span>
                  <span className="text-gray-500 text-sm mx-2">|</span>
                  <a
                    href={`tel:${msg.phone}`}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    {msg.phone}
                  </a>
                </div>
                <span className="text-xs text-gray-400">
                  {new Date(msg.createdAt).toLocaleDateString("he-IL")}{" "}
                  {new Date(msg.createdAt).toLocaleTimeString("he-IL", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              <p className="text-gray-700 mb-4 whitespace-pre-wrap">{msg.message}</p>
              <div className="flex gap-3">
                <form action={toggleRead}>
                  <input type="hidden" name="id" value={msg.id} />
                  <input
                    type="hidden"
                    name="read"
                    value={String(msg.read)}
                  />
                  <button
                    type="submit"
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    {msg.read ? "סמן כלא נקראה" : "סמן כנקראה"}
                  </button>
                </form>
                <a
                  href={`https://wa.me/972${msg.phone.replace(/^0/, "").replace(/-/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-green-600 hover:text-green-800"
                >
                  שלח וואטסאפ
                </a>
                <form action={deleteMessage}>
                  <input type="hidden" name="id" value={msg.id} />
                  <button
                    type="submit"
                    className="text-sm text-red-600 hover:text-red-800"
                  >
                    מחק
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
