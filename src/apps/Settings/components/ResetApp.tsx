/* eslint-disable no-mixed-spaces-and-tabs */
import googleColors from "@/assets/colors/googleColors.ts";
import useGlobalSettings from "@/assets/stores/useGlobalSettings.ts";
import UseResetAllStores from "@/assets/stores/useResetAllStores.tsx";
import cssPresets from "@/assets/styles/cssPresets.ts";
import {css} from "@emotion/react";
import {DotLoading, SpinLoading} from "antd-mobile";
import {random} from "lodash";
import {useState} from "react";
import toast from "react-hot-toast";
import delay from "delay";
import {useNavigate} from "react-router-dom";

const ResetApp = (props: {}) => {
	const {resetAll} = UseResetAllStores()
	const {setNaviWindowOpen} = useGlobalSettings()
	const [isLoading, setIsLoading] = useState(false)
	const navigate = useNavigate()
	const reset = () => {
		if (isLoading) return;
		setIsLoading(true)
		delay(random(1000, 2200)).then(() => {
			resetAll()
			toast.success('重置成功，即将自动刷新', {position: "top-center"});
			setIsLoading(false)
			delay(2000).then(() => {
				//自动刷新
				navigate(0)
			})
		})
	}
	return <>
		<div css={ResetApp_css}>
			<div className="reset_desc">
				<span style={{whiteSpace: "nowrap"}}>如果该项目出现问题，</span>
				<span style={{whiteSpace: "nowrap"}}>可通过重置按钮</span>
				<span style={{whiteSpace: "nowrap"}}>恢复到初始状态。</span>
			</div>
			<div className="btn" onClick={reset}>
				{isLoading &&
					<div style={{...cssPresets.flexCenter, gap: 10}}>
						<SpinLoading style={{width: 20, height: 20}} color={"#fff"}/>
						<div>重置中</div>
					</div>}
				{!isLoading && <span>重置应用</span>}
			</div>
		</div>
	</>
}

export default ResetApp

const ResetApp_css = css({
	width: "100%",
	backgroundColor: "white",
	borderRadius: 8,
	height: 150,
	userSelect: "none",
	...cssPresets.flexCenter,
	flexDirection: "column",
	marginTop: 15,
	"& .reset_desc": {
		fontSize: 14,
		color: googleColors.gray400,
		userSelect: "none",
		marginLeft: 40,
		marginRight: 40,
	},
	"& .btn": {
		width: 125,
		height: 45,
		userSelect: "none",
		...cssPresets.flexCenter,
		backgroundColor: googleColors.red300,
		borderRadius: 999,
		fontSize: 16,
		marginTop: 15,
		cursor: "pointer",
		...cssPresets.transition,
		color: googleColors.red50,
		"&:hover": {
			backgroundColor: googleColors.red400,
		},
		"&:active": {
			backgroundColor: googleColors.red800,
		},
	}
})
