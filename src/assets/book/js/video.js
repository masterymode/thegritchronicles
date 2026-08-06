// Watch-this video section: click-to-play/pause, toggles the play button visibility.
(function () {
  var video = document.getElementById("mainVideo");
  var container = document.getElementById("videoContainer");
  var playBtn = document.getElementById("videoPlayBtn");
  if (!video || !container || !playBtn) return;

  function togglePlay() {
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  }

  playBtn.addEventListener("click", togglePlay);
  video.addEventListener("click", togglePlay);

  video.addEventListener("play", function () {
    container.classList.add("is-playing");
  });
  video.addEventListener("pause", function () {
    container.classList.remove("is-playing");
  });
  video.addEventListener("ended", function () {
    container.classList.remove("is-playing");
  });
})();
