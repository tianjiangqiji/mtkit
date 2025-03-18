/* eslint-disable no-mixed-spaces-and-tabs */
import {css} from "@emotion/react";
import NoteText from "@/components/reNote/NoteText/NoteText.tsx";
import cssPresets from "@/assets/styles/cssPresets.ts";
import googleColors from "@/assets/colors/googleColors.ts";
import useGlobalSettings from "@/assets/stores/useGlobalSettings.ts";
import Piano251 from "@/apps/Temp251/parts/Piano251.tsx";

const asNumberFontSize = 30
const asNumberColor = googleColors.blue800
const Each251 = (props: {
  notesList: any[],
  as: number
}) => {
  const {notePickerStep, notePickerAlter, setNotePickerStep, setNotePickerAlter} = useGlobalSettings()
  return <>
    <div css={Each251_css}>
      <div className="as">
        <div className="as_number">
          <NoteText step={notePickerStep}
                    alter={notePickerAlter}
                    color={asNumberColor}
                    fontSize={asNumberFontSize}/>
          ={props.as}
        </div>
        <div className="notes_frame">
          {props.notesList.map((note) => <div
            onClick={() => {
              if (Math.abs(note.alter) === 2) return;
              setNotePickerStep(note.step)
              setNotePickerAlter(note.alter)
            }}
            key={note.locationId} className="each_note">
            <NoteText step={note.step}
                      alter={note.alter}
                      fontSize={35}/>
          </div>)}
        </div>
      </div>
      <Piano251 notesList={props.notesList}/>
    </div>
  </>
}

export default Each251

const Each251_css = css({
  "& .as": {
    ...cssPresets.flexCenter,
    marginBottom: 15,
    "& .as_number": {
      ...cssPresets.flexCenter,
      fontSize: asNumberFontSize,
      color: asNumberColor,
      width: 90,
      justifyContent: "start"
    },
    "& .each_note": {
      width: 60,
      paddingTop: 10,
      paddingBottom: 10,
      backgroundColor: "white",
    },
    "& .notes_frame": {
      ...cssPresets.flexCenter,
      borderRadius: 8,
      overflow: "hidden",
      "& .each_note:not(:first-of-type)": {
        borderLeft: `1px solid ${googleColors.gray200}`,
      },
      "& .each_note": {
        ...cssPresets.defaultHoverAndActive as any
      }

    }
  }
})
