"use client";

import { track } from "@/lib/track";

export default function PrintButton() {
  return (
    <button
      type="button"
      className="btn btn-primary text-sm"
      onClick={() => {
        track("resume_download", "print");
        window.print();
      }}
    >
      Download PDF
      <span aria-hidden="true">↓</span>
    </button>
  );
}
