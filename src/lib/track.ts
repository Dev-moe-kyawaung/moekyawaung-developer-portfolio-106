/**
 * Fire-and-forget first-party conversion tracking.
 * Never awaited, never throws, never blocks navigation.
 */
export function track(name: string, meta = "") {
  if (typeof window === "undefined") return;
  try {
    const body = JSON.stringify({
      name,
      meta,
      path: window.location.pathname,
    });
    if (navigator.sendBeacon) {
      navigator.sendBeacon(
        "/api/track",
        new Blob([body], { type: "application/json" })
      );
      return;
    }
    void fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    }).catch(() => {});
  } catch {
    /* analytics must never break the page */
  }
}
