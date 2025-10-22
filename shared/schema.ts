import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp } from "drizzle-orm/pg-core";
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
  ownerName: text("owner_name").notNull(),
  ownerAvatar: text("owner_avatar"),
  requirementDocUrl: text("requirement_doc_url"),
  githubRepoUrl: text("github_repo_url"),
  demoManualUrl: text("demo_manual_url"),
  installGuideUrl: text("install_guide_url"),
});

export const scenarioViews = pgTable("scenario_views", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  scenarioId: varchar("scenario_id").notNull().references(() => scenarios.id),
  viewedAt: timestamp("viewed_at").notNull().defaultNow(),
});

export const comments = pgTable("comments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  scenarioId: varchar("scenario_id").notNull().references(() => scenarios.id),
  commentText: text("comment_text").notNull(),
  commenterName: text("commenter_name").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertScenarioSchema = createInsertSchema(scenarios).omit({
  id: true,
});

export const insertScenarioViewSchema = createInsertSchema(scenarioViews).omit({
  id: true,
  viewedAt: true,
});

export const insertCommentSchema = createInsertSchema(comments).omit({
  id: true,
  createdAt: true,
});

export type InsertScenario = z.infer<typeof insertScenarioSchema>;
export type Scenario = typeof scenarios.$inferSelect;
export type ScenarioView = typeof scenarioViews.$inferSelect;
export type InsertScenarioView = z.infer<typeof insertScenarioViewSchema>;
export type Comment = typeof comments.$inferSelect;
export type InsertComment = z.infer<typeof insertCommentSchema>;
