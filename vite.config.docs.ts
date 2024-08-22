import { resolve } from 'path'

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/react-use-stepper/',
  build: {
    outDir: resolve(__dirname, 'dist-docs'),
  },
  plugins: [react()],
})
