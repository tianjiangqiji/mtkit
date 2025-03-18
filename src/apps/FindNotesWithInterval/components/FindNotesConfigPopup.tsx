/* eslint-disable no-mixed-spaces-and-tabs */
import {css} from "@emotion/react";
import cssPresets from "@/assets/styles/cssPresets.ts";
import {Mask} from "antd-mobile";
import useFindChordConfig from "@/assets/stores/useFindChordConfig.ts";
import OctavePiano from "@/components/rePiano/OctavePiano.tsx";
import {min, range} from "lodash";
import {useMemo} from "react";
import {useWindowSize} from "react-use";
import googleColors from "@/assets/colors/googleColors.ts";
import NoteByLocation from "@/components/reNote/NoteByLocation/NoteByLocation.tsx";


const FindNotesConfigPopup = () => {
  const {
    isFindNotesConfigWindowOpen, setIsFindNotesConfigWindowOpen,
    selectOnePianoLocation, setSelectOnePianoLocation, pianoKeyIntervalList, setPianoKeyIntervalList
  } = useFindChordConfig()
  const keyColorList = useMemo(() => {
    const emptyColorList = range(12).map(() => void 0)
    emptyColorList[selectOnePianoLocation] = googleColors.amber200
    return emptyColorList
  }, [selectOnePianoLocation])
  const {width} = useWindowSize()
  const applyInterval = (interval: number) => {
    const newList = [...pianoKeyIntervalList]
    newList[selectOnePianoLocation] = interval
    setPianoKeyIntervalList(newList)
    setIsFindNotesConfigWindowOpen(false)
  }
  return <>
    <Mask visible={isFindNotesConfigWindowOpen}
          destroyOnClose={true}
          style={{...cssPresets.defaultBlur, ...cssPresets.flexCenter}}
          onMaskClick={() => setIsFindNotesConfigWindowOpen(false)}>
      <div css={FindNotesConfigPopup_css}>
        <OctavePiano
          isPureDisplay={true}
          config={{
            keyBgColorList: keyColorList,
            whiteKeyWidth: min([45, width / 7]),
            blackKeyWidthRatio: 0.8,
            whiteKeyBorderWidth: 2.5,
            blackKeyBorderWidth: 2.5,
            blackKeyBorderRadius: range(5).map(() => [0, 0, 6, 6]),
            whiteKeyHeight: 120,
          }}/>
        <div className="as_note">
          <NoteByLocation location={selectOnePianoLocation} fontSize={25} color={googleColors.blueGray500}/>
        </div>
        <div className="options">
          {!pianoKeyIntervalList.includes(3)
            && <div className="option" onClick={() => applyInterval(3)}>作为三音</div>}
          {!pianoKeyIntervalList.includes(5)
            && <div className="option" onClick={() => applyInterval(5)}>作为五音</div>}
          {!pianoKeyIntervalList.includes(7)
            && <div className="option" onClick={() => applyInterval(7)}>作为七音</div>}
          {!pianoKeyIntervalList.includes(9)
            && <div className="option" onClick={() => applyInterval(9)}>作为二音 / 九音</div>}
          {!pianoKeyIntervalList.includes(11) &&
              <div className="option" onClick={() => applyInterval(11)}>作为四音 / 十一音</div>}
          {!pianoKeyIntervalList.includes(13) &&
              <div className="option" onClick={() => applyInterval(13)}>作为六音 / 十三音</div>}
          <div className="option"
               onClick={() => applyInterval(0)}
               style={{color: googleColors.red300}}>
            取消 / 将此音符排除查找
          </div>
        </div>

      </div>
    </Mask>
  </>
}

export default FindNotesConfigPopup

const FindNotesConfigPopup_css = css({
  "& .as_note": {
    backgroundColor: googleColors.gray200,
    width: 120,
    height: 50,
    ...cssPresets.flexCenter,
    borderRadius: 999,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 10,
  },
  "& .options": {
    width: "100%",
    maxWidth: 300,
    marginTop: 10,
    borderRadius: 8,
    overflow: "hidden",
    "& .option:not(:first-of-type)": {
      borderTop: `1px solid ${googleColors.gray300}`,
    },
    "& .option": {
      width: "100%",
      height: 50,
      color: googleColors.blue800,
      fontSize: 18,
      ...cssPresets.flexCenter,
      backgroundColor: "white",
      ...cssPresets.defaultHoverAndActive as any
    }
  }
})
