import * as React from "react"
import byDefault from "@/utils/byDefault.ts";
//标注color类型为string
const SvgComponent = ({color, fill}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
  >
    <circle
      cx={50}
      cy={50}
      r={47.6}
      width={"100%"}
      height={"100%"}
      style={{
        fill: byDefault(fill, "none"),
        stroke: color,
        strokeMiterlimit: 10,
        strokeWidth: 4,
      }}
    />
    <path
      d="M60 74.4V73c5.7-.4 6.5-1.5 6.5-7.5V33.2L48.1 74.4h-1L29 34.9v28.7c0 7.9 1.2 9.2 6.7 9.5v1.4H18.9v-1.4c6-.4 7-1.4 7-9.5V34.9c0-5.5-.9-6.4-6.8-6.8v-1.4h14.3L50 62.8l15.9-36.1h14.3v1.4c-5.2 0-6.3 1.3-6.3 6.7v31.5c0 5.1 1.1 6.3 6.3 6.7v1.4H60Z"
      style={{
        fill: color,
      }}
    />
  </svg>
)
export default SvgComponent
