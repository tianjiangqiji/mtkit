/* eslint-disable no-mixed-spaces-and-tabs */
import googleColors from "@/assets/colors/googleColors.ts";
import cssFunctions from "@/assets/styles/cssFunctions.ts";
import cssPresets from "@/assets/styles/cssPresets.ts";
import byDefault from "@/utils/byDefault.ts";
import {css} from "@emotion/react";
import {QRCodeSVG} from 'qrcode.react';
import toast from "react-hot-toast";
import {useWindowSize} from "react-use";
import copy from 'copy-to-clipboard';

const WebAddrCard = (props: {
	url: string
	title: string
	w?: string
}) => {
	const w = byDefault(props.w, "260px")
	const handClick = () => {
		const copyResult = copy(props.url);
		if (copyResult) {
			toast.success('复制成功');
		} else {
			toast.error('复制失败，请检查当前浏览环境');
		}
	}
	return <div css={wide_css(w)} onClick={handClick}>
		<QRCodeSVG
			value={props.url}
			title={"GitHub"}
			size={128}
			bgColor={"#ffffff"}
			fgColor={"#000000"}
			level={"M"}
		/>
		<div className="right">
			<div className="title">{props.title}</div>
			<div className="addr">{props.url}</div>
		</div>
	</div>
}

export default WebAddrCard


const wide_css = (w:string)=>css({
	width: w,
	maxWidth:300,
	paddingTop: 25,
	paddingBottom: 25,
	borderRadius: 8,
	...cssPresets.defaultHoverAndActive as any,
	...cssPresets.flexCenterColumn as any,
	"& .right": {
		...cssPresets.flexCenterColumn as any,
		"& .title": {
			fontSize: 14,
			// borderLeft: `5px solid ${googleColors.blue800}`,
			...cssFunctions.px(15),
			...cssFunctions.py(4),
			borderRadius: 999,
			marginBottom: 8,
			color: googleColors.blue800,
			marginTop: 15,
			backgroundColor: googleColors.blue50
		},
		"& .addr": {
			color: googleColors.gray800,
			...cssFunctions.px(10),
			...cssFunctions.py(4),
			borderRadius: 5,
			fontSize: 12,
			wordBreak: "break-all",
			backgroundColor: googleColors.gray50,
			border: `1px solid ${googleColors.gray300}`,
		}
	}
})
