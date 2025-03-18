import * as React from "react"
import googleColors from "@/assets/colors/googleColors.ts";

const halfDimBgColor = googleColors.purple50
const halfDimStrokeColor = googleColors.purple800


const SvgComponent = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
  >
    <circle
      cx={50}
      cy={50}
      r={47.6}
      style={{
        fill: halfDimBgColor,
        stroke: halfDimStrokeColor,
        strokeMiterlimit: 10,
        strokeWidth: 4,
      }}
    />
    <path
      d="M61 31.5c6 4.1 8.8 9.7 8.8 17.3 0 12.5-8.6 22-20.1 22s-5.2-.5-8.4-1.9L35.5 80h-3.3l6.6-12.6c-3.2-2.6-4.4-4-5.8-6.6-1.8-3.3-2.8-7.4-2.8-11.3 0-12.2 8.2-21 19.8-21s5.1.5 8.3 1.6l5.1-9.8h3.5L61 31.5Zm-5 2.7c-2.4-2.3-4.4-3.2-7.2-3.2-6.4 0-10.6 5.6-10.6 13.9s1.1 11.4 3.5 16.6L56 34.1ZM43.6 64.5c2.2 2.7 4.3 3.8 7.4 3.8 6.8 0 10.7-6.1 10.7-16.6s-1-9.7-3.6-14.7L43.6 64.5Z"
      style={{
        fill: halfDimStrokeColor,
      }}
    />
  </svg>
)
export default SvgComponent
