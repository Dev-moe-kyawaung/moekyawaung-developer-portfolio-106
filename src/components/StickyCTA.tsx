"use client";

import { useEffect, useState } from "react";
import { track } from "@/lib/track";

/** Mobile conversion bar — appears once the hero CTAs scroll away. */
export default function StickyCTA() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const past = window.scrollY > 620;
      const contact = document.getElementById("contact");
      const atContact = contact
        ? contact.getBoundingClientRect().top < window.innerHeight
        : false;
      setShow(past && !atContact);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-[var(--color-line)] bg-[var(--color-ink)]/92 px-4 py-3 backdrop-blur-xl transition-transform duration-300 lg:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
      aria-hidden={!show}
    >
      <div className="flex items-center gap-2.5">
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-medium text-[var(--color-fg)]">
            Senior Android Engineer · 5+ yrs
          </p>
          <p className="truncate text-[0.68rem] text-[var(--color-accent)]">
            Available for interviews
          </p>
        </div>
        <a
          href="#work"
          tabIndex={show ? 0 : -1}
          className="btn btn-ghost px-3.5 py-2 text-xs"
          onClick={() => track("cta_view_projects", "sticky")}
        >
          Projects
        </a>
        <a
          href="#contact"
          tabIndex={show ? 0 : -1}
          className="btn btn-primary px-3.5 py-2 text-xs"
          onClick={() => track("cta_contact", "sticky")}
        >
          Contact
        </a>
      </div>
    </div>
  );
}
