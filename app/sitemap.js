const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://thegritchronicles.com";

export default function sitemap() {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    // Uncomment once /book is live:
    // {
    //   url: `${SITE_URL}/book`,
    //   lastModified: new Date(),
    //   changeFrequency: "monthly",
    //   priority: 0.8,
    // },
  ];
}
