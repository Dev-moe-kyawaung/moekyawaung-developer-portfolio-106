import type { Metadata } from "next";
import PrintButton from "@/components/PrintButton";
import {
  PROFILE,
  experiences,
  skillGroups,
  impactStats,
  projectSeed,
  scorecard,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "Résumé",
  description: `Résumé of ${PROFILE.name} — Senior Android Engineer with ${PROFILE.years} years building Kotlin and Jetpack Compose applications at scale.`,
  alternates: { canonical: "/resume" },
};

export default function ResumePage() {
  return (
    <div className="mx-auto max-w-3xl px-5 pb-24 pt-28 sm:px-8 sm:pt-32">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 print:hidden">
        <a
          href="/"
          className="text-sm text-[var(--color-muted)] hover:text-[var(--color-fg)]"
        >
          <span aria-hidden="true">←</span> Back to portfolio
        </a>
        <PrintButton />
      </div>

      <article className="resume-sheet card p-7 sm:p-10">
        {/* Header */}
        <header>
          <h1 className="font-display text-3xl font-semibold tracking-tight text-[var(--color-fg)]">
            {PROFILE.name}
          </h1>
          <p className="mt-1 font-display text-lg text-[var(--color-brand)]">
            Senior Android Engineer · {PROFILE.years} years
          </p>
          <p className="mt-2.5 text-sm text-[var(--color-muted)]">
            {PROFILE.email} · {PROFILE.phone} · {PROFILE.location}
          </p>
          <p className="text-sm text-[var(--color-muted)]">
            github.com/{PROFILE.handle} · {PROFILE.workSetup}
          </p>
        </header>

        <Rule />

        <Section title="Profile">
          <p className="text-sm leading-relaxed text-[var(--color-muted)]">
            Senior Android engineer specialising in Kotlin, Jetpack Compose and
            Clean Architecture. I lead architecture decisions, modularization,
            and release-quality programmes for offline-first and realtime mobile
            systems — and mentor the engineers who maintain them.
          </p>
          <ul className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {impactStats.map((s) => (
              <li
                key={s.label}
                className="rounded-lg border border-[var(--color-line)] px-3 py-2"
              >
                <span className="block font-display text-base font-semibold text-[var(--color-fg)]">
                  {s.value}
                </span>
                <span className="text-[0.65rem] leading-tight text-[var(--color-faint)]">
                  {s.label}
                </span>
              </li>
            ))}
          </ul>
        </Section>

        <Rule />

        <Section title="Experience">
          <div className="space-y-5">
            {experiences.map((e) => (
              <div key={e.company}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-display text-base font-semibold text-[var(--color-fg)]">
                    {e.role} — {e.company}
                  </h3>
                  <span className="font-mono text-xs text-[var(--color-faint)]">
                    {e.period}
                  </span>
                </div>
                <ul className="mt-1.5 space-y-1">
                  {e.highlights.map((h) => (
                    <li
                      key={h}
                      className="flex gap-2 text-sm text-[var(--color-muted)]"
                    >
                      <span aria-hidden="true">·</span>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        <Rule />

        <Section title="Selected projects">
          <ul className="space-y-2">
            {projectSeed.slice(0, 4).map((p) => (
              <li key={p.slug} className="text-sm">
                <span className="font-medium text-[var(--color-fg)]">
                  {p.title}
                </span>
                <span className="text-[var(--color-muted)]"> — {p.tagline}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Rule />

        <Section title="Engineering scorecard">
          <ul className="grid grid-cols-2 gap-x-6 gap-y-1.5 sm:grid-cols-2">
            {scorecard.map((s) => (
              <li
                key={s.metric}
                className="flex justify-between gap-3 text-sm text-[var(--color-muted)]"
              >
                <span>{s.metric}</span>
                <span className="font-medium text-[var(--color-fg)]">
                  {s.value}
                </span>
              </li>
            ))}
          </ul>
        </Section>

        <Rule />

        <Section title="Skills">
          <div className="space-y-2">
            {skillGroups.map((g) => (
              <p key={g.name} className="text-sm">
                <span className="font-medium text-[var(--color-fg)]">
                  {g.name}:
                </span>{" "}
                <span className="text-[var(--color-muted)]">
                  {g.items.join(" · ")}
                </span>
              </p>
            ))}
          </div>
        </Section>

        <Rule />

        <Section title="Credentials">
          <p className="text-sm text-[var(--color-muted)]">
            {PROFILE.certs}. Languages: Burmese (native), English
            (professional).
          </p>
        </Section>
      </article>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-5">
      <h2 className="eyebrow mb-2.5">{title}</h2>
      {children}
    </section>
  );
}

function Rule() {
  return <div className="hairline mt-5" />;
}
