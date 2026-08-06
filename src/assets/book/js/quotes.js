// Quotes slideshow: auto-advancing carousel with clickable dots.
(function () {
  var slides = document.querySelectorAll("#quotesSlideshow .quotes__slide");
  var dotsWrap = document.getElementById("quotesDots");
  if (!slides.length || !dotsWrap) return;

  var current = 0;
  var timer;

  slides.forEach(function (_, i) {
    var dot = document.createElement("button");
    dot.className = "quotes__dot" + (i === 0 ? " is-active" : "");
    dot.setAttribute("aria-label", "Go to quote " + (i + 1));
    dot.addEventListener("click", function () {
      goTo(i);
    });
    dotsWrap.appendChild(dot);
  });

  var dots = document.querySelectorAll(".quotes__dot");

  function goTo(index) {
    slides[current].classList.remove("is-active");
    dots[current].classList.remove("is-active");
    current = index;
    slides[current].classList.add("is-active");
    dots[current].classList.add("is-active");
    restart();
  }

  function next() {
    goTo((current + 1) % slides.length);
  }

  function restart() {
    clearInterval(timer);
    timer = setInterval(next, 6000);
  }

  restart();
})();
