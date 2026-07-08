// Intercepts the newsletter form and submits it quietly in the background
// to Listmonk's public API, instead of letting the browser navigate to
// Listmonk's own hosted page. This keeps the person on this site and lets
// us show our own on-brand "check your email" message.
//
// If JavaScript fails to load for any reason, the form still works: it
// falls back to a normal submit to the action/method/target already set
// on the <form> tag in index.njk (opens Listmonk's native page in a new
// tab). Nothing breaks, it just won't look as polished.
(function () {
  var form = document.getElementById("subscribeForm");
  if (!form) return;

  var LISTMONK_API = "https://mail.vendro.cc/api/public/subscription";

  var emailInput = form.querySelector('input[name="email"]');
  var listInput = form.querySelector('input[name="l"]');
  var submitBtn = form.querySelector(".subscribe-btn");
  var btnLabel = form.querySelector(".subscribe-btn-label");
  var successBox = document.getElementById("subscribeSuccess");
  var errorBox = document.getElementById("subscribeError");

  var defaultLabel = btnLabel ? btnLabel.textContent : "Subscribe";

  function showError(message) {
    if (!errorBox) return;
    errorBox.textContent = message;
    errorBox.hidden = false;
  }

  function clearError() {
    if (!errorBox) return;
    errorBox.hidden = true;
    errorBox.textContent = "";
  }

  function setLoading(isLoading) {
    if (submitBtn) submitBtn.disabled = isLoading;
    if (btnLabel) btnLabel.textContent = isLoading ? "Sending..." : defaultLabel;
  }

  form.addEventListener("submit", function (event) {
    // Stop the native POST-to-a-new-tab behavior; we take over from here.
    event.preventDefault();
    clearError();

    var email = (emailInput && emailInput.value || "").trim();
    if (!email) return;

    setLoading(true);

    fetch(LISTMONK_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        list_uuids: [listInput ? listInput.value : ""]
      })
    })
      .then(function (response) {
        return response
          .json()
          .catch(function () {
            return {};
          })
          .then(function (data) {
            return { ok: response.ok, data: data };
          });
      })
      .then(function (result) {
        if (result.ok) {
          form.hidden = true;
          if (successBox) successBox.hidden = false;

          if (typeof window.umami !== "undefined") {
            try {
              window.umami.track("subscribe_success");
            } catch (err) {
              console.warn("umami track failed:", err);
            }
          }
        } else {
          var message =
            (result.data && result.data.message) ||
            "Something went wrong. Please try again.";
          showError(message);
          setLoading(false);
        }
      })
      .catch(function () {
        showError("Network error — check your connection and try again.");
        setLoading(false);
      });
  });
})();
