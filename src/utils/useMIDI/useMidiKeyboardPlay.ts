// noinspection ES6PreferShortImport

import useInstrument from "@/assets/instruments/useInstrument.ts";
import useMIDIConfig from "@/assets/stores/useMIDIConfig.ts";
import {isUndefined} from "lodash";
import {useEffect, useState} from "react";
import * as Tone from "tone";

const useMidiKeyboardPlay = () => {
	const {player} = useInstrument();
	const {isMidiKeyStrokeSoundOn} = useMIDIConfig()
	const [midiLog, setMidiLog] = useState(true)
	const [isPlayerActive, setIsPlayerActive] = useState(true)

	useEffect(() => {
		if (!isPlayerActive) return;
		let inputs: WebMidi.MIDIInput[] = [];
		const connectMidi = async () => {
			try {
				const midiAccess = await navigator.requestMIDIAccess();
				inputs = Array.from(midiAccess.inputs.values());

				if (inputs.length === 0) {
					console.warn("未检测到 MIDI 输入设备");
					return;
				}

				inputs.forEach((input) => {
					input.onmidimessage = (event) => {
						const [status, note, velocity] = event.data;
						//  过滤掉非音符消息，例如心跳包等
						if (isUndefined(note)) return;
						// 打印原始数据
						if (midiLog) {
							console.log("Raw Note:", note, "Status:", status,
								status === 144 ? velocity > 0 ? "Note On" : "Note Off" : "Note Off"
								, "Velocity:", velocity);
						}
						if (!isMidiKeyStrokeSoundOn) return;
						// 只处理 NoteOn 消息（状态码 144）
						if (status === 144 && velocity > 0) {
							const noteName = Tone.Frequency(note, "midi").toNote(); // 转换为 C4 这样的音名
							player?.triggerAttack(noteName);
						}
						// 处理 NoteOff：status 为 128 或者 velocity 为 0 的 NoteOn
						if (status === 128 || (status === 144 && velocity === 0)) {
							const noteName = Tone.Frequency(note, "midi").toNote();
							player?.triggerRelease(noteName);
						}
					};
				});
			} catch (err) {
				console.error("无法访问 MIDI 设备:", err);
			}
		};

		connectMidi();

		return () => {
			// 清理监听器
			inputs.forEach((input) => {
				input.onmidimessage = null;
			});
		};
	}, [player, isPlayerActive, isMidiKeyStrokeSoundOn]);

	return {
		player, midiLog, setMidiLog, isPlayerActive, setIsPlayerActive
	}
}

export default useMidiKeyboardPlay
