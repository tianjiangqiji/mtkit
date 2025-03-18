/* eslint-disable no-mixed-spaces-and-tabs */

import googleColors from "@/assets/colors/googleColors.ts";
import useIsWideScreen from "@/utils/useIsWideScreen.tsx";
import useScoreHelperConfig from "@/assets/stores/useScoreHelperConfig.ts";
import cssPresets from "@/assets/styles/cssPresets.ts";
import NoteSymbol from "@/components/reNote/NoteSymbol/NoteSymbol.tsx";
import {css} from "@emotion/react";
import {Mask} from "antd-mobile";
import {isMobile} from "react-device-detect";

const selectedColor = googleColors.amber200;
const StaveConfigPopover = () => {
  const {
    isStaveConfigOpen,
    setIsStaveConfigOpen,
    clef,
    setClef,
    isStaveSharp,
    setIsStaveSharp,
    setStaveAlters
  } = useScoreHelperConfig()
  const isWideScreen = useIsWideScreen();
  const judgeClefSelected = (i: string) => {
    return i === clef;
  }
  return (<>
    <Mask visible={isStaveConfigOpen}
          style={{...cssPresets.defaultBlur}}
          opacity={0.6}
          destroyOnClose={true}>
      <div css={score_helper_picker_css} onClick={() => setIsStaveConfigOpen(false)}>
        <div className="frame">
          <div className="score_alters">
            <div className="alter_type"
                 onClick={e => {
                   e.stopPropagation();
                   setIsStaveSharp(false);
                 }}
                 style={{backgroundColor: !isStaveSharp ? selectedColor : "white", marginRight: 40}}>
              <NoteSymbol alter={-1}/>
            </div>

            <div className="alter_type"
                 onClick={e => {
                   e.stopPropagation();
                   setIsStaveSharp(true);
                 }}

                 style={{backgroundColor: isStaveSharp ? selectedColor : "white"}}>
              <NoteSymbol alter={1}/>
            </div>
          </div>
          {!isWideScreen && <div className="alter_numbers_frame">
              <table>
                  <tbody>
                  <tr>
                      <td onClick={() => setStaveAlters(0)}>0</td>
                      <td onClick={() => setStaveAlters(1)}>1</td>
                  </tr>
                  <tr>
                      <td onClick={() => setStaveAlters(2)}>2</td>
                      <td onClick={() => setStaveAlters(3)}>3</td>
                  </tr>
                  <tr>
                      <td onClick={() => setStaveAlters(4)}>4</td>
                      <td onClick={() => setStaveAlters(5)}>5</td>
                  </tr>
                  <tr>
                      <td onClick={() => setStaveAlters(6)}>6</td>
                      <td onClick={() => setStaveAlters(7)}>7</td>
                  </tr>
                  </tbody>
              </table>
          </div>}
          {isWideScreen && <div className="alter_numbers_frame">
              <table>
                  <tbody>
                  <tr>
                      <td onClick={() => setStaveAlters(0)}>0</td>
                      <td onClick={() => setStaveAlters(1)}>1</td>
                      <td onClick={() => setStaveAlters(2)}>2</td>
                      <td onClick={() => setStaveAlters(3)}>3</td>
                  </tr>
                  <tr>
                      <td onClick={() => setStaveAlters(4)}>4</td>
                      <td onClick={() => setStaveAlters(5)}>5</td>
                      <td onClick={() => setStaveAlters(6)}>6</td>
                      <td onClick={() => setStaveAlters(7)}>7</td>
                  </tr>
                  </tbody>
              </table>
          </div>}
        </div>
      </div>
    </Mask>
  </>)

}

export default StaveConfigPopover
const clef_css = (isClefSelected?: boolean) => css({
  ...cssPresets.flexCenter,
  width: "calc(100% / 3)",
  height: "100%",
  "& img": {
    width: 50,
    height: 50,
  },
  ...cssPresets.transition,
  userSelect: "none",
  cursor: "pointer",
  backgroundColor: isClefSelected ? selectedColor : "white",
})


const score_helper_picker_css = css({
  width: "calc(100vw)",
  height: "calc(100vh)",
  zIndex: 999,
  ...cssPresets.flexCenter,
  overflowX: "hidden",
  overflowY: "hidden",
  "& .frame": {
    "& .clef_selector": {
      width: 240,
      height: 80,
      marginLeft: "auto",
      marginRight: "auto",
      borderRadius: 10,
      overflow: "hidden",
      backgroundColor: "white",
      userSelect: "none",
      ...cssPresets.flexCenter,
      "& .clef:not(:first-of-type)": {
        borderLeft: `1px solid ${googleColors.gray300}`,
        "& img": {
          width: "fit-content",
          height: 40,
        }
      },

    },
    "& .score_alters": {
      ...cssPresets.flexCenter,
      marginLeft: "auto",
      marginRight: "auto",
      "&>.alter_type": {
        height: 75,
        width: 75,
        padding: 10,
        borderRadius: 8,
        ...cssPresets.transition,
        cursor: "pointer",
        userSelect: "none",
      }
    },
    "& .alter_numbers_frame": {
      "& table": {
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: 25,
        marginBottom: 60,
        borderRadius: 8,
        overflow: "hidden",
        border: `1px solid ${googleColors.gray300}`,
        borderCollapse: "collapse",
        "& tr:not(:first-of-type)": {
          borderTop: `1px solid ${googleColors.gray300}`,
        },
        "& tr>td:not(first-of-type)": {
          borderRight: `1px solid ${googleColors.gray300}`,
        },
        "td": {
          backgroundColor: "white",
          fontFamily: "misans-m",
          fontSize: 35,
          width: 90,
          height: 85,
          ...cssPresets.transition,
          cursor: "pointer",

          "&:hover": {
            backgroundColor: isMobile ? "" : googleColors.gray200
          },
          "&:active": {
            backgroundColor: googleColors.gray300,
          }
        }
      }
    }
  }
})
