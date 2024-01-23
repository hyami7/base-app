import { defineConfig, loadEnv } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import qiankun from 'vite-plugin-qiankun'
import { name } from './package.json'

const pathResolve = (dir) => {
  return resolve(__dirname, '.', dir)
}

export default defineConfig((mode) => {
  const { VITE_PORT, VITE_BASE_PATH, VITE_PROXY_URL } = loadEnv(mode, process.cwd())
  return {
    base: VITE_BASE_PATH,
    plugins: [
      vue(),
      qiankun(name, {
        useDevMode: true,
      }),
    ],
    resolve: {
      alias: {
        '@': pathResolve('./src/'),
      },
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/styles/element/index.scss" as *;@import "@/styles/variables.scss";@import "@/styles/mixin.scss";`,
        },
      },
    },
    server: {
      host: '0.0.0.0',
      port: parseInt(VITE_PORT),
      origin: '//localhost:' + parseInt(VITE_PORT),
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      proxy: {
        '/api': {
          target: 'http://localhost:3500',
          rewrite: (path) => path.replace(/^\/api/, ''),
          changeOrigin: true,
        },
      },
    },
  }
})
