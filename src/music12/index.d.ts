type t_noteStep = "C" | "D" | "E" | "F" | "G" | "A" | "B";
type t_alterValue = -2 | -1 | 0 | 1 | 2;

type t_intervalType = "p" | "maj" | "min" | "aug" | "dim" | "aug+" | "dim-";
type t_intervalCnPrefix = "纯" | "大" | "小" | "增" | "减" | "倍增" | "倍减";

declare class Interval {
    cnPrefix: t_intervalCnPrefix;
    type: t_intervalType;
    isNatural: boolean;
    numWithinOctave: number;
    num: number;
    semitoneGap: number;
    logicOctaveGap: number;
    factOctaveGap: number;
    semitoneLocation: number;
    semitoneGapWithinOctave: number;
    constructor(intervalType?: t_intervalType, intervalNum?: number);
    get simpleDescription(): string;
    getEqualInterval(isSelfTypeExcluded?: boolean, isAugDimExcluded?: boolean, isDoubleAugDimExcluded?: boolean): any[];
}

declare class Note {
    octave: number;
    step: t_noteStep;
    alter: t_alterValue;
    artName: string;
    mathName: string;
    fifthValue: number;
    isNormal: boolean;
    isBlack: boolean;
    locationId: number;
    semitoneWithinOctave: number;
    stepIndex: number;
    constructor(step?: t_noteStep, alter?: t_alterValue, octave?: number);
    get pitchValue(): number;
    get simpleDescription(): string;
    getNoteByInterval(intervalInstance: InstanceType<typeof Interval>, isAscending?: boolean): InstanceType<typeof Note>;
    getNoteByIntervalString(numberNotationString: string, isAscending?: boolean): InstanceType<typeof Note>;
    getSamePitchNotes(isSelfIncluded?: boolean, alterAbsLessThan?: 0 | 1 | 2): InstanceType<typeof Note>[];
    semitoneMove(moveStep: number): Note;
    getHarmonicSeries(): {
        step: t_noteStep;
        alter: t_alterValue;
        locationID: number;
        artName: string;
    }[];
    get251as(noteAs: number): Note[];
}

type t_transformString = "2" | "#2" | "b2" | "3" | "#3" | "b3" | "4" | "#4" | "b4" | "5" | "#5" | "b5" | "6" | "#6" | "b6" | "7" | "#7" | "b7" | "9" | "#9" | "b9" | "11" | "#11" | "b11" | "13" | "#13" | "b13";
type t_transformPanel = {
    2: t_intervalType | "omit" | void;
    3: t_intervalType | "omit" | void;
    4: t_intervalType | "omit" | void;
    5: t_intervalType | "omit" | void;
    6: t_intervalType | "omit" | void;
    7: t_intervalType | "omit" | void;
    9: t_intervalType | "omit" | void;
    11: t_intervalType | "omit" | void;
    13: t_intervalType | "omit" | void;
};
type t_inputTransformPanel = {
    2?: t_intervalType | "omit" | void;
    3?: t_intervalType | "omit" | void;
    4?: t_intervalType | "omit" | void;
    5?: t_intervalType | "omit" | void;
    6?: t_intervalType | "omit" | void;
    7?: t_intervalType | "omit" | void;
    9?: t_intervalType | "omit" | void;
    11?: t_intervalType | "omit" | void;
    13?: t_intervalType | "omit" | void;
} | {} | undefined;
type t_intervalNum = 2 | 3 | 4 | 5 | 6 | 7 | 9 | 11 | 13;

declare class Chord {
    #private;
    rootNote: InstanceType<typeof Note>;
    constructor(rootNote: InstanceType<typeof Note>, chordKey: string, initTransform?: t_inputTransformPanel);
    tryToMergeTransform(): InstanceType<typeof Chord>;
    get transformPanel(): t_transformPanel;
    get chordKey(): string;
    setTransform(transformString: t_transformString): InstanceType<typeof Chord>;
    get baseSymbol(): string;
    setOmit(omitInterval: t_intervalNum): void;
    get scoreSymbol(): string;
    clearTransform(): void;
    get isTransformed(): boolean;
    get intervalList(): [t_intervalType, number][];
    get notesList(): Note[];
    get simpleDescription(): string;
}

declare class Radix {
    #private;
    readonly radixBase: number;
    get base10(): number;
    constructor(base10: number, radixBase: number);
    static fromArray(array: number[], radixBase: number): Radix;
    get twoDigitArray(): number[];
    getGap(otherRadix: Radix): number;
    add(num: number): Radix;
}

declare class Base12Radix extends Radix {
    constructor(num: number);
    static fromArray(array: any[]): Base12Radix;
    get firstDigit(): number;
    get lastDigit(): number;
    add(num: number): Base12Radix;
    getGap(otherRadix: Radix): number;
}

