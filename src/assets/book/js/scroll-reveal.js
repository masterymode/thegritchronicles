// Wraps text in [data-reveal] elements into per-word spans, then lights
// each word up progressively as the element scrolls through the viewport.
// Falls back to an instant, fully-lit state if prefers-reduced-motion is set.

(function () {
  var prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  function wrapWords(el) {
    var text = el.textContent.trim();
    var words = text.split(/\s+/);
    el.innerHTML = words
      .map(function (w) {
        return '<span class="word">' + w + "</span>";
      })
      .join(" ");
    return el.querySelectorAll(".word");
  }

  function init() {
    var targets = document.querySelectorAll("[data-reveal]");

    targets.forEach(function (el) {
      var words = wrapWords(el);

      if (prefersReducedMotion) {
        words.forEach(function (w) {
          w.classList.add("is-lit");
        });
        return;
      }

      function update() {
        var rect = el.getBoundingClientRect();
        var vh = window.innerHeight;

        // Progress: 0 when element bottom hits viewport bottom,
        // 1 when element top hits ~35% down the viewport.
        var start = vh;
        var end = vh * 0.20;
        var raw = (start - rect.top) / (start - end);
        var progress = Math.min(1, Math.max(0, raw));

        var litCount = Math.round(progress * words.length);
        words.forEach(function (w, i) {
          if (i < litCount) {
            w.classList.add("is-lit");
          } else {
            w.classList.remove("is-lit");
          }
        });
      }

      window.addEventListener("scroll", update, { passive: true });
      window.addEventListener("resize", update);
      update();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
