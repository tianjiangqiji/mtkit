/* eslint-disable react-hooks/exhaustive-deps */
import useGlobalSettings from "@/assets/stores/useGlobalSettings.ts";
import {random, range} from "lodash";
import {useEffect, useMemo, useState} from "react";
import * as music12 from "@/music12";
import useChordConfig from "@/assets/stores/useChordConfig.ts";
import findFirstIndexLessThanLeft from "@/utils/findFirstIndexLessThanLeft.ts";
import googleColors from "@/assets/colors/googleColors.ts";
import useScoreHelperConfig from "@/assets/stores/useScoreHelperConfig.ts";
import {useList} from "@uidotdev/usehooks";

const selectedKeyColor = googleColors.amber200
const useChord = () => {
	const {notePickerStep, notePickerAlter} = useGlobalSettings()
	const {
		chordKey, setChordVoicing,
		n1_step, n1_alter, n1_octave,
		n2_step, n2_alter, n2_octave,
		n3_step, n3_alter, n3_octave,
		n4_step, n4_alter, n4_octave,
		n5_step, n5_alter, n5_octave,
		n6_step, n6_alter, n6_octave,
		n7_step, n7_alter, n7_octave,
		setNoteOctave
	} = useChordConfig()
	const chordVoicing = useMemo(() => {
		const result = []
		if (n1_step !== "none") {
			result.push({
				step: n1_step,
				alter: n1_alter,
				octave: n1_octave
			})
		}
		if (n2_step !== "none") {
			result.push({
				step: n2_step,
				alter: n2_alter,
				octave: n2_octave
			})
		}
		if (n3_step !== "none") {
			result.push({
				step: n3_step,
				alter: n3_alter,
				octave: n3_octave
			})
		}
		if (n4_step !== "none") {
			result.push({
				step: n4_step,
				alter: n4_alter,
				octave: n4_octave
			})
		}
		if (n5_step !== "none") {
			result.push({
				step: n5_step,
				alter: n5_alter,
				octave: n5_octave
			})
		}
		if (n6_step !== "none") {
			result.push({
				step: n6_step,
				alter: n6_alter,
				octave: n6_octave
			})
		}
		if (n7_step !== "none") {
			result.push({
				step: n7_step,
				alter: n7_alter,
				octave: n7_octave
			})
		}
		return result
	}, [n1_step, n1_alter, n1_octave,
		n2_step, n2_alter, n2_octave,
		n3_step, n3_alter, n3_octave,
		n4_step, n4_alter, n4_octave,
		n5_step, n5_alter, n5_octave,
		n6_step, n6_alter, n6_octave,
		n7_step, n7_alter, n7_octave,])
	const {clef, setClef, changeClef} = useScoreHelperConfig()
	const rootNote = useMemo(() => {
		return music12.factory.getNote(notePickerStep, notePickerAlter);
	}, [notePickerStep, notePickerAlter])
	const chord = useMemo(() => {
		try {
			return music12.factory.getChord(rootNote.step, rootNote.alter, rootNote.octave, chordKey)
		} catch {
			return music12.factory.getChord("C", 0, 4, "maj3")
		}
	}, [rootNote, chordKey])
	const resetOctave = () => {
		const originOctave = chord.notesList[0].octave
		setChordVoicing(chord.notesList.map(x => {
			if (["G", "H"].includes(clef)) {
				return {
					step: x.step,
					alter: x.alter,
					octave: x.octave - originOctave + 4
				}
			} else if (["M", "C"].includes(clef)) {
				return {
					step: x.step,
					alter: x.alter,
					octave: x.octave - originOctave + 3
				}
			} else {
				return {
					step: x.step,
					alter: x.alter,
					octave: x.octave - originOctave + 3
				}
			}
		}))
	}
	useEffect(() => {
		resetOctave()
		//忽略这一行
	}, [rootNote, chordKey, clef])
	const staveOctaveMove = (i: number) => {
		if (i === 0) return;
		if (n1_step !== "none") {
			setNoteOctave(1, n1_octave + i)
		}
		if (n2_step !== "none") {
			setNoteOctave(2, n2_octave + i)
		}
		if (n3_step !== "none") {
			setNoteOctave(3, n3_octave + i)
		}
		if (n4_step !== "none") {
			setNoteOctave(4, n4_octave + i)
		}
		if (n5_step !== "none") {
			setNoteOctave(5, n5_octave + i)
		}
		if (n6_step !== "none") {
			setNoteOctave(6, n6_octave + i)
		}
		if (n7_step !== "none") {
			setNoteOctave(7, n7_octave + i)
		}
	}

	const shiftOneOctave = (index: number, i: number) => {
		setChordVoicing(chordVoicing.map((x, y) => {
			if (index === y) return {...x, octave: x.octave + i}
			return x
		}))
	}
	const chordKeyboard = useMemo(() => {
		const kbd = [Array.from({length: 12}, () => void 0), Array.from({length: 12}, () => void 0), Array.from({length: 12}, () => void 0)]
		const chordLocList = chord.notesList.map(x => x.locationId)
		const firstFind = findFirstIndexLessThanLeft(chordLocList)
		if (firstFind === -1) {
			for (const i of chordLocList) {
				kbd[0][i] = selectedKeyColor
			}
			return kbd
		}
		const chordLocList1 = chordLocList.slice(0, firstFind)
		for (const i of chordLocList1) {
			kbd[0][i] = selectedKeyColor
		}
		const chordLocList2 = chordLocList.slice(firstFind)
		const secondFindIndex = findFirstIndexLessThanLeft(chordLocList2)
		if (secondFindIndex === -1) {
			for (const i of chordLocList2) {
				kbd[1][i] = selectedKeyColor
			}
			return kbd
		}
		const chordLocList2_front = chordLocList2.slice(0, secondFindIndex)
		for (const i of chordLocList2_front) {
			kbd[1][i] = selectedKeyColor
		}
		const chordLocList2_end = chordLocList2.slice(secondFindIndex)
		for (const i of chordLocList2_end) {
			kbd[2][i] = selectedKeyColor
		}
		return kbd
	}, [chord])
	const chordInScales = useMemo(() => {
		return music12.chord.findChordInScale(chord.notesList.map(x => x.locationId))
	}, [chord.notesList])
	return {
		chord,
		chordKeyboard,
		chordInScales,
		chordVoicing,
		setChordVoicing,
		staveOctaveMove,
		shiftOneOctave,
		resetOctave
	}
}
export default useChord
