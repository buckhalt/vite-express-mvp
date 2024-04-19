
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const projects = sqliteTable('projects', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
});

export type InsertProject = typeof projects.$inferInsert;
export type SelectProjectßs = typeof projects.$inferSelect;