/* eslint-disable no-mixed-spaces-and-tabs */
import UpdateCard from "@/apps/UpgradeLog/components/UpdateCard.tsx";
import useGlobalSettings from "@/assets/stores/useGlobalSettings.ts";
import cssFunctions from "@/assets/styles/cssFunctions.ts";
import cssPresets from "@/assets/styles/cssPresets.ts";
import {css} from "@emotion/react";
import {range} from "lodash";
import updateObj from "@/apps/UpgradeLog/updateObj.ts";
import {useMemo} from "react";

const UpgradeLog = () => {
	const {naviBarHeight} = useGlobalSettings()
	const upd = useMemo(() => updateObj.reverse(), [updateObj])
	return <>
		<div css={UpgradeLog_css(naviBarHeight)}>
			{upd.map((x, y) => <div
				style={{width: "100%", ...cssPresets.flexCenter}}
				key={y}>
				<UpdateCard v={x.v} data={x.data}/>
			</div>)}
		</div>
	</>
}

export default UpgradeLog

const UpgradeLog_css = (h: number) => css({
	paddingTop: 20,
	paddingBottom: 50,
	...cssFunctions.px(25),
	...cssPresets.flexCenterTopColumn as any, gap: 25,
	width: "100%",
	height: `calc(100vh - ${h}px)`,
	overflowY: "auto",
})
