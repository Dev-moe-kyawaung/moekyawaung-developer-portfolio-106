import Reveal from "@/components/Reveal";
import { leadershipPillars } from "@/lib/content";

export default function LeadershipPillars() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {leadershipPillars.map((p, i) => (
        <Reveal key={p.title} delay={(i % 3) * 70}>
          <div className="card flex h-full flex-col p-6">
            <div className="flex items-start justify-between gap-3">
              <span className="text-2xl" aria-hidden="true">
                {p.icon}
              </span>
              <div className="text-right">
                <div className="font-display text-xl font-semibold text-[var(--color-brand)]">
                  {p.metric.value}
                </div>
                <div className="text-[0.65rem] uppercase tracking-wider text-[var(--color-faint)]">
                  {p.metric.label}
                </div>
              </div>
            </div>

            <h3 className="mt-4 font-display text-lg font-semibold text-[var(--color-fg)]">
              {p.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
              {p.lead}
            </p>

            <ul className="mt-4 space-y-2 border-t border-[var(--color-line-soft)] pt-4">
              {p.proof.map((item) => (
                <li
                  key={item}
                  className="flex gap-2.5 text-[0.82rem] leading-relaxed text-[var(--color-fg)]/85"
                >
                  <span
                    className="mt-1.5 h-1 w-1 flex-none rounded-full bg-[var(--color-brand)]/70"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
