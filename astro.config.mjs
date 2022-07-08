//@ts-check

import preact from '@astrojs/preact';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config'

export default defineConfig({
  site: "https://mith-static.netlify.app",
  integrations: [
    preact(),
		tailwind()
  ],
  vite: {},
});