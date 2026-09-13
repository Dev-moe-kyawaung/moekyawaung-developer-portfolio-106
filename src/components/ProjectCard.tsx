import Link from "next/link";
import type { Project } from "@/db/schema";

export default function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index?: number;
}) {
  const accent = project.accent || "#7dd3fc";
  return (
    <Link
      href={`/work/${project.slug}`}
      className="card card-hover group relative flex flex-col overflow-hidden"
      style={{ ["--card-accent" as any]: accent }}
    >
      <div
        className="cover-art relative h-44 w-full sm:h-52"
        style={{ ["--card-accent" as any]: accent }}
      >
        <div className="absolute left-4 top-4 z-10 flex items-center gap-2">
          <span
            className="rounded-full border border-white/15 bg-black/30 px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-wider text-white/80 backdrop-blur"
          >
            {project.category}
          </span>
        </div>
        <span className="absolute right-4 top-4 z-10 font-mono text-xs text-white/60">
          {String(index ?? project.year).padStart(4, "0").slice(0, 4)}
        </span>
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="font-display text-2xl font-semibold text-white drop-shadow">
            {project.title}
          </h3>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-sm leading-relaxed text-[var(--color-muted)]">
          {project.tagline}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tech.slice(0, 4).map((t) => (
            <span
              key={t}
              className="rounded-md border border-[var(--color-line)] bg-white/[0.02] px-2 py-0.5 font-mono text-[0.68rem] text-[var(--color-faint)]"
            >
              {t}
            </span>
          ))}
          {project.tech.length > 4 && (
            <span className="rounded-md px-2 py-0.5 font-mono text-[0.68rem] text-[var(--color-faint)]">
              +{project.tech.length - 4}
            </span>
          )}
        </div>

        <div className="mt-auto flex items-center justify-between pt-5">
          <span className="font-mono text-xs text-[var(--color-faint)]">
            {project.role}
          </span>
          <span
            className="inline-flex items-center gap-1 text-sm font-medium transition-transform group-hover:translate-x-1"
            style={{ color: accent }}
          >
            Case study
            <span aria-hidden="true">→</span>
          </span>
        </div>
      </div>
    </Link>
  );
}
