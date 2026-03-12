import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { sendOrderConfirmation } from "@/lib/email";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  type: "product" | "voucher";
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { items, customerName, customerEmail, customerPhone } = body as {
      items: CartItem[];
      customerName: string;
      customerEmail: string;
      customerPhone?: string;
    };

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "העגלה ריקה" }, { status: 400 });
    }

    if (!customerName || !customerEmail) {
      return NextResponse.json(
        { error: "שם ואימייל הם שדות חובה" },
        { status: 400 }
      );
    }

    // Calculate total in agorot (prices come in shekel from cart)
    const totalAmount = Math.round(
      items.reduce((sum, item) => sum + item.price * item.quantity * 100, 0)
    );

    const hasVoucher = items.some((item) => item.type === "voucher");
    const hasProduct = items.some((item) => item.type === "product");

    const orderType = hasVoucher && !hasProduct ? "voucher" : "product";

    // Create order
    const order = await prisma.order.create({
      data: {
        type: orderType,
        status: "pending",
        totalAmount,
        customerName,
        customerEmail,
        customerPhone: customerPhone || null,
        voucherTypeId: orderType === "voucher" ? items[0].id : null,
        items:
          orderType === "product"
            ? {
                create: items
                  .filter((item) => item.type === "product")
                  .map((item) => ({
                    productId: item.id,
                    quantity: item.quantity,
                    price: Math.round(item.price * 100),
                  })),
              }
            : undefined,
      },
    });

    // Send order confirmation email (non-blocking)
    sendOrderConfirmation({
      customerName,
      customerEmail,
      orderId: order.id,
      totalAmount: order.totalAmount,
      items: items.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price * item.quantity,
      })),
    }).catch(console.error);

    // TODO: Integrate with PayPlus/Meshulam payment provider
    // For now, return order ID. In production, redirect to payment page.

    return NextResponse.json({
      orderId: order.id,
      totalAmount: order.totalAmount,
      message: "הזמנה נוצרה בהצלחה",
    });
  } catch {
    return NextResponse.json(
      { error: "שגיאה ביצירת ההזמנה" },
      { status: 500 }
    );
  }
}
