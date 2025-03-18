/* eslint-disable no-mixed-spaces-and-tabs */
import {css} from "@emotion/react";
import OctavePiano from "@/components/rePiano/OctavePiano.tsx";
import NoteText from "@/components/reNote/NoteText/NoteText.tsx";
import {useMemo} from "react";
import useScoreChecker from "@/apps/MobileScoreChecker/useScoreChecker/useScoreChecker.tsx";
import googleColors from "@/assets/colors/googleColors.ts";
import useSwipeX from "@/utils/useSwipeX.ts";
import {useWindowSize} from "react-use";
import {clamp} from "lodash";


const PianoSlide = () => {
  const {noteInstance, semitoneMove} = useScoreChecker()
  const swipeTrigger = (i: boolean) => {
    if (i) return semitoneMove(1)
    semitoneMove(-1)
  }
  const {width} = useWindowSize()
  const whiteKeyWidth = clamp(width / 7, 10, 55)
  const {handlers} = useSwipeX({onSwipeTrigger: swipeTrigger})
  const nodesList = useMemo(() => {
    const origin = Array.from({length: 12}, () => void 0)
    origin[noteInstance.locationId] = <div style={{marginBottom:3}}>
      <NoteText
        fontSize={25}
        color={googleColors.amber900}
        step={noteInstance.step} alter={noteInstance.alter}/>
    </div>
    return origin
  }, [noteInstance.alter, noteInstance.locationId, noteInstance.step])
  const colorList = useMemo(() => {
    const origin = Array.from({length: 12}, () => void 0)
    origin[noteInstance.locationId] = googleColors.amber200
    return origin
  }, [noteInstance.locationId])
  return <>
    <div css={PianoSlide_css} {...handlers}>
      <OctavePiano
        keyNodeList={nodesList}
        config={{whiteKeyWidth: whiteKeyWidth,
          whiteKeyBorderWidth:2.5,
          blackKeyBorderWidth:2.5,
          whiteKeyHeight: 150, keyBgColorList: colorList}}
        isPureDisplay={true}/>
    </div>
  </>
}

export default PianoSlide

const PianoSlide_css = css({
  userSelect: "none",
  marginTop: 15,
})
