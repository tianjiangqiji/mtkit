/* eslint-disable no-mixed-spaces-and-tabs */
import {css} from "@emotion/react";
import googleColors from "@/assets/colors/googleColors.ts";
import cssPresets from "@/assets/styles/cssPresets.ts";
import useScaleConfig from "@/assets/stores/useScaleConfig.ts";
import {range} from "lodash";
import NumberNote from "@/components/reNote/NumberNote/NumberNote.tsx";
import NoteText from "@/components/reNote/NoteText/NoteText.tsx";
import NoteChordSymbol from "@/components/reNote/ChordText/NoteChordSymbol.tsx";
import NumberChordSymbol from "@/components/reNote/ChordText/NumberChordSymbol.tsx";
import {useWindowSize} from "react-use";
import useScaleInstance from "@/apps/TabletScaleQuery/useTabletScaleQuery/useScaleInstance.tsx";
import shadowPresets from "@/assets/styles/shadowPresets.ts";
import useGlobalSettings from "@/assets/stores/useGlobalSettings.ts";

const chordColor = googleColors.gray600
const MobileScaleTable = () => {
  const {scaleInstance} = useScaleInstance()
  const {setNotePickerStep, setNotePickerAlter} = useGlobalSettings()
  const {height} = useWindowSize()
  const {
    isRomeNumberStyle,
    setIsMobileScaleConfigWindowOpen,
    isMobileScaleTableColumnReverse,
    chordDisplayStyle
  } = useScaleConfig()
  const indexList = isMobileScaleTableColumnReverse ? range(7).reverse() : range(7)
  return <>
    <div css={MobileScaleTable_css(scaleInstance.isTonicReplaced, height)}>
      <table onClick={() => setIsMobileScaleConfigWindowOpen(true)}>
        <tbody>
        <tr className="table_head">
          <td>音级</td>
          <td>音符</td>
          <td>三和弦</td>
          <td>七和弦</td>
        </tr>
        {indexList.map((index, j) => {
          return <tr key={j}>
            <td><NumberNote
              isRomeStyle={isRomeNumberStyle}
              num={index + 1}
              fontSize={22} color={googleColors.blue800}
              alter={scaleInstance.alterList[index]}/>
            </td>
            <td>
              <NoteText step={scaleInstance.notesList[index].step}
                        alter={scaleInstance.notesList[index].alter}
                        fontSize={28} color={googleColors.gray900}/>
            </td>
            <td>
              {chordDisplayStyle === "note" ?
                <NoteChordSymbol step={scaleInstance.notesList[index].step}
                                 alter={scaleInstance.notesList[index].alter}
                                 fontSize={22} color={chordColor}
                                 chordSymbol={scaleInstance.getScaleDegreeChord3(index + 1).baseSymbol}/>
                : <NumberChordSymbol
                  fontSize={22} color={chordColor}
                  num={index + 1}
                  alter={scaleInstance.alterList[index]}
                  isRomeStyle={chordDisplayStyle === "rome"}
                  chordSymbol={scaleInstance.getScaleDegreeChord3(index + 1).baseSymbol}/>}
            </td>
            <td>
              {chordDisplayStyle === "note" ?
                <NoteChordSymbol step={scaleInstance.notesList[index].step}
                                 alter={scaleInstance.notesList[index].alter}
                                 fontSize={22} color={chordColor}
                                 chordSymbol={scaleInstance.getScaleDegreeChord7(index + 1).baseSymbol}/>
                : <NumberChordSymbol
                  fontSize={22} color={chordColor}
                  num={index + 1}
                  alter={scaleInstance.alterList[index]}
                  isRomeStyle={chordDisplayStyle === "rome"}
                  chordSymbol={scaleInstance.getScaleDegreeChord7(index + 1).baseSymbol}/>}
            </td>
          </tr>
        })}
        </tbody>
      </table>
      {scaleInstance.isTonicReplaced && <div
          onClick={() => {
            const en = scaleInstance.equalRootNote
            setNotePickerStep(en.step)
            setNotePickerAlter(en.alter)
          }}
          className="is_tonic_replaced">
          <div className="text">该音阶存在等音替换</div>
      </div>}
    </div>
  </>
}

export default MobileScaleTable

const MobileScaleTable_css = (isToicReplaced: boolean, h: number) => css({
  width: "100%",
  height: "100%",
  // ...cssPresets.flexCenter,
  // flexDirection:"column",
  alignItems: "start",
  "& table": {
    borderCollapse: "collapse",
    backgroundColor: isToicReplaced ? googleColors.yellow50 : "white",
    boxShadow: isToicReplaced ? shadowPresets.blur1 : "none",
    borderRadius: 8,
    marginLeft: "auto",
    marginRight: "auto",
    "& tr:not(:first-of-type)": {
      borderTop: isToicReplaced ? `1px solid ${googleColors.gray400}` : `1px solid ${googleColors.gray300}`
    },
    "&  tr:not(.table_head)": {
      ...cssPresets.flexCenter,
      "& td:not(:first-of-type)": {
        borderLeft: isToicReplaced ? `1px solid ${googleColors.gray300}` : `1px solid ${googleColors.gray200}`
      },
      "& td": {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 5,
        height: isToicReplaced ? (h - 85 - 50) / 12 : (h - 85 - 50) / 9.5,
        minHeight: 25,
        maxHeight: 65,
      },
      "& td:first-of-type": {
        width: 50
      }, "& td:nth-of-type(2)": {
        width: 65
      }, "& td:nth-of-type(3)": {
        width: 80
      }, "& td:nth-of-type(4)": {
        width: 110
      },
    },
    "& tr.table_head": {
      ...cssPresets.flexCenter,
      height: 40,
      fontFamily: "misans-m",
      "& td:first-of-type": {
        width: 50
      }, "& td:nth-of-type(2)": {
        width: 65
      }, "& td:nth-of-type(3)": {
        width: 80
      }, "& td:nth-of-type(4)": {
        width: 110
      },
      "& td:not(:first-of-type)": {
        borderLeft: isToicReplaced ? `1px solid ${googleColors.gray300}` : `1px solid ${googleColors.gray200}`
      },
      "& td": {
        ...cssPresets.flexCenter,
        height: 80
      }
    },
  },
  "& .is_tonic_replaced": {
    width: "calc(80vw)",
    maxWidth: 320,
    backgroundColor: googleColors.amber200,
    marginLeft: "auto",
    marginRight: "auto",
    height: 60,
    borderRadius: 999,
    marginTop: 20,
    ...cssPresets.flexCenter,
    userSelect: "none",
    boxShadow: shadowPresets.blur1,
    ...cssPresets.transition,
    "&:active": {
      backgroundColor: googleColors.amber300
    },
    "& .text": {
      color: googleColors.deepOrange800
    }
  }
})
