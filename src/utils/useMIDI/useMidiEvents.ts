// noinspection ES6PreferShortImport
import useMIDIConfig from "@/assets/stores/useMIDIConfig.ts";
import * as music12 from "@/music12";
import dt from "@/utils/guoDT.ts"
import useMIDIPorts from "@/utils/useMIDI/useMIDIPorts.ts";
import UseMIDIReady from "@/utils/useMIDI/useMIDIReady.ts";
import {Dayjs} from "dayjs";
import {isEmpty, isNull, isNumber, isUndefined, sortBy} from "lodash";
import {useEffect, useMemo, useState} from "react";

const useMidiEvents = () => {
	const {eventListLength, setEventListLength, latestEvent, setLatestEvent, eventList, setEventList} = useMIDIConfig()
	const {isWebMidiSupport, isJzzEngineReady, JZZ} = UseMIDIReady()
	const {inputs, outputs,} = useMIDIPorts()

	const [noteOnNumList, setNoteOnNumList] = useState<number[]>([])
	const clearNoteOnList = () => setNoteOnNumList([])

	const clearEventList = () => setEventList([])
	useEffect(() => {
		if (!(isWebMidiSupport && isJzzEngineReady)) {
			return setEventList([])
		}
		if (inputs && inputs.length === 0) {
			return setEventList([])
		}
		const unsubscribe = inputs.map((inputObj, index) =>
			JZZ().openMidiIn(index).connect((msg) => {
				const handle = JZZ.MIDI(msg)
				if (isUndefined(handle.getChannel())) return
				if (isUndefined(handle.getNote())) return
				const isOn = handle.isNoteOn()
				const isOff = handle.isNoteOff()
				const velocity = handle.getVelocity()
				const noteNumber: number = handle.getNote()
				const readyPushObj = {
					name: inputObj.name,
					note: noteNumber,
					isNoteOn: isOn,
					isNoteOff: isOff,
					velocity: velocity,
					time: dt.getDayjs()
				}
				setLatestEvent(readyPushObj)
			})
		);
		return () => {
			unsubscribe.forEach(u => u.disconnect());
		};
	}, [isWebMidiSupport, isJzzEngineReady, inputs, outputs, eventListLength]);

	// 如果超过最大长度，移除最旧的事件
	useEffect(() => {
		if (!isNumber(eventListLength)) return;
		if (eventListLength <= 0) return;

		//同时按住的列表的逻辑
		if (noteOnNumList.length <= 10) {
			if (!isEmpty(latestEvent) && latestEvent['isNoteOn']) {
				if (!noteOnNumList.includes(latestEvent.note)) {
					setNoteOnNumList([...noteOnNumList, latestEvent.note])
				}
			}
			if (!isEmpty(latestEvent) && latestEvent['isNoteOff']) {
				if (noteOnNumList.includes(latestEvent.note)) {
					setNoteOnNumList(noteOnNumList.filter(num => num !== latestEvent.note))
				}
			}
		} else {
			clearNoteOnList()
		}


		//全部列表的逻辑
		if (eventList.length < eventListLength) {
			if (!isNull(latestEvent)) return setEventList([...eventList, latestEvent])
		} else {
			setEventList([...eventList, latestEvent].slice(-eventListLength))
		}
	}, [latestEvent, eventListLength])


	const noteOnNumWithOctaveList = useMemo(() => {
		if (noteOnNumList.length === 0) return []
		return sortBy(noteOnNumList).map(num => new music12.Radix.Base12Radix(num).twoDigitArray)
	}, [noteOnNumList])

	useEffect(() => {
		console.log("useEvent: latestEvent changed:", latestEvent);
	}, [latestEvent]);
	useEffect(() => {
		console.log("useEvent: note on changed:", noteOnNumList);
	}, [noteOnNumList]);
	useEffect(() => {
		console.log("useEvent: note witin octave changed:", noteOnNumWithOctaveList);
	}, [noteOnNumWithOctaveList]);

	return {
		eventList, latestEvent, noteOnNumList, clearNoteOnList, clearEventList, noteOnNumWithOctaveList,
		setLatestEvent, setNoteOnNumList
	}
}

export default useMidiEvents
