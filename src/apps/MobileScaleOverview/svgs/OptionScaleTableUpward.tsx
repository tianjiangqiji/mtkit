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
      d="M69.1,2.991L81.833,18.908L72.283,18.908L72.283,57.108L65.917,57.108L65.917,18.908L56.367,18.908L69.1,2.991ZM53.183,50.741L53.183,57.108L18.167,57.108L18.167,50.741L53.183,50.741ZM53.183,28.458L53.183,34.825L18.167,34.825L18.167,28.458L53.183,28.458ZM46.817,6.175L46.817,12.541L18.167,12.541L18.167,6.175L46.817,6.175Z"
      style={{
        fill: props.color,
        fillRule: "nonzero",
      }}
    />
  </svg>
)
export default SvgComponent
