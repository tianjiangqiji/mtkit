import {create} from 'zustand'
import {immer} from 'zustand/middleware/immer'
import {createJSONStorage, persist} from 'zustand/middleware'
import googleColors from "@/assets/colors/googleColors.ts";
import instrumentsObj from "@/apps/Settings/datas/instrumentsObj.ts";

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
	lastViewURL: string,
	setLastViewURL: (newURL: string) => void,
	setOctave: (newOctave: number) => void
	mainVolume: number,
	setMainVolume: (newVolume: number) => void,
	instrument: string,
	setInstrument: (newInstrument: string) => void,
	chordPlayStyle: string[],
	setChordPlayStyle: (newStyle: string[]) => void
	playOctaveShift: number,
	setPlayOctaveShift: (newShift: number) => void
	playMode: string,
	setPlayMode: (newMode: string) => void,
	playModeByTurnIndex: number,
	setPlayModeByTurnIndex: (newIndex: number) => void
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
	octave: 4,
	lastViewURL: "", //上次访问过的地址，可以用来保存
	mainVolume: 0,// 主音量
	instrument: instrumentsObj.piano, //乐器
	chordPlayStyle: ["column", "split_up", "split_down"],//和弦播放样式
	playOctaveShift: 0, //播放器的八度偏移量
	playMode: "byTurn", //多次点击播放的模式：随机/轮换
	playModeByTurnIndex: 0 //如果是轮换，记录一下上次的索引
}
const useGlobalSettings = create<GlobalSettingsType>()(immer(persist(
		(set) => ({
			...defaultStore,
			setNaviWindowOpen: (newStatus: boolean) => {
				set((state) => {
					state.isNaviWindowOpen = newStatus
				})
			},
			setPlayMode: (newMode: string) => {
				set((state) => {
					state.playMode = newMode
				})
			},
			setPlayModeByTurnIndex: (newIndex: number) => {
				set((state) => {
					state.playModeByTurnIndex = newIndex
				})
			},
			setPlayOctaveShift: (newShift: number) => {
				set((state) => {
					state.playOctaveShift = newShift
				})
			},
			setChordPlayStyle: (newStyle: string[]) => {
				set((state) => {
					state.chordPlayStyle = newStyle
				})
			},
			setMainVolume: (newVolume: number) => {
				set((state) => {
					state.mainVolume = newVolume
				})
			},
			setInstrument: (newInstrument: string) => {
				set((state) => {
					state.instrument = newInstrument
				})
			},
			setLastViewURL: (newURL: string) => {
				set((state) => {
					state.lastViewURL = newURL
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
