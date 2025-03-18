import * as React from "react"
import byDefault from "@/utils/byDefault.ts";
import googleColors from "@/assets/colors/googleColors.ts";

const SvgComponent = (props: {
  color: string
}) => {
  const color = byDefault(props.color, googleColors.blue800)
  return <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 200 200"
    width="1em"
    height="1em"
  >
    <path
      style={{
        fill: color,
      }}
      d="M180.88 45.4 135.35-.12 19.7 115.53l45.53 45.53L180.88 45.41Zm-51.4-28.28 28.46 28.46-5.78 5.77-28.45-28.43 5.78-5.8Zm-17.35 17.37 17.06 17.07-5.77 5.78-17.07-17.07 5.78-5.77ZM94.79 51.84l17.07 17.07-5.77 5.77-17.07-17.06 5.77-5.77ZM77.44 69.18 94.5 86.25l-5.78 5.77-17.06-17.07 5.77-5.77ZM60.09 86.53l17.07 17.07-5.77 5.77-17.07-17.06 5.77-5.78Zm-17.34 17.35 28.46 28.45-5.78 5.78-28.45-28.46 5.77-5.78Zm105.45 72.89H52.28v-10.71H20.11v32.25h32.2v-8.08h95.92v9.41h32.19v-32.27H148.2v9.4ZM41.81 187.66H30.95V176.7h10.86v10.96Zm117.25-9.64h10.86v10.97h-10.86v-10.97Z"/>
  </svg>
}
export default SvgComponent
