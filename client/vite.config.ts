import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import topLevelAwait from "vite-plugin-top-level-await";
import wasm from "vite-plugin-wasm";
import fs from "fs";
import path from 'path';

export default defineConfig({
       server: {
        port: 5174,
      },
    plugins: [react(), wasm(), topLevelAwait()],
    resolve: {
      alias: {
        "@assets": path.resolve(__dirname, "src/assets"),
      },
    },
});
