//@ts-check

export default /** @type {import('astro').AstroUserConfig} */ ({
    buildOptions: {
        site: "https://mith-static.netlify.app",
    },
    renderers: [
    //   '@astrojs/renderer-svelte',
    //   '@astrojs/renderer-vue',
    //   '@astrojs/renderer-react',
      '@astrojs/renderer-preact',
    ],
    vite: {},
  });