// @ts-check

import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";
import autoTagsIntegration from "./integrations/auto-tags.js";

// https://astro.build/config
export default defineConfig({
  site: "https://vinaymavi.github.io",
  integrations: [mdx(), sitemap(), autoTagsIntegration()],
});
