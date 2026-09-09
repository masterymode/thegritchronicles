// Watch-this section: the Wistia embed's scripts (player.js + the
// per-media embed script) are loaded only once the section is close to
// the viewport, instead of on initial page load. Keeps 2 third-party
// requests + their JS parse cost off the critical rendering path.
(function () {
  var container = document.getElementById("videoContainer");
  if (!container) return;

  var loaded = false;

  function loadWistia() {
    if (loaded) return;
    loaded = true;

    var playerScript = document.createElement("script");
    playerScript.src = "https://fast.wistia.com/player.js";
    playerScript.async = true;
    document.body.appendChild(playerScript);

    var embedScript = document.createElement("script");
    embedScript.src = "https://fast.wistia.com/embed/70fk1y91al.js";
    embedScript.async = true;
    embedScript.type = "module";
    document.body.appendChild(embedScript);
  }

  if (!("IntersectionObserver" in window)) {
    // No IO support — fall back to loading immediately so the video
    // still works.
    loadWistia();
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          loadWistia();
          observer.disconnect();
        }
      });
    },
    { rootMargin: "500px 0px" } // start loading a bit before it's on screen
  );

  observer.observe(container);
})();
