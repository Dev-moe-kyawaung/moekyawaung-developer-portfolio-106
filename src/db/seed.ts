import { db } from "./index";
import { projects, posts } from "./schema";
import { projectSeed, postSeed } from "./seed-data";

let seedPromise: Promise<void> | null = null;

async function runSeed() {
  for (const p of projectSeed) {
    await db
      .insert(projects)
      .values(p)
      .onConflictDoUpdate({ target: projects.slug, set: { ...p } });
  }
  for (const p of postSeed) {
    await db
      .insert(posts)
      .values(p)
      .onConflictDoUpdate({ target: posts.slug, set: { ...p } });
  }
}

export function ensureSeed(): Promise<void> {
  if (!seedPromise) {
    seedPromise = runSeed().catch((err) => {
      seedPromise = null;
      throw err;
    });
  }
  return seedPromise;
}

export async function seedDatabase() {
  await runSeed();
}
