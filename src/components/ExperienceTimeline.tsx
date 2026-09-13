import { experiences } from "@/lib/content";

export default function ExperienceTimeline() {
  return (
    <ol className="timeline-line relative space-y-10 pl-9">
      {experiences.map((exp, i) => (
        <li key={exp.company} className="relative">
          <span
            className={`absolute -left-[33px] top-1 grid h-6 w-6 place-items-center rounded-full border ${
              exp.current
                ? "border-[var(--color-brand)] bg-[var(--color-brand)]/15"
                : "border-[var(--color-line)] bg-[var(--color-surface)]"
            }`}
          >
            <span
              className={`h-2 w-2 rounded-full ${
                exp.current ? "bg-[var(--color-brand)]" : "bg-[var(--color-faint)]"
              }`}
            />
          </span>

          <div className="card p-6 transition-colors duration-300 hover:border-[var(--color-line)]">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="font-display text-xl font-semibold text-[var(--color-fg)]">
                  {exp.role}
                </h3>
                <p className="mt-0.5 text-sm text-[var(--color-muted)]">
                  {exp.company}
                </p>
              </div>
              <div className="text-right">
                <p className="font-mono text-xs text-[var(--color-brand)]">
                  {exp.period}
                </p>
                <p className="mt-0.5 text-xs text-[var(--color-faint)]">
                  {exp.location}
                </p>
              </div>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-[var(--color-muted)]">
              {exp.summary}
            </p>

            <ul className="mt-4 space-y-2">
              {exp.highlights.map((h) => (
                <li
                  key={h}
                  className="flex gap-2.5 text-sm text-[var(--color-fg)]/90"
                >
                  <span
                    className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-[var(--color-brand)]/70"
                    aria-hidden="true"
                  />
                  {h}
                </li>
              ))}
            </ul>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {exp.tech.map((t) => (
                <span key={t} className="chip">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}
