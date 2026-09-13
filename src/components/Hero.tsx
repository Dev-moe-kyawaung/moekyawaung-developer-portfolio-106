"use client";

import { useEffect, useRef, useState } from "react";
import { PROFILE, impactStats, idealRoles } from "@/lib/content";
import { track } from "@/lib/track";

const ROTATING = [
  "realtime systems",
  "offline-first apps",
  "design systems",
  "on-device AI",
];

export default function Hero() {
  const [text, setText] = useState("");
  const [idx, setIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const reduce = useRef(false);

  useEffect(() => {
    reduce.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce.current) {
      setText(ROTATING[0]);
      return;
    }
    const current = ROTATING[idx % ROTATING.length];
    let t: ReturnType<typeof setTimeout>;
    if (!deleting && text === current) {
      t = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && text === "") {
      setDeleting(false);
      setIdx((p) => (p + 1) % ROTATING.length);
    } else {
      const next = deleting
        ? current.slice(0, text.length - 1)
        : current.slice(0, text.length + 1);
      t = setTimeout(() => setText(next), deleting ? 30 : 70);
    }
    return () => clearTimeout(t);
  }, [text, deleting, idx]);

  return (
    <section id="top" className="mx-auto max-w-6xl px-5 pb-8 pt-28 sm:px-8 sm:pt-36">
      <div className="grid items-start gap-12 lg:grid-cols-[1.25fr_0.75fr]">
        <div>
          {/* Availability — recruiters scan for this first */}
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-accent)]/35 bg-[var(--color-accent)]/10 px-3.5 py-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--color-accent)] opacity-70 motion-safe:animate-pulse-ring" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-accent)]" />
              </span>
              <span className="font-mono text-xs font-medium text-[var(--color-accent)]">
                {PROFILE.availability}
              </span>
            </span>
            <span className="font-mono text-xs text-[var(--color-faint)]">
              {PROFILE.workSetup}
            </span>
          </div>

          {/* ROLE + YEARS + SPECIALIZATION — the five-second answer */}
          <h1 className="font-display text-[2.5rem] font-semibold leading-[1.05] tracking-tight sm:text-[3.5rem] md:text-[4rem]">
            <span className="block text-[var(--color-fg)]">
              Senior Android Engineer
            </span>
            <span className="mt-1 block text-[var(--color-muted)]">
              <span className="text-gradient">{PROFILE.years} years</span>{" "}
              building{" "}
              <span className="whitespace-nowrap text-[var(--color-fg)]">
                {text}
                <span
                  className="ml-0.5 inline-block h-[0.85em] w-[3px] translate-y-[0.1em] bg-[var(--color-brand)] motion-safe:animate-[caret_1.05s_steps(1)_infinite]"
                  aria-hidden="true"
                />
              </span>
            </span>
          </h1>
          <span className="sr-only">
            Senior Android Engineer with {PROFILE.years} years of experience
            building realtime systems, offline-first apps, design systems, and
            on-device AI in Kotlin and Jetpack Compose.
          </span>

          {/* BUSINESS IMPACT — one line, plain language */}
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-[var(--color-muted)]">
            Kotlin · Jetpack Compose · Clean Architecture.{" "}
            <span className="text-[var(--color-fg)]">
              I ship native Android that stays fast and stable at scale
            </span>{" "}
            — 500k monthly users, 99.2% crash-free, 40% faster cold starts.
          </p>

          {/* THREE PRIMARY CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#work"
              className="btn btn-primary"
              onClick={() => track("cta_view_projects", "hero")}
            >
              View Projects
              <span aria-hidden="true">→</span>
            </a>
            <a
              href="#case-studies"
              className="btn btn-ghost"
              onClick={() => track("cta_read_case_studies", "hero")}
            >
              Read Case Studies
            </a>
            <a
              href="#contact"
              className="btn btn-ghost"
              onClick={() => track("cta_contact", "hero")}
            >
              Contact
            </a>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[var(--color-faint)]">
            <a
              href="/resume"
              className="underline decoration-[var(--color-line)] underline-offset-4 transition-colors hover:text-[var(--color-fg)]"
              onClick={() => track("cta_resume", "hero")}
            >
              Download résumé (PDF)
            </a>
            <span aria-hidden="true">·</span>
            <a
              href={`mailto:${PROFILE.email}`}
              className="underline decoration-[var(--color-line)] underline-offset-4 transition-colors hover:text-[var(--color-fg)]"
              onClick={() => track("cta_email", "hero")}
            >
              {PROFILE.email}
            </a>
          </div>

          {/* IMPACT NUMBERS — above the fold */}
          <dl className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {impactStats.map((s) => (
              <div key={s.label} className="card px-4 py-3.5">
                <dt className="font-display text-2xl font-semibold text-[var(--color-fg)]">
                  {s.value}
                </dt>
                <dd className="mt-1 text-[0.7rem] leading-snug text-[var(--color-faint)]">
                  {s.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Recruiter snapshot card */}
        <aside
          className="card relative overflow-hidden p-5"
          aria-label="Candidate snapshot"
        >
          <div
            className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(125,211,252,0.16),transparent_70%)] blur-2xl"
            aria-hidden="true"
          />
          <div className="flex items-center gap-3.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={PROFILE.avatar}
              alt={`Portrait of ${PROFILE.name}`}
              width={60}
              height={60}
              className="h-15 w-15 flex-none rounded-xl object-cover ring-1 ring-[var(--color-line)]"
              style={{ height: 60, width: 60 }}
              loading="eager"
              decoding="async"
            />
            <div className="min-w-0">
              <p className="font-display text-base font-semibold text-[var(--color-fg)]">
                {PROFILE.name}
              </p>
              <p className="truncate font-mono text-xs text-[var(--color-faint)]">
                @{PROFILE.handle}
              </p>
              <p className="mt-0.5 text-xs text-[var(--color-muted)]">
                {PROFILE.location}
              </p>
            </div>
          </div>

          <div className="hairline my-4" />

          <p className="eyebrow mb-2.5">Open to</p>
          <ul className="flex flex-wrap gap-1.5">
            {idealRoles.map((r) => (
              <li key={r} className="chip text-[0.72rem]">
                {r}
              </li>
            ))}
          </ul>

          <div className="hairline my-4" />

          <a
            href="#contact"
            className="btn btn-primary w-full text-sm"
            onClick={() => track("cta_request_interview", "snapshot")}
          >
            Request an interview
          </a>
          <p className="mt-2.5 text-center text-[0.7rem] text-[var(--color-faint)]">
            Typically replies within 24 hours
          </p>
        </aside>
      </div>
    </section>
  );
}
