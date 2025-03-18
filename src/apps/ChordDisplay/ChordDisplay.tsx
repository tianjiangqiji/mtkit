/* eslint-disable no-mixed-spaces-and-tabs */
import NotePicker from "@/components/reNote/NotePicker/NotePicker.tsx";
import ChordSelector from "@/apps/ChordDisplay/components/ChordSelector.tsx";
import ChordNotesInterval from "@/apps/ChordDisplay/components/ChordNotesInterval.tsx";
import ChordWindow from "@/apps/ChordDisplay/parts/ChordWindow.tsx";
import ChordPiano from "@/apps/ChordDisplay/components/ChordPiano.tsx";
import ChordStave from "@/apps/ChordDisplay/components/ChordStave.tsx";
import ChordStaveConfigPopup from "@/apps/ChordDisplay/components/ChordStaveConfigPopup.tsx";
import ChordOctaveShiftPopup from "@/apps/ChordDisplay/components/ChordOctaveShiftPopup.tsx";
import {css} from "@emotion/react";
import useGlobalSettings from "@/assets/stores/useGlobalSettings.ts";


const ChordDisplay = () => {
  const {naviBarHeight} = useGlobalSettings()
  return <div css={main_css(naviBarHeight)}>
    <NotePicker isNormalOnly={true}/>
    <ChordStaveConfigPopup/>
    <ChordOctaveShiftPopup/>
    <ChordSelector/>
    <ChordWindow/>
    <ChordNotesInterval/>
    <ChordPiano/>
    <ChordStave/>
  </div>
}

export default ChordDisplay

const main_css = (h: number) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: calc(100vw);
    height: calc(100vh - ${h}px);
    box-sizing: border-box;
    overflow: hidden;
`
