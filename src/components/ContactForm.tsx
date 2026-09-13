"use client";

import { useState } from "react";
import { track } from "@/lib/track";

type Status = "idle" | "sending" | "sent" | "error";

const ROLE_TYPES = [
  "Senior Android Engineer",
  "Staff / Lead Android",
  "Mobile Platform / Architect",
  "Contract / Consulting",
  "Other",
];

const TIMELINES = ["ASAP", "Within 1 month", "1–3 months", "Just exploring"];

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [name, setName] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formEl = e.currentTarget;
    setStatus("sending");
    setError("");

    const form = new FormData(formEl);
    const payload = {
      name: String(form.get("name") || "").trim(),
      email: String(form.get("email") || "").trim(),
      company: String(form.get("company") || "").trim(),
      roleType: String(form.get("roleType") || "").trim(),
      timeline: String(form.get("timeline") || "").trim(),
      subject: String(form.get("roleType") || "Enquiry").trim(),
      message: String(form.get("message") || "").trim(),
      source: "contact_form",
    };

    if (!payload.name || !payload.email || !payload.message) {
      setError("Please complete name, email, and message.");
      setStatus("error");
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Request failed");
      track("contact_submitted", payload.roleType);
      setName(payload.name);
      setStatus("sent");
      formEl.reset();
    } catch {
      setError("Something went wrong. Please email me directly instead.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="card p-8 text-center" role="status" aria-live="polite">
        <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-full bg-[var(--color-accent)]/15 text-2xl">
          ✦
        </div>
        <h3 className="font-display text-xl font-semibold text-[var(--color-fg)]">
          Thanks{name ? `, ${name}` : ""} — message received.
        </h3>
        <p className="mt-2 text-sm text-[var(--color-muted)]">
          I reply to every genuine enquiry, usually within 24 hours. If it&apos;s
          urgent, call or email directly.
        </p>
        <button
          type="button"
          className="btn btn-ghost mt-6"
          onClick={() => setStatus("idle")}
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="card space-y-4 p-6 sm:p-7" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" htmlFor="name" required>
          <input id="name" name="name" type="text" autoComplete="name" className="field" placeholder="Your name" />
        </Field>
        <Field label="Work email" htmlFor="email" required>
          <input id="email" name="email" type="email" autoComplete="email" className="field" placeholder="you@company.com" />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Company" htmlFor="company">
          <input id="company" name="company" type="text" autoComplete="organization" className="field" placeholder="Company name" />
        </Field>
        <Field label="Role type" htmlFor="roleType">
          <select id="roleType" name="roleType" className="field" defaultValue={ROLE_TYPES[0]}>
            {ROLE_TYPES.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Hiring timeline" htmlFor="timeline">
        <select id="timeline" name="timeline" className="field" defaultValue={TIMELINES[1]}>
          {TIMELINES.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </Field>

      <Field label="Message" htmlFor="message" required>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="field resize-none"
          placeholder="Role, team, and the problem you're hiring to solve…"
        />
      </Field>

      {status === "error" && (
        <p className="text-sm text-red-400" role="alert">{error}</p>
      )}

      <button type="submit" className="btn btn-primary w-full" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Request an interview"}
        <span aria-hidden="true">→</span>
      </button>
      <p className="text-center text-xs text-[var(--color-faint)]">
        No recruiters&apos; spam filter here — I read and reply to every message.
      </p>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="block">
      <span className="mb-1.5 block text-sm text-[var(--color-muted)]">
        {label}
        {required && <span className="text-[var(--color-brand)]"> *</span>}
      </span>
      {children}
    </label>
  );
}
