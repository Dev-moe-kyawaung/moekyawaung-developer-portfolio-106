import Link from "next/link";
import type { Post } from "@/db/schema";

export default function WritingList({ posts }: { posts: Post[] }) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {posts.map((post, i) => {
        const accent =
          ["#7dd3fc", "#a78bfa", "#34d399", "#fbbf24"][i % 4];
        return (
          <Link
            key={post.slug}
            href={`/writing/${post.slug}`}
            className="card card-hover group flex flex-col p-6"
            style={{ ["--card-accent" as any]: accent }}
          >
            <div className="flex items-center justify-between">
              <span
                className="rounded-full border border-[var(--color-line)] px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-wider text-[var(--color-muted)]"
              >
                {post.category}
              </span>
              <span className="font-mono text-xs text-[var(--color-faint)]">
                {post.readingMinutes} min read
              </span>
            </div>

            <h3 className="mt-4 font-display text-xl font-semibold leading-snug text-[var(--color-fg)] transition-colors group-hover:text-white">
              {post.title}
            </h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--color-muted)]">
              {post.excerpt}
            </p>

            <div className="mt-5 flex items-center justify-between">
              <div className="flex flex-wrap gap-1.5">
                {post.tags.slice(0, 3).map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[0.68rem] text-[var(--color-faint)]"
                  >
                    #{t}
                  </span>
                ))}
              </div>
              <span
                className="inline-flex items-center gap-1 text-sm font-medium transition-transform group-hover:translate-x-1"
                style={{ color: accent }}
              >
                Read
                <span aria-hidden="true">→</span>
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
