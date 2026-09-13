import Link from "next/link";
import { socials, PROFILE } from "@/lib/content";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative mt-28 border-t border-[var(--color-line)]">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-[var(--color-brand)] to-[var(--color-brand-2)] font-display text-sm font-bold text-[#06121a]">
                MKA
              </span>
              <span className="font-display text-lg font-semibold">
                {PROFILE.name}
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-[var(--color-muted)]">
              {PROFILE.role} · {PROFILE.location}
            </p>
            <p className="mt-3 font-display text-sm text-[var(--color-fg)]">
              “{PROFILE.philosophy}”
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            <div>
              <h3 className="eyebrow mb-4">Navigate</h3>
              <ul className="space-y-2.5 text-sm">
                <li><Link className="text-[var(--color-muted)] hover:text-[var(--color-fg)]" href="/#work">Work</Link></li>
                <li><Link className="text-[var(--color-muted)] hover:text-[var(--color-fg)]" href="/#experience">Experience</Link></li>
                <li><Link className="text-[var(--color-muted)] hover:text-[var(--color-fg)]" href="/#writing">Writing</Link></li>
                <li><Link className="text-[var(--color-muted)] hover:text-[var(--color-fg)]" href="/#contact">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="eyebrow mb-4">Connect</h3>
              <ul className="space-y-2.5 text-sm">
                {socials.slice(0, 5).map((s) => (
                  <li key={s.label}>
                    <a
                      className="text-[var(--color-muted)] hover:text-[var(--color-fg)]"
                      href={s.href}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="eyebrow mb-4">Direct</h3>
              <ul className="space-y-2.5 text-sm">
                <li><a className="text-[var(--color-muted)] hover:text-[var(--color-fg)]" href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a></li>
                <li><a className="text-[var(--color-muted)] hover:text-[var(--color-fg)]" href={`tel:${PROFILE.phoneHref}`}>{PROFILE.phone}</a></li>
                <li><span className="text-[var(--color-faint)]">{PROFILE.certs}</span></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="hairline my-10" />
        <div className="flex flex-col items-center justify-between gap-3 text-xs text-[var(--color-faint)] sm:flex-row">
          <p>© {year} {PROFILE.name}. Crafted with Kotlin discipline & Next.js precision.</p>
          <p className="font-mono">Built for speed · Accessible · SEO-ready</p>
        </div>
      </div>
    </footer>
  );
}
