import {css} from "@emotion/react";
import NoteText from "@/components/reNote/NoteText/NoteText.tsx";
import {MdReadMore} from "react-icons/md";
import googleColors from "@/assets/colors/googleColors.ts";
import byDefault from "@/utils/byDefault.ts";
import cssPresets from "@/assets/styles/cssPresets.ts";
import {isMobile} from "react-device-detect";

const ScaleCard = (props: {
  step: string
  alter: number
  isMajor: boolean
}) => {
  const step = byDefault(props.step, "C")
  const alter = byDefault(props.alter, 0)
  const isMajor = byDefault(props.isMajor, true)
  return <>
    <div css={scale_card_css}>
      <div className="card_frame">
        <div className="maj scale_frame">
          <NoteText step={step} alter={alter} fontSize={35}/>
          <div className="cn">{isMajor ? "自然大调" : "自然小调"}</div>
          <div className="cl">{isMajor ? "Ionian" : "Aeolian"}</div>
        </div>
        <div className="details">
          <span>详细</span>
          <MdReadMore color={googleColors.blue800} size={28}/>
        </div>
      </div>
    </div>
  </>
}
export default ScaleCard

const scale_card_css = css({
  "& .card_frame": {
    ...cssPresets.flexCenter,
    flexDirection: "column",
    "& .details": {
      fontFamily: "misans-m",
      userSelect: "none",
      fontSize: 20,
      color: googleColors.blue800,
      ...cssPresets.flexCenter,
      height: 40,
      ...cssPresets.transition,
      backgroundColor: "white",
      cursor: "pointer",
      marginTop: 10,
      width: 120,
      borderRadius: 999,
      border: `1px solid ${googleColors.gray300}`,

      "&>span": {
        marginRight: 5,
      },
      "&:hover": {
        backgroundColor: isMobile ? "" : googleColors.gray200
      },
      "&:active": {
        backgroundColor: googleColors.gray300
      },
    },
  },
  "& .scale_frame": {
    width: 120,
    height: 160,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 8,
    ...cssPresets.flexCenter,
    flexDirection: "column",
    userSelect: "none",
    "& .cn": {
      fontFamily: "misans-m",
      fontSize: 20,
      marginTop: 8,
      color: googleColors.gray800
    },
    "& .cl": {
      fontFamily: "misans-m",
      userSelect: "none",
      fontSize: 20,
      color: googleColors.gray800
    }
  }
})