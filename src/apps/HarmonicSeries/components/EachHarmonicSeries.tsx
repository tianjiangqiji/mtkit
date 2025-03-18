/* eslint-disable no-mixed-spaces-and-tabs */
import {css} from "@emotion/react";
import {useEffect, useRef, useState} from "react";
import NoteText from "@/components/reNote/NoteText/NoteText.tsx";
import useSwipeX from "@/utils/useSwipeX.ts";
import {debounce, max, min, range, throttle} from "lodash";
import useHarmonicSeriesConfig from "@/assets/stores/useHarmonicSeriesConfig.ts";
import cssPresets from "@/assets/styles/cssPresets.ts";
import GoogleColors from "@/assets/colors/googleColors.ts";


const EachHarmonicSeries = (props: {
  step: string,
  alter: number
  notesList: { step: string, alter: number }[]
}) => {
  const {scrollLeft, setScrollLeft} = useHarmonicSeriesConfig()
  const ref = useRef<HTMLDivElement>(null)
  const swipeTrigger = (i: boolean) => {
    if (i) {
      return setScrollLeft(max([scrollLeft - 120, 0]))
    }
    setScrollLeft(min([scrollLeft + 120, 440]))
  }

  // 监听全局状态变化
  useEffect(() => {
    if (ref.current && ref.current.scrollLeft !== scrollLeft) {
      ref.current.scrollLeft = scrollLeft;
    }
  }, [scrollLeft]);
  const {handlers} = useSwipeX({onSwipeTrigger: swipeTrigger})
  return <>
    <div css={EachHarmonicSeries_css}>
      <div className="note_window">
        <NoteText step={props.step} alter={props.alter} fontSize={35}/>
      </div>
      <div className="roll_frame" {...handlers}
           ref={ref}
        // onScroll={e => {
        //   setScrollLeft(e.nativeEvent.target?.scrollLeft || 0)
        // }}
      >
        {props.notesList.map((x, y) => <div
          className="each_harmonic_note"
          key={y}>
          <div className="order">{y + 1}</div>
          <div className="n"><NoteText step={x.step} color={GoogleColors.blue800} fontSize={30} alter={x.alter}/></div>

        </div>)}
      </div>
    </div>
  </>
}

export default EachHarmonicSeries

const EachHarmonicSeries_css = css({
  display: "flex",
  marginLeft: 10,
  marginRight: 10,
  "& .note_window": {
    width: 80,
    ...cssPresets.flexCenter,
    height: 90,
    backgroundColor: GoogleColors.amber200,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  "& .roll_frame": {
    width: "100%",
    height: 120,
    overflowX: "scroll",
    display: "flex",
    // backgroundColor: "firebrick",
    scrollBehavior: "smooth",
    scrollSnapType: "x mandatory",
    WebkitScrollSnapType: "x mandatory",
    scrollbarWidth: "none",
    touchAction: "pan-x",
    WebkitOverflowScrolling: "touch",
    "&::-webkit-scrollbar": {
      display: "none"
    },
    "& .each_harmonic_note": {
      minWidth: 60,
      // backgroundColor: "wheat",
      scrollSnapAlign: "start",
      flexShrink: 0,
      "& .order": {
        width: "100%",
        ...cssPresets.flexCenter,
        borderRight: "1px solid #ccc",
        height: 30,
        backgroundColor: "white",
        borderBottom: "1px solid #ccc",
      },
      "& .n": {
        height: 60,
        ...cssPresets.flexCenter,
        backgroundColor: "white",
        borderRight: "1px solid #ccc",
      }
    }
  }
})
