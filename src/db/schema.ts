import {
  pgTable,
  serial,
  text,
  integer,
  boolean,
  timestamp,
  jsonb,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  tagline: text("tagline").notNull(),
  category: text("category").notNull(),
  year: integer("year").notNull(),
  role: text("role").notNull(),
  summary: text("summary").notNull(),
  overview: text("overview").notNull(),
  problem: text("problem").notNull(),
  approach: text("approach").notNull(),
  architecture: text("architecture").notNull(),
  features: text("features").array().notNull().default(sql`'{}'::text[]`),
  outcomes: text("outcomes").array().notNull().default(sql`'{}'::text[]`),
  metrics: jsonb("metrics").notNull().default(sql`'[]'::jsonb`),
  tech: text("tech").array().notNull().default(sql`'{}'::text[]`),
  stackDetail: text("stack_detail").notNull().default(""),
  duration: text("duration").notNull().default(""),
  team: text("team").notNull().default(""),
  github: text("github").notNull().default(""),
  demo: text("demo").notNull().default(""),
  playstore: text("playstore").notNull().default(""),
  cover: text("cover").notNull().default(""),
  gallery: text("gallery").array().notNull().default(sql`'{}'::text[]`),
  accent: text("accent").notNull().default("#7dd3fc"),
  featured: boolean("featured").notNull().default(false),
  orderIndex: integer("order_index").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  tags: text("tags").array().notNull().default(sql`'{}'::text[]`),
  category: text("category").notNull().default("Engineering"),
  cover: text("cover").notNull().default(""),
  readingMinutes: integer("reading_minutes").notNull().default(5),
  featured: boolean("featured").notNull().default(false),
  publishedAt: timestamp("published_at").notNull().defaultNow(),
  orderIndex: integer("order_index").notNull().default(0),
});

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull().default(""),
  message: text("message").notNull(),
  company: text("company").notNull().default(""),
  roleType: text("role_type").notNull().default(""),
  timeline: text("timeline").notNull().default(""),
  source: text("source").notNull().default("site"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

/** Lightweight first-party conversion analytics (CTA clicks, section reach). */
export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  path: text("path").notNull().default(""),
  meta: text("meta").notNull().default(""),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type Project = typeof projects.$inferSelect;
export type NewProject = typeof projects.$inferInsert;
export type Post = typeof posts.$inferSelect;
export type NewPost = typeof posts.$inferInsert;
export type Message = typeof messages.$inferSelect;
export type Event = typeof events.$inferSelect;
