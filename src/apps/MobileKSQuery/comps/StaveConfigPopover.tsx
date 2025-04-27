/* eslint-disable no-mixed-spaces-and-tabs */

import googleColors from "@/assets/colors/googleColors.ts";
import useIsWideScreen from "@/utils/useIsWideScreen.tsx";
import useScoreHelperConfig from "@/assets/stores/useScoreHelperConfig.ts";
import cssPresets from "@/assets/styles/cssPresets.ts";
import NoteSymbol from "@/components/reNote/NoteSymbol/NoteSymbol.tsx";
import {css} from "@emotion/react";
import {Mask} from "antd-mobile";
import b_svg from "@/assets/svgs/keySignatures/b.svg";
import h_svg from "@/assets/svgs/keySignatures/h.svg";
import m_svg from "@/assets/svgs/keySignatures/m.svg";
import {isMobile} from "react-device-detect";

const selectedColor = googleColors.amber200;
const StaveConfigPopover = () => {
	const {
		isStaveConfigOpen,
		setIsStaveConfigOpen,
		clef,
		setClef,
		staveAlters,
		isStaveSharp,
		setIsStaveSharp,
		setStaveAlters
	} = useScoreHelperConfig()
	return (<>
		<Mask visible={isStaveConfigOpen}
		      style={{...cssPresets.defaultBlur}}
		      opacity={0.6}
		      destroyOnClose={true}>
			<div css={score_helper_picker_css} onClick={() => setIsStaveConfigOpen(false)}>
				<div className="frame">
					<div className="score_alters">
						<div className="alter_type"
						     onClick={e => {
							     e.stopPropagation();
							     setIsStaveSharp(false);
						     }}
						     style={{
							     width: staveAlters === 0 ? 75 : 0,
							     maxWidth: staveAlters === 0 ? 999 : 0,
							     overflow: "hidden",
							     backgroundColor: selectedColor,
						     }}>
							<div className="inner_box" style={{filter: staveAlters !== 0 ? "blur(10px)" : "none"}}>
								<NoteSymbol color={staveAlters === 0 ? googleColors.red500 : googleColors.gray600} alter={0}/>
							</div>
						</div>
						<div className="alter_type"
						     onClick={e => {
							     e.stopPropagation();
							     setIsStaveSharp(false);
							     if (staveAlters === 0) {
								     setStaveAlters(1)
							     }
						     }}
						     style={{backgroundColor: (!isStaveSharp && staveAlters !== 0) ? selectedColor : "white"}}>
							<div className="inner_box">
								<NoteSymbol color={(!isStaveSharp && staveAlters !== 0) ? googleColors.red500 : googleColors.gray600}
								            alter={-1}/>
							</div>
						</div>

						<div className="alter_type"
						     onClick={e => {
							     e.stopPropagation();
							     setIsStaveSharp(true);
							     if (staveAlters === 0) {
								     setStaveAlters(1)
							     }
						     }}
						     style={{backgroundColor: (isStaveSharp && staveAlters !== 0) ? selectedColor : "white"}}>
							<div className="inner_box">
								<NoteSymbol color={(isStaveSharp && staveAlters !== 0) ? googleColors.red500 : googleColors.gray600}
								            alter={1}/>
							</div>
						</div>
					</div>
					<div className="alter_numbers_frame" style={{
						transition: "all ease 0.5s",
						maxWidth: staveAlters === 0 ? 0 : 999,
						overflow: "hidden",
						maxHeight: staveAlters === 0 ? 0 : 999,
						filter: staveAlters === 0 ? "blur(10px)" : "none",
					}}>
						<table>
							<tbody>
							<tr>
								<td onClick={e => {
									e.stopPropagation()
									setStaveAlters(0)
								}}>0
								</td>
								<td onClick={() => setStaveAlters(1)}>1</td>
								<td onClick={() => setStaveAlters(2)}>2</td>
								<td onClick={() => setStaveAlters(3)}>3</td>
							</tr>
							{/*<tr>*/}

							{/*</tr>*/}
							<tr>
								<td onClick={() => setStaveAlters(4)}>4</td>
								<td onClick={() => setStaveAlters(5)}>5</td>

								<td onClick={() => setStaveAlters(6)}>6</td>
								<td onClick={() => setStaveAlters(7)}>7</td>
							</tr>
							</tbody>
						</table>
					</div>

				</div>
			</div>
		</Mask>
	</>)

}

export default StaveConfigPopover
const clef_css = (isClefSelected?: boolean) => css({
	...cssPresets.flexCenter,
	width: "calc(100% / 3)",
	height: "100%",
	"& img": {
		width: 50,
		height: 50,
	},
	...cssPresets.transition,
	userSelect: "none",
	cursor: "pointer",
	backgroundColor: isClefSelected ? selectedColor : "white",
})


const score_helper_picker_css = css({
	width: "calc(100vw)",
	height: "calc(100vh)",
	zIndex: 999,
	...cssPresets.flexCenter,
	overflowX: "hidden",
	overflowY: "hidden",
	"& .frame": {
		"& .clef_selector": {
			width: 240,
			height: 80,
			marginLeft: "auto",
			marginRight: "auto",
			borderRadius: 10,
			overflow: "hidden",
			backgroundColor: "white",
			userSelect: "none",
			...cssPresets.flexCenter,
			"& .clef:not(:first-of-type)": {
				borderLeft: `1px solid ${googleColors.gray300}`,
				"& img": {
					width: "fit-content",
					height: 40,
				}
			},

		},
		"& .score_alters": {
			...cssPresets.flexCenter,
			marginLeft: "auto",
			marginRight: "auto",
			borderRadius: 8,
			width: "fit-content",
			overflow: "hidden",
			"&>.alter_type": {
				height: 75,
				width: 75,
				transition: "all 0.3s ease-in-out",
				cursor: "pointer",
				userSelect: "none",
				...cssPresets.flexCenter,
				"&>.inner_box": {
					width: 35,
					height: 35,
					...cssPresets.flexCenter,
				},
			}, "&>.alter_type:not(:first-of-type)": {
				userSelect: "none",
				borderLeft: `1px solid ${googleColors.gray400}`,
			}
		},
		"& .alter_numbers_frame": {
			...cssPresets.flexCenter,
			...cssPresets.mxAuto,
			"& table": {
				marginLeft: "auto",
				marginRight: "auto",
				marginTop: 25,
				marginBottom: 60,
				borderRadius: 8,
				overflow: "hidden",
				border: `1px solid ${googleColors.gray300}`,
				borderCollapse: "collapse",
				"& tr:not(:first-of-type)": {
					borderTop: `1px solid ${googleColors.gray300}`,
				},
				"& tr>td:not(first-of-type)": {
					borderRight: `1px solid ${googleColors.gray300}`,
				},
				"td": {
					backgroundColor: "white",
					
					fontSize: 35,
					width: 80,
					height: 75,
					...cssPresets.transition,
					cursor: "pointer",

					"&:hover": {
						backgroundColor: isMobile ? "" : googleColors.gray200
					},
					"&:active": {
						backgroundColor: googleColors.gray300,
					}
				}
			}
		}
	}
})
