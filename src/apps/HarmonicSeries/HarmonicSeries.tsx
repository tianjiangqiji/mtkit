/* eslint-disable no-mixed-spaces-and-tabs */
import googleColors from "@/assets/colors/googleColors.ts";
import cssFunctions from "@/assets/styles/cssFunctions.ts";
import {css} from "@emotion/react";
import {useMemo} from "react";
import * as music12 from "@/music12";
import ConfigBar from "@/apps/HarmonicSeries/components/ConfigBar.tsx";
import useHarmonicSeriesConfig from "@/assets/stores/useHarmonicSeriesConfig.ts";
import NotePicker from "@/components/reNote/NotePicker/NotePicker.tsx";
import useGlobalSettings from "@/assets/stores/useGlobalSettings.ts";
import NoResult from "@/apps/HarmonicSeries/components/NoResult.tsx";
import EachHarmonicSeries from "@/apps/HarmonicSeries/components/EachHarmonicSeries.tsx";
import OptionBar from "@/apps/HarmonicSeries/components/OptionBar.tsx";

const W = (props: {
	t: string
}) => <span style={{whiteSpace: "nowrap", fontSize: 14, color: googleColors.gray500}}>{props.t}</span>

const HarmonicSeries = () => {
	const {notesList} = useHarmonicSeriesConfig()
	const {naviBarHeight, setNotePickerOpen} = useGlobalSettings()
	const {clearNotesList, addNotesList} = useHarmonicSeriesConfig()
	const harmonicSeries = useMemo(() => {
		if (notesList.length === 0) return []
		return notesList.map(x => {
			const rootNote = music12.factory.getNote(x.step, x.alter, 4)
			return {rootNoteStep: x.step, rootNoteAlter: x.alter, harmonicSeries: rootNote.getHarmonicSeries()}
		})
	}, [notesList])

	return <>
		<NotePicker onSelect={(step, alter) => {
			setNotePickerOpen(false)
			addNotesList({step: step, alter: alter})
		}} isNormalOnly={true}/>
		<div css={HarmonicSeries_css(naviBarHeight)}>
			<ConfigBar/>
			<OptionBar/>
			<div className="main_result">
				<div className="inner">

					{notesList.length === 0 && <NoResult/>}
					{harmonicSeries.map((x, y) => <EachHarmonicSeries
						key={y} step={x.rootNoteStep}
						alter={x.rootNoteAlter} notesList={x.harmonicSeries}/>)}
					<div style={{marginBottom: 50, ...cssFunctions.px(15)}}>
						{harmonicSeries.length === 0 && <W t={"添加音符后，"}/>}
						<W t={"左侧黄色方框内为基音，"}/>
						<W t={"右侧数字n下方是基音的"}/>
						<W t={"(n+1)倍频率音，"}/>
						<W t={"但由于12平均律只是"}/>
						<W t={"有理数频率比的近似，"}/>
						<W t={"所以实际会有一些误差。"}/>
					</div>
				</div>
			</div>
		</div>
	</>
}

export default HarmonicSeries

const HarmonicSeries_css = (navibarH: number) => css({
	width: "100%",
	marginLeft: "auto",
	marginRight: "auto",
	userSelect: "none",
	overflowY: "hidden",
	"& .main_result": {
		userSelect: "none",
		width: "100%",
		overflowY: "auto",
		marginLeft: "auto",
		marginRight: "auto",
		display: "flex",
		flexDirection: "column",
		height: `calc( 100vh - ${navibarH + 80 + 60}px)`,
		"& .inner": {
			width: "100%",
			maxWidth: 550,
			marginLeft: "auto",
			marginRight: "auto"
		}
	},
	"& .line": {
		display: "flex",
		width: "100%",


	}
})
