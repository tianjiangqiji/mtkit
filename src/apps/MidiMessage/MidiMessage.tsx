import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {css} from "@emotion/react";
import cssPresets from "@/assets/styles/cssPresets.ts";
import googleColors from "@/assets/colors/googleColors.ts";
import JZZ from "jzz"
import useMIDIReady from "@/utils/useMIDI/useMIDIReady.ts";
import useMIDIPorts from "@/utils/useMIDI/useMIDIPorts.ts";
import {WebMidi} from "webmidi";
import NotSupportMidi from "@/apps/MidiMessage/components/NotSupportMidi.tsx";
import {useHotkeys} from 'react-hotkeys-hook';
import {isArray, keys, random} from "lodash";
import {Button, Input} from "antd-mobile";

const keyMap = {
  "a": 60,
  "s": 65 - 12,
  "d": 67 - 12,
  "w": 69,
  "j": 50,
  "k": 56,
  "l": 45,
  "z": 48,

}
const keyList = keys(keyMap)
const MidiMessage = () => {
  const {isWebMidiSupport, isJzzEngineReady} = useMIDIReady()
  const [n, setN] = useState(0)
  const {
    currentOutPort, currentInPort, outputs, inputs,
    selectedOutPortIndex, selectedInPortIndex,
    portNameIn, portNameOut,
    setCurrentOutPort, setCurrentInPort,
    setSelectedOutPortIndex, setSelectedInPortIndex
  } = useMIDIPorts()

  //绑定键盘事件
  useHotkeys(keyList, e => {
    if (e.repeat) return;
    if (e.type === "keydown") {
      currentOutPort.noteOn(0, keyMap[e.key], random(80, 125))
    } else {
      currentOutPort.noteOff(0, keyMap[e.key])
    }
  }, {
    keyup: true,
    keydown: true,
  })

  console.log(JZZ().info())
  const a = () => {
    setSelectedOutPortIndex(1)
  }
  const b = () => {
    if (!currentOutPort) return
    const sy =currentOutPort.getSynth(4)
    currentOutPort?.setSynth(0, sy)
  }
  useEffect(() => {
    if (!currentOutPort) return
    try {
      const sy =currentOutPort.getSynth(n)
      currentOutPort?.setSynth(0, sy)
    } catch (e) {
      console.log(e)
    }
  }, [currentOutPort, n]);


  console.log("currentOutport:", currentOutPort)

  if (!(isWebMidiSupport && isJzzEngineReady)) return <NotSupportMidi/>
  return <div css={miditest_css}>

    <div>输入</div>
    <div style={{...cssPresets.flexCenter, flexDirection: "column"}}>{
      inputs.map((item, index) => {
        return <div key={index}>{index + 1}: -{item.name}-{item.manufacturer}-{item.id}</div>
      })
    }</div>
    <div>输出</div>
    <div style={{...cssPresets.flexCenter, flexDirection: "column"}}>{
      outputs.map((item, index) => {
        return <div key={index}>{index + 1}:-{item.name}-{item.manufacturer}-{item.id}</div>
      })
    }</div>
    <div>
      Out:{selectedOutPortIndex}-{portNameOut}
    </div>
    <div>
      In:{selectedInPortIndex}-{portNameIn}
    </div>
    {n}
  </div>
};

export default MidiMessage;

const miditest_css = css({
  ...cssPresets.flexCenter,
  flexDirection: "column",
  fontSize: 20,
  color: googleColors.gray600,
})