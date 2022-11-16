import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  assetsInclude: ["!*/assets/icons/*"],
  build: {
    lib: {
      entry: 'src/index.ts',
      formats: ['es', 'cjs', 'umd', 'iife'],
      fileName: 'index',
      name: 'cta.components'

    },
    rollupOptions: {
      external: [/^lit/, 'assets/icons'],
      output: {
        // Since we publish our ./src folder, there's no point
        // in bloating sourcemaps with another copy of it.
        sourcemapExcludeSources: true,
      },
    },
    sourcemap: true,
    minify: false,
  }
})
