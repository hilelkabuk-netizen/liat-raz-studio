import { createClient } from "@libsql/client";

const client = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

const items = [
  { imageUrl: "/uploads/child-sculpting.png", alt: "ילד יוצר", colStart: 1, colSpan: 1, rowStart: 1, rowSpan: 2, order: 1 },
  { imageUrl: "/uploads/studio-activity.jpeg", alt: "פעילות בסטודיו", colStart: 2, colSpan: 2, rowStart: 1, rowSpan: 1, order: 2 },
  { imageUrl: "/uploads/studio-interior.png", alt: "פנים הסטודיו", colStart: 4, colSpan: 1, rowStart: 1, rowSpan: 1, order: 3 },
  { imageUrl: "/uploads/studio-workshop.png", alt: "סדנה בסטודיו", colStart: 4, colSpan: 1, rowStart: 2, rowSpan: 1, order: 4 },
  { imageUrl: "/uploads/studio-wheels.jpeg", alt: "אופנים בסטודיו", colStart: 1, colSpan: 1, rowStart: 3, rowSpan: 1, order: 5 },
  { imageUrl: "/uploads/studio-palette.jpeg", alt: "ציור בסטודיו", colStart: 2, colSpan: 2, rowStart: 3, rowSpan: 1, order: 6 },
  { imageUrl: "/uploads/pottery-wheel.jpg", alt: "אופן קרמיקה", colStart: 4, colSpan: 1, rowStart: 3, rowSpan: 1, order: 7 },
];

// Create table if not exists
await client.execute(`
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

for (const item of items) {
  const id = `collage_${item.order}`;
  await client.execute({
    sql: `INSERT OR REPLACE INTO "HeroCollageItem" ("id", "imageUrl", "alt", "colStart", "colSpan", "rowStart", "rowSpan", "order", "active", "createdAt", "updatedAt") VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1, datetime('now'), datetime('now'))`,
    args: [id, item.imageUrl, item.alt, item.colStart, item.colSpan, item.rowStart, item.rowSpan, item.order],
  });
}

console.log("Seeded", items.length, "collage items to Turso!");
