import { defineConfig } from 'vite';

export default defineConfig({
    base: './RayliKosegen/index.html', // Define base path as relative for GitHub Pages compatibility
    build: {
        outDir: 'dist',
        assetsDir: 'assets',
    }
});
