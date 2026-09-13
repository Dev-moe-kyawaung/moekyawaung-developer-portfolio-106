import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-5 text-center">
      <p className="font-mono text-sm text-[var(--color-brand)]">404</p>
      <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-[var(--color-fg)] sm:text-5xl">
        This screen didn&apos;t render.
      </h1>
      <p className="mt-4 text-[var(--color-muted)]">
        The page you&apos;re looking for has moved or never shipped. Let&apos;s
        get you back to solid ground.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn btn-primary">
          Back home
        </Link>
        <Link href="/work" className="btn btn-ghost">
          View work
        </Link>
      </div>
    </div>
  );
}
