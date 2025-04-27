/* eslint-disable no-mixed-spaces-and-tabs */
import {css} from "@emotion/react";
import {Mask, Switch} from "antd-mobile";
import useCircleOfFifthsConfig from "@/assets/stores/useCircleOfFifthsConfig.ts";
import cssPresets from "@/assets/styles/cssPresets.ts";
import {range} from "lodash";
import {CSSProperties} from "react";
import {IoFootstepsSharp} from "react-icons/io5";
import googleColors from "@/assets/colors/googleColors.ts";
import {isMobile} from "react-device-detect";
import {FaArrowPointer} from "react-icons/fa6";
import {FaDotCircle} from "react-icons/fa";

const ifCursorMoveSelectedColor = googleColors.blue800

const selectedIconColor = googleColors.deepOrange800
const unselectedIconColor = googleColors.gray600
const CircleConfigPopover = () => {
	const {
		isRotateLengthConfigOpen,
		setRotateLengthConfigOpen,
		setRotateLength,
		isCursorShow,
		setIsCursorShow,
		isCursorMoveMode, setIsCursorMoveMode, rotateLength
	} = useCircleOfFifthsConfig()
	return <>
		<div css={RotateLengthPopover_css(isCursorShow, rotateLength)}>
			<Mask visible={isRotateLengthConfigOpen}
			      style={{...cssPresets.flexCenter, ...cssPresets.defaultBlur}}
			      destroyOnClose={true}
			      onMaskClick={() => setRotateLengthConfigOpen(false)}>

				<div className="rotate_config">
					<div className="option"
					     onClick={() => {
						     setIsCursorMoveMode(true)
						     setIsCursorShow(true)
					     }}
					     css={rotate_option_css(isCursorShow && isCursorMoveMode)}>
						<div className="icon">
							<FaArrowPointer
								color={(isCursorShow && isCursorMoveMode) ? selectedIconColor : unselectedIconColor}
								size={26}/>
						</div>
						<div className="tag">
							<div>轮盘静止</div>
							<div>指针旋转</div>
						</div>
					</div>
					<div className="option"
					     onClick={() => {
						     setIsCursorMoveMode(false)
						     setIsCursorShow(true)
					     }}
					     css={rotate_option_css(isCursorShow && !isCursorMoveMode)}>
						<div className="icon">
							<FaDotCircle
								color={(isCursorShow && !isCursorMoveMode) ? selectedIconColor : unselectedIconColor}
								size={26}/>
							<FaArrowPointer
								color={(isCursorShow && !isCursorMoveMode) ? selectedIconColor : unselectedIconColor}
								size={26}/>
						</div>
						<div className="tag">
							<div>共同旋转</div>
							<div>指针显示</div>
						</div>
					</div>
					<div className="option"
					     css={rotate_option_css(!isCursorShow)}
					     onClick={() => {
						     setIsCursorMoveMode(false)
						     setIsCursorShow(false)
					     }}>
						<div className="icon">
							<FaDotCircle
								color={!isCursorShow ? selectedIconColor : unselectedIconColor}
								size={26}/>
						</div>
						<div className="tag">
							<div>轮盘旋转</div>
							<div>无指针</div>
						</div>
					</div>
				</div>

				{/*设置步长*/}
				<div className="inner_frame">
					<table>
						<tbody>
						<tr>
							<td className="n"
							    style={stepConfigCss}>
								<span style={{color: googleColors.gray500}}>步长</span>
								<IoFootstepsSharp size={26} color={googleColors.gray500}/>
							</td>
							{range(1, 4).map(x => <td className="n"
							                          css={td_color_css(x === rotateLength)} key={x}
							                          onClick={() => {
								                          setRotateLength(x)
								                          setRotateLengthConfigOpen(false)
							                          }}>{x}</td>)}
						</tr>
						<tr>
							{range(4, 8).map(x => <td className="n"
							                          css={td_color_css(x === rotateLength)}
							                          key={x} onClick={() => {
								setRotateLength(x)
								setRotateLengthConfigOpen(false)
							}}>{x}</td>)}
						</tr>
						<tr>
							{range(8, 12).map(x => <td
								css={td_color_css(x === rotateLength)}
								className="n" key={x} onClick={() => {
								setRotateLength(x)
								setRotateLengthConfigOpen(false)
							}}>{x}</td>)}
						</tr>
						</tbody>
					</table>
				</div>
			</Mask>
		</div>
	</>
}

export default CircleConfigPopover

const RotateLengthPopover_css = (isCursorShow: boolean, rotateLength: number) => css({
	"& .inner_frame": {
		borderRadius: 10,
		overflow: "hidden",
		backgroundColor: "white",
		...cssPresets.flexCenter,
		flexDirection: "column",
		flexWrap: "wrap",
		marginLeft: 10,
		marginRight: 10,
		"& table": {
			borderCollapse: "collapse",
			...cssPresets.transition,
			"& tr:not(:first-of-type)": {
				borderTop: `1px solid ${googleColors.gray300}`,
			},
			"& tr td:not(:first-of-type)": {
				borderLeft: `1px solid ${googleColors.gray300}`,
			},
			"& td": {
				
				minWidth: 80,
				maxWidth: 80,
				height: 80,
				...cssPresets.transition,
			},
			"& td.n": {
				cursor: "pointer",
			}
		}
	},
	"& .rotate_config": {
		...cssPresets.mxAuto,
		...cssPresets.flexCenter,
		borderRadius: 8,
		overflow: "hidden",
		width: 320,
		marginBottom: 15,
		"& .option": {
			width: "33.3%",
			height: 100,
			...cssPresets.flexCenter,
			flexDirection: "column",
			cursor: "pointer",
			"& .icon": {
				height: 40,
				...cssPresets.flexCenter,
			}
		},
		"& .option:not(:first-of-type)": {
			borderLeft: `1px solid ${googleColors.gray200}`,
		}
	}
})

const stepConfigCss: CSSProperties = {
	width: "100%",
	backgroundColor: googleColors.blueGray50,
	...cssPresets.flexCenter,
	flexDirection: "column"

}

const cursor_on_css = (isOn: boolean) => css({
	backgroundColor: isOn ? googleColors.blue50 : googleColors.gray50,
	width: 100,
	height: 90,
	userSelect: "none",
	cursor: "pointer",
	...cssPresets.flexCenter,
	flexDirection: "column",
	"& .text": {
		
		marginTop: 10,
		color: isOn ? ifCursorMoveSelectedColor : googleColors.gray600
	},
})

const td_color_css = (isSelected?: boolean) => {
	return css({
		backgroundColor: isSelected ? googleColors.amber200 : "#FFF",
		color: isSelected ? selectedIconColor : unselectedIconColor,
		fontSize: isSelected ? 35 : 27,
		"&:hover": isSelected ? void 0 : {
			backgroundColor: googleColors.gray200
		},
		"&:active": {
			backgroundColor: isSelected ? void 0 : googleColors.gray200,
		}
	})
}

const rotate_option_css = (isSelected?: boolean) => css({
	backgroundColor: isSelected ? googleColors.amber200 : "white",
	"& .tag": {
		color: isSelected ? selectedIconColor : unselectedIconColor,
		"& div": {
			fontSize: 14
		}
	}
})
