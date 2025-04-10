/* eslint-disable no-mixed-spaces-and-tabs */
import cssPresets from "@/assets/styles/cssPresets.ts";
import {css} from "@emotion/react";

const UpgradeLog = (props: {}) => {
	return <>
		<div css={UpgradeLog_css}>
			施工中...
		</div>
	</>
}

export default UpgradeLog

const UpgradeLog_css = css({
	...cssPresets.flexCenter
})
