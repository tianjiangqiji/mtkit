/* eslint-disable no-mixed-spaces-and-tabs */
import {css} from "@emotion/react";
import {useEffect, useMemo, useRef, useState} from "react";
import StaveWithOneNote from "@/components/reStave/StaveWindow/StaveWithOneNote.tsx";
import useGlobalSettings from "@/assets/stores/useGlobalSettings.ts";
import {useWindowSize} from "react-use";
import useSwipeY from "@/utils/useSwipeY.ts";
import * as music12 from "@/music12";
import useScoreChecker from "@/apps/MobileScoreChecker/useScoreChecker/useScoreChecker.tsx";
import useScoreHelperConfig from "@/assets/stores/useScoreHelperConfig.ts";
import useScoreCheckerConfig from "@/assets/stores/useScoreCheckerConfig.ts";

const StaveSlide = () => {
  const {
    notePickerStep,
    notePickerAlter,
    octave,
  } = useGlobalSettings()
  const {noteInstance, semitoneMove} = useScoreChecker()
  const {clef, keys} = useScoreCheckerConfig()
  const swipeTrigger = (isUpward: boolean) => {
    semitoneMove(isUpward ? 1 : -1)
  }

  const {width} = useWindowSize()
  const {handlers} = useSwipeY({onSwipeTrigger: swipeTrigger})
  return <>
    <div css={StaveSlide_css}  {...handlers}>
      <StaveWithOneNote step={notePickerStep} alter={notePickerAlter}
                        octave={octave}
                        clef={clef}
                        keys={keys}
                        w={width * 0.9}/>
    </div>
  </>
}

export default StaveSlide

const StaveSlide_css = css({
  userSelect: "none",
})
