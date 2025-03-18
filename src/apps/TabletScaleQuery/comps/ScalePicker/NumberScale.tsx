/* eslint-disable no-mixed-spaces-and-tabs */
import NumberNote from "@/components/reNote/NumberNote/NumberNote.tsx";
import {range} from "lodash";
import cssPresets from "@/assets/styles/cssPresets.ts";
import {css} from "@emotion/react";
import byDefault from "@/utils/byDefault.ts";

const eachWidth = 25
const NumberScale = (props: {
  alterArray: number[],
  fontSize: number,
  color: string
  width?: number
}) => {
  // if (props.alterArray.length !== 7) throw Error("必须是7位")
  const w = byDefault(props.width, eachWidth)
  return <>
    <div css={number_scale_css}>
      {range(0, 7).map(x => <div key={x} style={{width: w}}>
        <NumberNote num={x + 1} color={props.color}
                    alter={props.alterArray[x]}
                    fontSize={props.fontSize}/></div>)}
    </div>
  </>
}

export default NumberScale

const number_scale_css = css({
  ...cssPresets.flexCenter
})
