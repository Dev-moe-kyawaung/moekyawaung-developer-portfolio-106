import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import ProjectCard from "@/components/ProjectCard";
import { getProjects } from "@/lib/data";
import { PROFILE } from "@/lib/content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Work",
  description: `Selected Android engineering case studies by ${PROFILE.name} — realtime systems, offline-first architecture, and Compose design systems.`,
  alternates: { canonical: "/work" },
};

export default async function WorkPage() {
  const projects = await getProjects();

  return (
    <div className="mx-auto max-w-6xl px-5 pb-24 pt-32 sm:px-8 sm:pt-40">
      <Reveal>
        <SectionHeading
          eyebrow="Portfolio"
          title="Engineered, not just built."
          description="A selection of production Android systems. Each case study below goes deep on architecture, performance, and the decisions that mattered."
        />
      </Reveal>

      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project, i) => (
          <Reveal key={project.slug} delay={(i % 2) * 90}>
            <ProjectCard project={project} index={i + 1} />
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div className="mt-16 flex flex-col items-center gap-4 rounded-2xl border border-[var(--color-line)] bg-white/[0.02] p-8 text-center">
          <p className="text-sm text-[var(--color-muted)]">
            Looking for architecture details, metrics, or a specific system?
          </p>
          <Link href="/#contact" className="btn btn-primary">
            Start a conversation
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </Reveal>
    </div>
  );
}
