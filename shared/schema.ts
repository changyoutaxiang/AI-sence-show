import { sql } from "drizzle-orm";
import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const scenarios = pgTable("scenarios", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  businessProblem: text("business_problem").notNull(),
  solution: text("solution").notNull(),
  technicalDetails: text("technical_details").notNull(),
  impact: text("impact").notNull(),
  category: text("category").notNull(),
  imageUrl: text("image_url").notNull(),
  team: text("team").notNull(),
  timeline: text("timeline").notNull(),
  metrics: text("metrics").array().notNull(),
});

export const insertScenarioSchema = createInsertSchema(scenarios).omit({
  id: true,
});

export type InsertScenario = z.infer<typeof insertScenarioSchema>;
export type Scenario = typeof scenarios.$inferSelect;
