import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import Markdown from "@/components/Markdown";
import { getPost, getPosts } from "@/lib/data";
import { PROFILE } from "@/lib/content";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Article not found" };
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/writing/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const all = await getPosts();
  const idx = all.findIndex((p) => p.slug === slug);
  const next = all[(idx + 1) % all.length];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt?.toISOString?.() ?? new Date().toISOString(),
    author: { "@type": "Person", name: PROFILE.name },
    keywords: post.tags.join(", "),
  };

  return (
    <article className="pt-28 sm:pt-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <Link
          href="/writing"
          className="mb-8 inline-flex items-center gap-2 text-sm text-[var(--color-muted)] hover:text-[var(--color-fg)]"
        >
          <span aria-hidden="true">←</span> All writing
        </Link>

        <Reveal>
          <div className="flex flex-wrap items-center gap-3 text-xs text-[var(--color-faint)]">
            <span className="rounded-full border border-[var(--color-line)] px-2.5 py-1 font-mono uppercase tracking-wider text-[var(--color-muted)]">
              {post.category}
            </span>
            <span>{post.readingMinutes} min read</span>
          </div>
          <h1 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-[var(--color-fg)] sm:text-5xl">
            {post.title}
          </h1>
          <p className="mt-4 text-lg text-[var(--color-muted)]">{post.excerpt}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {post.tags.map((t) => (
              <span key={t} className="font-mono text-xs text-[var(--color-faint)]">
                #{t}
              </span>
            ))}
          </div>
          <div className="hairline my-8" />
        </Reveal>

        <Reveal>
          <div className="text-[1.02rem]">
            <Markdown content={post.content} />
          </div>
        </Reveal>

        <div className="hairline my-12" />
        <Reveal>
          <Link
            href={`/writing/${next.slug}`}
            className="card card-hover group flex items-center justify-between gap-4 p-6"
          >
            <div>
              <p className="eyebrow">Next article</p>
              <p className="mt-1 font-display text-lg font-semibold text-[var(--color-fg)]">
                {next.title}
              </p>
            </div>
            <span
              className="text-2xl text-[var(--color-brand)] transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            >
              →
            </span>
          </Link>
        </Reveal>
      </div>
    </article>
  );
}
