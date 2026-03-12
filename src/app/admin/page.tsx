import { prisma } from "@/lib/db";

export default async function AdminDashboard() {
  const [classCount, productCount, voucherCount, orderCount, messageCount, unreadCount] =
    await Promise.all([
      prisma.classType.count({ where: { active: true } }),
      prisma.product.count({ where: { active: true } }),
      prisma.voucherType.count({ where: { active: true } }),
      prisma.order.count(),
      prisma.contactMessage.count(),
      prisma.contactMessage.count({ where: { read: false } }),
    ]);

  const recentOrders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  const stats = [
    { label: "חוגים פעילים", value: classCount, badge: undefined },
    { label: "מוצרים פעילים", value: productCount, badge: undefined },
    { label: "שוברי מתנה", value: voucherCount, badge: undefined },
    { label: "הזמנות", value: orderCount, badge: undefined },
    { label: "הודעות", value: messageCount, badge: unreadCount || undefined },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-6">דשבורד</h1>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 relative"
          >
            <div className="text-2xl font-bold text-text-primary">
              {stat.value}
            </div>
            <div className="text-sm text-gray-500">{stat.label}</div>
            {stat.badge && (
              <span className="absolute top-3 left-3 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {stat.badge}
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold mb-4">הזמנות אחרונות</h2>
        {recentOrders.length === 0 ? (
          <p className="text-gray-500 text-sm">אין הזמנות עדיין</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-500 border-b">
                <th className="text-start pb-2">לקוח</th>
                <th className="text-start pb-2">סוג</th>
                <th className="text-start pb-2">סכום</th>
                <th className="text-start pb-2">סטטוס</th>
                <th className="text-start pb-2">תאריך</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-b last:border-0">
                  <td className="py-3">{order.customerName}</td>
                  <td className="py-3">
                    {order.type === "voucher" ? "שובר" : "מוצר"}
                  </td>
                  <td className="py-3">₪{(order.totalAmount / 100).toFixed(0)}</td>
                  <td className="py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        order.status === "paid"
                          ? "bg-green-100 text-green-700"
                          : order.status === "failed"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {order.status === "paid"
                        ? "שולם"
                        : order.status === "failed"
                        ? "נכשל"
                        : "ממתין"}
                    </span>
                  </td>
                  <td className="py-3">
                    {new Date(order.createdAt).toLocaleDateString("he-IL")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
