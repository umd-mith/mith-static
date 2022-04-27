//@ts-check

import preact from '@astrojs/preact';
import { defineConfig } from 'astro/config'

export default defineConfig({
  site: "https://mith-static.netlify.app",
  integrations: [
    preact()
  ],
  vite: {},
});