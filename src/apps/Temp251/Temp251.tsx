/* eslint-disable no-mixed-spaces-and-tabs */
import {css} from "@emotion/react";
import React, {useMemo} from "react";
import NotePicker from "@/components/reNote/NotePicker/NotePicker.tsx";
import NoteText from "@/components/reNote/NoteText/NoteText.tsx";
import useGlobalSettings from "@/assets/stores/useGlobalSettings.ts";
import googleColors from "@/assets/colors/googleColors.ts";
import cssPresets from "@/assets/styles/cssPresets.ts";
import * as music12 from "@/music12";
import Each251 from "@/apps/Temp251/parts/Each251.tsx";
import {useWindowSize} from "react-use";
import {Swiper} from "antd-mobile";


const Temp251 = () => {
  const {notePickerStep, notePickerAlter, setNotePickerOpen, naviBarHeight} = useGlobalSettings()
  const noteInstance = useMemo(() => {
    return music12.factory.getNote(notePickerStep, notePickerAlter, 4)
  }, [notePickerAlter, notePickerStep])
  const notesList251 = useMemo(() => {
    return [noteInstance.get251as(2), noteInstance.get251as(5), noteInstance.get251as(1)]
  }, [noteInstance])
  const {height} = useWindowSize()
  // console.log(noteInstance, notesList251)
  return <>
    <NotePicker/>
    <div css={Temp251_css(naviBarHeight)}>
      <div className="picker_note_window" onClick={() => setNotePickerOpen(true)}>
        <NoteText step={notePickerStep} alter={notePickerAlter} fontSize={35}/>
      </div>
      {height > 700 && <>
          <Each251 as={2} notesList={notesList251[0]}/>
          <Each251 as={5} notesList={notesList251[1]}/>
          <Each251 as={1} notesList={notesList251[2]}/>
      </>}
      {height <= 700 && <div className="swipe251_frame">
          <Swiper
              loop={true}
              style={{height: "100%", width: "100%", userSelect: "none"}}
              indicatorProps={{
                style: {
                  '--dot-size': '10px',
                  '--active-dot-size': '30px',
                  '--dot-border-radius': '100%',
                  '--active-dot-border-radius': '15px',
                  '--dot-spacing': '18px',
                }
              }}>
              <Swiper.Item key={0}>
                  <Each251 as={2} notesList={notesList251[0]}/>
              </Swiper.Item>
              <Swiper.Item key={1}>
                  <Each251 as={5} notesList={notesList251[1]}/>
              </Swiper.Item>
              <Swiper.Item key={2}>
                  <Each251 as={1} notesList={notesList251[2]}/>
              </Swiper.Item>
          </Swiper>
      </div>
      }

    </div>
  </>
}

export default Temp251

const Temp251_css = (naviBarHeight: number) => css({
  ...cssPresets.flexCenter,
  flexDirection: "column",
  height: `calc(100vh - ${naviBarHeight}px)`,
  "& .picker_note_window": {
    marginLeft: "auto",
    marginRight: "auto",
    userSelect: "none",
    width: 120,
    height: 60,
    backgroundColor: "white",
    border: `1px solid ${googleColors.gray300}`,
    borderRadius: 999,
    ...cssPresets.flexCenter,
    cursor: "pointer",
    transition: "all ease-in-out 0.1s",
    "&:hover": {
      backgroundColor: googleColors.gray200,
    }, "&:active": {
      backgroundColor: googleColors.gray300,
    },
    marginBottom: 25
  },
  "& .swipe251_frame": {
    height: "calc(50vh)",
    paddingTop: "calc(5vh)"
  }
})
