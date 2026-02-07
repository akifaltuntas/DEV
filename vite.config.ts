
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // GitHub Pages'te düzgün çalışması için './' veya '/repo-adi/' gereklidir.
  // './' kullanımı çoğu durumda en güvenli yoldur.
  base: './',
  define: {
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY)
  }
});
