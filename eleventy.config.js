import { config } from "dotenv";
config({ path: ".env.local" });

export default function (eleventyConfig) {
  // Contents of /public land at the site root: public/logo.webp -> /logo.webp
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
