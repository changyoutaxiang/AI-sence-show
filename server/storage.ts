import { scenarios, scenarioViews, comments, type Scenario, type InsertScenario, type InsertScenarioView, type Comment, type InsertComment } from "@shared/schema";
import { db } from "./db";
import { eq, sql, desc } from "drizzle-orm";

export interface IStorage {
  getAllScenarios(): Promise<Scenario[]>;
  getScenarioById(id: string): Promise<Scenario | undefined>;
  createScenario(scenario: InsertScenario): Promise<Scenario>;
  trackView(view: InsertScenarioView): Promise<void>;
  getAnalytics(): Promise<Array<{ scenarioId: string; viewCount: number; scenario: Scenario }>>;
  getCommentsByScenarioId(scenarioId: string): Promise<Comment[]>;
  createComment(comment: InsertComment): Promise<Comment>;
}

export class DatabaseStorage implements IStorage {
  async getAllScenarios(): Promise<Scenario[]> {
    return await db.select().from(scenarios);
  }

  async getScenarioById(id: string): Promise<Scenario | undefined> {
    const [scenario] = await db.select().from(scenarios).where(eq(scenarios.id, id));
    return scenario || undefined;
  }

  async createScenario(insertScenario: InsertScenario): Promise<Scenario> {
    const [scenario] = await db
      .insert(scenarios)
      .values(insertScenario)
      .returning();
    return scenario;
  }

  async trackView(view: InsertScenarioView): Promise<void> {
    await db.insert(scenarioViews).values(view);
  }

  async getAnalytics(): Promise<Array<{ scenarioId: string; viewCount: number; scenario: Scenario }>> {
    const result = await db
      .select({
        scenarioId: scenarioViews.scenarioId,
        viewCount: sql<number>`count(*)::int`,
        scenario: scenarios,
      })
      .from(scenarioViews)
      .innerJoin(scenarios, eq(scenarioViews.scenarioId, scenarios.id))
      .groupBy(scenarioViews.scenarioId, scenarios.id)
      .orderBy(desc(sql`count(*)`));
    
    return result;
  }

  async getCommentsByScenarioId(scenarioId: string): Promise<Comment[]> {
    return await db
      .select()
      .from(comments)
      .where(eq(comments.scenarioId, scenarioId))
      .orderBy(desc(comments.createdAt));
  }

  async createComment(insertComment: InsertComment): Promise<Comment> {
    const [comment] = await db
      .insert(comments)
      .values(insertComment)
      .returning();
    return comment;
  }
}

export const storage = new DatabaseStorage();
