(function () {
  var html = document.documentElement;
  var overlay = document.querySelector(".intro-overlay");
  var lineEl = document.querySelector(".intro-line");
  if (!overlay || !lineEl) return;

  var prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (prefersReducedMotion) {
    // CSS already hides the overlay outright for reduced motion.
    return;
  }

  var LINES = [
    "Stop being a b*tch.",
    "Reject weakness, snowflake.",
    "Grit or die.",
    "Comfort is killing you.",
    "Toughen up.",
    "Stop being average.",
    "Discipline or regret.",
    "Stop being a victim.",
    "Get your sh*t together.",
  ];

  var FADE_IN_MS = 400;
  var HOLD_MS = 1400;
  var FADE_OUT_MS = 300;
  var LIFT_MS = 700;

  lineEl.textContent = LINES[Math.floor(Math.random() * LINES.length)];

  // Fade the line in.
  requestAnimationFrame(function () {
    overlay.classList.add("intro-visible");
  });

  // Hold, then fade the line out.
  setTimeout(function () {
    overlay.classList.remove("intro-visible");
  }, FADE_IN_MS + HOLD_MS);

  // Once faded out, lift the whole panel away.
  setTimeout(function () {
    html.classList.add("intro-lift");
  }, FADE_IN_MS + HOLD_MS + FADE_OUT_MS);

  // Clean up after the lift finishes so the overlay stops intercepting clicks.
  setTimeout(function () {
    overlay.remove();
    html.classList.remove("show-intro", "intro-lift");
  }, FADE_IN_MS + HOLD_MS + FADE_OUT_MS + LIFT_MS);
})();
