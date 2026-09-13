import { db } from "@/db";
import { projects, posts, messages, events } from "@/db/schema";
import { asc, desc, eq } from "drizzle-orm";
import { ensureSeed } from "@/db/seed";
import type { Project, Post, Message } from "@/db/schema";

export async function getProjects(): Promise<Project[]> {
  await ensureSeed();
  return db.select().from(projects).orderBy(asc(projects.orderIndex));
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const all = await getProjects();
  return all.filter((p) => p.featured);
}

export async function getProject(slug: string): Promise<Project | undefined> {
  await ensureSeed();
  const [row] = await db
    .select()
    .from(projects)
    .where(eq(projects.slug, slug))
    .limit(1);
  return row;
}

export async function getPosts(): Promise<Post[]> {
  await ensureSeed();
  return db.select().from(posts).orderBy(desc(posts.publishedAt));
}

export async function getFeaturedPosts(): Promise<Post[]> {
  const all = await getPosts();
  return all.filter((p) => p.featured);
}

export async function getPost(slug: string): Promise<Post | undefined> {
  await ensureSeed();
  const [row] = await db
    .select()
    .from(posts)
    .where(eq(posts.slug, slug))
    .limit(1);
  return row;
}

export type NewMessage = Omit<Message, "id" | "createdAt">;

export async function createMessage(input: NewMessage): Promise<Message> {
  const [row] = await db.insert(messages).values(input).returning();
  return row;
}

export async function trackEvent(input: {
  name: string;
  path?: string;
  meta?: string;
}): Promise<void> {
  await db.insert(events).values({
    name: input.name,
    path: input.path ?? "",
    meta: input.meta ?? "",
  });
}
