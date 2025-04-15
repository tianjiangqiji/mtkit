/* eslint-disable no-mixed-spaces-and-tabs */
import {css} from "@emotion/react";
import {Mask, Switch} from "antd-mobile";
import useScaleConfig from "@/assets/stores/useScaleConfig.ts";
import cssPresets from "@/assets/styles/cssPresets.ts";
import googleColors from "@/assets/colors/googleColors.ts";
import MajorScaleSymbol from "@/apps/TabletScaleQuery/symbolSVG/MajorScaleSymbol.tsx";
import MinorScaleSymbol from "@/apps/TabletScaleQuery/symbolSVG/MinorScaleSymbol.tsx";
import NumberScale from "@/apps/TabletScaleQuery/comps/ScalePicker/NumberScale.tsx";
import HalfDimScaleSymbol from "@/apps/TabletScaleQuery/symbolSVG/HalfDimScaleSymbol.tsx";
import * as music12 from "@/music12"

const numberScaleColor = googleColors.gray500
const ScalePickerPopover = () => {
  const {
    isScalePickerOpen,
    setIsScalePickerOpen,
    majorScaleStrokeColor,
    majorScaleBgColor,
    minorScaleStrokeColor,
    minorScaleBgColor,
    setMode,
    isClassicScaleModeOn, setIsClassicScaleModeOn
  } = useScaleConfig()
  return <>
    <Mask visible={isScalePickerOpen}
          destroyOnClose={true}
          style={{...cssPresets.defaultBlur, ...cssPresets.flexCenter}}
          onMaskClick={() => setIsScalePickerOpen(false)}>
      <div css={mode_selector_css(isClassicScaleModeOn)}>
        <div className="on  item" onClick={() => setIsClassicScaleModeOn(true)}>
          中古调式
        </div>
        <div className="off item" onClick={() => setIsClassicScaleModeOn(false)}>
          功能调式
        </div>
      </div>
      <div css={ScalePicker_css}>
        <div className="main">
          <div className="line major" onClick={() => {
            setMode(music12.scale.ScaleMode.NaturalMajor)
            setIsScalePickerOpen(false);
          }}>
            <div className="symbol">
              <MajorScaleSymbol color={majorScaleStrokeColor} fill={majorScaleBgColor}/>
            </div>
            <div className="right_area">
              <div className="cn_title">自然大调 Ionian</div>
              <div className="composed">
                <NumberScale fontSize={14}
                             color={numberScaleColor}
                             alterArray={[0, 0, 0, 0, 0, 0, 0]}/>
              </div>
            </div>
          </div>
          {isClassicScaleModeOn && <>
              <div className="line major" onClick={() => {
                setMode(music12.scale.ScaleMode.Lydian)
                setIsScalePickerOpen(false);
              }}>
                  <div className="symbol">
                      <MajorScaleSymbol color={majorScaleStrokeColor} fill={majorScaleBgColor}/>
                  </div>
                  <div className="right_area">
                      <div className="cn_title">Lydian</div>
                      <div className="composed">
                          <NumberScale fontSize={14}
                                       color={numberScaleColor}
                                       alterArray={[0, 0, 0, 1, 0, 0, 0]}/>
                      </div>
                  </div>
              </div>
              <div className="line major" onClick={() => {
                setMode(music12.scale.ScaleMode.Mixolydian)
                setIsScalePickerOpen(false);
              }}>
                  <div className="symbol">
                      <MajorScaleSymbol color={majorScaleStrokeColor} fill={majorScaleBgColor}/>
                  </div>
                  <div className="right_area">
                      <div className="cn_title">Mixolydian</div>
                      <div className="composed">
                          <NumberScale fontSize={14}
                                       color={numberScaleColor}
                                       alterArray={[0, 0, 0, 0, 0, 0, -1]}/>
                      </div>
                  </div>
              </div>

          </>}
          {!isClassicScaleModeOn && <>
              <div className="line major" onClick={() => {
                setMode(music12.scale.ScaleMode.HarmonicMajor)
                setIsScalePickerOpen(false);
              }}>
                  <div className="symbol">
                      <MajorScaleSymbol color={majorScaleStrokeColor} fill={majorScaleBgColor}/>
                  </div>
                  <div className="right_area">
                      <div className="cn_title">和声大调</div>
                      <div className="composed">
                          <NumberScale fontSize={14}
                                       color={numberScaleColor}
                                       alterArray={[0, 0, 0, 0, 0, -1, 0]}/>
                      </div>
                  </div>
              </div>
              <div className="line major" onClick={() => {
                setMode(music12.scale.ScaleMode.MelodicMajorDescending)
                setIsScalePickerOpen(false);
              }}>
                  <div className="symbol">
                      <MajorScaleSymbol color={majorScaleStrokeColor} fill={majorScaleBgColor}/>
                  </div>
                  <div className="right_area">
                      <div className="cn_title">旋律大调下行</div>
                      <div className="composed">
                          <NumberScale fontSize={14}
                                       color={numberScaleColor}
                                       alterArray={[0, 0, 0, 0, 0, -1, -1]}/>
                      </div>
                  </div>
              </div>
          </>}
          <div className="line minor" onClick={() => {
            setMode(music12.scale.ScaleMode.NaturalMinor)
            setIsScalePickerOpen(false);
          }}>
            <div className="symbol">
              <MinorScaleSymbol color={minorScaleStrokeColor} fill={minorScaleBgColor}/>
            </div>
            <div className="right_area">
              <div className="cn_title">自然小调 Aeolian</div>
              <div className="composed">
                <NumberScale fontSize={14} color={numberScaleColor}
                             alterArray={[0, 0, -1, 0, 0, -1, -1]}/></div>
            </div>
          </div>

          {isClassicScaleModeOn && <>
              <div className="line" onClick={() => {
                setMode(music12.scale.ScaleMode.Dorian)
                setIsScalePickerOpen(false);
              }}>
                  <div className="symbol">
                      <MinorScaleSymbol color={minorScaleStrokeColor} fill={minorScaleBgColor}/>
                  </div>
                  <div className="right_area">
                      <div className="cn_title">Dorian</div>
                      <div className="composed">
                          <NumberScale fontSize={14} color={numberScaleColor}
                                       alterArray={[0, 0, -1, 0, 0, 0, -1]}/></div>
                  </div>
              </div>
              <div className="line" onClick={() => {
                setMode(music12.scale.ScaleMode.Phrygian)
                setIsScalePickerOpen(false);
              }}>
                  <div className="symbol">
                      <MinorScaleSymbol color={minorScaleStrokeColor} fill={minorScaleBgColor}/>
                  </div>
                  <div className="right_area">
                      <div className="cn_title">Phrygian</div>
                      <div className="composed">
                          <NumberScale fontSize={14} color={numberScaleColor}
                                       alterArray={[0, -1, -1, 0, 0, -1, -1]}/></div>
                  </div>
              </div>
          </>}

          {!isClassicScaleModeOn && <>
              <div className="line minor" onClick={() => {
                setMode(music12.scale.ScaleMode.HarmonicMinor)
                setIsScalePickerOpen(false);
              }}>
                  <div className="symbol">
                      <MinorScaleSymbol color={minorScaleStrokeColor} fill={minorScaleBgColor}/>
                  </div>
                  <div className="right_area">
                      <div className="cn_title">和声小调</div>
                      <div className="composed">
                          <NumberScale fontSize={14} color={numberScaleColor}
                                       alterArray={[0, 0, -1, 0, 0, -1, 0]}/></div>
                  </div>
              </div>
              <div className="line minor" onClick={() => {
                setMode(music12.scale.ScaleMode.MelodicMinorAscending)
                setIsScalePickerOpen(false);
              }}>
                  <div className="symbol">
                      <MinorScaleSymbol color={minorScaleStrokeColor} fill={minorScaleBgColor}/>
                  </div>
                  <div className="right_area">
                      <div className="cn_title">旋律小调上行</div>
                      <div className="composed">
                          <NumberScale fontSize={14} color={numberScaleColor}
                                       alterArray={[0, 0, -1, 0, 0, 0, 0]}/></div>
                  </div>
              </div>
          </>}
          <div className="line"
               onClick={() => {
                 setMode(music12.scale.ScaleMode.Locrian)
                 setIsScalePickerOpen(false);
               }}
               style={{
                 padding: isClassicScaleModeOn ? 10 : 0,
                 maxHeight: isClassicScaleModeOn ? 80 : 0,
                 transition: "all ease 0.5s",
                 overflow: "hidden"
               }}>
            <div className="symbol">
              <HalfDimScaleSymbol/>
            </div>
            <div className="right_area">
              <div className="cn_title">Locrian</div>
              <div className="composed">
                <NumberScale fontSize={14} color={numberScaleColor}
                             alterArray={[0, -1, -1, 0, -1, -1, -1]}/></div>
            </div>
          </div>
        </div>
      </div>
    </Mask>
  </>
}

