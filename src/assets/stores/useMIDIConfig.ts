import {create} from 'zustand'
import {immer} from 'zustand/middleware/immer'
import {createJSONStorage, persist} from 'zustand/middleware'

type intervalConfigType = {
  isWebMidiSupport: boolean,
  setIsWebMidiSupport: (isWebMidiSupport: boolean) => void,
  isJzzEngineReady: boolean,
  setIsJzzEngineReady: (isJzzEngineReady: boolean) => void,
  isJzzKbdReady: boolean,
  setIsJzzKbdReady: (isJzzKbdReady: boolean) => void,
  selectedInputPortIndex: number,
  selectedOutputPortIndex: number,
  setSelectedInputPortIndex: (i: number) => void,
  setSelectedOutputPortIndex: (i: number) => void,
  resetStore: () => void,
}
const defaultStore = {
  isWebMidiSupport: false,
  isJzzEngineReady: false,
  isJzzKbdReady: false,
  selectedInputPortIndex: 0,
  selectedOutputPortIndex: 0,
}
const storeKey = "midiConfig"
const useMIDIConfig = create<intervalConfigType>()(immer(persist(
  (set) => ({
    ...defaultStore,
    setIsWebMidiSupport: (i: boolean) => {
      set((state) => {
        state.isWebMidiSupport = i
      })
    },
    setSelectedInputPortIndex: (i: number) => {
      set((state) => {
        state.selectedInputPortIndex = i
      })
    },
    setSelectedOutputPortIndex: (i: number) => {
      set((state) => {
        state.selectedOutputPortIndex = i
      })
    },
    setIsJzzKbdReady: (i: boolean) => {
      set((state) => {
        state.isJzzKbdReady = i
      })
    },
    setIsJzzEngineReady: (i: boolean) => {
      set((state) => {
        state.isJzzEngineReady = i
      })
    },
    resetStore: () => {
      set(defaultStore)
      localStorage.removeItem(storeKey); // 替换为你定义的 storage key
    },
  }),
  {
    name: storeKey, // name of the item in the storage (must be unique)
    storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
  },
),))

export default useMIDIConfig
