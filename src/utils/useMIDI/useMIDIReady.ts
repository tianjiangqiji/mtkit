import {useEffect} from "react";
import JZZ from "jzz";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// import Kdb from "jzz-input-kbd";
import "jzz-synth-tiny";
// @ts-ignore
import {Tiny} from 'jzz-synth-tiny'
// @ts-ignore
import {Gear} from 'jzz-midi-gear';
import useMIDIConfig from "../../assets/stores/useMIDIConfig";

Tiny(JZZ)
Gear(JZZ)


export default () => {
  const {
    isWebMidiSupport,
    setIsWebMidiSupport,
    isJzzEngineReady,
    setIsJzzEngineReady,
  } = useMIDIConfig()
  // const [isWebMidiSupport, setIsWebMidiSupport] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    JZZ.synth.Tiny.register("WebAudio合成器");
    navigator.requestMIDIAccess().then(() => {
      setIsWebMidiSupport(true)
    }).catch(() => {
      setIsWebMidiSupport(false)
    });

    JZZ({sysex: true}).and(() => {
      setIsJzzEngineReady(true)
      midiOutReg()
      midiInReg()
    }).or(() => setIsJzzEngineReady(false))
  }, [setIsJzzEngineReady, setIsWebMidiSupport])

  return {
    isWebMidiSupport, isJzzEngineReady
  }
}


const midiOutReg = () => {
  JZZ.lib.registerMidiOut("乐理计算器VirtualOut", {
    _info: () => ({
      name: "乐理计算器VirtualOut",
      id: "乐理计算器VirtualOut",
      manufacturer:
        "guohub.top",
      version:
        "1.2.1",
    }),
    _openOut: (port: any, name: any) => {
      port._receive = (data: any) => {
        console.log(data)
      }
    }
  })
}
const midiInReg = () => {
  JZZ.lib.registerMidiIn("WebInput", {
    _info: () => ({
      name: "WebInput",
      id: "WebInput",
      manufacturer:
        "s1",
      version:
        "0.5",
    }),
    _openIn: (port: any, name: any) => {
      port._receive = (data: any) => {
        console.log(data)
      }
    }
  })
}