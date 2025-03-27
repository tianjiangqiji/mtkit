/* eslint-disable no-mixed-spaces-and-tabs */
import googleColors from "@/assets/colors/googleColors.ts";
import useScoreHelperConfig from "@/assets/stores/useScoreHelperConfig.ts";
import cssPresets from "@/assets/styles/cssPresets.ts";
import {css} from "@emotion/react";
import useScaleByStaveAlter from "@/apps/MobileKSQuery/useMobileKs/useScaleByStaveAlter.ts";
import AlterStaveWindow from "@/apps/TabletScaleQuery/comps/AlterStaveWindow.tsx";
import ScaleCard from "@/apps/TabletScaleQuery/comps/ScaleCard.tsx";
import useGlobalSettings from "@/assets/stores/useGlobalSettings.ts";
import useScaleConfig from "@/assets/stores/useScaleConfig.ts";
import {useNavigate} from "react-router-dom";
import routerPath from "@/router/routerPath.ts";

const alterColor = googleColors.blue800
const PhoneAlters2Stave = () => {
  const {staveAlters, isStaveSharp} = useScoreHelperConfig();
  const {setNotePickerStep, setNotePickerAlter} = useGlobalSettings()
  const {setMode} = useScaleConfig()
  const navigate = useNavigate()
  const scaleByStaveAlter = useScaleByStaveAlter();
  return <>
    <div css={PhoneAlters2Stave_css}>
      <AlterStaveWindow staveAlters={staveAlters}
                        isStaveSharp={isStaveSharp}
                        color={alterColor}
                        keySig={isStaveSharp ? staveAlters : staveAlters * -1}/>
      <div className="scale_cards_display">
        <ScaleCard step={scaleByStaveAlter.maj["rawNoteStep"]}
                   alter={scaleByStaveAlter.maj["rawNoteAlter"]}
                   onClick={() => {
                     setNotePickerStep(scaleByStaveAlter.maj["rawNoteStep"])
                     setNotePickerAlter(scaleByStaveAlter.maj["rawNoteAlter"])
                     setMode("MAJ")
                     navigate(`/${routerPath.mobile_scaleTable}`, {replace: true})
                   }}
                   isMajor={true}/>
        <ScaleCard step={scaleByStaveAlter.min["rawNoteStep"]}
                   onClick={() => {
                     setNotePickerStep(scaleByStaveAlter.min["rawNoteStep"])
                     setNotePickerAlter(scaleByStaveAlter.min["rawNoteAlter"])
                     setMode("MIN")
                     navigate(`/${routerPath.mobile_scaleTable}`, {replace: true})
                   }}
                   alter={scaleByStaveAlter.min["rawNoteAlter"]}
                   isMajor={false}/>
      </div>
    </div>
  </>
}

export default PhoneAlters2Stave

const PhoneAlters2Stave_css = css({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  "& .scale_cards_display": {
    marginBottom: 20,
    ...cssPresets.flexCenter,
    gap: 20,
    userSelect: "none",
  },
})
