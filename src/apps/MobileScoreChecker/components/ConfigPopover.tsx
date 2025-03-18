/* eslint-disable no-mixed-spaces-and-tabs */
import {css} from "@emotion/react";
import {useEffect, useRef, useState} from "react";
import {Mask} from "antd-mobile";
import UseScoreCheckerConfig from "@/assets/stores/useScoreCheckerConfig.ts";
import cssPresets from "@/assets/styles/cssPresets.ts";
import NoteSymbol from "@/components/reNote/NoteSymbol/NoteSymbol.tsx";
import googleColors from "@/assets/colors/googleColors.ts";
import GoogleColors from "@/assets/colors/googleColors.ts";
import {range} from "lodash";
import ClefG from "@/components/reStave/clefSvgs/ClefG.tsx";
import ClefC from "@/components/reStave/clefSvgs/ClefC.tsx";
import ClefF from "@/components/reStave/clefSvgs/ClefF.tsx";

const staveAlterSelectedColor = googleColors.deepOrange800
const staveAlterUnselectedColor = googleColors.gray400
const ConfigPopover = () => {
  const {
    isOneNoteCheckerWindowOpen,
    setIsOneNoteCheckerWindowOpen,
    keys,
    setKeys,
    clef,
    setClef
  } = UseScoreCheckerConfig()
  return <>
    <Mask visible={isOneNoteCheckerWindowOpen}
          destroyOnClose={true}
          style={{...cssPresets.defaultBlur, ...cssPresets.flexCenter}}
          onMaskClick={() => setIsOneNoteCheckerWindowOpen(false)}>
      <div css={ConfigPopover_css(keys)}>
        <div className="clef_frame">
          <div className="option"
               onClick={() => setClef("G")}
               css={alter_num_selected(["G", "H"].includes(clef))}>
            <div className="icon">
              <ClefG color={["G", "H"].includes(clef) ? staveAlterSelectedColor : staveAlterUnselectedColor}/>
            </div>
          </div>
          <div className="option"
               onClick={() => setClef("C")}
               css={alter_num_selected(["M", "C"].includes(clef))}>
            <div className="icon">
              <ClefC color={["M", "C"].includes(clef) ? staveAlterSelectedColor : staveAlterUnselectedColor}/>
            </div>
          </div>
          <div className="option"
               onClick={() => setClef("F")}
               css={alter_num_selected(["F", "B"].includes(clef))}>
            <div className="icon">
              <ClefF color={["F", "B"].includes(clef) ? staveAlterSelectedColor : staveAlterUnselectedColor}/>
            </div>
          </div>
        </div>
        <div className="stave_alters_config">
          {/*============================还原===========================*/}
          <div className="option"
               onClick={() => setKeys(0)}
               style={{maxWidth: keys === 0 ? 100 : 0, ...cssPresets.transition, overflow: "hidden"}}
               css={stave_alters_css(keys === 0)}>
            <div className="icon">
              <NoteSymbol alter={0} color={keys === 0 ? staveAlterSelectedColor : staveAlterUnselectedColor}/>
            </div>
          </div>
          {/*===========================升===========================*/}
          <div className="option"
               onClick={() => {
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
               onClick={() => {
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
                onClick={() => {
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
    </Mask>

  </>
}

export default ConfigPopover

const ConfigPopover_css = (keys: number) => css({
  // backgroundColor: "white",
  borderRadius: 8,
  ...cssPresets.flexCenter,
  flexDirection: "column",
  "& .clef_frame": {
    width: "fit-content",
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 50,
    ...cssPresets.flexCenter,
    "& .option:not(:first-of-type)": {
      borderLeft: `1px solid ${googleColors.gray300}`
    },
    "& .option": {
      width: 90,
      height: 100,
      userSelect: "none",
      cursor: "pointer",
      ...cssPresets.flexCenter,
      "& .icon": {
        width: 50,
        height: 50
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
})

const stave_alters_css = (isOn: boolean) => css({
  backgroundColor: isOn ? googleColors.amber200 : "white",
})

const alter_num_selected = (isOn: boolean) => css({
  color: isOn ? staveAlterSelectedColor : staveAlterUnselectedColor,
  backgroundColor: isOn ? googleColors.amber200 : "white",
})