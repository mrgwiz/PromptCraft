import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Template table to store prompt templates
export const templates = pgTable("templates", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  content: text("content").notNull(),
  tags: text("tags").array().notNull(),
  created_at: text("created_at").notNull().default("now()"),
});

export const insertTemplateSchema = createInsertSchema(templates).pick({
  title: true,
  description: true,
  content: true,
  tags: true,
});

// Prompt history table to track user prompts and responses
export const promptHistory = pgTable("prompt_history", {
  id: serial("id").primaryKey(),
  model: text("model").notNull(),
  prompt: text("prompt").notNull(),
  response: text("response").notNull(),
  metadata: jsonb("metadata"),
  created_at: text("created_at").notNull().default("now()"),
});

export const insertPromptHistorySchema = createInsertSchema(promptHistory).pick({
  model: true,
  prompt: true,
  response: true,
  metadata: true,
});

// User table (from existing schema)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertTemplate = z.infer<typeof insertTemplateSchema>;
export type Template = typeof templates.$inferSelect;

export type InsertPromptHistory = z.infer<typeof insertPromptHistorySchema>;
export type PromptHistory = typeof promptHistory.$inferSelect;
