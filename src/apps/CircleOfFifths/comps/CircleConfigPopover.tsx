/* eslint-disable no-mixed-spaces-and-tabs */
import {css} from "@emotion/react";
import {Mask, Switch} from "antd-mobile";
import useCircleOfFifthsConfig from "@/assets/stores/useCircleOfFifthsConfig.ts";
import cssPresets from "@/assets/styles/cssPresets.ts";
import {range} from "lodash";
import {IoFootstepsSharp} from "react-icons/io5";
import googleColors from "@/assets/colors/googleColors.ts";
import {isMobile} from "react-device-detect";
import {FaArrowPointer} from "react-icons/fa6";
import GoogleColors from "@/assets/colors/googleColors.ts";
import {FaDotCircle} from "react-icons/fa";

const ifCursorMoveSelectedColor = googleColors.blue800
const CircleConfigPopover = () => {
  const {
    isRotateLengthConfigOpen,
    setRotateLengthConfigOpen,
    setRotateLength,
    isCursorShow,
    setIsCursorShow,
    isCursorMoveMode, setIsCursorMoveMode
  } = useCircleOfFifthsConfig()
  return <>
    <div css={RotateLengthPopover_css(isCursorShow)}>
      <Mask visible={isRotateLengthConfigOpen}
            style={{...cssPresets.flexCenter, ...cssPresets.defaultBlur}}
            destroyOnClose={true}
            onMaskClick={() => setRotateLengthConfigOpen(false)}>
        <div className="cursor_config"
             style={{backgroundColor: isCursorShow ? "white" : GoogleColors.gray50, ...cssPresets.transition}}
             onClick={() => setIsCursorShow(!isCursorShow)}>
          <Switch  style={{ '--checked-color': googleColors.blue800,'--height': '36px',"--width":"60px"}} checked={isCursorShow}/>
          <div style={{color: googleColors.gray700, marginLeft: 20,fontSize:18}}>
            {isCursorShow ? "指针显示" : "指针隐藏"}
          </div>
        </div>
        <div className="if_cursor_on">
          <div className="option"
               onClick={() => setIsCursorMoveMode(true)}
               css={cursor_on_css(isCursorMoveMode)}>
            <FaArrowPointer size={26} color={isCursorMoveMode ? ifCursorMoveSelectedColor : googleColors.gray400}/>
            <div className="text">移动指针</div>
          </div>
          <div className="option"
               onClick={() => setIsCursorMoveMode(false)}
               css={cursor_on_css(!isCursorMoveMode)}>
            <FaDotCircle size={26} color={!isCursorMoveMode ? ifCursorMoveSelectedColor : googleColors.gray400}/>
            <div className="text">移动轮盘</div>
          </div>
        </div>
        <div className="inner_frame">
          <table>
            <tbody>
            <tr>
              <td className="n"
                  style={{
                    width: "100%",
                    backgroundColor: googleColors.blueGray50, ...cssPresets.flexCenter,
                    flexDirection: "column"
                  }}>
                <span style={{color: googleColors.blue800}}>步长</span>
                <IoFootstepsSharp size={26} color={googleColors.blue800}/>
              </td>
              {range(1, 4).map(x => <td className="n" key={x} onClick={() => {
                setRotateLength(x)
                setRotateLengthConfigOpen(false)
              }}>{x}</td>)}
            </tr>
            <tr>
              {range(4, 8).map(x => <td className="n" key={x} onClick={() => {
                setRotateLength(x)
                setRotateLengthConfigOpen(false)
              }}>{x}</td>)}
            </tr>
            <tr>
              {range(8, 12).map(x => <td className="n" key={x} onClick={() => {
                setRotateLength(x)
                setRotateLengthConfigOpen(false)
              }}>{x}</td>)}
            </tr>
            </tbody>
          </table>
        </div>
      </Mask>
    </div>
  </>
}

export default CircleConfigPopover

const RotateLengthPopover_css = (isCursorShow: boolean) => css({
  "& .inner_frame": {
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "white",
    ...cssPresets.flexCenter,
    flexDirection: "column",
    flexWrap: "wrap",
    marginLeft: 10,
    marginRight: 10,
    "& table": {
      borderCollapse: "collapse",
      ...cssPresets.transition,
      "& tr:not(:first-of-type)": {
        borderTop: `1px solid ${googleColors.gray300}`,
      },
      "& tr td:not(:first-of-type)": {
        borderLeft: `1px solid ${googleColors.gray300}`,
      },
      "& td": {
        fontFamily: "misans-m",
        fontSize: 30,
        minWidth: 60,
        width: "calc(100vw / 4)",
        maxWidth: 80,
        height: 80,
        color: googleColors.gray700,
        ...cssPresets.transition,
      },
      "& td.n": {
        cursor: "pointer",
        "&:hover": isMobile ? "" : {
          backgroundColor: googleColors.gray200
        },
        "&:active": {
          backgroundColor: googleColors.gray300,
        }
      }
    }
  },
  "& .cursor_config": {
    backgroundColor: "white",
    width: 210,
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 999,
    paddingTop: 20,
    paddingBottom: 20,
    ...cssPresets.flexCenter, fontFamily: "misans-m",
    marginBottom: 20,
    ...cssPresets.transition,
    cursor: "pointer",
    userSelect: "none",
    ...cssPresets.defaultHoverAndActive as any,
    justifyContent:"space-around",
    height:70,
    paddingLeft:15,
    paddingRight:20
  },
  "& .if_cursor_on": {
    ...cssPresets.flexCenter,
    borderRadius: 8,
    overflow: "hidden",
    width: 200,
    transition: "all 0.2s ease-in-out",
    maxHeight: isCursorShow ? 150 : 0,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 20,
    "& .option:nth-of-type(1)": {
      border: `1px solid ${googleColors.gray300}`,
    },
  }
})

const cursor_on_css = (isOn: boolean) => css({
  backgroundColor: isOn ? googleColors.blue50 : googleColors.gray50,
  width: 100,
  height: 90,
  userSelect: "none",
  cursor: "pointer",
  ...cssPresets.flexCenter,
  flexDirection: "column",
  "& .text": {
    fontFamily: "misans-m",
    marginTop: 10,
    color: isOn ? ifCursorMoveSelectedColor : googleColors.gray600
  },
})
