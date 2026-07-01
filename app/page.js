import { sections } from "@/config/sections";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import NewsletterSection from "@/components/NewsletterSection";
import BackgroundVideo from "@/components/BackgroundVideo";

export default function HomePage() {
  return (
    <>
      {sections.showBackgroundVideo && <BackgroundVideo />}

      <Header />

      <main className="section">
        {sections.showProductCard && <ProductCard />}
        {sections.showNewsletter && <NewsletterSection />}
      </main>

      {/* Organization structured data for search engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "The Grit Chronicles",
            description:
              "Aggressive, no-excuses motivation. Daily grit dispatches, brutal quotes, and real stories of resilience that destroy excuses and build mental toughness.",
            url: process.env.NEXT_PUBLIC_SITE_URL || "https://thegritchronicles.com",
            logo: `${process.env.NEXT_PUBLIC_SITE_URL || "https://thegritchronicles.com"}/logo.webp`,
          }),
        }}
      />
    </>
  );
}
