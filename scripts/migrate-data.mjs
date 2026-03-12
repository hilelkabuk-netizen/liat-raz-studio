import { createClient } from "@libsql/client";
import path from "path";

const dbPath = path.join(process.cwd(), "prisma", "dev.db");
const localDb = createClient({ url: `file:${dbPath}` });
const turso = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

const tables = [
  "ClassType", "Product", "VoucherType", "GalleryImage",
  "SiteContent", "ContactMessage",
];

for (const table of tables) {
  const result = await localDb.execute(`SELECT * FROM "${table}"`);
  const rows = result.rows;
  if (rows.length === 0) {
    console.log(`${table}: 0 rows, skipping`);
    continue;
  }

  const cols = result.columns;
  const placeholders = cols.map(() => "?").join(", ");
  const colNames = cols.map(c => `"${c}"`).join(", ");

  for (const row of rows) {
    const values = cols.map(c => row[c]);
    try {
      await turso.execute({
        sql: `INSERT OR IGNORE INTO "${table}" (${colNames}) VALUES (${placeholders})`,
        args: values,
      });
    } catch (e) {
      console.error(`Error inserting into ${table}:`, e.message);
    }
  }
  console.log(`${table}: ${rows.length} rows migrated`);
}

console.log("Data migration complete!");
process.exit(0);
