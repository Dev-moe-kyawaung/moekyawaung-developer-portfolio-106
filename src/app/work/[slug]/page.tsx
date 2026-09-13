import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import { getProject, getProjects } from "@/lib/data";
import { PROFILE } from "@/lib/content";

export const dynamic = "force-dynamic";

type Metric = { label: string; value: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return { title: "Project not found" };
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      title: `${project.title} — Case Study`,
      description: project.summary,
      type: "article",
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  const all = await getProjects();
  const idx = all.findIndex((p) => p.slug === slug);
  const next = all[(idx + 1) % all.length];

  const accent = project.accent || "#7dd3fc";
  const metrics = (project.metrics ?? []) as Metric[];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.title,
    description: project.summary,
    applicationCategory: "MobileApplication",
    operatingSystem: "Android",
    author: { "@type": "Person", name: PROFILE.name },
    keywords: project.tech.join(", "),
  };

  return (
    <article className="pt-24 sm:pt-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <header
        className="cover-art relative"
        style={{ ["--card-accent" as any]: accent }}
      >
        <div className="mx-auto max-w-5xl px-5 py-20 sm:px-8 sm:py-28">
          <Link
            href="/work"
            className="mb-6 inline-flex items-center gap-2 text-sm text-[var(--color-muted)] hover:text-[var(--color-fg)]"
          >
            <span aria-hidden="true">←</span> All work
          </Link>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-white/15 bg-black/30 px-3 py-1 font-mono text-xs uppercase tracking-wider text-white/80 backdrop-blur">
              {project.category}
            </span>
            <span className="font-mono text-xs text-white/60">{project.year}</span>
          </div>
          <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight text-white sm:text-6xl">
            {project.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80">{project.tagline}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            {project.github && (
              <a href={project.github} target="_blank" rel="noreferrer noopener" className="btn btn-primary">
                View source <span aria-hidden="true">↗</span>
              </a>
            )}
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noreferrer noopener" className="btn btn-ghost">
                Live demo
              </a>
            )}
            {project.playstore && (
              <a href={project.playstore} target="_blank" rel="noreferrer noopener" className="btn btn-ghost">
                Google Play
              </a>
            )}
          </div>
        </div>
      </header>

      {/* Metrics */}
      {metrics.length > 0 && (
        <section className="mx-auto max-w-5xl px-5 sm:px-8">
          <div className="-mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {metrics.map((m) => (
              <div key={m.label} className="card p-5 text-center">
                <div
                  className="font-display text-2xl font-semibold sm:text-3xl"
                  style={{ color: accent }}
                >
                  {m.value}
                </div>
                <div className="mt-1 text-xs text-[var(--color-faint)]">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Body */}
      <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr]">
          <div className="space-y-10">
            <ProseBlock title="Overview" body={project.overview} />
            <ProseBlock title="The problem" body={project.problem} />
            <ProseBlock title="Approach" body={project.approach} />
            <ProseBlock title="Architecture" body={project.architecture} />

            <Reveal>
              <div>
                <h2 className="font-display text-xl font-semibold text-[var(--color-fg)]">
                  Key features
                </h2>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {project.features.map((f) => (
                    <li
                      key={f}
                      className="flex gap-2.5 rounded-xl border border-[var(--color-line)] bg-white/[0.02] p-3 text-sm text-[var(--color-fg)]/90"
                    >
                      <span
                        className="mt-1 h-1.5 w-1.5 flex-none rounded-full"
                        style={{ background: accent }}
                        aria-hidden="true"
                      />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {project.outcomes.length > 0 && (
              <Reveal>
                <div>
                  <h2 className="font-display text-xl font-semibold text-[var(--color-fg)]">
                    Outcomes
                  </h2>
                  <ul className="mt-4 space-y-2.5">
                    {project.outcomes.map((o) => (
                      <li key={o} className="flex gap-2.5 text-sm text-[var(--color-muted)]">
                        <span className="mt-0.5 text-[var(--color-accent)]" aria-hidden="true">
                          ✦
                        </span>
                        {o}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-4">
            <div className="card p-6">
              <h3 className="eyebrow mb-4">Project details</h3>
              <Detail k="Role" v={project.role} />
              <Detail k="Year" v={String(project.year)} />
              {project.duration && <Detail k="Duration" v={project.duration} />}
              {project.team && <Detail k="Team" v={project.team} />}
              <Detail k="Category" v={project.category} />
            </div>

            <div className="card p-6">
              <h3 className="eyebrow mb-4">Tech stack</h3>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span key={t} className="chip">
                    {t}
                  </span>
                ))}
              </div>
              {project.stackDetail && (
                <p className="mt-4 border-t border-[var(--color-line-soft)] pt-4 text-xs leading-relaxed text-[var(--color-faint)]">
                  {project.stackDetail}
                </p>
              )}
            </div>
          </aside>
        </div>

        {/* Next project */}
        <Reveal>
          <Link
            href={`/work/${next.slug}`}
            className="card card-hover group mt-16 flex items-center justify-between gap-4 p-6"
            style={{ ["--card-accent" as any]: next.accent }}
          >
            <div>
              <p className="eyebrow">Next case study</p>
              <p className="mt-1 font-display text-xl font-semibold text-[var(--color-fg)]">
                {next.title}
              </p>
            </div>
            <span
              className="text-2xl transition-transform group-hover:translate-x-1"
              style={{ color: next.accent }}
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

function ProseBlock({ title, body }: { title: string; body: string }) {
  return (
    <Reveal>
      <section>
        <h2 className="font-display text-xl font-semibold text-[var(--color-fg)]">
          {title}
        </h2>
        <p className="mt-3 text-base leading-relaxed text-[var(--color-muted)]">
          {body}
        </p>
      </section>
    </Reveal>
  );
}

function Detail({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-[var(--color-line-soft)] py-2.5 last:border-0">
      <span className="text-sm text-[var(--color-faint)]">{k}</span>
      <span className="text-right text-sm font-medium text-[var(--color-fg)]">
        {v}
      </span>
    </div>
  );
}
