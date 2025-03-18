import * as React from "react"
import byDefault from "@/utils/byDefault.ts";

const SvgComponent = ({color, fill}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
  >
    <circle
      cx={50}
      cy={50}
      r={47.6}
      style={{
        fill: byDefault(fill, "none"),
        stroke: color,
        strokeMiterlimit: 10,
        strokeWidth: 4,
      }}
    />
    <path
      d="M63.4 69.9v-1.2c4.5-.5 5.2-1.4 5.2-6V46.2c0-6.3-1.6-9-6.2-9s-6.2 1.4-8.6 4.9v20.2c0 5.2 1.2 6.3 5.8 6.4v1.2H41.7v-1.2c4.6-.3 5.4-.8 5.4-5.7V46.1c0-5.5-1.8-8.9-5.2-8.9s-6.9 1.5-8.5 3.4c-.6.6-1 1.2-1 1.4v22.2c0 3.4 1.2 4.2 5.4 4.4v1.2H20v-1.2c4.5 0 5.6-1.2 5.6-5.8V43c0-3.9-.7-5.3-2.8-5.3s-1.5 0-2.6.3v-1.4c4.4-1.2 7-2.1 11.1-3.6l.6.2v5.9h.2c5.3-5.4 8.6-6.2 12.2-6.2s7 2.2 8.5 6.7c4.3-4.6 8.4-6.7 13-6.7s9.3 5 9.3 14.4v16.2c0 3.6 1 4.6 3.4 4.8l2.1.2v1.2H63.2Z"
      style={{
        fill: color,
      }}
    />
  </svg>
)
export default SvgComponent
