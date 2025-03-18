import * as React from "react"
const SvgComponent = (props:{
  color?:string
}) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 100 60"
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
    <g transform="matrix(0.267894,0,0,0.267894,23.1832,3.21057)">
      <path
        d="M0.2,44.064L104.098,44.064L104.098,52.055L0.2,52.055L0.2,44.064ZM0.2,80.026L104.098,80.026L104.098,88.018L0.2,88.018L0.2,80.026ZM0.2,115.989L104.098,115.989L104.098,123.981L0.2,123.981L0.2,115.989ZM144.059,48.84L200.004,56.051C200.004,16.093 168.036,8.101 136.067,0.098L136.067,151.952L111.443,151.952C87.954,151.952 80.122,164.381 80.122,175.732C80.122,185.363 87.329,199.902 112.091,199.902C147.494,199.902 144.059,171.479 144.059,151.952L144.059,48.84Z"
        style={{
          fill: props.color,
          fillRule: "nonzero",
        }}
      />
    </g>
  </svg>
)
export default SvgComponent
