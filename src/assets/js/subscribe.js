// Intercepts the newsletter form and submits it quietly in the background
// to Listmonk's public API, instead of letting the browser navigate to
// Listmonk's own hosted page.
//
// - On success: redirect to /confirm/, our own "check your email" page.
// - If the email is already subscribed (Listmonk returns HTTP 409 for this):
//   redirect to /already-subscribed/.
// - Any other error (bad email, network issue): show a small inline message
//   right here and let them fix it and try again, no redirect.
//
// If JavaScript fails to load for any reason, the form still works: it
// falls back to a normal submit to the action/method/target already set
// on the <form> tag in index.njk (opens Listmonk's native page in a new
// tab). Nothing breaks, it just won't look as polished.
(function () {
  var form = document.getElementById("subscribeForm");
  if (!form) return;

  var LISTMONK_API = "https://mail.vendro.cc/api/public/subscription";
  var CONFIRM_PAGE = "/confirm/";
  var ALREADY_SUBSCRIBED_PAGE = "/already-subscribed/";

  var emailInput = form.querySelector('input[name="email"]');
  var listInput = form.querySelector('input[name="l"]');
  var submitBtn = form.querySelector(".subscribe-btn");
  var btnLabel = form.querySelector(".subscribe-btn-label");
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
        if (response.ok) {
          window.location.href = CONFIRM_PAGE;
          return null;
        }

        if (response.status === 409) {
          window.location.href = ALREADY_SUBSCRIBED_PAGE;
          return null;
        }

        // Any other error: read the message from the response body, if any.
        return response
          .json()
          .catch(function () {
            return {};
          });
      })
      .then(function (data) {
        // If we already redirected above, data is null — nothing left to do.
        if (!data) return;

        var message =
          (data && data.message) || "Something went wrong. Please try again.";
        showError(message);
        setLoading(false);
      })
      .catch(function () {
        showError("Network error — check your connection and try again.");
        setLoading(false);
      });
  });
})();
