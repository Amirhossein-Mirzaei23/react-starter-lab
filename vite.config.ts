import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import tsconfigPaths from 'vite-tsconfig-paths';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    tsconfigPaths(),
    VitePWA({
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'sw.js',

      manifest: {
        id: '/',
        name: 'هم‌خرج | مدیریت و تقسیم هزینه‌های گروهی',
        short_name: 'هم‌خرج',

        description:
          'هم‌خرج اپلیکیشنی برای ثبت، تقسیم و تسویه هوشمند هزینه‌های گروهی؛ مناسب سفر، خانواده و دوستان.',

        lang: 'fa',
        dir: 'rtl',

        start_url: '/',
        scope: '/',

        display: 'standalone',
        orientation: 'portrait-primary',

        background_color: '#ffffff',
        theme_color: '#16a34a', // هماهنگ با برند (سبز پیشنهادی)

        categories: ['finance', 'productivity', 'utilities'],

        prefer_related_applications: false,

        icons: [
          {
            src: '/icons/logo-bg-192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/icons/logo-bg-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/icons/logo-bg-192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'maskable',
          },
          {
            src: '/icons/logo-bg-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },

      workbox: {
        globPatterns: ['**/*.{js,css,ico,png,svg,webp}'],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true,
      },

      devOptions: {
        enabled: true,
      },
    }),

    // VitePWA({
    //   strategies: 'injectManifest', // برای کنترل کامل SW
    //   srcDir: 'src',
    //   filename: 'sw.js',

    //   manifest: {
    //     name: 'هم‌خرج',
    //     short_name: 'PWA App',
    //     start_url: '/',
    //     display: 'standalone',
    //     background_color: '#ffffff',
    //     theme_color: '#000000',
    //     icons: [
    //       {
    //         src: 'logo.png',
    //         sizes: '192x192',
    //         type: 'image/png',
    //       },
    //       {
    //         src: 'logo.png',
    //         sizes: '512x512',
    //         type: 'image/png',
    //         purpose: 'any maskable',
    //       },
    //     ],
    //   },
    //   workbox: {
    //     globPatterns: ['**/*.{js,css,html,png,svg}'],
    //   },
    // }),
  ],
  resolve: {
    alias: {
      '@/*': path.resolve(__dirname, './src'),
      '~/*': path.resolve(__dirname, './'),
    },
  },
  server: {
    port: 5173,
    open: true,
    allowedHosts: ['nonsyndicated-phenomenally-bodhi.ngrok-free.dev'],
    headers: {
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
    },
  },
  build: {
    sourcemap: true,
    outDir: 'dist',
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
  },
});
