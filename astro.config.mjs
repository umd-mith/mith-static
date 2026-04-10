// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import pagefind from "astro-pagefind";

import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  integrations: [
    svelte(),
    // NB pagefind needs to stay last in the list of plugins to perform indexing correctly.
    pagefind()
  ],
  vite: {  
    plugins: [tailwindcss()],
    esbuild: {
      target: 'esnext', // Ensure ESNext target for top-level await
    }
  },
  site: 'https://mith.umd.edu/',
  redirects: {
    "/news": "/news/1",
    "/events": "/events/1",
  },
  image: {
    remotePatterns: [{ hostname: "*.airtableusercontent.com" }],
  },
});