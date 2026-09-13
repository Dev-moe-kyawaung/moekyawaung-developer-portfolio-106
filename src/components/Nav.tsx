"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/#work", label: "Projects" },
  { href: "/#case-studies", label: "Case Studies" },
  { href: "/#leadership", label: "Leadership" },
  { href: "/#experience", label: "Experience" },
  { href: "/#writing", label: "Writing" },
  { href: "/resume", label: "Résumé" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const pathname = usePathname();
  const onHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!onHome) return;
    const ids = [
      "work",
      "case-studies",
      "leadership",
      "experience",
      "writing",
      "contact",
    ];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [onHome]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled
          ? "border-b border-[var(--color-line)] bg-[var(--color-ink)]/80 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link
          href="/"
          className="group flex items-center gap-2.5"
          aria-label="Moe Kyaw Aung — home"
        >
          <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-[var(--color-brand)] to-[var(--color-brand-2)] font-display text-sm font-bold text-[#06121a] shadow-lg shadow-[var(--color-brand)]/20">
            MKA
          </span>
          <span className="hidden flex-col leading-none sm:flex">
            <span className="font-display text-sm font-semibold tracking-tight">
              Moe Kyaw Aung
            </span>
            <span className="font-mono text-[0.62rem] text-[var(--color-faint)]">
              Senior Android Engineer
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {LINKS.map((l) => {
            const id = l.href.split("#")[1] ?? "";
            const isActive = onHome && active === id;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`relative rounded-full px-3.5 py-2 text-sm transition-colors ${
                  isActive
                    ? "text-[var(--color-fg)]"
                    : "text-[var(--color-muted)] hover:text-[var(--color-fg)]"
                }`}
              >
                {l.label}
                {isActive && (
                  <span className="absolute inset-x-3 -bottom-0.5 h-px bg-gradient-to-r from-[var(--color-brand)] to-[var(--color-brand-2)]" />
                )}
              </Link>
            );
          })}
          <a
            href="/#contact"
            className="btn btn-primary ml-2 px-4 py-2 text-sm"
          >
            Hire me
          </a>
        </nav>

        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded-xl border border-[var(--color-line)] text-[var(--color-fg)] lg:hidden"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <div className="space-y-1.5">
            <span
              className={`block h-px w-5 bg-current transition-transform ${
                open ? "translate-y-[3px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-px w-5 bg-current transition-opacity ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-px w-5 bg-current transition-transform ${
                open ? "-translate-y-[3px] -rotate-45" : ""
              }`}
            />
          </div>
        </button>
      </div>

      {open && (
        <div className="border-t border-[var(--color-line)] bg-[var(--color-ink)]/95 backdrop-blur-xl lg:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col px-5 py-3" aria-label="Mobile">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-3 text-base text-[var(--color-muted)] hover:text-[var(--color-fg)]"
              >
                {l.label}
              </Link>
            ))}
            <a
              href="/#contact"
              onClick={() => setOpen(false)}
              className="btn btn-primary mt-2"
            >
              Hire me
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
