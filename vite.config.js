import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // Set base to './' so assets load correctly on GitHub Pages
  base: './',
  plugins: [
    react(),
    tailwindcss(),
  ],
})
