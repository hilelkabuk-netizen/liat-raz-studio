import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import bcrypt from "bcryptjs";
import path from "path";

const dbPath = path.join(process.cwd(), "prisma", "dev.db");
const prisma = new PrismaClient({
  adapter: new PrismaBetterSqlite3({ url: `file:${dbPath}` }),
});

async function main() {
  console.log("Seeding database...");

  // Create admin user
  const hashedPassword = await bcrypt.hash("admin123", 12);
  await prisma.admin.upsert({
    where: { email: "liat.raz770@gmail.com" },
    update: {},
    create: {
      email: "liat.raz770@gmail.com",
      password: hashedPassword,
    },
  });
  console.log("Admin user created (liat.raz770@gmail.com / admin123)");

  // Only seed if tables are empty
  const classCount = await prisma.classType.count();
  if (classCount === 0) {
    await prisma.classType.createMany({
      data: [
        {
          name: "חוג שבועי",
          description:
            "חוג קרמיקה שבועי קבוע בקבוצות קטנות ואינטימיות. עבודה על גלגל יוצרים ובניה ביד. מתאים למתחילות ומתקדמות.",
          price: "₪380 לחודש",
          schedule: "ימים א'-ה', 09:00-11:30",
          order: 1,
        },
        {
          name: "שיעור פרטי",
          description:
            "שיעור אישי אחד-על-אחד מותאם לרמה ולרצונות שלך. הזדמנות מושלמת ללמוד בקצב שלך.",
          price: "₪250 לשיעור",
          schedule: "בתיאום מראש",
          order: 2,
        },
        {
          name: "סדנת יום הולדת",
          description:
            "חוויה יצירתית ומיוחדת ליום הולדת! עד 10 משתתפות, יצירה בחימר, כיף ויצירתיות באווירה חגיגית.",
          price: "₪180 למשתתפת",
          schedule: "בתיאום מראש, שעתיים",
          order: 3,
        },
        {
          name: "סדנת העמקה",
          description:
            "סדנה מרוכזת של יום שלם לחוויה עמוקה ומלאה. מתאימה למי שרוצה לצלול לעולם הקרמיקה.",
          price: "₪450 לסדנה",
          schedule: "ימי שישי, 09:00-14:00",
          order: 4,
        },
      ],
    });
    console.log("Class types seeded");
  }

  const productCount = await prisma.product.count();
  if (productCount === 0) {
    await prisma.product.createMany({
      data: [
        {
          name: "קערת הגשה גדולה",
          description: "קערת הגשה מרשימה בצבעי אדמה",
          category: "כלי הגשה",
          price: 28000,
          dimensions: '30x10 ס"מ',
          imageUrl: "🥣",
          order: 1,
        },
        {
          name: "ספל קפה",
          description: "ספל קפה ייחודי בעבודת יד",
          category: "ספלים",
          price: 9500,
          dimensions: '9x8 ס"מ',
          imageUrl: "☕",
          order: 2,
        },
        {
          name: "צלחת דקורטיבית",
          description: "צלחת קיר מעוצבת בדגם פרחוני",
          category: "צלחות",
          price: 22000,
          dimensions: '25 ס"מ קוטר',
          imageUrl: "🍽️",
          order: 3,
        },
        {
          name: "אגרטל פרחים",
          description: "אגרטל אלגנטי לפרחים טריים או יבשים",
          category: "אגרטלים",
          price: 18000,
          dimensions: '20x12 ס"מ',
          imageUrl: "🏺",
          order: 4,
        },
        {
          name: "קערת סלט",
          description: "קערה בינונית מושלמת להגשת סלט",
          category: "קערות",
          price: 16000,
          dimensions: '22x8 ס"מ',
          imageUrl: "🥗",
          order: 5,
        },
        {
          name: "סט ספלי אספרסו",
          description: "סט 4 ספלי אספרסו קטנים ומקסימים",
          category: "ספלים",
          price: 24000,
          dimensions: '6x6 ס"מ כל ספל',
          imageUrl: "☕",
          order: 6,
        },
      ],
    });
    console.log("Products seeded");
  }

  const galleryCount = await prisma.galleryImage.count();
  if (galleryCount === 0) {
    await prisma.galleryImage.createMany({
      data: [
        { imageUrl: "🏺", alt: "אגרטל קרמיקה בעבודת יד", order: 1 },
        { imageUrl: "🥣", alt: "קערה בצבעי אדמה", order: 2 },
        { imageUrl: "☕", alt: "ספלי קפה ייחודיים", order: 3 },
        { imageUrl: "🍽️", alt: "צלחות דקורטיביות", order: 4 },
        { imageUrl: "🎨", alt: "עבודה על גלגל יוצרים", order: 5 },
        { imageUrl: "✋", alt: "בניה ביד מחימר", order: 6 },
      ],
    });
    console.log("Gallery images seeded");
  }

  const voucherCount = await prisma.voucherType.count();
  if (voucherCount === 0) {
    await prisma.voucherType.createMany({
      data: [
        {
          name: "שובר לשיעור פרטי",
          description:
            "מתנה מושלמת! שיעור פרטי אחד-על-אחד בסטודיו של ליאת. תקף ל-6 חודשים.",
          price: 25000,
          order: 1,
        },
        {
          name: "שובר לסדנת יום הולדת",
          description:
            "סדנת קרמיקה חגיגית ליום הולדת עד 10 משתתפות. מתנה מקורית ובלתי נשכחת!",
          price: 180000,
          order: 2,
        },
        {
          name: "שובר לחודש חוג",
          description:
            "חודש שלם של חוג קרמיקה שבועי. מתנה שנותנת זמן איכות ויצירתיות.",
          price: 38000,
          order: 3,
        },
      ],
    });
    console.log("Voucher types seeded");
  }

  console.log("\nDatabase seeded successfully!");
  console.log("Admin login: liat.raz770@gmail.com");
  console.log("Admin password: admin123");
  console.log("Change the password in production!");
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
