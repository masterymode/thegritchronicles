import { config } from "dotenv";
import fs from "node:fs";
import path from "node:path";
import { transform as lightningcss } from "lightningcss";
import { minify as terserMinify } from "terser";

config({ path: ".env.local" });

// Walk a directory and return every file path matching one of the given
// extensions (used to find the CSS/JS that passthrough-copy just wrote).
function walk(dir, exts, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full, exts, out);
    } else if (exts.includes(path.extname(entry.name))) {
      out.push(full);
    }
  }
  return out;
}

export default function (eleventyConfig) {
  // Only files that must live at the literal site root (e.g. favicon.ico)
  // go in /public. Everything else lives under src/assets/<page>/.
  eleventyConfig.addPassthroughCopy({ public: "/" });

  // Images/fonts ship as-is; CSS/JS get minified in place after copying
  // (see the eleventy.after hook below) since there's no bundler in this
  // project to run them through otherwise.
  eleventyConfig.addPassthroughCopy("src/assets");

  // Simple build-date stamp for sitemap.xml <lastmod> — good enough since
  // this is a static site rebuilt on every deploy.
  eleventyConfig.addGlobalData("buildDate", () => new Date().toISOString().slice(0, 10));

  eleventyConfig.on("eleventy.after", async ({ dir }) => {
    const assetsDir = path.join(dir.output, "assets");
    if (!fs.existsSync(assetsDir)) return;

    for (const file of walk(assetsDir, [".css"])) {
      const src = fs.readFileSync(file);
      const { code } = lightningcss({
        filename: file,
        code: src,
        minify: true,
        targets: { chrome: 100, firefox: 100, safari: 15 },
      });
      fs.writeFileSync(file, code);
    }

    for (const file of walk(assetsDir, [".js"])) {
      // Skip files that reference `import.meta`/ESM-only syntax terser
      // can't parse safely as a plain script; our JS here is all plain
      // browser scripts, so this is a straightforward minify.
      const src = fs.readFileSync(file, "utf8");
      try {
        const result = await terserMinify(src, { module: false, format: { comments: false } });
        if (result.code) fs.writeFileSync(file, result.code);
      } catch (err) {
        console.warn(`[minify] Skipped ${file}: ${err.message}`);
      }
    }
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
  };
}
