// Small safe wrapper so components never have to null-check window.umami
// themselves, and tracking never throws if the script is blocked (adblock,
// env var missing locally, etc).
export function trackEvent(name, data) {
  if (typeof window === "undefined") return;
  if (typeof window.umami === "undefined") return;

  try {
    if (data) {
      window.umami.track(name, data);
    } else {
      window.umami.track(name);
    }
  } catch (err) {
    // Never let analytics break the actual user action.
    console.warn("umami track failed:", err);
  }
}
