/* eslint-disable no-mixed-spaces-and-tabs */
import ScaleNotesTable from "@/apps/TabletScaleQuery/comps/ScaleNotesTable.tsx";
import ScalePlayer from "@/apps/TabletScaleQuery/comps/ScalePlayer.tsx";
import useScaleInstance from "@/apps/TabletScaleQuery/useTabletScaleQuery/useScaleInstance.tsx";
import cssPresets from "@/assets/styles/cssPresets.ts";
import OctavePiano from "@/components/rePiano/OctavePiano.tsx";
import RoughStaveClefAndScale from "@/components/reStave/StaveWindow/RoughStaveClefAndScale.tsx";
import {css} from "@emotion/react";
import React from "react";

const QueryScaleByNote = () => {
	const {scaleInstance, keys, slicedLocationList, colorList, nodeList, notesList} = useScaleInstance()

	//谱号以及切换谱号
	const [clef, setClef] = React.useState("G")
	const changeClef = () => {
		if (clef === "G") return setClef("C")
		if (clef === "C") return setClef("F")
		if (clef === "F") return setClef("G")
		setClef("G")
	}


	// 默认的钢琴键盘配置
	const pianoConfig = {
		whiteKeyWidth: 34,
		whiteKeyHeight: 95,
		blackKeyBorderWidth: 2,
		whiteKeyBorderRadius: Array.from({length: 7}, () => [0, 0, 5, 5])
	}

	return <div css={QueryScaleByAlters_css}>
		<ScalePlayer/>
		<ScaleNotesTable/>
		{!scaleInstance.isTonicReplaced && <>
			<RoughStaveClefAndScale
				keys={keys} clef={clef}
				notesList={notesList}
				onClick={changeClef}/>
			<div className="piano_frame">
				<OctavePiano config={{...pianoConfig, keyBgColorList: colorList[0]}} keyNodeList={nodeList[0]}
				             isPureDisplay={true}/>
				<OctavePiano config={{...pianoConfig, keyBgColorList: colorList[1]}}
				             keyNodeList={nodeList[1]}
				             ml={-2} isPureDisplay={true}/>
			</div>
		</>}
	</div>
}

export default QueryScaleByNote


const QueryScaleByAlters_css = css({
	"& .piano_frame": {
		marginLeft: "auto",
		marginRight: "auto",
		...cssPresets.flexCenter,
		marginTop: 20
	}
})