declare class CircleOfFifths extends Base12Radix {
    constructor(i?: number);
    get majCircle(): {
        rawNoteStep: string;
        rawNoteAlter: number;
        mode: string;
        actualNoteStep: string;
        actualNoteAlter: number;
        isTonicReplaced: boolean;
        isTonicNormal: boolean;
        isDoubleAlterIncluded: boolean;
        rawStaveAlters: number;
        circleID: number;
    }[];
    get minCircle(): {
        rawNoteStep: string;
        rawNoteAlter: number;
        mode: string;
        actualNoteStep: string;
        actualNoteAlter: number;
        isTonicReplaced: boolean;
        isTonicNormal: boolean;
        isDoubleAlterIncluded: boolean;
        rawStaveAlters: number;
        circleID: number;
    }[];
    get location(): number;
    get circleNumber(): number;
    move(num: number): CircleOfFifths;
    get current(): {
        rawNoteStep: string;
        rawNoteAlter: number;
        mode: string;
        actualNoteStep: string;
        actualNoteAlter: number;
        isTonicReplaced: boolean;
        isTonicNormal: boolean;
        isDoubleAlterIncluded: boolean;
        rawStaveAlters: number;
        circleID: number;
    }[];
}

declare const _default$7: {
    CircleOfFifths: typeof CircleOfFifths;
    getFifthCircleByAlter: (alter: number) => CircleOfFifths;
};

type t_scaleMode = "MAJ" | "DOR" | "PHR" | "LYD" | "MLY" | "MIN" | "ION" | "AEO" | "MMAJ" | "HMAJ" | "HMIN" | "MMIN" | "LOC" | "CG" | "CS" | "CJ" | "CZ" | "CY";
type t_scaleIntervalPanel = {
    2?: t_intervalType | void;
    3?: t_intervalType | void;
    4?: t_intervalType | void;
    5?: t_intervalType | void;
    6?: t_intervalType | void;
    7?: t_intervalType | void;
};
type t_scaleNotesPanel = {
    1: InstanceType<typeof Note> | void;
    2?: InstanceType<typeof Note> | void;
    3?: InstanceType<typeof Note> | void;
    4?: InstanceType<typeof Note> | void;
    5?: InstanceType<typeof Note> | void;
    6?: InstanceType<typeof Note> | void;
    7?: InstanceType<typeof Note> | void;
};

declare class Scale {
    #private;
    modeDescription: string;
    intervalPanel: t_scaleIntervalPanel;
    alterSum: number;
    alterTimesSum: number;
    rootNote: InstanceType<typeof Note>;
    modeName: string;
    type: string;
    constructor(rootNote: InstanceType<typeof Note>, scaleMode: t_scaleMode);
    get chord3OfDegreesList(): string[];
    get chord7OfDegreesList(): string[];
    get notesList(): Note[];
    get intervalList(): any[];
    get notesPanel(): t_scaleNotesPanel;
    get naturalNotesNum(): number;
    get alteredNotesNum(): number;
    get sharpOrFlatNotesNum(): number;
    get doubleSharpOrFlatNotesNum(): number;
    get alterList(): number[];
    get isTonicReplaced(): boolean;
    getNoteByIntervalNum(num: number, isWithinOctave?: boolean): InstanceType<typeof Note>;
    get simpleDescription(): string;
    get equalRootNote(): InstanceType<typeof Note>;
    getScaleDegreeNote(degree: number): InstanceType<typeof Note>;
    private getScaleDegreeChord3Key;
    private getScaleDegreeChord7Key;
    getScaleDegreeChord3(scaleDegree: number): Chord;
    getScaleDegreeChord7(scaleDegree: number): Chord;
}

declare const _default$6: {
    getBlackRandomNote: (octave?: number | number[], isNormal?: boolean) => Note;
    getWhiteRandomNote: (octave?: number | number[], isNormal?: boolean) => Note;
    getNormalRandomNote: (octave?: number | number[]) => Note;
    getCasualRandomNote: (octave?: number | number[]) => Note;
    getNoteByLocation: (location: number, octave?: number) => InstanceType<typeof Note>[];
    Note: typeof Note;
};

declare const _default$5: {
    getIntervalByComparingNotes: (note1: InstanceType<typeof Note>, note2: InstanceType<typeof Note>) => InstanceType<typeof Interval>;
    Interval: typeof Interval;
};

