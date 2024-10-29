import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';

const connectionString = "postgresql://diarybotneondb_owner:k1ACUnwmYe0z@ep-frosty-mountain-a8an45qk.eastus2.azure.neon.tech/diarybotneondb?sslmode=require";

export const db = createClient({
  url: connectionString,
});

// Define your database schema
export const diaryEntries = pgTable('diary_entries', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull(),
  content: text('content').notNull(),
  mood: text('mood').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const notes = pgTable('notes', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const finances = pgTable('finances', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull(),
  amount: text('amount').notNull(),
  type: text('type').notNull(),
  category: text('category').notNull(),
  description: text('description'),
  createdAt: timestamp('created_at').defaultNow(),
});