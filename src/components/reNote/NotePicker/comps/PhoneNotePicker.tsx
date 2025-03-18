/* eslint-disable no-mixed-spaces-and-tabs */
import googleColors from "@/assets/colors/googleColors.ts";
import useGlobalSettings from "@/assets/stores/useGlobalSettings.ts";
import cssPresets from "@/assets/styles/cssPresets.ts";
import NoteText from "@/components/reNote/NoteText/NoteText.tsx";
import {css} from "@emotion/react";
import byDefault from "@/utils/byDefault.ts";

const pickerSize = 30
const sideFlatNoteColor = googleColors.gray700
const sideSharpNoteColor = googleColors.gray700
const freezeCss = {backgroundColor: googleColors.gray300, cursor: "pointer"}
const freezeFontColor = googleColors.gray400
const PhoneNotePicker = (props: {
  isNormalOnly?: boolean
}) => {
  const {setNotePicker} = useGlobalSettings()
  const isNormalOnly = byDefault(props.isNormalOnly, false)
  return <div css={phone_note_picker_css}>
    <div className="column">
      <div className="cell"
           onClick={() => setNotePicker("B", -1)}>
        <NoteText step="B" alter={-1} fontSize={pickerSize}
                  color={sideFlatNoteColor}/>
      </div>
      <div className="cell" onClick={() => setNotePicker("A", -1)}>
        <NoteText step="A" alter={-1} fontSize={pickerSize} color={sideFlatNoteColor}/>
      </div>
      <div className="cell" onClick={() => setNotePicker("G", -1)}>
        <NoteText step="G" alter={-1} fontSize={pickerSize} color={sideFlatNoteColor}/>
      </div>
      <div className="cell"
           style={isNormalOnly ? freezeCss : void 0}
           onClick={e => {
             if (isNormalOnly) e.stopPropagation()
             else setNotePicker("F", -1)
           }}>
        <NoteText step="F" alter={-1} fontSize={pickerSize}
                  color={isNormalOnly ? freezeFontColor : sideFlatNoteColor}/>
      </div>
      <div className="cell" onClick={() => setNotePicker("E", -1)}>
        <NoteText step="E" alter={-1} fontSize={pickerSize} color={sideFlatNoteColor}/>
      </div>
      <div className="cell" onClick={() => setNotePicker("D", -1)}>
        <NoteText step="D" alter={-1} fontSize={pickerSize} color={sideFlatNoteColor}/>
      </div>
      <div className="cell"
           style={isNormalOnly ? freezeCss : void 0}
           onClick={e => {
             if (isNormalOnly) e.stopPropagation()
             else setNotePicker("C", -1)
           }}>
        <NoteText step="C" alter={-1} fontSize={pickerSize}
                  color={isNormalOnly ? freezeFontColor : sideFlatNoteColor}/>
      </div>
    </div>


    <div className="column">
      <div className="cell" onClick={() => setNotePicker("B", 0)}>
        <NoteText step="B" alter={0} fontSize={pickerSize}/>
      </div>
      <div className="cell" onClick={() => setNotePicker("A", 0)}>
        <NoteText step="A" alter={0} fontSize={pickerSize}/>
      </div>
      <div className="cell" onClick={() => setNotePicker("G", 0)}>
        <NoteText step="G" alter={0} fontSize={pickerSize}/>
      </div>
      <div className="cell" onClick={() => setNotePicker("F", 0)}>
        <NoteText step="F" alter={0} fontSize={pickerSize}/>
      </div>
      <div className="cell" onClick={() => setNotePicker("E", 0)}>
        <NoteText step="E" alter={0} fontSize={pickerSize}/>
      </div>
      <div className="cell" onClick={() => setNotePicker("D", 0)}>
        <NoteText step="D" alter={0} fontSize={pickerSize}/>
      </div>
      <div className="cell" onClick={() => setNotePicker("C", 0)}>
        <NoteText step="C" alter={0} fontSize={pickerSize}/>
      </div>
    </div>

    <div className="column">
      <div className="cell" style={isNormalOnly ? freezeCss : void 0}
           onClick={e => {
             if (isNormalOnly) e.stopPropagation()
             else setNotePicker("B", 1)
           }}>
        <NoteText step="B" alter={1} fontSize={pickerSize}
                  color={isNormalOnly ? freezeFontColor : sideFlatNoteColor}/>
      </div>
      <div className="cell" onClick={() => setNotePicker("A", 1)}>
        <NoteText step="A" alter={1} fontSize={pickerSize} color={sideSharpNoteColor}/>
      </div>
      <div className="cell" onClick={() => setNotePicker("G", 1)}>
        <NoteText step="G" alter={1} fontSize={pickerSize} color={sideSharpNoteColor}/>
      </div>
      <div className="cell" onClick={() => setNotePicker("F", 1)}>
        <NoteText step="F" alter={1} fontSize={pickerSize} color={sideSharpNoteColor}/>
      </div>
      <div className="cell"
           style={isNormalOnly ? freezeCss : void 0}
           onClick={e => {
             if (isNormalOnly) e.stopPropagation()
             else setNotePicker("E", 1)
           }}>
        <NoteText step="E" alter={1} fontSize={pickerSize}
                  color={isNormalOnly ? freezeFontColor : sideFlatNoteColor}/>
      </div>
      <div className="cell" onClick={() => setNotePicker("D", 1)}>
        <NoteText step="D" alter={1} fontSize={pickerSize} color={sideSharpNoteColor}/>
      </div>
      <div className="cell" onClick={() => setNotePicker("C", 1)}>
        <NoteText step="C" alter={1} fontSize={pickerSize} color={sideSharpNoteColor}/>
      </div>
    </div>
  </div>
}

export default PhoneNotePicker

const phone_note_picker_css = css({
  ...cssPresets.flexCenter,
  borderRadius: 8,
  overflowX: "hidden",
  userSelect: "none",
  "& .column": {
    "& .cell": {
      ...cssPresets.flexCenter,
      width: "calc(100vw /4)",
      maxWidth: 100,
      height: "calc(100vh /8)",
      maxHeight: 70,
      backgroundColor: "white",
      cursor: "pointer",
      userSelect: "none",
      "&:active": {
        backgroundColor: googleColors.gray200
      },
    },
    "& .cell:not(:first-of-type)": {
      borderTop: "1px solid #e0e0e0"
    }
  },
  "& .column:not(:first-of-type)": {
    borderLeft: "1px solid #e0e0e0"
  }
})

const isNormalOnly_css = (i: boolean) => css({
  backgroundColor: i ? googleColors.blueGray300 : "white"
})