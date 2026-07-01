"use client";

import { trackEvent } from "@/lib/umami";

// Your Listmonk instance's public embed endpoint. Not sensitive — Listmonk
// expects direct public POSTs here, same as any embeddable signup form.
const LISTMONK_FORM_URL = "http://mail.vendro.cc/subscription/form";

export default function SubscribeForm({ listUuid }) {
  return (
    <>
      <form
        className="sub-bar listmonk-form"
        action={LISTMONK_FORM_URL}
        method="post"
        target="_blank"
        rel="noopener"
        onSubmit={() => trackEvent("subscribe_submit")}
      >
        {/* Listmonk's embed snippet ships this empty — required by their form handler. */}
        <input type="hidden" name="nonce" />
        <input type="email" name="email" placeholder="Enter your email" required />
        <input
          type="checkbox"
          name="l"
          value={listUuid}
          checked
          readOnly
          hidden
        />
        <button type="submit">Subscribe</button>
      </form>
      <p className="fine-print">No spam. Unsubscribe at anytime.</p>
    </>
  );
}
