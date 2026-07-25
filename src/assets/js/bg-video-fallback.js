// Background video autoplay fallback.
// iOS Low Power Mode (and some in-app browsers/webviews) silently block
// autoplay even with muted+playsinline set. When that happens the video
// sits there paused/black instead of playing. Rather than show a broken
// video state, just hide it - every element this targets already has a
// solid black background sitting behind it (.section--black / body bg),
// so hiding the video leaves a clean black background instead.
(function () {
  function hide(video) {
    video.style.display = "none";
  }

  function watch(video) {
    // Case 1: play() promise rejects outright (most common on iOS).
    var playPromise = video.play();
    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(function () {
        hide(video);
      });
    }

    // Case 2: play() resolves but the browser pauses it again almost
    // immediately without user interaction (seen on some iOS versions/
    // in-app webviews). If it's still stuck paused shortly after, treat
    // that as a failed autoplay too.
    setTimeout(function () {
      if (video.paused) hide(video);
    }, 600);
  }

  document.querySelectorAll("video[autoplay]").forEach(function (video) {
    try {
      if (video.readyState >= 2) {
        watch(video);
      } else {
        video.addEventListener("loadeddata", function () {
          watch(video);
        }, { once: true });
      }
    } catch (err) {
      // If anything here throws, leave the video as-is rather than break the page.
      console.warn("bg-video-fallback failed:", err);
    }
  });
})();
