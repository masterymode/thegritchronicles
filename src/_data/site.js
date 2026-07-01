export default function () {
  return {
    url: process.env.SITE_URL || "https://thegritchronicles.com",
    description:
      "Aggressive, no-excuses motivation. Daily grit dispatches, brutal quotes, and real stories of resilience that destroy excuses and build mental toughness.",
    listmonkListUuid: process.env.LISTMONK_LIST_UUID || "",
    umamiWebsiteId: process.env.UMAMI_WEBSITE_ID || "",
    umamiScriptUrl: process.env.UMAMI_SCRIPT_URL || "",
  };
}
