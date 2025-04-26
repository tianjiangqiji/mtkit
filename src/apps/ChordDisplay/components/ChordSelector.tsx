/* eslint-disable no-mixed-spaces-and-tabs */

import {css} from "@emotion/react";
import {Mask} from "antd-mobile";
import cssPresets from "@/assets/styles/cssPresets.ts";
import useChordConfig from "@/assets/stores/useChordConfig.ts";
import * as music12 from "@/music12";
import googleColors from "@/assets/colors/googleColors.ts";
import {isNumber} from "lodash";
import {useEffect, useLayoutEffect, useRef} from "react";
import {isMobile} from "react-device-detect";
import {useWindowSize} from "react-use";

const ChordSelector = () => {
	const {
		isChordSelectorOpen,
		setIsChordSelectorOpen,
		setChordKey,
		chordKey,
		setChordSelectorRefHeight,
		chordSelectorRefHeight
	} = useChordConfig()
	const {width} = useWindowSize();
	const chordMeta = music12.chord.chordMeta
	const ref = useRef<HTMLDivElement | null>(null)

	//每次打开页面的时候，自动保存上次打开的的位置
	useEffect(() => {
		if (isChordSelectorOpen) {
			const handleScrollTop = () => {
				if (ref.current) {
					// console.log("Setting scrollTop to:", chordSelectorRefHeight);
					ref.current.scrollTop = chordSelectorRefHeight;
				} else {
					// console.log("ref.current is still null");
				}
			};

			// 使用 setTimeout 确保在 Mask 组件完全渲染后再设置 scrollTop
			const timeoutId = setTimeout(handleScrollTop, 1); // 100ms 的延迟

			return () => clearTimeout(timeoutId);
		} else {
			// console.log("isChordSelectorOpen:", isChordSelectorOpen, "ref.current:", ref.current);
		}
	}, [isChordSelectorOpen, chordSelectorRefHeight]);
	return (<>
		<Mask visible={isChordSelectorOpen}
		      style={{...cssPresets.defaultBlur}}
		      opacity={0.5}
		      destroyOnClose={true}>
			<div css={note_picker_css(width)} onClick={() => setIsChordSelectorOpen(false)}>
				<div className="inner_frame"
				     ref={ref}>
					{chordMeta.map((x, y) => <div
						onClick={() => {
							setChordKey(x.chordKey)
							setChordSelectorRefHeight(ref.current.scrollTop)
						}}
						style={{backgroundColor: x.chordKey === chordKey ? googleColors.amber200 : "white"}}
						className="line" key={x.chordKey}>
						<div className="index">{y + 1}</div>
						<div className="cn_name">{x.cnName}</div>
						<div className="score_display">{x.scoreDisplay}</div>
					</div>)}
				</div>
			</div>
		</Mask>
	</>)

}

export default ChordSelector

const note_picker_css = (w: number) => css({
	userSelect: "none",
	width: "calc(100vw)",
	height: "calc(100vh)",
	zIndex: 999,
	...cssPresets.flexCenter,
	overflowX: "hidden",
	overflowY: "hidden",
	"& .inner_frame": {
		width: "fit-content",
		height: "calc(80vh)",
		overflowY: "auto",
		borderRadius: 8,
		overflowX: "hidden",
		backgroundColor: "red",
		userSelect: "none",
		"& .line:not(:first-of-type)": {
			borderTop: `1px solid ${googleColors.gray300}`,
		},
		"& .line": {
			height: 50,
			width: "fit-content",
			marginLeft: "auto",
			marginRight: "auto",
			backgroundColor: "white",
			...cssPresets.flexCenter,
			justifyContent: "space-between",
			cursor: "pointer",
			...cssPresets.transition,
			"&:hover": isMobile ? {} : {
				backgroundColor: googleColors.gray200
			},
			"& .index": {
				...cssPresets.transition,
				width: w >= 400 ? 60 : 35,
				paddingLeft: w >= 400 ? 25 : 15,
				...cssPresets.flexCenter,
				justifyContent: "start",
				color: googleColors.blue800,
			},
			"& .cn_name": {
				...cssPresets.transition,
				width: 210,
				paddingLeft: 15,
				height: "100%",
				...cssPresets.flexCenter,
				justifyContent: "start",
				color: googleColors.gray700
			},
			"& .score_display": {
				...cssPresets.transition,
				width: w >= 400 ? 120 : 80,
				paddingRight: w >= 400 ? 30 : 20,
				height: "100%",
				...cssPresets.flexCenter,
				justifyContent:
					"end",
				color:
				googleColors.blueGray600,
			}
		}
	}
})
