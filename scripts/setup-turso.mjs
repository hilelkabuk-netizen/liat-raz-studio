import { createClient } from "@libsql/client";
import { hash } from "bcryptjs";

const client = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

const statements = [
  `CREATE TABLE IF NOT EXISTS "ClassType" ("id" TEXT NOT NULL PRIMARY KEY, "name" TEXT NOT NULL, "description" TEXT NOT NULL, "price" TEXT NOT NULL, "schedule" TEXT NOT NULL, "imageUrl" TEXT, "order" INTEGER NOT NULL DEFAULT 0, "active" BOOLEAN NOT NULL DEFAULT true, "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP)`,
  `CREATE TABLE IF NOT EXISTS "Product" ("id" TEXT NOT NULL PRIMARY KEY, "name" TEXT NOT NULL, "description" TEXT, "category" TEXT NOT NULL, "price" INTEGER NOT NULL, "dimensions" TEXT, "imageUrl" TEXT NOT NULL, "inStock" BOOLEAN NOT NULL DEFAULT true, "order" INTEGER NOT NULL DEFAULT 0, "active" BOOLEAN NOT NULL DEFAULT true, "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP)`,
  `CREATE TABLE IF NOT EXISTS "VoucherType" ("id" TEXT NOT NULL PRIMARY KEY, "name" TEXT NOT NULL, "description" TEXT NOT NULL, "price" INTEGER NOT NULL, "active" BOOLEAN NOT NULL DEFAULT true, "order" INTEGER NOT NULL DEFAULT 0, "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP)`,
  `CREATE TABLE IF NOT EXISTS "GalleryImage" ("id" TEXT NOT NULL PRIMARY KEY, "imageUrl" TEXT NOT NULL, "alt" TEXT NOT NULL, "order" INTEGER NOT NULL DEFAULT 0, "active" BOOLEAN NOT NULL DEFAULT true, "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP)`,
  `CREATE TABLE IF NOT EXISTS "Order" ("id" TEXT NOT NULL PRIMARY KEY, "type" TEXT NOT NULL, "status" TEXT NOT NULL DEFAULT 'pending', "totalAmount" INTEGER NOT NULL, "customerName" TEXT NOT NULL, "customerEmail" TEXT NOT NULL, "customerPhone" TEXT, "recipientName" TEXT, "recipientEmail" TEXT, "paymentId" TEXT, "voucherTypeId" TEXT, "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "Order_voucherTypeId_fkey" FOREIGN KEY ("voucherTypeId") REFERENCES "VoucherType" ("id") ON DELETE SET NULL ON UPDATE CASCADE)`,
  `CREATE TABLE IF NOT EXISTS "OrderItem" ("id" TEXT NOT NULL PRIMARY KEY, "orderId" TEXT NOT NULL, "productId" TEXT NOT NULL, "quantity" INTEGER NOT NULL DEFAULT 1, "price" INTEGER NOT NULL, CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("id") ON DELETE RESTRICT ON UPDATE CASCADE, CONSTRAINT "OrderItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE)`,
  `CREATE TABLE IF NOT EXISTS "ContactMessage" ("id" TEXT NOT NULL PRIMARY KEY, "name" TEXT NOT NULL, "phone" TEXT NOT NULL, "message" TEXT NOT NULL, "read" BOOLEAN NOT NULL DEFAULT false, "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP)`,
  `CREATE TABLE IF NOT EXISTS "SiteContent" ("id" TEXT NOT NULL PRIMARY KEY, "key" TEXT NOT NULL, "value" TEXT NOT NULL, "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP)`,
  `CREATE TABLE IF NOT EXISTS "Admin" ("id" TEXT NOT NULL PRIMARY KEY, "email" TEXT NOT NULL, "password" TEXT NOT NULL)`,
  `CREATE UNIQUE INDEX IF NOT EXISTS "SiteContent_key_key" ON "SiteContent"("key")`,
  `CREATE UNIQUE INDEX IF NOT EXISTS "Admin_email_key" ON "Admin"("email")`,
];

console.log("Creating tables...");
for (const sql of statements) {
  await client.execute(sql);
}
console.log("Tables created!");

// Create admin user
const adminEmail = "liat@studio.com";
const adminPassword = await hash("liat2024", 10);
const adminId = "admin-" + Date.now();

await client.execute({
  sql: `INSERT OR IGNORE INTO "Admin" ("id", "email", "password") VALUES (?, ?, ?)`,
  args: [adminId, adminEmail, adminPassword],
});
console.log(`Admin user created: ${adminEmail} / liat2024`);

console.log("Done!");
process.exit(0);
