import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// `base: './'` makes every asset path relative, so the same `dist/` folder
// works on GitHub Pages (username.github.io/repo/) and at a domain root.
export default defineConfig({
  plugins: [vue()],
  base: './',
})