export default ScalePickerPopover
const modeSelectedColor = googleColors.amber200
const mode_selector_css = (isClassicModeOn: boolean) => css({
  ...cssPresets.flexCenter,
  "& .item": {
    width: 120, height: 60,
    cursor: "pointer",
    ...cssPresets.flexCenter,
    fontFamily: "misans-m",
    fontSize: 17,
    color: googleColors.gray700,
    ...cssPresets.transition,
  },
  width: 240,
  marginLeft: "auto",
  marginRight: "auto",
  marginBottom: 20,
  borderRadius: 10,
  overflow: "hidden",
  boxSizing: "border-box",
  userSelect: "none",
  ...cssPresets.transition,

  "& .on": {
    borderRight: `1px  solid ${googleColors.gray300}`,
    color: isClassicModeOn?googleColors.deepOrange900:googleColors.gray800,
    backgroundColor: isClassicModeOn ? modeSelectedColor : "white",
  },
  "& .off": {
    color: !isClassicModeOn?googleColors.deepOrange900:googleColors.gray800,
    backgroundColor: isClassicModeOn ? "white" : modeSelectedColor,
  },
})
const ScalePicker_css = css({
  width: "calc(90vw)",
  maxWidth: 400,
  "& .main": {
    borderRadius: 10,
    overflow: "hidden",
    "& .line": {
      width: "100%",
      paddingTop: 10,
      paddingBottom: 10,
      backgroundColor: "white",
      ...cssPresets.defaultHoverAndActive as any,
      ...cssPresets.flexCenter,
      gap: 10,
      fontFamily: "misans-m",
      "& .right_area": {
        width: 170,
        ...cssPresets.flexCenter,
        flexDirection: "column",
        gap: 3,
      },
      "& .cn_title": {
        fontSize: 18,
        color: googleColors.gray800
      },
      "& .composed": {
        fontSize: 14,
        color: googleColors.gray500
      },
      "& .symbol": {
        width: 35,
        height: 35,
      }
    },
    "& .line:not(:last-of-type)": {
      borderBottom: `1px solid ${googleColors.gray300}`
    },
  }
})
