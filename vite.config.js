import { defineConfig } from 'vite';
import eslintPlugin from 'vite-plugin-eslint';
import stylelintPlugin from 'vite-plugin-stylelint';

export default defineConfig({
  plugins: [
    eslintPlugin(),
    stylelintPlugin(),
  ],
  server: {
    hmr: false, // Completely disable HMR
  },
});
