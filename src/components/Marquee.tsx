import { marqueeTech } from "@/lib/content";

export default function Marquee() {
  const items = [...marqueeTech, ...marqueeTech];
  return (
    <div
      className="relative overflow-hidden border-y border-[var(--color-line)] py-5"
      aria-hidden="true"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-[var(--color-ink)] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-[var(--color-ink)] to-transparent" />
      <div className="flex w-max motion-safe:animate-marquee">
        {items.map((t, i) => (
          <div key={i} className="flex items-center">
            <span className="px-7 font-mono text-sm text-[var(--color-muted)]">
              {t}
            </span>
            <span className="h-1 w-1 rounded-full bg-[var(--color-brand)]/60" />
          </div>
        ))}
      </div>
    </div>
  );
}
