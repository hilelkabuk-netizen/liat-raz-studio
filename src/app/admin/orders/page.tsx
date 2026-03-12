import { prisma } from "@/lib/db";

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      voucherType: true,
      items: { include: { product: true } },
    },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-[var(--foreground)] mb-6">הזמנות</h1>

      {orders.length === 0 ? (
        <p className="text-gray-500">אין הזמנות עדיין.</p>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-gray-500 border-b">
                <th className="text-start p-4">תאריך</th>
                <th className="text-start p-4">לקוח</th>
                <th className="text-start p-4">סוג</th>
                <th className="text-start p-4">פרטים</th>
                <th className="text-start p-4">סכום</th>
                <th className="text-start p-4">סטטוס</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b last:border-0 hover:bg-gray-50"
                >
                  <td className="p-4">
                    {new Date(order.createdAt).toLocaleDateString("he-IL")}
                  </td>
                  <td className="p-4">
                    <div className="font-medium">{order.customerName}</div>
                    <div className="text-gray-500 text-xs">
                      {order.customerEmail}
                    </div>
                    {order.customerPhone && (
                      <div className="text-gray-500 text-xs">
                        {order.customerPhone}
                      </div>
                    )}
                  </td>
                  <td className="p-4">
                    {order.type === "voucher" ? "שובר מתנה" : "מוצרים"}
                  </td>
                  <td className="p-4 text-gray-600">
                    {order.type === "voucher" && order.voucherType
                      ? order.voucherType.name
                      : order.items
                          .map(
                            (item) =>
                              `${item.product.name}${
                                item.quantity > 1 ? ` x${item.quantity}` : ""
                              }`
                          )
                          .join(", ")}
                    {order.recipientName && (
                      <div className="text-xs mt-1">
                        נמען: {order.recipientName}
                      </div>
                    )}
                  </td>
                  <td className="p-4 font-semibold">
                    ₪{(order.totalAmount / 100).toFixed(0)}
                  </td>
                  <td className="p-4">
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
