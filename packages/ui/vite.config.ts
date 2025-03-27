import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import svgr from "vite-plugin-svgr";
import { resolve } from "path";

export default defineConfig({
  plugins: [
    react(),
    svgr(),
    dts({
      include: ["src"],
      insertTypesEntry: true,
    }),
  ],
  build: {
    outDir: "dist",
    sourcemap: true,
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "UIEcommerce",
      formats: ["es", "umd"],
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      input: resolve(__dirname, "src/index.ts"),
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
        assetFileNames: (assetInfo) => {
          if (
            assetInfo.name === "style.css" ||
            assetInfo.name.endsWith(".css")
          ) {
            return "style.css";
          }
          return assetInfo.name;
        },
      },
    },
    cssCodeSplit: false,
  },

  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
});
