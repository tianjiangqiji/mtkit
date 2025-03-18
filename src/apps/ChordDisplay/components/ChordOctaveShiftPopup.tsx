/* eslint-disable no-mixed-spaces-and-tabs */

import {css} from "@emotion/react";
import {Mask} from "antd-mobile";
import cssPresets from "@/assets/styles/cssPresets.ts";
import useChordConfig from "@/assets/stores/useChordConfig.ts";
import music12 from "music12";
import googleColors from "@/assets/colors/googleColors.ts";
import GoogleColors from "@/assets/colors/googleColors.ts";
import {useWindowSize} from "react-use";
import useChord from "@/apps/ChordDisplay/useChord.ts";
import React from "react";
import NoteText from "@/components/reNote/NoteText/NoteText.tsx";
import {BiSolidDownArrow, BiSolidUpArrow} from "react-icons/bi";


const ChordOctaveShiftPopup = () => {
  // const {isNotePickerOpen, setNotePickerOpen} = useGlobalSettings();
  const {
    isChordOctaveShiftOpen, setIsChordOctaveShiftOpen
  } = useChordConfig()
  const {chord, chordVoicing, shiftOneOctave, resetOctave} = useChord()
  const givenItv = (i: number) => {
    const itv = music12.interval.getIntervalByComparingNotes(chord.rootNote, chord.notesList[i])
    const itvDes = itv.cnPrefix
    const degree = itv.num
    return `${itvDes}${degree}`
  }

  // const isWideScreen = useIsWideScreen();
  const {width} = useWindowSize();
  return (<>
    <Mask visible={isChordOctaveShiftOpen}
          style={{...cssPresets.defaultBlur}}
          opacity={0.5}
          destroyOnClose={true}>
      <div css={note_picker_css(width)} onClick={() => setIsChordOctaveShiftOpen(false)}>
        <div className="inner_frame">
          <div className="reset_octave" onClick={resetOctave}>重置八度</div>
          {chord.notesList.map((x, y) => <div key={x.locationId} className="line">
            <div className="window">
              <NoteText fontSize={25} step={x.step} alter={x.alter}/>
              <div className="des">{y === 0 ? "根音" : givenItv(y)}</div>
            </div>
            <div className="options">
              <div className="up option" onClick={() => shiftOneOctave(y, 1)}>
                <BiSolidUpArrow style={{marginRight: 5}}/>
                上升八度
              </div>
              <div className="down option" onClick={() => shiftOneOctave(y, -1)}>
                <BiSolidDownArrow style={{marginRight: 5}}/>
                下降八度
              </div>
            </div>
          </div>)}


        </div>
      </div>
    </Mask>
  </>)

}

export default ChordOctaveShiftPopup

const note_picker_css = (w: number) => css({
  userSelect: "none",
  width: "calc(100vw)",
  height: "calc(100vh)",
  zIndex: 999,
  overflowY: "auto",
  ...cssPresets.flexCenter,
  "& .inner_frame": {
    width: "fit-content",
    overflowY: "auto",
    // overflowX: "hidden",
    userSelect: "none",
    ...cssPresets.flexCenter,
    flexDirection:"column-reverse",
    "& .line": {
      ...cssPresets.flexCenter,
      paddingTop: 5,
      paddingBottom: 5,
      flexDirection: "column",
      marginBottom: 25,
      "& .window": {
        ...cssPresets.flexCenter,
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 999,
        backgroundColor: "white",
        "& .des": {
          width: 35,
          marginLeft: 10,
          color: googleColors.blueGray500,
        }
      },
      "& .options": {
        ...cssPresets.flexCenter,
        marginTop: 5,
        borderRadius: 8,
        overflow: "hidden",
        "& .option:not(:first-of-type)": {
          borderLeft: `1px solid ${GoogleColors.gray300}`
        },
        "& .option": {
          backgroundColor: "white",
          width: 150,
          height: 60,
          fontSize: 20,
          ...cssPresets.flexCenter,
          color: googleColors.blue800,
          ...cssPresets.defaultHoverAndActive as any
        }
      },
    }
  }, "& .reset_octave": {
    backgroundColor: googleColors.gray300,
    width: 120,
    height: 40,
    ...cssPresets.flexCenter,
    borderRadius: 999,
    color: googleColors.gray600,
    ...cssPresets.defaultHoverAndActive as any,
    marginLeft: "auto",
    marginRight: "auto",

  }
})
