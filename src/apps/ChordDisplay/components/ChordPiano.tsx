/* eslint-disable no-mixed-spaces-and-tabs */
import {css} from "@emotion/react";
import {useEffect, useRef, useState} from "react";
import useChord from "@/apps/ChordDisplay/useChord.ts";
import OctavePiano from "@/components/rePiano/OctavePiano.tsx";
import cssPresets from "@/assets/styles/cssPresets.ts";
import GoogleColors from "@/assets/colors/googleColors.ts";
import googleColors from "@/assets/colors/googleColors.ts";
import {useWindowSize} from "react-use";

const selectedKeyColor = googleColors.amber200
const pianoConfig = {
  blackKeyBorderWidth: 2,
  whiteKeyBorderRadius: Array.from({length: 7}, () => [0, 0, 5, 5])
}
const ChordPiano = () => {
  const {chordKeyboard} = useChord()
  const {width} = useWindowSize()
  const whiteKeyWidth = width >= 620 ? 30 : 25
  const wholeWidth = whiteKeyWidth * 21
  return <>
    <div css={ChordPiano_css(wholeWidth)}>
      <div className="inner_frame">
        <div>
          <OctavePiano isPureDisplay={true}
                       config={{...pianoConfig, whiteKeyWidth, keyBgColorList: chordKeyboard[0]}}/>
          <div className="o1">1</div>
        </div>
        <div>
          <OctavePiano isPureDisplay={true}
                       config={{...pianoConfig, whiteKeyWidth, keyBgColorList: chordKeyboard[1]}}
                       ml={-2}/>
          <div className="o2">2</div>
        </div>
        <div>
          <OctavePiano isPureDisplay={true}
                       config={{...pianoConfig, whiteKeyWidth, keyBgColorList: chordKeyboard[2]}}
                       ml={-2}/>
          <div className="o3">3</div>
        </div>


      </div>

    </div>
  </>
}

export default ChordPiano

const ChordPiano_css = (w) => css({
  width: "calc(100vw)",
  overflowY: "scroll",
  display: "block",
  marginLeft: "auto",
  marginRight: "auto",
  marginTop: 10,
  "& .inner_frame": {
    ...cssPresets.flexCenter,
    width: w,
    marginLeft: "auto",
    marginRight: "auto"
  },
  "& .o1": {
    backgroundColor: googleColors.blue200,
    color: googleColors.gray600,
  },
  "& .o2": {
    backgroundColor: googleColors.green100,
    color: googleColors.gray600,
  }, "& .o3": {
    backgroundColor: googleColors.yellow100,
    color: googleColors.gray600,
  },
  "& .o1,.o2,.o3": {
    marginBottom: 15,
    height: 35,
    ...cssPresets.flexCenter
  }
})
