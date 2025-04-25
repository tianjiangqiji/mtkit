import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import terser from '@rollup/plugin-terser';
import {resolve} from "path"
import svgr from 'vite-plugin-svgr' // 处理 SVG 为组件

const isProduction = process.env.NODE_ENV === 'production';
const isGitHubPages = process.env.VITE_GITHUB_PAGES === 'true';
if (isGitHubPages) {
	console.log("GitHub Pages 模式下，base 为 /mtkit/")
}
// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react({
			jsxImportSource: "@emotion/react",
			babel: {plugins: ["@emotion/babel-plugin"]}
		}),
		svgr(),
		isProduction && terser({
			format: {
				comments: false
			},
			mangle: {
				toplevel: true
			}
		}), // 只在生产环境下使用 terser 压缩
	],
	optimizeDeps: {
		include: ['react', 'react-dom']
	},
	resolve: {
		alias: {
			"@": resolve(__dirname, "src"),
			path: "path-browserify",
		},
		extensions: [".ts", ".tsx", ".js", "jsx"]
	},
	publicDir: resolve(__dirname, 'public'), // 绝对路径确保准确性
	base: './',
	build: {
		outDir: "docs",
		copyPublicDir: true,
		terserOptions: {
			compress: {
				drop_console: true,
				drop_debugger: true,
			},
		},
		minify: true,
		assetsInlineLimit: 4096, // 小于此阈值的导入或引用资源将内联为 base64 编码
		rollupOptions: {
			output: {
				chunkFileNames: 'scripts/[name].js',
				entryFileNames: 'main.js',
				assetFileNames: 'assets/[ext]/[name][extname]',
				// 将第三方依赖库单独打包成一个文件
				// 核心：按文件夹分块（新增 music12 分块）
				manualChunks: (id) => {
					// 1. 第三方依赖分块（原有逻辑）
					if (id.includes('node_modules')) {
						if (id.includes('react')) {
							return 'react';
						} else if (id.includes('lodash') || id.includes('ramda') || id.includes("zustand")) {
							return 'base_tool';
						} else if (id.includes("hook")) {
							return 'hooks'
						} else if (id.includes("jzz")) {
							return "jzz"
						} else if (id.includes("antd")) {
							return "antd"
						} else if (id.includes("gsap") || id.includes("svg")) {
							return "motion"
						} else if (id.includes("music") || id.includes("vexflow") || id.includes("midi")) {
							return "music"
						}
						return "other_modules"
						// 2. 自定义文件夹分块（新增：匹配 src/music12 文件夹）
						// 注意：路径需与项目实际结构一致，这里假设是 src/music12/ 开头
					} else if (id.includes('src/music12/')) {
						return 'music12'; // 分块名为 music12，输出为 music12.js
					}
				},

			}
		},
		commonjsOptions: {
			exclude: ['ckeditor/*'],
		},
	}
})
