/* eslint-disable no-mixed-spaces-and-tabs */

import {css} from "@emotion/react";
import {Mask} from "antd-mobile";
import cssPresets from "@/assets/styles/cssPresets.ts";
import useChordConfig from "@/assets/stores/useChordConfig.ts";
import music12 from "music12";
import googleColors from "@/assets/colors/googleColors.ts";
import {isMobile} from "react-device-detect";
import {useWindowSize} from "react-use";
import ClefG from "@/components/reStave/clefSvgs/ClefG.tsx";
import ClefC from "@/components/reStave/clefSvgs/ClefC.tsx";
import ClefF from "@/components/reStave/clefSvgs/ClefF.tsx";
import useScoreCheckerConfig from "@/assets/stores/useScoreCheckerConfig.ts";
import GoogleColors from "@/assets/colors/googleColors.ts";
import useScoreHelperConfig from "@/assets/stores/useScoreHelperConfig.ts";
import NoteSymbol from "@/components/reNote/NoteSymbol/NoteSymbol.tsx";
import {range} from "lodash";

const selectedColor = googleColors.deepOrange800
const unselectedColor = googleColors.gray400
const staveAlterSelectedColor = googleColors.deepOrange800
const staveAlterUnselectedColor = googleColors.gray400
const noWrapStyle = {whiteSpace: "nowrap"}
const ChordStaveConfigPopup = () => {
  // const {isNotePickerOpen, setNotePickerOpen} = useGlobalSettings();
  const {
    isChordSelectorOpen,
    setIsChordSelectorOpen,
    setChordKey,
    chordKey,
    isChordStaveConfigOpen,
    setIsChordStaveConfigOpen
  } = useChordConfig()
  const {clef, setClef} = useScoreHelperConfig()
  const {keys, setKeys} = useScoreCheckerConfig()
  // const isWideScreen = useIsWideScreen();
  const {width} = useWindowSize();
  const chordMeta = music12.chord.chordMeta
  // console.log(chordMeta)
  return (<>
    <Mask visible={isChordStaveConfigOpen}
          style={{...cssPresets.defaultBlur}}
          opacity={0.5}
          destroyOnClose={true}>
      <div css={note_picker_css(width)} onClick={() => setIsChordStaveConfigOpen(false)}>
        <div className="inner_frame">
          <div className="line">
            <div className="option_label">谱号</div>
            <div className="option_frame">
              <div className="option_clef"
                   onClick={() => {
                     setClef("G")
                   }}
                   css={selected_css(["G", "H"].includes(clef))}>
                <div className="img">
                  <ClefG color={["G", "H"].includes(clef) ? selectedColor : unselectedColor}/>
                </div>
              </div>
              <div className="option_clef"
                   onClick={() => {
                     setClef("C")
                   }}
                   css={selected_css(["C", "M"].includes(clef))}>
                <div className="img">
                  <ClefC color={["C", "M"].includes(clef) ? selectedColor : unselectedColor}/>
                </div>
              </div>
              <div className="option_clef"
                   onClick={() => {
                     setClef("F")
                   }}
                   css={selected_css(["F", "B"].includes(clef))}>
                <div className="img">
                  <ClefF color={["F", "B"].includes(clef) ? selectedColor : unselectedColor}/>
                </div>
              </div>
            </div>
          </div>
          <div className="line">
            <div className="option_label">乐谱升降号</div>
            <div className="stave_alters_config">
              {/*============================还原===========================*/}
              <div className="option"
                   onClick={e => {
                     e.stopPropagation()
                     setKeys(0)
                   }}
                   style={{maxWidth: keys === 0 ? 100 : 0, ...cssPresets.transition, overflow: "hidden"}}
                   css={stave_alters_css(keys === 0)}>
                <div className="icon">
                  <NoteSymbol alter={0} color={keys === 0 ? staveAlterSelectedColor : staveAlterUnselectedColor}/>
                </div>
              </div>
              {/*===========================升===========================*/}
              <div className="option"
                   onClick={e => {
                     e.stopPropagation()
                     if (keys === 0) return setKeys(1);
                     setKeys(Math.abs(keys))
                   }}
                   css={stave_alters_css(keys > 0)}>
                <div className="icon">
                  <NoteSymbol alter={1} color={keys > 0 ? staveAlterSelectedColor : staveAlterUnselectedColor}/>
                </div>
              </div>
              {/*===========================降===========================*/}
              <div className="option"
                   onClick={e => {
                     e.stopPropagation()
                     if (keys === 0) return setKeys(-1);
                     setKeys(Math.abs(keys) * -1)
                   }}
                   css={stave_alters_css(keys < 0)}>
                <div className="icon">
                  <NoteSymbol alter={-1} color={keys < 0 ? staveAlterSelectedColor : staveAlterUnselectedColor}/>
                </div>
              </div>
            </div>
            <div className="alter_selection"
                 style={{
                   maxHeight: keys === 0 ? 0 : 150,
                   ...cssPresets.transition,
                   ...cssPresets.flexCenter, overflow: "hidden"
                 }}>
              <table>
                <tbody>
                <tr>
                  {range(4).map(x => <td
                    onClick={e => {
                      e.stopPropagation()
                      if (keys < 0) {
                        setKeys(x * -1)
                      } else setKeys(x)
                    }}
                    css={alter_num_selected(Math.abs(keys) === x)}
                    key={x}>{x}</td>)}
                </tr>
                <tr>
                  {range(4, 8).map(x => <td
                    onClick={() => {
                      if (keys < 0) {
                        setKeys(x * -1)
                      } else setKeys(x)
                    }}
                    css={alter_num_selected(Math.abs(keys) === x)}
                    key={x}>{x}</td>)}
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Mask>
  </>)

}

