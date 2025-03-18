import {create} from 'zustand'
import {immer} from 'zustand/middleware/immer'
import {createJSONStorage, persist} from 'zustand/middleware'
import googleColors from "@/assets/colors/googleColors.ts";

type GlobalSettingsType = {
  isNaviWindowOpen: boolean,
  setNaviWindowOpen: (newStatus: boolean) => void,
  naviBarHeight: number
  phoneWidth: number,
  isNotePickerOpen: boolean,
  setNotePickerOpen: (newStatus: boolean) => void,
  notePickerStep: string,
  notePickerAlter: number,
  setNotePickerStep: (step: string) => void,
  setNotePickerAlter: (alter: number) => void,
  setNotePicker: (step: string, alter: number) => void,
  isProModeOn: boolean,
  setProModeOn: (newStatus: boolean) => void,
  defaultNoteColor: string,
  intervalFunctionsFullHeight: number,
  resetStore: () => void,
  isWideScreen: boolean,
  setIsWideScreen: (newStatus: boolean) => void,
  octave: number,
  setOctave: (newOctave: number) => void
}
const storeKey = 'globalSettings'
const defaultStore = {
  isNaviWindowOpen: false,
  naviBarHeight: 50,
  phoneWidth: 550,
  isNotePickerOpen: false,
  notePickerStep: "C",
  notePickerAlter: 0,
  isProModeOn: false,
  defaultNoteColor: googleColors.gray800,
  intervalFunctionsFullHeight: 900,
  isWideScreen: false,
  octave: 4
}
const useGlobalSettings = create<GlobalSettingsType>()(immer(persist(
    (set) => ({
      ...defaultStore,
      setNaviWindowOpen: (newStatus: boolean) => {
        set((state) => {
          state.isNaviWindowOpen = newStatus
        })
      },
      setOctave: (newOctave: number) => {
        set((state) => {
          state.octave = newOctave
        })
      },
      setNotePickerOpen: (newStatus: boolean) => {
        set((state) => {
          state.isNotePickerOpen = newStatus
        })
      },
      setNotePickerStep: (step: string) => {
        set((state) => {
          state.notePickerStep = step
        })
      },
      setIsWideScreen: (newStatus: boolean) => {
        set((state) => {
          state.isWideScreen = newStatus
        })
      },
      setNotePickerAlter: (alter: number) => {
        set((state) => {
          state.notePickerAlter = alter
        })
      },
      setNotePicker: (step: string, alter: number) => {
        set((state) => {
          state.notePickerStep = step
          state.notePickerAlter = alter
        })
      },

      setProModeOn: (newStatus: boolean) => {
        set((state) => {
          state.isProModeOn = newStatus
        })
      },
      resetStore: () => {
        set(defaultStore)
        localStorage.removeItem(storeKey)
      },
    }),
    {
      name: storeKey, // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    },
  ),
))

export default useGlobalSettings
