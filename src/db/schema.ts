import { pgTable, serial, text, integer, boolean, timestamp } from "drizzle-orm/pg-core";

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),        // chatgpt-plus, netflix-uhd...
  name: text("name").notNull(),
  short: text("short"),                          // وصف قصير للكرت
  description: text("description"),
  cover: text("cover"),                          // رابط الصورة
  category: text("category").notNull(),          // all / ai / media / tools ...
  priceCents: integer("price_cents").notNull(),
  periodText: text("period_text").notNull(),     // "/month" أو "/3 months"
  stock: integer("stock").notNull().default(0),  // الكمية المتاحة
  sold: integer("sold").notNull().default(0),    // عدد المبيعات المعروضة
  active: boolean("active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow()
});

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  phone: text("phone").notNull(),              // رقم واتساب
  productSlug: text("product_slug").notNull(), // يربط المنتج
  status: text("status").notNull().default("pending"), // pending/paid/active/cancelled
  createdAt: timestamp("created_at").defaultNow()
});
