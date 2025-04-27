/* eslint-disable no-mixed-spaces-and-tabs */
import useGlobalSettings from "@/assets/stores/useGlobalSettings.ts";
import cssFunctions from "@/assets/styles/cssFunctions.ts";
import NoteText from "@/components/reNote/NoteText/NoteText.tsx";
import routerPath from "@/router/routerPath.ts";
import {css} from "@emotion/react";
import {useEffect, useMemo, useState} from "react";
import useFindChordConfig from "@/assets/stores/useFindChordConfig.ts";
import {isEmpty, isNull, isNumber, isUndefined, min, range, sum} from "lodash";
import NoteByLocation from "@/components/reNote/NoteByLocation/NoteByLocation.tsx";
import googleColors from "@/assets/colors/googleColors.ts";
import cssPresets from "@/assets/styles/cssPresets.ts";
import * as music12 from "@/music12";
import NoResult from "@/apps/FindNotesWithInterval/components/NoResult.tsx";
import {Collapse} from "antd-mobile";
import OctavePiano from "@/components/rePiano/OctavePiano.tsx";
import {isMobile} from "react-device-detect";
import {useNavigate} from "react-router-dom";
import {useWindowSize} from "react-use";
import NumberNote from "@/components/reNote/NumberNote/NumberNote.tsx";
import useScaleConfig from "@/assets/stores/useScaleConfig.ts";
import MajorScaleSymbol from "@/apps/TabletScaleQuery/symbolSVG/MajorScaleSymbol.tsx";
import MinorScaleSymbol from "@/apps/TabletScaleQuery/symbolSVG/MinorScaleSymbol.tsx";
import HalfDimScaleSymbol from "@/apps/TabletScaleQuery/symbolSVG/HalfDimScaleSymbol.tsx";

const doNothing = () => {
}
const keyFontSize = 18
const ScaleSvg = (props: {
	mode: string
}) => {
	const {majorScaleBgColor, majorScaleStrokeColor, minorScaleBgColor, minorScaleStrokeColor, setMode} = useScaleConfig()

	if (props.mode === "major") return <MajorScaleSymbol
		color={majorScaleStrokeColor} fill={majorScaleBgColor}/>
	if (props.mode === "minor") return <MinorScaleSymbol
		color={minorScaleStrokeColor} fill={minorScaleBgColor}/>
	return <HalfDimScaleSymbol/>
}
const FindNotesOfScale = () => {
	const [activeKey, setActiveKey] = useState([])
	const {pianoKeyIntervalList} = useFindChordConfig()
	const {majorScaleBgColor, majorScaleStrokeColor, minorScaleBgColor, minorScaleStrokeColor, setMode} = useScaleConfig()
	const {setNotePickerStep, setNotePickerAlter} = useGlobalSettings()
	const navigate = useNavigate()
	useEffect(() => {
		setActiveKey([])
	}, [pianoKeyIntervalList])
	const findResult = useMemo(() => {
		const isBlank = sum(pianoKeyIntervalList.map(x => {
			if (isNull(x)) return 0
			if (isUndefined(x)) return 0
			if (isNumber(x) && x === 0) return 0
			return 1
		})) === 0
		if (isBlank) return []
		const findObj = pianoKeyIntervalList.map((x, y) => {
			if (isUndefined(x)) return;
			if (isNull(x)) return;
			if (isNumber(x) && x === 0) return;
			return {location: y, as: x as number}
		}).filter(Boolean)
		return music12.find.findNotesInScale(findObj)
	}, [pianoKeyIntervalList])
	const {width} = useWindowSize()
	const getKeyNode = (locationList: number[], modeKey: string) => {
		const emptyList = Array.from({length: 12}, () => void 0)
		const nl = music12.scale.getIntervalListByModeKey(modeKey)
		emptyList[locationList[0]] = <div css={node_css}>根</div>
		locationList.map((x, y) => {
			if (y === 0) return;
			const intervalNum = nl[y - 1][1] as number
			const intervalPrefix = nl[y - 1][0] as string
			if ([1, 4, 5, 8, 11, 12].includes(intervalNum)) {
				if (intervalPrefix === "p") {
					emptyList[x] = <div css={node_css}>{intervalNum}</div>
				} else if (intervalPrefix === "dim") {
					emptyList[x] = <div css={node_css}>
						<NumberNote num={intervalNum} alter={-1} fontSize={keyFontSize} color={"white"}/>
					</div>
				} else if (intervalPrefix === "aug") {
					emptyList[x] = <div css={node_css}>
						<NumberNote num={intervalNum} alter={1} fontSize={keyFontSize} color={"white"}/>
					</div>
				}
			} else {
				if (intervalPrefix === "maj") {
					emptyList[x] = <div css={node_css}>{intervalNum}</div>
				} else if (intervalPrefix === "min") {
					emptyList[x] = <div css={node_css}>
						<NumberNote num={intervalNum} alter={-1} fontSize={keyFontSize} color={"white"}/>
					</div>
				} else if (intervalPrefix === "dim") {
					emptyList[x] = <div css={node_css}>
						<NumberNote num={intervalNum} alter={-2} fontSize={keyFontSize} color={"white"}/>
					</div>
				} else if (intervalPrefix === "aug") {
					emptyList[x] = <div css={node_css}>
						<NumberNote num={intervalNum} alter={1} fontSize={keyFontSize} color={"white"}/>
					</div>
				}
			}
		})
		return emptyList
	}
	const getKeyColor = (locationList: number[]) => {
		const emptyList = Array.from({length: 12}, () => void 0)
		if (isEmpty(locationList)) return emptyList
		if (locationList.length === 0) return emptyList
		locationList.map((x, u) => {
			if (x === 0) return
			emptyList[u] = googleColors.amber200
		})
		return emptyList
	}

	const checkScaleDetail = (info: {
		step: string,
		alter: number,
		mode: string
	}) => {
		setMode(info.mode)
		setNotePickerStep(info.step)
		setNotePickerAlter(info.alter)
		navigate(`/${routerPath.mobile_scaleTable}`, {replace: true})
	}
	return <div css={FindOnlyChord_css}>
		{findResult.length === 0 && <NoResult/>}
		{findResult.length > 0 && <Collapse
			activeKey={activeKey}
			style={{width: "100%", maxWidth: 450, marginLeft: "auto", marginRight: "auto"}}>
			{findResult.map((x, y) => {
				return <Collapse.Panel
					key={`${y}`}
					onClick={() => {
						if (activeKey.includes(`${y}`)) {
							setActiveKey(activeKey.filter(x => x !== `${y}`))
						} else {
							setActiveKey([...activeKey, `${y}`])
						}
					}}
					style={{paddingLeft: 0, paddingTop: 0, paddingBottom: 0, padding: 0}}
					title={<div css={CollapsePanelItem_css}>
						<div className="order">{y + 1}</div>
						<div className="note_window"><NoteByLocation location={x.rootNoteLocation}/></div>
						<div className="scale_type">
							<div className="scale_type_f">
								<ScaleSvg mode={music12.scale.getModeTypeByModeKey(x.mode)}/>
							</div>
						</div>
						<div className="cn_name">
							{music12.scale.getModeNameByModeKey(x.mode)}
						</div>
					</div>}>
					<div style={{height: 190, ...cssPresets.flexCenter, flexDirection: "column"}} onDoubleClick={doNothing}
					     className="line" key={`${x.mode}_${x.rootNoteLocation}`}>
						<div>
							<OctavePiano
								isPureDisplay={true}
								keyNodeList={getKeyNode(x.notesLocationList, x.mode)}
								config={{
									keyBgColorList: getKeyColor(pianoKeyIntervalList as any),
									whiteKeyWidth: min([60, width / 7.5]),
									blackKeyWidthRatio: 0.8,
									whiteKeyBorderWidth: 2.5,
									blackKeyBorderWidth: 2.5,
									blackKeyBorderRadius: range(5).map(() => [0, 0, 6, 6]),
									whiteKeyHeight: 150,
								}}/>
						</div>

						<div className="navi_chord_frame">
							{music12
								.note
								.getNoteByLocation(x.rootNoteLocation)
								.map((m, y) => <div
									className="each_navi"
									onClick={() => checkScaleDetail({
										step: m.step,
										alter: m.alter,
										mode: x.mode
									})}
									key={y}>
									<NoteText step={m.step} alter={m.alter} color={googleColors.gray500} fontSize={16}/>
									<span>相关调式详情</span>
								</div>)}
						</div>
					</div>
				</Collapse.Panel>
			})}
		</Collapse>}
	</div>
}

