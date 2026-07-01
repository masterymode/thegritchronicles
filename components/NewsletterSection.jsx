import SubscribeForm from "@/components/SubscribeForm";

export default function NewsletterSection() {
  const listUuid = process.env.LISTMONK_LIST_UUID;

  if (!listUuid) {
    // Fails loud in dev/build logs instead of silently shipping a broken form.
    console.warn(
      "LISTMONK_LIST_UUID is not set — the subscribe form will submit with an empty list id."
    );
  }

  return (
    <>
      <div className="eyebrow">Join the newsletter</div>
      <p className="newsletter-copy">
        Get a gritty message every other day in your inbox to kill your excuses and fortify your mind.
      </p>
      <p className="newsletter-copy bold-line">
        No motivation porn. No empty hype. No bullshit. Just pure grit.
      </p>

      <SubscribeForm listUuid={listUuid} />
    </>
  );
}
