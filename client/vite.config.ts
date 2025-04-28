import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import topLevelAwait from "vite-plugin-top-level-await";
import wasm from "vite-plugin-wasm";
import fs from "fs";
import path from "path";

// Check if certificate files exist
const keyPath = "mkcert+1-key.pem";
const certPath = "mkcert+1.pem";
const hasHttpsCerts = fs.existsSync(keyPath) && fs.existsSync(certPath);

export default defineConfig({
    server: {
        port: 5174,
        host: "0.0.0.0",
        https: hasHttpsCerts ? {
            key: fs.readFileSync(keyPath),
            cert: fs.readFileSync(certPath),
        } : false,
    },
    plugins: [react(), wasm(), topLevelAwait()],
    resolve: {
      alias: {
        "@assets": path.resolve(__dirname, "src/assets"),
      },
    },
});
