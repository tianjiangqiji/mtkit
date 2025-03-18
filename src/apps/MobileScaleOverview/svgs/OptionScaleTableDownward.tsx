import * as React from "react"

const SvgComponent = (props: {
  color: string
}) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 100 61"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    xmlSpace="preserve"
    style={{
      fillRule: "evenodd",
      clipRule: "evenodd",
      strokeLinejoin: "round",
      strokeMiterlimit: 2,
    }}
  >
    <path
      d="M69.1 57.108 56.367 41.191h9.55v-38.2h6.366v38.2h9.55L69.1 57.108ZM18.167 50.741h35.017v6.367H18.167zM18.167 28.458h35.017v6.367H18.167zM18.167 6.175h28.65v6.367h-28.65z"
      style={{
        fill: props.color,
        fillRule: "nonzero",
      }}
    />
  </svg>
)
export default SvgComponent
