import type { ReactNode } from "react";

type Props = {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  id?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  id,
}: Props) {
  return (
    <div
      id={id}
      className={`mb-12 ${align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}`}
    >
      <div className="eyebrow mb-3">
        <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-brand)] align-middle" />
        {eyebrow}
      </div>
      <h2 className="font-display text-3xl font-semibold tracking-tight text-[var(--color-fg)] sm:text-4xl md:text-[2.75rem] md:leading-[1.05]">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-[var(--color-muted)]">
          {description}
        </p>
      )}
    </div>
  );
}
