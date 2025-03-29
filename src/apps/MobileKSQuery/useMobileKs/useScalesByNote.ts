import {useMemo} from "react";
import music12 from "@/music12";
import useGlobalSettings from "@/assets/stores/useGlobalSettings.ts";

const useScalesByNote = () => {
  const {notePickerStep, notePickerAlter} = useGlobalSettings()
  return useMemo(() => {
    const result = {maj: {}, min: {}}
    const majorScale = new music12.scale.Scale(new music12.note.Note(notePickerStep as any, notePickerAlter as any), "MAJ")
    const minorScale = new music12.scale.Scale(new music12.note.Note(notePickerStep as any, notePickerAlter as any), "MIN")
    result.maj = {
      step: majorScale.equalRootNote.step,
      alter: majorScale.equalRootNote.alter,
      isTonicNoteReplaced: majorScale.isTonicReplaced,
      rawStaveAlters: majorScale.alterSum,
      actualStaveAlters: majorScale.isTonicReplaced ?
        music12.factory.getScale(majorScale.equalRootNote.step, majorScale.equalRootNote.alter, 4, "MAJ").alterSum
        : majorScale.alterSum,
      notesList: majorScale.notesList,
    }
    // result.min["isTonicNoteReplaced"] = minorScale.isTonicReplaced
    result.min = {
      step: minorScale.equalRootNote.step,
      alter: minorScale.equalRootNote.alter,
      isTonicNoteReplaced: minorScale.isTonicReplaced,
      rawStaveAlters: minorScale.alterSum,
      actualStaveAlters: minorScale.isTonicReplaced ?
        music12.factory.getScale(minorScale.equalRootNote.step, minorScale.equalRootNote.alter, 4, "MIN").alterSum
        : minorScale.alterSum,
      notesList: minorScale.notesList,
    }
    return result
  }, [notePickerAlter, notePickerStep])
}

export default useScalesByNote