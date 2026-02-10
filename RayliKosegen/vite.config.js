import { defineConfig } from 'vite';

export default defineConfig({
  base: './', // Define base path as relative for GitHub Pages compatibility
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
});
