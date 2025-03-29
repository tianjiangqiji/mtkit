/* eslint-disable no-mixed-spaces-and-tabs */
import React, {useMemo} from "react";
import useGlobalSettings from "@/assets/stores/useGlobalSettings.ts";
import useScaleConfig from "@/assets/stores/useScaleConfig.ts";
import music12 from "@/music12"
import collect from "collect.js";
import byDefault from "@/utils/byDefault.ts";
import googleColors from "@/assets/colors/googleColors.ts";
import NoteText from "@/components/reNote/NoteText/NoteText.tsx";
import NumberNote from "@/components/reNote/NumberNote/NumberNote.tsx";
import findFirstIndexLessThanLeft from "@/utils/findFirstIndexLessThanLeft.ts";
import {isEmpty, isNumber, sum} from "lodash";

const useScaleInstance = (config?: {
  selectedKeyColor?: string
  pianoNodeFontSize?: number
  pianoNodeFontColor?: string
}) => {
  const selectedKeyColor = byDefault(config?.selectedKeyColor, googleColors.amber200)
  const pianoNodeFontSize = byDefault(config?.pianoNodeFontSize, 16)
  const pianoNodeFontColor = byDefault(config?.pianoNodeFontColor, googleColors.deepOrange800)
  const {notePickerStep, notePickerAlter} = useGlobalSettings()
  const {mode} = useScaleConfig()
  const scaleInstance = useMemo(() => {
    return music12.factory.getScale(notePickerStep, notePickerAlter, 4, mode)
  }, [mode, notePickerStep, notePickerAlter])
  const {staveAlterDisplayBy, pianoNodeDisplayBy} = useScaleConfig()

  //决定乐谱是用什么调号
  const keys = useMemo(() => {
    if (staveAlterDisplayBy === "alters") {
      if (Math.abs(scaleInstance.alterSum) > 7) {
        return scaleInstance.alterSum
      }
      return scaleInstance.alterSum
    }
    if (staveAlterDisplayBy === "none") {
      return 0
    }

    if (scaleInstance.type === "major") {
      const obj = collect(music12.stave.getStaveAlterByNote(notePickerStep as any, notePickerAlter as any))
        .where("mode", "major").first().rawStaveAlters
      if (isNumber(obj)) return obj
      return sum(scaleInstance.alterList)
    }
    const obj = collect(music12.stave.getStaveAlterByNote(notePickerStep as any, notePickerAlter as any))
      .where("mode", "!=", "major").first().rawStaveAlters
    if (isNumber(obj)) return obj
    return sum(scaleInstance.alterList)
  }, [notePickerAlter, notePickerStep, scaleInstance, staveAlterDisplayBy])

  // 将调式用两个八度隔开的数组
  const slicedLocationList = useMemo(() => {
    const locationIDList = scaleInstance.notesList.map(x => x.locationId)
    const sliceIndex = findFirstIndexLessThanLeft(locationIDList)
    if (sliceIndex === -1) {
      return [locationIDList, []]
    }
    return [locationIDList.slice(0, sliceIndex), locationIDList.slice(sliceIndex)]
  }, [scaleInstance.notesList])


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
  }, [selectedKeyColor, slicedLocationList])

  // 决定钢琴键盘上是否显示数字或字母的函数
  const nodeList = useMemo(() => {
    const li = [Array.from({length: 12}, () => void 0), Array.from({length: 12}, () => void 0)]
    if (pianoNodeDisplayBy === "note") {
      slicedLocationList[0].forEach((x, y) => {
        li[0][x] = <NoteText step={scaleInstance.notesList[y].step}
                             fontSize={pianoNodeFontSize}
                             color={pianoNodeFontColor}
                             alter={scaleInstance.notesList[y].alter}
        />
      })
      slicedLocationList[1].forEach((x, y) => {
        const l = slicedLocationList[0].length
        li[1][x] = <NoteText step={scaleInstance.notesList[y + l].step}
                             color={pianoNodeFontColor}
                             fontSize={pianoNodeFontSize}
                             alter={scaleInstance.notesList[y + l].alter}
        />
      })
      return li
    } else if (["number", "rome"].includes(pianoNodeDisplayBy)) {
      slicedLocationList[0].forEach((x, y) => {
        li[0][x] = <NumberNote num={y + 1}
                               isRomeStyle={pianoNodeDisplayBy === "rome"
                               }
                               fontSize={pianoNodeFontSize - 1}
                               color={pianoNodeFontColor}
                               alter={scaleInstance.alterList[y]}
        />
      })
      slicedLocationList[1].forEach((x, y) => {
        const l = slicedLocationList[0].length
        li[1][x] = <NumberNote num={y + 1 + l}
                               color={pianoNodeFontColor}
                               isRomeStyle={pianoNodeDisplayBy === "rome"
                               }
                               fontSize={pianoNodeFontSize - 1}
                               alter={scaleInstance.alterList[y + l]}
        />
      })
      return li
    }
    return li
  }, [pianoNodeDisplayBy, pianoNodeFontColor, pianoNodeFontSize, scaleInstance.alterList, scaleInstance.notesList, slicedLocationList])


  return {
    scaleInstance, keys, slicedLocationList, colorList, nodeList
  }
}

export default useScaleInstance

