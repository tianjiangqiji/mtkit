/* eslint-disable no-mixed-spaces-and-tabs */


import {useMemo, useState} from "react";
import useGlobalSettings from "@/assets/stores/useGlobalSettings.ts";
import music12 from "music12"

const useScoreChecker = () => {
  const {
    notePickerStep,
    notePickerAlter,
    octave,
    setNotePickerAlter,
    setNotePickerStep,
    setOctave
  } = useGlobalSettings()
  const noteInstance = useMemo(() => {
    return music12.factory.getNote(notePickerStep, notePickerAlter, octave)
  }, [notePickerAlter, notePickerStep, octave])
  const semitoneMove = (moveStep: number) => {
    const note1 = noteInstance.semitoneMove(moveStep);
    setNotePickerStep(note1.step)
    setNotePickerAlter(note1.alter)
    setOctave(note1.octave)
    return moveStep
  }
  return {noteInstance, semitoneMove}
}

export default useScoreChecker

