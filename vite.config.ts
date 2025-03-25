import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import terser from '@rollup/plugin-terser';
import {resolve} from "path"

const isProduction = process.env.NODE_ENV === 'production';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxImportSource: "@emotion/react",
      babel: {plugins: ["@emotion/babel-plugin"]}
    }),
    isProduction && terser() // 只在生产环境下使用 terser 压缩
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      path: "path-browserify",
    },
    extensions: [".ts", ".tsx", ".js", "jsx"]
  },
  // base: '/MusicTheoryCalculatorPro/',
  base: './',
  build: {
    outDir: "docs",
    minify: isProduction,
    assetsInlineLimit: 4096, // 小于此阈值的导入或引用资源将内联为 base64 编码
    rollupOptions: {
      output: {
        chunkFileNames: 'assets/js/[name].js',
        entryFileNames: 'assets/js/[name].js',
        assetFileNames: 'assets/[ext]/[name]-[extname]',

        // 将第三方依赖库单独打包成一个文件
        manualChunks: {
          react: ['react', 'react-dom', 'react-use'],
          baseTool: ['lodash', 'ramda', 'ahooks'],
        }
      }
    },
    commonjsOptions: {
      exclude: ['ckeditor/*'],
    },
  }
})
