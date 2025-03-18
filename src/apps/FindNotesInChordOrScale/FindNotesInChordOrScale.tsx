/* eslint-disable no-mixed-spaces-and-tabs */
import {css} from "@emotion/react";
import PianoKeySelector from "@/apps/FindNotesInChordOrScale/components/PianoKeySelector.tsx";
import cssPresets from "@/assets/styles/cssPresets.ts";
import useGlobalSettings from "@/assets/stores/useGlobalSettings.ts";
import FindResult from "@/apps/FindNotesInChordOrScale/parts/FindResult.tsx";


const FindNotesInChordOrScale = () => {
  const {naviBarHeight} = useGlobalSettings()
  return <>
    <div css={FindChord_css(naviBarHeight)}>
      {/*高度为220*/}
      <div className="selector_frame">
        <PianoKeySelector/>
      </div>
      <div className="main_result">
        <FindResult/>
      </div>

    </div>
  </>
}

export default FindNotesInChordOrScale

const FindChord_css = (naviBarHeight: number) => css({
  ...cssPresets.flexCenter,
  flexDirection: "column",
  "& .selector_frame": {
    height: 200
  },
  "& .main_result": {
    marginTop:20,
    height: `calc(100vh - 220px - ${naviBarHeight}px)`,
    width: "100vw",
    overflowY: "auto"
  }
})
