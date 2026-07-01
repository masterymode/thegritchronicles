import { sections } from "@/config/sections";
import SocialRow from "@/components/SocialRow";

export default function Header() {
  return (
    <header>
      <div className="logo-wrap">
        {/* NOTE: swap in real width/height (matching logo.webp's aspect ratio)
            once the file is in /public — reserves space and avoids layout shift. */}
        <img src="/logo.webp" alt="The Grit Chronicles" />
      </div>

      {sections.showSocialRow && <SocialRow />}
    </header>
  );
}
