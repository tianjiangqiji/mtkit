/* eslint-disable no-mixed-spaces-and-tabs */
import EmptyResult from "@/apps/FindNotesInChordOrScale/svg/EmptyResult.tsx";
import googleColors from "@/assets/colors/googleColors.ts";
import cssPresets from "@/assets/styles/cssPresets.ts";
import {css} from "@emotion/react";


const NoResult = () => {
  return <div css={noresult_css}>
    <div className="svg_frame">
      <EmptyResult color={googleColors.gray400}/>
    </div>
    <div className="empty_des">
      暂未发现结果
    </div>
  </div>
}
export default NoResult

const noresult_css = css({
  height: "60%",
  ...cssPresets.flexCenter,
  flexDirection: "column",
  "& .svg_frame": {
    width: 90,
    height: 150
  },
  "& .empty_des": {
    color: googleColors.gray400,
    marginTop: 3,
    fontSize: 16
  }
})

