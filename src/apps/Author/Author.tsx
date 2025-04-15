/* eslint-disable no-mixed-spaces-and-tabs */
import WebAddrCard from "@/apps/Aboout/comps/WebAddrCard.tsx";
import cssFunctions from "@/assets/styles/cssFunctions.ts";
import {css} from "@emotion/react";
import useGlobalSettings from "@/assets/stores/useGlobalSettings.ts";
import cssPresets from "@/assets/styles/cssPresets.ts";
import {range} from "lodash"
import github_logo from "./icons/github_logo.svg"
import email from "./icons/at.svg"
import bilibili from "./icons/bilibili.svg"
import wechat from "./icons/wechat.svg"
import alipay from "./icons/alipay.svg"
import wechat_pay from "./icons/wechat_pay.svg"
import logo from "@/assets/svgs/logos/authorLogo.svg"
import googleColors from "@/assets/colors/googleColors.ts";
import {GiOgre} from "react-icons/gi";
import shadowPresets from "@/assets/styles/shadowPresets.ts";
import toast, {Toaster} from 'react-hot-toast';

const cardW = "230px"
const ma = {
	marginLeft: "auto", marginRight: "auto", userSelect: "none", paddingLeft: 15, paddingRight: 15, paddingTop: 5,
	paddingBottom: 5,
}
const Author = () => {
	const {naviBarHeight} = useGlobalSettings()
	return <>
		<Toaster/>
		<div css={Author_css(naviBarHeight)}>
			<div className="i">
				<div className="avatar">
					<img src={logo} alt=""/>
				</div>
				<div style={{
					...ma as any,
					fontSize: 18,
					marginTop: 10,
					backgroundColor: googleColors.blue50,
					width: "fit-content",
					borderRadius: 999,
					color: googleColors.blue800,
				}}>@方块郭
				</div>
				<div className="tags">
					<div>1996</div>
					<div>水瓶座</div>
					<div>INTP</div>
					<div>上班族</div>
					<div>宅男</div>
					<div>编程爱好者</div>
					<div>音乐爱好者</div>
					<div>设计爱好者</div>
					<div>桌游爱好者</div>
					<div>DIY爱好者</div>
				</div>
				<div className="intro_content">
					<div className="intro">
						<WebAddrCard
							w={cardW}
							img={github_logo}
							url={"https://github.com/guohub8080"} title={"GitHub主页"}/>
					</div>
					<div className="intro">
						<WebAddrCard
							w={cardW}
							img={email}
							url={"guohub@foxmail.com"} title={"电子邮箱"}/>
					</div>
					<div className="intro">
						<WebAddrCard
							w={cardW}
							img={bilibili}
							url={"https://space.bilibili.com/8163674"}
							showText={"@方块郭"} title={"哔哩哔哩"}/>
					</div>
					<div className="intro">
						<WebAddrCard
							w={cardW}
							img={wechat}
							url={"http://weixin.qq.com/r/BBNaQrHEruzRrfUh90YW"}
							copyContent={"方块郭"}
							showText={"@方块郭"} title={"微信公众号"}/>
					</div>
					<div className="intro">
						<WebAddrCard
							w={cardW}
							img={alipay}
							url={"https://qr.alipay.com/fkx16439yxwltuo2rxnqj18"}
							showText={":-)"} copyInfo={"感谢你"} title={"支付宝打赏/赞助"}/>
					</div>
					<div className="intro">
						<WebAddrCard
							w={cardW}
							img={wechat_pay}
							url={"wxp://f2f0MibAJTl2ighTKO4kQxYlVo_16ZcD1S4faxXIHwTTN3o"}
							showText={":-)"} copyInfo={"感谢你"} title={"微信打赏/赞助"}/>
					</div>
				</div>
				<div style={{
					fontSize: 14,
					color: googleColors.gray400,
					marginTop: 140,
					marginBottom: 180
				}}>
					<div>每天过得都一样，</div>
					<div>偶尔会突发奇想。</div>
				</div>
			</div>
		</div>
	</>
}

export default Author

const Author_css = (naviBarHeight: number) => css({
	width: "100%",
	height: `calc(100vh - ${naviBarHeight}px)`,
	overflow: "hidden",
	...cssPresets.flexCenter,
	"& .i": {
		height: "calc(100% - 50px)",
		borderRadius: 10,
		backgroundColor: "white",
		width: "100%",
		maxWidth: 600,
		marginLeft: 25,
		marginRight: 25,
		overflowY: "auto",
		scrollBehavior: "smooth",
		scrollbarGutter: "stable",
		"& .avatar": {
			width: 70,
			height: 70,
			marginLeft: "auto",
			marginRight: "auto",
			marginTop: 45,
			marginBottom: 10,
			filter: "drop-shadow(0px 3px 10px rgba(0, 0, 0, 0.17))",
			"&>img": {
				width: "100%",
				height: "100%",
				objectFit: "contain"
			}
		},
		"& .tags": {
			...cssPresets.flexCenter,
			marginTop: 15,
			marginBottom: 25,
			...cssFunctions.px(15),
			gap: 10,
			flexWrap: "wrap",
			"&>div": {
				paddingTop: 5,
				paddingBottom: 5,
				paddingLeft: 15,
				paddingRight: 15,
				width: "fit-content",
				backgroundColor: googleColors.gray50,
				borderRadius: 999,
				color: googleColors.blueGray700,
				border: `1px solid ${googleColors.gray300}`,

				fontSize: 14
			}
		},
		"& .intro": {
			...cssPresets.flexCenter,
			flexWrap: "wrap",
			marginTop: 5,
			marginBottom: 5,
			gap: 15,
			"& .cap": {
				width: 220,
				height: 100,
				backgroundColor: "white",
				...cssPresets.flexCenter,
				flexDirection: "column",
				borderRadius: 8,
				border: `1px solid ${googleColors.gray300}`,
				boxShadow: shadowPresets.sm,
				"& .title": {
					fontSize: 18,
					color: googleColors.blue600,
					width: 120,
					paddingLeft: 15,
					paddingRight: 15,
					marginLeft: "auto",
					marginRight: "auto",
					marginBottom: 3,
					// borderBottom:`8px solid ${googleColors.blue800}`
				},
				"& .content": {
					marginLeft: "auto",
					marginRight: "auto",
					...ma as any,
					width: "fit-content",
					backgroundColor: "white",
					borderRadius: 999,
					color: googleColors.blue800,
					background: googleColors.blue50,
					border: `1px solid ${googleColors.blue500}`,
					marginTop: 5
				}
			}
		},
		"& .intro_content": {
			flexWrap: "wrap",
			...cssPresets.flexCenter,
			gap: 5,
		}
	}
})
