import { config } from "dotenv";
config({ path: ".env.local" });

export default function (eleventyConfig) {
  // Only files that must live at the literal site root (e.g. favicon.ico)
  // go in /public. Everything else lives under src/assets/<page>/.
  eleventyConfig.addPassthroughCopy({ public: "/" });

  // CSS/JS ship as-is, no processing.
  eleventyConfig.addPassthroughCopy("src/assets");

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
  };
}
