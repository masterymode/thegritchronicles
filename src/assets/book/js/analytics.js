// Grit Chronicles book page analytics.
// Mirrors the same lightweight data-track pattern already used on the
// homepage's track.js, plus scroll depth and Shopify checkout stitching.

(function () {
  function track(name, data) {
    if (typeof window.umami === "undefined") return;
    try {
      if (data) {
        window.umami.track(name, data);
      } else {
        window.umami.track(name);
      }
    } catch (err) {
      console.warn("umami track failed:", err);
    }
  }

  // --- Stitching ID ---
  // One ID per browser session, reused across page views. Appended to both
  // checkout links below so it survives into the Shopify order as a note
  // attribute, letting the purchase-tracking workflow tie a sale back to
  // the session that clicked it.
  function getStitchId() {
    try {
      var existing = sessionStorage.getItem("gritStitchId");
      if (existing) return existing;
      var id =
        window.crypto && window.crypto.randomUUID
          ? window.crypto.randomUUID()
          : "stitch-" + Date.now() + "-" + Math.random().toString(36).slice(2);
      sessionStorage.setItem("gritStitchId", id);
      return id;
    } catch (e) {
      // sessionStorage unavailable (privacy mode, etc.) - fall back to a
      // per-pageload ID. Won't persist across pages, but never blocks checkout.
      return "stitch-" + Date.now() + "-" + Math.random().toString(36).slice(2);
    }
  }

  document.querySelectorAll("[data-checkout-link]").forEach(function (link) {
    var stitchId = getStitchId();
    var separator = link.href.indexOf("?") === -1 ? "?" : "&";
    link.href = link.href + separator + "attributes[stitch_id]=" + encodeURIComponent(stitchId);
  });

  // Assign the same stitch ID as this session's Distinct ID. Umami computes
  // the session ID as uuid(websiteId, id) whenever an id is present - so as
  // long as the purchase event sent from n8n carries this same id, it lands
  // in this exact session rather than a separate one.
  if (typeof window.umami !== "undefined" && typeof window.umami.identify === "function") {
    try {
      window.umami.identify(getStitchId());
    } catch (err) {
      console.warn("umami identify failed:", err);
    }
  }

  // --- CTA / buy click tracking ---
  // Any element with data-track="event_name" gets tracked on click.
  // Optional data-section (which section the CTA lives in) and
  // data-product (which product a buy button points to) ride along as
  // event data when present.
  document.addEventListener("click", function (e) {
    var el = e.target.closest("[data-track]");
    if (!el) return;

    var eventName = el.getAttribute("data-track");
    var eventData = {};

    var section = el.getAttribute("data-section");
    if (section) eventData.section = section;

    var product = el.getAttribute("data-product");
    if (product) eventData.product = product;

    track(eventName, Object.keys(eventData).length ? eventData : undefined);
  });

  // --- Scroll depth tracking ---
  // Fires once per milestone per page view.
  var milestones = [25, 50, 75, 100];
  var fired = {};

  function checkScrollDepth() {
    var scrollTop = window.scrollY || document.documentElement.scrollTop;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight <= 0) return;
    var percent = Math.round((scrollTop / docHeight) * 100);

    milestones.forEach(function (m) {
      if (percent >= m && !fired[m]) {
        fired[m] = true;
        track("scroll_depth", { percent: m });
      }
    });
  }

  var scrollTimeout;
  window.addEventListener("scroll", function () {
    if (scrollTimeout) return;
    scrollTimeout = setTimeout(function () {
      checkScrollDepth();
      scrollTimeout = null;
    }, 200);
  });
})();
