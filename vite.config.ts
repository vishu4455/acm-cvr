import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // tsconfig.json's "paths" only affects type-checking — Vite's actual
      // bundler needs its own alias, which this was missing entirely.
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      output: {
        // Keep the animation stack in its own chunk so
        // RegistrationsPage/GalleryPage never pull it in.
        manualChunks: {
          'gsap-vendor': ['gsap'],
        },
      },
    },
  },
});
