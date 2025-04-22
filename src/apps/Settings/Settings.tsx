/* eslint-disable no-mixed-spaces-and-tabs */
import ResetApp from "@/apps/Settings/components/ResetApp.tsx";
import MidiSelection from "@/apps/Settings/parts/MidiSelection.tsx";
import SoundConfig from "@/apps/Settings/parts/SoundConfig.tsx";
import googleColors from "@/assets/colors/googleColors.ts";
import useGlobalSettings from "@/assets/stores/useGlobalSettings.ts";
import cssFunctions from "@/assets/styles/cssFunctions.ts";
import cssPresets from "@/assets/styles/cssPresets.ts";
import {css} from "@emotion/react";
import {Button} from "antd-mobile";
import {useEffect, useRef, useState} from "react";
import {Toaster} from "react-hot-toast";
import * as Tone from "tone"

const Settings = (props: {}) => {
	const {naviBarHeight} = useGlobalSettings()
	// const wa = new WebAudioTinySynth()
	const [isAudioStarted, setIsAudioStarted] = useState(false);
	const [notePlaying, setNotePlaying] = useState(false);
	const waRef = useRef(null);
	// 创建一个 PolySynth 实例，用于同时播放多个音符

	// useEffect(() => {
	// 	if (!isAudioStarted) {
	// 		try {
	// 			waRef.current = new WebAudioTinySynth();
	// 			setIsAudioStarted(true);
	// 			waRef.current.programChange(0, 3);
	// 			console.log('Audio context started successfully');
	// 		} catch (error) {
	// 			console.error('Error starting audio context:', error);
	// 		}
	// 	}
	// }, []);

	useEffect(() => {
		// 加载音频文件
		Tone.start().then(()=>console.log(1))
	})

	const playNote = () => {
		// sampler.triggerAttackRelease("C4", "8n")

		// pianoSampler.triggerAttackRelease(["C3" ,"E4", "G4"], "4n")
		// ["C3","E3","G3","C4","E4","G4"].forEach((note, index) => {
		// 	pianoSampler.triggerAttackRelease(note, '4n', '+0.' + index)
		// })

		// if (isAudioStarted &&!notePlaying) {
		// 	// MIDI 音符编号 60 代表中央 C
		// 	waRef.current.noteOn(0, 60, 127);
		// 	setNotePlaying(true);
		// 	setTimeout(() => {
		// 		waRef.current.noteOff(0, 60);
		// 		setNotePlaying(false);
		// 	}, 500);
		// }
	};

	return <>
		<Toaster/>
		<div css={Settings_css(naviBarHeight)}>
			<div className="inner_frame">
				<SoundConfig/>
				<MidiSelection/>
				<ResetApp/>
			</div>
			{/*<div>{isAudioStarted ? "ok" : "no"}*/}
			{/*	<Button onClick={playNote}>按下</Button>*/}
			{/*</div>*/}

		</div>
	</>
}

export default Settings

const Settings_css = (h: number) => css({
	width: "100%",
	height: `calc(100vh - ${h}px)`,
	overflowY: "auto",
	"& .inner_frame": {
		...cssPresets.mxAuto,
		width: "100%",
		height:"auto",
		maxWidth: 550,
		...cssFunctions.px(15),
		paddingBottom:150
	},
	"& .reset": {
		width: "100%",
		backgroundColor: "white",
		borderRadius: 8,
		height: 150,
		userSelect: "none",
		...cssPresets.flexCenter,
		flexDirection: "column",
		marginTop: 15,
		"& .reset_desc": {
			fontSize: 14,
			color: googleColors.gray400,
			userSelect: "none",
			marginLeft: 40,
			marginRight: 40,
		},
		"& .btn": {
			width: 125,
			height: 45,
			userSelect: "none",
			...cssPresets.flexCenter,
			backgroundColor: googleColors.red300,
			borderRadius: 999,
			fontSize: 16,
			marginTop: 15,
			cursor: "pointer",
			...cssPresets.transition,
			color: googleColors.red50,
			"&:hover": {
				backgroundColor: googleColors.red400,
			},
			"&:active": {
				backgroundColor: googleColors.red800,
			},
		}
	},
})
