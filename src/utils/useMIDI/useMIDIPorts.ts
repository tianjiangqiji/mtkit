import {useList} from "react-use";
import JZZ from "jzz";
import {useEffect, useMemo, useState} from "react";
import useMIDIReady from "./useMIDIReady";
import useMIDIConfig from "../../assets/stores/useMIDIConfig";
import {isEmpty} from "lodash";

type port = {
  engine: string
  id: string
  manufacturer: string
  name: string
  version: string
}
export default () => {
  const {isWebMidiSupport, isJzzEngineReady} = useMIDIReady()
  const [inputs, inputActions] = useList([])
  const [outputs, outputActions] = useList([])
  const [currentInPort, setCurrentInPort] = useState(null)
  const [currentOutPort, setCurrentOutPort] = useState(null)
  const [selectedInPortIndex, setSelectedInPortIndex] = useState(0)
  const [selectedOutPortIndex, setSelectedOutPortIndex] = useState(0)
  const [info, setInfo] = useState(null)
  useEffect(() => {
    if (isWebMidiSupport && isJzzEngineReady) {
      JZZ({sysex: true}).and(() => {
        const JZZInfo = JZZ().info()
        inputActions.set(JZZInfo.inputs)
        outputActions.set(JZZInfo.outputs)
        setInfo(JZZInfo)
      })
    } else {
      setInfo(null)
    }
  }, [inputActions, isJzzEngineReady, isWebMidiSupport, outputActions])
  const portNameIn = useMemo(() => {
    if (!(isWebMidiSupport && isJzzEngineReady)) return ""
    if (!(inputs.length > 0 && selectedInPortIndex <= inputs.length - 1)) return ""
    const inPortName = JZZ().info().inputs[selectedInPortIndex]["name"]
    if (isEmpty(inPortName)) return ""
    return inPortName
  }, [inputs.length, isJzzEngineReady, isWebMidiSupport, selectedInPortIndex])

  const portNameOut = useMemo(() => {
    if (!(isWebMidiSupport && isJzzEngineReady)) return ""
    if (!(outputs.length > 0 && selectedOutPortIndex <= outputs.length - 1)) return ""
    const outPortName = JZZ().info().outputs[selectedOutPortIndex]["name"]
    if (isEmpty(outPortName)) return ""
    return outPortName
  }, [isJzzEngineReady, isWebMidiSupport, outputs.length, selectedOutPortIndex])


  useEffect(() => {
    if (!(isWebMidiSupport && isJzzEngineReady)) return;
    if (outputs.length > 0 && selectedOutPortIndex <= outputs.length - 1) {
      JZZ({sysex: true}).openMidiOut(outputs[selectedOutPortIndex]["name"]).then((op) => {
        console.log("op:", outputs[selectedOutPortIndex])
        return setCurrentOutPort(op as any)
      })
    }
    if (inputs.length > 0 && selectedInPortIndex <= inputs.length - 1) {
      JZZ({sysex: true}).openMidiIn(inputs[selectedInPortIndex]["name"]).then((oi) => {
        console.log("oi:", inputs[selectedInPortIndex])
        return setCurrentInPort(oi as any)
      })
    }
  }, [inputs, isJzzEngineReady, isWebMidiSupport, outputs, selectedInPortIndex, selectedOutPortIndex]);

  return {
    inputs,
    outputs,
    info,
    portNameIn,
    portNameOut,
    currentInPort: currentInPort,
    currentOutPort: currentOutPort,
    setCurrentInPort,
    setCurrentOutPort,
    selectedInPortIndex,
    selectedOutPortIndex,
    setSelectedInPortIndex,
    setSelectedOutPortIndex
  }
}