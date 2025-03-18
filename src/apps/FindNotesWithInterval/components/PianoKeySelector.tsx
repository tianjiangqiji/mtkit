/* eslint-disable no-mixed-spaces-and-tabs */
import {css} from "@emotion/react";
import {useEffect, useMemo, useRef, useState} from "react";
import useFindInScaleConfig from "@/assets/stores/useHarmonicSeriesConfig.ts";
import OctavePiano from "@/components/rePiano/OctavePiano.tsx";
import googleColors from "@/assets/colors/googleColors.ts";
import {useWindowSize} from "react-use";
import {isEmpty, isNumber, min, range} from "lodash";
import useFindChord from "@/apps/FindNotesInChordOrScale/useFindChord.tsx";
import useFindChordConfig from "@/assets/stores/useFindChordConfig.ts";
import cssPresets from "@/assets/styles/cssPresets.ts";
import {LiaExchangeAltSolid} from "react-icons/lia";
import NumberNote from "@/components/reNote/NumberNote/NumberNote.tsx";

const toChineseText = (n: number) => {
  switch (n) {
    case 2:
      return "二"
    case 3:
      return "三"
    case 4:
      return "四"
    case 5:
      return "五"
    case 6:
      return "六"
    case 7:
      return "七"
    case 8:
      return "八"
    case 9:
      return "二"
    case 11:
      return "四"
    case 13:
      return "六"
  }
}
const keyFontSize = 18
const grayButtonBg = googleColors.gray300
const PianoKeySelector = () => {
  const {
    setDetailChordKeyAndLocation,
    isFindChordInScale,
    setIsFindChordInScale,
    setDetailModeKeyAndLocation,
    setIsFindNotesConfigWindowOpen,
    setSelectOnePianoLocation,
    pianoKeyIntervalList,
    setPianoKeyIntervalList
  } = useFindChordConfig()
  const keyColorList = useMemo(() => {
    const res = Array.from({length: 12}, () => void 0)
    if (pianoKeyIntervalList.length === 0) return res
    pianoKeyIntervalList.forEach((x, y) => {
      if (pianoKeyIntervalList[y]) res[y] = googleColors.amber200
    })
    return res
  }, [pianoKeyIntervalList])

  const {width} = useWindowSize()
  const handleClick = (k: number) => {
    setDetailChordKeyAndLocation(void 0)
    setIsFindNotesConfigWindowOpen(true)
    setSelectOnePianoLocation(k)
  }
  const keyNodeList = useMemo(() => {
    const emptyList = Array.from({length: 12}, () => void 0)
    pianoKeyIntervalList.map((x, y) => {
      if (!isNumber(x)) return;
      if (x === 0) return;
      emptyList[y] = <div css={node_css}>
        {toChineseText(x)}
      </div>
    })
    return emptyList
  }, [pianoKeyIntervalList])
  return <>
    <div css={PianoKeySelector_css}>
      <OctavePiano
        config={{
          keyBgColorList: keyColorList,
          whiteKeyWidth: min([60, width / 7]),
          blackKeyWidthRatio: 0.8,
          whiteKeyBorderWidth: 2.5,
          blackKeyBorderWidth: 2.5,
          blackKeyBorderRadius: range(5).map(() => [0, 0, 6, 6]),
          whiteKeyHeight: 150,
        }}
        keyNodeList={keyNodeList}
        onClick={handleClick}/>
      <div className="options">
        <div className="reset_key" onClick={() => {
          setIsFindChordInScale(!isFindChordInScale)
          setDetailModeKeyAndLocation(void 0)
          setDetailChordKeyAndLocation(void 0)
        }}>
          <LiaExchangeAltSolid color={googleColors.blue800} size={15}/>
          <div style={{marginLeft: 5}}>
            {isFindChordInScale ? "在调式" : "仅和弦"}
          </div>
        </div>
        <div className="reset_key" onClick={() => {
          setPianoKeyIntervalList(Array.from({length: 12}, () => 0))
          setDetailChordKeyAndLocation(void 0)
        }}>清空
        </div>
      </div>
    </div>
  </>
}

export default PianoKeySelector

const PianoKeySelector_css = css({
  "& .options": {
    marginTop: 10,
    width: "100%",
    height: 50,
    gap: 10,
    ...cssPresets.flexCenter,
  },
  "& .reset_key": {
    width: 150,
    height: 40,
    backgroundColor: "white",
    ...cssPresets.flexCenter,
    borderRadius: 999,
    color: googleColors.blue800,
    ...cssPresets.defaultHoverAndActive as any
  }
})

const node_css = css({
  background: googleColors.red300,
  borderRadius: 999,
  width: 35,
  height: 35,
  color: "white",
  marginBottom: 0,
  fontSize: keyFontSize,
  ...cssPresets.flexCenter
})