declare const _default$4: {
    Scale: typeof Scale;
    ScaleMode: {
        NaturalMajor: string;
        NaturalMinor: string;
        Ionian: string;
        Aeolian: string;
        Dorian: string;
        Phrygian: string;
        Lydian: string;
        Mixolydian: string;
        Locrian: string;
        HarmonicMinor: string;
        HarmonicMajor: string;
        MelodicMinorAscending: string;
        MelodicMajorDescending: string;
    };
    MajorModeGroup: string[];
    MinorModeGroup: string[];
    getModeNameByModeKey: (modeKey: string) => string;
    getModeTypeByModeKey: (modeKey: string) => string;
    getIntervalListByModeKey: (modeKey: string) => (string | number)[][];
};

declare const _default$3: {
    getStaveAlterByNote: (step: t_noteStep, alter: t_alterValue) => {
        rawNoteStep: string;
        rawNoteAlter: number;
        mode: string;
        actualNoteStep: string;
        actualNoteAlter: number;
        isTonicReplaced: boolean;
        isTonicNormal: boolean;
        isDoubleAlterIncluded: boolean;
        rawStaveAlters: number;
        circleID: number;
    }[];
    getScaleByStaveAlters: (staveAlter: number) => {
        rawNoteStep: string;
        rawNoteAlter: number;
        mode: string;
        actualNoteStep: string;
        actualNoteAlter: number;
        isTonicReplaced: boolean;
        isTonicNormal: boolean;
        isDoubleAlterIncluded: boolean;
        rawStaveAlters: number;
        circleID: number;
    }[];
    getAlterStepListByNum: (num: number) => string[];
};

declare const _default$2: {
    getNote: (step: string, alter: number, octave?: number) => Note;
    getInterval: (type: string, num: number) => Interval;
    getScale: (step: string, alter: number, octave: number, mode: string) => Scale;
    getChord: (step: string, alter: number, octave: number, chordKey: string, transformPanel?: t_inputTransformPanel) => Chord;
};

declare const _default$1: {
    Chord: typeof Chord;
    chordMeta: ({
        type: string;
        cnName: string;
        chordKey: string;
        scoreDisplay: string;
        intervalList: (string | number)[][];
        notesNum: number;
        semitoneLocationList: number[];
        orderedSemitoneLocationList: number[];
    } | {
        type: string;
        cnName: string;
        chordKey: string;
        scoreDisplay: number;
        intervalList: (string | number)[][];
        notesNum: number;
        semitoneLocationList: number[];
        orderedSemitoneLocationList: number[];
    })[];
    findChord: (locationList: number[], isStrictlyMatch?: boolean, rootNoteLocation?: number, limitType?: string[]) => {
        rootNoteLocation: number;
        chordKey: string;
        cnName: string;
        type: string;
        orderedNotesLocationList: number[];
        notesLocationList: number[];
        n3L: number;
        n5L: number;
        n7L: number;
        n9L: number;
        n11L: number;
        n13L: number;
    }[];
    findChordInScale: (locationListOfChord: number[], limitMode?: string | string[]) => {
        rootNoteLocation: number;
        mode: string;
        notesLocationList: number[];
        orderedNotesLocationList: number[];
        n2L: number;
        n3L: number;
        n4L: number;
        n5L: number;
        n6L: number;
        n7L: number;
    }[];
    getChordSymbolByKey: (k: string) => string | number;
    getChordCnNameByKey: (k: string) => string;
    findNotesInChord: (notesList: {
        location: number;
        as: number;
    }[]) => {
        rootNoteLocation: number;
        chordKey: string;
        cnName: string;
        type: string;
        orderedNotesLocationList: number[];
        notesLocationList: number[];
        n3L: number;
        n5L: number;
        n7L: number;
        n9L: number;
        n11L: number;
        n13L: number;
    }[];
};

