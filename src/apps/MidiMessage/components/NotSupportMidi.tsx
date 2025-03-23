/* eslint-disable no-mixed-spaces-and-tabs */
import {css} from "@emotion/react";
import midi_error from "./midi_error_svg.svg"
import cssPresets from "@/assets/styles/cssPresets.ts";
import GoogleColors from "@/assets/colors/googleColors.ts";


const NotSupportMidi = () => {
  return <>
    <div css={NotSupportMidi_css}>
      <div className="imgf">
        <img src={midi_error} alt=""/>
      </div>
      <div style={{marginTop: 25, fontSize: 20, color: GoogleColors.gray600}}>
        当前环境不支持MIDI
      </div>
      <div style={{
        marginTop: 5,
        width: "100%",
        marginLeft: "auto",
        marginRight: "auto",
        paddingLeft: 25,
        paddingRight: 25,
        maxWidth: 350
      }}>
        <span style={{whiteSpace: "nowrap"}}>
           MIDI功能依赖
        </span> <span style={{whiteSpace: "nowrap"}}>
         WebMIDI API，
        </span>
        <span style={{whiteSpace: "nowrap"}}>
           大部分移动端
        </span>
        <span style={{whiteSpace: "nowrap"}}>
          或Pad类设备不支持。
        </span>
        <span style={{whiteSpace: "nowrap"}}>
          如果使用电脑端
        </span>
        <span style={{whiteSpace: "nowrap"}}>
          依然弹出此提示，
        </span>
        <span style={{whiteSpace: "nowrap"}}>
          建议检查浏览器
        </span>
        <span style={{whiteSpace: "nowrap"}}>
         是否支持WebMIDI API，
        </span>
        <span style={{whiteSpace: "nowrap"}}>
      以及打开MIDI设备权限开关，
              </span>
        <span style={{whiteSpace: "nowrap"}}>
      然后从“关于项目”页面中
              </span>
        <span style={{whiteSpace: "nowrap"}}>
      点击“重置应用”按钮。
        </span>
        <span style={{whiteSpace: "nowrap"}}>
          推荐使用Microsoft Edge浏览器
        </span>
        <span style={{whiteSpace: "nowrap"}}>
         或者Google Chrome浏览器。
        </span>

      </div>

    </div>
  </>
}

export default NotSupportMidi

const NotSupportMidi_css = css({
  height: "calc(60vh)",
  ...cssPresets.flexCenter,
  flexDirection: "column",
  justifyContent: "start",
  paddingTop: 35,
  color: GoogleColors.gray500,
  '& .imgf': {
    width: 150,
    height: "auto",
    ...cssPresets.flexCenter,
    "&>img": {
      height: "100%",
      width: "100%",
      objectFit: "contain",
    }
  }
})
