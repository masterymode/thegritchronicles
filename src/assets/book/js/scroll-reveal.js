// Wraps text in [data-reveal] elements into per-word spans, then lights
// each word up progressively as the element scrolls through the viewport.
// Falls back to an instant, fully-lit state if prefers-reduced-motion is set.
//
// Reads (getBoundingClientRect) and writes (classList changes) are batched
// per animation frame via a single shared rAF loop, rather than running a
// read+write cycle synchronously on every raw "scroll" event for every
// element — the previous per-element/per-event pattern forced the browser
// to recompute layout mid-scroll ("forced reflow").

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
    if (!targets.length) return;

    var entries = [];
    targets.forEach(function (el) {
      entries.push({ el: el, words: wrapWords(el) });
    });

    if (prefersReducedMotion) {
      entries.forEach(function (entry) {
        entry.words.forEach(function (w) {
          w.classList.add("is-lit");
        });
      });
      return;
    }

    var vh = window.innerHeight;
    var ticking = false;

    function updateAll() {
      ticking = false;
      // Read phase: gather every rect first...
      var progresses = entries.map(function (entry) {
        var rect = entry.el.getBoundingClientRect();
        var start = vh;
        var end = vh * 0.2;
        var raw = (start - rect.top) / (start - end);
        return Math.min(1, Math.max(0, raw));
      });

      // ...then write phase: apply all class changes together.
      entries.forEach(function (entry, i) {
        var litCount = Math.round(progresses[i] * entry.words.length);
        entry.words.forEach(function (w, j) {
          if (j < litCount) {
            w.classList.add("is-lit");
          } else {
            w.classList.remove("is-lit");
          }
        });
      });
    }

    function requestUpdate() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateAll);
      }
    }

    window.addEventListener("resize", function () {
      vh = window.innerHeight;
      requestUpdate();
    });
    window.addEventListener("scroll", requestUpdate, { passive: true });
    updateAll();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
