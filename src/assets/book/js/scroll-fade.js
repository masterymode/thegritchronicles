// Fades/blurs sections up into place as they scroll into view, and
// separately triggers the safe-payment shield's draw-in animation the
// first time it becomes visible (it only needs to play once).

(function () {
  var prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  function initFadeSections() {
    // .hero is excluded: it's above the fold and visible on load, so
    // applying blur/opacity to it would just flash before fading in.
    var sections = document.querySelectorAll("section:not(.hero)");
    sections.forEach(function (section) {
      section.classList.add("fade-in-section");
    });

    if (prefersReducedMotion) {
      sections.forEach(function (section) {
        section.classList.add("is-visible");
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  function initShield() {
    var stage = document.querySelector(".safety__shield-stage");
    if (!stage) return;

    if (prefersReducedMotion) {
      stage.classList.add("is-inview");
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-inview");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(stage);
  }

  function init() {
    initFadeSections();
    initShield();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
