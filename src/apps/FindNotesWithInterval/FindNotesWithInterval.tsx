/* eslint-disable no-mixed-spaces-and-tabs */
import {css} from "@emotion/react";
import PianoKeySelector from "./components/PianoKeySelector.tsx";
import cssPresets from "@/assets/styles/cssPresets.ts";
import useGlobalSettings from "@/assets/stores/useGlobalSettings.ts";
import FindResult from "./parts/FindResult.tsx";
import FindNotesConfigPopup from "@/apps/FindNotesWithInterval/components/FindNotesConfigPopup.tsx";


const FindNotesWithInterval = () => {
  const {naviBarHeight} = useGlobalSettings()
  return <>
    <FindNotesConfigPopup/>
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

export default FindNotesWithInterval

const FindChord_css = (naviBarHeight: number) => css({
  ...cssPresets.flexCenter,
  flexDirection: "column",
  "& .selector_frame": {
    height: 200
  },
  "& .main_result": {
    marginTop: 20,
    height: `calc(100vh - 220px - ${naviBarHeight}px)`,
    width: "100vw",
    overflowY: "auto"
  }
})
