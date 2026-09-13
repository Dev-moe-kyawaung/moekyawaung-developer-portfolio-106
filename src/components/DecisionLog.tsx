"use client";

import { useState } from "react";
import { decisions } from "@/lib/content";

/**
 * Architecture Decision Records — the clearest proof of engineering judgement.
 * Accessible disclosure pattern: real buttons, aria-expanded, keyboard native.
 */
export default function DecisionLog() {
  const [open, setOpen] = useState<string | null>(decisions[0]?.id ?? null);

  return (
    <div className="space-y-3">
      {decisions.map((d) => {
        const isOpen = open === d.id;
        return (
          <div
            key={d.id}
            className="card overflow-hidden"
            style={{ ["--card-accent" as any]: d.accent }}
          >
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`adr-panel-${d.id}`}
                id={`adr-trigger-${d.id}`}
                onClick={() => setOpen(isOpen ? null : d.id)}
                className="flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-white/[0.02]"
              >
                <span
                  className="font-mono text-xs font-medium"
                  style={{ color: d.accent }}
                >
                  {d.id}
                </span>
                <span className="flex-1 font-display text-base font-semibold text-[var(--color-fg)] sm:text-lg">
                  {d.title}
                </span>
                <span className="hidden rounded-full border border-[var(--color-line)] px-2.5 py-0.5 font-mono text-[0.65rem] uppercase tracking-wider text-[var(--color-muted)] sm:inline">
                  {d.status}
                </span>
                <span
                  className={`flex-none text-lg text-[var(--color-faint)] transition-transform duration-300 ${
                    isOpen ? "rotate-45" : ""
                  }`}
                  aria-hidden="true"
                >
                  +
                </span>
              </button>
            </h3>

            {isOpen && (
              <div
                id={`adr-panel-${d.id}`}
                role="region"
                aria-labelledby={`adr-trigger-${d.id}`}
                className="border-t border-[var(--color-line-soft)] px-5 pb-6 pt-5"
              >
                <div className="grid gap-6 lg:grid-cols-2">
                  <Part label="Context" body={d.context} />
                  <div>
                    <p className="eyebrow mb-2">Options considered</p>
                    <ul className="space-y-1.5">
                      {d.options.map((o, i) => (
                        <li
                          key={o}
                          className="flex gap-2.5 text-sm text-[var(--color-muted)]"
                        >
                          <span className="font-mono text-xs text-[var(--color-faint)]">
                            {i + 1}.
                          </span>
                          {o}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div
                  className="mt-6 rounded-xl border-l-2 bg-white/[0.02] p-4"
                  style={{ borderLeftColor: d.accent }}
                >
                  <p className="eyebrow mb-2">Decision</p>
                  <p className="text-sm leading-relaxed text-[var(--color-fg)]">
                    {d.decision}
                  </p>
                </div>

                <div className="mt-5 grid gap-6 lg:grid-cols-2">
                  <Part label="Trade-off accepted" body={d.tradeoff} />
                  <div>
                    <p className="eyebrow mb-2">Outcome</p>
                    <p className="flex gap-2.5 text-sm leading-relaxed text-[var(--color-muted)]">
                      <span
                        className="mt-0.5 flex-none"
                        style={{ color: d.accent }}
                        aria-hidden="true"
                      >
                        ✦
                      </span>
                      {d.outcome}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function Part({ label, body }: { label: string; body: string }) {
  return (
    <div>
      <p className="eyebrow mb-2">{label}</p>
      <p className="text-sm leading-relaxed text-[var(--color-muted)]">{body}</p>
    </div>
  );
}
