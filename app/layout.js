import Script from "next/script";
import "./globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://thegritchronicles.com";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "The Grit Chronicles — Relentless Motivation. Real Stories. No Excuses.",
    template: "%s — The Grit Chronicles",
  },
  description:
    "Aggressive, no-excuses motivation for people done making excuses. Daily grit dispatches, brutal quotes, and real stories of resilience — join the newsletter.",
  openGraph: {
    title: "The Grit Chronicles — Relentless Motivation. Real Stories. No Excuses.",
    description:
      "Aggressive, no-excuses motivation for people done making excuses. Daily grit dispatches, brutal quotes, and real stories of resilience.",
    url: SITE_URL,
    siteName: "The Grit Chronicles",
    images: ["/logo.webp"],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "The Grit Chronicles — Relentless Motivation. Real Stories. No Excuses.",
    description:
      "Aggressive, no-excuses motivation for people done making excuses. Daily grit dispatches, brutal quotes, and real stories of resilience.",
    images: ["/logo.webp"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/logo.webp",
  },
};

export const viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  const umamiSrc = process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL;
  const umamiId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;

  return (
    <html lang="en">
      <body>
        {children}

        {umamiSrc && umamiId && (
          <Script
            src={umamiSrc}
            data-website-id={umamiId}
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  );
}
