/* eslint-disable no-mixed-spaces-and-tabs */
import {css} from "@emotion/react";
import {useEffect, useRef, useState} from "react";
import EmptyResult from "@/apps/FindNotesInChordOrScale/svg/EmptyResult.tsx";
import googleColors from "@/assets/colors/googleColors.ts";
import cssPresets from "@/assets/styles/cssPresets.ts";


const NoResult = () => {
  return <>
    <div css={NoResult_css}>
      <div className="svg_frame">
        <EmptyResult color={googleColors.gray400}/>
      </div>
      <div className="empty_des">
        请选择音符开始查询泛音列
      </div>
    </div>
  </>
}

export default NoResult

const NoResult_css = css({
  height: "calc(40vh)",
  userSelect: "none",
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
