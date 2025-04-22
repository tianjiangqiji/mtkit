/* eslint-disable no-mixed-spaces-and-tabs */
import MobileScalePlay from "@/apps/MobileScaleOverview/parts/MobileScalePlay.tsx";
import useScaleInstance from "@/apps/TabletScaleQuery/useTabletScaleQuery/useScaleInstance.tsx";
import {css} from "@emotion/react";
import React, {useEffect} from "react";
import useIsWideScreen from "@/utils/useIsWideScreen.tsx";
import useGlobalSettings from "@/assets/stores/useGlobalSettings.ts";
import {useNavigate} from "react-router-dom";
import routerPath from "@/router/routerPath.ts";
import NotePicker from "@/components/reNote/NotePicker/NotePicker.tsx";
import ScalePickerPopover from "@/apps/TabletScaleQuery/comps/ScalePicker/ScalePickerPopover.tsx";
import TabletScalePickerWindow from "@/apps/TabletScaleQuery/comps/ScalePicker/TabletScalePickerWindow.tsx";
import {useWindowSize} from "react-use";
import MobileScaleTable from "@/apps/MobileScaleOverview/parts/MobileScaleTable.tsx";
import MobileScaleStave from "@/apps/MobileScaleOverview/parts/MobileScaleStave.tsx";
import MobileScalePiano from "@/apps/MobileScaleOverview/parts/MobileScalePiano.tsx";
import MobileScaleTableConfigPopover from "@/apps/MobileScaleOverview/components/MobileScaleTableConfigPopover.tsx";
import MobileScaleStaveConfigPopover from "@/apps/MobileScaleOverview/components/MobileScaleStaveConfigPopover.tsx";
import {Swiper} from "antd-mobile";

const pickerHeight = 85
const eachScreenGap = 20
const MobileScaleOverview = () => {

	const isWideScreen = useIsWideScreen();
	const {naviBarHeight} = useGlobalSettings();
	const navigate = useNavigate()
	const {width, height} = useWindowSize()
	const {scaleInstance} = useScaleInstance()
	// 如果是移动端，自动跳转
	useEffect(() => {
		if (isWideScreen) {
			navigate(`/${routerPath.tablet_scaleQuery}`, {replace: true})
		}
	}, [isWideScreen, navigate])


	return <>
		<NotePicker/>
		<ScalePickerPopover/>
		<MobileScaleTableConfigPopover/>
		<MobileScaleStaveConfigPopover/>
		<div css={MobileScaleTable_css(width, eachScreenGap, naviBarHeight, pickerHeight, height)}>
			<div className="picker_window">
				<TabletScalePickerWindow/>
			</div>
			<div className="main_frame">
				<Swiper
					loop={true}
					style={{height: "100%", width: "100%", userSelect: "none"}}
					indicatorProps={{
						style: {
							'--dot-size': '10px',
							'--active-dot-size': '30px',
							'--dot-border-radius': '100%',
							'--active-dot-border-radius': '15px',
							'--dot-spacing': '18px',
						}
					}}>
					<Swiper.Item key={0}>
						<MobileScaleTable/>
					</Swiper.Item>
					{!scaleInstance.isTonicReplaced && <Swiper.Item key={1}>
						<MobileScaleStave/>
					</Swiper.Item>}
					{!scaleInstance.isTonicReplaced && <Swiper.Item key={2}>
						<MobileScalePiano/>
					</Swiper.Item>}
					{!scaleInstance.isTonicReplaced && <Swiper.Item key={3}>
						<MobileScalePlay/>
					</Swiper.Item>}
				</Swiper>
			</div>
		</div>
	</>
}

export default MobileScaleOverview

const MobileScaleTable_css = (width: number, eachScreenGap: number,
                              naviBarHeight: number, pickerHeight: number, h: number) => css({
	"& .picker_window": {
		display: "flex",
		justifyContent: "center",
		alignItems: "end",
		height: h < 750 ? 85 : (h - naviBarHeight) * 0.2,
		width: "100%",
	},
	"& .main_frame": {
		width: width,
		minWidth: width,
		display: "flex",
		justifyContent: "center",
		alignItems: "start",
		height: h < 750 ? `calc( 100vh - ${naviBarHeight}px - ${eachScreenGap}px - 85px  )`
			: (h - naviBarHeight) * 0.8 - eachScreenGap,
		// overflowX: "auto",
		// backgroundColor: "red",
		// scrollSnapType: "x mandatory",
		// scrollBehavior: "smooth",

	}
})
