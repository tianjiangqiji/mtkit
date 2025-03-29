/* eslint-disable react-hooks/exhaustive-deps */
import useGlobalSettings from "@/assets/stores/useGlobalSettings.ts";
import {useEffect, useMemo, useState} from "react";
import music12 from "@/music12";
import useChordConfig from "@/assets/stores/useChordConfig.ts";
import findFirstIndexLessThanLeft from "@/utils/findFirstIndexLessThanLeft.ts";
import googleColors from "@/assets/colors/googleColors.ts";
import useScoreHelperConfig from "@/assets/stores/useScoreHelperConfig.ts";
import {useList} from "react-use";

const selectedKeyColor = googleColors.amber200
const useChord = () => {
  const {notePickerStep, notePickerAlter} = useGlobalSettings()
  // const [chordVoicing, setChordVoicing] = useList([])
  const {chordKey, chordVoicing, setChordVoicing} = useChordConfig()
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
  const shiftStaveOctave = (i: number) => {
    if (i === 0) return
    if (i > 0) {
      setChordVoicing(chordVoicing.map(x => {
        return {...x, octave: x.octave + 1}
      }))
    } else {
      setChordVoicing(chordVoicing.map(x => {
          return {...x, octave: x.octave - 1}
        })
      )
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
    shiftStaveOctave,
    shiftOneOctave,
    resetOctave
  }
}
export default useChord