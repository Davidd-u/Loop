import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const products = sqliteTable("products", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  condition: text("condition").notNull(),
  estimatedValue: integer("estimated_value").notNull(),
  locationCity: text("location_city").notNull(),
  locationState: text("location_state"),
  locationCountry: text("location_country"),
  desiredItems: text("desired_items"), // JSON stringified array
  images: text("images"), // JSON stringified array
  createdAt: text("created_at").notNull(),
});
