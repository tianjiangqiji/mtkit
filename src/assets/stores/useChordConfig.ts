import {create} from 'zustand'
import {immer} from 'zustand/middleware/immer'
import {createJSONStorage, persist} from 'zustand/middleware'

type scaleConfigType = {
  chordKey: string
  setChordKey: (chordKey: string) => void
  isChordSelectorOpen: boolean
  setIsChordSelectorOpen: (isChordSelectorOpen: boolean) => void
  isChordStaveConfigOpen: boolean
  setIsChordStaveConfigOpen: (isChordStaveConfigOpen: boolean) => void
  isChordOctaveShiftOpen: boolean
  setIsChordOctaveShiftOpen: (isChordOctaveShiftOpen: boolean) => void,
  chordVoicing: [] | { step: string, alter: number, octave: number }[]
  setChordVoicing: (chordVoicing: { step: string, alter: number, octave: number }[]) => void
  resetStore: () => void,
}
const storeKey = "chordConfig"
const defaultStore = {
  chordKey: "maj3",
  isChordSelectorOpen: false,
  isChordStaveConfigOpen: false,
  isChordOctaveShiftOpen: false,
  chordVoicing: []
}
const useChordConfig = create<scaleConfigType>()(immer(persist(
  (set) => ({
    ...defaultStore,
    setChordKey: (newStatus: string) => {
      set((state) => {
          state.chordKey = newStatus
        }
      )
    },
    setIsChordOctaveShiftOpen: (isChordOctaveShiftOpen: boolean) => {
      set((state) => {
        state.isChordOctaveShiftOpen = isChordOctaveShiftOpen
      })
    },
    setChordVoicing: (chordVoicing: { step: string, alter: number, octave: number }[]) => {
      set((state) => {
        state.chordVoicing = chordVoicing
      })
    },
    setIsChordStaveConfigOpen: (isChordStaveConfigOpen: boolean) => {
      set((state) => {
        state.isChordStaveConfigOpen = isChordStaveConfigOpen
      })
    },
    setIsChordSelectorOpen: (isChordSelectorOpen: boolean) => {
      set((state) => {
        state.isChordSelectorOpen = isChordSelectorOpen
      })
    },

    resetStore: () => {
      set(defaultStore)
      localStorage.removeItem(storeKey)
    }

  }),
  {
    name: storeKey, // name of the item in the storage (must be unique)
    storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
  },
),))

export default useChordConfig
