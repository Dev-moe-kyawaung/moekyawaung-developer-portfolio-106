import type { ReactNode } from "react";

function renderInline(text: string): ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-[var(--color-fg)]">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

export default function Markdown({ content }: { content: string }) {
  const lines = content.split("\n");
  const blocks: ReactNode[] = [];
  let listBuffer: string[] = [];
  let key = 0;

  const flushList = () => {
    if (listBuffer.length === 0) return;
    const items = listBuffer;
    listBuffer = [];
    blocks.push(
      <ul key={`ul-${key++}`} className="space-y-2">
        {items.map((it, idx) => (
          <li key={idx} className="flex gap-2.5 text-[var(--color-muted)]">
            <span
              className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-[var(--color-brand)]/70"
              aria-hidden="true"
            />
            <span className="leading-relaxed">{renderInline(it)}</span>
          </li>
        ))}
      </ul>
    );
  };

  for (const line of lines) {
    if (line.startsWith("### ")) {
      flushList();
      blocks.push(
        <h3
          key={`h3-${key++}`}
          className="mt-2 font-display text-lg font-semibold text-[var(--color-fg)]"
        >
          {renderInline(line.slice(4))}
        </h3>
      );
    } else if (line.startsWith("## ")) {
      flushList();
      blocks.push(
        <h2
          key={`h2-${key++}`}
          className="mt-6 font-display text-2xl font-semibold tracking-tight text-[var(--color-fg)]"
        >
          {renderInline(line.slice(3))}
        </h2>
      );
    } else if (line.startsWith("- ")) {
      listBuffer.push(line.slice(2));
    } else if (line.trim() === "") {
      flushList();
    } else {
      flushList();
      blocks.push(
        <p key={`p-${key++}`} className="leading-relaxed text-[var(--color-muted)]">
          {renderInline(line)}
        </p>
      );
    }
  }
  flushList();

  return <div className="space-y-1">{blocks}</div>;
}
