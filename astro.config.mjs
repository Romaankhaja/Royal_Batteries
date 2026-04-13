import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://royalbatteries.netlify.app',
  integrations: [
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date('2026-04-12'),
      filter: (page) => !page.includes('/assets/'),
    }),
  ],
  devToolbar: {
    enabled: false,
  },
  output: 'static',
  compressHTML: true,
  build: {
    assets: '_assets',
  },
  vite: {
    build: {
      cssMinify: true,
    },
  },
});