export default FindNotesOfScale

const FindOnlyChord_css = css({
	width: "100%",
	paddingBottom: 50,
	"& .line:not(:first-of-type)": {
		borderTop: `1px solid ${googleColors.gray300}`
	},
	"& .line": {
		marginRight: "auto",
		marginLeft: "auto",
		width: "100%",
		maxWidth: 450,
		display: "flex",
		height: 40,
		"& .navi_chord_frame": {
			width: "100%",
			...cssPresets.flexCenter,
			marginTop: 10,
			gap: 20,
			"&>.each_navi": {
				backgroundColor: googleColors.gray50,
				border: `1px solid ${googleColors.gray300}`,
				height: 40,
				minHeight: 40,
				...cssPresets.flexCenter,
				...cssFunctions.px(15),
				borderRadius: 999,
				gap: 2,
				cursor: "pointer",
				...cssPresets.transition,
				"&:hover": isMobile ? {} : {
					backgroundColor: googleColors.gray200,
					border: `1px solid ${googleColors.gray400}`,
				},
				"&:active": {
					backgroundColor: googleColors.gray300,
				}
			}
		},
	},

})


const CollapsePanelItem_css = css({
	...cssPresets.flexCenter,
	marginTop: 0,
	marginBottom: 0,
	"& .order": {
		color: googleColors.blue800,
		textAlign: "left",
		width: "15%",
		...cssPresets.flexCenter,
		marginRight: "auto",
	},
	"& .note_window": {
		width: "25%",
		...cssPresets.flexCenter,
		backgroundColor: googleColors.blue50,
		borderRadius: 999,
		height: 30
	},

	"& .scale_type": {
		width: 45,
		height: 30,
		...cssPresets.flexCenter,
		marginLeft: "auto",
		marginRight: "auto",
		"& .scale_type_f": {
			...cssPresets.flexCenter,
			height: 30,
			width: 30,
			"&>svg": {
				width: "100%",
				height: "100%"
			}
		}
	},

	"& .cn_name": {
		color: googleColors.blue800,
		width: "45%",
		...cssPresets.flexCenter
	},
	"& .line": {
		height: 300,

	}
})


const node_css = css({
	background: googleColors.red300,
	borderRadius: 999,
	width: 35,
	height: 35,
	color: "white",
	marginBottom: 0,
	fontSize: keyFontSize,
	...cssPresets.flexCenter
})