export default ChordStaveConfigPopup

const note_picker_css = (w: number) => css({
  userSelect: "none",
  width: "calc(100vw)",
  height: "calc(100vh)",
  zIndex: 999,
  overflowY: "auto",
  ...cssPresets.flexCenter,
  "& .inner_frame": {
    width: "fit-content",
    overflowY: "auto",
    borderRadius: 8,
    // overflowX: "hidden",
    userSelect: "none",
    "& .line": {
      "& .option_label": {
        fontSize: 16,
        color: GoogleColors.blue800,
        marginBottom: 5,
        backgroundColor: "white",
        width: "fit-content",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: 25,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 999,

      },
      "& .option_frame": {
        ...cssPresets.flexCenter,
        borderRadius: 8,
        overflow: "hidden",
        border: `1px solid ${GoogleColors.gray300}`,
        "& .option:not(:first-of-type)": {
          borderLeft: `1px solid ${GoogleColors.gray300}`,
        },
        "& .option": {
          ...cssPresets.flexCenter,
          paddingTop: 20, paddingLeft: 20, paddingRight: 20,
          paddingBottom: 15,
          flexDirection: "column",
          "& .img": {
            width: 30,
            height: 25
          },
          "& .text": {}
        },
        "& .long": {
          width: 110
        }
      },
      "& .option_long_frame": {
        ...cssPresets.flexCenter,
        flexDirection: "column",
        borderRadius: 8,
        overflow: "hidden",
        border: `1px solid ${GoogleColors.gray300}`,
        "& .option:not(:first-of-type)": {
          borderTop: `1px solid ${GoogleColors.gray300}`,
        },
        "& .option": {
          ...cssPresets.flexCenter,
          paddingTop: 20, paddingLeft: 20, paddingRight: 20,
          paddingBottom: 15,
          width: 200,
          flexDirection: "column",
          "& .img": {
            width: 30,
            height: 25
          },
          "& .text": {}
        },

      },
      "& .option_clef:not(:first-of-type)": {
        borderLeft: `1px solid ${GoogleColors.gray300}`,
      },
      "& .option_clef": {
        width: 100,
        height: 80,
        ...cssPresets.flexCenter,
        "& .img": {
          width: 40,
          height: 40,
        }
      }
    },
    "& .stave_alters_config": {
      ...cssPresets.flexCenter,
      cursor: "pointer",
      userSelect: "none",
      marginLeft: "auto",
      marginRight: "auto",
      width: "fit-content",
      borderRadius: 8,
      overflow: "hidden",
      "& .option:not(:first-of-type)": {
        borderLeft: `1px solid ${googleColors.gray300}`
      },
      "& .option": {
        width: 90,
        height: 80,
        userSelect: "none",
        cursor: "pointer",
        ...cssPresets.flexCenter,
        "& .icon": {
          width: 45,
          height: 45
        }
      }
    },
    "& .alter_selection": {
      paddingRight: 0,
      paddingLeft: 0,
      width: "fit-content",
      marginLeft: "auto",
      marginRight: "auto",
      ...cssPresets.flexCenter,
      borderRadius: 8,
      overflow: "hidden",
      marginTop: 10,
      cursor: "pointer",
      userSelect: "none",
      "& table": {
        borderSpacing: 0,
        borderCollapse: "collapse",
        "& tr:not(:first-of-type)": {
          borderTop: `1px solid ${googleColors.gray300}`,
        },
        "& tr>td:not(:first-of-type)": {
          borderLeft: `1px solid ${googleColors.gray300}`,
        },
        "& td": {
          width: 68,
          height: 70,
          fontSize: 28,
        }
      }
    }
  }
})

const selected_css = (i: boolean) => css({
  transition: "all ease 0.1s",
  cursor: "pointer",
  backgroundColor: i ? googleColors.amber200 : googleColors.gray50,
  color: i ? googleColors.deepOrange800 : googleColors.gray500,
  "& .img,.text": {
    transition: "all ease 0.3s",
    transform: i ? "scale(1.02)" : "scale(0.95)",
  }
})

const stave_alters_css = (isOn: boolean) => css({
  backgroundColor: isOn ? googleColors.amber200 : "white",
})

const alter_num_selected = (isOn: boolean) => css({
  color: isOn ? staveAlterSelectedColor : staveAlterUnselectedColor,
  backgroundColor: isOn ? googleColors.amber200 : "white",
})