import { resolve } from 'path'

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'src/lib/index.ts'),
      name: 'StepperHook',
      // the proper extensions will be added
      fileName: 'stepper-hook',
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'JSXRuntime',
        },
      },
    },
  },
  plugins: [
    react(),
    dts({
      tsconfigPath: resolve(__dirname, 'tsconfig.app.json'),
      rollupTypes: true,
    }),
  ],
})
