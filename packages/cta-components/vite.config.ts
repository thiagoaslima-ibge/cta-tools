import path from "node:path";
import { defineConfig } from "vite";
import postcssLit from "rollup-plugin-postcss-lit";

// https://vitejs.dev/config/
export default defineConfig({
  assetsInclude: ["!*/assets/icons/*"],
  plugins: [postcssLit()],
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "./src/components"),
      "@controllers": path.resolve(__dirname, "./src/controllers"),
      "@lib": path.resolve(__dirname, "./src/lib"),
    },
  },
  build: {
    lib: {
      entry: "src/index.ts",
      formats: ["es", "cjs", "umd", "iife"],
      fileName: "index",
      name: "cta.components",
    },
    rollupOptions: {
      external: [/^lit/, "assets/icons"],
      output: {
        // Since we publish our ./src folder, there's no point
        // in bloating sourcemaps with another copy of it.
        sourcemapExcludeSources: true,
      },
    },
    sourcemap: true,
    minify: false,
  },
});
