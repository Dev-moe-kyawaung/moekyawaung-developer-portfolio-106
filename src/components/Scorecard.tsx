import { scorecard, collaboration } from "@/lib/content";
import Reveal from "@/components/Reveal";

export function EngineeringScorecard() {
  return (
    <div className="card overflow-hidden">
      <div className="hidden grid-cols-[1.3fr_0.7fr_1.4fr] gap-4 border-b border-[var(--color-line)] px-6 py-3 sm:grid">
        <span className="eyebrow">Metric</span>
        <span className="eyebrow">Current</span>
        <span className="eyebrow">How it&apos;s held</span>
      </div>
      <ul>
        {scorecard.map((row) => (
          <li
            key={row.metric}
            className="grid gap-1 border-b border-[var(--color-line-soft)] px-6 py-4 last:border-0 transition-colors hover:bg-white/[0.02] sm:grid-cols-[1.3fr_0.7fr_1.4fr] sm:items-center sm:gap-4"
          >
            <span className="text-sm font-medium text-[var(--color-fg)]">
              {row.metric}
            </span>
            <span className="font-display text-lg font-semibold text-[var(--color-accent)]">
              {row.value}
            </span>
            <span className="text-xs text-[var(--color-faint)]">{row.how}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Collaboration() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {collaboration.map((c, i) => (
        <Reveal key={c.with} delay={i * 80}>
          <div className="card h-full p-6">
            <div className="flex items-center gap-2.5">
              <span className="text-xl" aria-hidden="true">
                {c.icon}
              </span>
              <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-brand)]">
                {c.with}
              </h3>
            </div>
            <p className="mt-3 font-display text-base font-semibold text-[var(--color-fg)]">
              {c.headline}
            </p>
            <ul className="mt-4 space-y-2.5">
              {c.points.map((p) => (
                <li
                  key={p}
                  className="flex gap-2.5 text-[0.82rem] leading-relaxed text-[var(--color-muted)]"
                >
                  <span
                    className="mt-1.5 h-1 w-1 flex-none rounded-full bg-[var(--color-brand)]/70"
                    aria-hidden="true"
                  />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
