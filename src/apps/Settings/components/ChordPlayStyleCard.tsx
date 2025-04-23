/* eslint-disable no-mixed-spaces-and-tabs */
import ColumnChord from "@/apps/Settings/components/ColumnChord.tsx";
import SplitDownChord from "@/apps/Settings/components/SplitDownChord.tsx";
import SplitUpChord from "@/apps/Settings/components/SplitUpChord.tsx";
import googleColors from "@/assets/colors/googleColors.ts";
import useGlobalSettings from "@/assets/stores/useGlobalSettings.ts";
import cssPresets from "@/assets/styles/cssPresets.ts";
import byDefault from "@/utils/byDefault.ts";
import warningToast from "@/utils/warningToast.tsx";
import {css} from "@emotion/react";
import toast, {Toaster} from "react-hot-toast";
import {AiFillWarning} from "react-icons/ai";
import {BiError} from "react-icons/bi";

const ChordPlayStyleCard = (props: {
	isActive?: boolean
	isForbidden?: boolean
	type: "column" | "split_up" | "split_down"
}) => {
	const isActive = byDefault(props.isActive, false)
	const {setChordPlayStyle, chordPlayStyle} = useGlobalSettings()
	const isForbidden = byDefault(props.isForbidden, false)
	const handleClick = () => {
		if (isForbidden) return;
		if (chordPlayStyle.includes(props.type)) {
			if (chordPlayStyle.length === 1) {
				warningToast("至少需要保留一个播放样式")
				return;
			}
			setChordPlayStyle(chordPlayStyle.filter(x => x !== props.type))
			return;
		}
		setChordPlayStyle([...chordPlayStyle, props.type])
	}
	const iconColor = isActive ? googleColors.blue800 : isForbidden ? googleColors.gray400 : googleColors.gray400
	return <>
		<Toaster/>
		<div css={ChordPlayStyleCard_css(isActive, isForbidden)} onClick={handleClick}>
			<div className="icon">
				{props.type === "column" && <ColumnChord
					color={iconColor}/>}
				{props.type === "split_up" && <SplitUpChord
					color={iconColor}/>}
				{props.type === "split_down" && <SplitDownChord
					color={iconColor}/>}
			</div>
			<div className="tag">
				{props.type === "column" && "柱式和弦"}
				{props.type === "split_up" && "分解上行"}
				{props.type === "split_down" && "分解下行"}
			</div>
		</div>
	</>
}

export default ChordPlayStyleCard

const ChordPlayStyleCard_css = (isActive: boolean, isForbidden: boolean) => css({
	flex: "1 0 30%",
	maxWidth: 120,
	borderRadius: 8,
	paddingBottom: 8,
	paddingTop: 10,
	transition: "all 0.2s ease-in-out",
	cursor: isForbidden ? "not-allowed" : "pointer",
	border: `1px solid ${isForbidden ? googleColors.gray200 : isActive ? googleColors.blue500 : googleColors.gray300}`,
	backgroundColor: isForbidden ? googleColors.gray200 : isActive ? googleColors.blue50 : googleColors.gray100,
	"&>.icon": {
		width: 25,
		height: 25,
		...cssPresets.mxAuto,
	},
	"&>.tag": {
		color: isActive ? googleColors.blue800 : isForbidden ? googleColors.gray400 : googleColors.gray400,
		fontSize: 12,
		marginTop: 10,
		textAlign: "center",
	}
})
