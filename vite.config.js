import { defineConfig, loadEnv } from "vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";

const pathResolve = (dir) => {
  return resolve(__dirname, ".", dir);
};

export default defineConfig((mode) => {
  const { VITE_PORT, VITE_BASE_PATH, VITE_PROXY_URL } = loadEnv(
    mode,
    process.cwd()
  );
  return {
    base: VITE_BASE_PATH,
    plugins: [vue()],
    resolve: {
      alias: {
        "@": pathResolve("./src/"),
      },
      extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"],
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/styles/element/index.scss" as *;@import "@/styles/variables.scss";@import "@/styles/mixin.scss";`,
        },
      },
    },
    server: {
      host: "0.0.0.0",
      port: parseInt(VITE_PORT),
      proxy: {
        "/api": {
          target: "http://localhost:3500",
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
  };
});
