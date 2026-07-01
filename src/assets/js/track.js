// Click tracking: any element with data-track="event_name" (optionally
// data-platform="x") gets tracked on click. No framework needed.
document.addEventListener("click", function (e) {
  var el = e.target.closest("[data-track]");
  if (!el) return;
  if (typeof window.umami === "undefined") return;

  var eventName = el.getAttribute("data-track");
  var platform = el.getAttribute("data-platform");

  try {
    if (platform) {
      window.umami.track(eventName, { platform: platform });
    } else {
      window.umami.track(eventName);
    }
  } catch (err) {
    console.warn("umami track failed:", err);
  }
});

// Newsletter form submit tracking.
var subscribeForm = document.querySelector(".listmonk-form");
if (subscribeForm) {
  subscribeForm.addEventListener("submit", function () {
    if (typeof window.umami === "undefined") return;
    try {
      window.umami.track("subscribe_submit");
    } catch (err) {
      console.warn("umami track failed:", err);
    }
  });
}
