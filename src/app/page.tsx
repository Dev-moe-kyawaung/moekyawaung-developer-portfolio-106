import Link from "next/link";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import ProjectCard from "@/components/ProjectCard";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import WritingList from "@/components/WritingList";
import ContactForm from "@/components/ContactForm";
import StickyCTA from "@/components/StickyCTA";
import LeadershipPillars from "@/components/LeadershipPillars";
import DecisionLog from "@/components/DecisionLog";
import { EngineeringScorecard, Collaboration } from "@/components/Scorecard";
import { getFeaturedProjects, getFeaturedPosts, getProjects } from "@/lib/data";
import { PROFILE, skillGroups, socials, recruiterFacts } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [projects, posts, allProjects] = await Promise.all([
    getFeaturedProjects(),
    getFeaturedPosts(),
    getProjects(),
  ]);
  const caseStudies = allProjects.slice(0, 3);

  return (
    <>
      <Hero />
      <Marquee />

      {/* ───────── PROJECTS (first CTA destination) ───────── */}
      <section id="work" className="mx-auto max-w-6xl px-5 pt-24 sm:px-8 sm:pt-28">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              eyebrow="01 — Projects"
              title="Shipped, measured, maintained."
              description="Production Android systems with the numbers attached. Each one links to a full engineering case study."
            />
            <Link href="/work" className="btn btn-ghost mb-10">
              All projects <span aria-hidden="true">→</span>
            </Link>
          </div>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project, i) => (
            <Reveal key={project.slug} delay={(i % 2) * 90}>
              <ProjectCard project={project} index={i + 1} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ───────── CASE STUDIES (second CTA destination) ───────── */}
      <section
        id="case-studies"
        className="mx-auto max-w-6xl px-5 pt-24 sm:px-8 sm:pt-28"
      >
        <Reveal>
          <SectionHeading
            eyebrow="02 — Case Studies"
            title="The reasoning behind the results."
            description="Long-form write-ups: the problem, the options weighed, the architecture chosen, and what it measurably changed."
          />
        </Reveal>
        <div className="space-y-4">
          {caseStudies.map((p, i) => (
            <Reveal key={p.slug} delay={i * 70}>
              <Link
                href={`/work/${p.slug}`}
                className="card card-hover group grid gap-5 p-6 sm:grid-cols-[auto_1fr_auto] sm:items-center"
                style={{ ["--card-accent" as any]: p.accent }}
              >
                <span
                  className="font-mono text-xs"
                  style={{ color: p.accent }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display text-xl font-semibold text-[var(--color-fg)]">
                    {p.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-[var(--color-muted)]">
                    {p.summary}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5">
                    {(p.metrics as { label: string; value: string }[])
                      .slice(0, 3)
                      .map((m) => (
                        <span key={m.label} className="text-xs">
                          <span
                            className="font-display font-semibold"
                            style={{ color: p.accent }}
                          >
                            {m.value}
                          </span>{" "}
                          <span className="text-[var(--color-faint)]">
                            {m.label}
                          </span>
                        </span>
                      ))}
                  </div>
                </div>
                <span
                  className="hidden text-sm font-medium transition-transform group-hover:translate-x-1 sm:inline-flex sm:items-center sm:gap-1"
                  style={{ color: p.accent }}
                >
                  Read <span aria-hidden="true">→</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ───────── LEADERSHIP ───────── */}
      <section
        id="leadership"
        className="mx-auto max-w-6xl px-5 pt-24 sm:px-8 sm:pt-28"
      >
        <Reveal>
          <SectionHeading
            eyebrow="03 — Technical Leadership"
            title="I lead through decisions, not job titles."
            description="Architecture, modularization, release quality, observability, CI/CD, and the people work that keeps all of it alive after I move on."
          />
        </Reveal>
        <LeadershipPillars />

        {/* Decision records */}
        <div className="mt-20">
          <Reveal>
            <SectionHeading
              eyebrow="Architecture Decision Records"
              title="Decisions, with the trade-offs shown."
              description="A sample from the ADR log I maintain. Context, options weighed, the call I made, what it cost, and what it returned."
            />
          </Reveal>
          <Reveal>
            <DecisionLog />
          </Reveal>
        </div>

        {/* Scorecard */}
        <div className="mt-20 grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:items-start">
          <Reveal>
            <div className="lg:sticky lg:top-24">
              <div className="eyebrow mb-3">
                <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-brand)] align-middle" />
                Release quality & observability
              </div>
              <h3 className="font-display text-3xl font-semibold tracking-tight text-[var(--color-fg)]">
                Quality is a system,
                <br />
                not a sprint.
              </h3>
              <p className="mt-4 text-[var(--color-muted)]">
                These are the numbers my teams hold week to week. Each one has an
                owner, an alert, and a gate in the pipeline — so regressions stop
                before users feel them.
              </p>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <EngineeringScorecard />
          </Reveal>
        </div>

        {/* Collaboration */}
        <div className="mt-20">
          <Reveal>
            <SectionHeading
              eyebrow="Cross-functional work"
              title="Shipping is a team sport."
              description="How I work with the people on the other side of the contract."
            />
          </Reveal>
          <Collaboration />
        </div>
      </section>

      {/* ───────── EXPERIENCE ───────── */}
      <section
        id="experience"
        className="mx-auto max-w-4xl px-5 pt-24 sm:px-8 sm:pt-28"
      >
        <Reveal>
          <SectionHeading
            eyebrow="04 — Career"
            title="Experience timeline"
            description="From first shipped app to leading Android architecture at scale."
          />
        </Reveal>
        <Reveal>
          <ExperienceTimeline />
        </Reveal>
      </section>

      {/* ───────── ABOUT + SKILLS ───────── */}
      <section id="about" className="mx-auto max-w-6xl px-5 pt-24 sm:px-8 sm:pt-28">
        <Reveal>
          <SectionHeading eyebrow="05 — About" title="Engineer by craft, builder by nature." />
        </Reveal>
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <div className="space-y-5 text-base leading-relaxed text-[var(--color-muted)]">
              <p>
                I&apos;m a senior Android engineer who lives in the details:
                startup latency, frame budgets, sync conflicts, and the kind of
                accessibility that&apos;s invisible when it works. I design
                native apps that feel inevitable — fast, calm, and reliable on
                the worst networks.
              </p>
              <p>
                Most of my value now comes from{" "}
                <span className="text-[var(--color-fg)]">
                  decisions and systems
                </span>
                : choosing module boundaries teams can actually own, making the
                pipeline refuse bad releases, and mentoring engineers until the
                next architecture call doesn&apos;t need me in the room.
              </p>
              <p className="font-display text-lg text-[var(--color-fg)]">
                “{PROFILE.philosophy}”
              </p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="card p-6">
              <p className="eyebrow mb-4">At a glance</p>
              {recruiterFacts.map((f) => (
                <div
                  key={f.k}
                  className="flex items-start justify-between gap-4 border-b border-[var(--color-line-soft)] py-2.5 last:border-0"
                >
                  <span className="text-sm text-[var(--color-faint)]">{f.k}</span>
                  <span className="text-right text-sm font-medium text-[var(--color-fg)]">
                    {f.v}
                  </span>
                </div>
              ))}
              <Link href="/resume" className="btn btn-ghost mt-5 w-full text-sm">
                View full résumé
              </Link>
            </div>
          </Reveal>
        </div>

        <div id="skills" className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, i) => (
            <Reveal key={group.name} delay={(i % 3) * 60}>
              <div className="card h-full p-6">
                <div className="mb-4 flex items-center gap-3">
                  <span className="text-xl" aria-hidden="true">{group.icon}</span>
                  <h3 className="font-display text-base font-semibold text-[var(--color-fg)]">
                    {group.name}
                  </h3>
                </div>
                <ul className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li key={item} className="chip">{item}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ───────── WRITING ───────── */}
      <section id="writing" className="mx-auto max-w-6xl px-5 pt-24 sm:px-8 sm:pt-28">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              eyebrow="06 — Writing"
              title="Engineering notes"
              description="How I think about architecture, performance, and durable Android."
            />
            <Link href="/writing" className="btn btn-ghost mb-10">
              All articles <span aria-hidden="true">→</span>
            </Link>
          </div>
        </Reveal>
        <Reveal>
          <WritingList posts={posts} />
        </Reveal>
      </section>

      {/* ───────── CONTACT (third CTA destination) ───────── */}
      <section id="contact" className="mx-auto max-w-6xl px-5 pb-16 pt-24 sm:px-8 sm:pt-28">
        <Reveal>
          <div className="card relative overflow-hidden p-7 sm:p-11">
            <div
              className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(167,139,250,0.18),transparent_70%)] blur-2xl"
              aria-hidden="true"
            />
            <div className="grid gap-10 lg:grid-cols-2">
              <div>
                <div className="eyebrow mb-3">07 — Contact</div>
                <h2 className="font-display text-3xl font-semibold tracking-tight text-[var(--color-fg)] sm:text-4xl">
                  Hiring for Android?
                  <br />
                  Let&apos;s book a conversation.
                </h2>
                <p className="mt-4 max-w-md text-[var(--color-muted)]">
                  {PROFILE.availability}. Send the role and the problem
                  you&apos;re solving — I&apos;ll reply with honest thoughts on
                  fit, usually within 24 hours.
                </p>

                <div className="mt-7 space-y-3">
                  <a
                    href={`mailto:${PROFILE.email}`}
                    className="flex items-center gap-3 text-sm text-[var(--color-fg)] hover:text-[var(--color-brand)]"
                  >
                    <span className="grid h-9 w-9 place-items-center rounded-lg border border-[var(--color-line)]">✉</span>
                    {PROFILE.email}
                  </a>
                  <a
                    href={`tel:${PROFILE.phoneHref}`}
                    className="flex items-center gap-3 text-sm text-[var(--color-fg)] hover:text-[var(--color-brand)]"
                  >
                    <span className="grid h-9 w-9 place-items-center rounded-lg border border-[var(--color-line)]">☎</span>
                    {PROFILE.phone}
                  </a>
                  <Link
                    href="/resume"
                    className="flex items-center gap-3 text-sm text-[var(--color-fg)] hover:text-[var(--color-brand)]"
                  >
                    <span className="grid h-9 w-9 place-items-center rounded-lg border border-[var(--color-line)]">⇩</span>
                    Download résumé (PDF)
                  </Link>
                </div>

                <div className="mt-7 flex flex-wrap gap-2">
                  {socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="chip"
                    >
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>
              <ContactForm />
            </div>
          </div>
        </Reveal>
      </section>

      <StickyCTA />
    </>
  );
}
