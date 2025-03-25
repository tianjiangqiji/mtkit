/* eslint-disable no-mixed-spaces-and-tabs */
import {css} from "@emotion/react";
import OctavePiano from "@/components/rePiano/OctavePiano.tsx";
import cssPresets from "@/assets/styles/cssPresets.ts";
import {useMemo} from "react";
import findFirstIndexLessThanLeft from "@/utils/findFirstIndexLessThanLeft.ts";
import googleColors from "@/assets/colors/googleColors.ts";
import {useWindowSize} from "react-use";
import {min} from "lodash";

const pianoConfig = {
  blackKeyBorderWidth: 2,
  whiteKeyHeight: 100,
  whiteKeyBorderRadius: Array.from({length: 7}, () => [0, 0, 5, 5])
}
const selectedKeyColor = googleColors.amber200

const Piano251 = (props: {
  notesList: any[]
}) => {
  // 将调式用两个八度隔开的数组
  const slicedLocationList = useMemo(() => {
    const locationIDList = props.notesList.map(x => x.locationId)
    const sliceIndex = findFirstIndexLessThanLeft(locationIDList)
    if (sliceIndex === -1) {
      return [locationIDList, []]
    }
    return [locationIDList.slice(0, sliceIndex), locationIDList.slice(sliceIndex)]
  }, [props.notesList])

  // 决定钢琴键盘是什么颜色的函数
  const colorList = useMemo(() => {
    const li = [Array.from({length: 12}, () => void 0), Array.from({length: 12}, () => void 0)]
    slicedLocationList[0].forEach(x => {
      li[0][x] = selectedKeyColor
    })
    slicedLocationList[1].forEach(x => {
      li[1][x] = selectedKeyColor
    })
    return li
  }, [slicedLocationList])
  const {width} = useWindowSize()
  const keyWidth = min([width / 14, 35])
  return <>
    <div css={Piano251_css}>
      <OctavePiano config={{...pianoConfig, whiteKeyWidth: keyWidth, keyBgColorList: colorList[0]}}
                   isPureDisplay={true}/>
      <OctavePiano config={{...pianoConfig, whiteKeyWidth: keyWidth, keyBgColorList: colorList[1]}} isPureDisplay={true}
                   ml={-2}/>
    </div>
  </>
}

export default Piano251

const Piano251_css = css({
  ...cssPresets.flexCenter,
  marginBottom: 20
})