declare const _default: {
    note: {
        getBlackRandomNote: (octave?: number | number[], isNormal?: boolean) => Note;
        getWhiteRandomNote: (octave?: number | number[], isNormal?: boolean) => Note;
        getNormalRandomNote: (octave?: number | number[]) => Note;
        getCasualRandomNote: (octave?: number | number[]) => Note;
        getNoteByLocation: (location: number, octave?: number) => InstanceType<typeof Note>[];
        Note: typeof Note;
    };
    interval: {
        getIntervalByComparingNotes: (note1: InstanceType<typeof Note>, note2: InstanceType<typeof Note>) => InstanceType<typeof Interval>;
        Interval: typeof Interval;
    };
    scale: {
        Scale: typeof Scale;
        ScaleMode: {
            NaturalMajor: string;
            NaturalMinor: string;
            Ionian: string;
            Aeolian: string;
            Dorian: string;
            Phrygian: string;
            Lydian: string;
            Mixolydian: string;
            Locrian: string;
            HarmonicMinor: string;
            HarmonicMajor: string;
            MelodicMinorAscending: string;
            MelodicMajorDescending: string;
        };
        MajorModeGroup: string[];
        MinorModeGroup: string[];
        getModeNameByModeKey: (modeKey: string) => string;
        getModeTypeByModeKey: (modeKey: string) => string;
        getIntervalListByModeKey: (modeKey: string) => (string | number)[][];
    };
    stave: {
        getStaveAlterByNote: (step: t_noteStep, alter: t_alterValue) => {
            rawNoteStep: string;
            rawNoteAlter: number;
            mode: string;
            actualNoteStep: string;
            actualNoteAlter: number;
            isTonicReplaced: boolean;
            isTonicNormal: boolean;
            isDoubleAlterIncluded: boolean;
            rawStaveAlters: number;
            circleID: number;
        }[];
        getScaleByStaveAlters: (staveAlter: number) => {
            rawNoteStep: string;
            rawNoteAlter: number;
            mode: string;
            actualNoteStep: string;
            actualNoteAlter: number;
            isTonicReplaced: boolean;
            isTonicNormal: boolean;
            isDoubleAlterIncluded: boolean;
            rawStaveAlters: number;
            circleID: number;
        }[];
        getAlterStepListByNum: (num: number) => string[];
    };
    Radix: typeof Radix;
    circleOfFifths: {
        CircleOfFifths: typeof CircleOfFifths;
        getFifthCircleByAlter: (alter: number) => CircleOfFifths;
    };
    factory: {
        getNote: (step: string, alter: number, octave?: number) => Note;
        getInterval: (type: string, num: number) => Interval;
        getScale: (step: string, alter: number, octave: number, mode: string) => Scale;
        getChord: (step: string, alter: number, octave: number, chordKey: string, transformPanel?: t_inputTransformPanel) => Chord;
    };
    chord: {
        Chord: typeof Chord;
        chordMeta: ({
            type: string;
            cnName: string;
            chordKey: string;
            scoreDisplay: string;
            intervalList: (string | number)[][];
            notesNum: number;
            semitoneLocationList: number[];
            orderedSemitoneLocationList: number[];
        } | {
            type: string;
            cnName: string;
            chordKey: string;
            scoreDisplay: number;
            intervalList: (string | number)[][];
            notesNum: number;
            semitoneLocationList: number[];
            orderedSemitoneLocationList: number[];
        })[];
        findChord: (locationList: number[], isStrictlyMatch?: boolean, rootNoteLocation?: number, limitType?: string[]) => {
            rootNoteLocation: number;
            chordKey: string;
            cnName: string;
            type: string;
            orderedNotesLocationList: number[];
            notesLocationList: number[];
            n3L: number;
            n5L: number;
            n7L: number;
            n9L: number;
            n11L: number;
            n13L: number;
        }[];
        findChordInScale: (locationListOfChord: number[], limitMode?: string | string[]) => {
            rootNoteLocation: number;
            mode: string;
            notesLocationList: number[];
            orderedNotesLocationList: number[];
            n2L: number;
            n3L: number;
            n4L: number;
            n5L: number;
            n6L: number;
            n7L: number;
        }[];
        getChordSymbolByKey: (k: string) => string | number;
        getChordCnNameByKey: (k: string) => string;
        findNotesInChord: (notesList: {
            location: number;
            as: number;
        }[]) => {
            rootNoteLocation: number;
            chordKey: string;
            cnName: string;
            type: string;
            orderedNotesLocationList: number[];
            notesLocationList: number[];
            n3L: number;
            n5L: number;
            n7L: number;
            n9L: number;
            n11L: number;
            n13L: number;
        }[];
    };
    find: {
        findChord: (locationList: number[], isStrictlyMatch?: boolean, rootNoteLocation?: number, limitType?: string[]) => {
            rootNoteLocation: number;
            chordKey: string;
            cnName: string;
            type: string;
            orderedNotesLocationList: number[];
            notesLocationList: number[];
            n3L: number;
            n5L: number;
            n7L: number;
            n9L: number;
            n11L: number;
            n13L: number;
        }[];
        findNotesInChord: (notesList: {
            location: number;
            as: number;
        }[]) => {
            rootNoteLocation: number;
            chordKey: string;
            cnName: string;
            type: string;
            orderedNotesLocationList: number[];
            notesLocationList: number[];
            n3L: number;
            n5L: number;
            n7L: number;
            n9L: number;
            n11L: number;
            n13L: number;
        }[];
        findNotesInScale: (notesList: {
            location: number;
            as: number;
        }[]) => {
            rootNoteLocation: number;
            mode: string;
            notesLocationList: number[];
            orderedNotesLocationList: number[];
            n2L: number;
            n3L: number;
            n4L: number;
            n5L: number;
            n6L: number;
            n7L: number;
        }[];
    };
};

export { _default$1 as chord, _default$7 as circleOfFifths, _default as default, _default$2 as factory, _default$5 as interval, _default$6 as note, _default$4 as scale, _default$3 as stave };
