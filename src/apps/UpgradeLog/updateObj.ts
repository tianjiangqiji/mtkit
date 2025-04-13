// noinspection ES6PreferShortImport

const updateObj: {
	v: string,
	data: string[]
}[] = [
	{
		v: "更早",
		data: ["增加了「更新记录」模块。"]
	},
	{
		v: "147.2.1",
		data: ["更新了readme.md，替换了默认的意义不清的文档。", "明确了全部部署地址：GitHub Pages、Cloudfare Pages、Vercel、Netlify。"]
	},
	{
		v: "148.0.1",
		data: ["修复了在宽屏状态下，由于浏览器缩放比例不为“100%”时可能导致的导航错乱问题。",
			"域名mtkit.top已通过ICP备案，通过腾讯云EdgeOne Pages服务部署，已同步更新至GitHub仓库资料页。",
			"新增乐理计算模块music12.js引导GitHub仓库页面。",
			"新增设置界面（仅新增占位格子，内容待更新）。"]
	},
	{
		v: "148.0.2",
		data: [
			"美化了「关于作者」模块的内容，新增二维码引导。",
			"新增了「关于作者」模块中打赏的页面。",
			"修复了「更新记录」模块卡片可能的顺序错误（useMemo依赖问题）。",
			"修复了「音程查询」模块中宽屏音程上下行颠倒显示的Bug。",
		]
	},
]

export default updateObj
