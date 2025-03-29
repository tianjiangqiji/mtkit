import {
    isNumber,
    isString,
    isUndefined,
    isNull,
    range,
    isArray,
    keys,
    isEqual,
    isEmpty,
    isInteger,
    intersection
} from 'lodash';
import collect from 'collect.js';
import {numberToChinese} from 'chinese-numbering';

class NoteError extends Error {
    constructor(message = "Note Error!") {
        super(message);
        this.name = "NoteError";
    }
}

class IntervalError extends Error {
    constructor(message = "Interval Error!") {
        super(message);
        this.name = "IntervalError";
    }
}

class RadixError extends Error {
    constructor(message = "Radix Error!") {
        super(message);
        this.name = "RadixError";
    }
}

class ChordError extends Error {
    constructor(message = "Chord Error!") {
        super(message);
        this.name = "ChordError";
    }
}

class ScaleError extends Error {
    constructor(message = "Scale Error!") {
        super(message);
        this.name = "ScaleError";
    }
}

class CircleOfFifthsError extends Error {
    constructor(message = "FifthCircle Error!") {
        super(message);
        this.name = "FifthCircleError";
    }
}

class FactoryError extends Error {
    constructor(message = "Factory Error!") {
        super(message);
        this.name = "FactoryError";
    }
}

var __defProp$4 = Object.defineProperty;
var __defNormalProp$4 = (obj, key, value) => key in obj ? __defProp$4(obj, key, {
    enumerable: true,
    configurable: true,
    writable: true,
    value
}) : obj[key] = value;
var __publicField$4 = (obj, key, value) => {
    __defNormalProp$4(obj, typeof key !== "symbol" ? key + "" : key, value);
    return value;
};
var __accessCheck$4 = (obj, member, msg) => {
    if (!member.has(obj))
        throw TypeError("Cannot " + msg);
};
var __privateGet$3 = (obj, member, getter) => {
    __accessCheck$4(obj, member, "read from private field");
    return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd$4 = (obj, member, value) => {
    if (member.has(obj))
        throw TypeError("Cannot add the same private member more than once");
    member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet$4 = (obj, member, value, setter) => {
    __accessCheck$4(obj, member, "write to private field");
    setter ? setter.call(obj, value) : member.set(obj, value);
    return value;
};
var _base10$1;
const _Radix = class _Radix {
    // 构造函数
    constructor(base10, radixBase) {
        __publicField$4(this, "radixBase");
        __privateAdd$4(this, _base10$1, void 0);
        this.radixBase = radixBase;
        __privateSet$4(this, _base10$1, base10);
    }

    get base10() {
        return __privateGet$3(this, _base10$1);
    }

    // 同样是构造函数
    static fromArray(array, radixBase) {
        if (array.length !== 2) {
            throw new Error("The length must be 2.");
        }
        const base10Value = array[0] * radixBase + array[1];
        return new _Radix(base10Value, radixBase);
    }

    // 转换为数组
    // input: a number and a radix symbol.
    // output: a length-2-array where every digit is base10 number. Besides, array[1] forever be positive.
    // e.g. input: 13   (base12 symbol), output: [1, 1]
    // e.g. input: 13   (base7 symbol),  output: [1, 6]
    // e.g. input: 130  (base7 symbol),  output: [18, 4]
    // e.g. input: -13  (base7 symbol),  output: [-2, 1]
    // e.g. input: -1   (base7 symbol),  output: [-1, 6]
    get twoDigitArray() {
        if (this.base10 === 0)
            return [0, 0];
        let circle = 0;
        let position = this.base10;
        while (position >= this.radixBase) {
            position -= this.radixBase;
            circle++;
        }
        while (position < 0) {
            position = this.radixBase + position;
            circle--;
        }
        return [circle, position];
    }

    getGap(otherRadix) {
        return otherRadix.base10 - this.base10;
    }

    // input: a length-2-number-array, a number(positive: add and negative: subtract), a radixSymbol.
    // Each digit of the input length-2-number-array should be base10 number.
    // output: a new length-2-number-array where every digit is base10 number.
    // e.g. input: [0,5]   +8   (base7 symbol)     output:[1,6]
    // e.g. input: [0,5]   +8   (base12 symbol)    output:[1,1]
    add(num) {
        return new _Radix(this.base10 + num, this.radixBase);
    }
};
_base10$1 = new WeakMap();
let Radix = _Radix;

class Base7Radix extends Radix {
    constructor(num) {
        super(num, 7);
    }

    // 同样是构造函数
    static fromArray(array) {
        if (array.length !== 2) {
            throw new Error("The Array length must be 2.");
        }
        if (!isNumber(array[0]))
            throw new RadixError("The first digit of the array must be a number.");
        return new Base7Radix(array[0] * 7 + array[1]);
    }

    get firstDigit() {
        return this.twoDigitArray[0];
    }

    get lastDigit() {
        return this.twoDigitArray[1];
    }

    add(num) {
        return new Base7Radix(this.base10 + num);
    }

    getGap(otherRadix) {
        return otherRadix.base10 - this.base10;
    }
}

var __accessCheck$3 = (obj, member, msg) => {
    if (!member.has(obj))
        throw TypeError("Cannot " + msg);
};
var __privateGet$2 = (obj, member, getter) => {
    __accessCheck$3(obj, member, "read from private field");
    return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd$3 = (obj, member, value) => {
    if (member.has(obj))
        throw TypeError("Cannot add the same private member more than once");
    member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet$3 = (obj, member, value, setter) => {
    __accessCheck$3(obj, member, "write to private field");
    setter ? setter.call(obj, value) : member.set(obj, value);
    return value;
};
var _base10, _radix$1;

class IntervalRadix {
    constructor(intervalNum) {
        __privateAdd$3(this, _base10, void 0);
        __privateAdd$3(this, _radix$1, void 0);
        if (intervalNum < 1)
            throw new Error("Interval number must be greater than 1.");
        __privateSet$3(this, _base10, intervalNum - 1);
        __privateSet$3(this, _radix$1, new Base7Radix(intervalNum - 1));
    }

    get base10() {
        return __privateGet$2(this, _base10) + 1;
    }

    get twoDigitArray() {
        return [__privateGet$2(this, _radix$1).twoDigitArray[0], __privateGet$2(this, _radix$1).twoDigitArray[1] + 1];
    }

    get octave() {
        return this.twoDigitArray[0];
    }

    get intervalNum() {
        return this.base10;
    }

    get intervalNumWithinOctave() {
        return this.twoDigitArray[1];
    }
}

_base10 = new WeakMap();
_radix$1 = new WeakMap();
const stepList = ["C", "D", "E", "F", "G", "A", "B"];

class Base12Radix extends Radix {
    constructor(num) {
        super(num, 12);
    }

    // 同样是构造函数
    static fromArray(array) {
        if (array.length !== 2) {
            throw new Error("The Array length must be 2.");
        }
        if (!isNumber(array[0]))
            throw new RadixError("The first digit of the array must be a number.");
        return new Base12Radix(array[0] * 12 + array[1]);
    }

    get firstDigit() {
        return this.twoDigitArray[0];
    }

    get lastDigit() {
        return this.twoDigitArray[1];
    }

    add(num) {
        return new Base12Radix(this.base10 + num);
    }

    getGap(otherRadix) {
        return otherRadix.base10 - this.base10;
    }
}

const noteMeta = collect(
    [
        {
            uid: 1,
            artName: "C",
            step: "C",
            alter: 0,
            semitone: 0,
            stepIndex: 0,
            fifthValue: 0,
            locationId: 0,
            isNormal: true,
            isBlack: false,
            mathName: "C"
        },
        {
            uid: 2,
            artName: "D",
            step: "D",
            alter: 0,
            semitone: 2,
            stepIndex: 1,
            fifthValue: 2,
            locationId: 2,
            isNormal: true,
            isBlack: false,
            mathName: "D"
        },
        {
            uid: 3,
            artName: "E",
            step: "E",
            alter: 0,
            semitone: 4,
            stepIndex: 2,
            fifthValue: 4,
            locationId: 4,
            isNormal: true,
            isBlack: false,
            mathName: "E"
        },
        {
            uid: 4,
            artName: "F",
            step: "F",
            alter: 0,
            semitone: 5,
            stepIndex: 3,
            fifthValue: -1,
            locationId: 5,
            isNormal: true,
            isBlack: false,
            mathName: "F"
        },
        {
            uid: 5,
            artName: "G",
            step: "G",
            alter: 0,
            semitone: 7,
            stepIndex: 4,
            fifthValue: 1,
            locationId: 7,
            isNormal: true,
            isBlack: false,
            mathName: "G"
        },
        {
            uid: 6,
            artName: "A",
            step: "A",
            alter: 0,
            semitone: 9,
            stepIndex: 5,
            fifthValue: 3,
            locationId: 9,
            isNormal: true,
            isBlack: false,
            mathName: "A"
        },
        {
            uid: 7,
            artName: "B",
            step: "B",
            alter: 0,
            semitone: 11,
            stepIndex: 6,
            fifthValue: 5,
            locationId: 11,
            isNormal: true,
            isBlack: false,
            mathName: "B"
        },
        {
            uid: 8,
            artName: "C\u266F",
            step: "C",
            alter: 1,
            semitone: 1,
            stepIndex: 0,
            fifthValue: 7,
            locationId: 1,
            isNormal: true,
            isBlack: true,
            mathName: "C+1"
        },
        {
            uid: 9,
            artName: "C\u266D",
            step: "C",
            alter: -1,
            semitone: -1,
            stepIndex: 0,
            fifthValue: -7,
            locationId: 11,
            isNormal: false,
            isBlack: false,
            mathName: "C-1"
        },
        {
            uid: 10,
            artName: "D\u266F",
            step: "D",
            alter: 1,
            semitone: 3,
            stepIndex: 1,
            fifthValue: 9,
            locationId: 3,
            isNormal: true,
            isBlack: true,
            mathName: "D+1"
        },
        {
            uid: 11,
            artName: "D\u266D",
            step: "D",
            alter: -1,
            semitone: 1,
            stepIndex: 1,
            fifthValue: -5,
            locationId: 1,
            isNormal: true,
            isBlack: true,
            mathName: "D-1"
        },
        {
            uid: 12,
            artName: "E\u266F",
            step: "E",
            alter: 1,
            semitone: 5,
            stepIndex: 2,
            fifthValue: 11,
            locationId: 5,
            isNormal: false,
            isBlack: false,
            mathName: "E+1"
        },
        {
            uid: 13,
            artName: "E\u266D",
            step: "E",
            alter: -1,
            semitone: 3,
            stepIndex: 2,
            fifthValue: -3,
            locationId: 3,
            isNormal: true,
            isBlack: true,
            mathName: "E-1"
        },
        {
            uid: 14,
            artName: "F\u266F",
            step: "F",
            alter: 1,
            semitone: 6,
            stepIndex: 3,
            fifthValue: 6,
            locationId: 6,
            isNormal: true,
            isBlack: true,
            mathName: "F+1"
        },
        {
            uid: 15,
            artName: "F\u266D",
            step: "F",
            alter: -1,
            semitone: 4,
            stepIndex: 3,
            fifthValue: -8,
            locationId: 4,
            isNormal: false,
            isBlack: false,
            mathName: "F-1"
        },
        {
            uid: 16,
            artName: "G\u266F",
            step: "G",
            alter: 1,
            semitone: 8,
            stepIndex: 4,
            fifthValue: 8,
            locationId: 8,
            isNormal: true,
            isBlack: true,
            mathName: "G+1"
        },
        {
            uid: 17,
            artName: "G\u266D",
            step: "G",
            alter: -1,
            semitone: 6,
            stepIndex: 4,
            fifthValue: -6,
            locationId: 6,
            isNormal: true,
            isBlack: true,
            mathName: "G-1"
        },
        {
            uid: 18,
            artName: "A\u266F",
            step: "A",
            alter: 1,
            semitone: 10,
            stepIndex: 5,
            fifthValue: 10,
            locationId: 10,
            isNormal: true,
            isBlack: true,
            mathName: "A+1"
        },
        {
            uid: 19,
            artName: "A\u266D",
            step: "A",
            alter: -1,
            semitone: 8,
            stepIndex: 5,
            fifthValue: -4,
            locationId: 8,
            isNormal: true,
            isBlack: true,
            mathName: "A-1"
        },
        {
            uid: 20,
            artName: "B\u266F",
            step: "B",
            alter: 1,
            semitone: 12,
            stepIndex: 6,
            fifthValue: 12,
            locationId: 0,
            isNormal: false,
            isBlack: false,
            mathName: "B+1"
        },
        {
            uid: 21,
            artName: "B\u266D",
            step: "B",
            alter: -1,
            semitone: 10,
            stepIndex: 6,
            fifthValue: -2,
            locationId: 10,
            isNormal: true,
            isBlack: true,
            mathName: "B-1"
        },
        {
            uid: 22,
            artName: "C\u266F\u266F",
            step: "C",
            alter: 2,
            semitone: 2,
            stepIndex: 0,
            fifthValue: 14,
            locationId: 2,
            isNormal: false,
            isBlack: false,
            mathName: "C+2"
        },
        {
            uid: 23,
            artName: "C\u266D\u266D",
            step: "C",
            alter: -2,
            semitone: -2,
            stepIndex: 0,
            fifthValue: -14,
            locationId: 10,
            isNormal: false,
            isBlack: true,
            mathName: "C-2"
        },
        {
            uid: 24,
            artName: "D\u266F\u266F",
            step: "D",
            alter: 2,
            semitone: 4,
            stepIndex: 1,
            fifthValue: 16,
            locationId: 4,
            isNormal: false,
            isBlack: false,
            mathName: "D+2"
        },
        {
            uid: 25,
            artName: "D\u266D\u266D",
            step: "D",
            alter: -2,
            semitone: 0,
            stepIndex: 1,
            fifthValue: -12,
            locationId: 0,
            isNormal: false,
            isBlack: false,
            mathName: "D-2"
        },
        {
            uid: 26,
            artName: "E\u266F\u266F",
            step: "E",
            alter: 2,
            semitone: 6,
            stepIndex: 2,
            fifthValue: 18,
            locationId: 6,
            isNormal: false,
            isBlack: true,
            mathName: "E+2"
        },
        {
            uid: 27,
            artName: "E\u266D\u266D",
            step: "E",
            alter: -2,
            semitone: 2,
            stepIndex: 2,
            fifthValue: -10,
            locationId: 2,
            isNormal: false,
            isBlack: false,
            mathName: "E-2"
        },
        {
            uid: 28,
            artName: "F\u266F\u266F",
            step: "F",
            alter: 2,
            semitone: 7,
            stepIndex: 3,
            fifthValue: 13,
            locationId: 7,
            isNormal: false,
            isBlack: false,
            mathName: "F+2"
        },
        {
            uid: 29,
            artName: "F\u266D\u266D",
            step: "F",
            alter: -2,
            semitone: 3,
            stepIndex: 3,
            fifthValue: -15,
            locationId: 3,
            isNormal: false,
            isBlack: true,
            mathName: "F-2"
        },
        {
            uid: 30,
            artName: "G\u266F\u266F",
            step: "G",
            alter: 2,
            semitone: 9,
            stepIndex: 4,
            fifthValue: 15,
            locationId: 9,
            isNormal: false,
            isBlack: false,
            mathName: "G+2"
        },
        {
            uid: 31,
            artName: "G\u266D\u266D",
            step: "G",
            alter: -2,
            semitone: 5,
            stepIndex: 4,
            fifthValue: -13,
            locationId: 5,
            isNormal: false,
            isBlack: false,
            mathName: "G-2"
        },
        {
            uid: 32,
            artName: "A\u266F\u266F",
            step: "A",
            alter: 2,
            semitone: 11,
            stepIndex: 5,
            fifthValue: 17,
            locationId: 11,
            isNormal: false,
            isBlack: false,
            mathName: "A+2"
        },
        {
            uid: 33,
            artName: "A\u266D\u266D",
            step: "A",
            alter: -2,
            semitone: 7,
            stepIndex: 5,
            fifthValue: -11,
            locationId: 7,
            isNormal: false,
            isBlack: false,
            mathName: "A-2"
        },
        {
            uid: 34,
            artName: "B\u266F\u266F",
            step: "B",
            alter: 2,
            semitone: 13,
            stepIndex: 6,
            fifthValue: 19,
            locationId: 1,
            isNormal: false,
            isBlack: true,
            mathName: "B+2"
        },
        {
            uid: 35,
            artName: "B\u266D\u266D",
            step: "B",
            alter: -2,
            semitone: 9,
            stepIndex: 6,
            fifthValue: -9,
            locationId: 9,
            isNormal: false,
            isBlack: false,
            mathName: "B-2"
        }
    ]
);
const getStepByIndex = (index) => {
    return stepList[index];
};
const getIndexByStep = (step) => {
    const index = stepList.indexOf(step);
    if (index === -1) {
        throw new Error(`Invalid step ${step}`);
    }
    return index;
};

class StepRadix extends Base7Radix {
    constructor(step) {
        if (isNumber(step))
            super(step);
        else
            super(getIndexByStep(step));
    }

    // 同样是构造函数
    static fromArray(array) {
        if (array.length !== 2) {
            throw new Error("The Array length must be 2.");
        }
        if (!isNumber(array[0]))
            throw new RadixError("The first digit of the array must be a number.");
        if (isString(array[1])) {
            try {
                const stepIndex = getIndexByStep(array[1]);
                return new StepRadix(array[0] * 7 + stepIndex);
            } catch (e) {
                throw new RadixError("Error step.");
            }
        }
        if (isNumber(array[1])) {
            return new StepRadix(array[0] * 7 + array[1]);
        }
        throw new RadixError("Error array type.");
    }

    get step() {
        return getStepByIndex(this.twoDigitArray[1]);
    }

    get octave() {
        return this.twoDigitArray[0];
    }

    add(num) {
        return new StepRadix(this.base10 + num);
    }

    get stepIndex() {
        return this.twoDigitArray[1];
    }

    getGap(otherRadix) {
        return otherRadix.base10 - this.base10;
    }

    getIntervalGap(otherRadix) {
        return new IntervalRadix(1 + otherRadix.base10 - this.base10);
    }
}

class SemitoneRadix extends Base12Radix {
    constructor(semitone) {
        super(semitone);
    }

    static fromArray(array) {
        if (array.length !== 2)
            throw new RadixError("The length must be 2.");
        return new SemitoneRadix(array[0] * 12 + array[1]);
    }

    getGap(otherRadix) {
        return otherRadix.base10 - this.base10;
    }

    add(num) {
        return new SemitoneRadix(this.base10 + num);
    }

    get location() {
        return this.twoDigitArray[1];
    }

    get octave() {
        return this.twoDigitArray[0];
    }

    getKeyboardNotes(isAlterAbsLessThan) {
        if (isUndefined(isAlterAbsLessThan) || isNull(isAlterAbsLessThan))
            return noteMeta.where("locationId", this.location).all();
        return noteMeta.where("locationId", this.location).filter((item) => {
            return Math.abs(item.alter) <= isAlterAbsLessThan;
        }).all();
    }
}

var __accessCheck$2 = (obj, member, msg) => {
    if (!member.has(obj))
        throw TypeError("Cannot " + msg);
};
var __privateGet$1 = (obj, member, getter) => {
    __accessCheck$2(obj, member, "read from private field");
    return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd$2 = (obj, member, value) => {
    if (member.has(obj))
        throw TypeError("Cannot add the same private member more than once");
    member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet$2 = (obj, member, value, setter) => {
    __accessCheck$2(obj, member, "write to private field");
    setter ? setter.call(obj, value) : member.set(obj, value);
    return value;
};
var _scaleDegreeNum, _radix;
const _ScaleRadix = class _ScaleRadix {
    constructor(scaleDegreeNum) {
        __privateAdd$2(this, _scaleDegreeNum, void 0);
        __privateAdd$2(this, _radix, void 0);
        if (scaleDegreeNum < 1)
            throw new Error("Interval number must be greater than 1.");
        __privateSet$2(this, _scaleDegreeNum, scaleDegreeNum - 1);
        __privateSet$2(this, _radix, new Base7Radix(scaleDegreeNum - 1));
    }

    get base10() {
        return __privateGet$1(this, _scaleDegreeNum) + 1;
    }

    get twoDigitArray() {
        return [__privateGet$1(this, _radix).twoDigitArray[0], __privateGet$1(this, _radix).twoDigitArray[1] + 1];
    }

    get octave() {
        return this.twoDigitArray[0];
    }

    get totalScaleDegrees() {
        return this.base10;
    }

    get scaleDegree() {
        return this.twoDigitArray[1];
    }

    add(num) {
        return new _ScaleRadix(this.totalScaleDegrees + num);
    }
};
_scaleDegreeNum = new WeakMap();
_radix = new WeakMap();
let ScaleRadix = _ScaleRadix;
const cls_getNoteByInterval = (noteInstance, intervalInstance, isAscending = true) => {
    if (isUndefined(intervalInstance) || isNull(intervalInstance))
        throw new IntervalError("Interval is empty.");
    if (isUndefined(noteInstance) || isNull(noteInstance))
        throw new NoteError("Note is empty.");
    const baseNoteStepRadix = StepRadix.fromArray([noteInstance.octave, noteInstance.step]);
    const baseNoteSemitoneRadix = new SemitoneRadix(noteInstance.semitoneWithinOctave);
    const targetStepRadix = isAscending ? baseNoteStepRadix.add(intervalInstance.num - 1) : baseNoteStepRadix.add((intervalInstance.num - 1) * -1);
    const targetSemitoneRadix = isAscending ? baseNoteSemitoneRadix.add(intervalInstance.semitoneGap) : baseNoteSemitoneRadix.add(intervalInstance.semitoneGap * -1);
    const findBaseNoteObj = noteMeta.where(
        "step",
        targetStepRadix.step
    ).where(
        "locationId",
        targetSemitoneRadix.location
    ).first();
    if (!Boolean(findBaseNoteObj)) {
        throw new NoteError("No fit note from base note by the given interval.");
    }
    return new Note(
        findBaseNoteObj.step,
        findBaseNoteObj.alter,
        targetStepRadix.octave
    );
};
const cls_getSamePitchNotes = (givenNoteInstance, isSelfIncluded = true, alterAbsLessThan = 2) => {
    if (Math.abs(alterAbsLessThan) > 2)
        throw new Error("Alter abs value cannot be bigger than 2!");
    const stepRadix = StepRadix.fromArray([givenNoteInstance.octave, givenNoteInstance.step]);
    const stepsArr = isSelfIncluded ? [stepRadix.add(-1), stepRadix, stepRadix.add(1)] : [stepRadix.add(-1), stepRadix.add(1)];
    const result = [];
    const alterList = range(alterAbsLessThan * -1, alterAbsLessThan + 1);
    for (let i_step_radix = 0; i_step_radix < stepsArr.length; i_step_radix++) {
        for (let i_alter_value = 0; i_alter_value < alterList.length; i_alter_value++) {
            const compareNote = new Note(
                stepsArr[i_step_radix].step,
                alterList[i_alter_value],
                stepsArr[i_step_radix].octave
            );
            if (compareNote.pitchValue === givenNoteInstance.pitchValue) {
                result.push(compareNote);
                break;
            }
        }
    }
    return result;
};
const intervalMeta = collect(
    [
        {
            type: "aug+",
            num: 1,
            cnPrefix: "\u500D\u589E",
            isNatural: false,
            alter: 2,
            semitoneGap: 2,
            semitoneLocation: 2,
            octaveGap: 0
        },
        {
            type: "aug",
            num: 1,
            cnPrefix: "\u589E",
            isNatural: false,
            alter: 1,
            semitoneGap: 1,
            semitoneLocation: 1,
            octaveGap: 0
        },
        {
            type: "p",
            num: 1,
            cnPrefix: "\u7EAF",
            isNatural: true,
            alter: 0,
            semitoneGap: 0,
            semitoneLocation: 0,
            octaveGap: 0
        },
        {
            type: "dim",
            num: 1,
            cnPrefix: "\u51CF",
            isNatural: false,
            alter: -1,
            semitoneGap: -1,
            semitoneLocation: 11,
            octaveGap: -1
        },
        {
            type: "dim-",
            num: 1,
            cnPrefix: "\u500D\u51CF",
            isNatural: false,
            alter: -2,
            semitoneGap: -2,
            semitoneLocation: 10,
            octaveGap: -1
        },
        {
            type: "aug+",
            num: 2,
            cnPrefix: "\u500D\u589E",
            isNatural: false,
            alter: 2,
            semitoneGap: 4,
            semitoneLocation: 4,
            octaveGap: 0
        },
        {
            type: "aug",
            num: 2,
            cnPrefix: "\u589E",
            isNatural: false,
            alter: 1,
            semitoneGap: 3,
            semitoneLocation: 3,
            octaveGap: 0
        },
        {
            type: "maj",
            num: 2,
            cnPrefix: "\u5927",
            isNatural: true,
            alter: 0,
            semitoneGap: 2,
            semitoneLocation: 2,
            octaveGap: 0
        },
        {
            type: "min",
            num: 2,
            cnPrefix: "\u5C0F",
            isNatural: true,
            alter: 0,
            semitoneGap: 1,
            semitoneLocation: 1,
            octaveGap: 0
        },
        {
            type: "dim",
            num: 2,
            cnPrefix: "\u51CF",
            isNatural: false,
            alter: -1,
            semitoneGap: 0,
            semitoneLocation: 0,
            octaveGap: 0
        },
        {
            type: "dim-",
            num: 2,
            cnPrefix: "\u500D\u51CF",
            isNatural: false,
            alter: -2,
            semitoneGap: -1,
            semitoneLocation: 11,
            octaveGap: -1
        },
        {
            type: "aug+",
            num: 3,
            cnPrefix: "\u500D\u589E",
            isNatural: false,
            alter: 2,
            semitoneGap: 6,
            semitoneLocation: 6,
            octaveGap: 0
        },
        {
            type: "aug",
            num: 3,
            cnPrefix: "\u589E",
            isNatural: false,
            alter: 1,
            semitoneGap: 5,
            semitoneLocation: 5,
            octaveGap: 0
        },
        {
            type: "maj",
            num: 3,
            cnPrefix: "\u5927",
            isNatural: true,
            alter: 0,
            semitoneGap: 4,
            semitoneLocation: 4,
            octaveGap: 0
        },
        {
            type: "min",
            num: 3,
            cnPrefix: "\u5C0F",
            isNatural: true,
            alter: 0,
            semitoneGap: 3,
            semitoneLocation: 3,
            octaveGap: 0
        },
        {
            type: "dim",
            num: 3,
            cnPrefix: "\u51CF",
            isNatural: false,
            alter: -1,
            semitoneGap: 2,
            semitoneLocation: 2,
            octaveGap: 0
        },
        {
            type: "dim-",
            num: 3,
            cnPrefix: "\u500D\u51CF",
            isNatural: false,
            alter: -2,
            semitoneGap: 1,
            semitoneLocation: 1,
            octaveGap: 0
        },
        {
            type: "aug+",
            num: 4,
            cnPrefix: "\u500D\u589E",
            isNatural: false,
            alter: 2,
            semitoneGap: 7,
            semitoneLocation: 7,
            octaveGap: 0
        },
        {
            type: "aug",
            num: 4,
            cnPrefix: "\u589E",
            isNatural: true,
            alter: 1,
            semitoneGap: 6,
            semitoneLocation: 6,
            octaveGap: 0
        },
        {
            type: "p",
            num: 4,
            cnPrefix: "\u7EAF",
            isNatural: true,
            alter: 0,
            semitoneGap: 5,
            semitoneLocation: 5,
            octaveGap: 0
        },
        {
            type: "dim",
            num: 4,
            cnPrefix: "\u51CF",
            isNatural: false,
            alter: -1,
            semitoneGap: 4,
            semitoneLocation: 4,
            octaveGap: 0
        },
        {
            type: "dim-",
            num: 4,
            cnPrefix: "\u500D\u51CF",
            isNatural: false,
            alter: -2,
            semitoneGap: 3,
            semitoneLocation: 3,
            octaveGap: 0
        },
        {
            type: "aug+",
            num: 5,
            cnPrefix: "\u500D\u589E",
            isNatural: false,
            alter: 2,
            semitoneGap: 9,
            semitoneLocation: 9,
            octaveGap: 0
        },
        {
            type: "aug",
            num: 5,
            cnPrefix: "\u589E",
            isNatural: false,
            alter: 1,
            semitoneGap: 8,
            semitoneLocation: 8,
            octaveGap: 0
        },
        {
            type: "p",
            num: 5,
            cnPrefix: "\u7EAF",
            isNatural: true,
            alter: 0,
            semitoneGap: 7,
            semitoneLocation: 7,
            octaveGap: 0
        },
        {
            type: "dim",
            num: 5,
            cnPrefix: "\u51CF",
            isNatural: true,
            alter: -1,
            semitoneGap: 6,
            semitoneLocation: 6,
            octaveGap: 0
        },
        {
            type: "dim-",
            num: 5,
            cnPrefix: "\u500D\u51CF",
            isNatural: false,
            alter: -2,
            semitoneGap: 5,
            semitoneLocation: 5,
            octaveGap: 0
        },
        {
            type: "aug+",
            num: 6,
            cnPrefix: "\u500D\u589E",
            isNatural: false,
            alter: 2,
            semitoneGap: 11,
            semitoneLocation: 11,
            octaveGap: 0
        },
        {
            type: "aug",
            num: 6,
            cnPrefix: "\u589E",
            isNatural: false,
            alter: 1,
            semitoneGap: 10,
            semitoneLocation: 10,
            octaveGap: 0
        },
        {
            type: "maj",
            num: 6,
            cnPrefix: "\u5927",
            isNatural: true,
            alter: 0,
            semitoneGap: 9,
            semitoneLocation: 9,
            octaveGap: 0
        },
        {
            type: "min",
            num: 6,
            cnPrefix: "\u5C0F",
            isNatural: true,
            alter: 0,
            semitoneGap: 8,
            semitoneLocation: 8,
            octaveGap: 0
        },
        {
            type: "dim",
            num: 6,
            cnPrefix: "\u51CF",
            isNatural: false,
            alter: -1,
            semitoneGap: 7,
            semitoneLocation: 7,
            octaveGap: 0
        },
        {
            type: "dim-",
            num: 6,
            cnPrefix: "\u500D\u51CF",
            isNatural: false,
            alter: -2,
            semitoneGap: 6,
            semitoneLocation: 6,
            octaveGap: 0
        },
        {
            type: "aug+",
            num: 7,
            cnPrefix: "\u500D\u589E",
            isNatural: false,
            alter: 2,
            semitoneGap: 13,
            semitoneLocation: 1,
            octaveGap: 1
        },
        {
            type: "aug",
            num: 7,
            cnPrefix: "\u589E",
            isNatural: false,
            alter: 1,
            semitoneGap: 12,
            semitoneLocation: 0,
            octaveGap: 1
        },
        {
            type: "maj",
            num: 7,
            cnPrefix: "\u5927",
            isNatural: true,
            alter: 0,
            semitoneGap: 11,
            semitoneLocation: 11,
            octaveGap: 0
        },
        {
            type: "min",
            num: 7,
            cnPrefix: "\u5C0F",
            isNatural: true,
            alter: 0,
            semitoneGap: 10,
            semitoneLocation: 10,
            octaveGap: 0
        },
        {
            type: "dim",
            num: 7,
            cnPrefix: "\u51CF",
            isNatural: false,
            alter: -1,
            semitoneGap: 9,
            semitoneLocation: 9,
            octaveGap: 0
        },
        {
            type: "dim-",
            num: 7,
            cnPrefix: "\u500D\u51CF",
            isNatural: false,
            alter: -2,
            semitoneGap: 8,
            semitoneLocation: 8,
            octaveGap: 0
        }
    ]
);
const initIntervalClass = (intervalType = "p", intervalNum = 1) => {
    if (intervalNum <= 0)
        throw new IntervalError("Interval num cannot be 0 or negative!");
    const intervalNumRadix = new IntervalRadix(intervalNum);
    const findObj = intervalMeta.where("type", intervalType).where(
        "num",
        intervalNumRadix.intervalNumWithinOctave
    ).first();
    if (findObj)
        return [findObj, intervalNumRadix.octave];
    throw new IntervalError("Interval type doesn't match interval num.(e.g. maj1)");
};
const cls_getEqualInterval = (intervalInstance, isSelfTypeExcluded = false, isAugDimExcluded = false, isDoubleAugDimExcluded = false) => {
    if (intervalInstance.num < 1)
        throw new IntervalError("Interval num cannot be 0 or negative!");
    if (intervalInstance.num === 1 && [10, 11].includes(intervalInstance.semitoneLocation)) {
        throw new IntervalError("Don't calculate the interval of dim1 or double dim1!");
    }
    if (intervalInstance.num === 2 && intervalInstance.semitoneLocation === 11) {
        throw new IntervalError("Don't calculate the interval of double dim2!");
    }
    if (intervalInstance.num === 1 && intervalInstance.semitoneLocation === 0) {
        if (isSelfTypeExcluded && isAugDimExcluded)
            return [];
        if (isSelfTypeExcluded && !isAugDimExcluded)
            return [new Interval("dim", 2)];
        if (!isSelfTypeExcluded && !isAugDimExcluded)
            return [
                new Interval("p", 1),
                new Interval("dim", 2)
            ];
    }
    const findIntervalOnSameLocation = intervalMeta.where(
        "semitoneLocation",
        intervalInstance.semitoneLocation
    ).all();
    if (!findIntervalOnSameLocation)
        throw new IntervalError("Internal bugs. Can't find same intervals.");
    const resultList = [];
    const doPush = (item) => {
        const readyIntervalNum = item.num + 7 * (intervalInstance.factOctaveGap - item.octaveGap);
        if (readyIntervalNum <= 0)
            return;
        resultList.push(new Interval(item.type, readyIntervalNum));
    };
    findIntervalOnSameLocation.forEach((x) => {
        if (isSelfTypeExcluded && x.type === intervalInstance.type)
            return;
        if (isAugDimExcluded && ["aug", "dim"].includes(x.type))
            return;
        if (isDoubleAugDimExcluded && ["aug+", "dim-"].includes(x.type))
            return;
        doPush(x);
    });
    return resultList;
};
var __defProp$3 = Object.defineProperty;
var __defNormalProp$3 = (obj, key, value) => key in obj ? __defProp$3(obj, key, {
    enumerable: true,
    configurable: true,
    writable: true,
    value
}) : obj[key] = value;
var __publicField$3 = (obj, key, value) => {
    __defNormalProp$3(obj, typeof key !== "symbol" ? key + "" : key, value);
    return value;
};

class Interval {
    constructor(intervalType = "p", intervalNum = 1) {
        __publicField$3(this, "cnPrefix");
        __publicField$3(this, "type");
        __publicField$3(this, "isNatural");
        __publicField$3(this, "numWithinOctave");
        __publicField$3(this, "num");
        __publicField$3(this, "semitoneGap");
        __publicField$3(this, "logicOctaveGap");
        __publicField$3(this, "factOctaveGap");
        __publicField$3(this, "semitoneLocation");
        __publicField$3(this, "semitoneGapWithinOctave");
        const intervalFullObj = initIntervalClass(intervalType, intervalNum);
        const intervalObjWithinOctave = intervalFullObj[0];
        this.semitoneLocation = intervalObjWithinOctave.semitoneLocation;
        this.logicOctaveGap = intervalFullObj[1];
        this.cnPrefix = intervalObjWithinOctave.cnPrefix;
        this.semitoneGapWithinOctave = intervalObjWithinOctave.semitoneGap;
        this.type = intervalObjWithinOctave.type;
        this.numWithinOctave = intervalObjWithinOctave.num;
        this.num = intervalNum;
        this.isNatural = intervalObjWithinOctave.isNatural;
        this.factOctaveGap = intervalObjWithinOctave.octaveGap + this.logicOctaveGap;
        this.semitoneGap = intervalObjWithinOctave.semitoneGap + this.logicOctaveGap * 12;
    }

    get simpleDescription() {
        return `${this.cnPrefix}${numberToChinese(this.num, {chineseType: "simplified"})}\u5EA6`;
    }

    getEqualInterval(isSelfTypeExcluded = false, isAugDimExcluded = false, isDoubleAugDimExcluded = false) {
        return cls_getEqualInterval(
            this,
            isSelfTypeExcluded,
            isAugDimExcluded,
            isDoubleAugDimExcluded
        );
    }
}

const overtoneSeriesIntervalList = [
    ["p", 8],
    ["p", 5],
    ["p", 4],
    ["maj", 3],
    ["min", 3],
    ["min", 3],
    ["maj", 2],
    ["maj", 2],
    ["maj", 2],
    ["maj", 2],
    ["min", 2],
    ["maj", 2],
    ["min", 2],
    ["aug", 1],
    ["min", 2]
];
const cls_getOvertoneSeries = (step, alter, octave) => {
    let arr = [];
    if (Math.abs(alter) > 1)
        return arr;
    let baseNote = new Note(step, alter, octave);
    for (let i of overtoneSeriesIntervalList) {
        const intervalObj = new Interval(i[0], i[1]);
        try {
            const targetNote = baseNote.getNoteByInterval(intervalObj);
            baseNote = new Note(targetNote.step, targetNote.alter, octave);
            arr.push({
                step: targetNote.step,
                alter: targetNote.alter,
                locationID: targetNote.locationId,
                artName: targetNote.artName
            });
        } catch (e) {
            arr.push(void 0);
        }
    }
    return arr;
};
const initNoteClass = (step = "C", alter = 0) => {
    const noteStep = step.toString().toUpperCase().trim();
    const noteObj = noteMeta.where("step", noteStep).where("alter", alter).first();
    if (noteObj)
        return noteObj;
    throw new NoteError("Note step or alter exceeds limits.");
};
const intervalTypeList_145 = ["dim-", "dim", "p", "aug", "aug+"];
const intervalTypeList_2367 = ["dim-", "dim", "min", "maj", "aug", "aug+"];
const intervalSlide_145 = (currentInterval = "p", move = 0) => {
    const currentIndex = intervalTypeList_145.indexOf(currentInterval);
    const newIndex = currentIndex + move;
    if (intervalTypeList_145[newIndex])
        return intervalTypeList_145[newIndex];
    throw new IntervalError("Interval beyond limit. (min:dim- max:aug+)");
};
const intervalSlide_2367 = (currentInterval = "maj", move = 0) => {
    const currentIndex = intervalTypeList_2367.indexOf(currentInterval);
    const newIndex = currentIndex + move;
    if (intervalTypeList_2367[newIndex])
        return intervalTypeList_2367[newIndex];
    throw new IntervalError("Interval beyond limit. (min:dim- max:aug+)");
};
const cls_getNoteByNumberNotation = (noteInstance, numberNotation, isAscending = true) => {
    const intervalNumReg = numberNotation.match(/\d+/g);
    if (intervalNumReg.length > 1)
        throw new IntervalError("2 or more interval is given.");
    const lowOctaveReg = numberNotation.match(/[.lL<vV]/g);
    const lowOctaveValue = lowOctaveReg ? lowOctaveReg.length : 0;
    const highOctaveReg = numberNotation.match(/[*hH>^]/g);
    const highOctaveValue = highOctaveReg ? highOctaveReg.length : 0;
    const flatReg = numberNotation.match(/[-fFbB]/g);
    const flatRegValue = flatReg ? flatReg.length : 0;
    const sharpReg = numberNotation.match(/[+sS#]/g);
    const sharpRegValue = sharpReg ? sharpReg.length : 0;
    const totalOctaveGap = highOctaveValue - lowOctaveValue;
    const intervalNum = Number(intervalNumReg[0]);
    const intervalNumWithinOctave = new IntervalRadix(intervalNum).intervalNumWithinOctave;
    const totalAlterValue = sharpRegValue - flatRegValue;
    let intervalPrefix;
    if ([1, 4, 5].indexOf(intervalNumWithinOctave) != -1) {
        intervalPrefix = intervalSlide_145("p", totalAlterValue);
    } else if ([2, 3, 6, 7].indexOf(intervalNumWithinOctave) != -1) {
        intervalPrefix = intervalSlide_2367("maj", totalAlterValue);
    }
    const intervalInstance = new Interval(intervalPrefix, intervalNum);
    if (totalOctaveGap === 0)
        return noteInstance.getNoteByInterval(intervalInstance, isAscending);
    const noteNeedOctaveShift = noteInstance.getNoteByInterval(intervalInstance, isAscending);
    return new Note(
        noteNeedOctaveShift.step,
        noteNeedOctaveShift.alter,
        noteNeedOctaveShift.octave + totalOctaveGap
    );
};
const cls_getTemp251 = (noteInstance, noteAs) => {
    if (![1, 2, 5].includes(noteAs))
        throw new NoteError("251 function must be a number of 2/5/1");
    if (noteAs === 1) {
        return [
            noteInstance.getNoteByIntervalString("2"),
            noteInstance.getNoteByIntervalString("5"),
            noteInstance
        ];
    }
    if (noteAs === 2) {
        return [
            noteInstance,
            noteInstance.getNoteByIntervalString("4"),
            noteInstance.getNoteByIntervalString("2", false)
        ];
    }
    if (noteAs === 5) {
        return [
            noteInstance.getNoteByIntervalString("4", false),
            noteInstance,
            noteInstance.getNoteByIntervalString("5", false)
        ];
    }
};
const cls_semitoneMove = (noteInstance, moveStep) => {
    if (moveStep === 0)
        return noteInstance;
    const originSemitoneRadix = new SemitoneRadix(noteInstance.pitchValue);
    const endSemitoneRadix = originSemitoneRadix.add(moveStep);
    const notesInfoList = endSemitoneRadix.getKeyboardNotes(1);
    const findZeroAlterNote = collect(notesInfoList).where("isNormal", true).where("alter", 0).first();
    if (!isUndefined(findZeroAlterNote)) {
        return new Note(findZeroAlterNote.step, findZeroAlterNote.alter, endSemitoneRadix.octave);
    }
    if (moveStep > 0) {
        const findSharpNote = collect(notesInfoList).where("isNormal", true).where("alter", ">", 0).first();
        return new Note(findSharpNote.step, findSharpNote.alter, endSemitoneRadix.octave);
    }
    const findFlatNote = collect(notesInfoList).where("isNormal", true).where("alter", "<", 0).first();
    return new Note(findFlatNote.step, findFlatNote.alter, endSemitoneRadix.octave);
};
var __defProp$2 = Object.defineProperty;
var __defNormalProp$2 = (obj, key, value) => key in obj ? __defProp$2(obj, key, {
    enumerable: true,
    configurable: true,
    writable: true,
    value
}) : obj[key] = value;
var __publicField$2 = (obj, key, value) => {
    __defNormalProp$2(obj, typeof key !== "symbol" ? key + "" : key, value);
    return value;
};

class Note {
    constructor(step = "C", alter = 0, octave = 4) {
        __publicField$2(this, "octave");
        __publicField$2(this, "step");
        __publicField$2(this, "alter");
        __publicField$2(this, "artName");
        __publicField$2(this, "mathName");
        __publicField$2(this, "fifthValue");
        __publicField$2(this, "isNormal");
        __publicField$2(this, "isBlack");
        __publicField$2(this, "locationId");
        __publicField$2(this, "semitoneWithinOctave");
        __publicField$2(this, "stepIndex");
        const noteObj = initNoteClass(step, alter);
        this.step = noteObj.step;
        this.alter = noteObj.alter;
        this.octave = octave;
        this.artName = noteObj.artName;
        this.mathName = noteObj.mathName;
        this.fifthValue = noteObj.fifthValue;
        this.isNormal = noteObj.isNormal;
        this.isBlack = noteObj.isBlack;
        this.locationId = noteObj.locationId;
        this.semitoneWithinOctave = noteObj.semitone;
        this.stepIndex = noteObj.stepIndex;
    }

    get pitchValue() {
        return this.octave * 12 + this.semitoneWithinOctave;
    }

    get simpleDescription() {
        return `${this.artName}${this.octave}`;
    }

    getNoteByInterval(intervalInstance, isAscending = true) {
        return cls_getNoteByInterval(this, intervalInstance, isAscending);
    }

    getNoteByIntervalString(numberNotationString, isAscending = true) {
        return cls_getNoteByNumberNotation(this, numberNotationString, isAscending);
    }

    getSamePitchNotes(isSelfIncluded = true, alterAbsLessThan = 1) {
        return cls_getSamePitchNotes(this, isSelfIncluded, alterAbsLessThan);
    }

    semitoneMove(moveStep) {
        return cls_semitoneMove(this, moveStep);
    }

    getHarmonicSeries() {
        return cls_getOvertoneSeries(this.step, this.alter, this.octave);
    }

    get251as(noteAs) {
        return cls_getTemp251(this, noteAs);
    }
}

const byDefault = (input, defaultValue) => {
    if (isNull(input) || isUndefined(input))
        return defaultValue;
    return input;
};
const dealOctave = (octave = 4) => {
    if (isNumber(octave))
        return octave;
    if (isArray(octave)) {
        const a = collect(octave).random();
        if (isNumber(a))
            return a;
        throw new Error("Octave inputs must be number type!");
    }
    return -1;
};
const getCasualRandomNote = (octave = 4) => {
    const noteObj = noteMeta.random();
    return new Note(noteObj.step, noteObj.alter, dealOctave(octave));
};
const getWhiteRandomNote = (octave = 4, isNormal = true) => {
    if (isNormal) {
        const noteObj2 = noteMeta.where("uid", "<=", 7).random();
        return new Note(noteObj2.step, noteObj2.alter, dealOctave(octave));
    }
    const noteObj = noteMeta.where("isBlack", false).random();
    return new Note(noteObj.step, noteObj.alter, dealOctave(octave));
};
const getBlackRandomNote = (octave = 4, isNormal = true) => {
    if (isNormal) {
        const noteObj2 = noteMeta.where("isBlack", true).where("isNormal", true).random();
        return new Note(noteObj2.step, noteObj2.alter, dealOctave(octave));
    }
    const noteObj = noteMeta.where("isBlack", true).random();
    return new Note(noteObj.step, noteObj.alter, dealOctave(octave));
};
const getNormalRandomNote = (octave = 4) => {
    const noteObj = noteMeta.where("isNormal", true).random();
    return new Note(noteObj.step, noteObj.alter, dealOctave(octave));
};
const getNoteByLocation = (location, octave) => {
    if (!range(12).includes(location))
        throw new Error("location must be in range of 0 - 11.");
    const defaultOctave = byDefault(octave, 4);
    return noteMeta.where("isNormal", true).where("locationId", location).all().map((x) => {
        return new Note(x.step, x.alter, defaultOctave);
    });
};
const note = {
    getBlackRandomNote,
    getWhiteRandomNote,
    getNormalRandomNote,
    getCasualRandomNote,
    getNoteByLocation,
    Note
};
const getIntervalByComparingNotes = (note1, note2) => {
    let semitoneGap = note2.pitchValue - note1.pitchValue;
    const note1StepRadix = StepRadix.fromArray([note1.octave, note1.step]);
    const note2StepRadix = StepRadix.fromArray([note2.octave, note2.step]);
    if (semitoneGap === 0) {
        const intervalGap = Math.abs(note1StepRadix.getGap(note2StepRadix)) + 1;
        const findIntervalObj2 = intervalMeta.where("semitoneGap", 0).where("num", intervalGap).first();
        if (findIntervalObj2)
            return new Interval(findIntervalObj2.type, findIntervalObj2.num);
        throw new IntervalError("Parallel but not fit interval.");
    }
    semitoneGap = Math.abs(semitoneGap);
    const semitoneGapArr = new SemitoneRadix(semitoneGap).twoDigitArray;
    const stepGapArr = new Base7Radix(Math.abs(note1StepRadix.getGap(note2StepRadix))).twoDigitArray;
    let semitoneWithinOctave = semitoneGapArr[1];
    if (stepGapArr[0] !== semitoneGapArr[0]) {
        semitoneWithinOctave = semitoneGapArr[1] + 12 * (semitoneGapArr[0] - stepGapArr[0]);
    }
    const findIntervalObj = intervalMeta.where("semitoneGap", semitoneWithinOctave).where("num", stepGapArr[1] + 1).first();
    if (findIntervalObj) {
        return new Interval(findIntervalObj.type, stepGapArr[0] * 7 + stepGapArr[1] + 1);
    }
    throw new IntervalError("Cannot find the interval.");
};
const interval = {
    getIntervalByComparingNotes,
    Interval: Interval
};
const ScaleMode = {
    NaturalMajor: "MAJ",
    NaturalMinor: "MIN",
    Ionian: "MAJ",
    Aeolian: "MIN",
    Dorian: "DOR",
    Phrygian: "PHR",
    Lydian: "LYD",
    Mixolydian: "MLY",
    Locrian: "LOC",
    HarmonicMinor: "HMIN",
    HarmonicMajor: "HMAJ",
    MelodicMinorAscending: "MMINASC",
    MelodicMajorDescending: "MMAJDESC"
};
const Major = {
    uid: ScaleMode.NaturalMajor,
    intervalList: [["maj", 2], ["maj", 3], ["p", 4], ["p", 5], ["maj", 6], ["maj", 7]],
    name: "\u81EA\u7136\u5927\u8C03",
    type: "major",
    description: "\u4E5F\u79F0\u4E3A\u81EA\u7136\u5927\u8C03\uFF0C\u81EA\u7136\u5927\u8C03\u7684 I \u7EA7\u97F3\u9636\uFF0C\u7531 C \u5927\u8C03\u7684 C \u8FDB\u884C\u5230\u9AD8\u516B\u5EA6\u7684 C\uFF0C\u6784\u6210\u97F3\u5206\u522B\u4E3A\uFF1A1 2 3 4 5 6 7 1"
};
const HarmonicMajor = {
    uid: ScaleMode.HarmonicMajor,
    intervalList: [["maj", 2], ["maj", 3], ["p", 4], ["p", 5], ["min", 6], ["maj", 7]],
    name: "\u548C\u58F0\u5927\u8C03",
    type: "major",
    description: "\u628A\u81EA\u7136\u5927\u8C03\u7684\u7B2C\u516D\u7EA7\u97F3\u964D\u4F4E\u4E00\u4E2A\u534A\u97F3\uFF0C\u6784\u6210\u97F3\u5206\u522B\u4E3A\uFF1A1 2 3 4 5 b6 7 1"
};
const MelodicMajor = {
    uid: ScaleMode.MelodicMajorDescending,
    intervalList: [["maj", 2], ["maj", 3], ["p", 4], ["p", 5], ["min", 6], ["min", 7]],
    name: "\u65CB\u5F8B\u5927\u8C03\uFF08\u4E0B\u884C\uFF09",
    type: "major",
    description: "\u628A\u81EA\u7136\u5927\u8C03\u7684\u7B2C\u516D\u3001\u4E03\u7EA7\u97F3\u964D\u4F4E\u4E00\u4E2A\u534A\u97F3\uFF0C\u6784\u6210\u97F3\u5206\u522B\u4E3A\uFF1A1 2 3 4 5 b6 b7 1"
};
const Minor = {
    uid: ScaleMode.NaturalMinor,
    intervalList: [["maj", 2], ["min", 3], ["p", 4], ["p", 5], ["min", 6], ["min", 7]],
    name: "\u81EA\u7136\u5C0F\u8C03",
    type: "minor",
    description: "\u81EA\u7136\u5C0F\u8C03\uFF0C\u81EA\u7136\u5927\u8C03\u7684 VI \u7EA7\u97F3\u9636\uFF0C\u7531 C \u5927\u8C03\u7684 A \u8FDB\u884C\u5230\u9AD8\u516B\u5EA6\u7684 A\uFF0C\u6784\u6210\u97F3\u5206\u522B\u4E3A\uFF1A1 2 b3 4 5 b6 b7 1"
};
const HarmonicMinor = {
    uid: ScaleMode.HarmonicMinor,
    intervalList: [["maj", 2], ["min", 3], ["p", 4], ["p", 5], ["min", 6], ["maj", 7]],
    name: "\u548C\u58F0\u5C0F\u8C03",
    type: "minor",
    description: "\u628A\u81EA\u7136\u5927\u8C03\u7684\u7B2C\u4E03\u7EA7\u97F3\u5347\u9AD8\u4E00\u4E2A\u534A\u97F3\uFF0C\u6784\u6210\u97F3\u5206\u522B\u4E3A\uFF1A1 2 b3 4 5 b6 7 1"
};
const MelodicMinor = {
    uid: ScaleMode.MelodicMinorAscending,
    intervalList: [["maj", 2], ["min", 3], ["p", 4], ["p", 5], ["maj", 6], ["maj", 7]],
    name: "\u65CB\u5F8B\u5C0F\u8C03\uFF08\u4E0A\u884C\uFF09",
    type: "minor",
    description: "\u628A\u81EA\u7136\u5927\u8C03\u7684\u7B2C\u4E03\u7EA7\u97F3\u5347\u9AD8\u4E00\u4E2A\u534A\u97F3\uFF0C\u6784\u6210\u97F3\u5206\u522B\u4E3A\uFF1A1 2 b3 4 5 6 7 1"
};
const Dorian = {
    uid: ScaleMode.Dorian,
    intervalList: [["maj", 2], ["min", 3], ["p", 4], ["p", 5], ["maj", 6], ["min", 7]],
    name: "Dorian",
    type: "minor",
    description: "\u81EA\u7136\u5927\u8C03\u7684 II \u7EA7\u97F3\u9636\uFF0C\u7531 C \u5927\u8C03\u7684 D \u8FDB\u884C\u5230\u9AD8\u516B\u5EA6\u7684 D\uFF0C\u6784\u6210\u97F3\u5206\u522B\u4E3A\uFF1A1 2 b3 4 5 6 b7 1"
};
const Phrygian = {
    uid: ScaleMode.Phrygian,
    intervalList: [["min", 2], ["min", 3], ["p", 4], ["p", 5], ["min", 6], ["min", 7]],
    name: "Phrygian",
    type: "minor",
    description: "\u81EA\u7136\u5927\u8C03\u7684 III \u7EA7\u97F3\u9636\uFF0C\u7531 C \u5927\u8C03\u7684 E \u8FDB\u884C\u5230\u9AD8\u516B\u5EA6\u7684 E\uFF0C\u6784\u6210\u97F3\u5206\u522B\u4E3A\uFF1A1 b2 b3 4 5 b6 b7 1"
};
const Lydian = {
    uid: ScaleMode.Lydian,
    intervalList: [["maj", 2], ["maj", 3], ["aug", 4], ["p", 5], ["maj", 6], ["maj", 7]],
    name: "Lydian",
    type: "major",
    description: "\u81EA\u7136\u5927\u8C03\u7684 IV \u7EA7\u97F3\u9636\uFF0C\u7531 C \u5927\u8C03\u7684 F \u8FDB\u884C\u5230\u9AD8\u516B\u5EA6\u7684 F\uFF0C\u6784\u6210\u97F3\u5206\u522B\u4E3A\uFF1A1 2 3 #4 5 6 7 1"
};
const MixoLydian = {
    uid: ScaleMode.Mixolydian,
    intervalList: [["maj", 2], ["maj", 3], ["p", 4], ["p", 5], ["maj", 6], ["min", 7]],
    name: "Mixolydian",
    type: "major",
    description: "\u81EA\u7136\u5927\u8C03\u7684 GuideDot \u7EA7\u97F3\u9636\uFF0C\u7531 C \u5927\u8C03\u7684 G \u8FDB\u884C\u5230\u9AD8\u516B\u5EA6\u7684 G\uFF0C\u6784\u6210\u97F3\u5206\u522B\u4E3A\uFF1A1 2 3 4 5 6 b7 1"
};
const Locrian = {
    uid: ScaleMode.Locrian,
    intervalList: [["min", 2], ["min", 3], ["p", 4], ["dim", 5], ["min", 6], ["min", 7]],
    name: "Locrian\u534A\u51CF\u4E03\u8C03",
    type: "halfdim7",
    description: "\u81EA\u7136\u5927\u8C03\u7684 VII \u7EA7\u97F3\u9636\uFF0C\u7531 C \u5927\u8C03\u7684 B \u8FDB\u884C\u5230\u9AD8\u516B\u5EA6\u7684 B\uFF0C\u6784\u6210\u97F3\u5206\u522B\u4E3A\uFF1A1 b2 b3 4 b5 b6 b7 1"
};
const modeMeta = [
    Major,
    Minor,
    HarmonicMajor,
    MelodicMajor,
    MelodicMinor,
    HarmonicMinor,
    Dorian,
    Lydian,
    MixoLydian,
    Locrian,
    Phrygian
];
const cls_initScale = (rootNote, scaleMode = "MAJ") => {
    let modeName = scaleMode.trim().toUpperCase();
    if (modeName === "AEO")
        modeName = "MIN";
    else if (modeName === "ION")
        modeName = "MAJ";
    const findModeObj = collect(modeMeta).where("uid", modeName).first();
    if (!findModeObj) {
        throw new ScaleError("Cannot find the scale mode, please check.");
    }
    const type = findModeObj.type;
    const intervalPanel = {};
    const notesList = [rootNote];
    try {
        findModeObj.intervalList.forEach((x) => {
            intervalPanel[x[1]] = x[0];
            const intervalInstance = new Interval(x[0], x[1]);
            const targetNote = rootNote.getNoteByInterval(intervalInstance);
            notesList.push(targetNote);
        });
    } catch {
        throw new ScaleError("Maybe the root note is not fit for the scale.");
    }
    let staveAlters = 0;
    let staveAlterTimes = 0;
    notesList.forEach((x) => {
        if (x.alter > 0) {
            staveAlterTimes += 1;
            staveAlters += x.alter;
        } else if (x.alter < 0) {
            staveAlterTimes -= 1;
            staveAlters += x.alter;
        }
    });
    return {
        intervalPanel,
        notesList,
        includedAlters: staveAlters,
        staveAlterTimes,
        type,
        intervalList: findModeObj.intervalList,
        modeName: findModeObj.name,
        modeUID: findModeObj.uid,
        description: findModeObj.description,
        chord3OfDegreesList: findModeObj.chord3OfDegreesList,
        chord7OfDegreesList: findModeObj.chord7OfDegreesList
    };
};
const cls_getNotesList$1 = (rootNote, intervalList) => {
    const resultList = [rootNote];
    intervalList.forEach((x) => {
        const targetInterval = new Interval(x[0], x[1]);
        resultList.push(rootNote.getNoteByInterval(targetInterval));
    });
    return resultList;
};
const cls_getNotesPanel = (rootNote, intervalList) => {
    const result = {1: rootNote};
    try {
        intervalList.forEach((intervalItem) => {
            const intervalInstance = new Interval(intervalItem[0], intervalItem[1]);
            result[intervalItem[1]] = rootNote.getNoteByInterval(intervalInstance);
        });
    } catch {
        throw new ScaleError("Maybe the root note is not fit for the scale.");
    }
    return result;
};
const cls_getNoteByIntervalNum = (notesList, num, isWithinOctave = false) => {
    const intervalNumList = new IntervalRadix(num).twoDigitArray;
    if (intervalNumList[0] === 0 || isWithinOctave)
        return notesList[intervalNumList[1] - 1];
    const targetNote = notesList[intervalNumList[1]];
    const newOctave = intervalNumList[0] + targetNote.octave;
    return new Note(targetNote.step, targetNote.alter, newOctave);
};
const cls_getIntervalList$1 = (intervalPanel) => {
    const result = [];
    for (const i of keys(intervalPanel)) {
        result.push([intervalPanel[i], Number(i)]);
    }
    return result;
};
const cls_getAlterList = (itvList) => {
    if (itvList.length !== 6)
        throw new ScaleError("Interval List must be the length of 6.");
    const result = Array.from({length: 7}, () => 0);
    itvList.map((x, y) => {
        if ([4, 5].includes(x[1])) {
            if (x[0] === "p")
                return;
            else if (x[0] === "dim")
                result[y + 1] = -1;
            else if (x[0] === "dim-")
                result[y + 1] = -2;
            else if (x[0] === "aug")
                result[y + 1] = 1;
            else if (x[0] === "aug+")
                result[y + 1] = 2;
            else
                throw new ScaleError("Unknown value type");
            return;
        }
        if (x[0] === "maj")
            return;
        else if (x[0] === "min")
            result[y + 1] = -1;
        else if (x[0] === "dim")
            result[y + 1] = -2;
        else if (x[0] === "aug")
            result[y + 1] = 1;
        else if (x[0] === "aug+")
            result[y + 1] = 2;
        else
            throw new ScaleError("Unknown value type");
    });
    return result;
};
const cls_getDegreeNote = (notesList, degree) => {
    const index = new ScaleRadix(degree).scaleDegree - 1;
    return notesList[index];
};
const findChordMeta = [{
    "rootNoteLocation": 0,
    "chordKey": "maj3",
    "cnName": "\u5927\u4E09",
    "type": "chord3",
    "orderedNotesLocationList": [0, 4, 7],
    "notesLocationList": [0, 4, 7],
    "n3L": 4,
    "n5L": 7,
    "n7L": -1,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 0,
    "chordKey": "min3",
    "cnName": "\u5C0F\u4E09",
    "type": "chord3",
    "orderedNotesLocationList": [0, 3, 7],
    "notesLocationList": [0, 3, 7],
    "n3L": 3,
    "n5L": 7,
    "n7L": -1,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 0,
    "chordKey": "dim3",
    "cnName": "\u51CF\u4E09",
    "type": "chord3",
    "orderedNotesLocationList": [0, 3, 6],
    "notesLocationList": [0, 3, 6],
    "n3L": 3,
    "n5L": 6,
    "n7L": -1,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 0,
    "chordKey": "aug3",
    "cnName": "\u589E\u4E09",
    "type": "chord3",
    "orderedNotesLocationList": [0, 4, 8],
    "notesLocationList": [0, 4, 8],
    "n3L": 4,
    "n5L": 8,
    "n7L": -1,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 0,
    "chordKey": "maj3b5",
    "cnName": "\u5927\u4E09\u51CF\u4E94",
    "type": "chord3",
    "orderedNotesLocationList": [0, 4, 6],
    "notesLocationList": [0, 4, 6],
    "n3L": 4,
    "n5L": 6,
    "n7L": -1,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 0,
    "chordKey": "maj3add6",
    "cnName": "\u5927\u516D\uFF08\u5927\u4E09\u52A0\u5341\u4E09\u97F3\uFF09",
    "type": "add",
    "orderedNotesLocationList": [0, 4, 7, 9],
    "notesLocationList": [0, 4, 7, 9],
    "n3L": 4,
    "n5L": 7,
    "n7L": -1,
    "n9L": -1,
    "n11L": -1,
    "n13L": 9
}, {
    "rootNoteLocation": 0,
    "chordKey": "min3add6",
    "cnName": "\u5C0F\u516D\uFF08\u5C0F\u4E09\u52A0\u5341\u4E09\u97F3\uFF09",
    "type": "add",
    "orderedNotesLocationList": [0, 3, 7, 8],
    "notesLocationList": [0, 3, 7, 8],
    "n3L": 3,
    "n5L": 7,
    "n7L": -1,
    "n9L": -1,
    "n11L": -1,
    "n13L": 8
}, {
    "rootNoteLocation": 0,
    "chordKey": "maj3add6add9",
    "cnName": "\u516D\u4E5D",
    "type": "add",
    "orderedNotesLocationList": [0, 2, 4, 7, 9],
    "notesLocationList": [0, 4, 7, 9, 2],
    "n3L": 4,
    "n5L": 7,
    "n7L": -1,
    "n9L": 2,
    "n11L": -1,
    "n13L": 9
}, {
    "rootNoteLocation": 0,
    "chordKey": "min3add6add9",
    "cnName": "\u5C0F\u516D\u4E5D",
    "type": "add",
    "orderedNotesLocationList": [0, 2, 3, 7, 9],
    "notesLocationList": [0, 3, 7, 9, 2],
    "n3L": 3,
    "n5L": 7,
    "n7L": -1,
    "n9L": 2,
    "n11L": -1,
    "n13L": 9
}, {
    "rootNoteLocation": 0,
    "chordKey": "maj3add9",
    "cnName": "\u5927\u4E09\u52A0\u4E5D\u97F3\uFF08\u4E8C\u97F3\uFF09",
    "type": "add",
    "orderedNotesLocationList": [0, 2, 4, 7],
    "notesLocationList": [0, 4, 7, 2],
    "n3L": 4,
    "n5L": 7,
    "n7L": -1,
    "n9L": 2,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 0,
    "chordKey": "maj3add11",
    "cnName": "\u5927\u4E09\u52A0\u5341\u4E00\u97F3\uFF08\u56DB\u97F3\uFF09",
    "type": "add",
    "orderedNotesLocationList": [0, 4, 5, 7],
    "notesLocationList": [0, 4, 7, 5],
    "n3L": 4,
    "n5L": 7,
    "n7L": -1,
    "n9L": -1,
    "n11L": 5,
    "n13L": -1
}, {
    "rootNoteLocation": 0,
    "chordKey": "min3add9",
    "cnName": "\u5C0F\u4E09\u52A0\u4E5D\u97F3\uFF08\u4E8C\u97F3\uFF09",
    "type": "add",
    "orderedNotesLocationList": [0, 2, 3, 7],
    "notesLocationList": [0, 3, 7, 2],
    "n3L": 3,
    "n5L": 7,
    "n7L": -1,
    "n9L": 2,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 0,
    "chordKey": "min3add11",
    "cnName": "\u5C0F\u4E09\u52A0\u5341\u4E00\u97F3\uFF08\u56DB\u97F3\uFF09",
    "type": "add",
    "orderedNotesLocationList": [0, 3, 5, 7],
    "notesLocationList": [0, 3, 7, 5],
    "n3L": 3,
    "n5L": 7,
    "n7L": -1,
    "n9L": -1,
    "n11L": 5,
    "n13L": -1
}, {
    "rootNoteLocation": 0,
    "chordKey": "maj7add11",
    "cnName": "\u5927\u4E03\u52A0\u5341\u4E00\u97F3\uFF08\u56DB\u97F3\uFF09",
    "type": "add",
    "orderedNotesLocationList": [0, 4, 5, 7, 11],
    "notesLocationList": [0, 4, 7, 11, 5],
    "n3L": 4,
    "n5L": 7,
    "n7L": 11,
    "n9L": -1,
    "n11L": 5,
    "n13L": -1
}, {
    "rootNoteLocation": 0,
    "chordKey": "dom7add6",
    "cnName": "\u5C5E\u4E03\u52A0\u516D\u97F3",
    "type": "add",
    "orderedNotesLocationList": [0, 4, 7, 9, 10],
    "notesLocationList": [0, 4, 7, 9, 10],
    "n3L": 4,
    "n5L": 7,
    "n7L": 10,
    "n9L": -1,
    "n11L": -1,
    "n13L": 9
}, {
    "rootNoteLocation": 0,
    "chordKey": "itaug6",
    "cnName": "\u610F\u5927\u5229\u589E\u516D",
    "type": "aug6",
    "orderedNotesLocationList": [0, 6, 8],
    "notesLocationList": [0, 6, 8],
    "n3L": -1,
    "n5L": -1,
    "n7L": -1,
    "n9L": -1,
    "n11L": 6,
    "n13L": 8
}, {
    "rootNoteLocation": 0,
    "chordKey": "fraug6",
    "cnName": "\u6CD5\u56FD\u589E\u516D",
    "type": "aug6",
    "orderedNotesLocationList": [0, 2, 6, 8],
    "notesLocationList": [0, 2, 6, 8],
    "n3L": -1,
    "n5L": -1,
    "n7L": -1,
    "n9L": 2,
    "n11L": 6,
    "n13L": 8
}, {
    "rootNoteLocation": 0,
    "chordKey": "graug6",
    "cnName": "\u5FB7\u56FD\u589E\u516D",
    "type": "aug6",
    "orderedNotesLocationList": [0, 3, 6, 8],
    "notesLocationList": [0, 3, 6, 8],
    "n3L": 3,
    "n5L": -1,
    "n7L": -1,
    "n9L": -1,
    "n11L": 6,
    "n13L": 8
}, {
    "rootNoteLocation": 0,
    "chordKey": "maj7",
    "cnName": "\u5927\u4E03",
    "type": "chord7",
    "orderedNotesLocationList": [0, 4, 7, 11],
    "notesLocationList": [0, 4, 7, 11],
    "n3L": 4,
    "n5L": 7,
    "n7L": 11,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 0,
    "chordKey": "dom7",
    "cnName": "\u5C5E\u4E03",
    "type": "chord7",
    "orderedNotesLocationList": [0, 4, 7, 10],
    "notesLocationList": [0, 4, 7, 10],
    "n3L": 4,
    "n5L": 7,
    "n7L": 10,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 0,
    "chordKey": "min7",
    "cnName": "\u5C0F\u4E03",
    "type": "chord7",
    "orderedNotesLocationList": [0, 3, 7, 10],
    "notesLocationList": [0, 3, 7, 10],
    "n3L": 3,
    "n5L": 7,
    "n7L": 10,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 0,
    "chordKey": "halfdim7",
    "cnName": "\u534A\u51CF\u4E03",
    "type": "chord7",
    "orderedNotesLocationList": [0, 3, 6, 10],
    "notesLocationList": [0, 3, 6, 10],
    "n3L": 3,
    "n5L": 6,
    "n7L": 10,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 0,
    "chordKey": "dim7",
    "cnName": "\u51CF\u4E03",
    "type": "chord7",
    "orderedNotesLocationList": [0, 3, 6, 9],
    "notesLocationList": [0, 3, 6, 9],
    "n3L": 3,
    "n5L": 6,
    "n7L": 9,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 0,
    "chordKey": "minmaj7",
    "cnName": "\u5C0F\u5927\u4E03",
    "type": "chord7",
    "orderedNotesLocationList": [0, 3, 7, 11],
    "notesLocationList": [0, 3, 7, 11],
    "n3L": 3,
    "n5L": 7,
    "n7L": 11,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 0,
    "chordKey": "dom7#5",
    "cnName": "\u589E\u4E03\uFF08\u5C5E\u4E03\u5347\u4E94\uFF09",
    "type": "chord7",
    "orderedNotesLocationList": [0, 4, 8, 10],
    "notesLocationList": [0, 4, 8, 10],
    "n3L": 4,
    "n5L": 8,
    "n7L": 10,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 0,
    "chordKey": "augmaj7",
    "cnName": "\u589E\u5927\u4E03",
    "type": "chord7",
    "orderedNotesLocationList": [0, 4, 8, 11],
    "notesLocationList": [0, 4, 8, 11],
    "n3L": 4,
    "n5L": 8,
    "n7L": 11,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 0,
    "chordKey": "dom7b5",
    "cnName": "\u5C5E\u4E03\u964D\u4E94",
    "type": "chord7alt",
    "orderedNotesLocationList": [0, 4, 6, 10],
    "notesLocationList": [0, 4, 6, 10],
    "n3L": 4,
    "n5L": 6,
    "n7L": 10,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 0,
    "chordKey": "dom7b9",
    "cnName": "\u5C5E\u4E03\u964D\u4E5D",
    "type": "chord7alt",
    "orderedNotesLocationList": [0, 1, 4, 7, 10],
    "notesLocationList": [0, 4, 7, 10, 1],
    "n3L": 4,
    "n5L": 7,
    "n7L": 10,
    "n9L": 1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 0,
    "chordKey": "dom7#9",
    "cnName": "\u5C5E\u4E03\u5347\u4E5D",
    "type": "chord7alt",
    "orderedNotesLocationList": [0, 3, 4, 7, 10],
    "notesLocationList": [0, 4, 7, 10, 3],
    "n3L": 4,
    "n5L": 7,
    "n7L": 10,
    "n9L": 3,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 0,
    "chordKey": "dom7#11",
    "cnName": "\u5C5E\u4E03\u5347\u5341\u4E00",
    "type": "chord7alt",
    "orderedNotesLocationList": [0, 4, 6, 7, 10],
    "notesLocationList": [0, 4, 7, 10, 6],
    "n3L": 4,
    "n5L": 7,
    "n7L": 10,
    "n9L": -1,
    "n11L": 6,
    "n13L": -1
}, {
    "rootNoteLocation": 0,
    "chordKey": "dom7b13",
    "cnName": "\u5C5E\u4E03\u964D\u5341\u4E09",
    "type": "chord7alt",
    "orderedNotesLocationList": [0, 4, 7, 8, 10],
    "notesLocationList": [0, 4, 7, 10, 8],
    "n3L": 4,
    "n5L": 7,
    "n7L": 10,
    "n9L": -1,
    "n11L": -1,
    "n13L": 8
}, {
    "rootNoteLocation": 0,
    "chordKey": "dom7b5b9",
    "cnName": "\u5C5E\u4E03\u964D\u4E94\u964D\u4E5D",
    "type": "chord7alt",
    "orderedNotesLocationList": [0, 1, 4, 6, 10],
    "notesLocationList": [0, 4, 6, 10, 1],
    "n3L": 4,
    "n5L": 6,
    "n7L": 10,
    "n9L": 1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 0,
    "chordKey": "dom7b5#9",
    "cnName": "\u5C5E\u4E03\u964D\u4E94\u5347\u4E5D",
    "type": "chord7alt",
    "orderedNotesLocationList": [0, 3, 4, 6, 10],
    "notesLocationList": [0, 4, 6, 10, 3],
    "n3L": 4,
    "n5L": 6,
    "n7L": 10,
    "n9L": 3,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 0,
    "chordKey": "maj7b5",
    "cnName": "\u5927\u4E03\u964D\u4E94",
    "type": "chord7alt",
    "orderedNotesLocationList": [0, 4, 6, 11],
    "notesLocationList": [0, 4, 6, 11],
    "n3L": 4,
    "n5L": 6,
    "n7L": 11,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 0,
    "chordKey": "maj7#5",
    "cnName": "\u5927\u4E03\u589E\u4E94",
    "type": "chord7alt",
    "orderedNotesLocationList": [0, 4, 8, 11],
    "notesLocationList": [0, 4, 8, 11],
    "n3L": 4,
    "n5L": 8,
    "n7L": 11,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 0,
    "chordKey": "maj7b9",
    "cnName": "\u5927\u4E03\u964D\u4E5D",
    "type": "chord7alt",
    "orderedNotesLocationList": [0, 1, 4, 7, 11],
    "notesLocationList": [0, 4, 7, 11, 1],
    "n3L": 4,
    "n5L": 7,
    "n7L": 11,
    "n9L": 1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 0,
    "chordKey": "maj7b13",
    "cnName": "\u5927\u4E03\u964D\u5341\u4E09",
    "type": "chord7alt",
    "orderedNotesLocationList": [0, 4, 7, 8, 11],
    "notesLocationList": [0, 4, 7, 11, 8],
    "n3L": 4,
    "n5L": 7,
    "n7L": 11,
    "n9L": -1,
    "n11L": -1,
    "n13L": 8
}, {
    "rootNoteLocation": 0,
    "chordKey": "maj7#11",
    "cnName": "\u5927\u4E03\u5347\u5341\u4E00",
    "type": "chord7alt",
    "orderedNotesLocationList": [0, 4, 6, 7, 11],
    "notesLocationList": [0, 4, 7, 11, 6],
    "n3L": 4,
    "n5L": 7,
    "n7L": 11,
    "n9L": -1,
    "n11L": 6,
    "n13L": -1
}, {
    "rootNoteLocation": 0,
    "chordKey": "min7#5",
    "cnName": "\u5C0F\u4E03\u5347\u4E94",
    "type": "chord7alt",
    "orderedNotesLocationList": [0, 3, 8, 10],
    "notesLocationList": [0, 3, 8, 10],
    "n3L": 3,
    "n5L": 8,
    "n7L": 10,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 0,
    "chordKey": "minmaj7b5",
    "cnName": "\u5C0F\u5927\u4E03\u964D\u4E94",
    "type": "chord7alt",
    "orderedNotesLocationList": [0, 3, 6, 11],
    "notesLocationList": [0, 3, 6, 11],
    "n3L": 3,
    "n5L": 6,
    "n7L": 11,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 0,
    "chordKey": "minmaj7#5",
    "cnName": "\u5C0F\u5927\u4E03\u5347\u4E94",
    "type": "chord7alt",
    "orderedNotesLocationList": [0, 3, 8, 11],
    "notesLocationList": [0, 3, 8, 11],
    "n3L": 3,
    "n5L": 8,
    "n7L": 11,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 0,
    "chordKey": "dom7#5b9",
    "cnName": "\u589E\u4E03\u964D\u4E5D\uFF08\u5C5E\u4E03\u5347\u4E94\u964D\u4E5D\uFF09",
    "type": "chord7alt",
    "orderedNotesLocationList": [0, 1, 4, 8, 10],
    "notesLocationList": [0, 4, 8, 10, 1],
    "n3L": 4,
    "n5L": 8,
    "n7L": 10,
    "n9L": 1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 0,
    "chordKey": "dom7#5#9",
    "cnName": "\u589E\u4E03\u5347\u4E5D\uFF08\u5C5E\u4E03\u5347\u4E94\u5347\u4E5D\uFF09",
    "type": "chord7alt",
    "orderedNotesLocationList": [0, 3, 4, 8, 10],
    "notesLocationList": [0, 4, 8, 10, 3],
    "n3L": 4,
    "n5L": 8,
    "n7L": 10,
    "n9L": 3,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 0,
    "chordKey": "sus2",
    "cnName": "\u6302\u4E8C",
    "type": "sus",
    "orderedNotesLocationList": [0, 2, 7],
    "notesLocationList": [0, 2, 7],
    "n3L": -1,
    "n5L": 7,
    "n7L": -1,
    "n9L": 2,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 0,
    "chordKey": "sus4",
    "cnName": "\u6302\u56DB",
    "type": "sus",
    "orderedNotesLocationList": [0, 5, 7],
    "notesLocationList": [0, 5, 7],
    "n3L": -1,
    "n5L": 7,
    "n7L": -1,
    "n9L": -1,
    "n11L": 5,
    "n13L": -1
}, {
    "rootNoteLocation": 0,
    "chordKey": "dom7sus2",
    "cnName": "\u5C5E\u4E03\u6302\u4E8C",
    "type": "sus",
    "orderedNotesLocationList": [0, 2, 7, 10],
    "notesLocationList": [0, 2, 7, 10],
    "n3L": -1,
    "n5L": 7,
    "n7L": 10,
    "n9L": 2,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 0,
    "chordKey": "dom7sus4",
    "cnName": "\u5C5E\u4E03\u6302\u56DB",
    "type": "sus",
    "orderedNotesLocationList": [0, 5, 7, 10],
    "notesLocationList": [0, 5, 7, 10],
    "n3L": -1,
    "n5L": 7,
    "n7L": 10,
    "n9L": -1,
    "n11L": 5,
    "n13L": -1
}, {
    "rootNoteLocation": 0,
    "chordKey": "maj7sus2",
    "cnName": "\u5927\u4E03\u6302\u4E8C",
    "type": "sus",
    "orderedNotesLocationList": [0, 2, 7, 11],
    "notesLocationList": [0, 2, 7, 11],
    "n3L": -1,
    "n5L": 7,
    "n7L": 11,
    "n9L": 2,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 0,
    "chordKey": "maj7sus4",
    "cnName": "\u5927\u4E03\u6302\u56DB",
    "type": "sus",
    "orderedNotesLocationList": [0, 5, 7, 11],
    "notesLocationList": [0, 5, 7, 11],
    "n3L": -1,
    "n5L": 7,
    "n7L": 11,
    "n9L": -1,
    "n11L": 5,
    "n13L": -1
}, {
    "rootNoteLocation": 0,
    "chordKey": "dom9sus4",
    "cnName": "\u5C5E\u4E5D\u6302\u56DB",
    "type": "sus",
    "orderedNotesLocationList": [0, 2, 5, 7, 10],
    "notesLocationList": [0, 5, 7, 10, 2],
    "n3L": -1,
    "n5L": 7,
    "n7L": 10,
    "n9L": 2,
    "n11L": 5,
    "n13L": -1
}, {
    "rootNoteLocation": 0,
    "chordKey": "maj9sus4",
    "cnName": "\u5927\u4E5D\u6302\u56DB",
    "type": "sus",
    "orderedNotesLocationList": [0, 2, 5, 7, 11],
    "notesLocationList": [0, 5, 7, 11, 2],
    "n3L": -1,
    "n5L": 7,
    "n7L": 11,
    "n9L": 2,
    "n11L": 5,
    "n13L": -1
}, {
    "rootNoteLocation": 0,
    "chordKey": "dom13sus4",
    "cnName": "\u5C5E\u5341\u4E09\u6302\u56DB",
    "type": "sus",
    "orderedNotesLocationList": [0, 2, 5, 7, 9, 10],
    "notesLocationList": [0, 5, 7, 10, 2, 9],
    "n3L": -1,
    "n5L": 7,
    "n7L": 10,
    "n9L": 2,
    "n11L": 5,
    "n13L": 9
}, {
    "rootNoteLocation": 0,
    "chordKey": "maj13sus4",
    "cnName": "\u5927\u5341\u4E09\u6302\u56DB",
    "type": "sus",
    "orderedNotesLocationList": [0, 2, 5, 7, 9, 11],
    "notesLocationList": [0, 5, 7, 11, 2, 9],
    "n3L": -1,
    "n5L": 7,
    "n7L": 11,
    "n9L": 2,
    "n11L": 5,
    "n13L": 9
}, {
    "rootNoteLocation": 0,
    "chordKey": "maj13sus2",
    "cnName": "\u5927\u5341\u4E09\u6302\u4E8C",
    "type": "sus",
    "orderedNotesLocationList": [0, 2, 7, 9, 11],
    "notesLocationList": [0, 2, 7, 11, 9],
    "n3L": -1,
    "n5L": 7,
    "n7L": 11,
    "n9L": 2,
    "n11L": -1,
    "n13L": 9
}, {
    "rootNoteLocation": 0,
    "chordKey": "maj9",
    "cnName": "\u5927\u4E5D",
    "type": "chord9",
    "orderedNotesLocationList": [0, 2, 4, 7, 11],
    "notesLocationList": [0, 4, 7, 11, 2],
    "n3L": 4,
    "n5L": 7,
    "n7L": 11,
    "n9L": 2,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 0,
    "chordKey": "dom9",
    "cnName": "\u5C5E\u4E5D",
    "type": "chord9",
    "orderedNotesLocationList": [0, 2, 4, 7, 10],
    "notesLocationList": [0, 4, 7, 10, 2],
    "n3L": 4,
    "n5L": 7,
    "n7L": 10,
    "n9L": 2,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 0,
    "chordKey": "min9",
    "cnName": "\u5C0F\u4E5D",
    "type": "chord9",
    "orderedNotesLocationList": [0, 2, 3, 7, 10],
    "notesLocationList": [0, 3, 7, 10, 2],
    "n3L": 3,
    "n5L": 7,
    "n7L": 10,
    "n9L": 2,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 0,
    "chordKey": "minmaj9",
    "cnName": "\u5C0F\u5927\u4E5D",
    "type": "chord9",
    "orderedNotesLocationList": [0, 2, 3, 7, 11],
    "notesLocationList": [0, 3, 7, 11, 2],
    "n3L": 3,
    "n5L": 7,
    "n7L": 11,
    "n9L": 2,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 0,
    "chordKey": "dom9#5",
    "cnName": "\u589E\u4E5D\uFF08\u5C5E\u4E5D\u5347\u4E94\uFF09",
    "type": "chord9",
    "orderedNotesLocationList": [0, 2, 4, 8, 10],
    "notesLocationList": [0, 4, 8, 10, 2],
    "n3L": 4,
    "n5L": 8,
    "n7L": 10,
    "n9L": 2,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 0,
    "chordKey": "dom9b9",
    "cnName": "\u5C5E\u4E5D\u964D\u4E5D",
    "type": "chord9",
    "orderedNotesLocationList": [0, 1, 4, 7, 10],
    "notesLocationList": [0, 4, 7, 10, 1],
    "n3L": 4,
    "n5L": 7,
    "n7L": 10,
    "n9L": 1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 0,
    "chordKey": "dom9b11",
    "cnName": "\u5C5E\u4E5D\u964D\u5341\u4E00",
    "type": "chord9",
    "orderedNotesLocationList": [0, 2, 4, 4, 7, 10],
    "notesLocationList": [0, 4, 7, 10, 2, 4],
    "n3L": 4,
    "n5L": 7,
    "n7L": 10,
    "n9L": 2,
    "n11L": 4,
    "n13L": -1
}, {
    "rootNoteLocation": 0,
    "chordKey": "dom9#11",
    "cnName": "\u5C5E\u4E5D\u5347\u5341\u4E00",
    "type": "chord9",
    "orderedNotesLocationList": [0, 2, 4, 6, 7, 10],
    "notesLocationList": [0, 4, 7, 10, 2, 6],
    "n3L": 4,
    "n5L": 7,
    "n7L": 10,
    "n9L": 2,
    "n11L": 6,
    "n13L": -1
}, {
    "rootNoteLocation": 0,
    "chordKey": "dom9b13",
    "cnName": "\u5C5E\u4E5D\u964D\u5341\u4E09",
    "type": "chord9",
    "orderedNotesLocationList": [0, 2, 4, 7, 8, 10],
    "notesLocationList": [0, 4, 7, 10, 2, 8],
    "n3L": 4,
    "n5L": 7,
    "n7L": 10,
    "n9L": 2,
    "n11L": -1,
    "n13L": 8
}, {
    "rootNoteLocation": 0,
    "chordKey": "maj9b5",
    "cnName": "\u5927\u4E5D\u964D\u4E94",
    "type": "chord9",
    "orderedNotesLocationList": [0, 2, 4, 6, 11],
    "notesLocationList": [0, 4, 6, 11, 2],
    "n3L": 4,
    "n5L": 6,
    "n7L": 11,
    "n9L": 2,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 0,
    "chordKey": "maj9#5",
    "cnName": "\u5927\u4E5D\u5347\u4E94",
    "type": "chord9",
    "orderedNotesLocationList": [0, 2, 4, 8, 11],
    "notesLocationList": [0, 4, 8, 11, 2],
    "n3L": 4,
    "n5L": 8,
    "n7L": 11,
    "n9L": 2,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 0,
    "chordKey": "maj9#11",
    "cnName": "\u5927\u4E5D\u5347\u5341\u4E00",
    "type": "chord9",
    "orderedNotesLocationList": [0, 2, 4, 6, 7, 11],
    "notesLocationList": [0, 4, 7, 11, 2, 6],
    "n3L": 4,
    "n5L": 7,
    "n7L": 11,
    "n9L": 2,
    "n11L": 6,
    "n13L": -1
}, {
    "rootNoteLocation": 0,
    "chordKey": "maj9b13",
    "cnName": "\u5927\u4E5D\u964D\u5341\u4E09",
    "type": "chord9",
    "orderedNotesLocationList": [0, 2, 4, 6, 8, 11],
    "notesLocationList": [0, 4, 6, 11, 2, 8],
    "n3L": 4,
    "n5L": 6,
    "n7L": 11,
    "n9L": 2,
    "n11L": -1,
    "n13L": 8
}, {
    "rootNoteLocation": 0,
    "chordKey": "min9b5",
    "cnName": "\u5C0F\u4E5D\u964D\u4E94",
    "type": "chord9",
    "orderedNotesLocationList": [0, 2, 3, 6, 10],
    "notesLocationList": [0, 3, 6, 10, 2],
    "n3L": 3,
    "n5L": 6,
    "n7L": 10,
    "n9L": 2,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 0,
    "chordKey": "min9b9",
    "cnName": "\u5C0F\u4E5D\u964D\u4E5D",
    "type": "chord9",
    "orderedNotesLocationList": [0, 1, 3, 7, 10],
    "notesLocationList": [0, 3, 7, 10, 1],
    "n3L": 3,
    "n5L": 7,
    "n7L": 10,
    "n9L": 1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 0,
    "chordKey": "maj11",
    "cnName": "\u5927\u5341\u4E00",
    "type": "chord11",
    "orderedNotesLocationList": [0, 2, 4, 5, 7, 11],
    "notesLocationList": [0, 4, 7, 11, 2, 5],
    "n3L": 4,
    "n5L": 7,
    "n7L": 11,
    "n9L": 2,
    "n11L": 5,
    "n13L": -1
}, {
    "rootNoteLocation": 0,
    "chordKey": "dom11",
    "cnName": "\u5C5E\u5341\u4E00",
    "type": "chord11",
    "orderedNotesLocationList": [0, 2, 4, 5, 7, 10],
    "notesLocationList": [0, 4, 7, 10, 2, 5],
    "n3L": 4,
    "n5L": 7,
    "n7L": 10,
    "n9L": 2,
    "n11L": 5,
    "n13L": -1
}, {
    "rootNoteLocation": 0,
    "chordKey": "min11",
    "cnName": "\u5C0F\u5341\u4E00",
    "type": "chord11",
    "orderedNotesLocationList": [0, 2, 3, 5, 7, 10],
    "notesLocationList": [0, 3, 7, 10, 2, 5],
    "n3L": 3,
    "n5L": 7,
    "n7L": 10,
    "n9L": 2,
    "n11L": 5,
    "n13L": -1
}, {
    "rootNoteLocation": 0,
    "chordKey": "minmaj11",
    "cnName": "\u5C0F\u5927\u5341\u4E00",
    "type": "chord11",
    "orderedNotesLocationList": [0, 2, 3, 5, 7, 11],
    "notesLocationList": [0, 3, 7, 11, 2, 5],
    "n3L": 3,
    "n5L": 7,
    "n7L": 11,
    "n9L": 2,
    "n11L": 5,
    "n13L": -1
}, {
    "rootNoteLocation": 0,
    "chordKey": "dom11b5",
    "cnName": "\u5C5E\u5341\u4E00\u964D\u4E94",
    "type": "chord11",
    "orderedNotesLocationList": [0, 2, 4, 5, 6, 10],
    "notesLocationList": [0, 4, 6, 10, 2, 5],
    "n3L": 4,
    "n5L": 6,
    "n7L": 10,
    "n9L": 2,
    "n11L": 5,
    "n13L": -1
}, {
    "rootNoteLocation": 0,
    "chordKey": "dom11#5",
    "cnName": "\u5C5E\u5341\u4E00\u5347\u4E94",
    "type": "chord11",
    "orderedNotesLocationList": [0, 2, 4, 5, 8, 10],
    "notesLocationList": [0, 4, 8, 10, 2, 5],
    "n3L": 4,
    "n5L": 8,
    "n7L": 10,
    "n9L": 2,
    "n11L": 5,
    "n13L": -1
}, {
    "rootNoteLocation": 0,
    "chordKey": "dom11b9",
    "cnName": "\u5C5E\u5341\u4E00\u964D\u4E5D",
    "type": "chord11",
    "orderedNotesLocationList": [0, 1, 4, 5, 7, 10],
    "notesLocationList": [0, 4, 7, 10, 1, 5],
    "n3L": 4,
    "n5L": 7,
    "n7L": 10,
    "n9L": 1,
    "n11L": 5,
    "n13L": -1
}, {
    "rootNoteLocation": 0,
    "chordKey": "dom11#9",
    "cnName": "\u5C5E\u5341\u4E00\u5347\u4E5D",
    "type": "chord11",
    "orderedNotesLocationList": [0, 3, 4, 5, 7, 10],
    "notesLocationList": [0, 4, 7, 10, 3, 5],
    "n3L": 4,
    "n5L": 7,
    "n7L": 10,
    "n9L": 3,
    "n11L": 5,
    "n13L": -1
}, {
    "rootNoteLocation": 0,
    "chordKey": "dom11b13",
    "cnName": "\u5C5E\u5341\u4E00\u964D\u5341\u4E09",
    "type": "chord11",
    "orderedNotesLocationList": [0, 2, 4, 5, 7, 8, 10],
    "notesLocationList": [0, 4, 7, 10, 2, 5, 8],
    "n3L": 4,
    "n5L": 7,
    "n7L": 10,
    "n9L": 2,
    "n11L": 5,
    "n13L": 8
}, {
    "rootNoteLocation": 0,
    "chordKey": "min11b5",
    "cnName": "\u5C0F\u5341\u4E00\u964D\u4E94",
    "type": "chord11",
    "orderedNotesLocationList": [0, 2, 3, 5, 6, 10],
    "notesLocationList": [0, 3, 6, 10, 2, 5],
    "n3L": 3,
    "n5L": 6,
    "n7L": 10,
    "n9L": 2,
    "n11L": 5,
    "n13L": -1
}, {
    "rootNoteLocation": 0,
    "chordKey": "maj13",
    "cnName": "\u5927\u5341\u4E09",
    "type": "chord13",
    "orderedNotesLocationList": [0, 2, 4, 5, 7, 9, 11],
    "notesLocationList": [0, 4, 7, 11, 2, 5, 9],
    "n3L": 4,
    "n5L": 7,
    "n7L": 11,
    "n9L": 2,
    "n11L": 5,
    "n13L": 9
}, {
    "rootNoteLocation": 0,
    "chordKey": "dom13",
    "cnName": "\u5C5E\u5341\u4E09",
    "type": "chord13",
    "orderedNotesLocationList": [0, 2, 4, 5, 7, 9, 10],
    "notesLocationList": [0, 4, 7, 10, 2, 5, 9],
    "n3L": 4,
    "n5L": 7,
    "n7L": 10,
    "n9L": 2,
    "n11L": 5,
    "n13L": 9
}, {
    "rootNoteLocation": 0,
    "chordKey": "min13",
    "cnName": "\u5C0F\u5341\u4E09",
    "type": "chord13",
    "orderedNotesLocationList": [0, 2, 3, 5, 7, 9, 10],
    "notesLocationList": [0, 3, 7, 10, 2, 5, 9],
    "n3L": 3,
    "n5L": 7,
    "n7L": 10,
    "n9L": 2,
    "n11L": 5,
    "n13L": 9
}, {
    "rootNoteLocation": 0,
    "chordKey": "minmaj13",
    "cnName": "\u5C0F\u5927\u5341\u4E09",
    "type": "chord13",
    "orderedNotesLocationList": [0, 2, 3, 5, 7, 9, 11],
    "notesLocationList": [0, 3, 7, 11, 2, 5, 9],
    "n3L": 3,
    "n5L": 7,
    "n7L": 11,
    "n9L": 2,
    "n11L": 5,
    "n13L": 9
}, {
    "rootNoteLocation": 0,
    "chordKey": "dom13b5",
    "cnName": "\u5C5E\u5341\u4E09\u964D\u4E94",
    "type": "chord13",
    "orderedNotesLocationList": [0, 2, 4, 5, 6, 9, 10],
    "notesLocationList": [0, 4, 6, 10, 2, 5, 9],
    "n3L": 4,
    "n5L": 6,
    "n7L": 10,
    "n9L": 2,
    "n11L": 5,
    "n13L": 9
}, {
    "rootNoteLocation": 0,
    "chordKey": "dom13#5",
    "cnName": "\u5C5E\u5341\u4E09\u5347\u4E94",
    "type": "chord13",
    "orderedNotesLocationList": [0, 2, 4, 5, 8, 9, 10],
    "notesLocationList": [0, 4, 8, 10, 2, 5, 9],
    "n3L": 4,
    "n5L": 8,
    "n7L": 10,
    "n9L": 2,
    "n11L": 5,
    "n13L": 9
}, {
    "rootNoteLocation": 0,
    "chordKey": "dom13b9",
    "cnName": "\u5C5E\u5341\u4E09\u964D\u4E5D",
    "type": "chord13",
    "orderedNotesLocationList": [0, 1, 4, 5, 7, 9, 10],
    "notesLocationList": [0, 4, 7, 10, 1, 5, 9],
    "n3L": 4,
    "n5L": 7,
    "n7L": 10,
    "n9L": 1,
    "n11L": 5,
    "n13L": 9
}, {
    "rootNoteLocation": 0,
    "chordKey": "dom13#9",
    "cnName": "\u5C5E\u5341\u4E09\u5347\u4E5D",
    "type": "chord13",
    "orderedNotesLocationList": [0, 3, 4, 7, 9, 10],
    "notesLocationList": [0, 4, 7, 10, 3, 9],
    "n3L": 4,
    "n5L": 7,
    "n7L": 10,
    "n9L": 3,
    "n11L": -1,
    "n13L": 9
}, {
    "rootNoteLocation": 0,
    "chordKey": "dom13#11",
    "cnName": "\u5C5E\u5341\u4E09\u5347\u5341\u4E00",
    "type": "chord13",
    "orderedNotesLocationList": [0, 2, 4, 6, 7, 9, 10],
    "notesLocationList": [0, 4, 7, 10, 2, 6, 9],
    "n3L": 4,
    "n5L": 7,
    "n7L": 10,
    "n9L": 2,
    "n11L": 6,
    "n13L": 9
}, {
    "rootNoteLocation": 0,
    "chordKey": "maj13b5",
    "cnName": "\u5927\u5341\u4E09\u964D\u4E94",
    "type": "chord13",
    "orderedNotesLocationList": [0, 2, 4, 6, 9, 11],
    "notesLocationList": [0, 4, 6, 11, 2, 9],
    "n3L": 4,
    "n5L": 6,
    "n7L": 11,
    "n9L": 2,
    "n11L": -1,
    "n13L": 9
}, {
    "rootNoteLocation": 0,
    "chordKey": "maj13#5",
    "cnName": "\u5927\u5341\u4E09\u5347\u4E94",
    "type": "chord13",
    "orderedNotesLocationList": [0, 2, 4, 8, 9, 11],
    "notesLocationList": [0, 4, 8, 11, 2, 9],
    "n3L": 4,
    "n5L": 8,
    "n7L": 11,
    "n9L": 2,
    "n11L": -1,
    "n13L": 9
}, {
    "rootNoteLocation": 0,
    "chordKey": "maj13b9",
    "cnName": "\u5927\u5341\u4E09\u964D\u4E5D",
    "type": "chord13",
    "orderedNotesLocationList": [0, 1, 4, 7, 9, 11],
    "notesLocationList": [0, 4, 7, 11, 1, 9],
    "n3L": 4,
    "n5L": 7,
    "n7L": 11,
    "n9L": 1,
    "n11L": -1,
    "n13L": 9
}, {
    "rootNoteLocation": 0,
    "chordKey": "maj13#11",
    "cnName": "\u5927\u5341\u4E09\u5347\u5341\u4E00",
    "type": "chord13",
    "orderedNotesLocationList": [0, 2, 4, 6, 7, 9, 11],
    "notesLocationList": [0, 4, 7, 11, 2, 6, 9],
    "n3L": 4,
    "n5L": 7,
    "n7L": 11,
    "n9L": 2,
    "n11L": 6,
    "n13L": 9
}, {
    "rootNoteLocation": 1,
    "chordKey": "maj3",
    "cnName": "\u5927\u4E09",
    "type": "chord3",
    "orderedNotesLocationList": [1, 5, 8],
    "notesLocationList": [1, 5, 8],
    "n3L": 5,
    "n5L": 8,
    "n7L": -1,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 1,
    "chordKey": "min3",
    "cnName": "\u5C0F\u4E09",
    "type": "chord3",
    "orderedNotesLocationList": [1, 4, 8],
    "notesLocationList": [1, 4, 8],
    "n3L": 4,
    "n5L": 8,
    "n7L": -1,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 1,
    "chordKey": "dim3",
    "cnName": "\u51CF\u4E09",
    "type": "chord3",
    "orderedNotesLocationList": [1, 4, 7],
    "notesLocationList": [1, 4, 7],
    "n3L": 4,
    "n5L": 7,
    "n7L": -1,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 1,
    "chordKey": "aug3",
    "cnName": "\u589E\u4E09",
    "type": "chord3",
    "orderedNotesLocationList": [1, 5, 9],
    "notesLocationList": [1, 5, 9],
    "n3L": 5,
    "n5L": 9,
    "n7L": -1,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 1,
    "chordKey": "maj3b5",
    "cnName": "\u5927\u4E09\u51CF\u4E94",
    "type": "chord3",
    "orderedNotesLocationList": [1, 5, 7],
    "notesLocationList": [1, 5, 7],
    "n3L": 5,
    "n5L": 7,
    "n7L": -1,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 1,
    "chordKey": "maj3add6",
    "cnName": "\u5927\u516D\uFF08\u5927\u4E09\u52A0\u5341\u4E09\u97F3\uFF09",
    "type": "add",
    "orderedNotesLocationList": [1, 5, 8, 10],
    "notesLocationList": [1, 5, 8, 10],
    "n3L": 5,
    "n5L": 8,
    "n7L": -1,
    "n9L": -1,
    "n11L": -1,
    "n13L": 10
}, {
    "rootNoteLocation": 1,
    "chordKey": "min3add6",
    "cnName": "\u5C0F\u516D\uFF08\u5C0F\u4E09\u52A0\u5341\u4E09\u97F3\uFF09",
    "type": "add",
    "orderedNotesLocationList": [1, 4, 8, 9],
    "notesLocationList": [1, 4, 8, 9],
    "n3L": 4,
    "n5L": 8,
    "n7L": -1,
    "n9L": -1,
    "n11L": -1,
    "n13L": 9
}, {
    "rootNoteLocation": 1,
    "chordKey": "maj3add6add9",
    "cnName": "\u516D\u4E5D",
    "type": "add",
    "orderedNotesLocationList": [1, 3, 5, 8, 10],
    "notesLocationList": [1, 5, 8, 10, 3],
    "n3L": 5,
    "n5L": 8,
    "n7L": -1,
    "n9L": 3,
    "n11L": -1,
    "n13L": 10
}, {
    "rootNoteLocation": 1,
    "chordKey": "min3add6add9",
    "cnName": "\u5C0F\u516D\u4E5D",
    "type": "add",
    "orderedNotesLocationList": [1, 3, 4, 8, 10],
    "notesLocationList": [1, 4, 8, 10, 3],
    "n3L": 4,
    "n5L": 8,
    "n7L": -1,
    "n9L": 3,
    "n11L": -1,
    "n13L": 10
}, {
    "rootNoteLocation": 1,
    "chordKey": "maj3add9",
    "cnName": "\u5927\u4E09\u52A0\u4E5D\u97F3\uFF08\u4E8C\u97F3\uFF09",
    "type": "add",
    "orderedNotesLocationList": [1, 3, 5, 8],
    "notesLocationList": [1, 5, 8, 3],
    "n3L": 5,
    "n5L": 8,
    "n7L": -1,
    "n9L": 3,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 1,
    "chordKey": "maj3add11",
    "cnName": "\u5927\u4E09\u52A0\u5341\u4E00\u97F3\uFF08\u56DB\u97F3\uFF09",
    "type": "add",
    "orderedNotesLocationList": [1, 5, 6, 8],
    "notesLocationList": [1, 5, 8, 6],
    "n3L": 5,
    "n5L": 8,
    "n7L": -1,
    "n9L": -1,
    "n11L": 6,
    "n13L": -1
}, {
    "rootNoteLocation": 1,
    "chordKey": "min3add9",
    "cnName": "\u5C0F\u4E09\u52A0\u4E5D\u97F3\uFF08\u4E8C\u97F3\uFF09",
    "type": "add",
    "orderedNotesLocationList": [1, 3, 4, 8],
    "notesLocationList": [1, 4, 8, 3],
    "n3L": 4,
    "n5L": 8,
    "n7L": -1,
    "n9L": 3,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 1,
    "chordKey": "min3add11",
    "cnName": "\u5C0F\u4E09\u52A0\u5341\u4E00\u97F3\uFF08\u56DB\u97F3\uFF09",
    "type": "add",
    "orderedNotesLocationList": [1, 4, 6, 8],
    "notesLocationList": [1, 4, 8, 6],
    "n3L": 4,
    "n5L": 8,
    "n7L": -1,
    "n9L": -1,
    "n11L": 6,
    "n13L": -1
}, {
    "rootNoteLocation": 1,
    "chordKey": "maj7add11",
    "cnName": "\u5927\u4E03\u52A0\u5341\u4E00\u97F3\uFF08\u56DB\u97F3\uFF09",
    "type": "add",
    "orderedNotesLocationList": [0, 1, 5, 6, 8],
    "notesLocationList": [1, 5, 8, 0, 6],
    "n3L": 5,
    "n5L": 8,
    "n7L": 0,
    "n9L": -1,
    "n11L": 6,
    "n13L": -1
}, {
    "rootNoteLocation": 1,
    "chordKey": "dom7add6",
    "cnName": "\u5C5E\u4E03\u52A0\u516D\u97F3",
    "type": "add",
    "orderedNotesLocationList": [1, 5, 8, 10, 11],
    "notesLocationList": [1, 5, 8, 10, 11],
    "n3L": 5,
    "n5L": 8,
    "n7L": 11,
    "n9L": -1,
    "n11L": -1,
    "n13L": 10
}, {
    "rootNoteLocation": 1,
    "chordKey": "itaug6",
    "cnName": "\u610F\u5927\u5229\u589E\u516D",
    "type": "aug6",
    "orderedNotesLocationList": [1, 7, 9],
    "notesLocationList": [1, 7, 9],
    "n3L": -1,
    "n5L": -1,
    "n7L": -1,
    "n9L": -1,
    "n11L": 7,
    "n13L": 9
}, {
    "rootNoteLocation": 1,
    "chordKey": "fraug6",
    "cnName": "\u6CD5\u56FD\u589E\u516D",
    "type": "aug6",
    "orderedNotesLocationList": [1, 3, 7, 9],
    "notesLocationList": [1, 3, 7, 9],
    "n3L": -1,
    "n5L": -1,
    "n7L": -1,
    "n9L": 3,
    "n11L": 7,
    "n13L": 9
}, {
    "rootNoteLocation": 1,
    "chordKey": "graug6",
    "cnName": "\u5FB7\u56FD\u589E\u516D",
    "type": "aug6",
    "orderedNotesLocationList": [1, 4, 7, 9],
    "notesLocationList": [1, 4, 7, 9],
    "n3L": 4,
    "n5L": -1,
    "n7L": -1,
    "n9L": -1,
    "n11L": 7,
    "n13L": 9
}, {
    "rootNoteLocation": 1,
    "chordKey": "maj7",
    "cnName": "\u5927\u4E03",
    "type": "chord7",
    "orderedNotesLocationList": [0, 1, 5, 8],
    "notesLocationList": [1, 5, 8, 0],
    "n3L": 5,
    "n5L": 8,
    "n7L": 0,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 1,
    "chordKey": "dom7",
    "cnName": "\u5C5E\u4E03",
    "type": "chord7",
    "orderedNotesLocationList": [1, 5, 8, 11],
    "notesLocationList": [1, 5, 8, 11],
    "n3L": 5,
    "n5L": 8,
    "n7L": 11,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 1,
    "chordKey": "min7",
    "cnName": "\u5C0F\u4E03",
    "type": "chord7",
    "orderedNotesLocationList": [1, 4, 8, 11],
    "notesLocationList": [1, 4, 8, 11],
    "n3L": 4,
    "n5L": 8,
    "n7L": 11,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 1,
    "chordKey": "halfdim7",
    "cnName": "\u534A\u51CF\u4E03",
    "type": "chord7",
    "orderedNotesLocationList": [1, 4, 7, 11],
    "notesLocationList": [1, 4, 7, 11],
    "n3L": 4,
    "n5L": 7,
    "n7L": 11,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 1,
    "chordKey": "dim7",
    "cnName": "\u51CF\u4E03",
    "type": "chord7",
    "orderedNotesLocationList": [1, 4, 7, 10],
    "notesLocationList": [1, 4, 7, 10],
    "n3L": 4,
    "n5L": 7,
    "n7L": 10,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 1,
    "chordKey": "minmaj7",
    "cnName": "\u5C0F\u5927\u4E03",
    "type": "chord7",
    "orderedNotesLocationList": [0, 1, 4, 8],
    "notesLocationList": [1, 4, 8, 0],
    "n3L": 4,
    "n5L": 8,
    "n7L": 0,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 1,
    "chordKey": "dom7#5",
    "cnName": "\u589E\u4E03\uFF08\u5C5E\u4E03\u5347\u4E94\uFF09",
    "type": "chord7",
    "orderedNotesLocationList": [1, 5, 9, 11],
    "notesLocationList": [1, 5, 9, 11],
    "n3L": 5,
    "n5L": 9,
    "n7L": 11,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 1,
    "chordKey": "augmaj7",
    "cnName": "\u589E\u5927\u4E03",
    "type": "chord7",
    "orderedNotesLocationList": [0, 1, 5, 9],
    "notesLocationList": [1, 5, 9, 0],
    "n3L": 5,
    "n5L": 9,
    "n7L": 0,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 1,
    "chordKey": "dom7b5",
    "cnName": "\u5C5E\u4E03\u964D\u4E94",
    "type": "chord7alt",
    "orderedNotesLocationList": [1, 5, 7, 11],
    "notesLocationList": [1, 5, 7, 11],
    "n3L": 5,
    "n5L": 7,
    "n7L": 11,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 1,
    "chordKey": "dom7b9",
    "cnName": "\u5C5E\u4E03\u964D\u4E5D",
    "type": "chord7alt",
    "orderedNotesLocationList": [1, 2, 5, 8, 11],
    "notesLocationList": [1, 5, 8, 11, 2],
    "n3L": 5,
    "n5L": 8,
    "n7L": 11,
    "n9L": 2,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 1,
    "chordKey": "dom7#9",
    "cnName": "\u5C5E\u4E03\u5347\u4E5D",
    "type": "chord7alt",
    "orderedNotesLocationList": [1, 4, 5, 8, 11],
    "notesLocationList": [1, 5, 8, 11, 4],
    "n3L": 5,
    "n5L": 8,
    "n7L": 11,
    "n9L": 4,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 1,
    "chordKey": "dom7#11",
    "cnName": "\u5C5E\u4E03\u5347\u5341\u4E00",
    "type": "chord7alt",
    "orderedNotesLocationList": [1, 5, 7, 8, 11],
    "notesLocationList": [1, 5, 8, 11, 7],
    "n3L": 5,
    "n5L": 8,
    "n7L": 11,
    "n9L": -1,
    "n11L": 7,
    "n13L": -1
}, {
    "rootNoteLocation": 1,
    "chordKey": "dom7b13",
    "cnName": "\u5C5E\u4E03\u964D\u5341\u4E09",
    "type": "chord7alt",
    "orderedNotesLocationList": [1, 5, 8, 9, 11],
    "notesLocationList": [1, 5, 8, 11, 9],
    "n3L": 5,
    "n5L": 8,
    "n7L": 11,
    "n9L": -1,
    "n11L": -1,
    "n13L": 9
}, {
    "rootNoteLocation": 1,
    "chordKey": "dom7b5b9",
    "cnName": "\u5C5E\u4E03\u964D\u4E94\u964D\u4E5D",
    "type": "chord7alt",
    "orderedNotesLocationList": [1, 2, 5, 7, 11],
    "notesLocationList": [1, 5, 7, 11, 2],
    "n3L": 5,
    "n5L": 7,
    "n7L": 11,
    "n9L": 2,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 1,
    "chordKey": "dom7b5#9",
    "cnName": "\u5C5E\u4E03\u964D\u4E94\u5347\u4E5D",
    "type": "chord7alt",
    "orderedNotesLocationList": [1, 4, 5, 7, 11],
    "notesLocationList": [1, 5, 7, 11, 4],
    "n3L": 5,
    "n5L": 7,
    "n7L": 11,
    "n9L": 4,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 1,
    "chordKey": "maj7b5",
    "cnName": "\u5927\u4E03\u964D\u4E94",
    "type": "chord7alt",
    "orderedNotesLocationList": [0, 1, 5, 7],
    "notesLocationList": [1, 5, 7, 0],
    "n3L": 5,
    "n5L": 7,
    "n7L": 0,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 1,
    "chordKey": "maj7#5",
    "cnName": "\u5927\u4E03\u589E\u4E94",
    "type": "chord7alt",
    "orderedNotesLocationList": [0, 1, 5, 9],
    "notesLocationList": [1, 5, 9, 0],
    "n3L": 5,
    "n5L": 9,
    "n7L": 0,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 1,
    "chordKey": "maj7b9",
    "cnName": "\u5927\u4E03\u964D\u4E5D",
    "type": "chord7alt",
    "orderedNotesLocationList": [0, 1, 2, 5, 8],
    "notesLocationList": [1, 5, 8, 0, 2],
    "n3L": 5,
    "n5L": 8,
    "n7L": 0,
    "n9L": 2,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 1,
    "chordKey": "maj7b13",
    "cnName": "\u5927\u4E03\u964D\u5341\u4E09",
    "type": "chord7alt",
    "orderedNotesLocationList": [0, 1, 5, 8, 9],
    "notesLocationList": [1, 5, 8, 0, 9],
    "n3L": 5,
    "n5L": 8,
    "n7L": 0,
    "n9L": -1,
    "n11L": -1,
    "n13L": 9
}, {
    "rootNoteLocation": 1,
    "chordKey": "maj7#11",
    "cnName": "\u5927\u4E03\u5347\u5341\u4E00",
    "type": "chord7alt",
    "orderedNotesLocationList": [0, 1, 5, 7, 8],
    "notesLocationList": [1, 5, 8, 0, 7],
    "n3L": 5,
    "n5L": 8,
    "n7L": 0,
    "n9L": -1,
    "n11L": 7,
    "n13L": -1
}, {
    "rootNoteLocation": 1,
    "chordKey": "min7#5",
    "cnName": "\u5C0F\u4E03\u5347\u4E94",
    "type": "chord7alt",
    "orderedNotesLocationList": [1, 4, 9, 11],
    "notesLocationList": [1, 4, 9, 11],
    "n3L": 4,
    "n5L": 9,
    "n7L": 11,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 1,
    "chordKey": "minmaj7b5",
    "cnName": "\u5C0F\u5927\u4E03\u964D\u4E94",
    "type": "chord7alt",
    "orderedNotesLocationList": [0, 1, 4, 7],
    "notesLocationList": [1, 4, 7, 0],
    "n3L": 4,
    "n5L": 7,
    "n7L": 0,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 1,
    "chordKey": "minmaj7#5",
    "cnName": "\u5C0F\u5927\u4E03\u5347\u4E94",
    "type": "chord7alt",
    "orderedNotesLocationList": [0, 1, 4, 9],
    "notesLocationList": [1, 4, 9, 0],
    "n3L": 4,
    "n5L": 9,
    "n7L": 0,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 1,
    "chordKey": "dom7#5b9",
    "cnName": "\u589E\u4E03\u964D\u4E5D\uFF08\u5C5E\u4E03\u5347\u4E94\u964D\u4E5D\uFF09",
    "type": "chord7alt",
    "orderedNotesLocationList": [1, 2, 5, 9, 11],
    "notesLocationList": [1, 5, 9, 11, 2],
    "n3L": 5,
    "n5L": 9,
    "n7L": 11,
    "n9L": 2,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 1,
    "chordKey": "dom7#5#9",
    "cnName": "\u589E\u4E03\u5347\u4E5D\uFF08\u5C5E\u4E03\u5347\u4E94\u5347\u4E5D\uFF09",
    "type": "chord7alt",
    "orderedNotesLocationList": [1, 4, 5, 9, 11],
    "notesLocationList": [1, 5, 9, 11, 4],
    "n3L": 5,
    "n5L": 9,
    "n7L": 11,
    "n9L": 4,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 1,
    "chordKey": "sus2",
    "cnName": "\u6302\u4E8C",
    "type": "sus",
    "orderedNotesLocationList": [1, 3, 8],
    "notesLocationList": [1, 3, 8],
    "n3L": -1,
    "n5L": 8,
    "n7L": -1,
    "n9L": 3,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 1,
    "chordKey": "sus4",
    "cnName": "\u6302\u56DB",
    "type": "sus",
    "orderedNotesLocationList": [1, 6, 8],
    "notesLocationList": [1, 6, 8],
    "n3L": -1,
    "n5L": 8,
    "n7L": -1,
    "n9L": -1,
    "n11L": 6,
    "n13L": -1
}, {
    "rootNoteLocation": 1,
    "chordKey": "dom7sus2",
    "cnName": "\u5C5E\u4E03\u6302\u4E8C",
    "type": "sus",
    "orderedNotesLocationList": [1, 3, 8, 11],
    "notesLocationList": [1, 3, 8, 11],
    "n3L": -1,
    "n5L": 8,
    "n7L": 11,
    "n9L": 3,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 1,
    "chordKey": "dom7sus4",
    "cnName": "\u5C5E\u4E03\u6302\u56DB",
    "type": "sus",
    "orderedNotesLocationList": [1, 6, 8, 11],
    "notesLocationList": [1, 6, 8, 11],
    "n3L": -1,
    "n5L": 8,
    "n7L": 11,
    "n9L": -1,
    "n11L": 6,
    "n13L": -1
}, {
    "rootNoteLocation": 1,
    "chordKey": "maj7sus2",
    "cnName": "\u5927\u4E03\u6302\u4E8C",
    "type": "sus",
    "orderedNotesLocationList": [0, 1, 3, 8],
    "notesLocationList": [1, 3, 8, 0],
    "n3L": -1,
    "n5L": 8,
    "n7L": 0,
    "n9L": 3,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 1,
    "chordKey": "maj7sus4",
    "cnName": "\u5927\u4E03\u6302\u56DB",
    "type": "sus",
    "orderedNotesLocationList": [0, 1, 6, 8],
    "notesLocationList": [1, 6, 8, 0],
    "n3L": -1,
    "n5L": 8,
    "n7L": 0,
    "n9L": -1,
    "n11L": 6,
    "n13L": -1
}, {
    "rootNoteLocation": 1,
    "chordKey": "dom9sus4",
    "cnName": "\u5C5E\u4E5D\u6302\u56DB",
    "type": "sus",
    "orderedNotesLocationList": [1, 3, 6, 8, 11],
    "notesLocationList": [1, 6, 8, 11, 3],
    "n3L": -1,
    "n5L": 8,
    "n7L": 11,
    "n9L": 3,
    "n11L": 6,
    "n13L": -1
}, {
    "rootNoteLocation": 1,
    "chordKey": "maj9sus4",
    "cnName": "\u5927\u4E5D\u6302\u56DB",
    "type": "sus",
    "orderedNotesLocationList": [0, 1, 3, 6, 8],
    "notesLocationList": [1, 6, 8, 0, 3],
    "n3L": -1,
    "n5L": 8,
    "n7L": 0,
    "n9L": 3,
    "n11L": 6,
    "n13L": -1
}, {
    "rootNoteLocation": 1,
    "chordKey": "dom13sus4",
    "cnName": "\u5C5E\u5341\u4E09\u6302\u56DB",
    "type": "sus",
    "orderedNotesLocationList": [1, 3, 6, 8, 10, 11],
    "notesLocationList": [1, 6, 8, 11, 3, 10],
    "n3L": -1,
    "n5L": 8,
    "n7L": 11,
    "n9L": 3,
    "n11L": 6,
    "n13L": 10
}, {
    "rootNoteLocation": 1,
    "chordKey": "maj13sus4",
    "cnName": "\u5927\u5341\u4E09\u6302\u56DB",
    "type": "sus",
    "orderedNotesLocationList": [0, 1, 3, 6, 8, 10],
    "notesLocationList": [1, 6, 8, 0, 3, 10],
    "n3L": -1,
    "n5L": 8,
    "n7L": 0,
    "n9L": 3,
    "n11L": 6,
    "n13L": 10
}, {
    "rootNoteLocation": 1,
    "chordKey": "maj13sus2",
    "cnName": "\u5927\u5341\u4E09\u6302\u4E8C",
    "type": "sus",
    "orderedNotesLocationList": [0, 1, 3, 8, 10],
    "notesLocationList": [1, 3, 8, 0, 10],
    "n3L": -1,
    "n5L": 8,
    "n7L": 0,
    "n9L": 3,
    "n11L": -1,
    "n13L": 10
}, {
    "rootNoteLocation": 1,
    "chordKey": "maj9",
    "cnName": "\u5927\u4E5D",
    "type": "chord9",
    "orderedNotesLocationList": [0, 1, 3, 5, 8],
    "notesLocationList": [1, 5, 8, 0, 3],
    "n3L": 5,
    "n5L": 8,
    "n7L": 0,
    "n9L": 3,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 1,
    "chordKey": "dom9",
    "cnName": "\u5C5E\u4E5D",
    "type": "chord9",
    "orderedNotesLocationList": [1, 3, 5, 8, 11],
    "notesLocationList": [1, 5, 8, 11, 3],
    "n3L": 5,
    "n5L": 8,
    "n7L": 11,
    "n9L": 3,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 1,
    "chordKey": "min9",
    "cnName": "\u5C0F\u4E5D",
    "type": "chord9",
    "orderedNotesLocationList": [1, 3, 4, 8, 11],
    "notesLocationList": [1, 4, 8, 11, 3],
    "n3L": 4,
    "n5L": 8,
    "n7L": 11,
    "n9L": 3,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 1,
    "chordKey": "minmaj9",
    "cnName": "\u5C0F\u5927\u4E5D",
    "type": "chord9",
    "orderedNotesLocationList": [0, 1, 3, 4, 8],
    "notesLocationList": [1, 4, 8, 0, 3],
    "n3L": 4,
    "n5L": 8,
    "n7L": 0,
    "n9L": 3,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 1,
    "chordKey": "dom9#5",
    "cnName": "\u589E\u4E5D\uFF08\u5C5E\u4E5D\u5347\u4E94\uFF09",
    "type": "chord9",
    "orderedNotesLocationList": [1, 3, 5, 9, 11],
    "notesLocationList": [1, 5, 9, 11, 3],
    "n3L": 5,
    "n5L": 9,
    "n7L": 11,
    "n9L": 3,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 1,
    "chordKey": "dom9b9",
    "cnName": "\u5C5E\u4E5D\u964D\u4E5D",
    "type": "chord9",
    "orderedNotesLocationList": [1, 2, 5, 8, 11],
    "notesLocationList": [1, 5, 8, 11, 2],
    "n3L": 5,
    "n5L": 8,
    "n7L": 11,
    "n9L": 2,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 1,
    "chordKey": "dom9b11",
    "cnName": "\u5C5E\u4E5D\u964D\u5341\u4E00",
    "type": "chord9",
    "orderedNotesLocationList": [1, 3, 5, 5, 8, 11],
    "notesLocationList": [1, 5, 8, 11, 3, 5],
    "n3L": 5,
    "n5L": 8,
    "n7L": 11,
    "n9L": 3,
    "n11L": 5,
    "n13L": -1
}, {
    "rootNoteLocation": 1,
    "chordKey": "dom9#11",
    "cnName": "\u5C5E\u4E5D\u5347\u5341\u4E00",
    "type": "chord9",
    "orderedNotesLocationList": [1, 3, 5, 7, 8, 11],
    "notesLocationList": [1, 5, 8, 11, 3, 7],
    "n3L": 5,
    "n5L": 8,
    "n7L": 11,
    "n9L": 3,
    "n11L": 7,
    "n13L": -1
}, {
    "rootNoteLocation": 1,
    "chordKey": "dom9b13",
    "cnName": "\u5C5E\u4E5D\u964D\u5341\u4E09",
    "type": "chord9",
    "orderedNotesLocationList": [1, 3, 5, 8, 9, 11],
    "notesLocationList": [1, 5, 8, 11, 3, 9],
    "n3L": 5,
    "n5L": 8,
    "n7L": 11,
    "n9L": 3,
    "n11L": -1,
    "n13L": 9
}, {
    "rootNoteLocation": 1,
    "chordKey": "maj9b5",
    "cnName": "\u5927\u4E5D\u964D\u4E94",
    "type": "chord9",
    "orderedNotesLocationList": [0, 1, 3, 5, 7],
    "notesLocationList": [1, 5, 7, 0, 3],
    "n3L": 5,
    "n5L": 7,
    "n7L": 0,
    "n9L": 3,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 1,
    "chordKey": "maj9#5",
    "cnName": "\u5927\u4E5D\u5347\u4E94",
    "type": "chord9",
    "orderedNotesLocationList": [0, 1, 3, 5, 9],
    "notesLocationList": [1, 5, 9, 0, 3],
    "n3L": 5,
    "n5L": 9,
    "n7L": 0,
    "n9L": 3,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 1,
    "chordKey": "maj9#11",
    "cnName": "\u5927\u4E5D\u5347\u5341\u4E00",
    "type": "chord9",
    "orderedNotesLocationList": [0, 1, 3, 5, 7, 8],
    "notesLocationList": [1, 5, 8, 0, 3, 7],
    "n3L": 5,
    "n5L": 8,
    "n7L": 0,
    "n9L": 3,
    "n11L": 7,
    "n13L": -1
}, {
    "rootNoteLocation": 1,
    "chordKey": "maj9b13",
    "cnName": "\u5927\u4E5D\u964D\u5341\u4E09",
    "type": "chord9",
    "orderedNotesLocationList": [0, 1, 3, 5, 7, 9],
    "notesLocationList": [1, 5, 7, 0, 3, 9],
    "n3L": 5,
    "n5L": 7,
    "n7L": 0,
    "n9L": 3,
    "n11L": -1,
    "n13L": 9
}, {
    "rootNoteLocation": 1,
    "chordKey": "min9b5",
    "cnName": "\u5C0F\u4E5D\u964D\u4E94",
    "type": "chord9",
    "orderedNotesLocationList": [1, 3, 4, 7, 11],
    "notesLocationList": [1, 4, 7, 11, 3],
    "n3L": 4,
    "n5L": 7,
    "n7L": 11,
    "n9L": 3,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 1,
    "chordKey": "min9b9",
    "cnName": "\u5C0F\u4E5D\u964D\u4E5D",
    "type": "chord9",
    "orderedNotesLocationList": [1, 2, 4, 8, 11],
    "notesLocationList": [1, 4, 8, 11, 2],
    "n3L": 4,
    "n5L": 8,
    "n7L": 11,
    "n9L": 2,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 1,
    "chordKey": "maj11",
    "cnName": "\u5927\u5341\u4E00",
    "type": "chord11",
    "orderedNotesLocationList": [0, 1, 3, 5, 6, 8],
    "notesLocationList": [1, 5, 8, 0, 3, 6],
    "n3L": 5,
    "n5L": 8,
    "n7L": 0,
    "n9L": 3,
    "n11L": 6,
    "n13L": -1
}, {
    "rootNoteLocation": 1,
    "chordKey": "dom11",
    "cnName": "\u5C5E\u5341\u4E00",
    "type": "chord11",
    "orderedNotesLocationList": [1, 3, 5, 6, 8, 11],
    "notesLocationList": [1, 5, 8, 11, 3, 6],
    "n3L": 5,
    "n5L": 8,
    "n7L": 11,
    "n9L": 3,
    "n11L": 6,
    "n13L": -1
}, {
    "rootNoteLocation": 1,
    "chordKey": "min11",
    "cnName": "\u5C0F\u5341\u4E00",
    "type": "chord11",
    "orderedNotesLocationList": [1, 3, 4, 6, 8, 11],
    "notesLocationList": [1, 4, 8, 11, 3, 6],
    "n3L": 4,
    "n5L": 8,
    "n7L": 11,
    "n9L": 3,
    "n11L": 6,
    "n13L": -1
}, {
    "rootNoteLocation": 1,
    "chordKey": "minmaj11",
    "cnName": "\u5C0F\u5927\u5341\u4E00",
    "type": "chord11",
    "orderedNotesLocationList": [0, 1, 3, 4, 6, 8],
    "notesLocationList": [1, 4, 8, 0, 3, 6],
    "n3L": 4,
    "n5L": 8,
    "n7L": 0,
    "n9L": 3,
    "n11L": 6,
    "n13L": -1
}, {
    "rootNoteLocation": 1,
    "chordKey": "dom11b5",
    "cnName": "\u5C5E\u5341\u4E00\u964D\u4E94",
    "type": "chord11",
    "orderedNotesLocationList": [1, 3, 5, 6, 7, 11],
    "notesLocationList": [1, 5, 7, 11, 3, 6],
    "n3L": 5,
    "n5L": 7,
    "n7L": 11,
    "n9L": 3,
    "n11L": 6,
    "n13L": -1
}, {
    "rootNoteLocation": 1,
    "chordKey": "dom11#5",
    "cnName": "\u5C5E\u5341\u4E00\u5347\u4E94",
    "type": "chord11",
    "orderedNotesLocationList": [1, 3, 5, 6, 9, 11],
    "notesLocationList": [1, 5, 9, 11, 3, 6],
    "n3L": 5,
    "n5L": 9,
    "n7L": 11,
    "n9L": 3,
    "n11L": 6,
    "n13L": -1
}, {
    "rootNoteLocation": 1,
    "chordKey": "dom11b9",
    "cnName": "\u5C5E\u5341\u4E00\u964D\u4E5D",
    "type": "chord11",
    "orderedNotesLocationList": [1, 2, 5, 6, 8, 11],
    "notesLocationList": [1, 5, 8, 11, 2, 6],
    "n3L": 5,
    "n5L": 8,
    "n7L": 11,
    "n9L": 2,
    "n11L": 6,
    "n13L": -1
}, {
    "rootNoteLocation": 1,
    "chordKey": "dom11#9",
    "cnName": "\u5C5E\u5341\u4E00\u5347\u4E5D",
    "type": "chord11",
    "orderedNotesLocationList": [1, 4, 5, 6, 8, 11],
    "notesLocationList": [1, 5, 8, 11, 4, 6],
    "n3L": 5,
    "n5L": 8,
    "n7L": 11,
    "n9L": 4,
    "n11L": 6,
    "n13L": -1
}, {
    "rootNoteLocation": 1,
    "chordKey": "dom11b13",
    "cnName": "\u5C5E\u5341\u4E00\u964D\u5341\u4E09",
    "type": "chord11",
    "orderedNotesLocationList": [1, 3, 5, 6, 8, 9, 11],
    "notesLocationList": [1, 5, 8, 11, 3, 6, 9],
    "n3L": 5,
    "n5L": 8,
    "n7L": 11,
    "n9L": 3,
    "n11L": 6,
    "n13L": 9
}, {
    "rootNoteLocation": 1,
    "chordKey": "min11b5",
    "cnName": "\u5C0F\u5341\u4E00\u964D\u4E94",
    "type": "chord11",
    "orderedNotesLocationList": [1, 3, 4, 6, 7, 11],
    "notesLocationList": [1, 4, 7, 11, 3, 6],
    "n3L": 4,
    "n5L": 7,
    "n7L": 11,
    "n9L": 3,
    "n11L": 6,
    "n13L": -1
}, {
    "rootNoteLocation": 1,
    "chordKey": "maj13",
    "cnName": "\u5927\u5341\u4E09",
    "type": "chord13",
    "orderedNotesLocationList": [0, 1, 3, 5, 6, 8, 10],
    "notesLocationList": [1, 5, 8, 0, 3, 6, 10],
    "n3L": 5,
    "n5L": 8,
    "n7L": 0,
    "n9L": 3,
    "n11L": 6,
    "n13L": 10
}, {
    "rootNoteLocation": 1,
    "chordKey": "dom13",
    "cnName": "\u5C5E\u5341\u4E09",
    "type": "chord13",
    "orderedNotesLocationList": [1, 3, 5, 6, 8, 10, 11],
    "notesLocationList": [1, 5, 8, 11, 3, 6, 10],
    "n3L": 5,
    "n5L": 8,
    "n7L": 11,
    "n9L": 3,
    "n11L": 6,
    "n13L": 10
}, {
    "rootNoteLocation": 1,
    "chordKey": "min13",
    "cnName": "\u5C0F\u5341\u4E09",
    "type": "chord13",
    "orderedNotesLocationList": [1, 3, 4, 6, 8, 10, 11],
    "notesLocationList": [1, 4, 8, 11, 3, 6, 10],
    "n3L": 4,
    "n5L": 8,
    "n7L": 11,
    "n9L": 3,
    "n11L": 6,
    "n13L": 10
}, {
    "rootNoteLocation": 1,
    "chordKey": "minmaj13",
    "cnName": "\u5C0F\u5927\u5341\u4E09",
    "type": "chord13",
    "orderedNotesLocationList": [0, 1, 3, 4, 6, 8, 10],
    "notesLocationList": [1, 4, 8, 0, 3, 6, 10],
    "n3L": 4,
    "n5L": 8,
    "n7L": 0,
    "n9L": 3,
    "n11L": 6,
    "n13L": 10
}, {
    "rootNoteLocation": 1,
    "chordKey": "dom13b5",
    "cnName": "\u5C5E\u5341\u4E09\u964D\u4E94",
    "type": "chord13",
    "orderedNotesLocationList": [1, 3, 5, 6, 7, 10, 11],
    "notesLocationList": [1, 5, 7, 11, 3, 6, 10],
    "n3L": 5,
    "n5L": 7,
    "n7L": 11,
    "n9L": 3,
    "n11L": 6,
    "n13L": 10
}, {
    "rootNoteLocation": 1,
    "chordKey": "dom13#5",
    "cnName": "\u5C5E\u5341\u4E09\u5347\u4E94",
    "type": "chord13",
    "orderedNotesLocationList": [1, 3, 5, 6, 9, 10, 11],
    "notesLocationList": [1, 5, 9, 11, 3, 6, 10],
    "n3L": 5,
    "n5L": 9,
    "n7L": 11,
    "n9L": 3,
    "n11L": 6,
    "n13L": 10
}, {
    "rootNoteLocation": 1,
    "chordKey": "dom13b9",
    "cnName": "\u5C5E\u5341\u4E09\u964D\u4E5D",
    "type": "chord13",
    "orderedNotesLocationList": [1, 2, 5, 6, 8, 10, 11],
    "notesLocationList": [1, 5, 8, 11, 2, 6, 10],
    "n3L": 5,
    "n5L": 8,
    "n7L": 11,
    "n9L": 2,
    "n11L": 6,
    "n13L": 10
}, {
    "rootNoteLocation": 1,
    "chordKey": "dom13#9",
    "cnName": "\u5C5E\u5341\u4E09\u5347\u4E5D",
    "type": "chord13",
    "orderedNotesLocationList": [1, 4, 5, 8, 10, 11],
    "notesLocationList": [1, 5, 8, 11, 4, 10],
    "n3L": 5,
    "n5L": 8,
    "n7L": 11,
    "n9L": 4,
    "n11L": -1,
    "n13L": 10
}, {
    "rootNoteLocation": 1,
    "chordKey": "dom13#11",
    "cnName": "\u5C5E\u5341\u4E09\u5347\u5341\u4E00",
    "type": "chord13",
    "orderedNotesLocationList": [1, 3, 5, 7, 8, 10, 11],
    "notesLocationList": [1, 5, 8, 11, 3, 7, 10],
    "n3L": 5,
    "n5L": 8,
    "n7L": 11,
    "n9L": 3,
    "n11L": 7,
    "n13L": 10
}, {
    "rootNoteLocation": 1,
    "chordKey": "maj13b5",
    "cnName": "\u5927\u5341\u4E09\u964D\u4E94",
    "type": "chord13",
    "orderedNotesLocationList": [0, 1, 3, 5, 7, 10],
    "notesLocationList": [1, 5, 7, 0, 3, 10],
    "n3L": 5,
    "n5L": 7,
    "n7L": 0,
    "n9L": 3,
    "n11L": -1,
    "n13L": 10
}, {
    "rootNoteLocation": 1,
    "chordKey": "maj13#5",
    "cnName": "\u5927\u5341\u4E09\u5347\u4E94",
    "type": "chord13",
    "orderedNotesLocationList": [0, 1, 3, 5, 9, 10],
    "notesLocationList": [1, 5, 9, 0, 3, 10],
    "n3L": 5,
    "n5L": 9,
    "n7L": 0,
    "n9L": 3,
    "n11L": -1,
    "n13L": 10
}, {
    "rootNoteLocation": 1,
    "chordKey": "maj13b9",
    "cnName": "\u5927\u5341\u4E09\u964D\u4E5D",
    "type": "chord13",
    "orderedNotesLocationList": [0, 1, 2, 5, 8, 10],
    "notesLocationList": [1, 5, 8, 0, 2, 10],
    "n3L": 5,
    "n5L": 8,
    "n7L": 0,
    "n9L": 2,
    "n11L": -1,
    "n13L": 10
}, {
    "rootNoteLocation": 1,
    "chordKey": "maj13#11",
    "cnName": "\u5927\u5341\u4E09\u5347\u5341\u4E00",
    "type": "chord13",
    "orderedNotesLocationList": [0, 1, 3, 5, 7, 8, 10],
    "notesLocationList": [1, 5, 8, 0, 3, 7, 10],
    "n3L": 5,
    "n5L": 8,
    "n7L": 0,
    "n9L": 3,
    "n11L": 7,
    "n13L": 10
}, {
    "rootNoteLocation": 2,
    "chordKey": "maj3",
    "cnName": "\u5927\u4E09",
    "type": "chord3",
    "orderedNotesLocationList": [2, 6, 9],
    "notesLocationList": [2, 6, 9],
    "n3L": 6,
    "n5L": 9,
    "n7L": -1,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 2,
    "chordKey": "min3",
    "cnName": "\u5C0F\u4E09",
    "type": "chord3",
    "orderedNotesLocationList": [2, 5, 9],
    "notesLocationList": [2, 5, 9],
    "n3L": 5,
    "n5L": 9,
    "n7L": -1,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 2,
    "chordKey": "dim3",
    "cnName": "\u51CF\u4E09",
    "type": "chord3",
    "orderedNotesLocationList": [2, 5, 8],
    "notesLocationList": [2, 5, 8],
    "n3L": 5,
    "n5L": 8,
    "n7L": -1,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 2,
    "chordKey": "aug3",
    "cnName": "\u589E\u4E09",
    "type": "chord3",
    "orderedNotesLocationList": [2, 6, 10],
    "notesLocationList": [2, 6, 10],
    "n3L": 6,
    "n5L": 10,
    "n7L": -1,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 2,
    "chordKey": "maj3b5",
    "cnName": "\u5927\u4E09\u51CF\u4E94",
    "type": "chord3",
    "orderedNotesLocationList": [2, 6, 8],
    "notesLocationList": [2, 6, 8],
    "n3L": 6,
    "n5L": 8,
    "n7L": -1,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 2,
    "chordKey": "maj3add6",
    "cnName": "\u5927\u516D\uFF08\u5927\u4E09\u52A0\u5341\u4E09\u97F3\uFF09",
    "type": "add",
    "orderedNotesLocationList": [2, 6, 9, 11],
    "notesLocationList": [2, 6, 9, 11],
    "n3L": 6,
    "n5L": 9,
    "n7L": -1,
    "n9L": -1,
    "n11L": -1,
    "n13L": 11
}, {
    "rootNoteLocation": 2,
    "chordKey": "min3add6",
    "cnName": "\u5C0F\u516D\uFF08\u5C0F\u4E09\u52A0\u5341\u4E09\u97F3\uFF09",
    "type": "add",
    "orderedNotesLocationList": [2, 5, 9, 10],
    "notesLocationList": [2, 5, 9, 10],
    "n3L": 5,
    "n5L": 9,
    "n7L": -1,
    "n9L": -1,
    "n11L": -1,
    "n13L": 10
}, {
    "rootNoteLocation": 2,
    "chordKey": "maj3add6add9",
    "cnName": "\u516D\u4E5D",
    "type": "add",
    "orderedNotesLocationList": [2, 4, 6, 9, 11],
    "notesLocationList": [2, 6, 9, 11, 4],
    "n3L": 6,
    "n5L": 9,
    "n7L": -1,
    "n9L": 4,
    "n11L": -1,
    "n13L": 11
}, {
    "rootNoteLocation": 2,
    "chordKey": "min3add6add9",
    "cnName": "\u5C0F\u516D\u4E5D",
    "type": "add",
    "orderedNotesLocationList": [2, 4, 5, 9, 11],
    "notesLocationList": [2, 5, 9, 11, 4],
    "n3L": 5,
    "n5L": 9,
    "n7L": -1,
    "n9L": 4,
    "n11L": -1,
    "n13L": 11
}, {
    "rootNoteLocation": 2,
    "chordKey": "maj3add9",
    "cnName": "\u5927\u4E09\u52A0\u4E5D\u97F3\uFF08\u4E8C\u97F3\uFF09",
    "type": "add",
    "orderedNotesLocationList": [2, 4, 6, 9],
    "notesLocationList": [2, 6, 9, 4],
    "n3L": 6,
    "n5L": 9,
    "n7L": -1,
    "n9L": 4,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 2,
    "chordKey": "maj3add11",
    "cnName": "\u5927\u4E09\u52A0\u5341\u4E00\u97F3\uFF08\u56DB\u97F3\uFF09",
    "type": "add",
    "orderedNotesLocationList": [2, 6, 7, 9],
    "notesLocationList": [2, 6, 9, 7],
    "n3L": 6,
    "n5L": 9,
    "n7L": -1,
    "n9L": -1,
    "n11L": 7,
    "n13L": -1
}, {
    "rootNoteLocation": 2,
    "chordKey": "min3add9",
    "cnName": "\u5C0F\u4E09\u52A0\u4E5D\u97F3\uFF08\u4E8C\u97F3\uFF09",
    "type": "add",
    "orderedNotesLocationList": [2, 4, 5, 9],
    "notesLocationList": [2, 5, 9, 4],
    "n3L": 5,
    "n5L": 9,
    "n7L": -1,
    "n9L": 4,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 2,
    "chordKey": "min3add11",
    "cnName": "\u5C0F\u4E09\u52A0\u5341\u4E00\u97F3\uFF08\u56DB\u97F3\uFF09",
    "type": "add",
    "orderedNotesLocationList": [2, 5, 7, 9],
    "notesLocationList": [2, 5, 9, 7],
    "n3L": 5,
    "n5L": 9,
    "n7L": -1,
    "n9L": -1,
    "n11L": 7,
    "n13L": -1
}, {
    "rootNoteLocation": 2,
    "chordKey": "maj7add11",
    "cnName": "\u5927\u4E03\u52A0\u5341\u4E00\u97F3\uFF08\u56DB\u97F3\uFF09",
    "type": "add",
    "orderedNotesLocationList": [1, 2, 6, 7, 9],
    "notesLocationList": [2, 6, 9, 1, 7],
    "n3L": 6,
    "n5L": 9,
    "n7L": 1,
    "n9L": -1,
    "n11L": 7,
    "n13L": -1
}, {
    "rootNoteLocation": 2,
    "chordKey": "dom7add6",
    "cnName": "\u5C5E\u4E03\u52A0\u516D\u97F3",
    "type": "add",
    "orderedNotesLocationList": [0, 2, 6, 9, 11],
    "notesLocationList": [2, 6, 9, 11, 0],
    "n3L": 6,
    "n5L": 9,
    "n7L": 0,
    "n9L": -1,
    "n11L": -1,
    "n13L": 11
}, {
    "rootNoteLocation": 2,
    "chordKey": "itaug6",
    "cnName": "\u610F\u5927\u5229\u589E\u516D",
    "type": "aug6",
    "orderedNotesLocationList": [2, 8, 10],
    "notesLocationList": [2, 8, 10],
    "n3L": -1,
    "n5L": -1,
    "n7L": -1,
    "n9L": -1,
    "n11L": 8,
    "n13L": 10
}, {
    "rootNoteLocation": 2,
    "chordKey": "fraug6",
    "cnName": "\u6CD5\u56FD\u589E\u516D",
    "type": "aug6",
    "orderedNotesLocationList": [2, 4, 8, 10],
    "notesLocationList": [2, 4, 8, 10],
    "n3L": -1,
    "n5L": -1,
    "n7L": -1,
    "n9L": 4,
    "n11L": 8,
    "n13L": 10
}, {
    "rootNoteLocation": 2,
    "chordKey": "graug6",
    "cnName": "\u5FB7\u56FD\u589E\u516D",
    "type": "aug6",
    "orderedNotesLocationList": [2, 5, 8, 10],
    "notesLocationList": [2, 5, 8, 10],
    "n3L": 5,
    "n5L": -1,
    "n7L": -1,
    "n9L": -1,
    "n11L": 8,
    "n13L": 10
}, {
    "rootNoteLocation": 2,
    "chordKey": "maj7",
    "cnName": "\u5927\u4E03",
    "type": "chord7",
    "orderedNotesLocationList": [1, 2, 6, 9],
    "notesLocationList": [2, 6, 9, 1],
    "n3L": 6,
    "n5L": 9,
    "n7L": 1,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 2,
    "chordKey": "dom7",
    "cnName": "\u5C5E\u4E03",
    "type": "chord7",
    "orderedNotesLocationList": [0, 2, 6, 9],
    "notesLocationList": [2, 6, 9, 0],
    "n3L": 6,
    "n5L": 9,
    "n7L": 0,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 2,
    "chordKey": "min7",
    "cnName": "\u5C0F\u4E03",
    "type": "chord7",
    "orderedNotesLocationList": [0, 2, 5, 9],
    "notesLocationList": [2, 5, 9, 0],
    "n3L": 5,
    "n5L": 9,
    "n7L": 0,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 2,
    "chordKey": "halfdim7",
    "cnName": "\u534A\u51CF\u4E03",
    "type": "chord7",
    "orderedNotesLocationList": [0, 2, 5, 8],
    "notesLocationList": [2, 5, 8, 0],
    "n3L": 5,
    "n5L": 8,
    "n7L": 0,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 2,
    "chordKey": "dim7",
    "cnName": "\u51CF\u4E03",
    "type": "chord7",
    "orderedNotesLocationList": [2, 5, 8, 11],
    "notesLocationList": [2, 5, 8, 11],
    "n3L": 5,
    "n5L": 8,
    "n7L": 11,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 2,
    "chordKey": "minmaj7",
    "cnName": "\u5C0F\u5927\u4E03",
    "type": "chord7",
    "orderedNotesLocationList": [1, 2, 5, 9],
    "notesLocationList": [2, 5, 9, 1],
    "n3L": 5,
    "n5L": 9,
    "n7L": 1,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 2,
    "chordKey": "dom7#5",
    "cnName": "\u589E\u4E03\uFF08\u5C5E\u4E03\u5347\u4E94\uFF09",
    "type": "chord7",
    "orderedNotesLocationList": [0, 2, 6, 10],
    "notesLocationList": [2, 6, 10, 0],
    "n3L": 6,
    "n5L": 10,
    "n7L": 0,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 2,
    "chordKey": "augmaj7",
    "cnName": "\u589E\u5927\u4E03",
    "type": "chord7",
    "orderedNotesLocationList": [1, 2, 6, 10],
    "notesLocationList": [2, 6, 10, 1],
    "n3L": 6,
    "n5L": 10,
    "n7L": 1,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 2,
    "chordKey": "dom7b5",
    "cnName": "\u5C5E\u4E03\u964D\u4E94",
    "type": "chord7alt",
    "orderedNotesLocationList": [0, 2, 6, 8],
    "notesLocationList": [2, 6, 8, 0],
    "n3L": 6,
    "n5L": 8,
    "n7L": 0,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 2,
    "chordKey": "dom7b9",
    "cnName": "\u5C5E\u4E03\u964D\u4E5D",
    "type": "chord7alt",
    "orderedNotesLocationList": [0, 2, 3, 6, 9],
    "notesLocationList": [2, 6, 9, 0, 3],
    "n3L": 6,
    "n5L": 9,
    "n7L": 0,
    "n9L": 3,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 2,
    "chordKey": "dom7#9",
    "cnName": "\u5C5E\u4E03\u5347\u4E5D",
    "type": "chord7alt",
    "orderedNotesLocationList": [0, 2, 5, 6, 9],
    "notesLocationList": [2, 6, 9, 0, 5],
    "n3L": 6,
    "n5L": 9,
    "n7L": 0,
    "n9L": 5,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 2,
    "chordKey": "dom7#11",
    "cnName": "\u5C5E\u4E03\u5347\u5341\u4E00",
    "type": "chord7alt",
    "orderedNotesLocationList": [0, 2, 6, 8, 9],
    "notesLocationList": [2, 6, 9, 0, 8],
    "n3L": 6,
    "n5L": 9,
    "n7L": 0,
    "n9L": -1,
    "n11L": 8,
    "n13L": -1
}, {
    "rootNoteLocation": 2,
    "chordKey": "dom7b13",
    "cnName": "\u5C5E\u4E03\u964D\u5341\u4E09",
    "type": "chord7alt",
    "orderedNotesLocationList": [0, 2, 6, 9, 10],
    "notesLocationList": [2, 6, 9, 0, 10],
    "n3L": 6,
    "n5L": 9,
    "n7L": 0,
    "n9L": -1,
    "n11L": -1,
    "n13L": 10
}, {
    "rootNoteLocation": 2,
    "chordKey": "dom7b5b9",
    "cnName": "\u5C5E\u4E03\u964D\u4E94\u964D\u4E5D",
    "type": "chord7alt",
    "orderedNotesLocationList": [0, 2, 3, 6, 8],
    "notesLocationList": [2, 6, 8, 0, 3],
    "n3L": 6,
    "n5L": 8,
    "n7L": 0,
    "n9L": 3,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 2,
    "chordKey": "dom7b5#9",
    "cnName": "\u5C5E\u4E03\u964D\u4E94\u5347\u4E5D",
    "type": "chord7alt",
    "orderedNotesLocationList": [0, 2, 5, 6, 8],
    "notesLocationList": [2, 6, 8, 0, 5],
    "n3L": 6,
    "n5L": 8,
    "n7L": 0,
    "n9L": 5,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 2,
    "chordKey": "maj7b5",
    "cnName": "\u5927\u4E03\u964D\u4E94",
    "type": "chord7alt",
    "orderedNotesLocationList": [1, 2, 6, 8],
    "notesLocationList": [2, 6, 8, 1],
    "n3L": 6,
    "n5L": 8,
    "n7L": 1,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 2,
    "chordKey": "maj7#5",
    "cnName": "\u5927\u4E03\u589E\u4E94",
    "type": "chord7alt",
    "orderedNotesLocationList": [1, 2, 6, 10],
    "notesLocationList": [2, 6, 10, 1],
    "n3L": 6,
    "n5L": 10,
    "n7L": 1,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 2,
    "chordKey": "maj7b9",
    "cnName": "\u5927\u4E03\u964D\u4E5D",
    "type": "chord7alt",
    "orderedNotesLocationList": [1, 2, 3, 6, 9],
    "notesLocationList": [2, 6, 9, 1, 3],
    "n3L": 6,
    "n5L": 9,
    "n7L": 1,
    "n9L": 3,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 2,
    "chordKey": "maj7b13",
    "cnName": "\u5927\u4E03\u964D\u5341\u4E09",
    "type": "chord7alt",
    "orderedNotesLocationList": [1, 2, 6, 9, 10],
    "notesLocationList": [2, 6, 9, 1, 10],
    "n3L": 6,
    "n5L": 9,
    "n7L": 1,
    "n9L": -1,
    "n11L": -1,
    "n13L": 10
}, {
    "rootNoteLocation": 2,
    "chordKey": "maj7#11",
    "cnName": "\u5927\u4E03\u5347\u5341\u4E00",
    "type": "chord7alt",
    "orderedNotesLocationList": [1, 2, 6, 8, 9],
    "notesLocationList": [2, 6, 9, 1, 8],
    "n3L": 6,
    "n5L": 9,
    "n7L": 1,
    "n9L": -1,
    "n11L": 8,
    "n13L": -1
}, {
    "rootNoteLocation": 2,
    "chordKey": "min7#5",
    "cnName": "\u5C0F\u4E03\u5347\u4E94",
    "type": "chord7alt",
    "orderedNotesLocationList": [0, 2, 5, 10],
    "notesLocationList": [2, 5, 10, 0],
    "n3L": 5,
    "n5L": 10,
    "n7L": 0,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 2,
    "chordKey": "minmaj7b5",
    "cnName": "\u5C0F\u5927\u4E03\u964D\u4E94",
    "type": "chord7alt",
    "orderedNotesLocationList": [1, 2, 5, 8],
    "notesLocationList": [2, 5, 8, 1],
    "n3L": 5,
    "n5L": 8,
    "n7L": 1,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 2,
    "chordKey": "minmaj7#5",
    "cnName": "\u5C0F\u5927\u4E03\u5347\u4E94",
    "type": "chord7alt",
    "orderedNotesLocationList": [1, 2, 5, 10],
    "notesLocationList": [2, 5, 10, 1],
    "n3L": 5,
    "n5L": 10,
    "n7L": 1,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 2,
    "chordKey": "dom7#5b9",
    "cnName": "\u589E\u4E03\u964D\u4E5D\uFF08\u5C5E\u4E03\u5347\u4E94\u964D\u4E5D\uFF09",
    "type": "chord7alt",
    "orderedNotesLocationList": [0, 2, 3, 6, 10],
    "notesLocationList": [2, 6, 10, 0, 3],
    "n3L": 6,
    "n5L": 10,
    "n7L": 0,
    "n9L": 3,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 2,
    "chordKey": "dom7#5#9",
    "cnName": "\u589E\u4E03\u5347\u4E5D\uFF08\u5C5E\u4E03\u5347\u4E94\u5347\u4E5D\uFF09",
    "type": "chord7alt",
    "orderedNotesLocationList": [0, 2, 5, 6, 10],
    "notesLocationList": [2, 6, 10, 0, 5],
    "n3L": 6,
    "n5L": 10,
    "n7L": 0,
    "n9L": 5,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 2,
    "chordKey": "sus2",
    "cnName": "\u6302\u4E8C",
    "type": "sus",
    "orderedNotesLocationList": [2, 4, 9],
    "notesLocationList": [2, 4, 9],
    "n3L": -1,
    "n5L": 9,
    "n7L": -1,
    "n9L": 4,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 2,
    "chordKey": "sus4",
    "cnName": "\u6302\u56DB",
    "type": "sus",
    "orderedNotesLocationList": [2, 7, 9],
    "notesLocationList": [2, 7, 9],
    "n3L": -1,
    "n5L": 9,
    "n7L": -1,
    "n9L": -1,
    "n11L": 7,
    "n13L": -1
}, {
    "rootNoteLocation": 2,
    "chordKey": "dom7sus2",
    "cnName": "\u5C5E\u4E03\u6302\u4E8C",
    "type": "sus",
    "orderedNotesLocationList": [0, 2, 4, 9],
    "notesLocationList": [2, 4, 9, 0],
    "n3L": -1,
    "n5L": 9,
    "n7L": 0,
    "n9L": 4,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 2,
    "chordKey": "dom7sus4",
    "cnName": "\u5C5E\u4E03\u6302\u56DB",
    "type": "sus",
    "orderedNotesLocationList": [0, 2, 7, 9],
    "notesLocationList": [2, 7, 9, 0],
    "n3L": -1,
    "n5L": 9,
    "n7L": 0,
    "n9L": -1,
    "n11L": 7,
    "n13L": -1
}, {
    "rootNoteLocation": 2,
    "chordKey": "maj7sus2",
    "cnName": "\u5927\u4E03\u6302\u4E8C",
    "type": "sus",
    "orderedNotesLocationList": [1, 2, 4, 9],
    "notesLocationList": [2, 4, 9, 1],
    "n3L": -1,
    "n5L": 9,
    "n7L": 1,
    "n9L": 4,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 2,
    "chordKey": "maj7sus4",
    "cnName": "\u5927\u4E03\u6302\u56DB",
    "type": "sus",
    "orderedNotesLocationList": [1, 2, 7, 9],
    "notesLocationList": [2, 7, 9, 1],
    "n3L": -1,
    "n5L": 9,
    "n7L": 1,
    "n9L": -1,
    "n11L": 7,
    "n13L": -1
}, {
    "rootNoteLocation": 2,
    "chordKey": "dom9sus4",
    "cnName": "\u5C5E\u4E5D\u6302\u56DB",
    "type": "sus",
    "orderedNotesLocationList": [0, 2, 4, 7, 9],
    "notesLocationList": [2, 7, 9, 0, 4],
    "n3L": -1,
    "n5L": 9,
    "n7L": 0,
    "n9L": 4,
    "n11L": 7,
    "n13L": -1
}, {
    "rootNoteLocation": 2,
    "chordKey": "maj9sus4",
    "cnName": "\u5927\u4E5D\u6302\u56DB",
    "type": "sus",
    "orderedNotesLocationList": [1, 2, 4, 7, 9],
    "notesLocationList": [2, 7, 9, 1, 4],
    "n3L": -1,
    "n5L": 9,
    "n7L": 1,
    "n9L": 4,
    "n11L": 7,
    "n13L": -1
}, {
    "rootNoteLocation": 2,
    "chordKey": "dom13sus4",
    "cnName": "\u5C5E\u5341\u4E09\u6302\u56DB",
    "type": "sus",
    "orderedNotesLocationList": [0, 2, 4, 7, 9, 11],
    "notesLocationList": [2, 7, 9, 0, 4, 11],
    "n3L": -1,
    "n5L": 9,
    "n7L": 0,
    "n9L": 4,
    "n11L": 7,
    "n13L": 11
}, {
    "rootNoteLocation": 2,
    "chordKey": "maj13sus4",
    "cnName": "\u5927\u5341\u4E09\u6302\u56DB",
    "type": "sus",
    "orderedNotesLocationList": [1, 2, 4, 7, 9, 11],
    "notesLocationList": [2, 7, 9, 1, 4, 11],
    "n3L": -1,
    "n5L": 9,
    "n7L": 1,
    "n9L": 4,
    "n11L": 7,
    "n13L": 11
}, {
    "rootNoteLocation": 2,
    "chordKey": "maj13sus2",
    "cnName": "\u5927\u5341\u4E09\u6302\u4E8C",
    "type": "sus",
    "orderedNotesLocationList": [1, 2, 4, 9, 11],
    "notesLocationList": [2, 4, 9, 1, 11],
    "n3L": -1,
    "n5L": 9,
    "n7L": 1,
    "n9L": 4,
    "n11L": -1,
    "n13L": 11
}, {
    "rootNoteLocation": 2,
    "chordKey": "maj9",
    "cnName": "\u5927\u4E5D",
    "type": "chord9",
    "orderedNotesLocationList": [1, 2, 4, 6, 9],
    "notesLocationList": [2, 6, 9, 1, 4],
    "n3L": 6,
    "n5L": 9,
    "n7L": 1,
    "n9L": 4,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 2,
    "chordKey": "dom9",
    "cnName": "\u5C5E\u4E5D",
    "type": "chord9",
    "orderedNotesLocationList": [0, 2, 4, 6, 9],
    "notesLocationList": [2, 6, 9, 0, 4],
    "n3L": 6,
    "n5L": 9,
    "n7L": 0,
    "n9L": 4,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 2,
    "chordKey": "min9",
    "cnName": "\u5C0F\u4E5D",
    "type": "chord9",
    "orderedNotesLocationList": [0, 2, 4, 5, 9],
    "notesLocationList": [2, 5, 9, 0, 4],
    "n3L": 5,
    "n5L": 9,
    "n7L": 0,
    "n9L": 4,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 2,
    "chordKey": "minmaj9",
    "cnName": "\u5C0F\u5927\u4E5D",
    "type": "chord9",
    "orderedNotesLocationList": [1, 2, 4, 5, 9],
    "notesLocationList": [2, 5, 9, 1, 4],
    "n3L": 5,
    "n5L": 9,
    "n7L": 1,
    "n9L": 4,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 2,
    "chordKey": "dom9#5",
    "cnName": "\u589E\u4E5D\uFF08\u5C5E\u4E5D\u5347\u4E94\uFF09",
    "type": "chord9",
    "orderedNotesLocationList": [0, 2, 4, 6, 10],
    "notesLocationList": [2, 6, 10, 0, 4],
    "n3L": 6,
    "n5L": 10,
    "n7L": 0,
    "n9L": 4,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 2,
    "chordKey": "dom9b9",
    "cnName": "\u5C5E\u4E5D\u964D\u4E5D",
    "type": "chord9",
    "orderedNotesLocationList": [0, 2, 3, 6, 9],
    "notesLocationList": [2, 6, 9, 0, 3],
    "n3L": 6,
    "n5L": 9,
    "n7L": 0,
    "n9L": 3,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 2,
    "chordKey": "dom9b11",
    "cnName": "\u5C5E\u4E5D\u964D\u5341\u4E00",
    "type": "chord9",
    "orderedNotesLocationList": [0, 2, 4, 6, 6, 9],
    "notesLocationList": [2, 6, 9, 0, 4, 6],
    "n3L": 6,
    "n5L": 9,
    "n7L": 0,
    "n9L": 4,
    "n11L": 6,
    "n13L": -1
}, {
    "rootNoteLocation": 2,
    "chordKey": "dom9#11",
    "cnName": "\u5C5E\u4E5D\u5347\u5341\u4E00",
    "type": "chord9",
    "orderedNotesLocationList": [0, 2, 4, 6, 8, 9],
    "notesLocationList": [2, 6, 9, 0, 4, 8],
    "n3L": 6,
    "n5L": 9,
    "n7L": 0,
    "n9L": 4,
    "n11L": 8,
    "n13L": -1
}, {
    "rootNoteLocation": 2,
    "chordKey": "dom9b13",
    "cnName": "\u5C5E\u4E5D\u964D\u5341\u4E09",
    "type": "chord9",
    "orderedNotesLocationList": [0, 2, 4, 6, 9, 10],
    "notesLocationList": [2, 6, 9, 0, 4, 10],
    "n3L": 6,
    "n5L": 9,
    "n7L": 0,
    "n9L": 4,
    "n11L": -1,
    "n13L": 10
}, {
    "rootNoteLocation": 2,
    "chordKey": "maj9b5",
    "cnName": "\u5927\u4E5D\u964D\u4E94",
    "type": "chord9",
    "orderedNotesLocationList": [1, 2, 4, 6, 8],
    "notesLocationList": [2, 6, 8, 1, 4],
    "n3L": 6,
    "n5L": 8,
    "n7L": 1,
    "n9L": 4,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 2,
    "chordKey": "maj9#5",
    "cnName": "\u5927\u4E5D\u5347\u4E94",
    "type": "chord9",
    "orderedNotesLocationList": [1, 2, 4, 6, 10],
    "notesLocationList": [2, 6, 10, 1, 4],
    "n3L": 6,
    "n5L": 10,
    "n7L": 1,
    "n9L": 4,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 2,
    "chordKey": "maj9#11",
    "cnName": "\u5927\u4E5D\u5347\u5341\u4E00",
    "type": "chord9",
    "orderedNotesLocationList": [1, 2, 4, 6, 8, 9],
    "notesLocationList": [2, 6, 9, 1, 4, 8],
    "n3L": 6,
    "n5L": 9,
    "n7L": 1,
    "n9L": 4,
    "n11L": 8,
    "n13L": -1
}, {
    "rootNoteLocation": 2,
    "chordKey": "maj9b13",
    "cnName": "\u5927\u4E5D\u964D\u5341\u4E09",
    "type": "chord9",
    "orderedNotesLocationList": [1, 2, 4, 6, 8, 10],
    "notesLocationList": [2, 6, 8, 1, 4, 10],
    "n3L": 6,
    "n5L": 8,
    "n7L": 1,
    "n9L": 4,
    "n11L": -1,
    "n13L": 10
}, {
    "rootNoteLocation": 2,
    "chordKey": "min9b5",
    "cnName": "\u5C0F\u4E5D\u964D\u4E94",
    "type": "chord9",
    "orderedNotesLocationList": [0, 2, 4, 5, 8],
    "notesLocationList": [2, 5, 8, 0, 4],
    "n3L": 5,
    "n5L": 8,
    "n7L": 0,
    "n9L": 4,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 2,
    "chordKey": "min9b9",
    "cnName": "\u5C0F\u4E5D\u964D\u4E5D",
    "type": "chord9",
    "orderedNotesLocationList": [0, 2, 3, 5, 9],
    "notesLocationList": [2, 5, 9, 0, 3],
    "n3L": 5,
    "n5L": 9,
    "n7L": 0,
    "n9L": 3,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 2,
    "chordKey": "maj11",
    "cnName": "\u5927\u5341\u4E00",
    "type": "chord11",
    "orderedNotesLocationList": [1, 2, 4, 6, 7, 9],
    "notesLocationList": [2, 6, 9, 1, 4, 7],
    "n3L": 6,
    "n5L": 9,
    "n7L": 1,
    "n9L": 4,
    "n11L": 7,
    "n13L": -1
}, {
    "rootNoteLocation": 2,
    "chordKey": "dom11",
    "cnName": "\u5C5E\u5341\u4E00",
    "type": "chord11",
    "orderedNotesLocationList": [0, 2, 4, 6, 7, 9],
    "notesLocationList": [2, 6, 9, 0, 4, 7],
    "n3L": 6,
    "n5L": 9,
    "n7L": 0,
    "n9L": 4,
    "n11L": 7,
    "n13L": -1
}, {
    "rootNoteLocation": 2,
    "chordKey": "min11",
    "cnName": "\u5C0F\u5341\u4E00",
    "type": "chord11",
    "orderedNotesLocationList": [0, 2, 4, 5, 7, 9],
    "notesLocationList": [2, 5, 9, 0, 4, 7],
    "n3L": 5,
    "n5L": 9,
    "n7L": 0,
    "n9L": 4,
    "n11L": 7,
    "n13L": -1
}, {
    "rootNoteLocation": 2,
    "chordKey": "minmaj11",
    "cnName": "\u5C0F\u5927\u5341\u4E00",
    "type": "chord11",
    "orderedNotesLocationList": [1, 2, 4, 5, 7, 9],
    "notesLocationList": [2, 5, 9, 1, 4, 7],
    "n3L": 5,
    "n5L": 9,
    "n7L": 1,
    "n9L": 4,
    "n11L": 7,
    "n13L": -1
}, {
    "rootNoteLocation": 2,
    "chordKey": "dom11b5",
    "cnName": "\u5C5E\u5341\u4E00\u964D\u4E94",
    "type": "chord11",
    "orderedNotesLocationList": [0, 2, 4, 6, 7, 8],
    "notesLocationList": [2, 6, 8, 0, 4, 7],
    "n3L": 6,
    "n5L": 8,
    "n7L": 0,
    "n9L": 4,
    "n11L": 7,
    "n13L": -1
}, {
    "rootNoteLocation": 2,
    "chordKey": "dom11#5",
    "cnName": "\u5C5E\u5341\u4E00\u5347\u4E94",
    "type": "chord11",
    "orderedNotesLocationList": [0, 2, 4, 6, 7, 10],
    "notesLocationList": [2, 6, 10, 0, 4, 7],
    "n3L": 6,
    "n5L": 10,
    "n7L": 0,
    "n9L": 4,
    "n11L": 7,
    "n13L": -1
}, {
    "rootNoteLocation": 2,
    "chordKey": "dom11b9",
    "cnName": "\u5C5E\u5341\u4E00\u964D\u4E5D",
    "type": "chord11",
    "orderedNotesLocationList": [0, 2, 3, 6, 7, 9],
    "notesLocationList": [2, 6, 9, 0, 3, 7],
    "n3L": 6,
    "n5L": 9,
    "n7L": 0,
    "n9L": 3,
    "n11L": 7,
    "n13L": -1
}, {
    "rootNoteLocation": 2,
    "chordKey": "dom11#9",
    "cnName": "\u5C5E\u5341\u4E00\u5347\u4E5D",
    "type": "chord11",
    "orderedNotesLocationList": [0, 2, 5, 6, 7, 9],
    "notesLocationList": [2, 6, 9, 0, 5, 7],
    "n3L": 6,
    "n5L": 9,
    "n7L": 0,
    "n9L": 5,
    "n11L": 7,
    "n13L": -1
}, {
    "rootNoteLocation": 2,
    "chordKey": "dom11b13",
    "cnName": "\u5C5E\u5341\u4E00\u964D\u5341\u4E09",
    "type": "chord11",
    "orderedNotesLocationList": [0, 2, 4, 6, 7, 9, 10],
    "notesLocationList": [2, 6, 9, 0, 4, 7, 10],
    "n3L": 6,
    "n5L": 9,
    "n7L": 0,
    "n9L": 4,
    "n11L": 7,
    "n13L": 10
}, {
    "rootNoteLocation": 2,
    "chordKey": "min11b5",
    "cnName": "\u5C0F\u5341\u4E00\u964D\u4E94",
    "type": "chord11",
    "orderedNotesLocationList": [0, 2, 4, 5, 7, 8],
    "notesLocationList": [2, 5, 8, 0, 4, 7],
    "n3L": 5,
    "n5L": 8,
    "n7L": 0,
    "n9L": 4,
    "n11L": 7,
    "n13L": -1
}, {
    "rootNoteLocation": 2,
    "chordKey": "maj13",
    "cnName": "\u5927\u5341\u4E09",
    "type": "chord13",
    "orderedNotesLocationList": [1, 2, 4, 6, 7, 9, 11],
    "notesLocationList": [2, 6, 9, 1, 4, 7, 11],
    "n3L": 6,
    "n5L": 9,
    "n7L": 1,
    "n9L": 4,
    "n11L": 7,
    "n13L": 11
}, {
    "rootNoteLocation": 2,
    "chordKey": "dom13",
    "cnName": "\u5C5E\u5341\u4E09",
    "type": "chord13",
    "orderedNotesLocationList": [0, 2, 4, 6, 7, 9, 11],
    "notesLocationList": [2, 6, 9, 0, 4, 7, 11],
    "n3L": 6,
    "n5L": 9,
    "n7L": 0,
    "n9L": 4,
    "n11L": 7,
    "n13L": 11
}, {
    "rootNoteLocation": 2,
    "chordKey": "min13",
    "cnName": "\u5C0F\u5341\u4E09",
    "type": "chord13",
    "orderedNotesLocationList": [0, 2, 4, 5, 7, 9, 11],
    "notesLocationList": [2, 5, 9, 0, 4, 7, 11],
    "n3L": 5,
    "n5L": 9,
    "n7L": 0,
    "n9L": 4,
    "n11L": 7,
    "n13L": 11
}, {
    "rootNoteLocation": 2,
    "chordKey": "minmaj13",
    "cnName": "\u5C0F\u5927\u5341\u4E09",
    "type": "chord13",
    "orderedNotesLocationList": [1, 2, 4, 5, 7, 9, 11],
    "notesLocationList": [2, 5, 9, 1, 4, 7, 11],
    "n3L": 5,
    "n5L": 9,
    "n7L": 1,
    "n9L": 4,
    "n11L": 7,
    "n13L": 11
}, {
    "rootNoteLocation": 2,
    "chordKey": "dom13b5",
    "cnName": "\u5C5E\u5341\u4E09\u964D\u4E94",
    "type": "chord13",
    "orderedNotesLocationList": [0, 2, 4, 6, 7, 8, 11],
    "notesLocationList": [2, 6, 8, 0, 4, 7, 11],
    "n3L": 6,
    "n5L": 8,
    "n7L": 0,
    "n9L": 4,
    "n11L": 7,
    "n13L": 11
}, {
    "rootNoteLocation": 2,
    "chordKey": "dom13#5",
    "cnName": "\u5C5E\u5341\u4E09\u5347\u4E94",
    "type": "chord13",
    "orderedNotesLocationList": [0, 2, 4, 6, 7, 10, 11],
    "notesLocationList": [2, 6, 10, 0, 4, 7, 11],
    "n3L": 6,
    "n5L": 10,
    "n7L": 0,
    "n9L": 4,
    "n11L": 7,
    "n13L": 11
}, {
    "rootNoteLocation": 2,
    "chordKey": "dom13b9",
    "cnName": "\u5C5E\u5341\u4E09\u964D\u4E5D",
    "type": "chord13",
    "orderedNotesLocationList": [0, 2, 3, 6, 7, 9, 11],
    "notesLocationList": [2, 6, 9, 0, 3, 7, 11],
    "n3L": 6,
    "n5L": 9,
    "n7L": 0,
    "n9L": 3,
    "n11L": 7,
    "n13L": 11
}, {
    "rootNoteLocation": 2,
    "chordKey": "dom13#9",
    "cnName": "\u5C5E\u5341\u4E09\u5347\u4E5D",
    "type": "chord13",
    "orderedNotesLocationList": [0, 2, 5, 6, 9, 11],
    "notesLocationList": [2, 6, 9, 0, 5, 11],
    "n3L": 6,
    "n5L": 9,
    "n7L": 0,
    "n9L": 5,
    "n11L": -1,
    "n13L": 11
}, {
    "rootNoteLocation": 2,
    "chordKey": "dom13#11",
    "cnName": "\u5C5E\u5341\u4E09\u5347\u5341\u4E00",
    "type": "chord13",
    "orderedNotesLocationList": [0, 2, 4, 6, 8, 9, 11],
    "notesLocationList": [2, 6, 9, 0, 4, 8, 11],
    "n3L": 6,
    "n5L": 9,
    "n7L": 0,
    "n9L": 4,
    "n11L": 8,
    "n13L": 11
}, {
    "rootNoteLocation": 2,
    "chordKey": "maj13b5",
    "cnName": "\u5927\u5341\u4E09\u964D\u4E94",
    "type": "chord13",
    "orderedNotesLocationList": [1, 2, 4, 6, 8, 11],
    "notesLocationList": [2, 6, 8, 1, 4, 11],
    "n3L": 6,
    "n5L": 8,
    "n7L": 1,
    "n9L": 4,
    "n11L": -1,
    "n13L": 11
}, {
    "rootNoteLocation": 2,
    "chordKey": "maj13#5",
    "cnName": "\u5927\u5341\u4E09\u5347\u4E94",
    "type": "chord13",
    "orderedNotesLocationList": [1, 2, 4, 6, 10, 11],
    "notesLocationList": [2, 6, 10, 1, 4, 11],
    "n3L": 6,
    "n5L": 10,
    "n7L": 1,
    "n9L": 4,
    "n11L": -1,
    "n13L": 11
}, {
    "rootNoteLocation": 2,
    "chordKey": "maj13b9",
    "cnName": "\u5927\u5341\u4E09\u964D\u4E5D",
    "type": "chord13",
    "orderedNotesLocationList": [1, 2, 3, 6, 9, 11],
    "notesLocationList": [2, 6, 9, 1, 3, 11],
    "n3L": 6,
    "n5L": 9,
    "n7L": 1,
    "n9L": 3,
    "n11L": -1,
    "n13L": 11
}, {
    "rootNoteLocation": 2,
    "chordKey": "maj13#11",
    "cnName": "\u5927\u5341\u4E09\u5347\u5341\u4E00",
    "type": "chord13",
    "orderedNotesLocationList": [1, 2, 4, 6, 8, 9, 11],
    "notesLocationList": [2, 6, 9, 1, 4, 8, 11],
    "n3L": 6,
    "n5L": 9,
    "n7L": 1,
    "n9L": 4,
    "n11L": 8,
    "n13L": 11
}, {
    "rootNoteLocation": 3,
    "chordKey": "maj3",
    "cnName": "\u5927\u4E09",
    "type": "chord3",
    "orderedNotesLocationList": [3, 7, 10],
    "notesLocationList": [3, 7, 10],
    "n3L": 7,
    "n5L": 10,
    "n7L": -1,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 3,
    "chordKey": "min3",
    "cnName": "\u5C0F\u4E09",
    "type": "chord3",
    "orderedNotesLocationList": [3, 6, 10],
    "notesLocationList": [3, 6, 10],
    "n3L": 6,
    "n5L": 10,
    "n7L": -1,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 3,
    "chordKey": "dim3",
    "cnName": "\u51CF\u4E09",
    "type": "chord3",
    "orderedNotesLocationList": [3, 6, 9],
    "notesLocationList": [3, 6, 9],
    "n3L": 6,
    "n5L": 9,
    "n7L": -1,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 3,
    "chordKey": "aug3",
    "cnName": "\u589E\u4E09",
    "type": "chord3",
    "orderedNotesLocationList": [3, 7, 11],
    "notesLocationList": [3, 7, 11],
    "n3L": 7,
    "n5L": 11,
    "n7L": -1,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 3,
    "chordKey": "maj3b5",
    "cnName": "\u5927\u4E09\u51CF\u4E94",
    "type": "chord3",
    "orderedNotesLocationList": [3, 7, 9],
    "notesLocationList": [3, 7, 9],
    "n3L": 7,
    "n5L": 9,
    "n7L": -1,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 3,
    "chordKey": "maj3add6",
    "cnName": "\u5927\u516D\uFF08\u5927\u4E09\u52A0\u5341\u4E09\u97F3\uFF09",
    "type": "add",
    "orderedNotesLocationList": [0, 3, 7, 10],
    "notesLocationList": [3, 7, 10, 0],
    "n3L": 7,
    "n5L": 10,
    "n7L": -1,
    "n9L": -1,
    "n11L": -1,
    "n13L": 0
}, {
    "rootNoteLocation": 3,
    "chordKey": "min3add6",
    "cnName": "\u5C0F\u516D\uFF08\u5C0F\u4E09\u52A0\u5341\u4E09\u97F3\uFF09",
    "type": "add",
    "orderedNotesLocationList": [3, 6, 10, 11],
    "notesLocationList": [3, 6, 10, 11],
    "n3L": 6,
    "n5L": 10,
    "n7L": -1,
    "n9L": -1,
    "n11L": -1,
    "n13L": 11
}, {
    "rootNoteLocation": 3,
    "chordKey": "maj3add6add9",
    "cnName": "\u516D\u4E5D",
    "type": "add",
    "orderedNotesLocationList": [0, 3, 5, 7, 10],
    "notesLocationList": [3, 7, 10, 0, 5],
    "n3L": 7,
    "n5L": 10,
    "n7L": -1,
    "n9L": 5,
    "n11L": -1,
    "n13L": 0
}, {
    "rootNoteLocation": 3,
    "chordKey": "min3add6add9",
    "cnName": "\u5C0F\u516D\u4E5D",
    "type": "add",
    "orderedNotesLocationList": [0, 3, 5, 6, 10],
    "notesLocationList": [3, 6, 10, 0, 5],
    "n3L": 6,
    "n5L": 10,
    "n7L": -1,
    "n9L": 5,
    "n11L": -1,
    "n13L": 0
}, {
    "rootNoteLocation": 3,
    "chordKey": "maj3add9",
    "cnName": "\u5927\u4E09\u52A0\u4E5D\u97F3\uFF08\u4E8C\u97F3\uFF09",
    "type": "add",
    "orderedNotesLocationList": [3, 5, 7, 10],
    "notesLocationList": [3, 7, 10, 5],
    "n3L": 7,
    "n5L": 10,
    "n7L": -1,
    "n9L": 5,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 3,
    "chordKey": "maj3add11",
    "cnName": "\u5927\u4E09\u52A0\u5341\u4E00\u97F3\uFF08\u56DB\u97F3\uFF09",
    "type": "add",
    "orderedNotesLocationList": [3, 7, 8, 10],
    "notesLocationList": [3, 7, 10, 8],
    "n3L": 7,
    "n5L": 10,
    "n7L": -1,
    "n9L": -1,
    "n11L": 8,
    "n13L": -1
}, {
    "rootNoteLocation": 3,
    "chordKey": "min3add9",
    "cnName": "\u5C0F\u4E09\u52A0\u4E5D\u97F3\uFF08\u4E8C\u97F3\uFF09",
    "type": "add",
    "orderedNotesLocationList": [3, 5, 6, 10],
    "notesLocationList": [3, 6, 10, 5],
    "n3L": 6,
    "n5L": 10,
    "n7L": -1,
    "n9L": 5,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 3,
    "chordKey": "min3add11",
    "cnName": "\u5C0F\u4E09\u52A0\u5341\u4E00\u97F3\uFF08\u56DB\u97F3\uFF09",
    "type": "add",
    "orderedNotesLocationList": [3, 6, 8, 10],
    "notesLocationList": [3, 6, 10, 8],
    "n3L": 6,
    "n5L": 10,
    "n7L": -1,
    "n9L": -1,
    "n11L": 8,
    "n13L": -1
}, {
    "rootNoteLocation": 3,
    "chordKey": "maj7add11",
    "cnName": "\u5927\u4E03\u52A0\u5341\u4E00\u97F3\uFF08\u56DB\u97F3\uFF09",
    "type": "add",
    "orderedNotesLocationList": [2, 3, 7, 8, 10],
    "notesLocationList": [3, 7, 10, 2, 8],
    "n3L": 7,
    "n5L": 10,
    "n7L": 2,
    "n9L": -1,
    "n11L": 8,
    "n13L": -1
}, {
    "rootNoteLocation": 3,
    "chordKey": "dom7add6",
    "cnName": "\u5C5E\u4E03\u52A0\u516D\u97F3",
    "type": "add",
    "orderedNotesLocationList": [0, 1, 3, 7, 10],
    "notesLocationList": [3, 7, 10, 0, 1],
    "n3L": 7,
    "n5L": 10,
    "n7L": 1,
    "n9L": -1,
    "n11L": -1,
    "n13L": 0
}, {
    "rootNoteLocation": 3,
    "chordKey": "itaug6",
    "cnName": "\u610F\u5927\u5229\u589E\u516D",
    "type": "aug6",
    "orderedNotesLocationList": [3, 9, 11],
    "notesLocationList": [3, 9, 11],
    "n3L": -1,
    "n5L": -1,
    "n7L": -1,
    "n9L": -1,
    "n11L": 9,
    "n13L": 11
}, {
    "rootNoteLocation": 3,
    "chordKey": "fraug6",
    "cnName": "\u6CD5\u56FD\u589E\u516D",
    "type": "aug6",
    "orderedNotesLocationList": [3, 5, 9, 11],
    "notesLocationList": [3, 5, 9, 11],
    "n3L": -1,
    "n5L": -1,
    "n7L": -1,
    "n9L": 5,
    "n11L": 9,
    "n13L": 11
}, {
    "rootNoteLocation": 3,
    "chordKey": "graug6",
    "cnName": "\u5FB7\u56FD\u589E\u516D",
    "type": "aug6",
    "orderedNotesLocationList": [3, 6, 9, 11],
    "notesLocationList": [3, 6, 9, 11],
    "n3L": 6,
    "n5L": -1,
    "n7L": -1,
    "n9L": -1,
    "n11L": 9,
    "n13L": 11
}, {
    "rootNoteLocation": 3,
    "chordKey": "maj7",
    "cnName": "\u5927\u4E03",
    "type": "chord7",
    "orderedNotesLocationList": [2, 3, 7, 10],
    "notesLocationList": [3, 7, 10, 2],
    "n3L": 7,
    "n5L": 10,
    "n7L": 2,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 3,
    "chordKey": "dom7",
    "cnName": "\u5C5E\u4E03",
    "type": "chord7",
    "orderedNotesLocationList": [1, 3, 7, 10],
    "notesLocationList": [3, 7, 10, 1],
    "n3L": 7,
    "n5L": 10,
    "n7L": 1,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 3,
    "chordKey": "min7",
    "cnName": "\u5C0F\u4E03",
    "type": "chord7",
    "orderedNotesLocationList": [1, 3, 6, 10],
    "notesLocationList": [3, 6, 10, 1],
    "n3L": 6,
    "n5L": 10,
    "n7L": 1,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 3,
    "chordKey": "halfdim7",
    "cnName": "\u534A\u51CF\u4E03",
    "type": "chord7",
    "orderedNotesLocationList": [1, 3, 6, 9],
    "notesLocationList": [3, 6, 9, 1],
    "n3L": 6,
    "n5L": 9,
    "n7L": 1,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 3,
    "chordKey": "dim7",
    "cnName": "\u51CF\u4E03",
    "type": "chord7",
    "orderedNotesLocationList": [0, 3, 6, 9],
    "notesLocationList": [3, 6, 9, 0],
    "n3L": 6,
    "n5L": 9,
    "n7L": 0,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 3,
    "chordKey": "minmaj7",
    "cnName": "\u5C0F\u5927\u4E03",
    "type": "chord7",
    "orderedNotesLocationList": [2, 3, 6, 10],
    "notesLocationList": [3, 6, 10, 2],
    "n3L": 6,
    "n5L": 10,
    "n7L": 2,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 3,
    "chordKey": "dom7#5",
    "cnName": "\u589E\u4E03\uFF08\u5C5E\u4E03\u5347\u4E94\uFF09",
    "type": "chord7",
    "orderedNotesLocationList": [1, 3, 7, 11],
    "notesLocationList": [3, 7, 11, 1],
    "n3L": 7,
    "n5L": 11,
    "n7L": 1,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 3,
    "chordKey": "augmaj7",
    "cnName": "\u589E\u5927\u4E03",
    "type": "chord7",
    "orderedNotesLocationList": [2, 3, 7, 11],
    "notesLocationList": [3, 7, 11, 2],
    "n3L": 7,
    "n5L": 11,
    "n7L": 2,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 3,
    "chordKey": "dom7b5",
    "cnName": "\u5C5E\u4E03\u964D\u4E94",
    "type": "chord7alt",
    "orderedNotesLocationList": [1, 3, 7, 9],
    "notesLocationList": [3, 7, 9, 1],
    "n3L": 7,
    "n5L": 9,
    "n7L": 1,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 3,
    "chordKey": "dom7b9",
    "cnName": "\u5C5E\u4E03\u964D\u4E5D",
    "type": "chord7alt",
    "orderedNotesLocationList": [1, 3, 4, 7, 10],
    "notesLocationList": [3, 7, 10, 1, 4],
    "n3L": 7,
    "n5L": 10,
    "n7L": 1,
    "n9L": 4,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 3,
    "chordKey": "dom7#9",
    "cnName": "\u5C5E\u4E03\u5347\u4E5D",
    "type": "chord7alt",
    "orderedNotesLocationList": [1, 3, 6, 7, 10],
    "notesLocationList": [3, 7, 10, 1, 6],
    "n3L": 7,
    "n5L": 10,
    "n7L": 1,
    "n9L": 6,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 3,
    "chordKey": "dom7#11",
    "cnName": "\u5C5E\u4E03\u5347\u5341\u4E00",
    "type": "chord7alt",
    "orderedNotesLocationList": [1, 3, 7, 9, 10],
    "notesLocationList": [3, 7, 10, 1, 9],
    "n3L": 7,
    "n5L": 10,
    "n7L": 1,
    "n9L": -1,
    "n11L": 9,
    "n13L": -1
}, {
    "rootNoteLocation": 3,
    "chordKey": "dom7b13",
    "cnName": "\u5C5E\u4E03\u964D\u5341\u4E09",
    "type": "chord7alt",
    "orderedNotesLocationList": [1, 3, 7, 10, 11],
    "notesLocationList": [3, 7, 10, 1, 11],
    "n3L": 7,
    "n5L": 10,
    "n7L": 1,
    "n9L": -1,
    "n11L": -1,
    "n13L": 11
}, {
    "rootNoteLocation": 3,
    "chordKey": "dom7b5b9",
    "cnName": "\u5C5E\u4E03\u964D\u4E94\u964D\u4E5D",
    "type": "chord7alt",
    "orderedNotesLocationList": [1, 3, 4, 7, 9],
    "notesLocationList": [3, 7, 9, 1, 4],
    "n3L": 7,
    "n5L": 9,
    "n7L": 1,
    "n9L": 4,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 3,
    "chordKey": "dom7b5#9",
    "cnName": "\u5C5E\u4E03\u964D\u4E94\u5347\u4E5D",
    "type": "chord7alt",
    "orderedNotesLocationList": [1, 3, 6, 7, 9],
    "notesLocationList": [3, 7, 9, 1, 6],
    "n3L": 7,
    "n5L": 9,
    "n7L": 1,
    "n9L": 6,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 3,
    "chordKey": "maj7b5",
    "cnName": "\u5927\u4E03\u964D\u4E94",
    "type": "chord7alt",
    "orderedNotesLocationList": [2, 3, 7, 9],
    "notesLocationList": [3, 7, 9, 2],
    "n3L": 7,
    "n5L": 9,
    "n7L": 2,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 3,
    "chordKey": "maj7#5",
    "cnName": "\u5927\u4E03\u589E\u4E94",
    "type": "chord7alt",
    "orderedNotesLocationList": [2, 3, 7, 11],
    "notesLocationList": [3, 7, 11, 2],
    "n3L": 7,
    "n5L": 11,
    "n7L": 2,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 3,
    "chordKey": "maj7b9",
    "cnName": "\u5927\u4E03\u964D\u4E5D",
    "type": "chord7alt",
    "orderedNotesLocationList": [2, 3, 4, 7, 10],
    "notesLocationList": [3, 7, 10, 2, 4],
    "n3L": 7,
    "n5L": 10,
    "n7L": 2,
    "n9L": 4,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 3,
    "chordKey": "maj7b13",
    "cnName": "\u5927\u4E03\u964D\u5341\u4E09",
    "type": "chord7alt",
    "orderedNotesLocationList": [2, 3, 7, 10, 11],
    "notesLocationList": [3, 7, 10, 2, 11],
    "n3L": 7,
    "n5L": 10,
    "n7L": 2,
    "n9L": -1,
    "n11L": -1,
    "n13L": 11
}, {
    "rootNoteLocation": 3,
    "chordKey": "maj7#11",
    "cnName": "\u5927\u4E03\u5347\u5341\u4E00",
    "type": "chord7alt",
    "orderedNotesLocationList": [2, 3, 7, 9, 10],
    "notesLocationList": [3, 7, 10, 2, 9],
    "n3L": 7,
    "n5L": 10,
    "n7L": 2,
    "n9L": -1,
    "n11L": 9,
    "n13L": -1
}, {
    "rootNoteLocation": 3,
    "chordKey": "min7#5",
    "cnName": "\u5C0F\u4E03\u5347\u4E94",
    "type": "chord7alt",
    "orderedNotesLocationList": [1, 3, 6, 11],
    "notesLocationList": [3, 6, 11, 1],
    "n3L": 6,
    "n5L": 11,
    "n7L": 1,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 3,
    "chordKey": "minmaj7b5",
    "cnName": "\u5C0F\u5927\u4E03\u964D\u4E94",
    "type": "chord7alt",
    "orderedNotesLocationList": [2, 3, 6, 9],
    "notesLocationList": [3, 6, 9, 2],
    "n3L": 6,
    "n5L": 9,
    "n7L": 2,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 3,
    "chordKey": "minmaj7#5",
    "cnName": "\u5C0F\u5927\u4E03\u5347\u4E94",
    "type": "chord7alt",
    "orderedNotesLocationList": [2, 3, 6, 11],
    "notesLocationList": [3, 6, 11, 2],
    "n3L": 6,
    "n5L": 11,
    "n7L": 2,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 3,
    "chordKey": "dom7#5b9",
    "cnName": "\u589E\u4E03\u964D\u4E5D\uFF08\u5C5E\u4E03\u5347\u4E94\u964D\u4E5D\uFF09",
    "type": "chord7alt",
    "orderedNotesLocationList": [1, 3, 4, 7, 11],
    "notesLocationList": [3, 7, 11, 1, 4],
    "n3L": 7,
    "n5L": 11,
    "n7L": 1,
    "n9L": 4,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 3,
    "chordKey": "dom7#5#9",
    "cnName": "\u589E\u4E03\u5347\u4E5D\uFF08\u5C5E\u4E03\u5347\u4E94\u5347\u4E5D\uFF09",
    "type": "chord7alt",
    "orderedNotesLocationList": [1, 3, 6, 7, 11],
    "notesLocationList": [3, 7, 11, 1, 6],
    "n3L": 7,
    "n5L": 11,
    "n7L": 1,
    "n9L": 6,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 3,
    "chordKey": "sus2",
    "cnName": "\u6302\u4E8C",
    "type": "sus",
    "orderedNotesLocationList": [3, 5, 10],
    "notesLocationList": [3, 5, 10],
    "n3L": -1,
    "n5L": 10,
    "n7L": -1,
    "n9L": 5,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 3,
    "chordKey": "sus4",
    "cnName": "\u6302\u56DB",
    "type": "sus",
    "orderedNotesLocationList": [3, 8, 10],
    "notesLocationList": [3, 8, 10],
    "n3L": -1,
    "n5L": 10,
    "n7L": -1,
    "n9L": -1,
    "n11L": 8,
    "n13L": -1
}, {
    "rootNoteLocation": 3,
    "chordKey": "dom7sus2",
    "cnName": "\u5C5E\u4E03\u6302\u4E8C",
    "type": "sus",
    "orderedNotesLocationList": [1, 3, 5, 10],
    "notesLocationList": [3, 5, 10, 1],
    "n3L": -1,
    "n5L": 10,
    "n7L": 1,
    "n9L": 5,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 3,
    "chordKey": "dom7sus4",
    "cnName": "\u5C5E\u4E03\u6302\u56DB",
    "type": "sus",
    "orderedNotesLocationList": [1, 3, 8, 10],
    "notesLocationList": [3, 8, 10, 1],
    "n3L": -1,
    "n5L": 10,
    "n7L": 1,
    "n9L": -1,
    "n11L": 8,
    "n13L": -1
}, {
    "rootNoteLocation": 3,
    "chordKey": "maj7sus2",
    "cnName": "\u5927\u4E03\u6302\u4E8C",
    "type": "sus",
    "orderedNotesLocationList": [2, 3, 5, 10],
    "notesLocationList": [3, 5, 10, 2],
    "n3L": -1,
    "n5L": 10,
    "n7L": 2,
    "n9L": 5,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 3,
    "chordKey": "maj7sus4",
    "cnName": "\u5927\u4E03\u6302\u56DB",
    "type": "sus",
    "orderedNotesLocationList": [2, 3, 8, 10],
    "notesLocationList": [3, 8, 10, 2],
    "n3L": -1,
    "n5L": 10,
    "n7L": 2,
    "n9L": -1,
    "n11L": 8,
    "n13L": -1
}, {
    "rootNoteLocation": 3,
    "chordKey": "dom9sus4",
    "cnName": "\u5C5E\u4E5D\u6302\u56DB",
    "type": "sus",
    "orderedNotesLocationList": [1, 3, 5, 8, 10],
    "notesLocationList": [3, 8, 10, 1, 5],
    "n3L": -1,
    "n5L": 10,
    "n7L": 1,
    "n9L": 5,
    "n11L": 8,
    "n13L": -1
}, {
    "rootNoteLocation": 3,
    "chordKey": "maj9sus4",
    "cnName": "\u5927\u4E5D\u6302\u56DB",
    "type": "sus",
    "orderedNotesLocationList": [2, 3, 5, 8, 10],
    "notesLocationList": [3, 8, 10, 2, 5],
    "n3L": -1,
    "n5L": 10,
    "n7L": 2,
    "n9L": 5,
    "n11L": 8,
    "n13L": -1
}, {
    "rootNoteLocation": 3,
    "chordKey": "dom13sus4",
    "cnName": "\u5C5E\u5341\u4E09\u6302\u56DB",
    "type": "sus",
    "orderedNotesLocationList": [0, 1, 3, 5, 8, 10],
    "notesLocationList": [3, 8, 10, 1, 5, 0],
    "n3L": -1,
    "n5L": 10,
    "n7L": 1,
    "n9L": 5,
    "n11L": 8,
    "n13L": 0
}, {
    "rootNoteLocation": 3,
    "chordKey": "maj13sus4",
    "cnName": "\u5927\u5341\u4E09\u6302\u56DB",
    "type": "sus",
    "orderedNotesLocationList": [0, 2, 3, 5, 8, 10],
    "notesLocationList": [3, 8, 10, 2, 5, 0],
    "n3L": -1,
    "n5L": 10,
    "n7L": 2,
    "n9L": 5,
    "n11L": 8,
    "n13L": 0
}, {
    "rootNoteLocation": 3,
    "chordKey": "maj13sus2",
    "cnName": "\u5927\u5341\u4E09\u6302\u4E8C",
    "type": "sus",
    "orderedNotesLocationList": [0, 2, 3, 5, 10],
    "notesLocationList": [3, 5, 10, 2, 0],
    "n3L": -1,
    "n5L": 10,
    "n7L": 2,
    "n9L": 5,
    "n11L": -1,
    "n13L": 0
}, {
    "rootNoteLocation": 3,
    "chordKey": "maj9",
    "cnName": "\u5927\u4E5D",
    "type": "chord9",
    "orderedNotesLocationList": [2, 3, 5, 7, 10],
    "notesLocationList": [3, 7, 10, 2, 5],
    "n3L": 7,
    "n5L": 10,
    "n7L": 2,
    "n9L": 5,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 3,
    "chordKey": "dom9",
    "cnName": "\u5C5E\u4E5D",
    "type": "chord9",
    "orderedNotesLocationList": [1, 3, 5, 7, 10],
    "notesLocationList": [3, 7, 10, 1, 5],
    "n3L": 7,
    "n5L": 10,
    "n7L": 1,
    "n9L": 5,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 3,
    "chordKey": "min9",
    "cnName": "\u5C0F\u4E5D",
    "type": "chord9",
    "orderedNotesLocationList": [1, 3, 5, 6, 10],
    "notesLocationList": [3, 6, 10, 1, 5],
    "n3L": 6,
    "n5L": 10,
    "n7L": 1,
    "n9L": 5,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 3,
    "chordKey": "minmaj9",
    "cnName": "\u5C0F\u5927\u4E5D",
    "type": "chord9",
    "orderedNotesLocationList": [2, 3, 5, 6, 10],
    "notesLocationList": [3, 6, 10, 2, 5],
    "n3L": 6,
    "n5L": 10,
    "n7L": 2,
    "n9L": 5,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 3,
    "chordKey": "dom9#5",
    "cnName": "\u589E\u4E5D\uFF08\u5C5E\u4E5D\u5347\u4E94\uFF09",
    "type": "chord9",
    "orderedNotesLocationList": [1, 3, 5, 7, 11],
    "notesLocationList": [3, 7, 11, 1, 5],
    "n3L": 7,
    "n5L": 11,
    "n7L": 1,
    "n9L": 5,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 3,
    "chordKey": "dom9b9",
    "cnName": "\u5C5E\u4E5D\u964D\u4E5D",
    "type": "chord9",
    "orderedNotesLocationList": [1, 3, 4, 7, 10],
    "notesLocationList": [3, 7, 10, 1, 4],
    "n3L": 7,
    "n5L": 10,
    "n7L": 1,
    "n9L": 4,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 3,
    "chordKey": "dom9b11",
    "cnName": "\u5C5E\u4E5D\u964D\u5341\u4E00",
    "type": "chord9",
    "orderedNotesLocationList": [1, 3, 5, 7, 7, 10],
    "notesLocationList": [3, 7, 10, 1, 5, 7],
    "n3L": 7,
    "n5L": 10,
    "n7L": 1,
    "n9L": 5,
    "n11L": 7,
    "n13L": -1
}, {
    "rootNoteLocation": 3,
    "chordKey": "dom9#11",
    "cnName": "\u5C5E\u4E5D\u5347\u5341\u4E00",
    "type": "chord9",
    "orderedNotesLocationList": [1, 3, 5, 7, 9, 10],
    "notesLocationList": [3, 7, 10, 1, 5, 9],
    "n3L": 7,
    "n5L": 10,
    "n7L": 1,
    "n9L": 5,
    "n11L": 9,
    "n13L": -1
}, {
    "rootNoteLocation": 3,
    "chordKey": "dom9b13",
    "cnName": "\u5C5E\u4E5D\u964D\u5341\u4E09",
    "type": "chord9",
    "orderedNotesLocationList": [1, 3, 5, 7, 10, 11],
    "notesLocationList": [3, 7, 10, 1, 5, 11],
    "n3L": 7,
    "n5L": 10,
    "n7L": 1,
    "n9L": 5,
    "n11L": -1,
    "n13L": 11
}, {
    "rootNoteLocation": 3,
    "chordKey": "maj9b5",
    "cnName": "\u5927\u4E5D\u964D\u4E94",
    "type": "chord9",
    "orderedNotesLocationList": [2, 3, 5, 7, 9],
    "notesLocationList": [3, 7, 9, 2, 5],
    "n3L": 7,
    "n5L": 9,
    "n7L": 2,
    "n9L": 5,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 3,
    "chordKey": "maj9#5",
    "cnName": "\u5927\u4E5D\u5347\u4E94",
    "type": "chord9",
    "orderedNotesLocationList": [2, 3, 5, 7, 11],
    "notesLocationList": [3, 7, 11, 2, 5],
    "n3L": 7,
    "n5L": 11,
    "n7L": 2,
    "n9L": 5,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 3,
    "chordKey": "maj9#11",
    "cnName": "\u5927\u4E5D\u5347\u5341\u4E00",
    "type": "chord9",
    "orderedNotesLocationList": [2, 3, 5, 7, 9, 10],
    "notesLocationList": [3, 7, 10, 2, 5, 9],
    "n3L": 7,
    "n5L": 10,
    "n7L": 2,
    "n9L": 5,
    "n11L": 9,
    "n13L": -1
}, {
    "rootNoteLocation": 3,
    "chordKey": "maj9b13",
    "cnName": "\u5927\u4E5D\u964D\u5341\u4E09",
    "type": "chord9",
    "orderedNotesLocationList": [2, 3, 5, 7, 9, 11],
    "notesLocationList": [3, 7, 9, 2, 5, 11],
    "n3L": 7,
    "n5L": 9,
    "n7L": 2,
    "n9L": 5,
    "n11L": -1,
    "n13L": 11
}, {
    "rootNoteLocation": 3,
    "chordKey": "min9b5",
    "cnName": "\u5C0F\u4E5D\u964D\u4E94",
    "type": "chord9",
    "orderedNotesLocationList": [1, 3, 5, 6, 9],
    "notesLocationList": [3, 6, 9, 1, 5],
    "n3L": 6,
    "n5L": 9,
    "n7L": 1,
    "n9L": 5,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 3,
    "chordKey": "min9b9",
    "cnName": "\u5C0F\u4E5D\u964D\u4E5D",
    "type": "chord9",
    "orderedNotesLocationList": [1, 3, 4, 6, 10],
    "notesLocationList": [3, 6, 10, 1, 4],
    "n3L": 6,
    "n5L": 10,
    "n7L": 1,
    "n9L": 4,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 3,
    "chordKey": "maj11",
    "cnName": "\u5927\u5341\u4E00",
    "type": "chord11",
    "orderedNotesLocationList": [2, 3, 5, 7, 8, 10],
    "notesLocationList": [3, 7, 10, 2, 5, 8],
    "n3L": 7,
    "n5L": 10,
    "n7L": 2,
    "n9L": 5,
    "n11L": 8,
    "n13L": -1
}, {
    "rootNoteLocation": 3,
    "chordKey": "dom11",
    "cnName": "\u5C5E\u5341\u4E00",
    "type": "chord11",
    "orderedNotesLocationList": [1, 3, 5, 7, 8, 10],
    "notesLocationList": [3, 7, 10, 1, 5, 8],
    "n3L": 7,
    "n5L": 10,
    "n7L": 1,
    "n9L": 5,
    "n11L": 8,
    "n13L": -1
}, {
    "rootNoteLocation": 3,
    "chordKey": "min11",
    "cnName": "\u5C0F\u5341\u4E00",
    "type": "chord11",
    "orderedNotesLocationList": [1, 3, 5, 6, 8, 10],
    "notesLocationList": [3, 6, 10, 1, 5, 8],
    "n3L": 6,
    "n5L": 10,
    "n7L": 1,
    "n9L": 5,
    "n11L": 8,
    "n13L": -1
}, {
    "rootNoteLocation": 3,
    "chordKey": "minmaj11",
    "cnName": "\u5C0F\u5927\u5341\u4E00",
    "type": "chord11",
    "orderedNotesLocationList": [2, 3, 5, 6, 8, 10],
    "notesLocationList": [3, 6, 10, 2, 5, 8],
    "n3L": 6,
    "n5L": 10,
    "n7L": 2,
    "n9L": 5,
    "n11L": 8,
    "n13L": -1
}, {
    "rootNoteLocation": 3,
    "chordKey": "dom11b5",
    "cnName": "\u5C5E\u5341\u4E00\u964D\u4E94",
    "type": "chord11",
    "orderedNotesLocationList": [1, 3, 5, 7, 8, 9],
    "notesLocationList": [3, 7, 9, 1, 5, 8],
    "n3L": 7,
    "n5L": 9,
    "n7L": 1,
    "n9L": 5,
    "n11L": 8,
    "n13L": -1
}, {
    "rootNoteLocation": 3,
    "chordKey": "dom11#5",
    "cnName": "\u5C5E\u5341\u4E00\u5347\u4E94",
    "type": "chord11",
    "orderedNotesLocationList": [1, 3, 5, 7, 8, 11],
    "notesLocationList": [3, 7, 11, 1, 5, 8],
    "n3L": 7,
    "n5L": 11,
    "n7L": 1,
    "n9L": 5,
    "n11L": 8,
    "n13L": -1
}, {
    "rootNoteLocation": 3,
    "chordKey": "dom11b9",
    "cnName": "\u5C5E\u5341\u4E00\u964D\u4E5D",
    "type": "chord11",
    "orderedNotesLocationList": [1, 3, 4, 7, 8, 10],
    "notesLocationList": [3, 7, 10, 1, 4, 8],
    "n3L": 7,
    "n5L": 10,
    "n7L": 1,
    "n9L": 4,
    "n11L": 8,
    "n13L": -1
}, {
    "rootNoteLocation": 3,
    "chordKey": "dom11#9",
    "cnName": "\u5C5E\u5341\u4E00\u5347\u4E5D",
    "type": "chord11",
    "orderedNotesLocationList": [1, 3, 6, 7, 8, 10],
    "notesLocationList": [3, 7, 10, 1, 6, 8],
    "n3L": 7,
    "n5L": 10,
    "n7L": 1,
    "n9L": 6,
    "n11L": 8,
    "n13L": -1
}, {
    "rootNoteLocation": 3,
    "chordKey": "dom11b13",
    "cnName": "\u5C5E\u5341\u4E00\u964D\u5341\u4E09",
    "type": "chord11",
    "orderedNotesLocationList": [1, 3, 5, 7, 8, 10, 11],
    "notesLocationList": [3, 7, 10, 1, 5, 8, 11],
    "n3L": 7,
    "n5L": 10,
    "n7L": 1,
    "n9L": 5,
    "n11L": 8,
    "n13L": 11
}, {
    "rootNoteLocation": 3,
    "chordKey": "min11b5",
    "cnName": "\u5C0F\u5341\u4E00\u964D\u4E94",
    "type": "chord11",
    "orderedNotesLocationList": [1, 3, 5, 6, 8, 9],
    "notesLocationList": [3, 6, 9, 1, 5, 8],
    "n3L": 6,
    "n5L": 9,
    "n7L": 1,
    "n9L": 5,
    "n11L": 8,
    "n13L": -1
}, {
    "rootNoteLocation": 3,
    "chordKey": "maj13",
    "cnName": "\u5927\u5341\u4E09",
    "type": "chord13",
    "orderedNotesLocationList": [0, 2, 3, 5, 7, 8, 10],
    "notesLocationList": [3, 7, 10, 2, 5, 8, 0],
    "n3L": 7,
    "n5L": 10,
    "n7L": 2,
    "n9L": 5,
    "n11L": 8,
    "n13L": 0
}, {
    "rootNoteLocation": 3,
    "chordKey": "dom13",
    "cnName": "\u5C5E\u5341\u4E09",
    "type": "chord13",
    "orderedNotesLocationList": [0, 1, 3, 5, 7, 8, 10],
    "notesLocationList": [3, 7, 10, 1, 5, 8, 0],
    "n3L": 7,
    "n5L": 10,
    "n7L": 1,
    "n9L": 5,
    "n11L": 8,
    "n13L": 0
}, {
    "rootNoteLocation": 3,
    "chordKey": "min13",
    "cnName": "\u5C0F\u5341\u4E09",
    "type": "chord13",
    "orderedNotesLocationList": [0, 1, 3, 5, 6, 8, 10],
    "notesLocationList": [3, 6, 10, 1, 5, 8, 0],
    "n3L": 6,
    "n5L": 10,
    "n7L": 1,
    "n9L": 5,
    "n11L": 8,
    "n13L": 0
}, {
    "rootNoteLocation": 3,
    "chordKey": "minmaj13",
    "cnName": "\u5C0F\u5927\u5341\u4E09",
    "type": "chord13",
    "orderedNotesLocationList": [0, 2, 3, 5, 6, 8, 10],
    "notesLocationList": [3, 6, 10, 2, 5, 8, 0],
    "n3L": 6,
    "n5L": 10,
    "n7L": 2,
    "n9L": 5,
    "n11L": 8,
    "n13L": 0
}, {
    "rootNoteLocation": 3,
    "chordKey": "dom13b5",
    "cnName": "\u5C5E\u5341\u4E09\u964D\u4E94",
    "type": "chord13",
    "orderedNotesLocationList": [0, 1, 3, 5, 7, 8, 9],
    "notesLocationList": [3, 7, 9, 1, 5, 8, 0],
    "n3L": 7,
    "n5L": 9,
    "n7L": 1,
    "n9L": 5,
    "n11L": 8,
    "n13L": 0
}, {
    "rootNoteLocation": 3,
    "chordKey": "dom13#5",
    "cnName": "\u5C5E\u5341\u4E09\u5347\u4E94",
    "type": "chord13",
    "orderedNotesLocationList": [0, 1, 3, 5, 7, 8, 11],
    "notesLocationList": [3, 7, 11, 1, 5, 8, 0],
    "n3L": 7,
    "n5L": 11,
    "n7L": 1,
    "n9L": 5,
    "n11L": 8,
    "n13L": 0
}, {
    "rootNoteLocation": 3,
    "chordKey": "dom13b9",
    "cnName": "\u5C5E\u5341\u4E09\u964D\u4E5D",
    "type": "chord13",
    "orderedNotesLocationList": [0, 1, 3, 4, 7, 8, 10],
    "notesLocationList": [3, 7, 10, 1, 4, 8, 0],
    "n3L": 7,
    "n5L": 10,
    "n7L": 1,
    "n9L": 4,
    "n11L": 8,
    "n13L": 0
}, {
    "rootNoteLocation": 3,
    "chordKey": "dom13#9",
    "cnName": "\u5C5E\u5341\u4E09\u5347\u4E5D",
    "type": "chord13",
    "orderedNotesLocationList": [0, 1, 3, 6, 7, 10],
    "notesLocationList": [3, 7, 10, 1, 6, 0],
    "n3L": 7,
    "n5L": 10,
    "n7L": 1,
    "n9L": 6,
    "n11L": -1,
    "n13L": 0
}, {
    "rootNoteLocation": 3,
    "chordKey": "dom13#11",
    "cnName": "\u5C5E\u5341\u4E09\u5347\u5341\u4E00",
    "type": "chord13",
    "orderedNotesLocationList": [0, 1, 3, 5, 7, 9, 10],
    "notesLocationList": [3, 7, 10, 1, 5, 9, 0],
    "n3L": 7,
    "n5L": 10,
    "n7L": 1,
    "n9L": 5,
    "n11L": 9,
    "n13L": 0
}, {
    "rootNoteLocation": 3,
    "chordKey": "maj13b5",
    "cnName": "\u5927\u5341\u4E09\u964D\u4E94",
    "type": "chord13",
    "orderedNotesLocationList": [0, 2, 3, 5, 7, 9],
    "notesLocationList": [3, 7, 9, 2, 5, 0],
    "n3L": 7,
    "n5L": 9,
    "n7L": 2,
    "n9L": 5,
    "n11L": -1,
    "n13L": 0
}, {
    "rootNoteLocation": 3,
    "chordKey": "maj13#5",
    "cnName": "\u5927\u5341\u4E09\u5347\u4E94",
    "type": "chord13",
    "orderedNotesLocationList": [0, 2, 3, 5, 7, 11],
    "notesLocationList": [3, 7, 11, 2, 5, 0],
    "n3L": 7,
    "n5L": 11,
    "n7L": 2,
    "n9L": 5,
    "n11L": -1,
    "n13L": 0
}, {
    "rootNoteLocation": 3,
    "chordKey": "maj13b9",
    "cnName": "\u5927\u5341\u4E09\u964D\u4E5D",
    "type": "chord13",
    "orderedNotesLocationList": [0, 2, 3, 4, 7, 10],
    "notesLocationList": [3, 7, 10, 2, 4, 0],
    "n3L": 7,
    "n5L": 10,
    "n7L": 2,
    "n9L": 4,
    "n11L": -1,
    "n13L": 0
}, {
    "rootNoteLocation": 3,
    "chordKey": "maj13#11",
    "cnName": "\u5927\u5341\u4E09\u5347\u5341\u4E00",
    "type": "chord13",
    "orderedNotesLocationList": [0, 2, 3, 5, 7, 9, 10],
    "notesLocationList": [3, 7, 10, 2, 5, 9, 0],
    "n3L": 7,
    "n5L": 10,
    "n7L": 2,
    "n9L": 5,
    "n11L": 9,
    "n13L": 0
}, {
    "rootNoteLocation": 4,
    "chordKey": "maj3",
    "cnName": "\u5927\u4E09",
    "type": "chord3",
    "orderedNotesLocationList": [4, 8, 11],
    "notesLocationList": [4, 8, 11],
    "n3L": 8,
    "n5L": 11,
    "n7L": -1,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 4,
    "chordKey": "min3",
    "cnName": "\u5C0F\u4E09",
    "type": "chord3",
    "orderedNotesLocationList": [4, 7, 11],
    "notesLocationList": [4, 7, 11],
    "n3L": 7,
    "n5L": 11,
    "n7L": -1,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 4,
    "chordKey": "dim3",
    "cnName": "\u51CF\u4E09",
    "type": "chord3",
    "orderedNotesLocationList": [4, 7, 10],
    "notesLocationList": [4, 7, 10],
    "n3L": 7,
    "n5L": 10,
    "n7L": -1,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 4,
    "chordKey": "aug3",
    "cnName": "\u589E\u4E09",
    "type": "chord3",
    "orderedNotesLocationList": [0, 4, 8],
    "notesLocationList": [4, 8, 0],
    "n3L": 8,
    "n5L": 0,
    "n7L": -1,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 4,
    "chordKey": "maj3b5",
    "cnName": "\u5927\u4E09\u51CF\u4E94",
    "type": "chord3",
    "orderedNotesLocationList": [4, 8, 10],
    "notesLocationList": [4, 8, 10],
    "n3L": 8,
    "n5L": 10,
    "n7L": -1,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 4,
    "chordKey": "maj3add6",
    "cnName": "\u5927\u516D\uFF08\u5927\u4E09\u52A0\u5341\u4E09\u97F3\uFF09",
    "type": "add",
    "orderedNotesLocationList": [1, 4, 8, 11],
    "notesLocationList": [4, 8, 11, 1],
    "n3L": 8,
    "n5L": 11,
    "n7L": -1,
    "n9L": -1,
    "n11L": -1,
    "n13L": 1
}, {
    "rootNoteLocation": 4,
    "chordKey": "min3add6",
    "cnName": "\u5C0F\u516D\uFF08\u5C0F\u4E09\u52A0\u5341\u4E09\u97F3\uFF09",
    "type": "add",
    "orderedNotesLocationList": [0, 4, 7, 11],
    "notesLocationList": [4, 7, 11, 0],
    "n3L": 7,
    "n5L": 11,
    "n7L": -1,
    "n9L": -1,
    "n11L": -1,
    "n13L": 0
}, {
    "rootNoteLocation": 4,
    "chordKey": "maj3add6add9",
    "cnName": "\u516D\u4E5D",
    "type": "add",
    "orderedNotesLocationList": [1, 4, 6, 8, 11],
    "notesLocationList": [4, 8, 11, 1, 6],
    "n3L": 8,
    "n5L": 11,
    "n7L": -1,
    "n9L": 6,
    "n11L": -1,
    "n13L": 1
}, {
    "rootNoteLocation": 4,
    "chordKey": "min3add6add9",
    "cnName": "\u5C0F\u516D\u4E5D",
    "type": "add",
    "orderedNotesLocationList": [1, 4, 6, 7, 11],
    "notesLocationList": [4, 7, 11, 1, 6],
    "n3L": 7,
    "n5L": 11,
    "n7L": -1,
    "n9L": 6,
    "n11L": -1,
    "n13L": 1
}, {
    "rootNoteLocation": 4,
    "chordKey": "maj3add9",
    "cnName": "\u5927\u4E09\u52A0\u4E5D\u97F3\uFF08\u4E8C\u97F3\uFF09",
    "type": "add",
    "orderedNotesLocationList": [4, 6, 8, 11],
    "notesLocationList": [4, 8, 11, 6],
    "n3L": 8,
    "n5L": 11,
    "n7L": -1,
    "n9L": 6,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 4,
    "chordKey": "maj3add11",
    "cnName": "\u5927\u4E09\u52A0\u5341\u4E00\u97F3\uFF08\u56DB\u97F3\uFF09",
    "type": "add",
    "orderedNotesLocationList": [4, 8, 9, 11],
    "notesLocationList": [4, 8, 11, 9],
    "n3L": 8,
    "n5L": 11,
    "n7L": -1,
    "n9L": -1,
    "n11L": 9,
    "n13L": -1
}, {
    "rootNoteLocation": 4,
    "chordKey": "min3add9",
    "cnName": "\u5C0F\u4E09\u52A0\u4E5D\u97F3\uFF08\u4E8C\u97F3\uFF09",
    "type": "add",
    "orderedNotesLocationList": [4, 6, 7, 11],
    "notesLocationList": [4, 7, 11, 6],
    "n3L": 7,
    "n5L": 11,
    "n7L": -1,
    "n9L": 6,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 4,
    "chordKey": "min3add11",
    "cnName": "\u5C0F\u4E09\u52A0\u5341\u4E00\u97F3\uFF08\u56DB\u97F3\uFF09",
    "type": "add",
    "orderedNotesLocationList": [4, 7, 9, 11],
    "notesLocationList": [4, 7, 11, 9],
    "n3L": 7,
    "n5L": 11,
    "n7L": -1,
    "n9L": -1,
    "n11L": 9,
    "n13L": -1
}, {
    "rootNoteLocation": 4,
    "chordKey": "maj7add11",
    "cnName": "\u5927\u4E03\u52A0\u5341\u4E00\u97F3\uFF08\u56DB\u97F3\uFF09",
    "type": "add",
    "orderedNotesLocationList": [3, 4, 8, 9, 11],
    "notesLocationList": [4, 8, 11, 3, 9],
    "n3L": 8,
    "n5L": 11,
    "n7L": 3,
    "n9L": -1,
    "n11L": 9,
    "n13L": -1
}, {
    "rootNoteLocation": 4,
    "chordKey": "dom7add6",
    "cnName": "\u5C5E\u4E03\u52A0\u516D\u97F3",
    "type": "add",
    "orderedNotesLocationList": [1, 2, 4, 8, 11],
    "notesLocationList": [4, 8, 11, 1, 2],
    "n3L": 8,
    "n5L": 11,
    "n7L": 2,
    "n9L": -1,
    "n11L": -1,
    "n13L": 1
}, {
    "rootNoteLocation": 4,
    "chordKey": "itaug6",
    "cnName": "\u610F\u5927\u5229\u589E\u516D",
    "type": "aug6",
    "orderedNotesLocationList": [0, 4, 10],
    "notesLocationList": [4, 10, 0],
    "n3L": -1,
    "n5L": -1,
    "n7L": -1,
    "n9L": -1,
    "n11L": 10,
    "n13L": 0
}, {
    "rootNoteLocation": 4,
    "chordKey": "fraug6",
    "cnName": "\u6CD5\u56FD\u589E\u516D",
    "type": "aug6",
    "orderedNotesLocationList": [0, 4, 6, 10],
    "notesLocationList": [4, 6, 10, 0],
    "n3L": -1,
    "n5L": -1,
    "n7L": -1,
    "n9L": 6,
    "n11L": 10,
    "n13L": 0
}, {
    "rootNoteLocation": 4,
    "chordKey": "graug6",
    "cnName": "\u5FB7\u56FD\u589E\u516D",
    "type": "aug6",
    "orderedNotesLocationList": [0, 4, 7, 10],
    "notesLocationList": [4, 7, 10, 0],
    "n3L": 7,
    "n5L": -1,
    "n7L": -1,
    "n9L": -1,
    "n11L": 10,
    "n13L": 0
}, {
    "rootNoteLocation": 4,
    "chordKey": "maj7",
    "cnName": "\u5927\u4E03",
    "type": "chord7",
    "orderedNotesLocationList": [3, 4, 8, 11],
    "notesLocationList": [4, 8, 11, 3],
    "n3L": 8,
    "n5L": 11,
    "n7L": 3,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 4,
    "chordKey": "dom7",
    "cnName": "\u5C5E\u4E03",
    "type": "chord7",
    "orderedNotesLocationList": [2, 4, 8, 11],
    "notesLocationList": [4, 8, 11, 2],
    "n3L": 8,
    "n5L": 11,
    "n7L": 2,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 4,
    "chordKey": "min7",
    "cnName": "\u5C0F\u4E03",
    "type": "chord7",
    "orderedNotesLocationList": [2, 4, 7, 11],
    "notesLocationList": [4, 7, 11, 2],
    "n3L": 7,
    "n5L": 11,
    "n7L": 2,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 4,
    "chordKey": "halfdim7",
    "cnName": "\u534A\u51CF\u4E03",
    "type": "chord7",
    "orderedNotesLocationList": [2, 4, 7, 10],
    "notesLocationList": [4, 7, 10, 2],
    "n3L": 7,
    "n5L": 10,
    "n7L": 2,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 4,
    "chordKey": "dim7",
    "cnName": "\u51CF\u4E03",
    "type": "chord7",
    "orderedNotesLocationList": [1, 4, 7, 10],
    "notesLocationList": [4, 7, 10, 1],
    "n3L": 7,
    "n5L": 10,
    "n7L": 1,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 4,
    "chordKey": "minmaj7",
    "cnName": "\u5C0F\u5927\u4E03",
    "type": "chord7",
    "orderedNotesLocationList": [3, 4, 7, 11],
    "notesLocationList": [4, 7, 11, 3],
    "n3L": 7,
    "n5L": 11,
    "n7L": 3,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 4,
    "chordKey": "dom7#5",
    "cnName": "\u589E\u4E03\uFF08\u5C5E\u4E03\u5347\u4E94\uFF09",
    "type": "chord7",
    "orderedNotesLocationList": [0, 2, 4, 8],
    "notesLocationList": [4, 8, 0, 2],
    "n3L": 8,
    "n5L": 0,
    "n7L": 2,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 4,
    "chordKey": "augmaj7",
    "cnName": "\u589E\u5927\u4E03",
    "type": "chord7",
    "orderedNotesLocationList": [0, 3, 4, 8],
    "notesLocationList": [4, 8, 0, 3],
    "n3L": 8,
    "n5L": 0,
    "n7L": 3,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 4,
    "chordKey": "dom7b5",
    "cnName": "\u5C5E\u4E03\u964D\u4E94",
    "type": "chord7alt",
    "orderedNotesLocationList": [2, 4, 8, 10],
    "notesLocationList": [4, 8, 10, 2],
    "n3L": 8,
    "n5L": 10,
    "n7L": 2,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 4,
    "chordKey": "dom7b9",
    "cnName": "\u5C5E\u4E03\u964D\u4E5D",
    "type": "chord7alt",
    "orderedNotesLocationList": [2, 4, 5, 8, 11],
    "notesLocationList": [4, 8, 11, 2, 5],
    "n3L": 8,
    "n5L": 11,
    "n7L": 2,
    "n9L": 5,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 4,
    "chordKey": "dom7#9",
    "cnName": "\u5C5E\u4E03\u5347\u4E5D",
    "type": "chord7alt",
    "orderedNotesLocationList": [2, 4, 7, 8, 11],
    "notesLocationList": [4, 8, 11, 2, 7],
    "n3L": 8,
    "n5L": 11,
    "n7L": 2,
    "n9L": 7,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 4,
    "chordKey": "dom7#11",
    "cnName": "\u5C5E\u4E03\u5347\u5341\u4E00",
    "type": "chord7alt",
    "orderedNotesLocationList": [2, 4, 8, 10, 11],
    "notesLocationList": [4, 8, 11, 2, 10],
    "n3L": 8,
    "n5L": 11,
    "n7L": 2,
    "n9L": -1,
    "n11L": 10,
    "n13L": -1
}, {
    "rootNoteLocation": 4,
    "chordKey": "dom7b13",
    "cnName": "\u5C5E\u4E03\u964D\u5341\u4E09",
    "type": "chord7alt",
    "orderedNotesLocationList": [0, 2, 4, 8, 11],
    "notesLocationList": [4, 8, 11, 2, 0],
    "n3L": 8,
    "n5L": 11,
    "n7L": 2,
    "n9L": -1,
    "n11L": -1,
    "n13L": 0
}, {
    "rootNoteLocation": 4,
    "chordKey": "dom7b5b9",
    "cnName": "\u5C5E\u4E03\u964D\u4E94\u964D\u4E5D",
    "type": "chord7alt",
    "orderedNotesLocationList": [2, 4, 5, 8, 10],
    "notesLocationList": [4, 8, 10, 2, 5],
    "n3L": 8,
    "n5L": 10,
    "n7L": 2,
    "n9L": 5,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 4,
    "chordKey": "dom7b5#9",
    "cnName": "\u5C5E\u4E03\u964D\u4E94\u5347\u4E5D",
    "type": "chord7alt",
    "orderedNotesLocationList": [2, 4, 7, 8, 10],
    "notesLocationList": [4, 8, 10, 2, 7],
    "n3L": 8,
    "n5L": 10,
    "n7L": 2,
    "n9L": 7,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 4,
    "chordKey": "maj7b5",
    "cnName": "\u5927\u4E03\u964D\u4E94",
    "type": "chord7alt",
    "orderedNotesLocationList": [3, 4, 8, 10],
    "notesLocationList": [4, 8, 10, 3],
    "n3L": 8,
    "n5L": 10,
    "n7L": 3,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 4,
    "chordKey": "maj7#5",
    "cnName": "\u5927\u4E03\u589E\u4E94",
    "type": "chord7alt",
    "orderedNotesLocationList": [0, 3, 4, 8],
    "notesLocationList": [4, 8, 0, 3],
    "n3L": 8,
    "n5L": 0,
    "n7L": 3,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 4,
    "chordKey": "maj7b9",
    "cnName": "\u5927\u4E03\u964D\u4E5D",
    "type": "chord7alt",
    "orderedNotesLocationList": [3, 4, 5, 8, 11],
    "notesLocationList": [4, 8, 11, 3, 5],
    "n3L": 8,
    "n5L": 11,
    "n7L": 3,
    "n9L": 5,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 4,
    "chordKey": "maj7b13",
    "cnName": "\u5927\u4E03\u964D\u5341\u4E09",
    "type": "chord7alt",
    "orderedNotesLocationList": [0, 3, 4, 8, 11],
    "notesLocationList": [4, 8, 11, 3, 0],
    "n3L": 8,
    "n5L": 11,
    "n7L": 3,
    "n9L": -1,
    "n11L": -1,
    "n13L": 0
}, {
    "rootNoteLocation": 4,
    "chordKey": "maj7#11",
    "cnName": "\u5927\u4E03\u5347\u5341\u4E00",
    "type": "chord7alt",
    "orderedNotesLocationList": [3, 4, 8, 10, 11],
    "notesLocationList": [4, 8, 11, 3, 10],
    "n3L": 8,
    "n5L": 11,
    "n7L": 3,
    "n9L": -1,
    "n11L": 10,
    "n13L": -1
}, {
    "rootNoteLocation": 4,
    "chordKey": "min7#5",
    "cnName": "\u5C0F\u4E03\u5347\u4E94",
    "type": "chord7alt",
    "orderedNotesLocationList": [0, 2, 4, 7],
    "notesLocationList": [4, 7, 0, 2],
    "n3L": 7,
    "n5L": 0,
    "n7L": 2,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 4,
    "chordKey": "minmaj7b5",
    "cnName": "\u5C0F\u5927\u4E03\u964D\u4E94",
    "type": "chord7alt",
    "orderedNotesLocationList": [3, 4, 7, 10],
    "notesLocationList": [4, 7, 10, 3],
    "n3L": 7,
    "n5L": 10,
    "n7L": 3,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 4,
    "chordKey": "minmaj7#5",
    "cnName": "\u5C0F\u5927\u4E03\u5347\u4E94",
    "type": "chord7alt",
    "orderedNotesLocationList": [0, 3, 4, 7],
    "notesLocationList": [4, 7, 0, 3],
    "n3L": 7,
    "n5L": 0,
    "n7L": 3,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 4,
    "chordKey": "dom7#5b9",
    "cnName": "\u589E\u4E03\u964D\u4E5D\uFF08\u5C5E\u4E03\u5347\u4E94\u964D\u4E5D\uFF09",
    "type": "chord7alt",
    "orderedNotesLocationList": [0, 2, 4, 5, 8],
    "notesLocationList": [4, 8, 0, 2, 5],
    "n3L": 8,
    "n5L": 0,
    "n7L": 2,
    "n9L": 5,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 4,
    "chordKey": "dom7#5#9",
    "cnName": "\u589E\u4E03\u5347\u4E5D\uFF08\u5C5E\u4E03\u5347\u4E94\u5347\u4E5D\uFF09",
    "type": "chord7alt",
    "orderedNotesLocationList": [0, 2, 4, 7, 8],
    "notesLocationList": [4, 8, 0, 2, 7],
    "n3L": 8,
    "n5L": 0,
    "n7L": 2,
    "n9L": 7,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 4,
    "chordKey": "sus2",
    "cnName": "\u6302\u4E8C",
    "type": "sus",
    "orderedNotesLocationList": [4, 6, 11],
    "notesLocationList": [4, 6, 11],
    "n3L": -1,
    "n5L": 11,
    "n7L": -1,
    "n9L": 6,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 4,
    "chordKey": "sus4",
    "cnName": "\u6302\u56DB",
    "type": "sus",
    "orderedNotesLocationList": [4, 9, 11],
    "notesLocationList": [4, 9, 11],
    "n3L": -1,
    "n5L": 11,
    "n7L": -1,
    "n9L": -1,
    "n11L": 9,
    "n13L": -1
}, {
    "rootNoteLocation": 4,
    "chordKey": "dom7sus2",
    "cnName": "\u5C5E\u4E03\u6302\u4E8C",
    "type": "sus",
    "orderedNotesLocationList": [2, 4, 6, 11],
    "notesLocationList": [4, 6, 11, 2],
    "n3L": -1,
    "n5L": 11,
    "n7L": 2,
    "n9L": 6,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 4,
    "chordKey": "dom7sus4",
    "cnName": "\u5C5E\u4E03\u6302\u56DB",
    "type": "sus",
    "orderedNotesLocationList": [2, 4, 9, 11],
    "notesLocationList": [4, 9, 11, 2],
    "n3L": -1,
    "n5L": 11,
    "n7L": 2,
    "n9L": -1,
    "n11L": 9,
    "n13L": -1
}, {
    "rootNoteLocation": 4,
    "chordKey": "maj7sus2",
    "cnName": "\u5927\u4E03\u6302\u4E8C",
    "type": "sus",
    "orderedNotesLocationList": [3, 4, 6, 11],
    "notesLocationList": [4, 6, 11, 3],
    "n3L": -1,
    "n5L": 11,
    "n7L": 3,
    "n9L": 6,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 4,
    "chordKey": "maj7sus4",
    "cnName": "\u5927\u4E03\u6302\u56DB",
    "type": "sus",
    "orderedNotesLocationList": [3, 4, 9, 11],
    "notesLocationList": [4, 9, 11, 3],
    "n3L": -1,
    "n5L": 11,
    "n7L": 3,
    "n9L": -1,
    "n11L": 9,
    "n13L": -1
}, {
    "rootNoteLocation": 4,
    "chordKey": "dom9sus4",
    "cnName": "\u5C5E\u4E5D\u6302\u56DB",
    "type": "sus",
    "orderedNotesLocationList": [2, 4, 6, 9, 11],
    "notesLocationList": [4, 9, 11, 2, 6],
    "n3L": -1,
    "n5L": 11,
    "n7L": 2,
    "n9L": 6,
    "n11L": 9,
    "n13L": -1
}, {
    "rootNoteLocation": 4,
    "chordKey": "maj9sus4",
    "cnName": "\u5927\u4E5D\u6302\u56DB",
    "type": "sus",
    "orderedNotesLocationList": [3, 4, 6, 9, 11],
    "notesLocationList": [4, 9, 11, 3, 6],
    "n3L": -1,
    "n5L": 11,
    "n7L": 3,
    "n9L": 6,
    "n11L": 9,
    "n13L": -1
}, {
    "rootNoteLocation": 4,
    "chordKey": "dom13sus4",
    "cnName": "\u5C5E\u5341\u4E09\u6302\u56DB",
    "type": "sus",
    "orderedNotesLocationList": [1, 2, 4, 6, 9, 11],
    "notesLocationList": [4, 9, 11, 2, 6, 1],
    "n3L": -1,
    "n5L": 11,
    "n7L": 2,
    "n9L": 6,
    "n11L": 9,
    "n13L": 1
}, {
    "rootNoteLocation": 4,
    "chordKey": "maj13sus4",
    "cnName": "\u5927\u5341\u4E09\u6302\u56DB",
    "type": "sus",
    "orderedNotesLocationList": [1, 3, 4, 6, 9, 11],
    "notesLocationList": [4, 9, 11, 3, 6, 1],
    "n3L": -1,
    "n5L": 11,
    "n7L": 3,
    "n9L": 6,
    "n11L": 9,
    "n13L": 1
}, {
    "rootNoteLocation": 4,
    "chordKey": "maj13sus2",
    "cnName": "\u5927\u5341\u4E09\u6302\u4E8C",
    "type": "sus",
    "orderedNotesLocationList": [1, 3, 4, 6, 11],
    "notesLocationList": [4, 6, 11, 3, 1],
    "n3L": -1,
    "n5L": 11,
    "n7L": 3,
    "n9L": 6,
    "n11L": -1,
    "n13L": 1
}, {
    "rootNoteLocation": 4,
    "chordKey": "maj9",
    "cnName": "\u5927\u4E5D",
    "type": "chord9",
    "orderedNotesLocationList": [3, 4, 6, 8, 11],
    "notesLocationList": [4, 8, 11, 3, 6],
    "n3L": 8,
    "n5L": 11,
    "n7L": 3,
    "n9L": 6,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 4,
    "chordKey": "dom9",
    "cnName": "\u5C5E\u4E5D",
    "type": "chord9",
    "orderedNotesLocationList": [2, 4, 6, 8, 11],
    "notesLocationList": [4, 8, 11, 2, 6],
    "n3L": 8,
    "n5L": 11,
    "n7L": 2,
    "n9L": 6,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 4,
    "chordKey": "min9",
    "cnName": "\u5C0F\u4E5D",
    "type": "chord9",
    "orderedNotesLocationList": [2, 4, 6, 7, 11],
    "notesLocationList": [4, 7, 11, 2, 6],
    "n3L": 7,
    "n5L": 11,
    "n7L": 2,
    "n9L": 6,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 4,
    "chordKey": "minmaj9",
    "cnName": "\u5C0F\u5927\u4E5D",
    "type": "chord9",
    "orderedNotesLocationList": [3, 4, 6, 7, 11],
    "notesLocationList": [4, 7, 11, 3, 6],
    "n3L": 7,
    "n5L": 11,
    "n7L": 3,
    "n9L": 6,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 4,
    "chordKey": "dom9#5",
    "cnName": "\u589E\u4E5D\uFF08\u5C5E\u4E5D\u5347\u4E94\uFF09",
    "type": "chord9",
    "orderedNotesLocationList": [0, 2, 4, 6, 8],
    "notesLocationList": [4, 8, 0, 2, 6],
    "n3L": 8,
    "n5L": 0,
    "n7L": 2,
    "n9L": 6,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 4,
    "chordKey": "dom9b9",
    "cnName": "\u5C5E\u4E5D\u964D\u4E5D",
    "type": "chord9",
    "orderedNotesLocationList": [2, 4, 5, 8, 11],
    "notesLocationList": [4, 8, 11, 2, 5],
    "n3L": 8,
    "n5L": 11,
    "n7L": 2,
    "n9L": 5,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 4,
    "chordKey": "dom9b11",
    "cnName": "\u5C5E\u4E5D\u964D\u5341\u4E00",
    "type": "chord9",
    "orderedNotesLocationList": [2, 4, 6, 8, 8, 11],
    "notesLocationList": [4, 8, 11, 2, 6, 8],
    "n3L": 8,
    "n5L": 11,
    "n7L": 2,
    "n9L": 6,
    "n11L": 8,
    "n13L": -1
}, {
    "rootNoteLocation": 4,
    "chordKey": "dom9#11",
    "cnName": "\u5C5E\u4E5D\u5347\u5341\u4E00",
    "type": "chord9",
    "orderedNotesLocationList": [2, 4, 6, 8, 10, 11],
    "notesLocationList": [4, 8, 11, 2, 6, 10],
    "n3L": 8,
    "n5L": 11,
    "n7L": 2,
    "n9L": 6,
    "n11L": 10,
    "n13L": -1
}, {
    "rootNoteLocation": 4,
    "chordKey": "dom9b13",
    "cnName": "\u5C5E\u4E5D\u964D\u5341\u4E09",
    "type": "chord9",
    "orderedNotesLocationList": [0, 2, 4, 6, 8, 11],
    "notesLocationList": [4, 8, 11, 2, 6, 0],
    "n3L": 8,
    "n5L": 11,
    "n7L": 2,
    "n9L": 6,
    "n11L": -1,
    "n13L": 0
}, {
    "rootNoteLocation": 4,
    "chordKey": "maj9b5",
    "cnName": "\u5927\u4E5D\u964D\u4E94",
    "type": "chord9",
    "orderedNotesLocationList": [3, 4, 6, 8, 10],
    "notesLocationList": [4, 8, 10, 3, 6],
    "n3L": 8,
    "n5L": 10,
    "n7L": 3,
    "n9L": 6,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 4,
    "chordKey": "maj9#5",
    "cnName": "\u5927\u4E5D\u5347\u4E94",
    "type": "chord9",
    "orderedNotesLocationList": [0, 3, 4, 6, 8],
    "notesLocationList": [4, 8, 0, 3, 6],
    "n3L": 8,
    "n5L": 0,
    "n7L": 3,
    "n9L": 6,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 4,
    "chordKey": "maj9#11",
    "cnName": "\u5927\u4E5D\u5347\u5341\u4E00",
    "type": "chord9",
    "orderedNotesLocationList": [3, 4, 6, 8, 10, 11],
    "notesLocationList": [4, 8, 11, 3, 6, 10],
    "n3L": 8,
    "n5L": 11,
    "n7L": 3,
    "n9L": 6,
    "n11L": 10,
    "n13L": -1
}, {
    "rootNoteLocation": 4,
    "chordKey": "maj9b13",
    "cnName": "\u5927\u4E5D\u964D\u5341\u4E09",
    "type": "chord9",
    "orderedNotesLocationList": [0, 3, 4, 6, 8, 10],
    "notesLocationList": [4, 8, 10, 3, 6, 0],
    "n3L": 8,
    "n5L": 10,
    "n7L": 3,
    "n9L": 6,
    "n11L": -1,
    "n13L": 0
}, {
    "rootNoteLocation": 4,
    "chordKey": "min9b5",
    "cnName": "\u5C0F\u4E5D\u964D\u4E94",
    "type": "chord9",
    "orderedNotesLocationList": [2, 4, 6, 7, 10],
    "notesLocationList": [4, 7, 10, 2, 6],
    "n3L": 7,
    "n5L": 10,
    "n7L": 2,
    "n9L": 6,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 4,
    "chordKey": "min9b9",
    "cnName": "\u5C0F\u4E5D\u964D\u4E5D",
    "type": "chord9",
    "orderedNotesLocationList": [2, 4, 5, 7, 11],
    "notesLocationList": [4, 7, 11, 2, 5],
    "n3L": 7,
    "n5L": 11,
    "n7L": 2,
    "n9L": 5,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 4,
    "chordKey": "maj11",
    "cnName": "\u5927\u5341\u4E00",
    "type": "chord11",
    "orderedNotesLocationList": [3, 4, 6, 8, 9, 11],
    "notesLocationList": [4, 8, 11, 3, 6, 9],
    "n3L": 8,
    "n5L": 11,
    "n7L": 3,
    "n9L": 6,
    "n11L": 9,
    "n13L": -1
}, {
    "rootNoteLocation": 4,
    "chordKey": "dom11",
    "cnName": "\u5C5E\u5341\u4E00",
    "type": "chord11",
    "orderedNotesLocationList": [2, 4, 6, 8, 9, 11],
    "notesLocationList": [4, 8, 11, 2, 6, 9],
    "n3L": 8,
    "n5L": 11,
    "n7L": 2,
    "n9L": 6,
    "n11L": 9,
    "n13L": -1
}, {
    "rootNoteLocation": 4,
    "chordKey": "min11",
    "cnName": "\u5C0F\u5341\u4E00",
    "type": "chord11",
    "orderedNotesLocationList": [2, 4, 6, 7, 9, 11],
    "notesLocationList": [4, 7, 11, 2, 6, 9],
    "n3L": 7,
    "n5L": 11,
    "n7L": 2,
    "n9L": 6,
    "n11L": 9,
    "n13L": -1
}, {
    "rootNoteLocation": 4,
    "chordKey": "minmaj11",
    "cnName": "\u5C0F\u5927\u5341\u4E00",
    "type": "chord11",
    "orderedNotesLocationList": [3, 4, 6, 7, 9, 11],
    "notesLocationList": [4, 7, 11, 3, 6, 9],
    "n3L": 7,
    "n5L": 11,
    "n7L": 3,
    "n9L": 6,
    "n11L": 9,
    "n13L": -1
}, {
    "rootNoteLocation": 4,
    "chordKey": "dom11b5",
    "cnName": "\u5C5E\u5341\u4E00\u964D\u4E94",
    "type": "chord11",
    "orderedNotesLocationList": [2, 4, 6, 8, 9, 10],
    "notesLocationList": [4, 8, 10, 2, 6, 9],
    "n3L": 8,
    "n5L": 10,
    "n7L": 2,
    "n9L": 6,
    "n11L": 9,
    "n13L": -1
}, {
    "rootNoteLocation": 4,
    "chordKey": "dom11#5",
    "cnName": "\u5C5E\u5341\u4E00\u5347\u4E94",
    "type": "chord11",
    "orderedNotesLocationList": [0, 2, 4, 6, 8, 9],
    "notesLocationList": [4, 8, 0, 2, 6, 9],
    "n3L": 8,
    "n5L": 0,
    "n7L": 2,
    "n9L": 6,
    "n11L": 9,
    "n13L": -1
}, {
    "rootNoteLocation": 4,
    "chordKey": "dom11b9",
    "cnName": "\u5C5E\u5341\u4E00\u964D\u4E5D",
    "type": "chord11",
    "orderedNotesLocationList": [2, 4, 5, 8, 9, 11],
    "notesLocationList": [4, 8, 11, 2, 5, 9],
    "n3L": 8,
    "n5L": 11,
    "n7L": 2,
    "n9L": 5,
    "n11L": 9,
    "n13L": -1
}, {
    "rootNoteLocation": 4,
    "chordKey": "dom11#9",
    "cnName": "\u5C5E\u5341\u4E00\u5347\u4E5D",
    "type": "chord11",
    "orderedNotesLocationList": [2, 4, 7, 8, 9, 11],
    "notesLocationList": [4, 8, 11, 2, 7, 9],
    "n3L": 8,
    "n5L": 11,
    "n7L": 2,
    "n9L": 7,
    "n11L": 9,
    "n13L": -1
}, {
    "rootNoteLocation": 4,
    "chordKey": "dom11b13",
    "cnName": "\u5C5E\u5341\u4E00\u964D\u5341\u4E09",
    "type": "chord11",
    "orderedNotesLocationList": [0, 2, 4, 6, 8, 9, 11],
    "notesLocationList": [4, 8, 11, 2, 6, 9, 0],
    "n3L": 8,
    "n5L": 11,
    "n7L": 2,
    "n9L": 6,
    "n11L": 9,
    "n13L": 0
}, {
    "rootNoteLocation": 4,
    "chordKey": "min11b5",
    "cnName": "\u5C0F\u5341\u4E00\u964D\u4E94",
    "type": "chord11",
    "orderedNotesLocationList": [2, 4, 6, 7, 9, 10],
    "notesLocationList": [4, 7, 10, 2, 6, 9],
    "n3L": 7,
    "n5L": 10,
    "n7L": 2,
    "n9L": 6,
    "n11L": 9,
    "n13L": -1
}, {
    "rootNoteLocation": 4,
    "chordKey": "maj13",
    "cnName": "\u5927\u5341\u4E09",
    "type": "chord13",
    "orderedNotesLocationList": [1, 3, 4, 6, 8, 9, 11],
    "notesLocationList": [4, 8, 11, 3, 6, 9, 1],
    "n3L": 8,
    "n5L": 11,
    "n7L": 3,
    "n9L": 6,
    "n11L": 9,
    "n13L": 1
}, {
    "rootNoteLocation": 4,
    "chordKey": "dom13",
    "cnName": "\u5C5E\u5341\u4E09",
    "type": "chord13",
    "orderedNotesLocationList": [1, 2, 4, 6, 8, 9, 11],
    "notesLocationList": [4, 8, 11, 2, 6, 9, 1],
    "n3L": 8,
    "n5L": 11,
    "n7L": 2,
    "n9L": 6,
    "n11L": 9,
    "n13L": 1
}, {
    "rootNoteLocation": 4,
    "chordKey": "min13",
    "cnName": "\u5C0F\u5341\u4E09",
    "type": "chord13",
    "orderedNotesLocationList": [1, 2, 4, 6, 7, 9, 11],
    "notesLocationList": [4, 7, 11, 2, 6, 9, 1],
    "n3L": 7,
    "n5L": 11,
    "n7L": 2,
    "n9L": 6,
    "n11L": 9,
    "n13L": 1
}, {
    "rootNoteLocation": 4,
    "chordKey": "minmaj13",
    "cnName": "\u5C0F\u5927\u5341\u4E09",
    "type": "chord13",
    "orderedNotesLocationList": [1, 3, 4, 6, 7, 9, 11],
    "notesLocationList": [4, 7, 11, 3, 6, 9, 1],
    "n3L": 7,
    "n5L": 11,
    "n7L": 3,
    "n9L": 6,
    "n11L": 9,
    "n13L": 1
}, {
    "rootNoteLocation": 4,
    "chordKey": "dom13b5",
    "cnName": "\u5C5E\u5341\u4E09\u964D\u4E94",
    "type": "chord13",
    "orderedNotesLocationList": [1, 2, 4, 6, 8, 9, 10],
    "notesLocationList": [4, 8, 10, 2, 6, 9, 1],
    "n3L": 8,
    "n5L": 10,
    "n7L": 2,
    "n9L": 6,
    "n11L": 9,
    "n13L": 1
}, {
    "rootNoteLocation": 4,
    "chordKey": "dom13#5",
    "cnName": "\u5C5E\u5341\u4E09\u5347\u4E94",
    "type": "chord13",
    "orderedNotesLocationList": [0, 1, 2, 4, 6, 8, 9],
    "notesLocationList": [4, 8, 0, 2, 6, 9, 1],
    "n3L": 8,
    "n5L": 0,
    "n7L": 2,
    "n9L": 6,
    "n11L": 9,
    "n13L": 1
}, {
    "rootNoteLocation": 4,
    "chordKey": "dom13b9",
    "cnName": "\u5C5E\u5341\u4E09\u964D\u4E5D",
    "type": "chord13",
    "orderedNotesLocationList": [1, 2, 4, 5, 8, 9, 11],
    "notesLocationList": [4, 8, 11, 2, 5, 9, 1],
    "n3L": 8,
    "n5L": 11,
    "n7L": 2,
    "n9L": 5,
    "n11L": 9,
    "n13L": 1
}, {
    "rootNoteLocation": 4,
    "chordKey": "dom13#9",
    "cnName": "\u5C5E\u5341\u4E09\u5347\u4E5D",
    "type": "chord13",
    "orderedNotesLocationList": [1, 2, 4, 7, 8, 11],
    "notesLocationList": [4, 8, 11, 2, 7, 1],
    "n3L": 8,
    "n5L": 11,
    "n7L": 2,
    "n9L": 7,
    "n11L": -1,
    "n13L": 1
}, {
    "rootNoteLocation": 4,
    "chordKey": "dom13#11",
    "cnName": "\u5C5E\u5341\u4E09\u5347\u5341\u4E00",
    "type": "chord13",
    "orderedNotesLocationList": [1, 2, 4, 6, 8, 10, 11],
    "notesLocationList": [4, 8, 11, 2, 6, 10, 1],
    "n3L": 8,
    "n5L": 11,
    "n7L": 2,
    "n9L": 6,
    "n11L": 10,
    "n13L": 1
}, {
    "rootNoteLocation": 4,
    "chordKey": "maj13b5",
    "cnName": "\u5927\u5341\u4E09\u964D\u4E94",
    "type": "chord13",
    "orderedNotesLocationList": [1, 3, 4, 6, 8, 10],
    "notesLocationList": [4, 8, 10, 3, 6, 1],
    "n3L": 8,
    "n5L": 10,
    "n7L": 3,
    "n9L": 6,
    "n11L": -1,
    "n13L": 1
}, {
    "rootNoteLocation": 4,
    "chordKey": "maj13#5",
    "cnName": "\u5927\u5341\u4E09\u5347\u4E94",
    "type": "chord13",
    "orderedNotesLocationList": [0, 1, 3, 4, 6, 8],
    "notesLocationList": [4, 8, 0, 3, 6, 1],
    "n3L": 8,
    "n5L": 0,
    "n7L": 3,
    "n9L": 6,
    "n11L": -1,
    "n13L": 1
}, {
    "rootNoteLocation": 4,
    "chordKey": "maj13b9",
    "cnName": "\u5927\u5341\u4E09\u964D\u4E5D",
    "type": "chord13",
    "orderedNotesLocationList": [1, 3, 4, 5, 8, 11],
    "notesLocationList": [4, 8, 11, 3, 5, 1],
    "n3L": 8,
    "n5L": 11,
    "n7L": 3,
    "n9L": 5,
    "n11L": -1,
    "n13L": 1
}, {
    "rootNoteLocation": 4,
    "chordKey": "maj13#11",
    "cnName": "\u5927\u5341\u4E09\u5347\u5341\u4E00",
    "type": "chord13",
    "orderedNotesLocationList": [1, 3, 4, 6, 8, 10, 11],
    "notesLocationList": [4, 8, 11, 3, 6, 10, 1],
    "n3L": 8,
    "n5L": 11,
    "n7L": 3,
    "n9L": 6,
    "n11L": 10,
    "n13L": 1
}, {
    "rootNoteLocation": 5,
    "chordKey": "maj3",
    "cnName": "\u5927\u4E09",
    "type": "chord3",
    "orderedNotesLocationList": [0, 5, 9],
    "notesLocationList": [5, 9, 0],
    "n3L": 9,
    "n5L": 0,
    "n7L": -1,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 5,
    "chordKey": "min3",
    "cnName": "\u5C0F\u4E09",
    "type": "chord3",
    "orderedNotesLocationList": [0, 5, 8],
    "notesLocationList": [5, 8, 0],
    "n3L": 8,
    "n5L": 0,
    "n7L": -1,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 5,
    "chordKey": "dim3",
    "cnName": "\u51CF\u4E09",
    "type": "chord3",
    "orderedNotesLocationList": [5, 8, 11],
    "notesLocationList": [5, 8, 11],
    "n3L": 8,
    "n5L": 11,
    "n7L": -1,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 5,
    "chordKey": "aug3",
    "cnName": "\u589E\u4E09",
    "type": "chord3",
    "orderedNotesLocationList": [1, 5, 9],
    "notesLocationList": [5, 9, 1],
    "n3L": 9,
    "n5L": 1,
    "n7L": -1,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 5,
    "chordKey": "maj3b5",
    "cnName": "\u5927\u4E09\u51CF\u4E94",
    "type": "chord3",
    "orderedNotesLocationList": [5, 9, 11],
    "notesLocationList": [5, 9, 11],
    "n3L": 9,
    "n5L": 11,
    "n7L": -1,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 5,
    "chordKey": "maj3add6",
    "cnName": "\u5927\u516D\uFF08\u5927\u4E09\u52A0\u5341\u4E09\u97F3\uFF09",
    "type": "add",
    "orderedNotesLocationList": [0, 2, 5, 9],
    "notesLocationList": [5, 9, 0, 2],
    "n3L": 9,
    "n5L": 0,
    "n7L": -1,
    "n9L": -1,
    "n11L": -1,
    "n13L": 2
}, {
    "rootNoteLocation": 5,
    "chordKey": "min3add6",
    "cnName": "\u5C0F\u516D\uFF08\u5C0F\u4E09\u52A0\u5341\u4E09\u97F3\uFF09",
    "type": "add",
    "orderedNotesLocationList": [0, 1, 5, 8],
    "notesLocationList": [5, 8, 0, 1],
    "n3L": 8,
    "n5L": 0,
    "n7L": -1,
    "n9L": -1,
    "n11L": -1,
    "n13L": 1
}, {
    "rootNoteLocation": 5,
    "chordKey": "maj3add6add9",
    "cnName": "\u516D\u4E5D",
    "type": "add",
    "orderedNotesLocationList": [0, 2, 5, 7, 9],
    "notesLocationList": [5, 9, 0, 2, 7],
    "n3L": 9,
    "n5L": 0,
    "n7L": -1,
    "n9L": 7,
    "n11L": -1,
    "n13L": 2
}, {
    "rootNoteLocation": 5,
    "chordKey": "min3add6add9",
    "cnName": "\u5C0F\u516D\u4E5D",
    "type": "add",
    "orderedNotesLocationList": [0, 2, 5, 7, 8],
    "notesLocationList": [5, 8, 0, 2, 7],
    "n3L": 8,
    "n5L": 0,
    "n7L": -1,
    "n9L": 7,
    "n11L": -1,
    "n13L": 2
}, {
    "rootNoteLocation": 5,
    "chordKey": "maj3add9",
    "cnName": "\u5927\u4E09\u52A0\u4E5D\u97F3\uFF08\u4E8C\u97F3\uFF09",
    "type": "add",
    "orderedNotesLocationList": [0, 5, 7, 9],
    "notesLocationList": [5, 9, 0, 7],
    "n3L": 9,
    "n5L": 0,
    "n7L": -1,
    "n9L": 7,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 5,
    "chordKey": "maj3add11",
    "cnName": "\u5927\u4E09\u52A0\u5341\u4E00\u97F3\uFF08\u56DB\u97F3\uFF09",
    "type": "add",
    "orderedNotesLocationList": [0, 5, 9, 10],
    "notesLocationList": [5, 9, 0, 10],
    "n3L": 9,
    "n5L": 0,
    "n7L": -1,
    "n9L": -1,
    "n11L": 10,
    "n13L": -1
}, {
    "rootNoteLocation": 5,
    "chordKey": "min3add9",
    "cnName": "\u5C0F\u4E09\u52A0\u4E5D\u97F3\uFF08\u4E8C\u97F3\uFF09",
    "type": "add",
    "orderedNotesLocationList": [0, 5, 7, 8],
    "notesLocationList": [5, 8, 0, 7],
    "n3L": 8,
    "n5L": 0,
    "n7L": -1,
    "n9L": 7,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 5,
    "chordKey": "min3add11",
    "cnName": "\u5C0F\u4E09\u52A0\u5341\u4E00\u97F3\uFF08\u56DB\u97F3\uFF09",
    "type": "add",
    "orderedNotesLocationList": [0, 5, 8, 10],
    "notesLocationList": [5, 8, 0, 10],
    "n3L": 8,
    "n5L": 0,
    "n7L": -1,
    "n9L": -1,
    "n11L": 10,
    "n13L": -1
}, {
    "rootNoteLocation": 5,
    "chordKey": "maj7add11",
    "cnName": "\u5927\u4E03\u52A0\u5341\u4E00\u97F3\uFF08\u56DB\u97F3\uFF09",
    "type": "add",
    "orderedNotesLocationList": [0, 4, 5, 9, 10],
    "notesLocationList": [5, 9, 0, 4, 10],
    "n3L": 9,
    "n5L": 0,
    "n7L": 4,
    "n9L": -1,
    "n11L": 10,
    "n13L": -1
}, {
    "rootNoteLocation": 5,
    "chordKey": "dom7add6",
    "cnName": "\u5C5E\u4E03\u52A0\u516D\u97F3",
    "type": "add",
    "orderedNotesLocationList": [0, 2, 3, 5, 9],
    "notesLocationList": [5, 9, 0, 2, 3],
    "n3L": 9,
    "n5L": 0,
    "n7L": 3,
    "n9L": -1,
    "n11L": -1,
    "n13L": 2
}, {
    "rootNoteLocation": 5,
    "chordKey": "itaug6",
    "cnName": "\u610F\u5927\u5229\u589E\u516D",
    "type": "aug6",
    "orderedNotesLocationList": [1, 5, 11],
    "notesLocationList": [5, 11, 1],
    "n3L": -1,
    "n5L": -1,
    "n7L": -1,
    "n9L": -1,
    "n11L": 11,
    "n13L": 1
}, {
    "rootNoteLocation": 5,
    "chordKey": "fraug6",
    "cnName": "\u6CD5\u56FD\u589E\u516D",
    "type": "aug6",
    "orderedNotesLocationList": [1, 5, 7, 11],
    "notesLocationList": [5, 7, 11, 1],
    "n3L": -1,
    "n5L": -1,
    "n7L": -1,
    "n9L": 7,
    "n11L": 11,
    "n13L": 1
}, {
    "rootNoteLocation": 5,
    "chordKey": "graug6",
    "cnName": "\u5FB7\u56FD\u589E\u516D",
    "type": "aug6",
    "orderedNotesLocationList": [1, 5, 8, 11],
    "notesLocationList": [5, 8, 11, 1],
    "n3L": 8,
    "n5L": -1,
    "n7L": -1,
    "n9L": -1,
    "n11L": 11,
    "n13L": 1
}, {
    "rootNoteLocation": 5,
    "chordKey": "maj7",
    "cnName": "\u5927\u4E03",
    "type": "chord7",
    "orderedNotesLocationList": [0, 4, 5, 9],
    "notesLocationList": [5, 9, 0, 4],
    "n3L": 9,
    "n5L": 0,
    "n7L": 4,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 5,
    "chordKey": "dom7",
    "cnName": "\u5C5E\u4E03",
    "type": "chord7",
    "orderedNotesLocationList": [0, 3, 5, 9],
    "notesLocationList": [5, 9, 0, 3],
    "n3L": 9,
    "n5L": 0,
    "n7L": 3,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 5,
    "chordKey": "min7",
    "cnName": "\u5C0F\u4E03",
    "type": "chord7",
    "orderedNotesLocationList": [0, 3, 5, 8],
    "notesLocationList": [5, 8, 0, 3],
    "n3L": 8,
    "n5L": 0,
    "n7L": 3,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 5,
    "chordKey": "halfdim7",
    "cnName": "\u534A\u51CF\u4E03",
    "type": "chord7",
    "orderedNotesLocationList": [3, 5, 8, 11],
    "notesLocationList": [5, 8, 11, 3],
    "n3L": 8,
    "n5L": 11,
    "n7L": 3,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 5,
    "chordKey": "dim7",
    "cnName": "\u51CF\u4E03",
    "type": "chord7",
    "orderedNotesLocationList": [2, 5, 8, 11],
    "notesLocationList": [5, 8, 11, 2],
    "n3L": 8,
    "n5L": 11,
    "n7L": 2,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 5,
    "chordKey": "minmaj7",
    "cnName": "\u5C0F\u5927\u4E03",
    "type": "chord7",
    "orderedNotesLocationList": [0, 4, 5, 8],
    "notesLocationList": [5, 8, 0, 4],
    "n3L": 8,
    "n5L": 0,
    "n7L": 4,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 5,
    "chordKey": "dom7#5",
    "cnName": "\u589E\u4E03\uFF08\u5C5E\u4E03\u5347\u4E94\uFF09",
    "type": "chord7",
    "orderedNotesLocationList": [1, 3, 5, 9],
    "notesLocationList": [5, 9, 1, 3],
    "n3L": 9,
    "n5L": 1,
    "n7L": 3,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 5,
    "chordKey": "augmaj7",
    "cnName": "\u589E\u5927\u4E03",
    "type": "chord7",
    "orderedNotesLocationList": [1, 4, 5, 9],
    "notesLocationList": [5, 9, 1, 4],
    "n3L": 9,
    "n5L": 1,
    "n7L": 4,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 5,
    "chordKey": "dom7b5",
    "cnName": "\u5C5E\u4E03\u964D\u4E94",
    "type": "chord7alt",
    "orderedNotesLocationList": [3, 5, 9, 11],
    "notesLocationList": [5, 9, 11, 3],
    "n3L": 9,
    "n5L": 11,
    "n7L": 3,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 5,
    "chordKey": "dom7b9",
    "cnName": "\u5C5E\u4E03\u964D\u4E5D",
    "type": "chord7alt",
    "orderedNotesLocationList": [0, 3, 5, 6, 9],
    "notesLocationList": [5, 9, 0, 3, 6],
    "n3L": 9,
    "n5L": 0,
    "n7L": 3,
    "n9L": 6,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 5,
    "chordKey": "dom7#9",
    "cnName": "\u5C5E\u4E03\u5347\u4E5D",
    "type": "chord7alt",
    "orderedNotesLocationList": [0, 3, 5, 8, 9],
    "notesLocationList": [5, 9, 0, 3, 8],
    "n3L": 9,
    "n5L": 0,
    "n7L": 3,
    "n9L": 8,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 5,
    "chordKey": "dom7#11",
    "cnName": "\u5C5E\u4E03\u5347\u5341\u4E00",
    "type": "chord7alt",
    "orderedNotesLocationList": [0, 3, 5, 9, 11],
    "notesLocationList": [5, 9, 0, 3, 11],
    "n3L": 9,
    "n5L": 0,
    "n7L": 3,
    "n9L": -1,
    "n11L": 11,
    "n13L": -1
}, {
    "rootNoteLocation": 5,
    "chordKey": "dom7b13",
    "cnName": "\u5C5E\u4E03\u964D\u5341\u4E09",
    "type": "chord7alt",
    "orderedNotesLocationList": [0, 1, 3, 5, 9],
    "notesLocationList": [5, 9, 0, 3, 1],
    "n3L": 9,
    "n5L": 0,
    "n7L": 3,
    "n9L": -1,
    "n11L": -1,
    "n13L": 1
}, {
    "rootNoteLocation": 5,
    "chordKey": "dom7b5b9",
    "cnName": "\u5C5E\u4E03\u964D\u4E94\u964D\u4E5D",
    "type": "chord7alt",
    "orderedNotesLocationList": [3, 5, 6, 9, 11],
    "notesLocationList": [5, 9, 11, 3, 6],
    "n3L": 9,
    "n5L": 11,
    "n7L": 3,
    "n9L": 6,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 5,
    "chordKey": "dom7b5#9",
    "cnName": "\u5C5E\u4E03\u964D\u4E94\u5347\u4E5D",
    "type": "chord7alt",
    "orderedNotesLocationList": [3, 5, 8, 9, 11],
    "notesLocationList": [5, 9, 11, 3, 8],
    "n3L": 9,
    "n5L": 11,
    "n7L": 3,
    "n9L": 8,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 5,
    "chordKey": "maj7b5",
    "cnName": "\u5927\u4E03\u964D\u4E94",
    "type": "chord7alt",
    "orderedNotesLocationList": [4, 5, 9, 11],
    "notesLocationList": [5, 9, 11, 4],
    "n3L": 9,
    "n5L": 11,
    "n7L": 4,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 5,
    "chordKey": "maj7#5",
    "cnName": "\u5927\u4E03\u589E\u4E94",
    "type": "chord7alt",
    "orderedNotesLocationList": [1, 4, 5, 9],
    "notesLocationList": [5, 9, 1, 4],
    "n3L": 9,
    "n5L": 1,
    "n7L": 4,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 5,
    "chordKey": "maj7b9",
    "cnName": "\u5927\u4E03\u964D\u4E5D",
    "type": "chord7alt",
    "orderedNotesLocationList": [0, 4, 5, 6, 9],
    "notesLocationList": [5, 9, 0, 4, 6],
    "n3L": 9,
    "n5L": 0,
    "n7L": 4,
    "n9L": 6,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 5,
    "chordKey": "maj7b13",
    "cnName": "\u5927\u4E03\u964D\u5341\u4E09",
    "type": "chord7alt",
    "orderedNotesLocationList": [0, 1, 4, 5, 9],
    "notesLocationList": [5, 9, 0, 4, 1],
    "n3L": 9,
    "n5L": 0,
    "n7L": 4,
    "n9L": -1,
    "n11L": -1,
    "n13L": 1
}, {
    "rootNoteLocation": 5,
    "chordKey": "maj7#11",
    "cnName": "\u5927\u4E03\u5347\u5341\u4E00",
    "type": "chord7alt",
    "orderedNotesLocationList": [0, 4, 5, 9, 11],
    "notesLocationList": [5, 9, 0, 4, 11],
    "n3L": 9,
    "n5L": 0,
    "n7L": 4,
    "n9L": -1,
    "n11L": 11,
    "n13L": -1
}, {
    "rootNoteLocation": 5,
    "chordKey": "min7#5",
    "cnName": "\u5C0F\u4E03\u5347\u4E94",
    "type": "chord7alt",
    "orderedNotesLocationList": [1, 3, 5, 8],
    "notesLocationList": [5, 8, 1, 3],
    "n3L": 8,
    "n5L": 1,
    "n7L": 3,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 5,
    "chordKey": "minmaj7b5",
    "cnName": "\u5C0F\u5927\u4E03\u964D\u4E94",
    "type": "chord7alt",
    "orderedNotesLocationList": [4, 5, 8, 11],
    "notesLocationList": [5, 8, 11, 4],
    "n3L": 8,
    "n5L": 11,
    "n7L": 4,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 5,
    "chordKey": "minmaj7#5",
    "cnName": "\u5C0F\u5927\u4E03\u5347\u4E94",
    "type": "chord7alt",
    "orderedNotesLocationList": [1, 4, 5, 8],
    "notesLocationList": [5, 8, 1, 4],
    "n3L": 8,
    "n5L": 1,
    "n7L": 4,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 5,
    "chordKey": "dom7#5b9",
    "cnName": "\u589E\u4E03\u964D\u4E5D\uFF08\u5C5E\u4E03\u5347\u4E94\u964D\u4E5D\uFF09",
    "type": "chord7alt",
    "orderedNotesLocationList": [1, 3, 5, 6, 9],
    "notesLocationList": [5, 9, 1, 3, 6],
    "n3L": 9,
    "n5L": 1,
    "n7L": 3,
    "n9L": 6,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 5,
    "chordKey": "dom7#5#9",
    "cnName": "\u589E\u4E03\u5347\u4E5D\uFF08\u5C5E\u4E03\u5347\u4E94\u5347\u4E5D\uFF09",
    "type": "chord7alt",
    "orderedNotesLocationList": [1, 3, 5, 8, 9],
    "notesLocationList": [5, 9, 1, 3, 8],
    "n3L": 9,
    "n5L": 1,
    "n7L": 3,
    "n9L": 8,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 5,
    "chordKey": "sus2",
    "cnName": "\u6302\u4E8C",
    "type": "sus",
    "orderedNotesLocationList": [0, 5, 7],
    "notesLocationList": [5, 7, 0],
    "n3L": -1,
    "n5L": 0,
    "n7L": -1,
    "n9L": 7,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 5,
    "chordKey": "sus4",
    "cnName": "\u6302\u56DB",
    "type": "sus",
    "orderedNotesLocationList": [0, 5, 10],
    "notesLocationList": [5, 10, 0],
    "n3L": -1,
    "n5L": 0,
    "n7L": -1,
    "n9L": -1,
    "n11L": 10,
    "n13L": -1
}, {
    "rootNoteLocation": 5,
    "chordKey": "dom7sus2",
    "cnName": "\u5C5E\u4E03\u6302\u4E8C",
    "type": "sus",
    "orderedNotesLocationList": [0, 3, 5, 7],
    "notesLocationList": [5, 7, 0, 3],
    "n3L": -1,
    "n5L": 0,
    "n7L": 3,
    "n9L": 7,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 5,
    "chordKey": "dom7sus4",
    "cnName": "\u5C5E\u4E03\u6302\u56DB",
    "type": "sus",
    "orderedNotesLocationList": [0, 3, 5, 10],
    "notesLocationList": [5, 10, 0, 3],
    "n3L": -1,
    "n5L": 0,
    "n7L": 3,
    "n9L": -1,
    "n11L": 10,
    "n13L": -1
}, {
    "rootNoteLocation": 5,
    "chordKey": "maj7sus2",
    "cnName": "\u5927\u4E03\u6302\u4E8C",
    "type": "sus",
    "orderedNotesLocationList": [0, 4, 5, 7],
    "notesLocationList": [5, 7, 0, 4],
    "n3L": -1,
    "n5L": 0,
    "n7L": 4,
    "n9L": 7,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 5,
    "chordKey": "maj7sus4",
    "cnName": "\u5927\u4E03\u6302\u56DB",
    "type": "sus",
    "orderedNotesLocationList": [0, 4, 5, 10],
    "notesLocationList": [5, 10, 0, 4],
    "n3L": -1,
    "n5L": 0,
    "n7L": 4,
    "n9L": -1,
    "n11L": 10,
    "n13L": -1
}, {
    "rootNoteLocation": 5,
    "chordKey": "dom9sus4",
    "cnName": "\u5C5E\u4E5D\u6302\u56DB",
    "type": "sus",
    "orderedNotesLocationList": [0, 3, 5, 7, 10],
    "notesLocationList": [5, 10, 0, 3, 7],
    "n3L": -1,
    "n5L": 0,
    "n7L": 3,
    "n9L": 7,
    "n11L": 10,
    "n13L": -1
}, {
    "rootNoteLocation": 5,
    "chordKey": "maj9sus4",
    "cnName": "\u5927\u4E5D\u6302\u56DB",
    "type": "sus",
    "orderedNotesLocationList": [0, 4, 5, 7, 10],
    "notesLocationList": [5, 10, 0, 4, 7],
    "n3L": -1,
    "n5L": 0,
    "n7L": 4,
    "n9L": 7,
    "n11L": 10,
    "n13L": -1
}, {
    "rootNoteLocation": 5,
    "chordKey": "dom13sus4",
    "cnName": "\u5C5E\u5341\u4E09\u6302\u56DB",
    "type": "sus",
    "orderedNotesLocationList": [0, 2, 3, 5, 7, 10],
    "notesLocationList": [5, 10, 0, 3, 7, 2],
    "n3L": -1,
    "n5L": 0,
    "n7L": 3,
    "n9L": 7,
    "n11L": 10,
    "n13L": 2
}, {
    "rootNoteLocation": 5,
    "chordKey": "maj13sus4",
    "cnName": "\u5927\u5341\u4E09\u6302\u56DB",
    "type": "sus",
    "orderedNotesLocationList": [0, 2, 4, 5, 7, 10],
    "notesLocationList": [5, 10, 0, 4, 7, 2],
    "n3L": -1,
    "n5L": 0,
    "n7L": 4,
    "n9L": 7,
    "n11L": 10,
    "n13L": 2
}, {
    "rootNoteLocation": 5,
    "chordKey": "maj13sus2",
    "cnName": "\u5927\u5341\u4E09\u6302\u4E8C",
    "type": "sus",
    "orderedNotesLocationList": [0, 2, 4, 5, 7],
    "notesLocationList": [5, 7, 0, 4, 2],
    "n3L": -1,
    "n5L": 0,
    "n7L": 4,
    "n9L": 7,
    "n11L": -1,
    "n13L": 2
}, {
    "rootNoteLocation": 5,
    "chordKey": "maj9",
    "cnName": "\u5927\u4E5D",
    "type": "chord9",
    "orderedNotesLocationList": [0, 4, 5, 7, 9],
    "notesLocationList": [5, 9, 0, 4, 7],
    "n3L": 9,
    "n5L": 0,
    "n7L": 4,
    "n9L": 7,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 5,
    "chordKey": "dom9",
    "cnName": "\u5C5E\u4E5D",
    "type": "chord9",
    "orderedNotesLocationList": [0, 3, 5, 7, 9],
    "notesLocationList": [5, 9, 0, 3, 7],
    "n3L": 9,
    "n5L": 0,
    "n7L": 3,
    "n9L": 7,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 5,
    "chordKey": "min9",
    "cnName": "\u5C0F\u4E5D",
    "type": "chord9",
    "orderedNotesLocationList": [0, 3, 5, 7, 8],
    "notesLocationList": [5, 8, 0, 3, 7],
    "n3L": 8,
    "n5L": 0,
    "n7L": 3,
    "n9L": 7,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 5,
    "chordKey": "minmaj9",
    "cnName": "\u5C0F\u5927\u4E5D",
    "type": "chord9",
    "orderedNotesLocationList": [0, 4, 5, 7, 8],
    "notesLocationList": [5, 8, 0, 4, 7],
    "n3L": 8,
    "n5L": 0,
    "n7L": 4,
    "n9L": 7,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 5,
    "chordKey": "dom9#5",
    "cnName": "\u589E\u4E5D\uFF08\u5C5E\u4E5D\u5347\u4E94\uFF09",
    "type": "chord9",
    "orderedNotesLocationList": [1, 3, 5, 7, 9],
    "notesLocationList": [5, 9, 1, 3, 7],
    "n3L": 9,
    "n5L": 1,
    "n7L": 3,
    "n9L": 7,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 5,
    "chordKey": "dom9b9",
    "cnName": "\u5C5E\u4E5D\u964D\u4E5D",
    "type": "chord9",
    "orderedNotesLocationList": [0, 3, 5, 6, 9],
    "notesLocationList": [5, 9, 0, 3, 6],
    "n3L": 9,
    "n5L": 0,
    "n7L": 3,
    "n9L": 6,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 5,
    "chordKey": "dom9b11",
    "cnName": "\u5C5E\u4E5D\u964D\u5341\u4E00",
    "type": "chord9",
    "orderedNotesLocationList": [0, 3, 5, 7, 9, 9],
    "notesLocationList": [5, 9, 0, 3, 7, 9],
    "n3L": 9,
    "n5L": 0,
    "n7L": 3,
    "n9L": 7,
    "n11L": 9,
    "n13L": -1
}, {
    "rootNoteLocation": 5,
    "chordKey": "dom9#11",
    "cnName": "\u5C5E\u4E5D\u5347\u5341\u4E00",
    "type": "chord9",
    "orderedNotesLocationList": [0, 3, 5, 7, 9, 11],
    "notesLocationList": [5, 9, 0, 3, 7, 11],
    "n3L": 9,
    "n5L": 0,
    "n7L": 3,
    "n9L": 7,
    "n11L": 11,
    "n13L": -1
}, {
    "rootNoteLocation": 5,
    "chordKey": "dom9b13",
    "cnName": "\u5C5E\u4E5D\u964D\u5341\u4E09",
    "type": "chord9",
    "orderedNotesLocationList": [0, 1, 3, 5, 7, 9],
    "notesLocationList": [5, 9, 0, 3, 7, 1],
    "n3L": 9,
    "n5L": 0,
    "n7L": 3,
    "n9L": 7,
    "n11L": -1,
    "n13L": 1
}, {
    "rootNoteLocation": 5,
    "chordKey": "maj9b5",
    "cnName": "\u5927\u4E5D\u964D\u4E94",
    "type": "chord9",
    "orderedNotesLocationList": [4, 5, 7, 9, 11],
    "notesLocationList": [5, 9, 11, 4, 7],
    "n3L": 9,
    "n5L": 11,
    "n7L": 4,
    "n9L": 7,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 5,
    "chordKey": "maj9#5",
    "cnName": "\u5927\u4E5D\u5347\u4E94",
    "type": "chord9",
    "orderedNotesLocationList": [1, 4, 5, 7, 9],
    "notesLocationList": [5, 9, 1, 4, 7],
    "n3L": 9,
    "n5L": 1,
    "n7L": 4,
    "n9L": 7,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 5,
    "chordKey": "maj9#11",
    "cnName": "\u5927\u4E5D\u5347\u5341\u4E00",
    "type": "chord9",
    "orderedNotesLocationList": [0, 4, 5, 7, 9, 11],
    "notesLocationList": [5, 9, 0, 4, 7, 11],
    "n3L": 9,
    "n5L": 0,
    "n7L": 4,
    "n9L": 7,
    "n11L": 11,
    "n13L": -1
}, {
    "rootNoteLocation": 5,
    "chordKey": "maj9b13",
    "cnName": "\u5927\u4E5D\u964D\u5341\u4E09",
    "type": "chord9",
    "orderedNotesLocationList": [1, 4, 5, 7, 9, 11],
    "notesLocationList": [5, 9, 11, 4, 7, 1],
    "n3L": 9,
    "n5L": 11,
    "n7L": 4,
    "n9L": 7,
    "n11L": -1,
    "n13L": 1
}, {
    "rootNoteLocation": 5,
    "chordKey": "min9b5",
    "cnName": "\u5C0F\u4E5D\u964D\u4E94",
    "type": "chord9",
    "orderedNotesLocationList": [3, 5, 7, 8, 11],
    "notesLocationList": [5, 8, 11, 3, 7],
    "n3L": 8,
    "n5L": 11,
    "n7L": 3,
    "n9L": 7,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 5,
    "chordKey": "min9b9",
    "cnName": "\u5C0F\u4E5D\u964D\u4E5D",
    "type": "chord9",
    "orderedNotesLocationList": [0, 3, 5, 6, 8],
    "notesLocationList": [5, 8, 0, 3, 6],
    "n3L": 8,
    "n5L": 0,
    "n7L": 3,
    "n9L": 6,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 5,
    "chordKey": "maj11",
    "cnName": "\u5927\u5341\u4E00",
    "type": "chord11",
    "orderedNotesLocationList": [0, 4, 5, 7, 9, 10],
    "notesLocationList": [5, 9, 0, 4, 7, 10],
    "n3L": 9,
    "n5L": 0,
    "n7L": 4,
    "n9L": 7,
    "n11L": 10,
    "n13L": -1
}, {
    "rootNoteLocation": 5,
    "chordKey": "dom11",
    "cnName": "\u5C5E\u5341\u4E00",
    "type": "chord11",
    "orderedNotesLocationList": [0, 3, 5, 7, 9, 10],
    "notesLocationList": [5, 9, 0, 3, 7, 10],
    "n3L": 9,
    "n5L": 0,
    "n7L": 3,
    "n9L": 7,
    "n11L": 10,
    "n13L": -1
}, {
    "rootNoteLocation": 5,
    "chordKey": "min11",
    "cnName": "\u5C0F\u5341\u4E00",
    "type": "chord11",
    "orderedNotesLocationList": [0, 3, 5, 7, 8, 10],
    "notesLocationList": [5, 8, 0, 3, 7, 10],
    "n3L": 8,
    "n5L": 0,
    "n7L": 3,
    "n9L": 7,
    "n11L": 10,
    "n13L": -1
}, {
    "rootNoteLocation": 5,
    "chordKey": "minmaj11",
    "cnName": "\u5C0F\u5927\u5341\u4E00",
    "type": "chord11",
    "orderedNotesLocationList": [0, 4, 5, 7, 8, 10],
    "notesLocationList": [5, 8, 0, 4, 7, 10],
    "n3L": 8,
    "n5L": 0,
    "n7L": 4,
    "n9L": 7,
    "n11L": 10,
    "n13L": -1
}, {
    "rootNoteLocation": 5,
    "chordKey": "dom11b5",
    "cnName": "\u5C5E\u5341\u4E00\u964D\u4E94",
    "type": "chord11",
    "orderedNotesLocationList": [3, 5, 7, 9, 10, 11],
    "notesLocationList": [5, 9, 11, 3, 7, 10],
    "n3L": 9,
    "n5L": 11,
    "n7L": 3,
    "n9L": 7,
    "n11L": 10,
    "n13L": -1
}, {
    "rootNoteLocation": 5,
    "chordKey": "dom11#5",
    "cnName": "\u5C5E\u5341\u4E00\u5347\u4E94",
    "type": "chord11",
    "orderedNotesLocationList": [1, 3, 5, 7, 9, 10],
    "notesLocationList": [5, 9, 1, 3, 7, 10],
    "n3L": 9,
    "n5L": 1,
    "n7L": 3,
    "n9L": 7,
    "n11L": 10,
    "n13L": -1
}, {
    "rootNoteLocation": 5,
    "chordKey": "dom11b9",
    "cnName": "\u5C5E\u5341\u4E00\u964D\u4E5D",
    "type": "chord11",
    "orderedNotesLocationList": [0, 3, 5, 6, 9, 10],
    "notesLocationList": [5, 9, 0, 3, 6, 10],
    "n3L": 9,
    "n5L": 0,
    "n7L": 3,
    "n9L": 6,
    "n11L": 10,
    "n13L": -1
}, {
    "rootNoteLocation": 5,
    "chordKey": "dom11#9",
    "cnName": "\u5C5E\u5341\u4E00\u5347\u4E5D",
    "type": "chord11",
    "orderedNotesLocationList": [0, 3, 5, 8, 9, 10],
    "notesLocationList": [5, 9, 0, 3, 8, 10],
    "n3L": 9,
    "n5L": 0,
    "n7L": 3,
    "n9L": 8,
    "n11L": 10,
    "n13L": -1
}, {
    "rootNoteLocation": 5,
    "chordKey": "dom11b13",
    "cnName": "\u5C5E\u5341\u4E00\u964D\u5341\u4E09",
    "type": "chord11",
    "orderedNotesLocationList": [0, 1, 3, 5, 7, 9, 10],
    "notesLocationList": [5, 9, 0, 3, 7, 10, 1],
    "n3L": 9,
    "n5L": 0,
    "n7L": 3,
    "n9L": 7,
    "n11L": 10,
    "n13L": 1
}, {
    "rootNoteLocation": 5,
    "chordKey": "min11b5",
    "cnName": "\u5C0F\u5341\u4E00\u964D\u4E94",
    "type": "chord11",
    "orderedNotesLocationList": [3, 5, 7, 8, 10, 11],
    "notesLocationList": [5, 8, 11, 3, 7, 10],
    "n3L": 8,
    "n5L": 11,
    "n7L": 3,
    "n9L": 7,
    "n11L": 10,
    "n13L": -1
}, {
    "rootNoteLocation": 5,
    "chordKey": "maj13",
    "cnName": "\u5927\u5341\u4E09",
    "type": "chord13",
    "orderedNotesLocationList": [0, 2, 4, 5, 7, 9, 10],
    "notesLocationList": [5, 9, 0, 4, 7, 10, 2],
    "n3L": 9,
    "n5L": 0,
    "n7L": 4,
    "n9L": 7,
    "n11L": 10,
    "n13L": 2
}, {
    "rootNoteLocation": 5,
    "chordKey": "dom13",
    "cnName": "\u5C5E\u5341\u4E09",
    "type": "chord13",
    "orderedNotesLocationList": [0, 2, 3, 5, 7, 9, 10],
    "notesLocationList": [5, 9, 0, 3, 7, 10, 2],
    "n3L": 9,
    "n5L": 0,
    "n7L": 3,
    "n9L": 7,
    "n11L": 10,
    "n13L": 2
}, {
    "rootNoteLocation": 5,
    "chordKey": "min13",
    "cnName": "\u5C0F\u5341\u4E09",
    "type": "chord13",
    "orderedNotesLocationList": [0, 2, 3, 5, 7, 8, 10],
    "notesLocationList": [5, 8, 0, 3, 7, 10, 2],
    "n3L": 8,
    "n5L": 0,
    "n7L": 3,
    "n9L": 7,
    "n11L": 10,
    "n13L": 2
}, {
    "rootNoteLocation": 5,
    "chordKey": "minmaj13",
    "cnName": "\u5C0F\u5927\u5341\u4E09",
    "type": "chord13",
    "orderedNotesLocationList": [0, 2, 4, 5, 7, 8, 10],
    "notesLocationList": [5, 8, 0, 4, 7, 10, 2],
    "n3L": 8,
    "n5L": 0,
    "n7L": 4,
    "n9L": 7,
    "n11L": 10,
    "n13L": 2
}, {
    "rootNoteLocation": 5,
    "chordKey": "dom13b5",
    "cnName": "\u5C5E\u5341\u4E09\u964D\u4E94",
    "type": "chord13",
    "orderedNotesLocationList": [2, 3, 5, 7, 9, 10, 11],
    "notesLocationList": [5, 9, 11, 3, 7, 10, 2],
    "n3L": 9,
    "n5L": 11,
    "n7L": 3,
    "n9L": 7,
    "n11L": 10,
    "n13L": 2
}, {
    "rootNoteLocation": 5,
    "chordKey": "dom13#5",
    "cnName": "\u5C5E\u5341\u4E09\u5347\u4E94",
    "type": "chord13",
    "orderedNotesLocationList": [1, 2, 3, 5, 7, 9, 10],
    "notesLocationList": [5, 9, 1, 3, 7, 10, 2],
    "n3L": 9,
    "n5L": 1,
    "n7L": 3,
    "n9L": 7,
    "n11L": 10,
    "n13L": 2
}, {
    "rootNoteLocation": 5,
    "chordKey": "dom13b9",
    "cnName": "\u5C5E\u5341\u4E09\u964D\u4E5D",
    "type": "chord13",
    "orderedNotesLocationList": [0, 2, 3, 5, 6, 9, 10],
    "notesLocationList": [5, 9, 0, 3, 6, 10, 2],
    "n3L": 9,
    "n5L": 0,
    "n7L": 3,
    "n9L": 6,
    "n11L": 10,
    "n13L": 2
}, {
    "rootNoteLocation": 5,
    "chordKey": "dom13#9",
    "cnName": "\u5C5E\u5341\u4E09\u5347\u4E5D",
    "type": "chord13",
    "orderedNotesLocationList": [0, 2, 3, 5, 8, 9],
    "notesLocationList": [5, 9, 0, 3, 8, 2],
    "n3L": 9,
    "n5L": 0,
    "n7L": 3,
    "n9L": 8,
    "n11L": -1,
    "n13L": 2
}, {
    "rootNoteLocation": 5,
    "chordKey": "dom13#11",
    "cnName": "\u5C5E\u5341\u4E09\u5347\u5341\u4E00",
    "type": "chord13",
    "orderedNotesLocationList": [0, 2, 3, 5, 7, 9, 11],
    "notesLocationList": [5, 9, 0, 3, 7, 11, 2],
    "n3L": 9,
    "n5L": 0,
    "n7L": 3,
    "n9L": 7,
    "n11L": 11,
    "n13L": 2
}, {
    "rootNoteLocation": 5,
    "chordKey": "maj13b5",
    "cnName": "\u5927\u5341\u4E09\u964D\u4E94",
    "type": "chord13",
    "orderedNotesLocationList": [2, 4, 5, 7, 9, 11],
    "notesLocationList": [5, 9, 11, 4, 7, 2],
    "n3L": 9,
    "n5L": 11,
    "n7L": 4,
    "n9L": 7,
    "n11L": -1,
    "n13L": 2
}, {
    "rootNoteLocation": 5,
    "chordKey": "maj13#5",
    "cnName": "\u5927\u5341\u4E09\u5347\u4E94",
    "type": "chord13",
    "orderedNotesLocationList": [1, 2, 4, 5, 7, 9],
    "notesLocationList": [5, 9, 1, 4, 7, 2],
    "n3L": 9,
    "n5L": 1,
    "n7L": 4,
    "n9L": 7,
    "n11L": -1,
    "n13L": 2
}, {
    "rootNoteLocation": 5,
    "chordKey": "maj13b9",
    "cnName": "\u5927\u5341\u4E09\u964D\u4E5D",
    "type": "chord13",
    "orderedNotesLocationList": [0, 2, 4, 5, 6, 9],
    "notesLocationList": [5, 9, 0, 4, 6, 2],
    "n3L": 9,
    "n5L": 0,
    "n7L": 4,
    "n9L": 6,
    "n11L": -1,
    "n13L": 2
}, {
    "rootNoteLocation": 5,
    "chordKey": "maj13#11",
    "cnName": "\u5927\u5341\u4E09\u5347\u5341\u4E00",
    "type": "chord13",
    "orderedNotesLocationList": [0, 2, 4, 5, 7, 9, 11],
    "notesLocationList": [5, 9, 0, 4, 7, 11, 2],
    "n3L": 9,
    "n5L": 0,
    "n7L": 4,
    "n9L": 7,
    "n11L": 11,
    "n13L": 2
}, {
    "rootNoteLocation": 6,
    "chordKey": "maj3",
    "cnName": "\u5927\u4E09",
    "type": "chord3",
    "orderedNotesLocationList": [1, 6, 10],
    "notesLocationList": [6, 10, 1],
    "n3L": 10,
    "n5L": 1,
    "n7L": -1,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 6,
    "chordKey": "min3",
    "cnName": "\u5C0F\u4E09",
    "type": "chord3",
    "orderedNotesLocationList": [1, 6, 9],
    "notesLocationList": [6, 9, 1],
    "n3L": 9,
    "n5L": 1,
    "n7L": -1,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 6,
    "chordKey": "dim3",
    "cnName": "\u51CF\u4E09",
    "type": "chord3",
    "orderedNotesLocationList": [0, 6, 9],
    "notesLocationList": [6, 9, 0],
    "n3L": 9,
    "n5L": 0,
    "n7L": -1,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 6,
    "chordKey": "aug3",
    "cnName": "\u589E\u4E09",
    "type": "chord3",
    "orderedNotesLocationList": [2, 6, 10],
    "notesLocationList": [6, 10, 2],
    "n3L": 10,
    "n5L": 2,
    "n7L": -1,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 6,
    "chordKey": "maj3b5",
    "cnName": "\u5927\u4E09\u51CF\u4E94",
    "type": "chord3",
    "orderedNotesLocationList": [0, 6, 10],
    "notesLocationList": [6, 10, 0],
    "n3L": 10,
    "n5L": 0,
    "n7L": -1,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 6,
    "chordKey": "maj3add6",
    "cnName": "\u5927\u516D\uFF08\u5927\u4E09\u52A0\u5341\u4E09\u97F3\uFF09",
    "type": "add",
    "orderedNotesLocationList": [1, 3, 6, 10],
    "notesLocationList": [6, 10, 1, 3],
    "n3L": 10,
    "n5L": 1,
    "n7L": -1,
    "n9L": -1,
    "n11L": -1,
    "n13L": 3
}, {
    "rootNoteLocation": 6,
    "chordKey": "min3add6",
    "cnName": "\u5C0F\u516D\uFF08\u5C0F\u4E09\u52A0\u5341\u4E09\u97F3\uFF09",
    "type": "add",
    "orderedNotesLocationList": [1, 2, 6, 9],
    "notesLocationList": [6, 9, 1, 2],
    "n3L": 9,
    "n5L": 1,
    "n7L": -1,
    "n9L": -1,
    "n11L": -1,
    "n13L": 2
}, {
    "rootNoteLocation": 6,
    "chordKey": "maj3add6add9",
    "cnName": "\u516D\u4E5D",
    "type": "add",
    "orderedNotesLocationList": [1, 3, 6, 8, 10],
    "notesLocationList": [6, 10, 1, 3, 8],
    "n3L": 10,
    "n5L": 1,
    "n7L": -1,
    "n9L": 8,
    "n11L": -1,
    "n13L": 3
}, {
    "rootNoteLocation": 6,
    "chordKey": "min3add6add9",
    "cnName": "\u5C0F\u516D\u4E5D",
    "type": "add",
    "orderedNotesLocationList": [1, 3, 6, 8, 9],
    "notesLocationList": [6, 9, 1, 3, 8],
    "n3L": 9,
    "n5L": 1,
    "n7L": -1,
    "n9L": 8,
    "n11L": -1,
    "n13L": 3
}, {
    "rootNoteLocation": 6,
    "chordKey": "maj3add9",
    "cnName": "\u5927\u4E09\u52A0\u4E5D\u97F3\uFF08\u4E8C\u97F3\uFF09",
    "type": "add",
    "orderedNotesLocationList": [1, 6, 8, 10],
    "notesLocationList": [6, 10, 1, 8],
    "n3L": 10,
    "n5L": 1,
    "n7L": -1,
    "n9L": 8,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 6,
    "chordKey": "maj3add11",
    "cnName": "\u5927\u4E09\u52A0\u5341\u4E00\u97F3\uFF08\u56DB\u97F3\uFF09",
    "type": "add",
    "orderedNotesLocationList": [1, 6, 10, 11],
    "notesLocationList": [6, 10, 1, 11],
    "n3L": 10,
    "n5L": 1,
    "n7L": -1,
    "n9L": -1,
    "n11L": 11,
    "n13L": -1
}, {
    "rootNoteLocation": 6,
    "chordKey": "min3add9",
    "cnName": "\u5C0F\u4E09\u52A0\u4E5D\u97F3\uFF08\u4E8C\u97F3\uFF09",
    "type": "add",
    "orderedNotesLocationList": [1, 6, 8, 9],
    "notesLocationList": [6, 9, 1, 8],
    "n3L": 9,
    "n5L": 1,
    "n7L": -1,
    "n9L": 8,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 6,
    "chordKey": "min3add11",
    "cnName": "\u5C0F\u4E09\u52A0\u5341\u4E00\u97F3\uFF08\u56DB\u97F3\uFF09",
    "type": "add",
    "orderedNotesLocationList": [1, 6, 9, 11],
    "notesLocationList": [6, 9, 1, 11],
    "n3L": 9,
    "n5L": 1,
    "n7L": -1,
    "n9L": -1,
    "n11L": 11,
    "n13L": -1
}, {
    "rootNoteLocation": 6,
    "chordKey": "maj7add11",
    "cnName": "\u5927\u4E03\u52A0\u5341\u4E00\u97F3\uFF08\u56DB\u97F3\uFF09",
    "type": "add",
    "orderedNotesLocationList": [1, 5, 6, 10, 11],
    "notesLocationList": [6, 10, 1, 5, 11],
    "n3L": 10,
    "n5L": 1,
    "n7L": 5,
    "n9L": -1,
    "n11L": 11,
    "n13L": -1
}, {
    "rootNoteLocation": 6,
    "chordKey": "dom7add6",
    "cnName": "\u5C5E\u4E03\u52A0\u516D\u97F3",
    "type": "add",
    "orderedNotesLocationList": [1, 3, 4, 6, 10],
    "notesLocationList": [6, 10, 1, 3, 4],
    "n3L": 10,
    "n5L": 1,
    "n7L": 4,
    "n9L": -1,
    "n11L": -1,
    "n13L": 3
}, {
    "rootNoteLocation": 6,
    "chordKey": "itaug6",
    "cnName": "\u610F\u5927\u5229\u589E\u516D",
    "type": "aug6",
    "orderedNotesLocationList": [0, 2, 6],
    "notesLocationList": [6, 0, 2],
    "n3L": -1,
    "n5L": -1,
    "n7L": -1,
    "n9L": -1,
    "n11L": 0,
    "n13L": 2
}, {
    "rootNoteLocation": 6,
    "chordKey": "fraug6",
    "cnName": "\u6CD5\u56FD\u589E\u516D",
    "type": "aug6",
    "orderedNotesLocationList": [0, 2, 6, 8],
    "notesLocationList": [6, 8, 0, 2],
    "n3L": -1,
    "n5L": -1,
    "n7L": -1,
    "n9L": 8,
    "n11L": 0,
    "n13L": 2
}, {
    "rootNoteLocation": 6,
    "chordKey": "graug6",
    "cnName": "\u5FB7\u56FD\u589E\u516D",
    "type": "aug6",
    "orderedNotesLocationList": [0, 2, 6, 9],
    "notesLocationList": [6, 9, 0, 2],
    "n3L": 9,
    "n5L": -1,
    "n7L": -1,
    "n9L": -1,
    "n11L": 0,
    "n13L": 2
}, {
    "rootNoteLocation": 6,
    "chordKey": "maj7",
    "cnName": "\u5927\u4E03",
    "type": "chord7",
    "orderedNotesLocationList": [1, 5, 6, 10],
    "notesLocationList": [6, 10, 1, 5],
    "n3L": 10,
    "n5L": 1,
    "n7L": 5,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 6,
    "chordKey": "dom7",
    "cnName": "\u5C5E\u4E03",
    "type": "chord7",
    "orderedNotesLocationList": [1, 4, 6, 10],
    "notesLocationList": [6, 10, 1, 4],
    "n3L": 10,
    "n5L": 1,
    "n7L": 4,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 6,
    "chordKey": "min7",
    "cnName": "\u5C0F\u4E03",
    "type": "chord7",
    "orderedNotesLocationList": [1, 4, 6, 9],
    "notesLocationList": [6, 9, 1, 4],
    "n3L": 9,
    "n5L": 1,
    "n7L": 4,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 6,
    "chordKey": "halfdim7",
    "cnName": "\u534A\u51CF\u4E03",
    "type": "chord7",
    "orderedNotesLocationList": [0, 4, 6, 9],
    "notesLocationList": [6, 9, 0, 4],
    "n3L": 9,
    "n5L": 0,
    "n7L": 4,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 6,
    "chordKey": "dim7",
    "cnName": "\u51CF\u4E03",
    "type": "chord7",
    "orderedNotesLocationList": [0, 3, 6, 9],
    "notesLocationList": [6, 9, 0, 3],
    "n3L": 9,
    "n5L": 0,
    "n7L": 3,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 6,
    "chordKey": "minmaj7",
    "cnName": "\u5C0F\u5927\u4E03",
    "type": "chord7",
    "orderedNotesLocationList": [1, 5, 6, 9],
    "notesLocationList": [6, 9, 1, 5],
    "n3L": 9,
    "n5L": 1,
    "n7L": 5,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 6,
    "chordKey": "dom7#5",
    "cnName": "\u589E\u4E03\uFF08\u5C5E\u4E03\u5347\u4E94\uFF09",
    "type": "chord7",
    "orderedNotesLocationList": [2, 4, 6, 10],
    "notesLocationList": [6, 10, 2, 4],
    "n3L": 10,
    "n5L": 2,
    "n7L": 4,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 6,
    "chordKey": "augmaj7",
    "cnName": "\u589E\u5927\u4E03",
    "type": "chord7",
    "orderedNotesLocationList": [2, 5, 6, 10],
    "notesLocationList": [6, 10, 2, 5],
    "n3L": 10,
    "n5L": 2,
    "n7L": 5,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 6,
    "chordKey": "dom7b5",
    "cnName": "\u5C5E\u4E03\u964D\u4E94",
    "type": "chord7alt",
    "orderedNotesLocationList": [0, 4, 6, 10],
    "notesLocationList": [6, 10, 0, 4],
    "n3L": 10,
    "n5L": 0,
    "n7L": 4,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 6,
    "chordKey": "dom7b9",
    "cnName": "\u5C5E\u4E03\u964D\u4E5D",
    "type": "chord7alt",
    "orderedNotesLocationList": [1, 4, 6, 7, 10],
    "notesLocationList": [6, 10, 1, 4, 7],
    "n3L": 10,
    "n5L": 1,
    "n7L": 4,
    "n9L": 7,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 6,
    "chordKey": "dom7#9",
    "cnName": "\u5C5E\u4E03\u5347\u4E5D",
    "type": "chord7alt",
    "orderedNotesLocationList": [1, 4, 6, 9, 10],
    "notesLocationList": [6, 10, 1, 4, 9],
    "n3L": 10,
    "n5L": 1,
    "n7L": 4,
    "n9L": 9,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 6,
    "chordKey": "dom7#11",
    "cnName": "\u5C5E\u4E03\u5347\u5341\u4E00",
    "type": "chord7alt",
    "orderedNotesLocationList": [0, 1, 4, 6, 10],
    "notesLocationList": [6, 10, 1, 4, 0],
    "n3L": 10,
    "n5L": 1,
    "n7L": 4,
    "n9L": -1,
    "n11L": 0,
    "n13L": -1
}, {
    "rootNoteLocation": 6,
    "chordKey": "dom7b13",
    "cnName": "\u5C5E\u4E03\u964D\u5341\u4E09",
    "type": "chord7alt",
    "orderedNotesLocationList": [1, 2, 4, 6, 10],
    "notesLocationList": [6, 10, 1, 4, 2],
    "n3L": 10,
    "n5L": 1,
    "n7L": 4,
    "n9L": -1,
    "n11L": -1,
    "n13L": 2
}, {
    "rootNoteLocation": 6,
    "chordKey": "dom7b5b9",
    "cnName": "\u5C5E\u4E03\u964D\u4E94\u964D\u4E5D",
    "type": "chord7alt",
    "orderedNotesLocationList": [0, 4, 6, 7, 10],
    "notesLocationList": [6, 10, 0, 4, 7],
    "n3L": 10,
    "n5L": 0,
    "n7L": 4,
    "n9L": 7,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 6,
    "chordKey": "dom7b5#9",
    "cnName": "\u5C5E\u4E03\u964D\u4E94\u5347\u4E5D",
    "type": "chord7alt",
    "orderedNotesLocationList": [0, 4, 6, 9, 10],
    "notesLocationList": [6, 10, 0, 4, 9],
    "n3L": 10,
    "n5L": 0,
    "n7L": 4,
    "n9L": 9,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 6,
    "chordKey": "maj7b5",
    "cnName": "\u5927\u4E03\u964D\u4E94",
    "type": "chord7alt",
    "orderedNotesLocationList": [0, 5, 6, 10],
    "notesLocationList": [6, 10, 0, 5],
    "n3L": 10,
    "n5L": 0,
    "n7L": 5,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 6,
    "chordKey": "maj7#5",
    "cnName": "\u5927\u4E03\u589E\u4E94",
    "type": "chord7alt",
    "orderedNotesLocationList": [2, 5, 6, 10],
    "notesLocationList": [6, 10, 2, 5],
    "n3L": 10,
    "n5L": 2,
    "n7L": 5,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 6,
    "chordKey": "maj7b9",
    "cnName": "\u5927\u4E03\u964D\u4E5D",
    "type": "chord7alt",
    "orderedNotesLocationList": [1, 5, 6, 7, 10],
    "notesLocationList": [6, 10, 1, 5, 7],
    "n3L": 10,
    "n5L": 1,
    "n7L": 5,
    "n9L": 7,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 6,
    "chordKey": "maj7b13",
    "cnName": "\u5927\u4E03\u964D\u5341\u4E09",
    "type": "chord7alt",
    "orderedNotesLocationList": [1, 2, 5, 6, 10],
    "notesLocationList": [6, 10, 1, 5, 2],
    "n3L": 10,
    "n5L": 1,
    "n7L": 5,
    "n9L": -1,
    "n11L": -1,
    "n13L": 2
}, {
    "rootNoteLocation": 6,
    "chordKey": "maj7#11",
    "cnName": "\u5927\u4E03\u5347\u5341\u4E00",
    "type": "chord7alt",
    "orderedNotesLocationList": [0, 1, 5, 6, 10],
    "notesLocationList": [6, 10, 1, 5, 0],
    "n3L": 10,
    "n5L": 1,
    "n7L": 5,
    "n9L": -1,
    "n11L": 0,
    "n13L": -1
}, {
    "rootNoteLocation": 6,
    "chordKey": "min7#5",
    "cnName": "\u5C0F\u4E03\u5347\u4E94",
    "type": "chord7alt",
    "orderedNotesLocationList": [2, 4, 6, 9],
    "notesLocationList": [6, 9, 2, 4],
    "n3L": 9,
    "n5L": 2,
    "n7L": 4,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 6,
    "chordKey": "minmaj7b5",
    "cnName": "\u5C0F\u5927\u4E03\u964D\u4E94",
    "type": "chord7alt",
    "orderedNotesLocationList": [0, 5, 6, 9],
    "notesLocationList": [6, 9, 0, 5],
    "n3L": 9,
    "n5L": 0,
    "n7L": 5,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 6,
    "chordKey": "minmaj7#5",
    "cnName": "\u5C0F\u5927\u4E03\u5347\u4E94",
    "type": "chord7alt",
    "orderedNotesLocationList": [2, 5, 6, 9],
    "notesLocationList": [6, 9, 2, 5],
    "n3L": 9,
    "n5L": 2,
    "n7L": 5,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 6,
    "chordKey": "dom7#5b9",
    "cnName": "\u589E\u4E03\u964D\u4E5D\uFF08\u5C5E\u4E03\u5347\u4E94\u964D\u4E5D\uFF09",
    "type": "chord7alt",
    "orderedNotesLocationList": [2, 4, 6, 7, 10],
    "notesLocationList": [6, 10, 2, 4, 7],
    "n3L": 10,
    "n5L": 2,
    "n7L": 4,
    "n9L": 7,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 6,
    "chordKey": "dom7#5#9",
    "cnName": "\u589E\u4E03\u5347\u4E5D\uFF08\u5C5E\u4E03\u5347\u4E94\u5347\u4E5D\uFF09",
    "type": "chord7alt",
    "orderedNotesLocationList": [2, 4, 6, 9, 10],
    "notesLocationList": [6, 10, 2, 4, 9],
    "n3L": 10,
    "n5L": 2,
    "n7L": 4,
    "n9L": 9,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 6,
    "chordKey": "sus2",
    "cnName": "\u6302\u4E8C",
    "type": "sus",
    "orderedNotesLocationList": [1, 6, 8],
    "notesLocationList": [6, 8, 1],
    "n3L": -1,
    "n5L": 1,
    "n7L": -1,
    "n9L": 8,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 6,
    "chordKey": "sus4",
    "cnName": "\u6302\u56DB",
    "type": "sus",
    "orderedNotesLocationList": [1, 6, 11],
    "notesLocationList": [6, 11, 1],
    "n3L": -1,
    "n5L": 1,
    "n7L": -1,
    "n9L": -1,
    "n11L": 11,
    "n13L": -1
}, {
    "rootNoteLocation": 6,
    "chordKey": "dom7sus2",
    "cnName": "\u5C5E\u4E03\u6302\u4E8C",
    "type": "sus",
    "orderedNotesLocationList": [1, 4, 6, 8],
    "notesLocationList": [6, 8, 1, 4],
    "n3L": -1,
    "n5L": 1,
    "n7L": 4,
    "n9L": 8,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 6,
    "chordKey": "dom7sus4",
    "cnName": "\u5C5E\u4E03\u6302\u56DB",
    "type": "sus",
    "orderedNotesLocationList": [1, 4, 6, 11],
    "notesLocationList": [6, 11, 1, 4],
    "n3L": -1,
    "n5L": 1,
    "n7L": 4,
    "n9L": -1,
    "n11L": 11,
    "n13L": -1
}, {
    "rootNoteLocation": 6,
    "chordKey": "maj7sus2",
    "cnName": "\u5927\u4E03\u6302\u4E8C",
    "type": "sus",
    "orderedNotesLocationList": [1, 5, 6, 8],
    "notesLocationList": [6, 8, 1, 5],
    "n3L": -1,
    "n5L": 1,
    "n7L": 5,
    "n9L": 8,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 6,
    "chordKey": "maj7sus4",
    "cnName": "\u5927\u4E03\u6302\u56DB",
    "type": "sus",
    "orderedNotesLocationList": [1, 5, 6, 11],
    "notesLocationList": [6, 11, 1, 5],
    "n3L": -1,
    "n5L": 1,
    "n7L": 5,
    "n9L": -1,
    "n11L": 11,
    "n13L": -1
}, {
    "rootNoteLocation": 6,
    "chordKey": "dom9sus4",
    "cnName": "\u5C5E\u4E5D\u6302\u56DB",
    "type": "sus",
    "orderedNotesLocationList": [1, 4, 6, 8, 11],
    "notesLocationList": [6, 11, 1, 4, 8],
    "n3L": -1,
    "n5L": 1,
    "n7L": 4,
    "n9L": 8,
    "n11L": 11,
    "n13L": -1
}, {
    "rootNoteLocation": 6,
    "chordKey": "maj9sus4",
    "cnName": "\u5927\u4E5D\u6302\u56DB",
    "type": "sus",
    "orderedNotesLocationList": [1, 5, 6, 8, 11],
    "notesLocationList": [6, 11, 1, 5, 8],
    "n3L": -1,
    "n5L": 1,
    "n7L": 5,
    "n9L": 8,
    "n11L": 11,
    "n13L": -1
}, {
    "rootNoteLocation": 6,
    "chordKey": "dom13sus4",
    "cnName": "\u5C5E\u5341\u4E09\u6302\u56DB",
    "type": "sus",
    "orderedNotesLocationList": [1, 3, 4, 6, 8, 11],
    "notesLocationList": [6, 11, 1, 4, 8, 3],
    "n3L": -1,
    "n5L": 1,
    "n7L": 4,
    "n9L": 8,
    "n11L": 11,
    "n13L": 3
}, {
    "rootNoteLocation": 6,
    "chordKey": "maj13sus4",
    "cnName": "\u5927\u5341\u4E09\u6302\u56DB",
    "type": "sus",
    "orderedNotesLocationList": [1, 3, 5, 6, 8, 11],
    "notesLocationList": [6, 11, 1, 5, 8, 3],
    "n3L": -1,
    "n5L": 1,
    "n7L": 5,
    "n9L": 8,
    "n11L": 11,
    "n13L": 3
}, {
    "rootNoteLocation": 6,
    "chordKey": "maj13sus2",
    "cnName": "\u5927\u5341\u4E09\u6302\u4E8C",
    "type": "sus",
    "orderedNotesLocationList": [1, 3, 5, 6, 8],
    "notesLocationList": [6, 8, 1, 5, 3],
    "n3L": -1,
    "n5L": 1,
    "n7L": 5,
    "n9L": 8,
    "n11L": -1,
    "n13L": 3
}, {
    "rootNoteLocation": 6,
    "chordKey": "maj9",
    "cnName": "\u5927\u4E5D",
    "type": "chord9",
    "orderedNotesLocationList": [1, 5, 6, 8, 10],
    "notesLocationList": [6, 10, 1, 5, 8],
    "n3L": 10,
    "n5L": 1,
    "n7L": 5,
    "n9L": 8,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 6,
    "chordKey": "dom9",
    "cnName": "\u5C5E\u4E5D",
    "type": "chord9",
    "orderedNotesLocationList": [1, 4, 6, 8, 10],
    "notesLocationList": [6, 10, 1, 4, 8],
    "n3L": 10,
    "n5L": 1,
    "n7L": 4,
    "n9L": 8,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 6,
    "chordKey": "min9",
    "cnName": "\u5C0F\u4E5D",
    "type": "chord9",
    "orderedNotesLocationList": [1, 4, 6, 8, 9],
    "notesLocationList": [6, 9, 1, 4, 8],
    "n3L": 9,
    "n5L": 1,
    "n7L": 4,
    "n9L": 8,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 6,
    "chordKey": "minmaj9",
    "cnName": "\u5C0F\u5927\u4E5D",
    "type": "chord9",
    "orderedNotesLocationList": [1, 5, 6, 8, 9],
    "notesLocationList": [6, 9, 1, 5, 8],
    "n3L": 9,
    "n5L": 1,
    "n7L": 5,
    "n9L": 8,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 6,
    "chordKey": "dom9#5",
    "cnName": "\u589E\u4E5D\uFF08\u5C5E\u4E5D\u5347\u4E94\uFF09",
    "type": "chord9",
    "orderedNotesLocationList": [2, 4, 6, 8, 10],
    "notesLocationList": [6, 10, 2, 4, 8],
    "n3L": 10,
    "n5L": 2,
    "n7L": 4,
    "n9L": 8,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 6,
    "chordKey": "dom9b9",
    "cnName": "\u5C5E\u4E5D\u964D\u4E5D",
    "type": "chord9",
    "orderedNotesLocationList": [1, 4, 6, 7, 10],
    "notesLocationList": [6, 10, 1, 4, 7],
    "n3L": 10,
    "n5L": 1,
    "n7L": 4,
    "n9L": 7,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 6,
    "chordKey": "dom9b11",
    "cnName": "\u5C5E\u4E5D\u964D\u5341\u4E00",
    "type": "chord9",
    "orderedNotesLocationList": [1, 4, 6, 8, 10, 10],
    "notesLocationList": [6, 10, 1, 4, 8, 10],
    "n3L": 10,
    "n5L": 1,
    "n7L": 4,
    "n9L": 8,
    "n11L": 10,
    "n13L": -1
}, {
    "rootNoteLocation": 6,
    "chordKey": "dom9#11",
    "cnName": "\u5C5E\u4E5D\u5347\u5341\u4E00",
    "type": "chord9",
    "orderedNotesLocationList": [0, 1, 4, 6, 8, 10],
    "notesLocationList": [6, 10, 1, 4, 8, 0],
    "n3L": 10,
    "n5L": 1,
    "n7L": 4,
    "n9L": 8,
    "n11L": 0,
    "n13L": -1
}, {
    "rootNoteLocation": 6,
    "chordKey": "dom9b13",
    "cnName": "\u5C5E\u4E5D\u964D\u5341\u4E09",
    "type": "chord9",
    "orderedNotesLocationList": [1, 2, 4, 6, 8, 10],
    "notesLocationList": [6, 10, 1, 4, 8, 2],
    "n3L": 10,
    "n5L": 1,
    "n7L": 4,
    "n9L": 8,
    "n11L": -1,
    "n13L": 2
}, {
    "rootNoteLocation": 6,
    "chordKey": "maj9b5",
    "cnName": "\u5927\u4E5D\u964D\u4E94",
    "type": "chord9",
    "orderedNotesLocationList": [0, 5, 6, 8, 10],
    "notesLocationList": [6, 10, 0, 5, 8],
    "n3L": 10,
    "n5L": 0,
    "n7L": 5,
    "n9L": 8,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 6,
    "chordKey": "maj9#5",
    "cnName": "\u5927\u4E5D\u5347\u4E94",
    "type": "chord9",
    "orderedNotesLocationList": [2, 5, 6, 8, 10],
    "notesLocationList": [6, 10, 2, 5, 8],
    "n3L": 10,
    "n5L": 2,
    "n7L": 5,
    "n9L": 8,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 6,
    "chordKey": "maj9#11",
    "cnName": "\u5927\u4E5D\u5347\u5341\u4E00",
    "type": "chord9",
    "orderedNotesLocationList": [0, 1, 5, 6, 8, 10],
    "notesLocationList": [6, 10, 1, 5, 8, 0],
    "n3L": 10,
    "n5L": 1,
    "n7L": 5,
    "n9L": 8,
    "n11L": 0,
    "n13L": -1
}, {
    "rootNoteLocation": 6,
    "chordKey": "maj9b13",
    "cnName": "\u5927\u4E5D\u964D\u5341\u4E09",
    "type": "chord9",
    "orderedNotesLocationList": [0, 2, 5, 6, 8, 10],
    "notesLocationList": [6, 10, 0, 5, 8, 2],
    "n3L": 10,
    "n5L": 0,
    "n7L": 5,
    "n9L": 8,
    "n11L": -1,
    "n13L": 2
}, {
    "rootNoteLocation": 6,
    "chordKey": "min9b5",
    "cnName": "\u5C0F\u4E5D\u964D\u4E94",
    "type": "chord9",
    "orderedNotesLocationList": [0, 4, 6, 8, 9],
    "notesLocationList": [6, 9, 0, 4, 8],
    "n3L": 9,
    "n5L": 0,
    "n7L": 4,
    "n9L": 8,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 6,
    "chordKey": "min9b9",
    "cnName": "\u5C0F\u4E5D\u964D\u4E5D",
    "type": "chord9",
    "orderedNotesLocationList": [1, 4, 6, 7, 9],
    "notesLocationList": [6, 9, 1, 4, 7],
    "n3L": 9,
    "n5L": 1,
    "n7L": 4,
    "n9L": 7,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 6,
    "chordKey": "maj11",
    "cnName": "\u5927\u5341\u4E00",
    "type": "chord11",
    "orderedNotesLocationList": [1, 5, 6, 8, 10, 11],
    "notesLocationList": [6, 10, 1, 5, 8, 11],
    "n3L": 10,
    "n5L": 1,
    "n7L": 5,
    "n9L": 8,
    "n11L": 11,
    "n13L": -1
}, {
    "rootNoteLocation": 6,
    "chordKey": "dom11",
    "cnName": "\u5C5E\u5341\u4E00",
    "type": "chord11",
    "orderedNotesLocationList": [1, 4, 6, 8, 10, 11],
    "notesLocationList": [6, 10, 1, 4, 8, 11],
    "n3L": 10,
    "n5L": 1,
    "n7L": 4,
    "n9L": 8,
    "n11L": 11,
    "n13L": -1
}, {
    "rootNoteLocation": 6,
    "chordKey": "min11",
    "cnName": "\u5C0F\u5341\u4E00",
    "type": "chord11",
    "orderedNotesLocationList": [1, 4, 6, 8, 9, 11],
    "notesLocationList": [6, 9, 1, 4, 8, 11],
    "n3L": 9,
    "n5L": 1,
    "n7L": 4,
    "n9L": 8,
    "n11L": 11,
    "n13L": -1
}, {
    "rootNoteLocation": 6,
    "chordKey": "minmaj11",
    "cnName": "\u5C0F\u5927\u5341\u4E00",
    "type": "chord11",
    "orderedNotesLocationList": [1, 5, 6, 8, 9, 11],
    "notesLocationList": [6, 9, 1, 5, 8, 11],
    "n3L": 9,
    "n5L": 1,
    "n7L": 5,
    "n9L": 8,
    "n11L": 11,
    "n13L": -1
}, {
    "rootNoteLocation": 6,
    "chordKey": "dom11b5",
    "cnName": "\u5C5E\u5341\u4E00\u964D\u4E94",
    "type": "chord11",
    "orderedNotesLocationList": [0, 4, 6, 8, 10, 11],
    "notesLocationList": [6, 10, 0, 4, 8, 11],
    "n3L": 10,
    "n5L": 0,
    "n7L": 4,
    "n9L": 8,
    "n11L": 11,
    "n13L": -1
}, {
    "rootNoteLocation": 6,
    "chordKey": "dom11#5",
    "cnName": "\u5C5E\u5341\u4E00\u5347\u4E94",
    "type": "chord11",
    "orderedNotesLocationList": [2, 4, 6, 8, 10, 11],
    "notesLocationList": [6, 10, 2, 4, 8, 11],
    "n3L": 10,
    "n5L": 2,
    "n7L": 4,
    "n9L": 8,
    "n11L": 11,
    "n13L": -1
}, {
    "rootNoteLocation": 6,
    "chordKey": "dom11b9",
    "cnName": "\u5C5E\u5341\u4E00\u964D\u4E5D",
    "type": "chord11",
    "orderedNotesLocationList": [1, 4, 6, 7, 10, 11],
    "notesLocationList": [6, 10, 1, 4, 7, 11],
    "n3L": 10,
    "n5L": 1,
    "n7L": 4,
    "n9L": 7,
    "n11L": 11,
    "n13L": -1
}, {
    "rootNoteLocation": 6,
    "chordKey": "dom11#9",
    "cnName": "\u5C5E\u5341\u4E00\u5347\u4E5D",
    "type": "chord11",
    "orderedNotesLocationList": [1, 4, 6, 9, 10, 11],
    "notesLocationList": [6, 10, 1, 4, 9, 11],
    "n3L": 10,
    "n5L": 1,
    "n7L": 4,
    "n9L": 9,
    "n11L": 11,
    "n13L": -1
}, {
    "rootNoteLocation": 6,
    "chordKey": "dom11b13",
    "cnName": "\u5C5E\u5341\u4E00\u964D\u5341\u4E09",
    "type": "chord11",
    "orderedNotesLocationList": [1, 2, 4, 6, 8, 10, 11],
    "notesLocationList": [6, 10, 1, 4, 8, 11, 2],
    "n3L": 10,
    "n5L": 1,
    "n7L": 4,
    "n9L": 8,
    "n11L": 11,
    "n13L": 2
}, {
    "rootNoteLocation": 6,
    "chordKey": "min11b5",
    "cnName": "\u5C0F\u5341\u4E00\u964D\u4E94",
    "type": "chord11",
    "orderedNotesLocationList": [0, 4, 6, 8, 9, 11],
    "notesLocationList": [6, 9, 0, 4, 8, 11],
    "n3L": 9,
    "n5L": 0,
    "n7L": 4,
    "n9L": 8,
    "n11L": 11,
    "n13L": -1
}, {
    "rootNoteLocation": 6,
    "chordKey": "maj13",
    "cnName": "\u5927\u5341\u4E09",
    "type": "chord13",
    "orderedNotesLocationList": [1, 3, 5, 6, 8, 10, 11],
    "notesLocationList": [6, 10, 1, 5, 8, 11, 3],
    "n3L": 10,
    "n5L": 1,
    "n7L": 5,
    "n9L": 8,
    "n11L": 11,
    "n13L": 3
}, {
    "rootNoteLocation": 6,
    "chordKey": "dom13",
    "cnName": "\u5C5E\u5341\u4E09",
    "type": "chord13",
    "orderedNotesLocationList": [1, 3, 4, 6, 8, 10, 11],
    "notesLocationList": [6, 10, 1, 4, 8, 11, 3],
    "n3L": 10,
    "n5L": 1,
    "n7L": 4,
    "n9L": 8,
    "n11L": 11,
    "n13L": 3
}, {
    "rootNoteLocation": 6,
    "chordKey": "min13",
    "cnName": "\u5C0F\u5341\u4E09",
    "type": "chord13",
    "orderedNotesLocationList": [1, 3, 4, 6, 8, 9, 11],
    "notesLocationList": [6, 9, 1, 4, 8, 11, 3],
    "n3L": 9,
    "n5L": 1,
    "n7L": 4,
    "n9L": 8,
    "n11L": 11,
    "n13L": 3
}, {
    "rootNoteLocation": 6,
    "chordKey": "minmaj13",
    "cnName": "\u5C0F\u5927\u5341\u4E09",
    "type": "chord13",
    "orderedNotesLocationList": [1, 3, 5, 6, 8, 9, 11],
    "notesLocationList": [6, 9, 1, 5, 8, 11, 3],
    "n3L": 9,
    "n5L": 1,
    "n7L": 5,
    "n9L": 8,
    "n11L": 11,
    "n13L": 3
}, {
    "rootNoteLocation": 6,
    "chordKey": "dom13b5",
    "cnName": "\u5C5E\u5341\u4E09\u964D\u4E94",
    "type": "chord13",
    "orderedNotesLocationList": [0, 3, 4, 6, 8, 10, 11],
    "notesLocationList": [6, 10, 0, 4, 8, 11, 3],
    "n3L": 10,
    "n5L": 0,
    "n7L": 4,
    "n9L": 8,
    "n11L": 11,
    "n13L": 3
}, {
    "rootNoteLocation": 6,
    "chordKey": "dom13#5",
    "cnName": "\u5C5E\u5341\u4E09\u5347\u4E94",
    "type": "chord13",
    "orderedNotesLocationList": [2, 3, 4, 6, 8, 10, 11],
    "notesLocationList": [6, 10, 2, 4, 8, 11, 3],
    "n3L": 10,
    "n5L": 2,
    "n7L": 4,
    "n9L": 8,
    "n11L": 11,
    "n13L": 3
}, {
    "rootNoteLocation": 6,
    "chordKey": "dom13b9",
    "cnName": "\u5C5E\u5341\u4E09\u964D\u4E5D",
    "type": "chord13",
    "orderedNotesLocationList": [1, 3, 4, 6, 7, 10, 11],
    "notesLocationList": [6, 10, 1, 4, 7, 11, 3],
    "n3L": 10,
    "n5L": 1,
    "n7L": 4,
    "n9L": 7,
    "n11L": 11,
    "n13L": 3
}, {
    "rootNoteLocation": 6,
    "chordKey": "dom13#9",
    "cnName": "\u5C5E\u5341\u4E09\u5347\u4E5D",
    "type": "chord13",
    "orderedNotesLocationList": [1, 3, 4, 6, 9, 10],
    "notesLocationList": [6, 10, 1, 4, 9, 3],
    "n3L": 10,
    "n5L": 1,
    "n7L": 4,
    "n9L": 9,
    "n11L": -1,
    "n13L": 3
}, {
    "rootNoteLocation": 6,
    "chordKey": "dom13#11",
    "cnName": "\u5C5E\u5341\u4E09\u5347\u5341\u4E00",
    "type": "chord13",
    "orderedNotesLocationList": [0, 1, 3, 4, 6, 8, 10],
    "notesLocationList": [6, 10, 1, 4, 8, 0, 3],
    "n3L": 10,
    "n5L": 1,
    "n7L": 4,
    "n9L": 8,
    "n11L": 0,
    "n13L": 3
}, {
    "rootNoteLocation": 6,
    "chordKey": "maj13b5",
    "cnName": "\u5927\u5341\u4E09\u964D\u4E94",
    "type": "chord13",
    "orderedNotesLocationList": [0, 3, 5, 6, 8, 10],
    "notesLocationList": [6, 10, 0, 5, 8, 3],
    "n3L": 10,
    "n5L": 0,
    "n7L": 5,
    "n9L": 8,
    "n11L": -1,
    "n13L": 3
}, {
    "rootNoteLocation": 6,
    "chordKey": "maj13#5",
    "cnName": "\u5927\u5341\u4E09\u5347\u4E94",
    "type": "chord13",
    "orderedNotesLocationList": [2, 3, 5, 6, 8, 10],
    "notesLocationList": [6, 10, 2, 5, 8, 3],
    "n3L": 10,
    "n5L": 2,
    "n7L": 5,
    "n9L": 8,
    "n11L": -1,
    "n13L": 3
}, {
    "rootNoteLocation": 6,
    "chordKey": "maj13b9",
    "cnName": "\u5927\u5341\u4E09\u964D\u4E5D",
    "type": "chord13",
    "orderedNotesLocationList": [1, 3, 5, 6, 7, 10],
    "notesLocationList": [6, 10, 1, 5, 7, 3],
    "n3L": 10,
    "n5L": 1,
    "n7L": 5,
    "n9L": 7,
    "n11L": -1,
    "n13L": 3
}, {
    "rootNoteLocation": 6,
    "chordKey": "maj13#11",
    "cnName": "\u5927\u5341\u4E09\u5347\u5341\u4E00",
    "type": "chord13",
    "orderedNotesLocationList": [0, 1, 3, 5, 6, 8, 10],
    "notesLocationList": [6, 10, 1, 5, 8, 0, 3],
    "n3L": 10,
    "n5L": 1,
    "n7L": 5,
    "n9L": 8,
    "n11L": 0,
    "n13L": 3
}, {
    "rootNoteLocation": 7,
    "chordKey": "maj3",
    "cnName": "\u5927\u4E09",
    "type": "chord3",
    "orderedNotesLocationList": [2, 7, 11],
    "notesLocationList": [7, 11, 2],
    "n3L": 11,
    "n5L": 2,
    "n7L": -1,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 7,
    "chordKey": "min3",
    "cnName": "\u5C0F\u4E09",
    "type": "chord3",
    "orderedNotesLocationList": [2, 7, 10],
    "notesLocationList": [7, 10, 2],
    "n3L": 10,
    "n5L": 2,
    "n7L": -1,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 7,
    "chordKey": "dim3",
    "cnName": "\u51CF\u4E09",
    "type": "chord3",
    "orderedNotesLocationList": [1, 7, 10],
    "notesLocationList": [7, 10, 1],
    "n3L": 10,
    "n5L": 1,
    "n7L": -1,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 7,
    "chordKey": "aug3",
    "cnName": "\u589E\u4E09",
    "type": "chord3",
    "orderedNotesLocationList": [3, 7, 11],
    "notesLocationList": [7, 11, 3],
    "n3L": 11,
    "n5L": 3,
    "n7L": -1,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 7,
    "chordKey": "maj3b5",
    "cnName": "\u5927\u4E09\u51CF\u4E94",
    "type": "chord3",
    "orderedNotesLocationList": [1, 7, 11],
    "notesLocationList": [7, 11, 1],
    "n3L": 11,
    "n5L": 1,
    "n7L": -1,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 7,
    "chordKey": "maj3add6",
    "cnName": "\u5927\u516D\uFF08\u5927\u4E09\u52A0\u5341\u4E09\u97F3\uFF09",
    "type": "add",
    "orderedNotesLocationList": [2, 4, 7, 11],
    "notesLocationList": [7, 11, 2, 4],
    "n3L": 11,
    "n5L": 2,
    "n7L": -1,
    "n9L": -1,
    "n11L": -1,
    "n13L": 4
}, {
    "rootNoteLocation": 7,
    "chordKey": "min3add6",
    "cnName": "\u5C0F\u516D\uFF08\u5C0F\u4E09\u52A0\u5341\u4E09\u97F3\uFF09",
    "type": "add",
    "orderedNotesLocationList": [2, 3, 7, 10],
    "notesLocationList": [7, 10, 2, 3],
    "n3L": 10,
    "n5L": 2,
    "n7L": -1,
    "n9L": -1,
    "n11L": -1,
    "n13L": 3
}, {
    "rootNoteLocation": 7,
    "chordKey": "maj3add6add9",
    "cnName": "\u516D\u4E5D",
    "type": "add",
    "orderedNotesLocationList": [2, 4, 7, 9, 11],
    "notesLocationList": [7, 11, 2, 4, 9],
    "n3L": 11,
    "n5L": 2,
    "n7L": -1,
    "n9L": 9,
    "n11L": -1,
    "n13L": 4
}, {
    "rootNoteLocation": 7,
    "chordKey": "min3add6add9",
    "cnName": "\u5C0F\u516D\u4E5D",
    "type": "add",
    "orderedNotesLocationList": [2, 4, 7, 9, 10],
    "notesLocationList": [7, 10, 2, 4, 9],
    "n3L": 10,
    "n5L": 2,
    "n7L": -1,
    "n9L": 9,
    "n11L": -1,
    "n13L": 4
}, {
    "rootNoteLocation": 7,
    "chordKey": "maj3add9",
    "cnName": "\u5927\u4E09\u52A0\u4E5D\u97F3\uFF08\u4E8C\u97F3\uFF09",
    "type": "add",
    "orderedNotesLocationList": [2, 7, 9, 11],
    "notesLocationList": [7, 11, 2, 9],
    "n3L": 11,
    "n5L": 2,
    "n7L": -1,
    "n9L": 9,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 7,
    "chordKey": "maj3add11",
    "cnName": "\u5927\u4E09\u52A0\u5341\u4E00\u97F3\uFF08\u56DB\u97F3\uFF09",
    "type": "add",
    "orderedNotesLocationList": [0, 2, 7, 11],
    "notesLocationList": [7, 11, 2, 0],
    "n3L": 11,
    "n5L": 2,
    "n7L": -1,
    "n9L": -1,
    "n11L": 0,
    "n13L": -1
}, {
    "rootNoteLocation": 7,
    "chordKey": "min3add9",
    "cnName": "\u5C0F\u4E09\u52A0\u4E5D\u97F3\uFF08\u4E8C\u97F3\uFF09",
    "type": "add",
    "orderedNotesLocationList": [2, 7, 9, 10],
    "notesLocationList": [7, 10, 2, 9],
    "n3L": 10,
    "n5L": 2,
    "n7L": -1,
    "n9L": 9,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 7,
    "chordKey": "min3add11",
    "cnName": "\u5C0F\u4E09\u52A0\u5341\u4E00\u97F3\uFF08\u56DB\u97F3\uFF09",
    "type": "add",
    "orderedNotesLocationList": [0, 2, 7, 10],
    "notesLocationList": [7, 10, 2, 0],
    "n3L": 10,
    "n5L": 2,
    "n7L": -1,
    "n9L": -1,
    "n11L": 0,
    "n13L": -1
}, {
    "rootNoteLocation": 7,
    "chordKey": "maj7add11",
    "cnName": "\u5927\u4E03\u52A0\u5341\u4E00\u97F3\uFF08\u56DB\u97F3\uFF09",
    "type": "add",
    "orderedNotesLocationList": [0, 2, 6, 7, 11],
    "notesLocationList": [7, 11, 2, 6, 0],
    "n3L": 11,
    "n5L": 2,
    "n7L": 6,
    "n9L": -1,
    "n11L": 0,
    "n13L": -1
}, {
    "rootNoteLocation": 7,
    "chordKey": "dom7add6",
    "cnName": "\u5C5E\u4E03\u52A0\u516D\u97F3",
    "type": "add",
    "orderedNotesLocationList": [2, 4, 5, 7, 11],
    "notesLocationList": [7, 11, 2, 4, 5],
    "n3L": 11,
    "n5L": 2,
    "n7L": 5,
    "n9L": -1,
    "n11L": -1,
    "n13L": 4
}, {
    "rootNoteLocation": 7,
    "chordKey": "itaug6",
    "cnName": "\u610F\u5927\u5229\u589E\u516D",
    "type": "aug6",
    "orderedNotesLocationList": [1, 3, 7],
    "notesLocationList": [7, 1, 3],
    "n3L": -1,
    "n5L": -1,
    "n7L": -1,
    "n9L": -1,
    "n11L": 1,
    "n13L": 3
}, {
    "rootNoteLocation": 7,
    "chordKey": "fraug6",
    "cnName": "\u6CD5\u56FD\u589E\u516D",
    "type": "aug6",
    "orderedNotesLocationList": [1, 3, 7, 9],
    "notesLocationList": [7, 9, 1, 3],
    "n3L": -1,
    "n5L": -1,
    "n7L": -1,
    "n9L": 9,
    "n11L": 1,
    "n13L": 3
}, {
    "rootNoteLocation": 7,
    "chordKey": "graug6",
    "cnName": "\u5FB7\u56FD\u589E\u516D",
    "type": "aug6",
    "orderedNotesLocationList": [1, 3, 7, 10],
    "notesLocationList": [7, 10, 1, 3],
    "n3L": 10,
    "n5L": -1,
    "n7L": -1,
    "n9L": -1,
    "n11L": 1,
    "n13L": 3
}, {
    "rootNoteLocation": 7,
    "chordKey": "maj7",
    "cnName": "\u5927\u4E03",
    "type": "chord7",
    "orderedNotesLocationList": [2, 6, 7, 11],
    "notesLocationList": [7, 11, 2, 6],
    "n3L": 11,
    "n5L": 2,
    "n7L": 6,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 7,
    "chordKey": "dom7",
    "cnName": "\u5C5E\u4E03",
    "type": "chord7",
    "orderedNotesLocationList": [2, 5, 7, 11],
    "notesLocationList": [7, 11, 2, 5],
    "n3L": 11,
    "n5L": 2,
    "n7L": 5,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 7,
    "chordKey": "min7",
    "cnName": "\u5C0F\u4E03",
    "type": "chord7",
    "orderedNotesLocationList": [2, 5, 7, 10],
    "notesLocationList": [7, 10, 2, 5],
    "n3L": 10,
    "n5L": 2,
    "n7L": 5,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 7,
    "chordKey": "halfdim7",
    "cnName": "\u534A\u51CF\u4E03",
    "type": "chord7",
    "orderedNotesLocationList": [1, 5, 7, 10],
    "notesLocationList": [7, 10, 1, 5],
    "n3L": 10,
    "n5L": 1,
    "n7L": 5,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 7,
    "chordKey": "dim7",
    "cnName": "\u51CF\u4E03",
    "type": "chord7",
    "orderedNotesLocationList": [1, 4, 7, 10],
    "notesLocationList": [7, 10, 1, 4],
    "n3L": 10,
    "n5L": 1,
    "n7L": 4,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 7,
    "chordKey": "minmaj7",
    "cnName": "\u5C0F\u5927\u4E03",
    "type": "chord7",
    "orderedNotesLocationList": [2, 6, 7, 10],
    "notesLocationList": [7, 10, 2, 6],
    "n3L": 10,
    "n5L": 2,
    "n7L": 6,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 7,
    "chordKey": "dom7#5",
    "cnName": "\u589E\u4E03\uFF08\u5C5E\u4E03\u5347\u4E94\uFF09",
    "type": "chord7",
    "orderedNotesLocationList": [3, 5, 7, 11],
    "notesLocationList": [7, 11, 3, 5],
    "n3L": 11,
    "n5L": 3,
    "n7L": 5,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 7,
    "chordKey": "augmaj7",
    "cnName": "\u589E\u5927\u4E03",
    "type": "chord7",
    "orderedNotesLocationList": [3, 6, 7, 11],
    "notesLocationList": [7, 11, 3, 6],
    "n3L": 11,
    "n5L": 3,
    "n7L": 6,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 7,
    "chordKey": "dom7b5",
    "cnName": "\u5C5E\u4E03\u964D\u4E94",
    "type": "chord7alt",
    "orderedNotesLocationList": [1, 5, 7, 11],
    "notesLocationList": [7, 11, 1, 5],
    "n3L": 11,
    "n5L": 1,
    "n7L": 5,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 7,
    "chordKey": "dom7b9",
    "cnName": "\u5C5E\u4E03\u964D\u4E5D",
    "type": "chord7alt",
    "orderedNotesLocationList": [2, 5, 7, 8, 11],
    "notesLocationList": [7, 11, 2, 5, 8],
    "n3L": 11,
    "n5L": 2,
    "n7L": 5,
    "n9L": 8,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 7,
    "chordKey": "dom7#9",
    "cnName": "\u5C5E\u4E03\u5347\u4E5D",
    "type": "chord7alt",
    "orderedNotesLocationList": [2, 5, 7, 10, 11],
    "notesLocationList": [7, 11, 2, 5, 10],
    "n3L": 11,
    "n5L": 2,
    "n7L": 5,
    "n9L": 10,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 7,
    "chordKey": "dom7#11",
    "cnName": "\u5C5E\u4E03\u5347\u5341\u4E00",
    "type": "chord7alt",
    "orderedNotesLocationList": [1, 2, 5, 7, 11],
    "notesLocationList": [7, 11, 2, 5, 1],
    "n3L": 11,
    "n5L": 2,
    "n7L": 5,
    "n9L": -1,
    "n11L": 1,
    "n13L": -1
}, {
    "rootNoteLocation": 7,
    "chordKey": "dom7b13",
    "cnName": "\u5C5E\u4E03\u964D\u5341\u4E09",
    "type": "chord7alt",
    "orderedNotesLocationList": [2, 3, 5, 7, 11],
    "notesLocationList": [7, 11, 2, 5, 3],
    "n3L": 11,
    "n5L": 2,
    "n7L": 5,
    "n9L": -1,
    "n11L": -1,
    "n13L": 3
}, {
    "rootNoteLocation": 7,
    "chordKey": "dom7b5b9",
    "cnName": "\u5C5E\u4E03\u964D\u4E94\u964D\u4E5D",
    "type": "chord7alt",
    "orderedNotesLocationList": [1, 5, 7, 8, 11],
    "notesLocationList": [7, 11, 1, 5, 8],
    "n3L": 11,
    "n5L": 1,
    "n7L": 5,
    "n9L": 8,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 7,
    "chordKey": "dom7b5#9",
    "cnName": "\u5C5E\u4E03\u964D\u4E94\u5347\u4E5D",
    "type": "chord7alt",
    "orderedNotesLocationList": [1, 5, 7, 10, 11],
    "notesLocationList": [7, 11, 1, 5, 10],
    "n3L": 11,
    "n5L": 1,
    "n7L": 5,
    "n9L": 10,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 7,
    "chordKey": "maj7b5",
    "cnName": "\u5927\u4E03\u964D\u4E94",
    "type": "chord7alt",
    "orderedNotesLocationList": [1, 6, 7, 11],
    "notesLocationList": [7, 11, 1, 6],
    "n3L": 11,
    "n5L": 1,
    "n7L": 6,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 7,
    "chordKey": "maj7#5",
    "cnName": "\u5927\u4E03\u589E\u4E94",
    "type": "chord7alt",
    "orderedNotesLocationList": [3, 6, 7, 11],
    "notesLocationList": [7, 11, 3, 6],
    "n3L": 11,
    "n5L": 3,
    "n7L": 6,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 7,
    "chordKey": "maj7b9",
    "cnName": "\u5927\u4E03\u964D\u4E5D",
    "type": "chord7alt",
    "orderedNotesLocationList": [2, 6, 7, 8, 11],
    "notesLocationList": [7, 11, 2, 6, 8],
    "n3L": 11,
    "n5L": 2,
    "n7L": 6,
    "n9L": 8,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 7,
    "chordKey": "maj7b13",
    "cnName": "\u5927\u4E03\u964D\u5341\u4E09",
    "type": "chord7alt",
    "orderedNotesLocationList": [2, 3, 6, 7, 11],
    "notesLocationList": [7, 11, 2, 6, 3],
    "n3L": 11,
    "n5L": 2,
    "n7L": 6,
    "n9L": -1,
    "n11L": -1,
    "n13L": 3
}, {
    "rootNoteLocation": 7,
    "chordKey": "maj7#11",
    "cnName": "\u5927\u4E03\u5347\u5341\u4E00",
    "type": "chord7alt",
    "orderedNotesLocationList": [1, 2, 6, 7, 11],
    "notesLocationList": [7, 11, 2, 6, 1],
    "n3L": 11,
    "n5L": 2,
    "n7L": 6,
    "n9L": -1,
    "n11L": 1,
    "n13L": -1
}, {
    "rootNoteLocation": 7,
    "chordKey": "min7#5",
    "cnName": "\u5C0F\u4E03\u5347\u4E94",
    "type": "chord7alt",
    "orderedNotesLocationList": [3, 5, 7, 10],
    "notesLocationList": [7, 10, 3, 5],
    "n3L": 10,
    "n5L": 3,
    "n7L": 5,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 7,
    "chordKey": "minmaj7b5",
    "cnName": "\u5C0F\u5927\u4E03\u964D\u4E94",
    "type": "chord7alt",
    "orderedNotesLocationList": [1, 6, 7, 10],
    "notesLocationList": [7, 10, 1, 6],
    "n3L": 10,
    "n5L": 1,
    "n7L": 6,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 7,
    "chordKey": "minmaj7#5",
    "cnName": "\u5C0F\u5927\u4E03\u5347\u4E94",
    "type": "chord7alt",
    "orderedNotesLocationList": [3, 6, 7, 10],
    "notesLocationList": [7, 10, 3, 6],
    "n3L": 10,
    "n5L": 3,
    "n7L": 6,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 7,
    "chordKey": "dom7#5b9",
    "cnName": "\u589E\u4E03\u964D\u4E5D\uFF08\u5C5E\u4E03\u5347\u4E94\u964D\u4E5D\uFF09",
    "type": "chord7alt",
    "orderedNotesLocationList": [3, 5, 7, 8, 11],
    "notesLocationList": [7, 11, 3, 5, 8],
    "n3L": 11,
    "n5L": 3,
    "n7L": 5,
    "n9L": 8,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 7,
    "chordKey": "dom7#5#9",
    "cnName": "\u589E\u4E03\u5347\u4E5D\uFF08\u5C5E\u4E03\u5347\u4E94\u5347\u4E5D\uFF09",
    "type": "chord7alt",
    "orderedNotesLocationList": [3, 5, 7, 10, 11],
    "notesLocationList": [7, 11, 3, 5, 10],
    "n3L": 11,
    "n5L": 3,
    "n7L": 5,
    "n9L": 10,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 7,
    "chordKey": "sus2",
    "cnName": "\u6302\u4E8C",
    "type": "sus",
    "orderedNotesLocationList": [2, 7, 9],
    "notesLocationList": [7, 9, 2],
    "n3L": -1,
    "n5L": 2,
    "n7L": -1,
    "n9L": 9,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 7,
    "chordKey": "sus4",
    "cnName": "\u6302\u56DB",
    "type": "sus",
    "orderedNotesLocationList": [0, 2, 7],
    "notesLocationList": [7, 0, 2],
    "n3L": -1,
    "n5L": 2,
    "n7L": -1,
    "n9L": -1,
    "n11L": 0,
    "n13L": -1
}, {
    "rootNoteLocation": 7,
    "chordKey": "dom7sus2",
    "cnName": "\u5C5E\u4E03\u6302\u4E8C",
    "type": "sus",
    "orderedNotesLocationList": [2, 5, 7, 9],
    "notesLocationList": [7, 9, 2, 5],
    "n3L": -1,
    "n5L": 2,
    "n7L": 5,
    "n9L": 9,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 7,
    "chordKey": "dom7sus4",
    "cnName": "\u5C5E\u4E03\u6302\u56DB",
    "type": "sus",
    "orderedNotesLocationList": [0, 2, 5, 7],
    "notesLocationList": [7, 0, 2, 5],
    "n3L": -1,
    "n5L": 2,
    "n7L": 5,
    "n9L": -1,
    "n11L": 0,
    "n13L": -1
}, {
    "rootNoteLocation": 7,
    "chordKey": "maj7sus2",
    "cnName": "\u5927\u4E03\u6302\u4E8C",
    "type": "sus",
    "orderedNotesLocationList": [2, 6, 7, 9],
    "notesLocationList": [7, 9, 2, 6],
    "n3L": -1,
    "n5L": 2,
    "n7L": 6,
    "n9L": 9,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 7,
    "chordKey": "maj7sus4",
    "cnName": "\u5927\u4E03\u6302\u56DB",
    "type": "sus",
    "orderedNotesLocationList": [0, 2, 6, 7],
    "notesLocationList": [7, 0, 2, 6],
    "n3L": -1,
    "n5L": 2,
    "n7L": 6,
    "n9L": -1,
    "n11L": 0,
    "n13L": -1
}, {
    "rootNoteLocation": 7,
    "chordKey": "dom9sus4",
    "cnName": "\u5C5E\u4E5D\u6302\u56DB",
    "type": "sus",
    "orderedNotesLocationList": [0, 2, 5, 7, 9],
    "notesLocationList": [7, 0, 2, 5, 9],
    "n3L": -1,
    "n5L": 2,
    "n7L": 5,
    "n9L": 9,
    "n11L": 0,
    "n13L": -1
}, {
    "rootNoteLocation": 7,
    "chordKey": "maj9sus4",
    "cnName": "\u5927\u4E5D\u6302\u56DB",
    "type": "sus",
    "orderedNotesLocationList": [0, 2, 6, 7, 9],
    "notesLocationList": [7, 0, 2, 6, 9],
    "n3L": -1,
    "n5L": 2,
    "n7L": 6,
    "n9L": 9,
    "n11L": 0,
    "n13L": -1
}, {
    "rootNoteLocation": 7,
    "chordKey": "dom13sus4",
    "cnName": "\u5C5E\u5341\u4E09\u6302\u56DB",
    "type": "sus",
    "orderedNotesLocationList": [0, 2, 4, 5, 7, 9],
    "notesLocationList": [7, 0, 2, 5, 9, 4],
    "n3L": -1,
    "n5L": 2,
    "n7L": 5,
    "n9L": 9,
    "n11L": 0,
    "n13L": 4
}, {
    "rootNoteLocation": 7,
    "chordKey": "maj13sus4",
    "cnName": "\u5927\u5341\u4E09\u6302\u56DB",
    "type": "sus",
    "orderedNotesLocationList": [0, 2, 4, 6, 7, 9],
    "notesLocationList": [7, 0, 2, 6, 9, 4],
    "n3L": -1,
    "n5L": 2,
    "n7L": 6,
    "n9L": 9,
    "n11L": 0,
    "n13L": 4
}, {
    "rootNoteLocation": 7,
    "chordKey": "maj13sus2",
    "cnName": "\u5927\u5341\u4E09\u6302\u4E8C",
    "type": "sus",
    "orderedNotesLocationList": [2, 4, 6, 7, 9],
    "notesLocationList": [7, 9, 2, 6, 4],
    "n3L": -1,
    "n5L": 2,
    "n7L": 6,
    "n9L": 9,
    "n11L": -1,
    "n13L": 4
}, {
    "rootNoteLocation": 7,
    "chordKey": "maj9",
    "cnName": "\u5927\u4E5D",
    "type": "chord9",
    "orderedNotesLocationList": [2, 6, 7, 9, 11],
    "notesLocationList": [7, 11, 2, 6, 9],
    "n3L": 11,
    "n5L": 2,
    "n7L": 6,
    "n9L": 9,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 7,
    "chordKey": "dom9",
    "cnName": "\u5C5E\u4E5D",
    "type": "chord9",
    "orderedNotesLocationList": [2, 5, 7, 9, 11],
    "notesLocationList": [7, 11, 2, 5, 9],
    "n3L": 11,
    "n5L": 2,
    "n7L": 5,
    "n9L": 9,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 7,
    "chordKey": "min9",
    "cnName": "\u5C0F\u4E5D",
    "type": "chord9",
    "orderedNotesLocationList": [2, 5, 7, 9, 10],
    "notesLocationList": [7, 10, 2, 5, 9],
    "n3L": 10,
    "n5L": 2,
    "n7L": 5,
    "n9L": 9,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 7,
    "chordKey": "minmaj9",
    "cnName": "\u5C0F\u5927\u4E5D",
    "type": "chord9",
    "orderedNotesLocationList": [2, 6, 7, 9, 10],
    "notesLocationList": [7, 10, 2, 6, 9],
    "n3L": 10,
    "n5L": 2,
    "n7L": 6,
    "n9L": 9,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 7,
    "chordKey": "dom9#5",
    "cnName": "\u589E\u4E5D\uFF08\u5C5E\u4E5D\u5347\u4E94\uFF09",
    "type": "chord9",
    "orderedNotesLocationList": [3, 5, 7, 9, 11],
    "notesLocationList": [7, 11, 3, 5, 9],
    "n3L": 11,
    "n5L": 3,
    "n7L": 5,
    "n9L": 9,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 7,
    "chordKey": "dom9b9",
    "cnName": "\u5C5E\u4E5D\u964D\u4E5D",
    "type": "chord9",
    "orderedNotesLocationList": [2, 5, 7, 8, 11],
    "notesLocationList": [7, 11, 2, 5, 8],
    "n3L": 11,
    "n5L": 2,
    "n7L": 5,
    "n9L": 8,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 7,
    "chordKey": "dom9b11",
    "cnName": "\u5C5E\u4E5D\u964D\u5341\u4E00",
    "type": "chord9",
    "orderedNotesLocationList": [2, 5, 7, 9, 11, 11],
    "notesLocationList": [7, 11, 2, 5, 9, 11],
    "n3L": 11,
    "n5L": 2,
    "n7L": 5,
    "n9L": 9,
    "n11L": 11,
    "n13L": -1
}, {
    "rootNoteLocation": 7,
    "chordKey": "dom9#11",
    "cnName": "\u5C5E\u4E5D\u5347\u5341\u4E00",
    "type": "chord9",
    "orderedNotesLocationList": [1, 2, 5, 7, 9, 11],
    "notesLocationList": [7, 11, 2, 5, 9, 1],
    "n3L": 11,
    "n5L": 2,
    "n7L": 5,
    "n9L": 9,
    "n11L": 1,
    "n13L": -1
}, {
    "rootNoteLocation": 7,
    "chordKey": "dom9b13",
    "cnName": "\u5C5E\u4E5D\u964D\u5341\u4E09",
    "type": "chord9",
    "orderedNotesLocationList": [2, 3, 5, 7, 9, 11],
    "notesLocationList": [7, 11, 2, 5, 9, 3],
    "n3L": 11,
    "n5L": 2,
    "n7L": 5,
    "n9L": 9,
    "n11L": -1,
    "n13L": 3
}, {
    "rootNoteLocation": 7,
    "chordKey": "maj9b5",
    "cnName": "\u5927\u4E5D\u964D\u4E94",
    "type": "chord9",
    "orderedNotesLocationList": [1, 6, 7, 9, 11],
    "notesLocationList": [7, 11, 1, 6, 9],
    "n3L": 11,
    "n5L": 1,
    "n7L": 6,
    "n9L": 9,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 7,
    "chordKey": "maj9#5",
    "cnName": "\u5927\u4E5D\u5347\u4E94",
    "type": "chord9",
    "orderedNotesLocationList": [3, 6, 7, 9, 11],
    "notesLocationList": [7, 11, 3, 6, 9],
    "n3L": 11,
    "n5L": 3,
    "n7L": 6,
    "n9L": 9,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 7,
    "chordKey": "maj9#11",
    "cnName": "\u5927\u4E5D\u5347\u5341\u4E00",
    "type": "chord9",
    "orderedNotesLocationList": [1, 2, 6, 7, 9, 11],
    "notesLocationList": [7, 11, 2, 6, 9, 1],
    "n3L": 11,
    "n5L": 2,
    "n7L": 6,
    "n9L": 9,
    "n11L": 1,
    "n13L": -1
}, {
    "rootNoteLocation": 7,
    "chordKey": "maj9b13",
    "cnName": "\u5927\u4E5D\u964D\u5341\u4E09",
    "type": "chord9",
    "orderedNotesLocationList": [1, 3, 6, 7, 9, 11],
    "notesLocationList": [7, 11, 1, 6, 9, 3],
    "n3L": 11,
    "n5L": 1,
    "n7L": 6,
    "n9L": 9,
    "n11L": -1,
    "n13L": 3
}, {
    "rootNoteLocation": 7,
    "chordKey": "min9b5",
    "cnName": "\u5C0F\u4E5D\u964D\u4E94",
    "type": "chord9",
    "orderedNotesLocationList": [1, 5, 7, 9, 10],
    "notesLocationList": [7, 10, 1, 5, 9],
    "n3L": 10,
    "n5L": 1,
    "n7L": 5,
    "n9L": 9,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 7,
    "chordKey": "min9b9",
    "cnName": "\u5C0F\u4E5D\u964D\u4E5D",
    "type": "chord9",
    "orderedNotesLocationList": [2, 5, 7, 8, 10],
    "notesLocationList": [7, 10, 2, 5, 8],
    "n3L": 10,
    "n5L": 2,
    "n7L": 5,
    "n9L": 8,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 7,
    "chordKey": "maj11",
    "cnName": "\u5927\u5341\u4E00",
    "type": "chord11",
    "orderedNotesLocationList": [0, 2, 6, 7, 9, 11],
    "notesLocationList": [7, 11, 2, 6, 9, 0],
    "n3L": 11,
    "n5L": 2,
    "n7L": 6,
    "n9L": 9,
    "n11L": 0,
    "n13L": -1
}, {
    "rootNoteLocation": 7,
    "chordKey": "dom11",
    "cnName": "\u5C5E\u5341\u4E00",
    "type": "chord11",
    "orderedNotesLocationList": [0, 2, 5, 7, 9, 11],
    "notesLocationList": [7, 11, 2, 5, 9, 0],
    "n3L": 11,
    "n5L": 2,
    "n7L": 5,
    "n9L": 9,
    "n11L": 0,
    "n13L": -1
}, {
    "rootNoteLocation": 7,
    "chordKey": "min11",
    "cnName": "\u5C0F\u5341\u4E00",
    "type": "chord11",
    "orderedNotesLocationList": [0, 2, 5, 7, 9, 10],
    "notesLocationList": [7, 10, 2, 5, 9, 0],
    "n3L": 10,
    "n5L": 2,
    "n7L": 5,
    "n9L": 9,
    "n11L": 0,
    "n13L": -1
}, {
    "rootNoteLocation": 7,
    "chordKey": "minmaj11",
    "cnName": "\u5C0F\u5927\u5341\u4E00",
    "type": "chord11",
    "orderedNotesLocationList": [0, 2, 6, 7, 9, 10],
    "notesLocationList": [7, 10, 2, 6, 9, 0],
    "n3L": 10,
    "n5L": 2,
    "n7L": 6,
    "n9L": 9,
    "n11L": 0,
    "n13L": -1
}, {
    "rootNoteLocation": 7,
    "chordKey": "dom11b5",
    "cnName": "\u5C5E\u5341\u4E00\u964D\u4E94",
    "type": "chord11",
    "orderedNotesLocationList": [0, 1, 5, 7, 9, 11],
    "notesLocationList": [7, 11, 1, 5, 9, 0],
    "n3L": 11,
    "n5L": 1,
    "n7L": 5,
    "n9L": 9,
    "n11L": 0,
    "n13L": -1
}, {
    "rootNoteLocation": 7,
    "chordKey": "dom11#5",
    "cnName": "\u5C5E\u5341\u4E00\u5347\u4E94",
    "type": "chord11",
    "orderedNotesLocationList": [0, 3, 5, 7, 9, 11],
    "notesLocationList": [7, 11, 3, 5, 9, 0],
    "n3L": 11,
    "n5L": 3,
    "n7L": 5,
    "n9L": 9,
    "n11L": 0,
    "n13L": -1
}, {
    "rootNoteLocation": 7,
    "chordKey": "dom11b9",
    "cnName": "\u5C5E\u5341\u4E00\u964D\u4E5D",
    "type": "chord11",
    "orderedNotesLocationList": [0, 2, 5, 7, 8, 11],
    "notesLocationList": [7, 11, 2, 5, 8, 0],
    "n3L": 11,
    "n5L": 2,
    "n7L": 5,
    "n9L": 8,
    "n11L": 0,
    "n13L": -1
}, {
    "rootNoteLocation": 7,
    "chordKey": "dom11#9",
    "cnName": "\u5C5E\u5341\u4E00\u5347\u4E5D",
    "type": "chord11",
    "orderedNotesLocationList": [0, 2, 5, 7, 10, 11],
    "notesLocationList": [7, 11, 2, 5, 10, 0],
    "n3L": 11,
    "n5L": 2,
    "n7L": 5,
    "n9L": 10,
    "n11L": 0,
    "n13L": -1
}, {
    "rootNoteLocation": 7,
    "chordKey": "dom11b13",
    "cnName": "\u5C5E\u5341\u4E00\u964D\u5341\u4E09",
    "type": "chord11",
    "orderedNotesLocationList": [0, 2, 3, 5, 7, 9, 11],
    "notesLocationList": [7, 11, 2, 5, 9, 0, 3],
    "n3L": 11,
    "n5L": 2,
    "n7L": 5,
    "n9L": 9,
    "n11L": 0,
    "n13L": 3
}, {
    "rootNoteLocation": 7,
    "chordKey": "min11b5",
    "cnName": "\u5C0F\u5341\u4E00\u964D\u4E94",
    "type": "chord11",
    "orderedNotesLocationList": [0, 1, 5, 7, 9, 10],
    "notesLocationList": [7, 10, 1, 5, 9, 0],
    "n3L": 10,
    "n5L": 1,
    "n7L": 5,
    "n9L": 9,
    "n11L": 0,
    "n13L": -1
}, {
    "rootNoteLocation": 7,
    "chordKey": "maj13",
    "cnName": "\u5927\u5341\u4E09",
    "type": "chord13",
    "orderedNotesLocationList": [0, 2, 4, 6, 7, 9, 11],
    "notesLocationList": [7, 11, 2, 6, 9, 0, 4],
    "n3L": 11,
    "n5L": 2,
    "n7L": 6,
    "n9L": 9,
    "n11L": 0,
    "n13L": 4
}, {
    "rootNoteLocation": 7,
    "chordKey": "dom13",
    "cnName": "\u5C5E\u5341\u4E09",
    "type": "chord13",
    "orderedNotesLocationList": [0, 2, 4, 5, 7, 9, 11],
    "notesLocationList": [7, 11, 2, 5, 9, 0, 4],
    "n3L": 11,
    "n5L": 2,
    "n7L": 5,
    "n9L": 9,
    "n11L": 0,
    "n13L": 4
}, {
    "rootNoteLocation": 7,
    "chordKey": "min13",
    "cnName": "\u5C0F\u5341\u4E09",
    "type": "chord13",
    "orderedNotesLocationList": [0, 2, 4, 5, 7, 9, 10],
    "notesLocationList": [7, 10, 2, 5, 9, 0, 4],
    "n3L": 10,
    "n5L": 2,
    "n7L": 5,
    "n9L": 9,
    "n11L": 0,
    "n13L": 4
}, {
    "rootNoteLocation": 7,
    "chordKey": "minmaj13",
    "cnName": "\u5C0F\u5927\u5341\u4E09",
    "type": "chord13",
    "orderedNotesLocationList": [0, 2, 4, 6, 7, 9, 10],
    "notesLocationList": [7, 10, 2, 6, 9, 0, 4],
    "n3L": 10,
    "n5L": 2,
    "n7L": 6,
    "n9L": 9,
    "n11L": 0,
    "n13L": 4
}, {
    "rootNoteLocation": 7,
    "chordKey": "dom13b5",
    "cnName": "\u5C5E\u5341\u4E09\u964D\u4E94",
    "type": "chord13",
    "orderedNotesLocationList": [0, 1, 4, 5, 7, 9, 11],
    "notesLocationList": [7, 11, 1, 5, 9, 0, 4],
    "n3L": 11,
    "n5L": 1,
    "n7L": 5,
    "n9L": 9,
    "n11L": 0,
    "n13L": 4
}, {
    "rootNoteLocation": 7,
    "chordKey": "dom13#5",
    "cnName": "\u5C5E\u5341\u4E09\u5347\u4E94",
    "type": "chord13",
    "orderedNotesLocationList": [0, 3, 4, 5, 7, 9, 11],
    "notesLocationList": [7, 11, 3, 5, 9, 0, 4],
    "n3L": 11,
    "n5L": 3,
    "n7L": 5,
    "n9L": 9,
    "n11L": 0,
    "n13L": 4
}, {
    "rootNoteLocation": 7,
    "chordKey": "dom13b9",
    "cnName": "\u5C5E\u5341\u4E09\u964D\u4E5D",
    "type": "chord13",
    "orderedNotesLocationList": [0, 2, 4, 5, 7, 8, 11],
    "notesLocationList": [7, 11, 2, 5, 8, 0, 4],
    "n3L": 11,
    "n5L": 2,
    "n7L": 5,
    "n9L": 8,
    "n11L": 0,
    "n13L": 4
}, {
    "rootNoteLocation": 7,
    "chordKey": "dom13#9",
    "cnName": "\u5C5E\u5341\u4E09\u5347\u4E5D",
    "type": "chord13",
    "orderedNotesLocationList": [2, 4, 5, 7, 10, 11],
    "notesLocationList": [7, 11, 2, 5, 10, 4],
    "n3L": 11,
    "n5L": 2,
    "n7L": 5,
    "n9L": 10,
    "n11L": -1,
    "n13L": 4
}, {
    "rootNoteLocation": 7,
    "chordKey": "dom13#11",
    "cnName": "\u5C5E\u5341\u4E09\u5347\u5341\u4E00",
    "type": "chord13",
    "orderedNotesLocationList": [1, 2, 4, 5, 7, 9, 11],
    "notesLocationList": [7, 11, 2, 5, 9, 1, 4],
    "n3L": 11,
    "n5L": 2,
    "n7L": 5,
    "n9L": 9,
    "n11L": 1,
    "n13L": 4
}, {
    "rootNoteLocation": 7,
    "chordKey": "maj13b5",
    "cnName": "\u5927\u5341\u4E09\u964D\u4E94",
    "type": "chord13",
    "orderedNotesLocationList": [1, 4, 6, 7, 9, 11],
    "notesLocationList": [7, 11, 1, 6, 9, 4],
    "n3L": 11,
    "n5L": 1,
    "n7L": 6,
    "n9L": 9,
    "n11L": -1,
    "n13L": 4
}, {
    "rootNoteLocation": 7,
    "chordKey": "maj13#5",
    "cnName": "\u5927\u5341\u4E09\u5347\u4E94",
    "type": "chord13",
    "orderedNotesLocationList": [3, 4, 6, 7, 9, 11],
    "notesLocationList": [7, 11, 3, 6, 9, 4],
    "n3L": 11,
    "n5L": 3,
    "n7L": 6,
    "n9L": 9,
    "n11L": -1,
    "n13L": 4
}, {
    "rootNoteLocation": 7,
    "chordKey": "maj13b9",
    "cnName": "\u5927\u5341\u4E09\u964D\u4E5D",
    "type": "chord13",
    "orderedNotesLocationList": [2, 4, 6, 7, 8, 11],
    "notesLocationList": [7, 11, 2, 6, 8, 4],
    "n3L": 11,
    "n5L": 2,
    "n7L": 6,
    "n9L": 8,
    "n11L": -1,
    "n13L": 4
}, {
    "rootNoteLocation": 7,
    "chordKey": "maj13#11",
    "cnName": "\u5927\u5341\u4E09\u5347\u5341\u4E00",
    "type": "chord13",
    "orderedNotesLocationList": [1, 2, 4, 6, 7, 9, 11],
    "notesLocationList": [7, 11, 2, 6, 9, 1, 4],
    "n3L": 11,
    "n5L": 2,
    "n7L": 6,
    "n9L": 9,
    "n11L": 1,
    "n13L": 4
}, {
    "rootNoteLocation": 8,
    "chordKey": "maj3",
    "cnName": "\u5927\u4E09",
    "type": "chord3",
    "orderedNotesLocationList": [0, 3, 8],
    "notesLocationList": [8, 0, 3],
    "n3L": 0,
    "n5L": 3,
    "n7L": -1,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 8,
    "chordKey": "min3",
    "cnName": "\u5C0F\u4E09",
    "type": "chord3",
    "orderedNotesLocationList": [3, 8, 11],
    "notesLocationList": [8, 11, 3],
    "n3L": 11,
    "n5L": 3,
    "n7L": -1,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 8,
    "chordKey": "dim3",
    "cnName": "\u51CF\u4E09",
    "type": "chord3",
    "orderedNotesLocationList": [2, 8, 11],
    "notesLocationList": [8, 11, 2],
    "n3L": 11,
    "n5L": 2,
    "n7L": -1,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 8,
    "chordKey": "aug3",
    "cnName": "\u589E\u4E09",
    "type": "chord3",
    "orderedNotesLocationList": [0, 4, 8],
    "notesLocationList": [8, 0, 4],
    "n3L": 0,
    "n5L": 4,
    "n7L": -1,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 8,
    "chordKey": "maj3b5",
    "cnName": "\u5927\u4E09\u51CF\u4E94",
    "type": "chord3",
    "orderedNotesLocationList": [0, 2, 8],
    "notesLocationList": [8, 0, 2],
    "n3L": 0,
    "n5L": 2,
    "n7L": -1,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 8,
    "chordKey": "maj3add6",
    "cnName": "\u5927\u516D\uFF08\u5927\u4E09\u52A0\u5341\u4E09\u97F3\uFF09",
    "type": "add",
    "orderedNotesLocationList": [0, 3, 5, 8],
    "notesLocationList": [8, 0, 3, 5],
    "n3L": 0,
    "n5L": 3,
    "n7L": -1,
    "n9L": -1,
    "n11L": -1,
    "n13L": 5
}, {
    "rootNoteLocation": 8,
    "chordKey": "min3add6",
    "cnName": "\u5C0F\u516D\uFF08\u5C0F\u4E09\u52A0\u5341\u4E09\u97F3\uFF09",
    "type": "add",
    "orderedNotesLocationList": [3, 4, 8, 11],
    "notesLocationList": [8, 11, 3, 4],
    "n3L": 11,
    "n5L": 3,
    "n7L": -1,
    "n9L": -1,
    "n11L": -1,
    "n13L": 4
}, {
    "rootNoteLocation": 8,
    "chordKey": "maj3add6add9",
    "cnName": "\u516D\u4E5D",
    "type": "add",
    "orderedNotesLocationList": [0, 3, 5, 8, 10],
    "notesLocationList": [8, 0, 3, 5, 10],
    "n3L": 0,
    "n5L": 3,
    "n7L": -1,
    "n9L": 10,
    "n11L": -1,
    "n13L": 5
}, {
    "rootNoteLocation": 8,
    "chordKey": "min3add6add9",
    "cnName": "\u5C0F\u516D\u4E5D",
    "type": "add",
    "orderedNotesLocationList": [3, 5, 8, 10, 11],
    "notesLocationList": [8, 11, 3, 5, 10],
    "n3L": 11,
    "n5L": 3,
    "n7L": -1,
    "n9L": 10,
    "n11L": -1,
    "n13L": 5
}, {
    "rootNoteLocation": 8,
    "chordKey": "maj3add9",
    "cnName": "\u5927\u4E09\u52A0\u4E5D\u97F3\uFF08\u4E8C\u97F3\uFF09",
    "type": "add",
    "orderedNotesLocationList": [0, 3, 8, 10],
    "notesLocationList": [8, 0, 3, 10],
    "n3L": 0,
    "n5L": 3,
    "n7L": -1,
    "n9L": 10,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 8,
    "chordKey": "maj3add11",
    "cnName": "\u5927\u4E09\u52A0\u5341\u4E00\u97F3\uFF08\u56DB\u97F3\uFF09",
    "type": "add",
    "orderedNotesLocationList": [0, 1, 3, 8],
    "notesLocationList": [8, 0, 3, 1],
    "n3L": 0,
    "n5L": 3,
    "n7L": -1,
    "n9L": -1,
    "n11L": 1,
    "n13L": -1
}, {
    "rootNoteLocation": 8,
    "chordKey": "min3add9",
    "cnName": "\u5C0F\u4E09\u52A0\u4E5D\u97F3\uFF08\u4E8C\u97F3\uFF09",
    "type": "add",
    "orderedNotesLocationList": [3, 8, 10, 11],
    "notesLocationList": [8, 11, 3, 10],
    "n3L": 11,
    "n5L": 3,
    "n7L": -1,
    "n9L": 10,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 8,
    "chordKey": "min3add11",
    "cnName": "\u5C0F\u4E09\u52A0\u5341\u4E00\u97F3\uFF08\u56DB\u97F3\uFF09",
    "type": "add",
    "orderedNotesLocationList": [1, 3, 8, 11],
    "notesLocationList": [8, 11, 3, 1],
    "n3L": 11,
    "n5L": 3,
    "n7L": -1,
    "n9L": -1,
    "n11L": 1,
    "n13L": -1
}, {
    "rootNoteLocation": 8,
    "chordKey": "maj7add11",
    "cnName": "\u5927\u4E03\u52A0\u5341\u4E00\u97F3\uFF08\u56DB\u97F3\uFF09",
    "type": "add",
    "orderedNotesLocationList": [0, 1, 3, 7, 8],
    "notesLocationList": [8, 0, 3, 7, 1],
    "n3L": 0,
    "n5L": 3,
    "n7L": 7,
    "n9L": -1,
    "n11L": 1,
    "n13L": -1
}, {
    "rootNoteLocation": 8,
    "chordKey": "dom7add6",
    "cnName": "\u5C5E\u4E03\u52A0\u516D\u97F3",
    "type": "add",
    "orderedNotesLocationList": [0, 3, 5, 6, 8],
    "notesLocationList": [8, 0, 3, 5, 6],
    "n3L": 0,
    "n5L": 3,
    "n7L": 6,
    "n9L": -1,
    "n11L": -1,
    "n13L": 5
}, {
    "rootNoteLocation": 8,
    "chordKey": "itaug6",
    "cnName": "\u610F\u5927\u5229\u589E\u516D",
    "type": "aug6",
    "orderedNotesLocationList": [2, 4, 8],
    "notesLocationList": [8, 2, 4],
    "n3L": -1,
    "n5L": -1,
    "n7L": -1,
    "n9L": -1,
    "n11L": 2,
    "n13L": 4
}, {
    "rootNoteLocation": 8,
    "chordKey": "fraug6",
    "cnName": "\u6CD5\u56FD\u589E\u516D",
    "type": "aug6",
    "orderedNotesLocationList": [2, 4, 8, 10],
    "notesLocationList": [8, 10, 2, 4],
    "n3L": -1,
    "n5L": -1,
    "n7L": -1,
    "n9L": 10,
    "n11L": 2,
    "n13L": 4
}, {
    "rootNoteLocation": 8,
    "chordKey": "graug6",
    "cnName": "\u5FB7\u56FD\u589E\u516D",
    "type": "aug6",
    "orderedNotesLocationList": [2, 4, 8, 11],
    "notesLocationList": [8, 11, 2, 4],
    "n3L": 11,
    "n5L": -1,
    "n7L": -1,
    "n9L": -1,
    "n11L": 2,
    "n13L": 4
}, {
    "rootNoteLocation": 8,
    "chordKey": "maj7",
    "cnName": "\u5927\u4E03",
    "type": "chord7",
    "orderedNotesLocationList": [0, 3, 7, 8],
    "notesLocationList": [8, 0, 3, 7],
    "n3L": 0,
    "n5L": 3,
    "n7L": 7,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 8,
    "chordKey": "dom7",
    "cnName": "\u5C5E\u4E03",
    "type": "chord7",
    "orderedNotesLocationList": [0, 3, 6, 8],
    "notesLocationList": [8, 0, 3, 6],
    "n3L": 0,
    "n5L": 3,
    "n7L": 6,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 8,
    "chordKey": "min7",
    "cnName": "\u5C0F\u4E03",
    "type": "chord7",
    "orderedNotesLocationList": [3, 6, 8, 11],
    "notesLocationList": [8, 11, 3, 6],
    "n3L": 11,
    "n5L": 3,
    "n7L": 6,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 8,
    "chordKey": "halfdim7",
    "cnName": "\u534A\u51CF\u4E03",
    "type": "chord7",
    "orderedNotesLocationList": [2, 6, 8, 11],
    "notesLocationList": [8, 11, 2, 6],
    "n3L": 11,
    "n5L": 2,
    "n7L": 6,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 8,
    "chordKey": "dim7",
    "cnName": "\u51CF\u4E03",
    "type": "chord7",
    "orderedNotesLocationList": [2, 5, 8, 11],
    "notesLocationList": [8, 11, 2, 5],
    "n3L": 11,
    "n5L": 2,
    "n7L": 5,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 8,
    "chordKey": "minmaj7",
    "cnName": "\u5C0F\u5927\u4E03",
    "type": "chord7",
    "orderedNotesLocationList": [3, 7, 8, 11],
    "notesLocationList": [8, 11, 3, 7],
    "n3L": 11,
    "n5L": 3,
    "n7L": 7,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 8,
    "chordKey": "dom7#5",
    "cnName": "\u589E\u4E03\uFF08\u5C5E\u4E03\u5347\u4E94\uFF09",
    "type": "chord7",
    "orderedNotesLocationList": [0, 4, 6, 8],
    "notesLocationList": [8, 0, 4, 6],
    "n3L": 0,
    "n5L": 4,
    "n7L": 6,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 8,
    "chordKey": "augmaj7",
    "cnName": "\u589E\u5927\u4E03",
    "type": "chord7",
    "orderedNotesLocationList": [0, 4, 7, 8],
    "notesLocationList": [8, 0, 4, 7],
    "n3L": 0,
    "n5L": 4,
    "n7L": 7,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 8,
    "chordKey": "dom7b5",
    "cnName": "\u5C5E\u4E03\u964D\u4E94",
    "type": "chord7alt",
    "orderedNotesLocationList": [0, 2, 6, 8],
    "notesLocationList": [8, 0, 2, 6],
    "n3L": 0,
    "n5L": 2,
    "n7L": 6,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 8,
    "chordKey": "dom7b9",
    "cnName": "\u5C5E\u4E03\u964D\u4E5D",
    "type": "chord7alt",
    "orderedNotesLocationList": [0, 3, 6, 8, 9],
    "notesLocationList": [8, 0, 3, 6, 9],
    "n3L": 0,
    "n5L": 3,
    "n7L": 6,
    "n9L": 9,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 8,
    "chordKey": "dom7#9",
    "cnName": "\u5C5E\u4E03\u5347\u4E5D",
    "type": "chord7alt",
    "orderedNotesLocationList": [0, 3, 6, 8, 11],
    "notesLocationList": [8, 0, 3, 6, 11],
    "n3L": 0,
    "n5L": 3,
    "n7L": 6,
    "n9L": 11,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 8,
    "chordKey": "dom7#11",
    "cnName": "\u5C5E\u4E03\u5347\u5341\u4E00",
    "type": "chord7alt",
    "orderedNotesLocationList": [0, 2, 3, 6, 8],
    "notesLocationList": [8, 0, 3, 6, 2],
    "n3L": 0,
    "n5L": 3,
    "n7L": 6,
    "n9L": -1,
    "n11L": 2,
    "n13L": -1
}, {
    "rootNoteLocation": 8,
    "chordKey": "dom7b13",
    "cnName": "\u5C5E\u4E03\u964D\u5341\u4E09",
    "type": "chord7alt",
    "orderedNotesLocationList": [0, 3, 4, 6, 8],
    "notesLocationList": [8, 0, 3, 6, 4],
    "n3L": 0,
    "n5L": 3,
    "n7L": 6,
    "n9L": -1,
    "n11L": -1,
    "n13L": 4
}, {
    "rootNoteLocation": 8,
    "chordKey": "dom7b5b9",
    "cnName": "\u5C5E\u4E03\u964D\u4E94\u964D\u4E5D",
    "type": "chord7alt",
    "orderedNotesLocationList": [0, 2, 6, 8, 9],
    "notesLocationList": [8, 0, 2, 6, 9],
    "n3L": 0,
    "n5L": 2,
    "n7L": 6,
    "n9L": 9,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 8,
    "chordKey": "dom7b5#9",
    "cnName": "\u5C5E\u4E03\u964D\u4E94\u5347\u4E5D",
    "type": "chord7alt",
    "orderedNotesLocationList": [0, 2, 6, 8, 11],
    "notesLocationList": [8, 0, 2, 6, 11],
    "n3L": 0,
    "n5L": 2,
    "n7L": 6,
    "n9L": 11,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 8,
    "chordKey": "maj7b5",
    "cnName": "\u5927\u4E03\u964D\u4E94",
    "type": "chord7alt",
    "orderedNotesLocationList": [0, 2, 7, 8],
    "notesLocationList": [8, 0, 2, 7],
    "n3L": 0,
    "n5L": 2,
    "n7L": 7,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 8,
    "chordKey": "maj7#5",
    "cnName": "\u5927\u4E03\u589E\u4E94",
    "type": "chord7alt",
    "orderedNotesLocationList": [0, 4, 7, 8],
    "notesLocationList": [8, 0, 4, 7],
    "n3L": 0,
    "n5L": 4,
    "n7L": 7,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 8,
    "chordKey": "maj7b9",
    "cnName": "\u5927\u4E03\u964D\u4E5D",
    "type": "chord7alt",
    "orderedNotesLocationList": [0, 3, 7, 8, 9],
    "notesLocationList": [8, 0, 3, 7, 9],
    "n3L": 0,
    "n5L": 3,
    "n7L": 7,
    "n9L": 9,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 8,
    "chordKey": "maj7b13",
    "cnName": "\u5927\u4E03\u964D\u5341\u4E09",
    "type": "chord7alt",
    "orderedNotesLocationList": [0, 3, 4, 7, 8],
    "notesLocationList": [8, 0, 3, 7, 4],
    "n3L": 0,
    "n5L": 3,
    "n7L": 7,
    "n9L": -1,
    "n11L": -1,
    "n13L": 4
}, {
    "rootNoteLocation": 8,
    "chordKey": "maj7#11",
    "cnName": "\u5927\u4E03\u5347\u5341\u4E00",
    "type": "chord7alt",
    "orderedNotesLocationList": [0, 2, 3, 7, 8],
    "notesLocationList": [8, 0, 3, 7, 2],
    "n3L": 0,
    "n5L": 3,
    "n7L": 7,
    "n9L": -1,
    "n11L": 2,
    "n13L": -1
}, {
    "rootNoteLocation": 8,
    "chordKey": "min7#5",
    "cnName": "\u5C0F\u4E03\u5347\u4E94",
    "type": "chord7alt",
    "orderedNotesLocationList": [4, 6, 8, 11],
    "notesLocationList": [8, 11, 4, 6],
    "n3L": 11,
    "n5L": 4,
    "n7L": 6,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 8,
    "chordKey": "minmaj7b5",
    "cnName": "\u5C0F\u5927\u4E03\u964D\u4E94",
    "type": "chord7alt",
    "orderedNotesLocationList": [2, 7, 8, 11],
    "notesLocationList": [8, 11, 2, 7],
    "n3L": 11,
    "n5L": 2,
    "n7L": 7,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 8,
    "chordKey": "minmaj7#5",
    "cnName": "\u5C0F\u5927\u4E03\u5347\u4E94",
    "type": "chord7alt",
    "orderedNotesLocationList": [4, 7, 8, 11],
    "notesLocationList": [8, 11, 4, 7],
    "n3L": 11,
    "n5L": 4,
    "n7L": 7,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 8,
    "chordKey": "dom7#5b9",
    "cnName": "\u589E\u4E03\u964D\u4E5D\uFF08\u5C5E\u4E03\u5347\u4E94\u964D\u4E5D\uFF09",
    "type": "chord7alt",
    "orderedNotesLocationList": [0, 4, 6, 8, 9],
    "notesLocationList": [8, 0, 4, 6, 9],
    "n3L": 0,
    "n5L": 4,
    "n7L": 6,
    "n9L": 9,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 8,
    "chordKey": "dom7#5#9",
    "cnName": "\u589E\u4E03\u5347\u4E5D\uFF08\u5C5E\u4E03\u5347\u4E94\u5347\u4E5D\uFF09",
    "type": "chord7alt",
    "orderedNotesLocationList": [0, 4, 6, 8, 11],
    "notesLocationList": [8, 0, 4, 6, 11],
    "n3L": 0,
    "n5L": 4,
    "n7L": 6,
    "n9L": 11,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 8,
    "chordKey": "sus2",
    "cnName": "\u6302\u4E8C",
    "type": "sus",
    "orderedNotesLocationList": [3, 8, 10],
    "notesLocationList": [8, 10, 3],
    "n3L": -1,
    "n5L": 3,
    "n7L": -1,
    "n9L": 10,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 8,
    "chordKey": "sus4",
    "cnName": "\u6302\u56DB",
    "type": "sus",
    "orderedNotesLocationList": [1, 3, 8],
    "notesLocationList": [8, 1, 3],
    "n3L": -1,
    "n5L": 3,
    "n7L": -1,
    "n9L": -1,
    "n11L": 1,
    "n13L": -1
}, {
    "rootNoteLocation": 8,
    "chordKey": "dom7sus2",
    "cnName": "\u5C5E\u4E03\u6302\u4E8C",
    "type": "sus",
    "orderedNotesLocationList": [3, 6, 8, 10],
    "notesLocationList": [8, 10, 3, 6],
    "n3L": -1,
    "n5L": 3,
    "n7L": 6,
    "n9L": 10,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 8,
    "chordKey": "dom7sus4",
    "cnName": "\u5C5E\u4E03\u6302\u56DB",
    "type": "sus",
    "orderedNotesLocationList": [1, 3, 6, 8],
    "notesLocationList": [8, 1, 3, 6],
    "n3L": -1,
    "n5L": 3,
    "n7L": 6,
    "n9L": -1,
    "n11L": 1,
    "n13L": -1
}, {
    "rootNoteLocation": 8,
    "chordKey": "maj7sus2",
    "cnName": "\u5927\u4E03\u6302\u4E8C",
    "type": "sus",
    "orderedNotesLocationList": [3, 7, 8, 10],
    "notesLocationList": [8, 10, 3, 7],
    "n3L": -1,
    "n5L": 3,
    "n7L": 7,
    "n9L": 10,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 8,
    "chordKey": "maj7sus4",
    "cnName": "\u5927\u4E03\u6302\u56DB",
    "type": "sus",
    "orderedNotesLocationList": [1, 3, 7, 8],
    "notesLocationList": [8, 1, 3, 7],
    "n3L": -1,
    "n5L": 3,
    "n7L": 7,
    "n9L": -1,
    "n11L": 1,
    "n13L": -1
}, {
    "rootNoteLocation": 8,
    "chordKey": "dom9sus4",
    "cnName": "\u5C5E\u4E5D\u6302\u56DB",
    "type": "sus",
    "orderedNotesLocationList": [1, 3, 6, 8, 10],
    "notesLocationList": [8, 1, 3, 6, 10],
    "n3L": -1,
    "n5L": 3,
    "n7L": 6,
    "n9L": 10,
    "n11L": 1,
    "n13L": -1
}, {
    "rootNoteLocation": 8,
    "chordKey": "maj9sus4",
    "cnName": "\u5927\u4E5D\u6302\u56DB",
    "type": "sus",
    "orderedNotesLocationList": [1, 3, 7, 8, 10],
    "notesLocationList": [8, 1, 3, 7, 10],
    "n3L": -1,
    "n5L": 3,
    "n7L": 7,
    "n9L": 10,
    "n11L": 1,
    "n13L": -1
}, {
    "rootNoteLocation": 8,
    "chordKey": "dom13sus4",
    "cnName": "\u5C5E\u5341\u4E09\u6302\u56DB",
    "type": "sus",
    "orderedNotesLocationList": [1, 3, 5, 6, 8, 10],
    "notesLocationList": [8, 1, 3, 6, 10, 5],
    "n3L": -1,
    "n5L": 3,
    "n7L": 6,
    "n9L": 10,
    "n11L": 1,
    "n13L": 5
}, {
    "rootNoteLocation": 8,
    "chordKey": "maj13sus4",
    "cnName": "\u5927\u5341\u4E09\u6302\u56DB",
    "type": "sus",
    "orderedNotesLocationList": [1, 3, 5, 7, 8, 10],
    "notesLocationList": [8, 1, 3, 7, 10, 5],
    "n3L": -1,
    "n5L": 3,
    "n7L": 7,
    "n9L": 10,
    "n11L": 1,
    "n13L": 5
}, {
    "rootNoteLocation": 8,
    "chordKey": "maj13sus2",
    "cnName": "\u5927\u5341\u4E09\u6302\u4E8C",
    "type": "sus",
    "orderedNotesLocationList": [3, 5, 7, 8, 10],
    "notesLocationList": [8, 10, 3, 7, 5],
    "n3L": -1,
    "n5L": 3,
    "n7L": 7,
    "n9L": 10,
    "n11L": -1,
    "n13L": 5
}, {
    "rootNoteLocation": 8,
    "chordKey": "maj9",
    "cnName": "\u5927\u4E5D",
    "type": "chord9",
    "orderedNotesLocationList": [0, 3, 7, 8, 10],
    "notesLocationList": [8, 0, 3, 7, 10],
    "n3L": 0,
    "n5L": 3,
    "n7L": 7,
    "n9L": 10,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 8,
    "chordKey": "dom9",
    "cnName": "\u5C5E\u4E5D",
    "type": "chord9",
    "orderedNotesLocationList": [0, 3, 6, 8, 10],
    "notesLocationList": [8, 0, 3, 6, 10],
    "n3L": 0,
    "n5L": 3,
    "n7L": 6,
    "n9L": 10,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 8,
    "chordKey": "min9",
    "cnName": "\u5C0F\u4E5D",
    "type": "chord9",
    "orderedNotesLocationList": [3, 6, 8, 10, 11],
    "notesLocationList": [8, 11, 3, 6, 10],
    "n3L": 11,
    "n5L": 3,
    "n7L": 6,
    "n9L": 10,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 8,
    "chordKey": "minmaj9",
    "cnName": "\u5C0F\u5927\u4E5D",
    "type": "chord9",
    "orderedNotesLocationList": [3, 7, 8, 10, 11],
    "notesLocationList": [8, 11, 3, 7, 10],
    "n3L": 11,
    "n5L": 3,
    "n7L": 7,
    "n9L": 10,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 8,
    "chordKey": "dom9#5",
    "cnName": "\u589E\u4E5D\uFF08\u5C5E\u4E5D\u5347\u4E94\uFF09",
    "type": "chord9",
    "orderedNotesLocationList": [0, 4, 6, 8, 10],
    "notesLocationList": [8, 0, 4, 6, 10],
    "n3L": 0,
    "n5L": 4,
    "n7L": 6,
    "n9L": 10,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 8,
    "chordKey": "dom9b9",
    "cnName": "\u5C5E\u4E5D\u964D\u4E5D",
    "type": "chord9",
    "orderedNotesLocationList": [0, 3, 6, 8, 9],
    "notesLocationList": [8, 0, 3, 6, 9],
    "n3L": 0,
    "n5L": 3,
    "n7L": 6,
    "n9L": 9,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 8,
    "chordKey": "dom9b11",
    "cnName": "\u5C5E\u4E5D\u964D\u5341\u4E00",
    "type": "chord9",
    "orderedNotesLocationList": [0, 0, 3, 6, 8, 10],
    "notesLocationList": [8, 0, 3, 6, 10, 0],
    "n3L": 0,
    "n5L": 3,
    "n7L": 6,
    "n9L": 10,
    "n11L": 0,
    "n13L": -1
}, {
    "rootNoteLocation": 8,
    "chordKey": "dom9#11",
    "cnName": "\u5C5E\u4E5D\u5347\u5341\u4E00",
    "type": "chord9",
    "orderedNotesLocationList": [0, 2, 3, 6, 8, 10],
    "notesLocationList": [8, 0, 3, 6, 10, 2],
    "n3L": 0,
    "n5L": 3,
    "n7L": 6,
    "n9L": 10,
    "n11L": 2,
    "n13L": -1
}, {
    "rootNoteLocation": 8,
    "chordKey": "dom9b13",
    "cnName": "\u5C5E\u4E5D\u964D\u5341\u4E09",
    "type": "chord9",
    "orderedNotesLocationList": [0, 3, 4, 6, 8, 10],
    "notesLocationList": [8, 0, 3, 6, 10, 4],
    "n3L": 0,
    "n5L": 3,
    "n7L": 6,
    "n9L": 10,
    "n11L": -1,
    "n13L": 4
}, {
    "rootNoteLocation": 8,
    "chordKey": "maj9b5",
    "cnName": "\u5927\u4E5D\u964D\u4E94",
    "type": "chord9",
    "orderedNotesLocationList": [0, 2, 7, 8, 10],
    "notesLocationList": [8, 0, 2, 7, 10],
    "n3L": 0,
    "n5L": 2,
    "n7L": 7,
    "n9L": 10,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 8,
    "chordKey": "maj9#5",
    "cnName": "\u5927\u4E5D\u5347\u4E94",
    "type": "chord9",
    "orderedNotesLocationList": [0, 4, 7, 8, 10],
    "notesLocationList": [8, 0, 4, 7, 10],
    "n3L": 0,
    "n5L": 4,
    "n7L": 7,
    "n9L": 10,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 8,
    "chordKey": "maj9#11",
    "cnName": "\u5927\u4E5D\u5347\u5341\u4E00",
    "type": "chord9",
    "orderedNotesLocationList": [0, 2, 3, 7, 8, 10],
    "notesLocationList": [8, 0, 3, 7, 10, 2],
    "n3L": 0,
    "n5L": 3,
    "n7L": 7,
    "n9L": 10,
    "n11L": 2,
    "n13L": -1
}, {
    "rootNoteLocation": 8,
    "chordKey": "maj9b13",
    "cnName": "\u5927\u4E5D\u964D\u5341\u4E09",
    "type": "chord9",
    "orderedNotesLocationList": [0, 2, 4, 7, 8, 10],
    "notesLocationList": [8, 0, 2, 7, 10, 4],
    "n3L": 0,
    "n5L": 2,
    "n7L": 7,
    "n9L": 10,
    "n11L": -1,
    "n13L": 4
}, {
    "rootNoteLocation": 8,
    "chordKey": "min9b5",
    "cnName": "\u5C0F\u4E5D\u964D\u4E94",
    "type": "chord9",
    "orderedNotesLocationList": [2, 6, 8, 10, 11],
    "notesLocationList": [8, 11, 2, 6, 10],
    "n3L": 11,
    "n5L": 2,
    "n7L": 6,
    "n9L": 10,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 8,
    "chordKey": "min9b9",
    "cnName": "\u5C0F\u4E5D\u964D\u4E5D",
    "type": "chord9",
    "orderedNotesLocationList": [3, 6, 8, 9, 11],
    "notesLocationList": [8, 11, 3, 6, 9],
    "n3L": 11,
    "n5L": 3,
    "n7L": 6,
    "n9L": 9,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 8,
    "chordKey": "maj11",
    "cnName": "\u5927\u5341\u4E00",
    "type": "chord11",
    "orderedNotesLocationList": [0, 1, 3, 7, 8, 10],
    "notesLocationList": [8, 0, 3, 7, 10, 1],
    "n3L": 0,
    "n5L": 3,
    "n7L": 7,
    "n9L": 10,
    "n11L": 1,
    "n13L": -1
}, {
    "rootNoteLocation": 8,
    "chordKey": "dom11",
    "cnName": "\u5C5E\u5341\u4E00",
    "type": "chord11",
    "orderedNotesLocationList": [0, 1, 3, 6, 8, 10],
    "notesLocationList": [8, 0, 3, 6, 10, 1],
    "n3L": 0,
    "n5L": 3,
    "n7L": 6,
    "n9L": 10,
    "n11L": 1,
    "n13L": -1
}, {
    "rootNoteLocation": 8,
    "chordKey": "min11",
    "cnName": "\u5C0F\u5341\u4E00",
    "type": "chord11",
    "orderedNotesLocationList": [1, 3, 6, 8, 10, 11],
    "notesLocationList": [8, 11, 3, 6, 10, 1],
    "n3L": 11,
    "n5L": 3,
    "n7L": 6,
    "n9L": 10,
    "n11L": 1,
    "n13L": -1
}, {
    "rootNoteLocation": 8,
    "chordKey": "minmaj11",
    "cnName": "\u5C0F\u5927\u5341\u4E00",
    "type": "chord11",
    "orderedNotesLocationList": [1, 3, 7, 8, 10, 11],
    "notesLocationList": [8, 11, 3, 7, 10, 1],
    "n3L": 11,
    "n5L": 3,
    "n7L": 7,
    "n9L": 10,
    "n11L": 1,
    "n13L": -1
}, {
    "rootNoteLocation": 8,
    "chordKey": "dom11b5",
    "cnName": "\u5C5E\u5341\u4E00\u964D\u4E94",
    "type": "chord11",
    "orderedNotesLocationList": [0, 1, 2, 6, 8, 10],
    "notesLocationList": [8, 0, 2, 6, 10, 1],
    "n3L": 0,
    "n5L": 2,
    "n7L": 6,
    "n9L": 10,
    "n11L": 1,
    "n13L": -1
}, {
    "rootNoteLocation": 8,
    "chordKey": "dom11#5",
    "cnName": "\u5C5E\u5341\u4E00\u5347\u4E94",
    "type": "chord11",
    "orderedNotesLocationList": [0, 1, 4, 6, 8, 10],
    "notesLocationList": [8, 0, 4, 6, 10, 1],
    "n3L": 0,
    "n5L": 4,
    "n7L": 6,
    "n9L": 10,
    "n11L": 1,
    "n13L": -1
}, {
    "rootNoteLocation": 8,
    "chordKey": "dom11b9",
    "cnName": "\u5C5E\u5341\u4E00\u964D\u4E5D",
    "type": "chord11",
    "orderedNotesLocationList": [0, 1, 3, 6, 8, 9],
    "notesLocationList": [8, 0, 3, 6, 9, 1],
    "n3L": 0,
    "n5L": 3,
    "n7L": 6,
    "n9L": 9,
    "n11L": 1,
    "n13L": -1
}, {
    "rootNoteLocation": 8,
    "chordKey": "dom11#9",
    "cnName": "\u5C5E\u5341\u4E00\u5347\u4E5D",
    "type": "chord11",
    "orderedNotesLocationList": [0, 1, 3, 6, 8, 11],
    "notesLocationList": [8, 0, 3, 6, 11, 1],
    "n3L": 0,
    "n5L": 3,
    "n7L": 6,
    "n9L": 11,
    "n11L": 1,
    "n13L": -1
}, {
    "rootNoteLocation": 8,
    "chordKey": "dom11b13",
    "cnName": "\u5C5E\u5341\u4E00\u964D\u5341\u4E09",
    "type": "chord11",
    "orderedNotesLocationList": [0, 1, 3, 4, 6, 8, 10],
    "notesLocationList": [8, 0, 3, 6, 10, 1, 4],
    "n3L": 0,
    "n5L": 3,
    "n7L": 6,
    "n9L": 10,
    "n11L": 1,
    "n13L": 4
}, {
    "rootNoteLocation": 8,
    "chordKey": "min11b5",
    "cnName": "\u5C0F\u5341\u4E00\u964D\u4E94",
    "type": "chord11",
    "orderedNotesLocationList": [1, 2, 6, 8, 10, 11],
    "notesLocationList": [8, 11, 2, 6, 10, 1],
    "n3L": 11,
    "n5L": 2,
    "n7L": 6,
    "n9L": 10,
    "n11L": 1,
    "n13L": -1
}, {
    "rootNoteLocation": 8,
    "chordKey": "maj13",
    "cnName": "\u5927\u5341\u4E09",
    "type": "chord13",
    "orderedNotesLocationList": [0, 1, 3, 5, 7, 8, 10],
    "notesLocationList": [8, 0, 3, 7, 10, 1, 5],
    "n3L": 0,
    "n5L": 3,
    "n7L": 7,
    "n9L": 10,
    "n11L": 1,
    "n13L": 5
}, {
    "rootNoteLocation": 8,
    "chordKey": "dom13",
    "cnName": "\u5C5E\u5341\u4E09",
    "type": "chord13",
    "orderedNotesLocationList": [0, 1, 3, 5, 6, 8, 10],
    "notesLocationList": [8, 0, 3, 6, 10, 1, 5],
    "n3L": 0,
    "n5L": 3,
    "n7L": 6,
    "n9L": 10,
    "n11L": 1,
    "n13L": 5
}, {
    "rootNoteLocation": 8,
    "chordKey": "min13",
    "cnName": "\u5C0F\u5341\u4E09",
    "type": "chord13",
    "orderedNotesLocationList": [1, 3, 5, 6, 8, 10, 11],
    "notesLocationList": [8, 11, 3, 6, 10, 1, 5],
    "n3L": 11,
    "n5L": 3,
    "n7L": 6,
    "n9L": 10,
    "n11L": 1,
    "n13L": 5
}, {
    "rootNoteLocation": 8,
    "chordKey": "minmaj13",
    "cnName": "\u5C0F\u5927\u5341\u4E09",
    "type": "chord13",
    "orderedNotesLocationList": [1, 3, 5, 7, 8, 10, 11],
    "notesLocationList": [8, 11, 3, 7, 10, 1, 5],
    "n3L": 11,
    "n5L": 3,
    "n7L": 7,
    "n9L": 10,
    "n11L": 1,
    "n13L": 5
}, {
    "rootNoteLocation": 8,
    "chordKey": "dom13b5",
    "cnName": "\u5C5E\u5341\u4E09\u964D\u4E94",
    "type": "chord13",
    "orderedNotesLocationList": [0, 1, 2, 5, 6, 8, 10],
    "notesLocationList": [8, 0, 2, 6, 10, 1, 5],
    "n3L": 0,
    "n5L": 2,
    "n7L": 6,
    "n9L": 10,
    "n11L": 1,
    "n13L": 5
}, {
    "rootNoteLocation": 8,
    "chordKey": "dom13#5",
    "cnName": "\u5C5E\u5341\u4E09\u5347\u4E94",
    "type": "chord13",
    "orderedNotesLocationList": [0, 1, 4, 5, 6, 8, 10],
    "notesLocationList": [8, 0, 4, 6, 10, 1, 5],
    "n3L": 0,
    "n5L": 4,
    "n7L": 6,
    "n9L": 10,
    "n11L": 1,
    "n13L": 5
}, {
    "rootNoteLocation": 8,
    "chordKey": "dom13b9",
    "cnName": "\u5C5E\u5341\u4E09\u964D\u4E5D",
    "type": "chord13",
    "orderedNotesLocationList": [0, 1, 3, 5, 6, 8, 9],
    "notesLocationList": [8, 0, 3, 6, 9, 1, 5],
    "n3L": 0,
    "n5L": 3,
    "n7L": 6,
    "n9L": 9,
    "n11L": 1,
    "n13L": 5
}, {
    "rootNoteLocation": 8,
    "chordKey": "dom13#9",
    "cnName": "\u5C5E\u5341\u4E09\u5347\u4E5D",
    "type": "chord13",
    "orderedNotesLocationList": [0, 3, 5, 6, 8, 11],
    "notesLocationList": [8, 0, 3, 6, 11, 5],
    "n3L": 0,
    "n5L": 3,
    "n7L": 6,
    "n9L": 11,
    "n11L": -1,
    "n13L": 5
}, {
    "rootNoteLocation": 8,
    "chordKey": "dom13#11",
    "cnName": "\u5C5E\u5341\u4E09\u5347\u5341\u4E00",
    "type": "chord13",
    "orderedNotesLocationList": [0, 2, 3, 5, 6, 8, 10],
    "notesLocationList": [8, 0, 3, 6, 10, 2, 5],
    "n3L": 0,
    "n5L": 3,
    "n7L": 6,
    "n9L": 10,
    "n11L": 2,
    "n13L": 5
}, {
    "rootNoteLocation": 8,
    "chordKey": "maj13b5",
    "cnName": "\u5927\u5341\u4E09\u964D\u4E94",
    "type": "chord13",
    "orderedNotesLocationList": [0, 2, 5, 7, 8, 10],
    "notesLocationList": [8, 0, 2, 7, 10, 5],
    "n3L": 0,
    "n5L": 2,
    "n7L": 7,
    "n9L": 10,
    "n11L": -1,
    "n13L": 5
}, {
    "rootNoteLocation": 8,
    "chordKey": "maj13#5",
    "cnName": "\u5927\u5341\u4E09\u5347\u4E94",
    "type": "chord13",
    "orderedNotesLocationList": [0, 4, 5, 7, 8, 10],
    "notesLocationList": [8, 0, 4, 7, 10, 5],
    "n3L": 0,
    "n5L": 4,
    "n7L": 7,
    "n9L": 10,
    "n11L": -1,
    "n13L": 5
}, {
    "rootNoteLocation": 8,
    "chordKey": "maj13b9",
    "cnName": "\u5927\u5341\u4E09\u964D\u4E5D",
    "type": "chord13",
    "orderedNotesLocationList": [0, 3, 5, 7, 8, 9],
    "notesLocationList": [8, 0, 3, 7, 9, 5],
    "n3L": 0,
    "n5L": 3,
    "n7L": 7,
    "n9L": 9,
    "n11L": -1,
    "n13L": 5
}, {
    "rootNoteLocation": 8,
    "chordKey": "maj13#11",
    "cnName": "\u5927\u5341\u4E09\u5347\u5341\u4E00",
    "type": "chord13",
    "orderedNotesLocationList": [0, 2, 3, 5, 7, 8, 10],
    "notesLocationList": [8, 0, 3, 7, 10, 2, 5],
    "n3L": 0,
    "n5L": 3,
    "n7L": 7,
    "n9L": 10,
    "n11L": 2,
    "n13L": 5
}, {
    "rootNoteLocation": 9,
    "chordKey": "maj3",
    "cnName": "\u5927\u4E09",
    "type": "chord3",
    "orderedNotesLocationList": [1, 4, 9],
    "notesLocationList": [9, 1, 4],
    "n3L": 1,
    "n5L": 4,
    "n7L": -1,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 9,
    "chordKey": "min3",
    "cnName": "\u5C0F\u4E09",
    "type": "chord3",
    "orderedNotesLocationList": [0, 4, 9],
    "notesLocationList": [9, 0, 4],
    "n3L": 0,
    "n5L": 4,
    "n7L": -1,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 9,
    "chordKey": "dim3",
    "cnName": "\u51CF\u4E09",
    "type": "chord3",
    "orderedNotesLocationList": [0, 3, 9],
    "notesLocationList": [9, 0, 3],
    "n3L": 0,
    "n5L": 3,
    "n7L": -1,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 9,
    "chordKey": "aug3",
    "cnName": "\u589E\u4E09",
    "type": "chord3",
    "orderedNotesLocationList": [1, 5, 9],
    "notesLocationList": [9, 1, 5],
    "n3L": 1,
    "n5L": 5,
    "n7L": -1,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 9,
    "chordKey": "maj3b5",
    "cnName": "\u5927\u4E09\u51CF\u4E94",
    "type": "chord3",
    "orderedNotesLocationList": [1, 3, 9],
    "notesLocationList": [9, 1, 3],
    "n3L": 1,
    "n5L": 3,
    "n7L": -1,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 9,
    "chordKey": "maj3add6",
    "cnName": "\u5927\u516D\uFF08\u5927\u4E09\u52A0\u5341\u4E09\u97F3\uFF09",
    "type": "add",
    "orderedNotesLocationList": [1, 4, 6, 9],
    "notesLocationList": [9, 1, 4, 6],
    "n3L": 1,
    "n5L": 4,
    "n7L": -1,
    "n9L": -1,
    "n11L": -1,
    "n13L": 6
}, {
    "rootNoteLocation": 9,
    "chordKey": "min3add6",
    "cnName": "\u5C0F\u516D\uFF08\u5C0F\u4E09\u52A0\u5341\u4E09\u97F3\uFF09",
    "type": "add",
    "orderedNotesLocationList": [0, 4, 5, 9],
    "notesLocationList": [9, 0, 4, 5],
    "n3L": 0,
    "n5L": 4,
    "n7L": -1,
    "n9L": -1,
    "n11L": -1,
    "n13L": 5
}, {
    "rootNoteLocation": 9,
    "chordKey": "maj3add6add9",
    "cnName": "\u516D\u4E5D",
    "type": "add",
    "orderedNotesLocationList": [1, 4, 6, 9, 11],
    "notesLocationList": [9, 1, 4, 6, 11],
    "n3L": 1,
    "n5L": 4,
    "n7L": -1,
    "n9L": 11,
    "n11L": -1,
    "n13L": 6
}, {
    "rootNoteLocation": 9,
    "chordKey": "min3add6add9",
    "cnName": "\u5C0F\u516D\u4E5D",
    "type": "add",
    "orderedNotesLocationList": [0, 4, 6, 9, 11],
    "notesLocationList": [9, 0, 4, 6, 11],
    "n3L": 0,
    "n5L": 4,
    "n7L": -1,
    "n9L": 11,
    "n11L": -1,
    "n13L": 6
}, {
    "rootNoteLocation": 9,
    "chordKey": "maj3add9",
    "cnName": "\u5927\u4E09\u52A0\u4E5D\u97F3\uFF08\u4E8C\u97F3\uFF09",
    "type": "add",
    "orderedNotesLocationList": [1, 4, 9, 11],
    "notesLocationList": [9, 1, 4, 11],
    "n3L": 1,
    "n5L": 4,
    "n7L": -1,
    "n9L": 11,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 9,
    "chordKey": "maj3add11",
    "cnName": "\u5927\u4E09\u52A0\u5341\u4E00\u97F3\uFF08\u56DB\u97F3\uFF09",
    "type": "add",
    "orderedNotesLocationList": [1, 2, 4, 9],
    "notesLocationList": [9, 1, 4, 2],
    "n3L": 1,
    "n5L": 4,
    "n7L": -1,
    "n9L": -1,
    "n11L": 2,
    "n13L": -1
}, {
    "rootNoteLocation": 9,
    "chordKey": "min3add9",
    "cnName": "\u5C0F\u4E09\u52A0\u4E5D\u97F3\uFF08\u4E8C\u97F3\uFF09",
    "type": "add",
    "orderedNotesLocationList": [0, 4, 9, 11],
    "notesLocationList": [9, 0, 4, 11],
    "n3L": 0,
    "n5L": 4,
    "n7L": -1,
    "n9L": 11,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 9,
    "chordKey": "min3add11",
    "cnName": "\u5C0F\u4E09\u52A0\u5341\u4E00\u97F3\uFF08\u56DB\u97F3\uFF09",
    "type": "add",
    "orderedNotesLocationList": [0, 2, 4, 9],
    "notesLocationList": [9, 0, 4, 2],
    "n3L": 0,
    "n5L": 4,
    "n7L": -1,
    "n9L": -1,
    "n11L": 2,
    "n13L": -1
}, {
    "rootNoteLocation": 9,
    "chordKey": "maj7add11",
    "cnName": "\u5927\u4E03\u52A0\u5341\u4E00\u97F3\uFF08\u56DB\u97F3\uFF09",
    "type": "add",
    "orderedNotesLocationList": [1, 2, 4, 8, 9],
    "notesLocationList": [9, 1, 4, 8, 2],
    "n3L": 1,
    "n5L": 4,
    "n7L": 8,
    "n9L": -1,
    "n11L": 2,
    "n13L": -1
}, {
    "rootNoteLocation": 9,
    "chordKey": "dom7add6",
    "cnName": "\u5C5E\u4E03\u52A0\u516D\u97F3",
    "type": "add",
    "orderedNotesLocationList": [1, 4, 6, 7, 9],
    "notesLocationList": [9, 1, 4, 6, 7],
    "n3L": 1,
    "n5L": 4,
    "n7L": 7,
    "n9L": -1,
    "n11L": -1,
    "n13L": 6
}, {
    "rootNoteLocation": 9,
    "chordKey": "itaug6",
    "cnName": "\u610F\u5927\u5229\u589E\u516D",
    "type": "aug6",
    "orderedNotesLocationList": [3, 5, 9],
    "notesLocationList": [9, 3, 5],
    "n3L": -1,
    "n5L": -1,
    "n7L": -1,
    "n9L": -1,
    "n11L": 3,
    "n13L": 5
}, {
    "rootNoteLocation": 9,
    "chordKey": "fraug6",
    "cnName": "\u6CD5\u56FD\u589E\u516D",
    "type": "aug6",
    "orderedNotesLocationList": [3, 5, 9, 11],
    "notesLocationList": [9, 11, 3, 5],
    "n3L": -1,
    "n5L": -1,
    "n7L": -1,
    "n9L": 11,
    "n11L": 3,
    "n13L": 5
}, {
    "rootNoteLocation": 9,
    "chordKey": "graug6",
    "cnName": "\u5FB7\u56FD\u589E\u516D",
    "type": "aug6",
    "orderedNotesLocationList": [0, 3, 5, 9],
    "notesLocationList": [9, 0, 3, 5],
    "n3L": 0,
    "n5L": -1,
    "n7L": -1,
    "n9L": -1,
    "n11L": 3,
    "n13L": 5
}, {
    "rootNoteLocation": 9,
    "chordKey": "maj7",
    "cnName": "\u5927\u4E03",
    "type": "chord7",
    "orderedNotesLocationList": [1, 4, 8, 9],
    "notesLocationList": [9, 1, 4, 8],
    "n3L": 1,
    "n5L": 4,
    "n7L": 8,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 9,
    "chordKey": "dom7",
    "cnName": "\u5C5E\u4E03",
    "type": "chord7",
    "orderedNotesLocationList": [1, 4, 7, 9],
    "notesLocationList": [9, 1, 4, 7],
    "n3L": 1,
    "n5L": 4,
    "n7L": 7,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 9,
    "chordKey": "min7",
    "cnName": "\u5C0F\u4E03",
    "type": "chord7",
    "orderedNotesLocationList": [0, 4, 7, 9],
    "notesLocationList": [9, 0, 4, 7],
    "n3L": 0,
    "n5L": 4,
    "n7L": 7,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 9,
    "chordKey": "halfdim7",
    "cnName": "\u534A\u51CF\u4E03",
    "type": "chord7",
    "orderedNotesLocationList": [0, 3, 7, 9],
    "notesLocationList": [9, 0, 3, 7],
    "n3L": 0,
    "n5L": 3,
    "n7L": 7,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 9,
    "chordKey": "dim7",
    "cnName": "\u51CF\u4E03",
    "type": "chord7",
    "orderedNotesLocationList": [0, 3, 6, 9],
    "notesLocationList": [9, 0, 3, 6],
    "n3L": 0,
    "n5L": 3,
    "n7L": 6,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 9,
    "chordKey": "minmaj7",
    "cnName": "\u5C0F\u5927\u4E03",
    "type": "chord7",
    "orderedNotesLocationList": [0, 4, 8, 9],
    "notesLocationList": [9, 0, 4, 8],
    "n3L": 0,
    "n5L": 4,
    "n7L": 8,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 9,
    "chordKey": "dom7#5",
    "cnName": "\u589E\u4E03\uFF08\u5C5E\u4E03\u5347\u4E94\uFF09",
    "type": "chord7",
    "orderedNotesLocationList": [1, 5, 7, 9],
    "notesLocationList": [9, 1, 5, 7],
    "n3L": 1,
    "n5L": 5,
    "n7L": 7,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 9,
    "chordKey": "augmaj7",
    "cnName": "\u589E\u5927\u4E03",
    "type": "chord7",
    "orderedNotesLocationList": [1, 5, 8, 9],
    "notesLocationList": [9, 1, 5, 8],
    "n3L": 1,
    "n5L": 5,
    "n7L": 8,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 9,
    "chordKey": "dom7b5",
    "cnName": "\u5C5E\u4E03\u964D\u4E94",
    "type": "chord7alt",
    "orderedNotesLocationList": [1, 3, 7, 9],
    "notesLocationList": [9, 1, 3, 7],
    "n3L": 1,
    "n5L": 3,
    "n7L": 7,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 9,
    "chordKey": "dom7b9",
    "cnName": "\u5C5E\u4E03\u964D\u4E5D",
    "type": "chord7alt",
    "orderedNotesLocationList": [1, 4, 7, 9, 10],
    "notesLocationList": [9, 1, 4, 7, 10],
    "n3L": 1,
    "n5L": 4,
    "n7L": 7,
    "n9L": 10,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 9,
    "chordKey": "dom7#9",
    "cnName": "\u5C5E\u4E03\u5347\u4E5D",
    "type": "chord7alt",
    "orderedNotesLocationList": [0, 1, 4, 7, 9],
    "notesLocationList": [9, 1, 4, 7, 0],
    "n3L": 1,
    "n5L": 4,
    "n7L": 7,
    "n9L": 0,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 9,
    "chordKey": "dom7#11",
    "cnName": "\u5C5E\u4E03\u5347\u5341\u4E00",
    "type": "chord7alt",
    "orderedNotesLocationList": [1, 3, 4, 7, 9],
    "notesLocationList": [9, 1, 4, 7, 3],
    "n3L": 1,
    "n5L": 4,
    "n7L": 7,
    "n9L": -1,
    "n11L": 3,
    "n13L": -1
}, {
    "rootNoteLocation": 9,
    "chordKey": "dom7b13",
    "cnName": "\u5C5E\u4E03\u964D\u5341\u4E09",
    "type": "chord7alt",
    "orderedNotesLocationList": [1, 4, 5, 7, 9],
    "notesLocationList": [9, 1, 4, 7, 5],
    "n3L": 1,
    "n5L": 4,
    "n7L": 7,
    "n9L": -1,
    "n11L": -1,
    "n13L": 5
}, {
    "rootNoteLocation": 9,
    "chordKey": "dom7b5b9",
    "cnName": "\u5C5E\u4E03\u964D\u4E94\u964D\u4E5D",
    "type": "chord7alt",
    "orderedNotesLocationList": [1, 3, 7, 9, 10],
    "notesLocationList": [9, 1, 3, 7, 10],
    "n3L": 1,
    "n5L": 3,
    "n7L": 7,
    "n9L": 10,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 9,
    "chordKey": "dom7b5#9",
    "cnName": "\u5C5E\u4E03\u964D\u4E94\u5347\u4E5D",
    "type": "chord7alt",
    "orderedNotesLocationList": [0, 1, 3, 7, 9],
    "notesLocationList": [9, 1, 3, 7, 0],
    "n3L": 1,
    "n5L": 3,
    "n7L": 7,
    "n9L": 0,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 9,
    "chordKey": "maj7b5",
    "cnName": "\u5927\u4E03\u964D\u4E94",
    "type": "chord7alt",
    "orderedNotesLocationList": [1, 3, 8, 9],
    "notesLocationList": [9, 1, 3, 8],
    "n3L": 1,
    "n5L": 3,
    "n7L": 8,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 9,
    "chordKey": "maj7#5",
    "cnName": "\u5927\u4E03\u589E\u4E94",
    "type": "chord7alt",
    "orderedNotesLocationList": [1, 5, 8, 9],
    "notesLocationList": [9, 1, 5, 8],
    "n3L": 1,
    "n5L": 5,
    "n7L": 8,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 9,
    "chordKey": "maj7b9",
    "cnName": "\u5927\u4E03\u964D\u4E5D",
    "type": "chord7alt",
    "orderedNotesLocationList": [1, 4, 8, 9, 10],
    "notesLocationList": [9, 1, 4, 8, 10],
    "n3L": 1,
    "n5L": 4,
    "n7L": 8,
    "n9L": 10,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 9,
    "chordKey": "maj7b13",
    "cnName": "\u5927\u4E03\u964D\u5341\u4E09",
    "type": "chord7alt",
    "orderedNotesLocationList": [1, 4, 5, 8, 9],
    "notesLocationList": [9, 1, 4, 8, 5],
    "n3L": 1,
    "n5L": 4,
    "n7L": 8,
    "n9L": -1,
    "n11L": -1,
    "n13L": 5
}, {
    "rootNoteLocation": 9,
    "chordKey": "maj7#11",
    "cnName": "\u5927\u4E03\u5347\u5341\u4E00",
    "type": "chord7alt",
    "orderedNotesLocationList": [1, 3, 4, 8, 9],
    "notesLocationList": [9, 1, 4, 8, 3],
    "n3L": 1,
    "n5L": 4,
    "n7L": 8,
    "n9L": -1,
    "n11L": 3,
    "n13L": -1
}, {
    "rootNoteLocation": 9,
    "chordKey": "min7#5",
    "cnName": "\u5C0F\u4E03\u5347\u4E94",
    "type": "chord7alt",
    "orderedNotesLocationList": [0, 5, 7, 9],
    "notesLocationList": [9, 0, 5, 7],
    "n3L": 0,
    "n5L": 5,
    "n7L": 7,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 9,
    "chordKey": "minmaj7b5",
    "cnName": "\u5C0F\u5927\u4E03\u964D\u4E94",
    "type": "chord7alt",
    "orderedNotesLocationList": [0, 3, 8, 9],
    "notesLocationList": [9, 0, 3, 8],
    "n3L": 0,
    "n5L": 3,
    "n7L": 8,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 9,
    "chordKey": "minmaj7#5",
    "cnName": "\u5C0F\u5927\u4E03\u5347\u4E94",
    "type": "chord7alt",
    "orderedNotesLocationList": [0, 5, 8, 9],
    "notesLocationList": [9, 0, 5, 8],
    "n3L": 0,
    "n5L": 5,
    "n7L": 8,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 9,
    "chordKey": "dom7#5b9",
    "cnName": "\u589E\u4E03\u964D\u4E5D\uFF08\u5C5E\u4E03\u5347\u4E94\u964D\u4E5D\uFF09",
    "type": "chord7alt",
    "orderedNotesLocationList": [1, 5, 7, 9, 10],
    "notesLocationList": [9, 1, 5, 7, 10],
    "n3L": 1,
    "n5L": 5,
    "n7L": 7,
    "n9L": 10,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 9,
    "chordKey": "dom7#5#9",
    "cnName": "\u589E\u4E03\u5347\u4E5D\uFF08\u5C5E\u4E03\u5347\u4E94\u5347\u4E5D\uFF09",
    "type": "chord7alt",
    "orderedNotesLocationList": [0, 1, 5, 7, 9],
    "notesLocationList": [9, 1, 5, 7, 0],
    "n3L": 1,
    "n5L": 5,
    "n7L": 7,
    "n9L": 0,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 9,
    "chordKey": "sus2",
    "cnName": "\u6302\u4E8C",
    "type": "sus",
    "orderedNotesLocationList": [4, 9, 11],
    "notesLocationList": [9, 11, 4],
    "n3L": -1,
    "n5L": 4,
    "n7L": -1,
    "n9L": 11,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 9,
    "chordKey": "sus4",
    "cnName": "\u6302\u56DB",
    "type": "sus",
    "orderedNotesLocationList": [2, 4, 9],
    "notesLocationList": [9, 2, 4],
    "n3L": -1,
    "n5L": 4,
    "n7L": -1,
    "n9L": -1,
    "n11L": 2,
    "n13L": -1
}, {
    "rootNoteLocation": 9,
    "chordKey": "dom7sus2",
    "cnName": "\u5C5E\u4E03\u6302\u4E8C",
    "type": "sus",
    "orderedNotesLocationList": [4, 7, 9, 11],
    "notesLocationList": [9, 11, 4, 7],
    "n3L": -1,
    "n5L": 4,
    "n7L": 7,
    "n9L": 11,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 9,
    "chordKey": "dom7sus4",
    "cnName": "\u5C5E\u4E03\u6302\u56DB",
    "type": "sus",
    "orderedNotesLocationList": [2, 4, 7, 9],
    "notesLocationList": [9, 2, 4, 7],
    "n3L": -1,
    "n5L": 4,
    "n7L": 7,
    "n9L": -1,
    "n11L": 2,
    "n13L": -1
}, {
    "rootNoteLocation": 9,
    "chordKey": "maj7sus2",
    "cnName": "\u5927\u4E03\u6302\u4E8C",
    "type": "sus",
    "orderedNotesLocationList": [4, 8, 9, 11],
    "notesLocationList": [9, 11, 4, 8],
    "n3L": -1,
    "n5L": 4,
    "n7L": 8,
    "n9L": 11,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 9,
    "chordKey": "maj7sus4",
    "cnName": "\u5927\u4E03\u6302\u56DB",
    "type": "sus",
    "orderedNotesLocationList": [2, 4, 8, 9],
    "notesLocationList": [9, 2, 4, 8],
    "n3L": -1,
    "n5L": 4,
    "n7L": 8,
    "n9L": -1,
    "n11L": 2,
    "n13L": -1
}, {
    "rootNoteLocation": 9,
    "chordKey": "dom9sus4",
    "cnName": "\u5C5E\u4E5D\u6302\u56DB",
    "type": "sus",
    "orderedNotesLocationList": [2, 4, 7, 9, 11],
    "notesLocationList": [9, 2, 4, 7, 11],
    "n3L": -1,
    "n5L": 4,
    "n7L": 7,
    "n9L": 11,
    "n11L": 2,
    "n13L": -1
}, {
    "rootNoteLocation": 9,
    "chordKey": "maj9sus4",
    "cnName": "\u5927\u4E5D\u6302\u56DB",
    "type": "sus",
    "orderedNotesLocationList": [2, 4, 8, 9, 11],
    "notesLocationList": [9, 2, 4, 8, 11],
    "n3L": -1,
    "n5L": 4,
    "n7L": 8,
    "n9L": 11,
    "n11L": 2,
    "n13L": -1
}, {
    "rootNoteLocation": 9,
    "chordKey": "dom13sus4",
    "cnName": "\u5C5E\u5341\u4E09\u6302\u56DB",
    "type": "sus",
    "orderedNotesLocationList": [2, 4, 6, 7, 9, 11],
    "notesLocationList": [9, 2, 4, 7, 11, 6],
    "n3L": -1,
    "n5L": 4,
    "n7L": 7,
    "n9L": 11,
    "n11L": 2,
    "n13L": 6
}, {
    "rootNoteLocation": 9,
    "chordKey": "maj13sus4",
    "cnName": "\u5927\u5341\u4E09\u6302\u56DB",
    "type": "sus",
    "orderedNotesLocationList": [2, 4, 6, 8, 9, 11],
    "notesLocationList": [9, 2, 4, 8, 11, 6],
    "n3L": -1,
    "n5L": 4,
    "n7L": 8,
    "n9L": 11,
    "n11L": 2,
    "n13L": 6
}, {
    "rootNoteLocation": 9,
    "chordKey": "maj13sus2",
    "cnName": "\u5927\u5341\u4E09\u6302\u4E8C",
    "type": "sus",
    "orderedNotesLocationList": [4, 6, 8, 9, 11],
    "notesLocationList": [9, 11, 4, 8, 6],
    "n3L": -1,
    "n5L": 4,
    "n7L": 8,
    "n9L": 11,
    "n11L": -1,
    "n13L": 6
}, {
    "rootNoteLocation": 9,
    "chordKey": "maj9",
    "cnName": "\u5927\u4E5D",
    "type": "chord9",
    "orderedNotesLocationList": [1, 4, 8, 9, 11],
    "notesLocationList": [9, 1, 4, 8, 11],
    "n3L": 1,
    "n5L": 4,
    "n7L": 8,
    "n9L": 11,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 9,
    "chordKey": "dom9",
    "cnName": "\u5C5E\u4E5D",
    "type": "chord9",
    "orderedNotesLocationList": [1, 4, 7, 9, 11],
    "notesLocationList": [9, 1, 4, 7, 11],
    "n3L": 1,
    "n5L": 4,
    "n7L": 7,
    "n9L": 11,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 9,
    "chordKey": "min9",
    "cnName": "\u5C0F\u4E5D",
    "type": "chord9",
    "orderedNotesLocationList": [0, 4, 7, 9, 11],
    "notesLocationList": [9, 0, 4, 7, 11],
    "n3L": 0,
    "n5L": 4,
    "n7L": 7,
    "n9L": 11,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 9,
    "chordKey": "minmaj9",
    "cnName": "\u5C0F\u5927\u4E5D",
    "type": "chord9",
    "orderedNotesLocationList": [0, 4, 8, 9, 11],
    "notesLocationList": [9, 0, 4, 8, 11],
    "n3L": 0,
    "n5L": 4,
    "n7L": 8,
    "n9L": 11,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 9,
    "chordKey": "dom9#5",
    "cnName": "\u589E\u4E5D\uFF08\u5C5E\u4E5D\u5347\u4E94\uFF09",
    "type": "chord9",
    "orderedNotesLocationList": [1, 5, 7, 9, 11],
    "notesLocationList": [9, 1, 5, 7, 11],
    "n3L": 1,
    "n5L": 5,
    "n7L": 7,
    "n9L": 11,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 9,
    "chordKey": "dom9b9",
    "cnName": "\u5C5E\u4E5D\u964D\u4E5D",
    "type": "chord9",
    "orderedNotesLocationList": [1, 4, 7, 9, 10],
    "notesLocationList": [9, 1, 4, 7, 10],
    "n3L": 1,
    "n5L": 4,
    "n7L": 7,
    "n9L": 10,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 9,
    "chordKey": "dom9b11",
    "cnName": "\u5C5E\u4E5D\u964D\u5341\u4E00",
    "type": "chord9",
    "orderedNotesLocationList": [1, 1, 4, 7, 9, 11],
    "notesLocationList": [9, 1, 4, 7, 11, 1],
    "n3L": 1,
    "n5L": 4,
    "n7L": 7,
    "n9L": 11,
    "n11L": 1,
    "n13L": -1
}, {
    "rootNoteLocation": 9,
    "chordKey": "dom9#11",
    "cnName": "\u5C5E\u4E5D\u5347\u5341\u4E00",
    "type": "chord9",
    "orderedNotesLocationList": [1, 3, 4, 7, 9, 11],
    "notesLocationList": [9, 1, 4, 7, 11, 3],
    "n3L": 1,
    "n5L": 4,
    "n7L": 7,
    "n9L": 11,
    "n11L": 3,
    "n13L": -1
}, {
    "rootNoteLocation": 9,
    "chordKey": "dom9b13",
    "cnName": "\u5C5E\u4E5D\u964D\u5341\u4E09",
    "type": "chord9",
    "orderedNotesLocationList": [1, 4, 5, 7, 9, 11],
    "notesLocationList": [9, 1, 4, 7, 11, 5],
    "n3L": 1,
    "n5L": 4,
    "n7L": 7,
    "n9L": 11,
    "n11L": -1,
    "n13L": 5
}, {
    "rootNoteLocation": 9,
    "chordKey": "maj9b5",
    "cnName": "\u5927\u4E5D\u964D\u4E94",
    "type": "chord9",
    "orderedNotesLocationList": [1, 3, 8, 9, 11],
    "notesLocationList": [9, 1, 3, 8, 11],
    "n3L": 1,
    "n5L": 3,
    "n7L": 8,
    "n9L": 11,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 9,
    "chordKey": "maj9#5",
    "cnName": "\u5927\u4E5D\u5347\u4E94",
    "type": "chord9",
    "orderedNotesLocationList": [1, 5, 8, 9, 11],
    "notesLocationList": [9, 1, 5, 8, 11],
    "n3L": 1,
    "n5L": 5,
    "n7L": 8,
    "n9L": 11,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 9,
    "chordKey": "maj9#11",
    "cnName": "\u5927\u4E5D\u5347\u5341\u4E00",
    "type": "chord9",
    "orderedNotesLocationList": [1, 3, 4, 8, 9, 11],
    "notesLocationList": [9, 1, 4, 8, 11, 3],
    "n3L": 1,
    "n5L": 4,
    "n7L": 8,
    "n9L": 11,
    "n11L": 3,
    "n13L": -1
}, {
    "rootNoteLocation": 9,
    "chordKey": "maj9b13",
    "cnName": "\u5927\u4E5D\u964D\u5341\u4E09",
    "type": "chord9",
    "orderedNotesLocationList": [1, 3, 5, 8, 9, 11],
    "notesLocationList": [9, 1, 3, 8, 11, 5],
    "n3L": 1,
    "n5L": 3,
    "n7L": 8,
    "n9L": 11,
    "n11L": -1,
    "n13L": 5
}, {
    "rootNoteLocation": 9,
    "chordKey": "min9b5",
    "cnName": "\u5C0F\u4E5D\u964D\u4E94",
    "type": "chord9",
    "orderedNotesLocationList": [0, 3, 7, 9, 11],
    "notesLocationList": [9, 0, 3, 7, 11],
    "n3L": 0,
    "n5L": 3,
    "n7L": 7,
    "n9L": 11,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 9,
    "chordKey": "min9b9",
    "cnName": "\u5C0F\u4E5D\u964D\u4E5D",
    "type": "chord9",
    "orderedNotesLocationList": [0, 4, 7, 9, 10],
    "notesLocationList": [9, 0, 4, 7, 10],
    "n3L": 0,
    "n5L": 4,
    "n7L": 7,
    "n9L": 10,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 9,
    "chordKey": "maj11",
    "cnName": "\u5927\u5341\u4E00",
    "type": "chord11",
    "orderedNotesLocationList": [1, 2, 4, 8, 9, 11],
    "notesLocationList": [9, 1, 4, 8, 11, 2],
    "n3L": 1,
    "n5L": 4,
    "n7L": 8,
    "n9L": 11,
    "n11L": 2,
    "n13L": -1
}, {
    "rootNoteLocation": 9,
    "chordKey": "dom11",
    "cnName": "\u5C5E\u5341\u4E00",
    "type": "chord11",
    "orderedNotesLocationList": [1, 2, 4, 7, 9, 11],
    "notesLocationList": [9, 1, 4, 7, 11, 2],
    "n3L": 1,
    "n5L": 4,
    "n7L": 7,
    "n9L": 11,
    "n11L": 2,
    "n13L": -1
}, {
    "rootNoteLocation": 9,
    "chordKey": "min11",
    "cnName": "\u5C0F\u5341\u4E00",
    "type": "chord11",
    "orderedNotesLocationList": [0, 2, 4, 7, 9, 11],
    "notesLocationList": [9, 0, 4, 7, 11, 2],
    "n3L": 0,
    "n5L": 4,
    "n7L": 7,
    "n9L": 11,
    "n11L": 2,
    "n13L": -1
}, {
    "rootNoteLocation": 9,
    "chordKey": "minmaj11",
    "cnName": "\u5C0F\u5927\u5341\u4E00",
    "type": "chord11",
    "orderedNotesLocationList": [0, 2, 4, 8, 9, 11],
    "notesLocationList": [9, 0, 4, 8, 11, 2],
    "n3L": 0,
    "n5L": 4,
    "n7L": 8,
    "n9L": 11,
    "n11L": 2,
    "n13L": -1
}, {
    "rootNoteLocation": 9,
    "chordKey": "dom11b5",
    "cnName": "\u5C5E\u5341\u4E00\u964D\u4E94",
    "type": "chord11",
    "orderedNotesLocationList": [1, 2, 3, 7, 9, 11],
    "notesLocationList": [9, 1, 3, 7, 11, 2],
    "n3L": 1,
    "n5L": 3,
    "n7L": 7,
    "n9L": 11,
    "n11L": 2,
    "n13L": -1
}, {
    "rootNoteLocation": 9,
    "chordKey": "dom11#5",
    "cnName": "\u5C5E\u5341\u4E00\u5347\u4E94",
    "type": "chord11",
    "orderedNotesLocationList": [1, 2, 5, 7, 9, 11],
    "notesLocationList": [9, 1, 5, 7, 11, 2],
    "n3L": 1,
    "n5L": 5,
    "n7L": 7,
    "n9L": 11,
    "n11L": 2,
    "n13L": -1
}, {
    "rootNoteLocation": 9,
    "chordKey": "dom11b9",
    "cnName": "\u5C5E\u5341\u4E00\u964D\u4E5D",
    "type": "chord11",
    "orderedNotesLocationList": [1, 2, 4, 7, 9, 10],
    "notesLocationList": [9, 1, 4, 7, 10, 2],
    "n3L": 1,
    "n5L": 4,
    "n7L": 7,
    "n9L": 10,
    "n11L": 2,
    "n13L": -1
}, {
    "rootNoteLocation": 9,
    "chordKey": "dom11#9",
    "cnName": "\u5C5E\u5341\u4E00\u5347\u4E5D",
    "type": "chord11",
    "orderedNotesLocationList": [0, 1, 2, 4, 7, 9],
    "notesLocationList": [9, 1, 4, 7, 0, 2],
    "n3L": 1,
    "n5L": 4,
    "n7L": 7,
    "n9L": 0,
    "n11L": 2,
    "n13L": -1
}, {
    "rootNoteLocation": 9,
    "chordKey": "dom11b13",
    "cnName": "\u5C5E\u5341\u4E00\u964D\u5341\u4E09",
    "type": "chord11",
    "orderedNotesLocationList": [1, 2, 4, 5, 7, 9, 11],
    "notesLocationList": [9, 1, 4, 7, 11, 2, 5],
    "n3L": 1,
    "n5L": 4,
    "n7L": 7,
    "n9L": 11,
    "n11L": 2,
    "n13L": 5
}, {
    "rootNoteLocation": 9,
    "chordKey": "min11b5",
    "cnName": "\u5C0F\u5341\u4E00\u964D\u4E94",
    "type": "chord11",
    "orderedNotesLocationList": [0, 2, 3, 7, 9, 11],
    "notesLocationList": [9, 0, 3, 7, 11, 2],
    "n3L": 0,
    "n5L": 3,
    "n7L": 7,
    "n9L": 11,
    "n11L": 2,
    "n13L": -1
}, {
    "rootNoteLocation": 9,
    "chordKey": "maj13",
    "cnName": "\u5927\u5341\u4E09",
    "type": "chord13",
    "orderedNotesLocationList": [1, 2, 4, 6, 8, 9, 11],
    "notesLocationList": [9, 1, 4, 8, 11, 2, 6],
    "n3L": 1,
    "n5L": 4,
    "n7L": 8,
    "n9L": 11,
    "n11L": 2,
    "n13L": 6
}, {
    "rootNoteLocation": 9,
    "chordKey": "dom13",
    "cnName": "\u5C5E\u5341\u4E09",
    "type": "chord13",
    "orderedNotesLocationList": [1, 2, 4, 6, 7, 9, 11],
    "notesLocationList": [9, 1, 4, 7, 11, 2, 6],
    "n3L": 1,
    "n5L": 4,
    "n7L": 7,
    "n9L": 11,
    "n11L": 2,
    "n13L": 6
}, {
    "rootNoteLocation": 9,
    "chordKey": "min13",
    "cnName": "\u5C0F\u5341\u4E09",
    "type": "chord13",
    "orderedNotesLocationList": [0, 2, 4, 6, 7, 9, 11],
    "notesLocationList": [9, 0, 4, 7, 11, 2, 6],
    "n3L": 0,
    "n5L": 4,
    "n7L": 7,
    "n9L": 11,
    "n11L": 2,
    "n13L": 6
}, {
    "rootNoteLocation": 9,
    "chordKey": "minmaj13",
    "cnName": "\u5C0F\u5927\u5341\u4E09",
    "type": "chord13",
    "orderedNotesLocationList": [0, 2, 4, 6, 8, 9, 11],
    "notesLocationList": [9, 0, 4, 8, 11, 2, 6],
    "n3L": 0,
    "n5L": 4,
    "n7L": 8,
    "n9L": 11,
    "n11L": 2,
    "n13L": 6
}, {
    "rootNoteLocation": 9,
    "chordKey": "dom13b5",
    "cnName": "\u5C5E\u5341\u4E09\u964D\u4E94",
    "type": "chord13",
    "orderedNotesLocationList": [1, 2, 3, 6, 7, 9, 11],
    "notesLocationList": [9, 1, 3, 7, 11, 2, 6],
    "n3L": 1,
    "n5L": 3,
    "n7L": 7,
    "n9L": 11,
    "n11L": 2,
    "n13L": 6
}, {
    "rootNoteLocation": 9,
    "chordKey": "dom13#5",
    "cnName": "\u5C5E\u5341\u4E09\u5347\u4E94",
    "type": "chord13",
    "orderedNotesLocationList": [1, 2, 5, 6, 7, 9, 11],
    "notesLocationList": [9, 1, 5, 7, 11, 2, 6],
    "n3L": 1,
    "n5L": 5,
    "n7L": 7,
    "n9L": 11,
    "n11L": 2,
    "n13L": 6
}, {
    "rootNoteLocation": 9,
    "chordKey": "dom13b9",
    "cnName": "\u5C5E\u5341\u4E09\u964D\u4E5D",
    "type": "chord13",
    "orderedNotesLocationList": [1, 2, 4, 6, 7, 9, 10],
    "notesLocationList": [9, 1, 4, 7, 10, 2, 6],
    "n3L": 1,
    "n5L": 4,
    "n7L": 7,
    "n9L": 10,
    "n11L": 2,
    "n13L": 6
}, {
    "rootNoteLocation": 9,
    "chordKey": "dom13#9",
    "cnName": "\u5C5E\u5341\u4E09\u5347\u4E5D",
    "type": "chord13",
    "orderedNotesLocationList": [0, 1, 4, 6, 7, 9],
    "notesLocationList": [9, 1, 4, 7, 0, 6],
    "n3L": 1,
    "n5L": 4,
    "n7L": 7,
    "n9L": 0,
    "n11L": -1,
    "n13L": 6
}, {
    "rootNoteLocation": 9,
    "chordKey": "dom13#11",
    "cnName": "\u5C5E\u5341\u4E09\u5347\u5341\u4E00",
    "type": "chord13",
    "orderedNotesLocationList": [1, 3, 4, 6, 7, 9, 11],
    "notesLocationList": [9, 1, 4, 7, 11, 3, 6],
    "n3L": 1,
    "n5L": 4,
    "n7L": 7,
    "n9L": 11,
    "n11L": 3,
    "n13L": 6
}, {
    "rootNoteLocation": 9,
    "chordKey": "maj13b5",
    "cnName": "\u5927\u5341\u4E09\u964D\u4E94",
    "type": "chord13",
    "orderedNotesLocationList": [1, 3, 6, 8, 9, 11],
    "notesLocationList": [9, 1, 3, 8, 11, 6],
    "n3L": 1,
    "n5L": 3,
    "n7L": 8,
    "n9L": 11,
    "n11L": -1,
    "n13L": 6
}, {
    "rootNoteLocation": 9,
    "chordKey": "maj13#5",
    "cnName": "\u5927\u5341\u4E09\u5347\u4E94",
    "type": "chord13",
    "orderedNotesLocationList": [1, 5, 6, 8, 9, 11],
    "notesLocationList": [9, 1, 5, 8, 11, 6],
    "n3L": 1,
    "n5L": 5,
    "n7L": 8,
    "n9L": 11,
    "n11L": -1,
    "n13L": 6
}, {
    "rootNoteLocation": 9,
    "chordKey": "maj13b9",
    "cnName": "\u5927\u5341\u4E09\u964D\u4E5D",
    "type": "chord13",
    "orderedNotesLocationList": [1, 4, 6, 8, 9, 10],
    "notesLocationList": [9, 1, 4, 8, 10, 6],
    "n3L": 1,
    "n5L": 4,
    "n7L": 8,
    "n9L": 10,
    "n11L": -1,
    "n13L": 6
}, {
    "rootNoteLocation": 9,
    "chordKey": "maj13#11",
    "cnName": "\u5927\u5341\u4E09\u5347\u5341\u4E00",
    "type": "chord13",
    "orderedNotesLocationList": [1, 3, 4, 6, 8, 9, 11],
    "notesLocationList": [9, 1, 4, 8, 11, 3, 6],
    "n3L": 1,
    "n5L": 4,
    "n7L": 8,
    "n9L": 11,
    "n11L": 3,
    "n13L": 6
}, {
    "rootNoteLocation": 10,
    "chordKey": "maj3",
    "cnName": "\u5927\u4E09",
    "type": "chord3",
    "orderedNotesLocationList": [2, 5, 10],
    "notesLocationList": [10, 2, 5],
    "n3L": 2,
    "n5L": 5,
    "n7L": -1,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 10,
    "chordKey": "min3",
    "cnName": "\u5C0F\u4E09",
    "type": "chord3",
    "orderedNotesLocationList": [1, 5, 10],
    "notesLocationList": [10, 1, 5],
    "n3L": 1,
    "n5L": 5,
    "n7L": -1,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 10,
    "chordKey": "dim3",
    "cnName": "\u51CF\u4E09",
    "type": "chord3",
    "orderedNotesLocationList": [1, 4, 10],
    "notesLocationList": [10, 1, 4],
    "n3L": 1,
    "n5L": 4,
    "n7L": -1,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 10,
    "chordKey": "aug3",
    "cnName": "\u589E\u4E09",
    "type": "chord3",
    "orderedNotesLocationList": [2, 6, 10],
    "notesLocationList": [10, 2, 6],
    "n3L": 2,
    "n5L": 6,
    "n7L": -1,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 10,
    "chordKey": "maj3b5",
    "cnName": "\u5927\u4E09\u51CF\u4E94",
    "type": "chord3",
    "orderedNotesLocationList": [2, 4, 10],
    "notesLocationList": [10, 2, 4],
    "n3L": 2,
    "n5L": 4,
    "n7L": -1,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 10,
    "chordKey": "maj3add6",
    "cnName": "\u5927\u516D\uFF08\u5927\u4E09\u52A0\u5341\u4E09\u97F3\uFF09",
    "type": "add",
    "orderedNotesLocationList": [2, 5, 7, 10],
    "notesLocationList": [10, 2, 5, 7],
    "n3L": 2,
    "n5L": 5,
    "n7L": -1,
    "n9L": -1,
    "n11L": -1,
    "n13L": 7
}, {
    "rootNoteLocation": 10,
    "chordKey": "min3add6",
    "cnName": "\u5C0F\u516D\uFF08\u5C0F\u4E09\u52A0\u5341\u4E09\u97F3\uFF09",
    "type": "add",
    "orderedNotesLocationList": [1, 5, 6, 10],
    "notesLocationList": [10, 1, 5, 6],
    "n3L": 1,
    "n5L": 5,
    "n7L": -1,
    "n9L": -1,
    "n11L": -1,
    "n13L": 6
}, {
    "rootNoteLocation": 10,
    "chordKey": "maj3add6add9",
    "cnName": "\u516D\u4E5D",
    "type": "add",
    "orderedNotesLocationList": [0, 2, 5, 7, 10],
    "notesLocationList": [10, 2, 5, 7, 0],
    "n3L": 2,
    "n5L": 5,
    "n7L": -1,
    "n9L": 0,
    "n11L": -1,
    "n13L": 7
}, {
    "rootNoteLocation": 10,
    "chordKey": "min3add6add9",
    "cnName": "\u5C0F\u516D\u4E5D",
    "type": "add",
    "orderedNotesLocationList": [0, 1, 5, 7, 10],
    "notesLocationList": [10, 1, 5, 7, 0],
    "n3L": 1,
    "n5L": 5,
    "n7L": -1,
    "n9L": 0,
    "n11L": -1,
    "n13L": 7
}, {
    "rootNoteLocation": 10,
    "chordKey": "maj3add9",
    "cnName": "\u5927\u4E09\u52A0\u4E5D\u97F3\uFF08\u4E8C\u97F3\uFF09",
    "type": "add",
    "orderedNotesLocationList": [0, 2, 5, 10],
    "notesLocationList": [10, 2, 5, 0],
    "n3L": 2,
    "n5L": 5,
    "n7L": -1,
    "n9L": 0,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 10,
    "chordKey": "maj3add11",
    "cnName": "\u5927\u4E09\u52A0\u5341\u4E00\u97F3\uFF08\u56DB\u97F3\uFF09",
    "type": "add",
    "orderedNotesLocationList": [2, 3, 5, 10],
    "notesLocationList": [10, 2, 5, 3],
    "n3L": 2,
    "n5L": 5,
    "n7L": -1,
    "n9L": -1,
    "n11L": 3,
    "n13L": -1
}, {
    "rootNoteLocation": 10,
    "chordKey": "min3add9",
    "cnName": "\u5C0F\u4E09\u52A0\u4E5D\u97F3\uFF08\u4E8C\u97F3\uFF09",
    "type": "add",
    "orderedNotesLocationList": [0, 1, 5, 10],
    "notesLocationList": [10, 1, 5, 0],
    "n3L": 1,
    "n5L": 5,
    "n7L": -1,
    "n9L": 0,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 10,
    "chordKey": "min3add11",
    "cnName": "\u5C0F\u4E09\u52A0\u5341\u4E00\u97F3\uFF08\u56DB\u97F3\uFF09",
    "type": "add",
    "orderedNotesLocationList": [1, 3, 5, 10],
    "notesLocationList": [10, 1, 5, 3],
    "n3L": 1,
    "n5L": 5,
    "n7L": -1,
    "n9L": -1,
    "n11L": 3,
    "n13L": -1
}, {
    "rootNoteLocation": 10,
    "chordKey": "maj7add11",
    "cnName": "\u5927\u4E03\u52A0\u5341\u4E00\u97F3\uFF08\u56DB\u97F3\uFF09",
    "type": "add",
    "orderedNotesLocationList": [2, 3, 5, 9, 10],
    "notesLocationList": [10, 2, 5, 9, 3],
    "n3L": 2,
    "n5L": 5,
    "n7L": 9,
    "n9L": -1,
    "n11L": 3,
    "n13L": -1
}, {
    "rootNoteLocation": 10,
    "chordKey": "dom7add6",
    "cnName": "\u5C5E\u4E03\u52A0\u516D\u97F3",
    "type": "add",
    "orderedNotesLocationList": [2, 5, 7, 8, 10],
    "notesLocationList": [10, 2, 5, 7, 8],
    "n3L": 2,
    "n5L": 5,
    "n7L": 8,
    "n9L": -1,
    "n11L": -1,
    "n13L": 7
}, {
    "rootNoteLocation": 10,
    "chordKey": "itaug6",
    "cnName": "\u610F\u5927\u5229\u589E\u516D",
    "type": "aug6",
    "orderedNotesLocationList": [4, 6, 10],
    "notesLocationList": [10, 4, 6],
    "n3L": -1,
    "n5L": -1,
    "n7L": -1,
    "n9L": -1,
    "n11L": 4,
    "n13L": 6
}, {
    "rootNoteLocation": 10,
    "chordKey": "fraug6",
    "cnName": "\u6CD5\u56FD\u589E\u516D",
    "type": "aug6",
    "orderedNotesLocationList": [0, 4, 6, 10],
    "notesLocationList": [10, 0, 4, 6],
    "n3L": -1,
    "n5L": -1,
    "n7L": -1,
    "n9L": 0,
    "n11L": 4,
    "n13L": 6
}, {
    "rootNoteLocation": 10,
    "chordKey": "graug6",
    "cnName": "\u5FB7\u56FD\u589E\u516D",
    "type": "aug6",
    "orderedNotesLocationList": [1, 4, 6, 10],
    "notesLocationList": [10, 1, 4, 6],
    "n3L": 1,
    "n5L": -1,
    "n7L": -1,
    "n9L": -1,
    "n11L": 4,
    "n13L": 6
}, {
    "rootNoteLocation": 10,
    "chordKey": "maj7",
    "cnName": "\u5927\u4E03",
    "type": "chord7",
    "orderedNotesLocationList": [2, 5, 9, 10],
    "notesLocationList": [10, 2, 5, 9],
    "n3L": 2,
    "n5L": 5,
    "n7L": 9,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 10,
    "chordKey": "dom7",
    "cnName": "\u5C5E\u4E03",
    "type": "chord7",
    "orderedNotesLocationList": [2, 5, 8, 10],
    "notesLocationList": [10, 2, 5, 8],
    "n3L": 2,
    "n5L": 5,
    "n7L": 8,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 10,
    "chordKey": "min7",
    "cnName": "\u5C0F\u4E03",
    "type": "chord7",
    "orderedNotesLocationList": [1, 5, 8, 10],
    "notesLocationList": [10, 1, 5, 8],
    "n3L": 1,
    "n5L": 5,
    "n7L": 8,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 10,
    "chordKey": "halfdim7",
    "cnName": "\u534A\u51CF\u4E03",
    "type": "chord7",
    "orderedNotesLocationList": [1, 4, 8, 10],
    "notesLocationList": [10, 1, 4, 8],
    "n3L": 1,
    "n5L": 4,
    "n7L": 8,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 10,
    "chordKey": "dim7",
    "cnName": "\u51CF\u4E03",
    "type": "chord7",
    "orderedNotesLocationList": [1, 4, 7, 10],
    "notesLocationList": [10, 1, 4, 7],
    "n3L": 1,
    "n5L": 4,
    "n7L": 7,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 10,
    "chordKey": "minmaj7",
    "cnName": "\u5C0F\u5927\u4E03",
    "type": "chord7",
    "orderedNotesLocationList": [1, 5, 9, 10],
    "notesLocationList": [10, 1, 5, 9],
    "n3L": 1,
    "n5L": 5,
    "n7L": 9,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 10,
    "chordKey": "dom7#5",
    "cnName": "\u589E\u4E03\uFF08\u5C5E\u4E03\u5347\u4E94\uFF09",
    "type": "chord7",
    "orderedNotesLocationList": [2, 6, 8, 10],
    "notesLocationList": [10, 2, 6, 8],
    "n3L": 2,
    "n5L": 6,
    "n7L": 8,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 10,
    "chordKey": "augmaj7",
    "cnName": "\u589E\u5927\u4E03",
    "type": "chord7",
    "orderedNotesLocationList": [2, 6, 9, 10],
    "notesLocationList": [10, 2, 6, 9],
    "n3L": 2,
    "n5L": 6,
    "n7L": 9,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 10,
    "chordKey": "dom7b5",
    "cnName": "\u5C5E\u4E03\u964D\u4E94",
    "type": "chord7alt",
    "orderedNotesLocationList": [2, 4, 8, 10],
    "notesLocationList": [10, 2, 4, 8],
    "n3L": 2,
    "n5L": 4,
    "n7L": 8,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 10,
    "chordKey": "dom7b9",
    "cnName": "\u5C5E\u4E03\u964D\u4E5D",
    "type": "chord7alt",
    "orderedNotesLocationList": [2, 5, 8, 10, 11],
    "notesLocationList": [10, 2, 5, 8, 11],
    "n3L": 2,
    "n5L": 5,
    "n7L": 8,
    "n9L": 11,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 10,
    "chordKey": "dom7#9",
    "cnName": "\u5C5E\u4E03\u5347\u4E5D",
    "type": "chord7alt",
    "orderedNotesLocationList": [1, 2, 5, 8, 10],
    "notesLocationList": [10, 2, 5, 8, 1],
    "n3L": 2,
    "n5L": 5,
    "n7L": 8,
    "n9L": 1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 10,
    "chordKey": "dom7#11",
    "cnName": "\u5C5E\u4E03\u5347\u5341\u4E00",
    "type": "chord7alt",
    "orderedNotesLocationList": [2, 4, 5, 8, 10],
    "notesLocationList": [10, 2, 5, 8, 4],
    "n3L": 2,
    "n5L": 5,
    "n7L": 8,
    "n9L": -1,
    "n11L": 4,
    "n13L": -1
}, {
    "rootNoteLocation": 10,
    "chordKey": "dom7b13",
    "cnName": "\u5C5E\u4E03\u964D\u5341\u4E09",
    "type": "chord7alt",
    "orderedNotesLocationList": [2, 5, 6, 8, 10],
    "notesLocationList": [10, 2, 5, 8, 6],
    "n3L": 2,
    "n5L": 5,
    "n7L": 8,
    "n9L": -1,
    "n11L": -1,
    "n13L": 6
}, {
    "rootNoteLocation": 10,
    "chordKey": "dom7b5b9",
    "cnName": "\u5C5E\u4E03\u964D\u4E94\u964D\u4E5D",
    "type": "chord7alt",
    "orderedNotesLocationList": [2, 4, 8, 10, 11],
    "notesLocationList": [10, 2, 4, 8, 11],
    "n3L": 2,
    "n5L": 4,
    "n7L": 8,
    "n9L": 11,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 10,
    "chordKey": "dom7b5#9",
    "cnName": "\u5C5E\u4E03\u964D\u4E94\u5347\u4E5D",
    "type": "chord7alt",
    "orderedNotesLocationList": [1, 2, 4, 8, 10],
    "notesLocationList": [10, 2, 4, 8, 1],
    "n3L": 2,
    "n5L": 4,
    "n7L": 8,
    "n9L": 1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 10,
    "chordKey": "maj7b5",
    "cnName": "\u5927\u4E03\u964D\u4E94",
    "type": "chord7alt",
    "orderedNotesLocationList": [2, 4, 9, 10],
    "notesLocationList": [10, 2, 4, 9],
    "n3L": 2,
    "n5L": 4,
    "n7L": 9,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 10,
    "chordKey": "maj7#5",
    "cnName": "\u5927\u4E03\u589E\u4E94",
    "type": "chord7alt",
    "orderedNotesLocationList": [2, 6, 9, 10],
    "notesLocationList": [10, 2, 6, 9],
    "n3L": 2,
    "n5L": 6,
    "n7L": 9,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 10,
    "chordKey": "maj7b9",
    "cnName": "\u5927\u4E03\u964D\u4E5D",
    "type": "chord7alt",
    "orderedNotesLocationList": [2, 5, 9, 10, 11],
    "notesLocationList": [10, 2, 5, 9, 11],
    "n3L": 2,
    "n5L": 5,
    "n7L": 9,
    "n9L": 11,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 10,
    "chordKey": "maj7b13",
    "cnName": "\u5927\u4E03\u964D\u5341\u4E09",
    "type": "chord7alt",
    "orderedNotesLocationList": [2, 5, 6, 9, 10],
    "notesLocationList": [10, 2, 5, 9, 6],
    "n3L": 2,
    "n5L": 5,
    "n7L": 9,
    "n9L": -1,
    "n11L": -1,
    "n13L": 6
}, {
    "rootNoteLocation": 10,
    "chordKey": "maj7#11",
    "cnName": "\u5927\u4E03\u5347\u5341\u4E00",
    "type": "chord7alt",
    "orderedNotesLocationList": [2, 4, 5, 9, 10],
    "notesLocationList": [10, 2, 5, 9, 4],
    "n3L": 2,
    "n5L": 5,
    "n7L": 9,
    "n9L": -1,
    "n11L": 4,
    "n13L": -1
}, {
    "rootNoteLocation": 10,
    "chordKey": "min7#5",
    "cnName": "\u5C0F\u4E03\u5347\u4E94",
    "type": "chord7alt",
    "orderedNotesLocationList": [1, 6, 8, 10],
    "notesLocationList": [10, 1, 6, 8],
    "n3L": 1,
    "n5L": 6,
    "n7L": 8,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 10,
    "chordKey": "minmaj7b5",
    "cnName": "\u5C0F\u5927\u4E03\u964D\u4E94",
    "type": "chord7alt",
    "orderedNotesLocationList": [1, 4, 9, 10],
    "notesLocationList": [10, 1, 4, 9],
    "n3L": 1,
    "n5L": 4,
    "n7L": 9,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 10,
    "chordKey": "minmaj7#5",
    "cnName": "\u5C0F\u5927\u4E03\u5347\u4E94",
    "type": "chord7alt",
    "orderedNotesLocationList": [1, 6, 9, 10],
    "notesLocationList": [10, 1, 6, 9],
    "n3L": 1,
    "n5L": 6,
    "n7L": 9,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 10,
    "chordKey": "dom7#5b9",
    "cnName": "\u589E\u4E03\u964D\u4E5D\uFF08\u5C5E\u4E03\u5347\u4E94\u964D\u4E5D\uFF09",
    "type": "chord7alt",
    "orderedNotesLocationList": [2, 6, 8, 10, 11],
    "notesLocationList": [10, 2, 6, 8, 11],
    "n3L": 2,
    "n5L": 6,
    "n7L": 8,
    "n9L": 11,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 10,
    "chordKey": "dom7#5#9",
    "cnName": "\u589E\u4E03\u5347\u4E5D\uFF08\u5C5E\u4E03\u5347\u4E94\u5347\u4E5D\uFF09",
    "type": "chord7alt",
    "orderedNotesLocationList": [1, 2, 6, 8, 10],
    "notesLocationList": [10, 2, 6, 8, 1],
    "n3L": 2,
    "n5L": 6,
    "n7L": 8,
    "n9L": 1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 10,
    "chordKey": "sus2",
    "cnName": "\u6302\u4E8C",
    "type": "sus",
    "orderedNotesLocationList": [0, 5, 10],
    "notesLocationList": [10, 0, 5],
    "n3L": -1,
    "n5L": 5,
    "n7L": -1,
    "n9L": 0,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 10,
    "chordKey": "sus4",
    "cnName": "\u6302\u56DB",
    "type": "sus",
    "orderedNotesLocationList": [3, 5, 10],
    "notesLocationList": [10, 3, 5],
    "n3L": -1,
    "n5L": 5,
    "n7L": -1,
    "n9L": -1,
    "n11L": 3,
    "n13L": -1
}, {
    "rootNoteLocation": 10,
    "chordKey": "dom7sus2",
    "cnName": "\u5C5E\u4E03\u6302\u4E8C",
    "type": "sus",
    "orderedNotesLocationList": [0, 5, 8, 10],
    "notesLocationList": [10, 0, 5, 8],
    "n3L": -1,
    "n5L": 5,
    "n7L": 8,
    "n9L": 0,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 10,
    "chordKey": "dom7sus4",
    "cnName": "\u5C5E\u4E03\u6302\u56DB",
    "type": "sus",
    "orderedNotesLocationList": [3, 5, 8, 10],
    "notesLocationList": [10, 3, 5, 8],
    "n3L": -1,
    "n5L": 5,
    "n7L": 8,
    "n9L": -1,
    "n11L": 3,
    "n13L": -1
}, {
    "rootNoteLocation": 10,
    "chordKey": "maj7sus2",
    "cnName": "\u5927\u4E03\u6302\u4E8C",
    "type": "sus",
    "orderedNotesLocationList": [0, 5, 9, 10],
    "notesLocationList": [10, 0, 5, 9],
    "n3L": -1,
    "n5L": 5,
    "n7L": 9,
    "n9L": 0,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 10,
    "chordKey": "maj7sus4",
    "cnName": "\u5927\u4E03\u6302\u56DB",
    "type": "sus",
    "orderedNotesLocationList": [3, 5, 9, 10],
    "notesLocationList": [10, 3, 5, 9],
    "n3L": -1,
    "n5L": 5,
    "n7L": 9,
    "n9L": -1,
    "n11L": 3,
    "n13L": -1
}, {
    "rootNoteLocation": 10,
    "chordKey": "dom9sus4",
    "cnName": "\u5C5E\u4E5D\u6302\u56DB",
    "type": "sus",
    "orderedNotesLocationList": [0, 3, 5, 8, 10],
    "notesLocationList": [10, 3, 5, 8, 0],
    "n3L": -1,
    "n5L": 5,
    "n7L": 8,
    "n9L": 0,
    "n11L": 3,
    "n13L": -1
}, {
    "rootNoteLocation": 10,
    "chordKey": "maj9sus4",
    "cnName": "\u5927\u4E5D\u6302\u56DB",
    "type": "sus",
    "orderedNotesLocationList": [0, 3, 5, 9, 10],
    "notesLocationList": [10, 3, 5, 9, 0],
    "n3L": -1,
    "n5L": 5,
    "n7L": 9,
    "n9L": 0,
    "n11L": 3,
    "n13L": -1
}, {
    "rootNoteLocation": 10,
    "chordKey": "dom13sus4",
    "cnName": "\u5C5E\u5341\u4E09\u6302\u56DB",
    "type": "sus",
    "orderedNotesLocationList": [0, 3, 5, 7, 8, 10],
    "notesLocationList": [10, 3, 5, 8, 0, 7],
    "n3L": -1,
    "n5L": 5,
    "n7L": 8,
    "n9L": 0,
    "n11L": 3,
    "n13L": 7
}, {
    "rootNoteLocation": 10,
    "chordKey": "maj13sus4",
    "cnName": "\u5927\u5341\u4E09\u6302\u56DB",
    "type": "sus",
    "orderedNotesLocationList": [0, 3, 5, 7, 9, 10],
    "notesLocationList": [10, 3, 5, 9, 0, 7],
    "n3L": -1,
    "n5L": 5,
    "n7L": 9,
    "n9L": 0,
    "n11L": 3,
    "n13L": 7
}, {
    "rootNoteLocation": 10,
    "chordKey": "maj13sus2",
    "cnName": "\u5927\u5341\u4E09\u6302\u4E8C",
    "type": "sus",
    "orderedNotesLocationList": [0, 5, 7, 9, 10],
    "notesLocationList": [10, 0, 5, 9, 7],
    "n3L": -1,
    "n5L": 5,
    "n7L": 9,
    "n9L": 0,
    "n11L": -1,
    "n13L": 7
}, {
    "rootNoteLocation": 10,
    "chordKey": "maj9",
    "cnName": "\u5927\u4E5D",
    "type": "chord9",
    "orderedNotesLocationList": [0, 2, 5, 9, 10],
    "notesLocationList": [10, 2, 5, 9, 0],
    "n3L": 2,
    "n5L": 5,
    "n7L": 9,
    "n9L": 0,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 10,
    "chordKey": "dom9",
    "cnName": "\u5C5E\u4E5D",
    "type": "chord9",
    "orderedNotesLocationList": [0, 2, 5, 8, 10],
    "notesLocationList": [10, 2, 5, 8, 0],
    "n3L": 2,
    "n5L": 5,
    "n7L": 8,
    "n9L": 0,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 10,
    "chordKey": "min9",
    "cnName": "\u5C0F\u4E5D",
    "type": "chord9",
    "orderedNotesLocationList": [0, 1, 5, 8, 10],
    "notesLocationList": [10, 1, 5, 8, 0],
    "n3L": 1,
    "n5L": 5,
    "n7L": 8,
    "n9L": 0,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 10,
    "chordKey": "minmaj9",
    "cnName": "\u5C0F\u5927\u4E5D",
    "type": "chord9",
    "orderedNotesLocationList": [0, 1, 5, 9, 10],
    "notesLocationList": [10, 1, 5, 9, 0],
    "n3L": 1,
    "n5L": 5,
    "n7L": 9,
    "n9L": 0,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 10,
    "chordKey": "dom9#5",
    "cnName": "\u589E\u4E5D\uFF08\u5C5E\u4E5D\u5347\u4E94\uFF09",
    "type": "chord9",
    "orderedNotesLocationList": [0, 2, 6, 8, 10],
    "notesLocationList": [10, 2, 6, 8, 0],
    "n3L": 2,
    "n5L": 6,
    "n7L": 8,
    "n9L": 0,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 10,
    "chordKey": "dom9b9",
    "cnName": "\u5C5E\u4E5D\u964D\u4E5D",
    "type": "chord9",
    "orderedNotesLocationList": [2, 5, 8, 10, 11],
    "notesLocationList": [10, 2, 5, 8, 11],
    "n3L": 2,
    "n5L": 5,
    "n7L": 8,
    "n9L": 11,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 10,
    "chordKey": "dom9b11",
    "cnName": "\u5C5E\u4E5D\u964D\u5341\u4E00",
    "type": "chord9",
    "orderedNotesLocationList": [0, 2, 2, 5, 8, 10],
    "notesLocationList": [10, 2, 5, 8, 0, 2],
    "n3L": 2,
    "n5L": 5,
    "n7L": 8,
    "n9L": 0,
    "n11L": 2,
    "n13L": -1
}, {
    "rootNoteLocation": 10,
    "chordKey": "dom9#11",
    "cnName": "\u5C5E\u4E5D\u5347\u5341\u4E00",
    "type": "chord9",
    "orderedNotesLocationList": [0, 2, 4, 5, 8, 10],
    "notesLocationList": [10, 2, 5, 8, 0, 4],
    "n3L": 2,
    "n5L": 5,
    "n7L": 8,
    "n9L": 0,
    "n11L": 4,
    "n13L": -1
}, {
    "rootNoteLocation": 10,
    "chordKey": "dom9b13",
    "cnName": "\u5C5E\u4E5D\u964D\u5341\u4E09",
    "type": "chord9",
    "orderedNotesLocationList": [0, 2, 5, 6, 8, 10],
    "notesLocationList": [10, 2, 5, 8, 0, 6],
    "n3L": 2,
    "n5L": 5,
    "n7L": 8,
    "n9L": 0,
    "n11L": -1,
    "n13L": 6
}, {
    "rootNoteLocation": 10,
    "chordKey": "maj9b5",
    "cnName": "\u5927\u4E5D\u964D\u4E94",
    "type": "chord9",
    "orderedNotesLocationList": [0, 2, 4, 9, 10],
    "notesLocationList": [10, 2, 4, 9, 0],
    "n3L": 2,
    "n5L": 4,
    "n7L": 9,
    "n9L": 0,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 10,
    "chordKey": "maj9#5",
    "cnName": "\u5927\u4E5D\u5347\u4E94",
    "type": "chord9",
    "orderedNotesLocationList": [0, 2, 6, 9, 10],
    "notesLocationList": [10, 2, 6, 9, 0],
    "n3L": 2,
    "n5L": 6,
    "n7L": 9,
    "n9L": 0,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 10,
    "chordKey": "maj9#11",
    "cnName": "\u5927\u4E5D\u5347\u5341\u4E00",
    "type": "chord9",
    "orderedNotesLocationList": [0, 2, 4, 5, 9, 10],
    "notesLocationList": [10, 2, 5, 9, 0, 4],
    "n3L": 2,
    "n5L": 5,
    "n7L": 9,
    "n9L": 0,
    "n11L": 4,
    "n13L": -1
}, {
    "rootNoteLocation": 10,
    "chordKey": "maj9b13",
    "cnName": "\u5927\u4E5D\u964D\u5341\u4E09",
    "type": "chord9",
    "orderedNotesLocationList": [0, 2, 4, 6, 9, 10],
    "notesLocationList": [10, 2, 4, 9, 0, 6],
    "n3L": 2,
    "n5L": 4,
    "n7L": 9,
    "n9L": 0,
    "n11L": -1,
    "n13L": 6
}, {
    "rootNoteLocation": 10,
    "chordKey": "min9b5",
    "cnName": "\u5C0F\u4E5D\u964D\u4E94",
    "type": "chord9",
    "orderedNotesLocationList": [0, 1, 4, 8, 10],
    "notesLocationList": [10, 1, 4, 8, 0],
    "n3L": 1,
    "n5L": 4,
    "n7L": 8,
    "n9L": 0,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 10,
    "chordKey": "min9b9",
    "cnName": "\u5C0F\u4E5D\u964D\u4E5D",
    "type": "chord9",
    "orderedNotesLocationList": [1, 5, 8, 10, 11],
    "notesLocationList": [10, 1, 5, 8, 11],
    "n3L": 1,
    "n5L": 5,
    "n7L": 8,
    "n9L": 11,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 10,
    "chordKey": "maj11",
    "cnName": "\u5927\u5341\u4E00",
    "type": "chord11",
    "orderedNotesLocationList": [0, 2, 3, 5, 9, 10],
    "notesLocationList": [10, 2, 5, 9, 0, 3],
    "n3L": 2,
    "n5L": 5,
    "n7L": 9,
    "n9L": 0,
    "n11L": 3,
    "n13L": -1
}, {
    "rootNoteLocation": 10,
    "chordKey": "dom11",
    "cnName": "\u5C5E\u5341\u4E00",
    "type": "chord11",
    "orderedNotesLocationList": [0, 2, 3, 5, 8, 10],
    "notesLocationList": [10, 2, 5, 8, 0, 3],
    "n3L": 2,
    "n5L": 5,
    "n7L": 8,
    "n9L": 0,
    "n11L": 3,
    "n13L": -1
}, {
    "rootNoteLocation": 10,
    "chordKey": "min11",
    "cnName": "\u5C0F\u5341\u4E00",
    "type": "chord11",
    "orderedNotesLocationList": [0, 1, 3, 5, 8, 10],
    "notesLocationList": [10, 1, 5, 8, 0, 3],
    "n3L": 1,
    "n5L": 5,
    "n7L": 8,
    "n9L": 0,
    "n11L": 3,
    "n13L": -1
}, {
    "rootNoteLocation": 10,
    "chordKey": "minmaj11",
    "cnName": "\u5C0F\u5927\u5341\u4E00",
    "type": "chord11",
    "orderedNotesLocationList": [0, 1, 3, 5, 9, 10],
    "notesLocationList": [10, 1, 5, 9, 0, 3],
    "n3L": 1,
    "n5L": 5,
    "n7L": 9,
    "n9L": 0,
    "n11L": 3,
    "n13L": -1
}, {
    "rootNoteLocation": 10,
    "chordKey": "dom11b5",
    "cnName": "\u5C5E\u5341\u4E00\u964D\u4E94",
    "type": "chord11",
    "orderedNotesLocationList": [0, 2, 3, 4, 8, 10],
    "notesLocationList": [10, 2, 4, 8, 0, 3],
    "n3L": 2,
    "n5L": 4,
    "n7L": 8,
    "n9L": 0,
    "n11L": 3,
    "n13L": -1
}, {
    "rootNoteLocation": 10,
    "chordKey": "dom11#5",
    "cnName": "\u5C5E\u5341\u4E00\u5347\u4E94",
    "type": "chord11",
    "orderedNotesLocationList": [0, 2, 3, 6, 8, 10],
    "notesLocationList": [10, 2, 6, 8, 0, 3],
    "n3L": 2,
    "n5L": 6,
    "n7L": 8,
    "n9L": 0,
    "n11L": 3,
    "n13L": -1
}, {
    "rootNoteLocation": 10,
    "chordKey": "dom11b9",
    "cnName": "\u5C5E\u5341\u4E00\u964D\u4E5D",
    "type": "chord11",
    "orderedNotesLocationList": [2, 3, 5, 8, 10, 11],
    "notesLocationList": [10, 2, 5, 8, 11, 3],
    "n3L": 2,
    "n5L": 5,
    "n7L": 8,
    "n9L": 11,
    "n11L": 3,
    "n13L": -1
}, {
    "rootNoteLocation": 10,
    "chordKey": "dom11#9",
    "cnName": "\u5C5E\u5341\u4E00\u5347\u4E5D",
    "type": "chord11",
    "orderedNotesLocationList": [1, 2, 3, 5, 8, 10],
    "notesLocationList": [10, 2, 5, 8, 1, 3],
    "n3L": 2,
    "n5L": 5,
    "n7L": 8,
    "n9L": 1,
    "n11L": 3,
    "n13L": -1
}, {
    "rootNoteLocation": 10,
    "chordKey": "dom11b13",
    "cnName": "\u5C5E\u5341\u4E00\u964D\u5341\u4E09",
    "type": "chord11",
    "orderedNotesLocationList": [0, 2, 3, 5, 6, 8, 10],
    "notesLocationList": [10, 2, 5, 8, 0, 3, 6],
    "n3L": 2,
    "n5L": 5,
    "n7L": 8,
    "n9L": 0,
    "n11L": 3,
    "n13L": 6
}, {
    "rootNoteLocation": 10,
    "chordKey": "min11b5",
    "cnName": "\u5C0F\u5341\u4E00\u964D\u4E94",
    "type": "chord11",
    "orderedNotesLocationList": [0, 1, 3, 4, 8, 10],
    "notesLocationList": [10, 1, 4, 8, 0, 3],
    "n3L": 1,
    "n5L": 4,
    "n7L": 8,
    "n9L": 0,
    "n11L": 3,
    "n13L": -1
}, {
    "rootNoteLocation": 10,
    "chordKey": "maj13",
    "cnName": "\u5927\u5341\u4E09",
    "type": "chord13",
    "orderedNotesLocationList": [0, 2, 3, 5, 7, 9, 10],
    "notesLocationList": [10, 2, 5, 9, 0, 3, 7],
    "n3L": 2,
    "n5L": 5,
    "n7L": 9,
    "n9L": 0,
    "n11L": 3,
    "n13L": 7
}, {
    "rootNoteLocation": 10,
    "chordKey": "dom13",
    "cnName": "\u5C5E\u5341\u4E09",
    "type": "chord13",
    "orderedNotesLocationList": [0, 2, 3, 5, 7, 8, 10],
    "notesLocationList": [10, 2, 5, 8, 0, 3, 7],
    "n3L": 2,
    "n5L": 5,
    "n7L": 8,
    "n9L": 0,
    "n11L": 3,
    "n13L": 7
}, {
    "rootNoteLocation": 10,
    "chordKey": "min13",
    "cnName": "\u5C0F\u5341\u4E09",
    "type": "chord13",
    "orderedNotesLocationList": [0, 1, 3, 5, 7, 8, 10],
    "notesLocationList": [10, 1, 5, 8, 0, 3, 7],
    "n3L": 1,
    "n5L": 5,
    "n7L": 8,
    "n9L": 0,
    "n11L": 3,
    "n13L": 7
}, {
    "rootNoteLocation": 10,
    "chordKey": "minmaj13",
    "cnName": "\u5C0F\u5927\u5341\u4E09",
    "type": "chord13",
    "orderedNotesLocationList": [0, 1, 3, 5, 7, 9, 10],
    "notesLocationList": [10, 1, 5, 9, 0, 3, 7],
    "n3L": 1,
    "n5L": 5,
    "n7L": 9,
    "n9L": 0,
    "n11L": 3,
    "n13L": 7
}, {
    "rootNoteLocation": 10,
    "chordKey": "dom13b5",
    "cnName": "\u5C5E\u5341\u4E09\u964D\u4E94",
    "type": "chord13",
    "orderedNotesLocationList": [0, 2, 3, 4, 7, 8, 10],
    "notesLocationList": [10, 2, 4, 8, 0, 3, 7],
    "n3L": 2,
    "n5L": 4,
    "n7L": 8,
    "n9L": 0,
    "n11L": 3,
    "n13L": 7
}, {
    "rootNoteLocation": 10,
    "chordKey": "dom13#5",
    "cnName": "\u5C5E\u5341\u4E09\u5347\u4E94",
    "type": "chord13",
    "orderedNotesLocationList": [0, 2, 3, 6, 7, 8, 10],
    "notesLocationList": [10, 2, 6, 8, 0, 3, 7],
    "n3L": 2,
    "n5L": 6,
    "n7L": 8,
    "n9L": 0,
    "n11L": 3,
    "n13L": 7
}, {
    "rootNoteLocation": 10,
    "chordKey": "dom13b9",
    "cnName": "\u5C5E\u5341\u4E09\u964D\u4E5D",
    "type": "chord13",
    "orderedNotesLocationList": [2, 3, 5, 7, 8, 10, 11],
    "notesLocationList": [10, 2, 5, 8, 11, 3, 7],
    "n3L": 2,
    "n5L": 5,
    "n7L": 8,
    "n9L": 11,
    "n11L": 3,
    "n13L": 7
}, {
    "rootNoteLocation": 10,
    "chordKey": "dom13#9",
    "cnName": "\u5C5E\u5341\u4E09\u5347\u4E5D",
    "type": "chord13",
    "orderedNotesLocationList": [1, 2, 5, 7, 8, 10],
    "notesLocationList": [10, 2, 5, 8, 1, 7],
    "n3L": 2,
    "n5L": 5,
    "n7L": 8,
    "n9L": 1,
    "n11L": -1,
    "n13L": 7
}, {
    "rootNoteLocation": 10,
    "chordKey": "dom13#11",
    "cnName": "\u5C5E\u5341\u4E09\u5347\u5341\u4E00",
    "type": "chord13",
    "orderedNotesLocationList": [0, 2, 4, 5, 7, 8, 10],
    "notesLocationList": [10, 2, 5, 8, 0, 4, 7],
    "n3L": 2,
    "n5L": 5,
    "n7L": 8,
    "n9L": 0,
    "n11L": 4,
    "n13L": 7
}, {
    "rootNoteLocation": 10,
    "chordKey": "maj13b5",
    "cnName": "\u5927\u5341\u4E09\u964D\u4E94",
    "type": "chord13",
    "orderedNotesLocationList": [0, 2, 4, 7, 9, 10],
    "notesLocationList": [10, 2, 4, 9, 0, 7],
    "n3L": 2,
    "n5L": 4,
    "n7L": 9,
    "n9L": 0,
    "n11L": -1,
    "n13L": 7
}, {
    "rootNoteLocation": 10,
    "chordKey": "maj13#5",
    "cnName": "\u5927\u5341\u4E09\u5347\u4E94",
    "type": "chord13",
    "orderedNotesLocationList": [0, 2, 6, 7, 9, 10],
    "notesLocationList": [10, 2, 6, 9, 0, 7],
    "n3L": 2,
    "n5L": 6,
    "n7L": 9,
    "n9L": 0,
    "n11L": -1,
    "n13L": 7
}, {
    "rootNoteLocation": 10,
    "chordKey": "maj13b9",
    "cnName": "\u5927\u5341\u4E09\u964D\u4E5D",
    "type": "chord13",
    "orderedNotesLocationList": [2, 5, 7, 9, 10, 11],
    "notesLocationList": [10, 2, 5, 9, 11, 7],
    "n3L": 2,
    "n5L": 5,
    "n7L": 9,
    "n9L": 11,
    "n11L": -1,
    "n13L": 7
}, {
    "rootNoteLocation": 10,
    "chordKey": "maj13#11",
    "cnName": "\u5927\u5341\u4E09\u5347\u5341\u4E00",
    "type": "chord13",
    "orderedNotesLocationList": [0, 2, 4, 5, 7, 9, 10],
    "notesLocationList": [10, 2, 5, 9, 0, 4, 7],
    "n3L": 2,
    "n5L": 5,
    "n7L": 9,
    "n9L": 0,
    "n11L": 4,
    "n13L": 7
}, {
    "rootNoteLocation": 11,
    "chordKey": "maj3",
    "cnName": "\u5927\u4E09",
    "type": "chord3",
    "orderedNotesLocationList": [3, 6, 11],
    "notesLocationList": [11, 3, 6],
    "n3L": 3,
    "n5L": 6,
    "n7L": -1,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 11,
    "chordKey": "min3",
    "cnName": "\u5C0F\u4E09",
    "type": "chord3",
    "orderedNotesLocationList": [2, 6, 11],
    "notesLocationList": [11, 2, 6],
    "n3L": 2,
    "n5L": 6,
    "n7L": -1,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 11,
    "chordKey": "dim3",
    "cnName": "\u51CF\u4E09",
    "type": "chord3",
    "orderedNotesLocationList": [2, 5, 11],
    "notesLocationList": [11, 2, 5],
    "n3L": 2,
    "n5L": 5,
    "n7L": -1,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 11,
    "chordKey": "aug3",
    "cnName": "\u589E\u4E09",
    "type": "chord3",
    "orderedNotesLocationList": [3, 7, 11],
    "notesLocationList": [11, 3, 7],
    "n3L": 3,
    "n5L": 7,
    "n7L": -1,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 11,
    "chordKey": "maj3b5",
    "cnName": "\u5927\u4E09\u51CF\u4E94",
    "type": "chord3",
    "orderedNotesLocationList": [3, 5, 11],
    "notesLocationList": [11, 3, 5],
    "n3L": 3,
    "n5L": 5,
    "n7L": -1,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 11,
    "chordKey": "maj3add6",
    "cnName": "\u5927\u516D\uFF08\u5927\u4E09\u52A0\u5341\u4E09\u97F3\uFF09",
    "type": "add",
    "orderedNotesLocationList": [3, 6, 8, 11],
    "notesLocationList": [11, 3, 6, 8],
    "n3L": 3,
    "n5L": 6,
    "n7L": -1,
    "n9L": -1,
    "n11L": -1,
    "n13L": 8
}, {
    "rootNoteLocation": 11,
    "chordKey": "min3add6",
    "cnName": "\u5C0F\u516D\uFF08\u5C0F\u4E09\u52A0\u5341\u4E09\u97F3\uFF09",
    "type": "add",
    "orderedNotesLocationList": [2, 6, 7, 11],
    "notesLocationList": [11, 2, 6, 7],
    "n3L": 2,
    "n5L": 6,
    "n7L": -1,
    "n9L": -1,
    "n11L": -1,
    "n13L": 7
}, {
    "rootNoteLocation": 11,
    "chordKey": "maj3add6add9",
    "cnName": "\u516D\u4E5D",
    "type": "add",
    "orderedNotesLocationList": [1, 3, 6, 8, 11],
    "notesLocationList": [11, 3, 6, 8, 1],
    "n3L": 3,
    "n5L": 6,
    "n7L": -1,
    "n9L": 1,
    "n11L": -1,
    "n13L": 8
}, {
    "rootNoteLocation": 11,
    "chordKey": "min3add6add9",
    "cnName": "\u5C0F\u516D\u4E5D",
    "type": "add",
    "orderedNotesLocationList": [1, 2, 6, 8, 11],
    "notesLocationList": [11, 2, 6, 8, 1],
    "n3L": 2,
    "n5L": 6,
    "n7L": -1,
    "n9L": 1,
    "n11L": -1,
    "n13L": 8
}, {
    "rootNoteLocation": 11,
    "chordKey": "maj3add9",
    "cnName": "\u5927\u4E09\u52A0\u4E5D\u97F3\uFF08\u4E8C\u97F3\uFF09",
    "type": "add",
    "orderedNotesLocationList": [1, 3, 6, 11],
    "notesLocationList": [11, 3, 6, 1],
    "n3L": 3,
    "n5L": 6,
    "n7L": -1,
    "n9L": 1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 11,
    "chordKey": "maj3add11",
    "cnName": "\u5927\u4E09\u52A0\u5341\u4E00\u97F3\uFF08\u56DB\u97F3\uFF09",
    "type": "add",
    "orderedNotesLocationList": [3, 4, 6, 11],
    "notesLocationList": [11, 3, 6, 4],
    "n3L": 3,
    "n5L": 6,
    "n7L": -1,
    "n9L": -1,
    "n11L": 4,
    "n13L": -1
}, {
    "rootNoteLocation": 11,
    "chordKey": "min3add9",
    "cnName": "\u5C0F\u4E09\u52A0\u4E5D\u97F3\uFF08\u4E8C\u97F3\uFF09",
    "type": "add",
    "orderedNotesLocationList": [1, 2, 6, 11],
    "notesLocationList": [11, 2, 6, 1],
    "n3L": 2,
    "n5L": 6,
    "n7L": -1,
    "n9L": 1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 11,
    "chordKey": "min3add11",
    "cnName": "\u5C0F\u4E09\u52A0\u5341\u4E00\u97F3\uFF08\u56DB\u97F3\uFF09",
    "type": "add",
    "orderedNotesLocationList": [2, 4, 6, 11],
    "notesLocationList": [11, 2, 6, 4],
    "n3L": 2,
    "n5L": 6,
    "n7L": -1,
    "n9L": -1,
    "n11L": 4,
    "n13L": -1
}, {
    "rootNoteLocation": 11,
    "chordKey": "maj7add11",
    "cnName": "\u5927\u4E03\u52A0\u5341\u4E00\u97F3\uFF08\u56DB\u97F3\uFF09",
    "type": "add",
    "orderedNotesLocationList": [3, 4, 6, 10, 11],
    "notesLocationList": [11, 3, 6, 10, 4],
    "n3L": 3,
    "n5L": 6,
    "n7L": 10,
    "n9L": -1,
    "n11L": 4,
    "n13L": -1
}, {
    "rootNoteLocation": 11,
    "chordKey": "dom7add6",
    "cnName": "\u5C5E\u4E03\u52A0\u516D\u97F3",
    "type": "add",
    "orderedNotesLocationList": [3, 6, 8, 9, 11],
    "notesLocationList": [11, 3, 6, 8, 9],
    "n3L": 3,
    "n5L": 6,
    "n7L": 9,
    "n9L": -1,
    "n11L": -1,
    "n13L": 8
}, {
    "rootNoteLocation": 11,
    "chordKey": "itaug6",
    "cnName": "\u610F\u5927\u5229\u589E\u516D",
    "type": "aug6",
    "orderedNotesLocationList": [5, 7, 11],
    "notesLocationList": [11, 5, 7],
    "n3L": -1,
    "n5L": -1,
    "n7L": -1,
    "n9L": -1,
    "n11L": 5,
    "n13L": 7
}, {
    "rootNoteLocation": 11,
    "chordKey": "fraug6",
    "cnName": "\u6CD5\u56FD\u589E\u516D",
    "type": "aug6",
    "orderedNotesLocationList": [1, 5, 7, 11],
    "notesLocationList": [11, 1, 5, 7],
    "n3L": -1,
    "n5L": -1,
    "n7L": -1,
    "n9L": 1,
    "n11L": 5,
    "n13L": 7
}, {
    "rootNoteLocation": 11,
    "chordKey": "graug6",
    "cnName": "\u5FB7\u56FD\u589E\u516D",
    "type": "aug6",
    "orderedNotesLocationList": [2, 5, 7, 11],
    "notesLocationList": [11, 2, 5, 7],
    "n3L": 2,
    "n5L": -1,
    "n7L": -1,
    "n9L": -1,
    "n11L": 5,
    "n13L": 7
}, {
    "rootNoteLocation": 11,
    "chordKey": "maj7",
    "cnName": "\u5927\u4E03",
    "type": "chord7",
    "orderedNotesLocationList": [3, 6, 10, 11],
    "notesLocationList": [11, 3, 6, 10],
    "n3L": 3,
    "n5L": 6,
    "n7L": 10,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 11,
    "chordKey": "dom7",
    "cnName": "\u5C5E\u4E03",
    "type": "chord7",
    "orderedNotesLocationList": [3, 6, 9, 11],
    "notesLocationList": [11, 3, 6, 9],
    "n3L": 3,
    "n5L": 6,
    "n7L": 9,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 11,
    "chordKey": "min7",
    "cnName": "\u5C0F\u4E03",
    "type": "chord7",
    "orderedNotesLocationList": [2, 6, 9, 11],
    "notesLocationList": [11, 2, 6, 9],
    "n3L": 2,
    "n5L": 6,
    "n7L": 9,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 11,
    "chordKey": "halfdim7",
    "cnName": "\u534A\u51CF\u4E03",
    "type": "chord7",
    "orderedNotesLocationList": [2, 5, 9, 11],
    "notesLocationList": [11, 2, 5, 9],
    "n3L": 2,
    "n5L": 5,
    "n7L": 9,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 11,
    "chordKey": "dim7",
    "cnName": "\u51CF\u4E03",
    "type": "chord7",
    "orderedNotesLocationList": [2, 5, 8, 11],
    "notesLocationList": [11, 2, 5, 8],
    "n3L": 2,
    "n5L": 5,
    "n7L": 8,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 11,
    "chordKey": "minmaj7",
    "cnName": "\u5C0F\u5927\u4E03",
    "type": "chord7",
    "orderedNotesLocationList": [2, 6, 10, 11],
    "notesLocationList": [11, 2, 6, 10],
    "n3L": 2,
    "n5L": 6,
    "n7L": 10,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 11,
    "chordKey": "dom7#5",
    "cnName": "\u589E\u4E03\uFF08\u5C5E\u4E03\u5347\u4E94\uFF09",
    "type": "chord7",
    "orderedNotesLocationList": [3, 7, 9, 11],
    "notesLocationList": [11, 3, 7, 9],
    "n3L": 3,
    "n5L": 7,
    "n7L": 9,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 11,
    "chordKey": "augmaj7",
    "cnName": "\u589E\u5927\u4E03",
    "type": "chord7",
    "orderedNotesLocationList": [3, 7, 10, 11],
    "notesLocationList": [11, 3, 7, 10],
    "n3L": 3,
    "n5L": 7,
    "n7L": 10,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 11,
    "chordKey": "dom7b5",
    "cnName": "\u5C5E\u4E03\u964D\u4E94",
    "type": "chord7alt",
    "orderedNotesLocationList": [3, 5, 9, 11],
    "notesLocationList": [11, 3, 5, 9],
    "n3L": 3,
    "n5L": 5,
    "n7L": 9,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 11,
    "chordKey": "dom7b9",
    "cnName": "\u5C5E\u4E03\u964D\u4E5D",
    "type": "chord7alt",
    "orderedNotesLocationList": [0, 3, 6, 9, 11],
    "notesLocationList": [11, 3, 6, 9, 0],
    "n3L": 3,
    "n5L": 6,
    "n7L": 9,
    "n9L": 0,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 11,
    "chordKey": "dom7#9",
    "cnName": "\u5C5E\u4E03\u5347\u4E5D",
    "type": "chord7alt",
    "orderedNotesLocationList": [2, 3, 6, 9, 11],
    "notesLocationList": [11, 3, 6, 9, 2],
    "n3L": 3,
    "n5L": 6,
    "n7L": 9,
    "n9L": 2,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 11,
    "chordKey": "dom7#11",
    "cnName": "\u5C5E\u4E03\u5347\u5341\u4E00",
    "type": "chord7alt",
    "orderedNotesLocationList": [3, 5, 6, 9, 11],
    "notesLocationList": [11, 3, 6, 9, 5],
    "n3L": 3,
    "n5L": 6,
    "n7L": 9,
    "n9L": -1,
    "n11L": 5,
    "n13L": -1
}, {
    "rootNoteLocation": 11,
    "chordKey": "dom7b13",
    "cnName": "\u5C5E\u4E03\u964D\u5341\u4E09",
    "type": "chord7alt",
    "orderedNotesLocationList": [3, 6, 7, 9, 11],
    "notesLocationList": [11, 3, 6, 9, 7],
    "n3L": 3,
    "n5L": 6,
    "n7L": 9,
    "n9L": -1,
    "n11L": -1,
    "n13L": 7
}, {
    "rootNoteLocation": 11,
    "chordKey": "dom7b5b9",
    "cnName": "\u5C5E\u4E03\u964D\u4E94\u964D\u4E5D",
    "type": "chord7alt",
    "orderedNotesLocationList": [0, 3, 5, 9, 11],
    "notesLocationList": [11, 3, 5, 9, 0],
    "n3L": 3,
    "n5L": 5,
    "n7L": 9,
    "n9L": 0,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 11,
    "chordKey": "dom7b5#9",
    "cnName": "\u5C5E\u4E03\u964D\u4E94\u5347\u4E5D",
    "type": "chord7alt",
    "orderedNotesLocationList": [2, 3, 5, 9, 11],
    "notesLocationList": [11, 3, 5, 9, 2],
    "n3L": 3,
    "n5L": 5,
    "n7L": 9,
    "n9L": 2,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 11,
    "chordKey": "maj7b5",
    "cnName": "\u5927\u4E03\u964D\u4E94",
    "type": "chord7alt",
    "orderedNotesLocationList": [3, 5, 10, 11],
    "notesLocationList": [11, 3, 5, 10],
    "n3L": 3,
    "n5L": 5,
    "n7L": 10,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 11,
    "chordKey": "maj7#5",
    "cnName": "\u5927\u4E03\u589E\u4E94",
    "type": "chord7alt",
    "orderedNotesLocationList": [3, 7, 10, 11],
    "notesLocationList": [11, 3, 7, 10],
    "n3L": 3,
    "n5L": 7,
    "n7L": 10,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 11,
    "chordKey": "maj7b9",
    "cnName": "\u5927\u4E03\u964D\u4E5D",
    "type": "chord7alt",
    "orderedNotesLocationList": [0, 3, 6, 10, 11],
    "notesLocationList": [11, 3, 6, 10, 0],
    "n3L": 3,
    "n5L": 6,
    "n7L": 10,
    "n9L": 0,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 11,
    "chordKey": "maj7b13",
    "cnName": "\u5927\u4E03\u964D\u5341\u4E09",
    "type": "chord7alt",
    "orderedNotesLocationList": [3, 6, 7, 10, 11],
    "notesLocationList": [11, 3, 6, 10, 7],
    "n3L": 3,
    "n5L": 6,
    "n7L": 10,
    "n9L": -1,
    "n11L": -1,
    "n13L": 7
}, {
    "rootNoteLocation": 11,
    "chordKey": "maj7#11",
    "cnName": "\u5927\u4E03\u5347\u5341\u4E00",
    "type": "chord7alt",
    "orderedNotesLocationList": [3, 5, 6, 10, 11],
    "notesLocationList": [11, 3, 6, 10, 5],
    "n3L": 3,
    "n5L": 6,
    "n7L": 10,
    "n9L": -1,
    "n11L": 5,
    "n13L": -1
}, {
    "rootNoteLocation": 11,
    "chordKey": "min7#5",
    "cnName": "\u5C0F\u4E03\u5347\u4E94",
    "type": "chord7alt",
    "orderedNotesLocationList": [2, 7, 9, 11],
    "notesLocationList": [11, 2, 7, 9],
    "n3L": 2,
    "n5L": 7,
    "n7L": 9,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 11,
    "chordKey": "minmaj7b5",
    "cnName": "\u5C0F\u5927\u4E03\u964D\u4E94",
    "type": "chord7alt",
    "orderedNotesLocationList": [2, 5, 10, 11],
    "notesLocationList": [11, 2, 5, 10],
    "n3L": 2,
    "n5L": 5,
    "n7L": 10,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 11,
    "chordKey": "minmaj7#5",
    "cnName": "\u5C0F\u5927\u4E03\u5347\u4E94",
    "type": "chord7alt",
    "orderedNotesLocationList": [2, 7, 10, 11],
    "notesLocationList": [11, 2, 7, 10],
    "n3L": 2,
    "n5L": 7,
    "n7L": 10,
    "n9L": -1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 11,
    "chordKey": "dom7#5b9",
    "cnName": "\u589E\u4E03\u964D\u4E5D\uFF08\u5C5E\u4E03\u5347\u4E94\u964D\u4E5D\uFF09",
    "type": "chord7alt",
    "orderedNotesLocationList": [0, 3, 7, 9, 11],
    "notesLocationList": [11, 3, 7, 9, 0],
    "n3L": 3,
    "n5L": 7,
    "n7L": 9,
    "n9L": 0,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 11,
    "chordKey": "dom7#5#9",
    "cnName": "\u589E\u4E03\u5347\u4E5D\uFF08\u5C5E\u4E03\u5347\u4E94\u5347\u4E5D\uFF09",
    "type": "chord7alt",
    "orderedNotesLocationList": [2, 3, 7, 9, 11],
    "notesLocationList": [11, 3, 7, 9, 2],
    "n3L": 3,
    "n5L": 7,
    "n7L": 9,
    "n9L": 2,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 11,
    "chordKey": "sus2",
    "cnName": "\u6302\u4E8C",
    "type": "sus",
    "orderedNotesLocationList": [1, 6, 11],
    "notesLocationList": [11, 1, 6],
    "n3L": -1,
    "n5L": 6,
    "n7L": -1,
    "n9L": 1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 11,
    "chordKey": "sus4",
    "cnName": "\u6302\u56DB",
    "type": "sus",
    "orderedNotesLocationList": [4, 6, 11],
    "notesLocationList": [11, 4, 6],
    "n3L": -1,
    "n5L": 6,
    "n7L": -1,
    "n9L": -1,
    "n11L": 4,
    "n13L": -1
}, {
    "rootNoteLocation": 11,
    "chordKey": "dom7sus2",
    "cnName": "\u5C5E\u4E03\u6302\u4E8C",
    "type": "sus",
    "orderedNotesLocationList": [1, 6, 9, 11],
    "notesLocationList": [11, 1, 6, 9],
    "n3L": -1,
    "n5L": 6,
    "n7L": 9,
    "n9L": 1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 11,
    "chordKey": "dom7sus4",
    "cnName": "\u5C5E\u4E03\u6302\u56DB",
    "type": "sus",
    "orderedNotesLocationList": [4, 6, 9, 11],
    "notesLocationList": [11, 4, 6, 9],
    "n3L": -1,
    "n5L": 6,
    "n7L": 9,
    "n9L": -1,
    "n11L": 4,
    "n13L": -1
}, {
    "rootNoteLocation": 11,
    "chordKey": "maj7sus2",
    "cnName": "\u5927\u4E03\u6302\u4E8C",
    "type": "sus",
    "orderedNotesLocationList": [1, 6, 10, 11],
    "notesLocationList": [11, 1, 6, 10],
    "n3L": -1,
    "n5L": 6,
    "n7L": 10,
    "n9L": 1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 11,
    "chordKey": "maj7sus4",
    "cnName": "\u5927\u4E03\u6302\u56DB",
    "type": "sus",
    "orderedNotesLocationList": [4, 6, 10, 11],
    "notesLocationList": [11, 4, 6, 10],
    "n3L": -1,
    "n5L": 6,
    "n7L": 10,
    "n9L": -1,
    "n11L": 4,
    "n13L": -1
}, {
    "rootNoteLocation": 11,
    "chordKey": "dom9sus4",
    "cnName": "\u5C5E\u4E5D\u6302\u56DB",
    "type": "sus",
    "orderedNotesLocationList": [1, 4, 6, 9, 11],
    "notesLocationList": [11, 4, 6, 9, 1],
    "n3L": -1,
    "n5L": 6,
    "n7L": 9,
    "n9L": 1,
    "n11L": 4,
    "n13L": -1
}, {
    "rootNoteLocation": 11,
    "chordKey": "maj9sus4",
    "cnName": "\u5927\u4E5D\u6302\u56DB",
    "type": "sus",
    "orderedNotesLocationList": [1, 4, 6, 10, 11],
    "notesLocationList": [11, 4, 6, 10, 1],
    "n3L": -1,
    "n5L": 6,
    "n7L": 10,
    "n9L": 1,
    "n11L": 4,
    "n13L": -1
}, {
    "rootNoteLocation": 11,
    "chordKey": "dom13sus4",
    "cnName": "\u5C5E\u5341\u4E09\u6302\u56DB",
    "type": "sus",
    "orderedNotesLocationList": [1, 4, 6, 8, 9, 11],
    "notesLocationList": [11, 4, 6, 9, 1, 8],
    "n3L": -1,
    "n5L": 6,
    "n7L": 9,
    "n9L": 1,
    "n11L": 4,
    "n13L": 8
}, {
    "rootNoteLocation": 11,
    "chordKey": "maj13sus4",
    "cnName": "\u5927\u5341\u4E09\u6302\u56DB",
    "type": "sus",
    "orderedNotesLocationList": [1, 4, 6, 8, 10, 11],
    "notesLocationList": [11, 4, 6, 10, 1, 8],
    "n3L": -1,
    "n5L": 6,
    "n7L": 10,
    "n9L": 1,
    "n11L": 4,
    "n13L": 8
}, {
    "rootNoteLocation": 11,
    "chordKey": "maj13sus2",
    "cnName": "\u5927\u5341\u4E09\u6302\u4E8C",
    "type": "sus",
    "orderedNotesLocationList": [1, 6, 8, 10, 11],
    "notesLocationList": [11, 1, 6, 10, 8],
    "n3L": -1,
    "n5L": 6,
    "n7L": 10,
    "n9L": 1,
    "n11L": -1,
    "n13L": 8
}, {
    "rootNoteLocation": 11,
    "chordKey": "maj9",
    "cnName": "\u5927\u4E5D",
    "type": "chord9",
    "orderedNotesLocationList": [1, 3, 6, 10, 11],
    "notesLocationList": [11, 3, 6, 10, 1],
    "n3L": 3,
    "n5L": 6,
    "n7L": 10,
    "n9L": 1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 11,
    "chordKey": "dom9",
    "cnName": "\u5C5E\u4E5D",
    "type": "chord9",
    "orderedNotesLocationList": [1, 3, 6, 9, 11],
    "notesLocationList": [11, 3, 6, 9, 1],
    "n3L": 3,
    "n5L": 6,
    "n7L": 9,
    "n9L": 1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 11,
    "chordKey": "min9",
    "cnName": "\u5C0F\u4E5D",
    "type": "chord9",
    "orderedNotesLocationList": [1, 2, 6, 9, 11],
    "notesLocationList": [11, 2, 6, 9, 1],
    "n3L": 2,
    "n5L": 6,
    "n7L": 9,
    "n9L": 1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 11,
    "chordKey": "minmaj9",
    "cnName": "\u5C0F\u5927\u4E5D",
    "type": "chord9",
    "orderedNotesLocationList": [1, 2, 6, 10, 11],
    "notesLocationList": [11, 2, 6, 10, 1],
    "n3L": 2,
    "n5L": 6,
    "n7L": 10,
    "n9L": 1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 11,
    "chordKey": "dom9#5",
    "cnName": "\u589E\u4E5D\uFF08\u5C5E\u4E5D\u5347\u4E94\uFF09",
    "type": "chord9",
    "orderedNotesLocationList": [1, 3, 7, 9, 11],
    "notesLocationList": [11, 3, 7, 9, 1],
    "n3L": 3,
    "n5L": 7,
    "n7L": 9,
    "n9L": 1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 11,
    "chordKey": "dom9b9",
    "cnName": "\u5C5E\u4E5D\u964D\u4E5D",
    "type": "chord9",
    "orderedNotesLocationList": [0, 3, 6, 9, 11],
    "notesLocationList": [11, 3, 6, 9, 0],
    "n3L": 3,
    "n5L": 6,
    "n7L": 9,
    "n9L": 0,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 11,
    "chordKey": "dom9b11",
    "cnName": "\u5C5E\u4E5D\u964D\u5341\u4E00",
    "type": "chord9",
    "orderedNotesLocationList": [1, 3, 3, 6, 9, 11],
    "notesLocationList": [11, 3, 6, 9, 1, 3],
    "n3L": 3,
    "n5L": 6,
    "n7L": 9,
    "n9L": 1,
    "n11L": 3,
    "n13L": -1
}, {
    "rootNoteLocation": 11,
    "chordKey": "dom9#11",
    "cnName": "\u5C5E\u4E5D\u5347\u5341\u4E00",
    "type": "chord9",
    "orderedNotesLocationList": [1, 3, 5, 6, 9, 11],
    "notesLocationList": [11, 3, 6, 9, 1, 5],
    "n3L": 3,
    "n5L": 6,
    "n7L": 9,
    "n9L": 1,
    "n11L": 5,
    "n13L": -1
}, {
    "rootNoteLocation": 11,
    "chordKey": "dom9b13",
    "cnName": "\u5C5E\u4E5D\u964D\u5341\u4E09",
    "type": "chord9",
    "orderedNotesLocationList": [1, 3, 6, 7, 9, 11],
    "notesLocationList": [11, 3, 6, 9, 1, 7],
    "n3L": 3,
    "n5L": 6,
    "n7L": 9,
    "n9L": 1,
    "n11L": -1,
    "n13L": 7
}, {
    "rootNoteLocation": 11,
    "chordKey": "maj9b5",
    "cnName": "\u5927\u4E5D\u964D\u4E94",
    "type": "chord9",
    "orderedNotesLocationList": [1, 3, 5, 10, 11],
    "notesLocationList": [11, 3, 5, 10, 1],
    "n3L": 3,
    "n5L": 5,
    "n7L": 10,
    "n9L": 1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 11,
    "chordKey": "maj9#5",
    "cnName": "\u5927\u4E5D\u5347\u4E94",
    "type": "chord9",
    "orderedNotesLocationList": [1, 3, 7, 10, 11],
    "notesLocationList": [11, 3, 7, 10, 1],
    "n3L": 3,
    "n5L": 7,
    "n7L": 10,
    "n9L": 1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 11,
    "chordKey": "maj9#11",
    "cnName": "\u5927\u4E5D\u5347\u5341\u4E00",
    "type": "chord9",
    "orderedNotesLocationList": [1, 3, 5, 6, 10, 11],
    "notesLocationList": [11, 3, 6, 10, 1, 5],
    "n3L": 3,
    "n5L": 6,
    "n7L": 10,
    "n9L": 1,
    "n11L": 5,
    "n13L": -1
}, {
    "rootNoteLocation": 11,
    "chordKey": "maj9b13",
    "cnName": "\u5927\u4E5D\u964D\u5341\u4E09",
    "type": "chord9",
    "orderedNotesLocationList": [1, 3, 5, 7, 10, 11],
    "notesLocationList": [11, 3, 5, 10, 1, 7],
    "n3L": 3,
    "n5L": 5,
    "n7L": 10,
    "n9L": 1,
    "n11L": -1,
    "n13L": 7
}, {
    "rootNoteLocation": 11,
    "chordKey": "min9b5",
    "cnName": "\u5C0F\u4E5D\u964D\u4E94",
    "type": "chord9",
    "orderedNotesLocationList": [1, 2, 5, 9, 11],
    "notesLocationList": [11, 2, 5, 9, 1],
    "n3L": 2,
    "n5L": 5,
    "n7L": 9,
    "n9L": 1,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 11,
    "chordKey": "min9b9",
    "cnName": "\u5C0F\u4E5D\u964D\u4E5D",
    "type": "chord9",
    "orderedNotesLocationList": [0, 2, 6, 9, 11],
    "notesLocationList": [11, 2, 6, 9, 0],
    "n3L": 2,
    "n5L": 6,
    "n7L": 9,
    "n9L": 0,
    "n11L": -1,
    "n13L": -1
}, {
    "rootNoteLocation": 11,
    "chordKey": "maj11",
    "cnName": "\u5927\u5341\u4E00",
    "type": "chord11",
    "orderedNotesLocationList": [1, 3, 4, 6, 10, 11],
    "notesLocationList": [11, 3, 6, 10, 1, 4],
    "n3L": 3,
    "n5L": 6,
    "n7L": 10,
    "n9L": 1,
    "n11L": 4,
    "n13L": -1
}, {
    "rootNoteLocation": 11,
    "chordKey": "dom11",
    "cnName": "\u5C5E\u5341\u4E00",
    "type": "chord11",
    "orderedNotesLocationList": [1, 3, 4, 6, 9, 11],
    "notesLocationList": [11, 3, 6, 9, 1, 4],
    "n3L": 3,
    "n5L": 6,
    "n7L": 9,
    "n9L": 1,
    "n11L": 4,
    "n13L": -1
}, {
    "rootNoteLocation": 11,
    "chordKey": "min11",
    "cnName": "\u5C0F\u5341\u4E00",
    "type": "chord11",
    "orderedNotesLocationList": [1, 2, 4, 6, 9, 11],
    "notesLocationList": [11, 2, 6, 9, 1, 4],
    "n3L": 2,
    "n5L": 6,
    "n7L": 9,
    "n9L": 1,
    "n11L": 4,
    "n13L": -1
}, {
    "rootNoteLocation": 11,
    "chordKey": "minmaj11",
    "cnName": "\u5C0F\u5927\u5341\u4E00",
    "type": "chord11",
    "orderedNotesLocationList": [1, 2, 4, 6, 10, 11],
    "notesLocationList": [11, 2, 6, 10, 1, 4],
    "n3L": 2,
    "n5L": 6,
    "n7L": 10,
    "n9L": 1,
    "n11L": 4,
    "n13L": -1
}, {
    "rootNoteLocation": 11,
    "chordKey": "dom11b5",
    "cnName": "\u5C5E\u5341\u4E00\u964D\u4E94",
    "type": "chord11",
    "orderedNotesLocationList": [1, 3, 4, 5, 9, 11],
    "notesLocationList": [11, 3, 5, 9, 1, 4],
    "n3L": 3,
    "n5L": 5,
    "n7L": 9,
    "n9L": 1,
    "n11L": 4,
    "n13L": -1
}, {
    "rootNoteLocation": 11,
    "chordKey": "dom11#5",
    "cnName": "\u5C5E\u5341\u4E00\u5347\u4E94",
    "type": "chord11",
    "orderedNotesLocationList": [1, 3, 4, 7, 9, 11],
    "notesLocationList": [11, 3, 7, 9, 1, 4],
    "n3L": 3,
    "n5L": 7,
    "n7L": 9,
    "n9L": 1,
    "n11L": 4,
    "n13L": -1
}, {
    "rootNoteLocation": 11,
    "chordKey": "dom11b9",
    "cnName": "\u5C5E\u5341\u4E00\u964D\u4E5D",
    "type": "chord11",
    "orderedNotesLocationList": [0, 3, 4, 6, 9, 11],
    "notesLocationList": [11, 3, 6, 9, 0, 4],
    "n3L": 3,
    "n5L": 6,
    "n7L": 9,
    "n9L": 0,
    "n11L": 4,
    "n13L": -1
}, {
    "rootNoteLocation": 11,
    "chordKey": "dom11#9",
    "cnName": "\u5C5E\u5341\u4E00\u5347\u4E5D",
    "type": "chord11",
    "orderedNotesLocationList": [2, 3, 4, 6, 9, 11],
    "notesLocationList": [11, 3, 6, 9, 2, 4],
    "n3L": 3,
    "n5L": 6,
    "n7L": 9,
    "n9L": 2,
    "n11L": 4,
    "n13L": -1
}, {
    "rootNoteLocation": 11,
    "chordKey": "dom11b13",
    "cnName": "\u5C5E\u5341\u4E00\u964D\u5341\u4E09",
    "type": "chord11",
    "orderedNotesLocationList": [1, 3, 4, 6, 7, 9, 11],
    "notesLocationList": [11, 3, 6, 9, 1, 4, 7],
    "n3L": 3,
    "n5L": 6,
    "n7L": 9,
    "n9L": 1,
    "n11L": 4,
    "n13L": 7
}, {
    "rootNoteLocation": 11,
    "chordKey": "min11b5",
    "cnName": "\u5C0F\u5341\u4E00\u964D\u4E94",
    "type": "chord11",
    "orderedNotesLocationList": [1, 2, 4, 5, 9, 11],
    "notesLocationList": [11, 2, 5, 9, 1, 4],
    "n3L": 2,
    "n5L": 5,
    "n7L": 9,
    "n9L": 1,
    "n11L": 4,
    "n13L": -1
}, {
    "rootNoteLocation": 11,
    "chordKey": "maj13",
    "cnName": "\u5927\u5341\u4E09",
    "type": "chord13",
    "orderedNotesLocationList": [1, 3, 4, 6, 8, 10, 11],
    "notesLocationList": [11, 3, 6, 10, 1, 4, 8],
    "n3L": 3,
    "n5L": 6,
    "n7L": 10,
    "n9L": 1,
    "n11L": 4,
    "n13L": 8
}, {
    "rootNoteLocation": 11,
    "chordKey": "dom13",
    "cnName": "\u5C5E\u5341\u4E09",
    "type": "chord13",
    "orderedNotesLocationList": [1, 3, 4, 6, 8, 9, 11],
    "notesLocationList": [11, 3, 6, 9, 1, 4, 8],
    "n3L": 3,
    "n5L": 6,
    "n7L": 9,
    "n9L": 1,
    "n11L": 4,
    "n13L": 8
}, {
    "rootNoteLocation": 11,
    "chordKey": "min13",
    "cnName": "\u5C0F\u5341\u4E09",
    "type": "chord13",
    "orderedNotesLocationList": [1, 2, 4, 6, 8, 9, 11],
    "notesLocationList": [11, 2, 6, 9, 1, 4, 8],
    "n3L": 2,
    "n5L": 6,
    "n7L": 9,
    "n9L": 1,
    "n11L": 4,
    "n13L": 8
}, {
    "rootNoteLocation": 11,
    "chordKey": "minmaj13",
    "cnName": "\u5C0F\u5927\u5341\u4E09",
    "type": "chord13",
    "orderedNotesLocationList": [1, 2, 4, 6, 8, 10, 11],
    "notesLocationList": [11, 2, 6, 10, 1, 4, 8],
    "n3L": 2,
    "n5L": 6,
    "n7L": 10,
    "n9L": 1,
    "n11L": 4,
    "n13L": 8
}, {
    "rootNoteLocation": 11,
    "chordKey": "dom13b5",
    "cnName": "\u5C5E\u5341\u4E09\u964D\u4E94",
    "type": "chord13",
    "orderedNotesLocationList": [1, 3, 4, 5, 8, 9, 11],
    "notesLocationList": [11, 3, 5, 9, 1, 4, 8],
    "n3L": 3,
    "n5L": 5,
    "n7L": 9,
    "n9L": 1,
    "n11L": 4,
    "n13L": 8
}, {
    "rootNoteLocation": 11,
    "chordKey": "dom13#5",
    "cnName": "\u5C5E\u5341\u4E09\u5347\u4E94",
    "type": "chord13",
    "orderedNotesLocationList": [1, 3, 4, 7, 8, 9, 11],
    "notesLocationList": [11, 3, 7, 9, 1, 4, 8],
    "n3L": 3,
    "n5L": 7,
    "n7L": 9,
    "n9L": 1,
    "n11L": 4,
    "n13L": 8
}, {
    "rootNoteLocation": 11,
    "chordKey": "dom13b9",
    "cnName": "\u5C5E\u5341\u4E09\u964D\u4E5D",
    "type": "chord13",
    "orderedNotesLocationList": [0, 3, 4, 6, 8, 9, 11],
    "notesLocationList": [11, 3, 6, 9, 0, 4, 8],
    "n3L": 3,
    "n5L": 6,
    "n7L": 9,
    "n9L": 0,
    "n11L": 4,
    "n13L": 8
}, {
    "rootNoteLocation": 11,
    "chordKey": "dom13#9",
    "cnName": "\u5C5E\u5341\u4E09\u5347\u4E5D",
    "type": "chord13",
    "orderedNotesLocationList": [2, 3, 6, 8, 9, 11],
    "notesLocationList": [11, 3, 6, 9, 2, 8],
    "n3L": 3,
    "n5L": 6,
    "n7L": 9,
    "n9L": 2,
    "n11L": -1,
    "n13L": 8
}, {
    "rootNoteLocation": 11,
    "chordKey": "dom13#11",
    "cnName": "\u5C5E\u5341\u4E09\u5347\u5341\u4E00",
    "type": "chord13",
    "orderedNotesLocationList": [1, 3, 5, 6, 8, 9, 11],
    "notesLocationList": [11, 3, 6, 9, 1, 5, 8],
    "n3L": 3,
    "n5L": 6,
    "n7L": 9,
    "n9L": 1,
    "n11L": 5,
    "n13L": 8
}, {
    "rootNoteLocation": 11,
    "chordKey": "maj13b5",
    "cnName": "\u5927\u5341\u4E09\u964D\u4E94",
    "type": "chord13",
    "orderedNotesLocationList": [1, 3, 5, 8, 10, 11],
    "notesLocationList": [11, 3, 5, 10, 1, 8],
    "n3L": 3,
    "n5L": 5,
    "n7L": 10,
    "n9L": 1,
    "n11L": -1,
    "n13L": 8
}, {
    "rootNoteLocation": 11,
    "chordKey": "maj13#5",
    "cnName": "\u5927\u5341\u4E09\u5347\u4E94",
    "type": "chord13",
    "orderedNotesLocationList": [1, 3, 7, 8, 10, 11],
    "notesLocationList": [11, 3, 7, 10, 1, 8],
    "n3L": 3,
    "n5L": 7,
    "n7L": 10,
    "n9L": 1,
    "n11L": -1,
    "n13L": 8
}, {
    "rootNoteLocation": 11,
    "chordKey": "maj13b9",
    "cnName": "\u5927\u5341\u4E09\u964D\u4E5D",
    "type": "chord13",
    "orderedNotesLocationList": [0, 3, 6, 8, 10, 11],
    "notesLocationList": [11, 3, 6, 10, 0, 8],
    "n3L": 3,
    "n5L": 6,
    "n7L": 10,
    "n9L": 0,
    "n11L": -1,
    "n13L": 8
}, {
    "rootNoteLocation": 11,
    "chordKey": "maj13#11",
    "cnName": "\u5927\u5341\u4E09\u5347\u5341\u4E00",
    "type": "chord13",
    "orderedNotesLocationList": [1, 3, 5, 6, 8, 10, 11],
    "notesLocationList": [11, 3, 6, 10, 1, 5, 8],
    "n3L": 3,
    "n5L": 6,
    "n7L": 10,
    "n9L": 1,
    "n11L": 5,
    "n13L": 8
}];
const cls_findOneChordInScale = (notesList, scaleDegree, isChord3) => {
    const scaleRadix = new ScaleRadix(scaleDegree);
    let selectedDegreeList = [
        scaleRadix.scaleDegree,
        scaleRadix.add(2).scaleDegree,
        scaleRadix.add(4).scaleDegree
    ];
    if (!isChord3)
        selectedDegreeList = [...selectedDegreeList, scaleRadix.add(6).scaleDegree];
    const notesLocationList = selectedDegreeList.map((x) => {
        return notesList[x - 1].locationId;
    });
    const findObj = collect(findChordMeta).filter((x) => {
        return isEqual(x.notesLocationList, notesLocationList);
    }).first();
    if (isEmpty(findObj))
        throw new ChordError(`No such chord.`);
    return findObj.chordKey;
};
const cls_findDegreeChordInScale = (notesList, isChord3) => {
    if (notesList && notesList.length !== 7)
        throw new ScaleError("This function only support the scale containing 7 notes.");
    return range(7).map((x) => cls_findOneChordInScale(notesList, x + 1, isChord3));
};
const chordMeta = [
    {
        "type": "chord3",
        "cnName": "\u5927\u4E09",
        "chordKey": "maj3",
        "scoreDisplay": "",
        "intervalList": [["maj", 3], ["p", 5]],
        "notesNum": 3,
        "semitoneLocationList": [4, 7],
        "orderedSemitoneLocationList": [4, 7]
    },
    {
        "type": "chord3",
        "cnName": "\u5C0F\u4E09",
        "chordKey": "min3",
        "scoreDisplay": "m",
        "intervalList": [["min", 3], ["p", 5]],
        "notesNum": 3,
        "semitoneLocationList": [3, 7],
        "orderedSemitoneLocationList": [3, 7]
    },
    {
        "type": "chord3",
        "cnName": "\u51CF\u4E09",
        "chordKey": "dim3",
        "scoreDisplay": "\xB0",
        "intervalList": [["min", 3], ["dim", 5]],
        "notesNum": 3,
        "semitoneLocationList": [3, 6],
        "orderedSemitoneLocationList": [3, 6]
    },
    {
        "type": "chord3",
        "cnName": "\u589E\u4E09",
        "chordKey": "aug3",
        "scoreDisplay": "+",
        "intervalList": [["maj", 3], ["aug", 5]],
        "notesNum": 3,
        "semitoneLocationList": [4, 8],
        "orderedSemitoneLocationList": [4, 8]
    },
    {
        "type": "chord3",
        "cnName": "\u5927\u4E09\u51CF\u4E94",
        "chordKey": "maj3b5",
        "scoreDisplay": -5,
        "intervalList": [["maj", 3], ["dim", 5]],
        "notesNum": 3,
        "semitoneLocationList": [4, 6],
        "orderedSemitoneLocationList": [4, 6]
    },
    {
        "type": "add",
        "cnName": "\u5927\u516D\uFF08\u5927\u4E09\u52A0\u5341\u4E09\u97F3\uFF09",
        "chordKey": "maj3add6",
        "scoreDisplay": 6,
        "intervalList": [["maj", 3], ["p", 5], ["maj", 6]],
        "notesNum": 4,
        "semitoneLocationList": [4, 7, 9],
        "orderedSemitoneLocationList": [4, 7, 9]
    },
    {
        "type": "add",
        "cnName": "\u5C0F\u516D\uFF08\u5C0F\u4E09\u52A0\u5341\u4E09\u97F3\uFF09",
        "chordKey": "min3add6",
        "scoreDisplay": "m6",
        "intervalList": [["min", 3], ["p", 5], ["min", 6]],
        "notesNum": 4,
        "semitoneLocationList": [3, 7, 8],
        "orderedSemitoneLocationList": [3, 7, 8]
    },
    {
        "type": "add",
        "cnName": "\u516D\u4E5D",
        "chordKey": "maj3add6add9",
        "scoreDisplay": "6/9",
        "intervalList": [["maj", 3], ["p", 5], ["maj", 6], ["maj", 9]],
        "notesNum": 5,
        "semitoneLocationList": [4, 7, 9, 2],
        "orderedSemitoneLocationList": [2, 4, 7, 9]
    },
    {
        "type": "add",
        "cnName": "\u5C0F\u516D\u4E5D",
        "chordKey": "min3add6add9",
        "scoreDisplay": "m6/9",
        "intervalList": [["min", 3], ["p", 5], ["maj", 6], ["maj", 9]],
        "notesNum": 5,
        "semitoneLocationList": [3, 7, 9, 2],
        "orderedSemitoneLocationList": [2, 3, 7, 9]
    },
    {
        "type": "add",
        "cnName": "\u5927\u4E09\u52A0\u4E5D\u97F3\uFF08\u4E8C\u97F3\uFF09",
        "chordKey": "maj3add9",
        "scoreDisplay": "add9",
        "intervalList": [["maj", 3], ["p", 5], ["maj", 9]],
        "notesNum": 4,
        "semitoneLocationList": [4, 7, 2],
        "orderedSemitoneLocationList": [2, 4, 7]
    },
    {
        "type": "add",
        "cnName": "\u5927\u4E09\u52A0\u5341\u4E00\u97F3\uFF08\u56DB\u97F3\uFF09",
        "chordKey": "maj3add11",
        "scoreDisplay": "add11",
        "intervalList": [["maj", 3], ["p", 5], ["p", 11]],
        "notesNum": 4,
        "semitoneLocationList": [4, 7, 5],
        "orderedSemitoneLocationList": [4, 5, 7]
    },
    {
        "type": "add",
        "cnName": "\u5C0F\u4E09\u52A0\u4E5D\u97F3\uFF08\u4E8C\u97F3\uFF09",
        "chordKey": "min3add9",
        "scoreDisplay": "madd9",
        "intervalList": [["min", 3], ["p", 5], ["maj", 9]],
        "notesNum": 4,
        "semitoneLocationList": [3, 7, 2],
        "orderedSemitoneLocationList": [2, 3, 7]
    },
    {
        "type": "add",
        "cnName": "\u5C0F\u4E09\u52A0\u5341\u4E00\u97F3\uFF08\u56DB\u97F3\uFF09",
        "chordKey": "min3add11",
        "scoreDisplay": "madd11",
        "intervalList": [["min", 3], ["p", 5], ["p", 11]],
        "notesNum": 4,
        "semitoneLocationList": [3, 7, 5],
        "orderedSemitoneLocationList": [3, 5, 7]
    },
    {
        "type": "add",
        "cnName": "\u5927\u4E03\u52A0\u5341\u4E00\u97F3\uFF08\u56DB\u97F3\uFF09",
        "chordKey": "maj7add11",
        "scoreDisplay": "M7add11",
        "intervalList": [["maj", 3], ["p", 5], ["maj", 7], ["p", 11]],
        "notesNum": 5,
        "semitoneLocationList": [4, 7, 11, 5],
        "orderedSemitoneLocationList": [4, 5, 7, 11]
    },
    {
        "type": "add",
        "cnName": "\u5C5E\u4E03\u52A0\u516D\u97F3",
        "chordKey": "dom7add6",
        "scoreDisplay": "7/6",
        "intervalList": [["maj", 3], ["p", 5], ["maj", 6], ["min", 7]],
        "notesNum": 5,
        "semitoneLocationList": [4, 7, 9, 10],
        "orderedSemitoneLocationList": [4, 7, 9, 10]
    },
    {
        "type": "aug6",
        "cnName": "\u610F\u5927\u5229\u589E\u516D",
        "chordKey": "itaug6",
        "scoreDisplay": "It+6",
        "intervalList": [["aug", 4], ["min", 6]],
        "notesNum": 3,
        "semitoneLocationList": [6, 8],
        "orderedSemitoneLocationList": [6, 8]
    },
    {
        "type": "aug6",
        "cnName": "\u6CD5\u56FD\u589E\u516D",
        "chordKey": "fraug6",
        "scoreDisplay": "Fr+6",
        "intervalList": [["maj", 2], ["aug", 4], ["min", 6]],
        "notesNum": 4,
        "semitoneLocationList": [2, 6, 8],
        "orderedSemitoneLocationList": [2, 6, 8]
    },
    {
        "type": "aug6",
        "cnName": "\u5FB7\u56FD\u589E\u516D",
        "chordKey": "graug6",
        "scoreDisplay": "Gr+6",
        "intervalList": [["min", 3], ["aug", 4], ["min", 6]],
        "notesNum": 4,
        "semitoneLocationList": [3, 6, 8],
        "orderedSemitoneLocationList": [3, 6, 8]
    },
    {
        "type": "chord7",
        "cnName": "\u5927\u4E03",
        "chordKey": "maj7",
        "scoreDisplay": "M7",
        "intervalList": [["maj", 3], ["p", 5], ["maj", 7]],
        "notesNum": 4,
        "semitoneLocationList": [4, 7, 11],
        "orderedSemitoneLocationList": [4, 7, 11]
    },
    {
        "type": "chord7",
        "cnName": "\u5C5E\u4E03",
        "chordKey": "dom7",
        "scoreDisplay": 7,
        "intervalList": [["maj", 3], ["p", 5], ["min", 7]],
        "notesNum": 4,
        "semitoneLocationList": [4, 7, 10],
        "orderedSemitoneLocationList": [4, 7, 10]
    },
    {
        "type": "chord7",
        "cnName": "\u5C0F\u4E03",
        "chordKey": "min7",
        "scoreDisplay": "m7",
        "intervalList": [["min", 3], ["p", 5], ["min", 7]],
        "notesNum": 4,
        "semitoneLocationList": [3, 7, 10],
        "orderedSemitoneLocationList": [3, 7, 10]
    },
    {
        "type": "chord7",
        "cnName": "\u534A\u51CF\u4E03",
        "chordKey": "halfdim7",
        "scoreDisplay": "\xF8",
        "intervalList": [["min", 3], ["dim", 5], ["min", 7]],
        "notesNum": 4,
        "semitoneLocationList": [3, 6, 10],
        "orderedSemitoneLocationList": [3, 6, 10]
    },
    {
        "type": "chord7",
        "cnName": "\u51CF\u4E03",
        "chordKey": "dim7",
        "scoreDisplay": "\xB07",
        "intervalList": [["min", 3], ["dim", 5], ["dim", 7]],
        "notesNum": 4,
        "semitoneLocationList": [3, 6, 9],
        "orderedSemitoneLocationList": [3, 6, 9]
    },
    {
        "type": "chord7",
        "cnName": "\u5C0F\u5927\u4E03",
        "chordKey": "minmaj7",
        "scoreDisplay": "mM7",
        "intervalList": [["min", 3], ["p", 5], ["maj", 7]],
        "notesNum": 4,
        "semitoneLocationList": [3, 7, 11],
        "orderedSemitoneLocationList": [3, 7, 11]
    },
    {
        "type": "chord7",
        "cnName": "\u589E\u4E03\uFF08\u5C5E\u4E03\u5347\u4E94\uFF09",
        "chordKey": "dom7#5",
        "scoreDisplay": "+7",
        "intervalList": [["maj", 3], ["aug", 5], ["min", 7]],
        "notesNum": 4,
        "semitoneLocationList": [4, 8, 10],
        "orderedSemitoneLocationList": [4, 8, 10]
    },
    {
        "type": "chord7",
        "cnName": "\u589E\u5927\u4E03",
        "chordKey": "augmaj7",
        "scoreDisplay": "+M7",
        "intervalList": [["maj", 3], ["aug", 5], ["maj", 7]],
        "notesNum": 4,
        "semitoneLocationList": [4, 8, 11],
        "orderedSemitoneLocationList": [4, 8, 11]
    },
    {
        "type": "chord7alt",
        "cnName": "\u5C5E\u4E03\u964D\u4E94",
        "chordKey": "dom7b5",
        "scoreDisplay": "7b5",
        "intervalList": [["maj", 3], ["dim", 5], ["min", 7]],
        "notesNum": 4,
        "semitoneLocationList": [4, 6, 10],
        "orderedSemitoneLocationList": [4, 6, 10]
    },
    {
        "type": "chord7alt",
        "cnName": "\u5C5E\u4E03\u964D\u4E5D",
        "chordKey": "dom7b9",
        "scoreDisplay": "7b9",
        "intervalList": [["maj", 3], ["p", 5], ["min", 7], ["min", 9]],
        "notesNum": 5,
        "semitoneLocationList": [4, 7, 10, 1],
        "orderedSemitoneLocationList": [1, 4, 7, 10]
    },
    {
        "type": "chord7alt",
        "cnName": "\u5C5E\u4E03\u5347\u4E5D",
        "chordKey": "dom7#9",
        "scoreDisplay": "7#9",
        "intervalList": [["maj", 3], ["p", 5], ["min", 7], ["aug", 9]],
        "notesNum": 5,
        "semitoneLocationList": [4, 7, 10, 3],
        "orderedSemitoneLocationList": [3, 4, 7, 10]
    },
    {
        "type": "chord7alt",
        "cnName": "\u5C5E\u4E03\u5347\u5341\u4E00",
        "chordKey": "dom7#11",
        "scoreDisplay": "7#11",
        "intervalList": [["maj", 3], ["p", 5], ["min", 7], ["aug", 11]],
        "notesNum": 5,
        "semitoneLocationList": [4, 7, 10, 6],
        "orderedSemitoneLocationList": [4, 6, 7, 10]
    },
    {
        "type": "chord7alt",
        "cnName": "\u5C5E\u4E03\u964D\u5341\u4E09",
        "chordKey": "dom7b13",
        "scoreDisplay": "7b13",
        "intervalList": [["maj", 3], ["p", 5], ["min", 7], ["min", 13]],
        "notesNum": 5,
        "semitoneLocationList": [4, 7, 10, 8],
        "orderedSemitoneLocationList": [4, 7, 8, 10]
    },
    {
        "type": "chord7alt",
        "cnName": "\u5C5E\u4E03\u964D\u4E94\u964D\u4E5D",
        "chordKey": "dom7b5b9",
        "scoreDisplay": "7b5b9",
        "intervalList": [["maj", 3], ["dim", 5], ["min", 7], ["min", 9]],
        "notesNum": 5,
        "semitoneLocationList": [4, 6, 10, 1],
        "orderedSemitoneLocationList": [1, 4, 6, 10]
    },
    {
        "type": "chord7alt",
        "cnName": "\u5C5E\u4E03\u964D\u4E94\u5347\u4E5D",
        "chordKey": "dom7b5#9",
        "scoreDisplay": "7b5#9",
        "intervalList": [["maj", 3], ["dim", 5], ["min", 7], ["aug", 9]],
        "notesNum": 5,
        "semitoneLocationList": [4, 6, 10, 3],
        "orderedSemitoneLocationList": [3, 4, 6, 10]
    },
    {
        "type": "chord7alt",
        "cnName": "\u5927\u4E03\u964D\u4E94",
        "chordKey": "maj7b5",
        "scoreDisplay": "M7b5",
        "intervalList": [["maj", 3], ["dim", 5], ["maj", 7]],
        "notesNum": 4,
        "semitoneLocationList": [4, 6, 11],
        "orderedSemitoneLocationList": [4, 6, 11]
    },
    {
        "type": "chord7alt",
        "cnName": "\u5927\u4E03\u589E\u4E94",
        "chordKey": "maj7#5",
        "scoreDisplay": "M7#5",
        "intervalList": [["maj", 3], ["aug", 5], ["maj", 7]],
        "notesNum": 4,
        "semitoneLocationList": [4, 8, 11],
        "orderedSemitoneLocationList": [4, 8, 11]
    },
    {
        "type": "chord7alt",
        "cnName": "\u5927\u4E03\u964D\u4E5D",
        "chordKey": "maj7b9",
        "scoreDisplay": "M7b9",
        "intervalList": [["maj", 3], ["p", 5], ["maj", 7], ["min", 9]],
        "notesNum": 5,
        "semitoneLocationList": [4, 7, 11, 1],
        "orderedSemitoneLocationList": [1, 4, 7, 11]
    },
    {
        "type": "chord7alt",
        "cnName": "\u5927\u4E03\u964D\u5341\u4E09",
        "chordKey": "maj7b13",
        "scoreDisplay": "M7b13",
        "intervalList": [["maj", 3], ["p", 5], ["maj", 7], ["min", 13]],
        "notesNum": 5,
        "semitoneLocationList": [4, 7, 11, 8],
        "orderedSemitoneLocationList": [4, 7, 8, 11]
    },
    {
        "type": "chord7alt",
        "cnName": "\u5927\u4E03\u5347\u5341\u4E00",
        "chordKey": "maj7#11",
        "scoreDisplay": "M7#11",
        "intervalList": [["maj", 3], ["p", 5], ["maj", 7], ["aug", 11]],
        "notesNum": 5,
        "semitoneLocationList": [4, 7, 11, 6],
        "orderedSemitoneLocationList": [4, 6, 7, 11]
    },
    {
        "type": "chord7alt",
        "cnName": "\u5C0F\u4E03\u5347\u4E94",
        "chordKey": "min7#5",
        "scoreDisplay": "m7#5",
        "intervalList": [["min", 3], ["aug", 5], ["min", 7]],
        "notesNum": 4,
        "semitoneLocationList": [3, 8, 10],
        "orderedSemitoneLocationList": [3, 8, 10]
    },
    {
        "type": "chord7alt",
        "cnName": "\u5C0F\u5927\u4E03\u964D\u4E94",
        "chordKey": "minmaj7b5",
        "scoreDisplay": "mM7b5",
        "intervalList": [["min", 3], ["dim", 5], ["maj", 7]],
        "notesNum": 4,
        "semitoneLocationList": [3, 6, 11],
        "orderedSemitoneLocationList": [3, 6, 11]
    },
    {
        "type": "chord7alt",
        "cnName": "\u5C0F\u5927\u4E03\u5347\u4E94",
        "chordKey": "minmaj7#5",
        "scoreDisplay": "mM7#5",
        "intervalList": [["min", 3], ["aug", 5], ["maj", 7]],
        "notesNum": 4,
        "semitoneLocationList": [3, 8, 11],
        "orderedSemitoneLocationList": [3, 8, 11]
    },
    {
        "type": "chord7alt",
        "cnName": "\u589E\u4E03\u964D\u4E5D\uFF08\u5C5E\u4E03\u5347\u4E94\u964D\u4E5D\uFF09",
        "chordKey": "dom7#5b9",
        "scoreDisplay": "+7b9",
        "intervalList": [["maj", 3], ["aug", 5], ["min", 7], ["min", 9]],
        "notesNum": 5,
        "semitoneLocationList": [4, 8, 10, 1],
        "orderedSemitoneLocationList": [1, 4, 8, 10]
    },
    {
        "type": "chord7alt",
        "cnName": "\u589E\u4E03\u5347\u4E5D\uFF08\u5C5E\u4E03\u5347\u4E94\u5347\u4E5D\uFF09",
        "chordKey": "dom7#5#9",
        "scoreDisplay": "+7#9",
        "intervalList": [["maj", 3], ["aug", 5], ["min", 7], ["aug", 9]],
        "notesNum": 5,
        "semitoneLocationList": [4, 8, 10, 3],
        "orderedSemitoneLocationList": [3, 4, 8, 10]
    },
    {
        "type": "sus",
        "cnName": "\u6302\u4E8C",
        "chordKey": "sus2",
        "scoreDisplay": "sus2",
        "intervalList": [["maj", 2], ["p", 5]],
        "notesNum": 3,
        "semitoneLocationList": [2, 7],
        "orderedSemitoneLocationList": [2, 7]
    },
    {
        "type": "sus",
        "cnName": "\u6302\u56DB",
        "chordKey": "sus4",
        "scoreDisplay": "sus4",
        "intervalList": [["p", 4], ["p", 5]],
        "notesNum": 3,
        "semitoneLocationList": [5, 7],
        "orderedSemitoneLocationList": [5, 7]
    },
    {
        "type": "sus",
        "cnName": "\u5C5E\u4E03\u6302\u4E8C",
        "chordKey": "dom7sus2",
        "scoreDisplay": "7sus2",
        "intervalList": [["maj", 2], ["p", 5], ["min", 7]],
        "notesNum": 4,
        "semitoneLocationList": [2, 7, 10],
        "orderedSemitoneLocationList": [2, 7, 10]
    },
    {
        "type": "sus",
        "cnName": "\u5C5E\u4E03\u6302\u56DB",
        "chordKey": "dom7sus4",
        "scoreDisplay": "7sus4",
        "intervalList": [["p", 4], ["p", 5], ["min", 7]],
        "notesNum": 4,
        "semitoneLocationList": [5, 7, 10],
        "orderedSemitoneLocationList": [5, 7, 10]
    },
    {
        "type": "sus",
        "cnName": "\u5927\u4E03\u6302\u4E8C",
        "chordKey": "maj7sus2",
        "scoreDisplay": "M7sus2",
        "intervalList": [["maj", 2], ["p", 5], ["maj", 7]],
        "notesNum": 4,
        "semitoneLocationList": [2, 7, 11],
        "orderedSemitoneLocationList": [2, 7, 11]
    },
    {
        "type": "sus",
        "cnName": "\u5927\u4E03\u6302\u56DB",
        "chordKey": "maj7sus4",
        "scoreDisplay": "M7sus4",
        "intervalList": [["p", 4], ["p", 5], ["maj", 7]],
        "notesNum": 4,
        "semitoneLocationList": [5, 7, 11],
        "orderedSemitoneLocationList": [5, 7, 11]
    },
    {
        "type": "sus",
        "cnName": "\u5C5E\u4E5D\u6302\u56DB",
        "chordKey": "dom9sus4",
        "scoreDisplay": "9sus4",
        "intervalList": [["p", 4], ["p", 5], ["min", 7], ["maj", 9]],
        "notesNum": 5,
        "semitoneLocationList": [5, 7, 10, 2],
        "orderedSemitoneLocationList": [2, 5, 7, 10]
    },
    {
        "type": "sus",
        "cnName": "\u5927\u4E5D\u6302\u56DB",
        "chordKey": "maj9sus4",
        "scoreDisplay": "M9sus4",
        "intervalList": [["p", 4], ["p", 5], ["maj", 7], ["maj", 9]],
        "notesNum": 5,
        "semitoneLocationList": [5, 7, 11, 2],
        "orderedSemitoneLocationList": [2, 5, 7, 11]
    },
    {
        "type": "sus",
        "cnName": "\u5C5E\u5341\u4E09\u6302\u56DB",
        "chordKey": "dom13sus4",
        "scoreDisplay": "13sus4",
        "intervalList": [["p", 4], ["p", 5], ["min", 7], ["maj", 9], ["maj", 13]],
        "notesNum": 6,
        "semitoneLocationList": [5, 7, 10, 2, 9],
        "orderedSemitoneLocationList": [2, 5, 7, 9, 10]
    },
    {
        "type": "sus",
        "cnName": "\u5927\u5341\u4E09\u6302\u56DB",
        "chordKey": "maj13sus4",
        "scoreDisplay": "M13sus4",
        "intervalList": [["p", 4], ["p", 5], ["maj", 7], ["maj", 9], ["maj", 13]],
        "notesNum": 6,
        "semitoneLocationList": [5, 7, 11, 2, 9],
        "orderedSemitoneLocationList": [2, 5, 7, 9, 11]
    },
    {
        "type": "sus",
        "cnName": "\u5927\u5341\u4E09\u6302\u4E8C",
        "chordKey": "maj13sus2",
        "scoreDisplay": "M13sus2",
        "intervalList": [["maj", 2], ["p", 5], ["maj", 7], ["maj", 13]],
        "notesNum": 5,
        "semitoneLocationList": [2, 7, 11, 9],
        "orderedSemitoneLocationList": [2, 7, 9, 11]
    },
    {
        "type": "chord9",
        "cnName": "\u5927\u4E5D",
        "chordKey": "maj9",
        "scoreDisplay": "M9",
        "intervalList": [["maj", 3], ["p", 5], ["maj", 7], ["maj", 9]],
        "notesNum": 5,
        "semitoneLocationList": [4, 7, 11, 2],
        "orderedSemitoneLocationList": [2, 4, 7, 11]
    },
    {
        "type": "chord9",
        "cnName": "\u5C5E\u4E5D",
        "chordKey": "dom9",
        "scoreDisplay": 9,
        "intervalList": [["maj", 3], ["p", 5], ["min", 7], ["maj", 9]],
        "notesNum": 5,
        "semitoneLocationList": [4, 7, 10, 2],
        "orderedSemitoneLocationList": [2, 4, 7, 10]
    },
    {
        "type": "chord9",
        "cnName": "\u5C0F\u4E5D",
        "chordKey": "min9",
        "scoreDisplay": "m9",
        "intervalList": [["min", 3], ["p", 5], ["min", 7], ["maj", 9]],
        "notesNum": 5,
        "semitoneLocationList": [3, 7, 10, 2],
        "orderedSemitoneLocationList": [2, 3, 7, 10]
    },
    {
        "type": "chord9",
        "cnName": "\u5C0F\u5927\u4E5D",
        "chordKey": "minmaj9",
        "scoreDisplay": "mM9",
        "intervalList": [["min", 3], ["p", 5], ["maj", 7], ["maj", 9]],
        "notesNum": 5,
        "semitoneLocationList": [3, 7, 11, 2],
        "orderedSemitoneLocationList": [2, 3, 7, 11]
    },
    {
        "type": "chord9",
        "cnName": "\u589E\u4E5D\uFF08\u5C5E\u4E5D\u5347\u4E94\uFF09",
        "chordKey": "dom9#5",
        "scoreDisplay": "+9",
        "intervalList": [["maj", 3], ["aug", 5], ["min", 7], ["maj", 9]],
        "notesNum": 5,
        "semitoneLocationList": [4, 8, 10, 2],
        "orderedSemitoneLocationList": [2, 4, 8, 10]
    },
    {
        "type": "chord9",
        "cnName": "\u5C5E\u4E5D\u964D\u4E5D",
        "chordKey": "dom9b9",
        "scoreDisplay": "9b9",
        "intervalList": [["maj", 3], ["p", 5], ["min", 7], ["min", 9]],
        "notesNum": 5,
        "semitoneLocationList": [4, 7, 10, 1],
        "orderedSemitoneLocationList": [1, 4, 7, 10]
    },
    {
        "type": "chord9",
        "cnName": "\u5C5E\u4E5D\u964D\u5341\u4E00",
        "chordKey": "dom9b11",
        "scoreDisplay": "9b11",
        "intervalList": [["maj", 3], ["p", 5], ["min", 7], ["maj", 9], ["dim", 11]],
        "notesNum": 6,
        "semitoneLocationList": [4, 7, 10, 2, 4],
        "orderedSemitoneLocationList": [2, 4, 4, 7, 10]
    },
    {
        "type": "chord9",
        "cnName": "\u5C5E\u4E5D\u5347\u5341\u4E00",
        "chordKey": "dom9#11",
        "scoreDisplay": "9#11",
        "intervalList": [["maj", 3], ["p", 5], ["min", 7], ["maj", 9], ["aug", 11]],
        "notesNum": 6,
        "semitoneLocationList": [4, 7, 10, 2, 6],
        "orderedSemitoneLocationList": [2, 4, 6, 7, 10]
    },
    {
        "type": "chord9",
        "cnName": "\u5C5E\u4E5D\u964D\u5341\u4E09",
        "chordKey": "dom9b13",
        "scoreDisplay": "9b13",
        "intervalList": [["maj", 3], ["p", 5], ["min", 7], ["maj", 9], ["min", 13]],
        "notesNum": 6,
        "semitoneLocationList": [4, 7, 10, 2, 8],
        "orderedSemitoneLocationList": [2, 4, 7, 8, 10]
    },
    {
        "type": "chord9",
        "cnName": "\u5927\u4E5D\u964D\u4E94",
        "chordKey": "maj9b5",
        "scoreDisplay": "M9b5",
        "intervalList": [["maj", 3], ["dim", 5], ["maj", 7], ["maj", 9]],
        "notesNum": 5,
        "semitoneLocationList": [4, 6, 11, 2],
        "orderedSemitoneLocationList": [2, 4, 6, 11]
    },
    {
        "type": "chord9",
        "cnName": "\u5927\u4E5D\u5347\u4E94",
        "chordKey": "maj9#5",
        "scoreDisplay": "M9#5",
        "intervalList": [["maj", 3], ["aug", 5], ["maj", 7], ["maj", 9]],
        "notesNum": 5,
        "semitoneLocationList": [4, 8, 11, 2],
        "orderedSemitoneLocationList": [2, 4, 8, 11]
    },
    {
        "type": "chord9",
        "cnName": "\u5927\u4E5D\u5347\u5341\u4E00",
        "chordKey": "maj9#11",
        "scoreDisplay": "M9#11",
        "intervalList": [["maj", 3], ["p", 5], ["maj", 7], ["maj", 9], ["aug", 11]],
        "notesNum": 6,
        "semitoneLocationList": [4, 7, 11, 2, 6],
        "orderedSemitoneLocationList": [2, 4, 6, 7, 11]
    },
    {
        "type": "chord9",
        "cnName": "\u5927\u4E5D\u964D\u5341\u4E09",
        "chordKey": "maj9b13",
        "scoreDisplay": "M9b13",
        "intervalList": [["maj", 3], ["dim", 5], ["maj", 7], ["maj", 9], ["min", 13]],
        "notesNum": 6,
        "semitoneLocationList": [4, 6, 11, 2, 8],
        "orderedSemitoneLocationList": [2, 4, 6, 8, 11]
    },
    {
        "type": "chord9",
        "cnName": "\u5C0F\u4E5D\u964D\u4E94",
        "chordKey": "min9b5",
        "scoreDisplay": "m9b5",
        "intervalList": [["min", 3], ["dim", 5], ["min", 7], ["maj", 9]],
        "notesNum": 5,
        "semitoneLocationList": [3, 6, 10, 2],
        "orderedSemitoneLocationList": [2, 3, 6, 10]
    },
    {
        "type": "chord9",
        "cnName": "\u5C0F\u4E5D\u964D\u4E5D",
        "chordKey": "min9b9",
        "scoreDisplay": "m9b9",
        "intervalList": [["min", 3], ["p", 5], ["min", 7], ["min", 9]],
        "notesNum": 5,
        "semitoneLocationList": [3, 7, 10, 1],
        "orderedSemitoneLocationList": [1, 3, 7, 10]
    },
    {
        "type": "chord11",
        "cnName": "\u5927\u5341\u4E00",
        "chordKey": "maj11",
        "scoreDisplay": "M11",
        "intervalList": [["maj", 3], ["p", 5], ["maj", 7], ["maj", 9], ["p", 11]],
        "notesNum": 6,
        "semitoneLocationList": [4, 7, 11, 2, 5],
        "orderedSemitoneLocationList": [2, 4, 5, 7, 11]
    },
    {
        "type": "chord11",
        "cnName": "\u5C5E\u5341\u4E00",
        "chordKey": "dom11",
        "scoreDisplay": 11,
        "intervalList": [["maj", 3], ["p", 5], ["min", 7], ["maj", 9], ["p", 11]],
        "notesNum": 6,
        "semitoneLocationList": [4, 7, 10, 2, 5],
        "orderedSemitoneLocationList": [2, 4, 5, 7, 10]
    },
    {
        "type": "chord11",
        "cnName": "\u5C0F\u5341\u4E00",
        "chordKey": "min11",
        "scoreDisplay": "m11",
        "intervalList": [["min", 3], ["p", 5], ["min", 7], ["maj", 9], ["p", 11]],
        "notesNum": 6,
        "semitoneLocationList": [3, 7, 10, 2, 5],
        "orderedSemitoneLocationList": [2, 3, 5, 7, 10]
    },
    {
        "type": "chord11",
        "cnName": "\u5C0F\u5927\u5341\u4E00",
        "chordKey": "minmaj11",
        "scoreDisplay": "mM11",
        "intervalList": [["min", 3], ["p", 5], ["maj", 7], ["maj", 9], ["p", 11]],
        "notesNum": 6,
        "semitoneLocationList": [3, 7, 11, 2, 5],
        "orderedSemitoneLocationList": [2, 3, 5, 7, 11]
    },
    {
        "type": "chord11",
        "cnName": "\u5C5E\u5341\u4E00\u964D\u4E94",
        "chordKey": "dom11b5",
        "scoreDisplay": "11b5",
        "intervalList": [["maj", 3], ["dim", 5], ["min", 7], ["maj", 9], ["p", 11]],
        "notesNum": 6,
        "semitoneLocationList": [4, 6, 10, 2, 5],
        "orderedSemitoneLocationList": [2, 4, 5, 6, 10]
    },
    {
        "type": "chord11",
        "cnName": "\u5C5E\u5341\u4E00\u5347\u4E94",
        "chordKey": "dom11#5",
        "scoreDisplay": "11#5",
        "intervalList": [["maj", 3], ["aug", 5], ["min", 7], ["maj", 9], ["p", 11]],
        "notesNum": 6,
        "semitoneLocationList": [4, 8, 10, 2, 5],
        "orderedSemitoneLocationList": [2, 4, 5, 8, 10]
    },
    {
        "type": "chord11",
        "cnName": "\u5C5E\u5341\u4E00\u964D\u4E5D",
        "chordKey": "dom11b9",
        "scoreDisplay": "11b9",
        "intervalList": [["maj", 3], ["p", 5], ["min", 7], ["min", 9], ["p", 11]],
        "notesNum": 6,
        "semitoneLocationList": [4, 7, 10, 1, 5],
        "orderedSemitoneLocationList": [1, 4, 5, 7, 10]
    },
    {
        "type": "chord11",
        "cnName": "\u5C5E\u5341\u4E00\u5347\u4E5D",
        "chordKey": "dom11#9",
        "scoreDisplay": "11#9",
        "intervalList": [["maj", 3], ["p", 5], ["min", 7], ["aug", 9], ["p", 11]],
        "notesNum": 6,
        "semitoneLocationList": [4, 7, 10, 3, 5],
        "orderedSemitoneLocationList": [3, 4, 5, 7, 10]
    },
    {
        "type": "chord11",
        "cnName": "\u5C5E\u5341\u4E00\u964D\u5341\u4E09",
        "chordKey": "dom11b13",
        "scoreDisplay": "11b13",
        "intervalList": [["maj", 3], ["p", 5], ["min", 7], ["maj", 9], ["p", 11], ["min", 13]],
        "notesNum": 7,
        "semitoneLocationList": [4, 7, 10, 2, 5, 8],
        "orderedSemitoneLocationList": [2, 4, 5, 7, 8, 10]
    },
    {
        "type": "chord11",
        "cnName": "\u5C0F\u5341\u4E00\u964D\u4E94",
        "chordKey": "min11b5",
        "scoreDisplay": "m11b5",
        "intervalList": [["min", 3], ["dim", 5], ["min", 7], ["maj", 9], ["p", 11]],
        "notesNum": 6,
        "semitoneLocationList": [3, 6, 10, 2, 5],
        "orderedSemitoneLocationList": [2, 3, 5, 6, 10]
    },
    {
        "type": "chord13",
        "cnName": "\u5927\u5341\u4E09",
        "chordKey": "maj13",
        "scoreDisplay": "M13",
        "intervalList": [["maj", 3], ["p", 5], ["maj", 7], ["maj", 9], ["p", 11], ["maj", 13]],
        "notesNum": 7,
        "semitoneLocationList": [4, 7, 11, 2, 5, 9],
        "orderedSemitoneLocationList": [2, 4, 5, 7, 9, 11]
    },
    {
        "type": "chord13",
        "cnName": "\u5C5E\u5341\u4E09",
        "chordKey": "dom13",
        "scoreDisplay": 13,
        "intervalList": [["maj", 3], ["p", 5], ["min", 7], ["maj", 9], ["p", 11], ["maj", 13]],
        "notesNum": 7,
        "semitoneLocationList": [4, 7, 10, 2, 5, 9],
        "orderedSemitoneLocationList": [2, 4, 5, 7, 9, 10]
    },
    {
        "type": "chord13",
        "cnName": "\u5C0F\u5341\u4E09",
        "chordKey": "min13",
        "scoreDisplay": "m13",
        "intervalList": [["min", 3], ["p", 5], ["min", 7], ["maj", 9], ["p", 11], ["maj", 13]],
        "notesNum": 7,
        "semitoneLocationList": [3, 7, 10, 2, 5, 9],
        "orderedSemitoneLocationList": [2, 3, 5, 7, 9, 10]
    },
    {
        "type": "chord13",
        "cnName": "\u5C0F\u5927\u5341\u4E09",
        "chordKey": "minmaj13",
        "scoreDisplay": "mM13",
        "intervalList": [["min", 3], ["p", 5], ["maj", 7], ["maj", 9], ["p", 11], ["maj", 13]],
        "notesNum": 7,
        "semitoneLocationList": [3, 7, 11, 2, 5, 9],
        "orderedSemitoneLocationList": [2, 3, 5, 7, 9, 11]
    },
    {
        "type": "chord13",
        "cnName": "\u5C5E\u5341\u4E09\u964D\u4E94",
        "chordKey": "dom13b5",
        "scoreDisplay": "13b5",
        "intervalList": [["maj", 3], ["dim", 5], ["min", 7], ["maj", 9], ["p", 11], ["maj", 13]],
        "notesNum": 7,
        "semitoneLocationList": [4, 6, 10, 2, 5, 9],
        "orderedSemitoneLocationList": [2, 4, 5, 6, 9, 10]
    },
    {
        "type": "chord13",
        "cnName": "\u5C5E\u5341\u4E09\u5347\u4E94",
        "chordKey": "dom13#5",
        "scoreDisplay": "13#5",
        "intervalList": [["maj", 3], ["aug", 5], ["min", 7], ["maj", 9], ["p", 11], ["maj", 13]],
        "notesNum": 7,
        "semitoneLocationList": [4, 8, 10, 2, 5, 9],
        "orderedSemitoneLocationList": [2, 4, 5, 8, 9, 10]
    },
    {
        "type": "chord13",
        "cnName": "\u5C5E\u5341\u4E09\u964D\u4E5D",
        "chordKey": "dom13b9",
        "scoreDisplay": "13b9",
        "intervalList": [["maj", 3], ["p", 5], ["min", 7], ["min", 9], ["p", 11], ["maj", 13]],
        "notesNum": 7,
        "semitoneLocationList": [4, 7, 10, 1, 5, 9],
        "orderedSemitoneLocationList": [1, 4, 5, 7, 9, 10]
    },
    {
        "type": "chord13",
        "cnName": "\u5C5E\u5341\u4E09\u5347\u4E5D",
        "chordKey": "dom13#9",
        "scoreDisplay": "13#9",
        "intervalList": [["maj", 3], ["p", 5], ["min", 7], ["aug", 9], ["maj", 13]],
        "notesNum": 6,
        "semitoneLocationList": [4, 7, 10, 3, 9],
        "orderedSemitoneLocationList": [3, 4, 7, 9, 10]
    },
    {
        "type": "chord13",
        "cnName": "\u5C5E\u5341\u4E09\u5347\u5341\u4E00",
        "chordKey": "dom13#11",
        "scoreDisplay": "13#11",
        "intervalList": [["maj", 3], ["p", 5], ["min", 7], ["maj", 9], ["aug", 11], ["maj", 13]],
        "notesNum": 7,
        "semitoneLocationList": [4, 7, 10, 2, 6, 9],
        "orderedSemitoneLocationList": [2, 4, 6, 7, 9, 10]
    },
    {
        "type": "chord13",
        "cnName": "\u5927\u5341\u4E09\u964D\u4E94",
        "chordKey": "maj13b5",
        "scoreDisplay": "M13b5",
        "intervalList": [["maj", 3], ["dim", 5], ["maj", 7], ["maj", 9], ["maj", 13]],
        "notesNum": 6,
        "semitoneLocationList": [4, 6, 11, 2, 9],
        "orderedSemitoneLocationList": [2, 4, 6, 9, 11]
    },
    {
        "type": "chord13",
        "cnName": "\u5927\u5341\u4E09\u5347\u4E94",
        "chordKey": "maj13#5",
        "scoreDisplay": "M13#5",
        "intervalList": [["maj", 3], ["aug", 5], ["maj", 7], ["maj", 9], ["maj", 13]],
        "notesNum": 6,
        "semitoneLocationList": [4, 8, 11, 2, 9],
        "orderedSemitoneLocationList": [2, 4, 8, 9, 11]
    },
    {
        "type": "chord13",
        "cnName": "\u5927\u5341\u4E09\u964D\u4E5D",
        "chordKey": "maj13b9",
        "scoreDisplay": "M13b9",
        "intervalList": [["maj", 3], ["p", 5], ["maj", 7], ["min", 9], ["maj", 13]],
        "notesNum": 6,
        "semitoneLocationList": [4, 7, 11, 1, 9],
        "orderedSemitoneLocationList": [1, 4, 7, 9, 11]
    },
    {
        "type": "chord13",
        "cnName": "\u5927\u5341\u4E09\u5347\u5341\u4E00",
        "chordKey": "maj13#11",
        "scoreDisplay": "M13#11",
        "intervalList": [["maj", 3], ["p", 5], ["maj", 7], ["maj", 9], ["aug", 11], ["maj", 13]],
        "notesNum": 7,
        "semitoneLocationList": [4, 7, 11, 2, 6, 9],
        "orderedSemitoneLocationList": [2, 4, 6, 7, 9, 11]
    }
];
const cls_initChordClass = (chordKey) => {
    const findChordObj = collect(chordMeta).where("chordKey", chordKey).first();
    if (!findChordObj)
        throw new ChordError(`No such chord term like ${chordKey}.`);
    const targetBaseIntervalPanel = {
        2: void 0,
        3: void 0,
        4: void 0,
        5: void 0,
        6: void 0,
        7: void 0,
        9: void 0,
        11: void 0,
        13: void 0
    };
    findChordObj.intervalList.forEach((x) => {
        targetBaseIntervalPanel[x[1]] = x[0];
    });
    return {
        baseIntervalList: findChordObj.intervalList,
        baseIntervalPanel: targetBaseIntervalPanel,
        scoreSymbol: findChordObj.scoreDisplay,
        chordKey: findChordObj.chordKey,
        cnName: findChordObj.cnName,
        type: findChordObj.type
    };
};
const cls_dealTransformString = (originTransformPanel, transformString) => {
    const targetTransformPanel = {...originTransformPanel};
    if (["4", "5", "11"].includes(transformString)) {
        targetTransformPanel[transformString] = "p";
        return targetTransformPanel;
    }
    if (["2", "3", "6", "7", "9", "13"].includes(transformString)) {
        targetTransformPanel[transformString] = "maj";
        return targetTransformPanel;
    }
    if (["#4", "#5", "#11", "#2", "#3", "#6", "#7", "#9", "#13"].includes(transformString)) {
        targetTransformPanel[transformString.slice(1)] = "aug";
        return targetTransformPanel;
    }
    if (["b2", "b3", "b6", "b7", "b9", "b13"].includes(transformString)) {
        targetTransformPanel[transformString.slice(1)] = "min";
        return targetTransformPanel;
    }
    if (["b4", "b5", "b11"].includes(transformString)) {
        targetTransformPanel[transformString.slice(1)] = "dim";
        return targetTransformPanel;
    }
    throw new ChordError("Please check the chord transform string.");
};
const cls_dealOmit = (originTransformPanel, omitInterval) => {
    const targetTransformPanel = originTransformPanel;
    targetTransformPanel[omitInterval] = "omit";
    return targetTransformPanel;
};
const cls_getIntervalPanel = (baseIntervalPanel, transformPanel) => {
    const targetIntervalPanel = {...baseIntervalPanel};
    for (const i_key of keys(baseIntervalPanel)) {
        if (!transformPanel[i_key])
            continue;
        if (transformPanel[i_key] === "omit") {
            targetIntervalPanel[i_key] = void 0;
            continue;
        }
        if (["maj", "min", "p", "dim", "aug"].includes(transformPanel[i_key])) {
            targetIntervalPanel[i_key] = transformPanel[i_key];
        }
    }
    return targetIntervalPanel;
};
const cls_getNotesList = (rootNote, intervalPanel) => {
    const targetNotesList = [rootNote];
    const dealPush = (intervalType, intervalNum) => {
        const targetInterval = new Interval(intervalType, intervalNum);
        const pushNote = rootNote.getNoteByInterval(targetInterval);
        targetNotesList.push(pushNote);
    };
    for (const i_key of keys(intervalPanel)) {
        if (!intervalPanel[i_key])
            continue;
        switch (i_key) {
            case "2":
                dealPush(intervalPanel[i_key], 2);
                continue;
            case "3":
                dealPush(intervalPanel[i_key], 3);
                continue;
            case "4":
                dealPush(intervalPanel[i_key], 4);
                continue;
            case "5":
                dealPush(intervalPanel[i_key], 5);
                continue;
            case "6":
                dealPush(intervalPanel[i_key], 6);
                continue;
            case "7":
                dealPush(intervalPanel[i_key], 7);
                continue;
            case "9":
                dealPush(intervalPanel[i_key], 9);
                continue;
            case "11":
                dealPush(intervalPanel[i_key], 11);
                continue;
            case "13":
                dealPush(intervalPanel[i_key], 13);
                continue;
            default:
                throw new ChordError("Please check chord intervals.");
        }
    }
    return targetNotesList;
};
const cls_getIntervalList = (intervalPanel) => {
    const resultList = [];
    for (const i of keys(intervalPanel)) {
        if (!intervalPanel[i])
            continue;
        switch (i) {
            case "2":
                resultList.push([intervalPanel[i], 2]);
                continue;
            case "3":
                resultList.push([intervalPanel[i], 3]);
                continue;
            case "4":
                resultList.push([intervalPanel[i], 4]);
                continue;
            case "5":
                resultList.push([intervalPanel[i], 5]);
                continue;
            case "6":
                resultList.push([intervalPanel[i], 6]);
                continue;
            case "7":
                resultList.push([intervalPanel[i], 7]);
                continue;
            case "9":
                resultList.push([intervalPanel[i], 9]);
                continue;
            case "11":
                resultList.push([intervalPanel[i], 11]);
                continue;
            case "13":
                resultList.push([intervalPanel[i], 13]);
                continue;
            default:
                throw new ChordError("Please check chord intervals.");
        }
    }
    return resultList;
};
const cls_getScoreSymbol = (rootNote, baseScoreSymbol, baseIntervalPanel, transformPanel) => {
    const omitResults = [];
    const alterResults = [];
    for (const i_key of keys(baseIntervalPanel)) {
        if (isEmpty(transformPanel[i_key]))
            continue;
        if (transformPanel[i_key] === "omit") {
            if (!baseIntervalPanel[i_key])
                continue;
            else
                omitResults.push(i_key);
        }
        if (baseIntervalPanel[i_key] === transformPanel[i_key])
            continue;
        if (transformPanel[i_key] === "aug")
            alterResults.push(`\u266F${i_key}`);
        if (transformPanel[i_key] === "p")
            alterResults.push(`\u266E${i_key}`);
        if (transformPanel[i_key] === "maj")
            alterResults.push(`\u266E${i_key}`);
        if (transformPanel[i_key] === "min")
            alterResults.push(`\u266D${i_key}`);
        if (transformPanel[i_key] === "dim") {
            if (["2", "3", "6", "7", "13"].includes(i_key)) {
                alterResults.push(`\u266D\u266D${i_key}`);
            } else
                alterResults.push(`\u266D${i_key}`);
        }
    }
    const chordTerm1 = `${baseScoreSymbol}`;
    const alterString = alterResults.join(",");
    const omitString = omitResults.join(",");
    if (alterString.length + omitString.length === 0)
        return `${chordTerm1}`;
    if (alterString.length > 0 && omitString.length === 0)
        return `${chordTerm1}(${alterString})`;
    if (alterString.length > 0 && omitString.length > 0)
        return `${chordTerm1}(${alterString},omit${omitString})`;
    if (alterString.length === 0 && omitString.length > 0)
        return `${chordTerm1}(omit${omitString})`;
};
const cls_isTransformEmpty = (obj) => {
    let result = true;
    for (let k of keys(obj)) {
        if (!isUndefined(obj[k])) {
            result = false;
            break;
        }
    }
    return result;
};
const getNote = (step, alter, octave = 5) => {
    const noteStep = step.trim().toUpperCase();
    if (!stepList.includes(noteStep))
        throw new FactoryError("Invalid step.");
    if (Math.abs(alter) > 2)
        throw new FactoryError("Invalid alter.");
    return new Note(noteStep, alter, octave);
};
const getInterval = (type, num) => {
    try {
        return new Interval(type.trim(), num);
    } catch (e) {
        throw new FactoryError(e.message);
    }
};
const getScale = (step, alter, octave, mode) => {
    try {
        const rootNote = getNote(step, alter, octave);
        return new Scale(rootNote, mode.trim().toUpperCase());
    } catch (e) {
        throw new FactoryError(e.message);
    }
};
const getChord = (step, alter, octave, chordKey, transformPanel) => {
    const rootNote = new Note(step, alter, octave);
    return new Chord(rootNote, chordKey, transformPanel);
};
const factory = {
    getNote,
    getInterval,
    getScale,
    getChord
};
const cls_tryToMergeTransform = (rootNote, chordKey, intervalPanel, transformPanel) => {
    if (cls_isTransformEmpty(transformPanel))
        return new Chord(rootNote, chordKey);
    const newIntervalPanel = {...intervalPanel};
    for (let k of keys(transformPanel)) {
        const tk = transformPanel[k];
        if (!isString(tk))
            continue;
        if (tk === "omit") {
            newIntervalPanel[k] = void 0;
        } else if (tk.length > 0) {
            newIntervalPanel[k] = tk;
        }
    }
    const findSemitoneList = keys(newIntervalPanel).map((k) => {
        if (!isEmpty(newIntervalPanel[k])) {
            return factory.getInterval(newIntervalPanel[k], parseInt(k, 10));
        }
    }).filter(Boolean).map((x) => x.semitoneLocation).sort((a, b) => a - b);
    const findNewResult = collect(chordMeta).filter((x) => {
        if (isEqual(x.orderedSemitoneLocationList, findSemitoneList))
            return true;
    }).first();
    if (isEmpty(findNewResult))
        return new Chord(rootNote, chordKey, transformPanel);
    return new Chord(rootNote, findNewResult.chordKey);
};
var __defProp$1 = Object.defineProperty;
var __defNormalProp$1 = (obj, key, value) => key in obj ? __defProp$1(obj, key, {
    enumerable: true,
    configurable: true,
    writable: true,
    value
}) : obj[key] = value;
var __publicField$1 = (obj, key, value) => {
    __defNormalProp$1(obj, typeof key !== "symbol" ? key + "" : key, value);
    return value;
};
var __accessCheck$1 = (obj, member, msg) => {
    if (!member.has(obj))
        throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
    __accessCheck$1(obj, member, "read from private field");
    return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd$1 = (obj, member, value) => {
    if (member.has(obj))
        throw TypeError("Cannot add the same private member more than once");
    member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet$1 = (obj, member, value, setter) => {
    __accessCheck$1(obj, member, "write to private field");
    setter ? setter.call(obj, value) : member.set(obj, value);
    return value;
};
var _transformPanel, _initInfo, _intervalPanel, intervalPanel_get, _notesPanel;
const defaultTransform = {
    2: void 0,
    3: void 0,
    4: void 0,
    5: void 0,
    6: void 0,
    7: void 0,
    9: void 0,
    11: void 0,
    13: void 0
};

class Chord {
    constructor(rootNote, chordKey, initTransform) {
        __privateAdd$1(this, _intervalPanel);
        __privateAdd$1(this, _notesPanel);
        __publicField$1(this, "rootNote");
        __privateAdd$1(this, _transformPanel, void 0);
        __privateAdd$1(this, _initInfo, void 0);
        this.rootNote = rootNote;
        const initChordInfo = cls_initChordClass(chordKey);
        __privateSet$1(this, _initInfo, {
            scoreSymbol: initChordInfo.scoreSymbol,
            intervalList: initChordInfo.baseIntervalList,
            chordKey: initChordInfo.chordKey,
            cnName: initChordInfo.cnName,
            intervalPanel: initChordInfo.baseIntervalPanel,
            type: initChordInfo.type
        });
        __privateSet$1(this, _transformPanel, isEmpty(initTransform) ? defaultTransform : {...defaultTransform, ...initTransform});
    }

    tryToMergeTransform() {
        return cls_tryToMergeTransform(this.rootNote, __privateGet(this, _initInfo).chordKey, __privateGet(this, _intervalPanel, intervalPanel_get), __privateGet(this, _transformPanel));
    }

    get transformPanel() {
        return __privateGet(this, _transformPanel);
    }

    get chordKey() {
        return __privateGet(this, _initInfo).chordKey;
    }

    setTransform(transformString) {
        __privateSet$1(this, _transformPanel, cls_dealTransformString(__privateGet(this, _transformPanel), transformString));
        return this;
    }

    get baseSymbol() {
        return __privateGet(this, _initInfo).scoreSymbol;
    }

    setOmit(omitInterval) {
        __privateSet$1(this, _transformPanel, cls_dealOmit(__privateGet(this, _transformPanel), omitInterval));
    }

    get scoreSymbol() {
        return cls_getScoreSymbol(
            this.rootNote,
            __privateGet(this, _initInfo).scoreSymbol,
            __privateGet(this, _initInfo).intervalPanel,
            __privateGet(this, _transformPanel)
        );
    }

    clearTransform() {
        __privateSet$1(this, _transformPanel, defaultTransform);
    }

    get isTransformed() {
        return !cls_isTransformEmpty(__privateGet(this, _transformPanel));
    }

    get intervalList() {
        return cls_getIntervalList(__privateGet(this, _intervalPanel, intervalPanel_get));
    }

    get notesList() {
        return cls_getNotesList(this.rootNote, __privateGet(this, _intervalPanel, intervalPanel_get));
    }

    get simpleDescription() {
        return this.notesList.map((noteInstance) => noteInstance.simpleDescription).join(",");
    }
}

_transformPanel = new WeakMap();
_initInfo = new WeakMap();
_intervalPanel = new WeakSet();
intervalPanel_get = function () {
    return cls_getIntervalPanel(__privateGet(this, _initInfo).intervalPanel, __privateGet(this, _transformPanel));
};
_notesPanel = new WeakSet();
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, {
    enumerable: true,
    configurable: true,
    writable: true,
    value
}) : obj[key] = value;
var __publicField = (obj, key, value) => {
    __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
    return value;
};
var __accessCheck = (obj, member, msg) => {
    if (!member.has(obj))
        throw TypeError("Cannot " + msg);
};
var __privateAdd = (obj, member, value) => {
    if (member.has(obj))
        throw TypeError("Cannot add the same private member more than once");
    member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
    __accessCheck(obj, member, "write to private field");
    setter ? setter.call(obj, value) : member.set(obj, value);
    return value;
};
var _modeUID;

class Scale {
    constructor(rootNote, scaleMode) {
        __publicField(this, "modeDescription");
        __publicField(this, "intervalPanel");
        __publicField(this, "alterSum");
        __publicField(this, "alterTimesSum");
        __publicField(this, "rootNote");
        __privateAdd(this, _modeUID, void 0);
        __publicField(this, "modeName");
        __publicField(this, "type");
        if (Math.abs(rootNote.alter) > 1)
            throw new ScaleError("The root note's alter is too big.");
        const scaleInitInfo = cls_initScale(rootNote, scaleMode);
        this.intervalPanel = scaleInitInfo.intervalPanel;
        this.rootNote = rootNote;
        this.modeDescription = scaleInitInfo.description;
        this.type = scaleInitInfo.type;
        this.alterSum = scaleInitInfo.includedAlters;
        this.alterTimesSum = scaleInitInfo.staveAlterTimes;
        this.modeName = scaleInitInfo.modeName;
        __privateSet(this, _modeUID, scaleInitInfo.modeUID);
    }

    get chord3OfDegreesList() {
        return cls_findDegreeChordInScale(this.notesList, true);
    }

    get chord7OfDegreesList() {
        return cls_findDegreeChordInScale(this.notesList, false);
    }

    get notesList() {
        return cls_getNotesList$1(this.rootNote, this.intervalList);
    }

    get intervalList() {
        return cls_getIntervalList$1(this.intervalPanel);
    }

    get notesPanel() {
        return cls_getNotesPanel(this.rootNote, this.intervalList);
    }

    get naturalNotesNum() {
        return this.notesList.filter((x) => x.alter === 0).length;
    }

    get alteredNotesNum() {
        return this.notesList.filter((x) => Math.abs(x.alter) >= 1).length;
    }

    get sharpOrFlatNotesNum() {
        return this.notesList.filter((x) => Math.abs(x.alter) === 1).length;
    }

    get doubleSharpOrFlatNotesNum() {
        return this.notesList.filter((x) => Math.abs(x.alter) === 2).length;
    }

    get alterList() {
        return cls_getAlterList(this.intervalList);
    }

    get isTonicReplaced() {
        return this.alteredNotesNum === this.notesList.length;
    }

    getNoteByIntervalNum(num, isWithinOctave = false) {
        return cls_getNoteByIntervalNum(this.notesList, num, isWithinOctave);
    }

    get simpleDescription() {
        return this.notesList.map((x) => x.artName + x.octave).join(",");
    }

    get equalRootNote() {
        if (this.isTonicReplaced) {
            return this.rootNote.getSamePitchNotes(false, 1)[0];
        }
        return this.rootNote;
    }

    getScaleDegreeNote(degree) {
        return cls_getDegreeNote(this.notesList, degree);
    }

    getScaleDegreeChord3Key(scaleDegree) {
        return cls_findOneChordInScale(this.notesList, scaleDegree, true);
    }

    getScaleDegreeChord7Key(scaleDegree) {
        return cls_findOneChordInScale(this.notesList, scaleDegree, false);
    }

    getScaleDegreeChord3(scaleDegree) {
        return new Chord(this.rootNote, this.getScaleDegreeChord3Key(scaleDegree));
    }

    getScaleDegreeChord7(scaleDegree) {
        return new Chord(this.rootNote, this.getScaleDegreeChord7Key(scaleDegree));
    }
}

_modeUID = new WeakMap();
const MajorModeGroup = [
    ScaleMode.NaturalMajor,
    ScaleMode.HarmonicMajor,
    ScaleMode.MelodicMajorDescending,
    ScaleMode.Lydian,
    ScaleMode.Mixolydian
];
const MinorModeGroup = [
    ScaleMode.MelodicMinorAscending,
    ScaleMode.HarmonicMinor,
    ScaleMode.NaturalMinor,
    ScaleMode.Dorian,
    ScaleMode.Phrygian
];
const getModeNameByModeKey$1 = (modeKey) => {
    try {
        return collect(modeMeta).where("uid", modeKey).first().name;
    } catch (e) {
        throw new Error("The modeKey is not valid!");
    }
};
const getModeNameByModeKey = (modeKey) => {
    try {
        return collect(modeMeta).where("uid", modeKey).first().type;
    } catch (e) {
        throw new Error("The modeKey is not valid!");
    }
};
const getIntervalListByModeKey = (modeKey) => {
    const findResult = collect(modeMeta).where("uid", modeKey).first();
    if (isEmpty(findResult))
        throw new Error(`Error Mode of ${modeKey}.`);
    return findResult.intervalList;
};
const scale = {
    Scale,
    ScaleMode,
    MajorModeGroup,
    MinorModeGroup,
    getModeNameByModeKey: getModeNameByModeKey$1,
    getModeTypeByModeKey: getModeNameByModeKey,
    getIntervalListByModeKey
};
const fifthMeta = collect(
    [
        {
            rawNoteStep: "C",
            rawNoteAlter: -1,
            mode: "major",
            actualNoteStep: "B",
            actualNoteAlter: 0,
            isTonicReplaced: true,
            isTonicNormal: false,
            isDoubleAlterIncluded: false,
            rawStaveAlters: -7,
            circleID: 5
        },
        {
            rawNoteStep: "C",
            rawNoteAlter: 0,
            mode: "major",
            actualNoteStep: "C",
            actualNoteAlter: 0,
            isTonicReplaced: false,
            isTonicNormal: true,
            isDoubleAlterIncluded: false,
            rawStaveAlters: 0,
            circleID: 0
        },
        {
            rawNoteStep: "C",
            rawNoteAlter: 1,
            mode: "major",
            actualNoteStep: "D",
            actualNoteAlter: -1,
            isTonicReplaced: true,
            isTonicNormal: true,
            isDoubleAlterIncluded: false,
            rawStaveAlters: 7,
            circleID: 7
        },
        {
            rawNoteStep: "D",
            rawNoteAlter: -1,
            mode: "major",
            actualNoteStep: "D",
            actualNoteAlter: -1,
            isTonicReplaced: false,
            isTonicNormal: true,
            isDoubleAlterIncluded: false,
            rawStaveAlters: -5,
            circleID: 7
        },
        {
            rawNoteStep: "D",
            rawNoteAlter: 0,
            mode: "major",
            actualNoteStep: "D",
            actualNoteAlter: 0,
            isTonicReplaced: false,
            isTonicNormal: true,
            isDoubleAlterIncluded: false,
            rawStaveAlters: 2,
            circleID: 2
        },
        {
            rawNoteStep: "D",
            rawNoteAlter: 1,
            mode: "major",
            actualNoteStep: "E",
            actualNoteAlter: -1,
            isTonicReplaced: true,
            isTonicNormal: true,
            isDoubleAlterIncluded: true,
            rawStaveAlters: 9,
            circleID: -1
        },
        {
            rawNoteStep: "E",
            rawNoteAlter: -1,
            mode: "major",
            actualNoteStep: "E",
            actualNoteAlter: -1,
            isTonicReplaced: false,
            isTonicNormal: true,
            isDoubleAlterIncluded: false,
            rawStaveAlters: -3,
            circleID: 9
        },
        {
            rawNoteStep: "E",
            rawNoteAlter: 0,
            mode: "major",
            actualNoteStep: "E",
            actualNoteAlter: 0,
            isTonicReplaced: false,
            isTonicNormal: true,
            isDoubleAlterIncluded: false,
            rawStaveAlters: 4,
            circleID: 4
        },
        {
            rawNoteStep: "E",
            rawNoteAlter: 1,
            mode: "major",
            actualNoteStep: "F",
            actualNoteAlter: 0,
            isTonicReplaced: true,
            isTonicNormal: false,
            isDoubleAlterIncluded: true,
            rawStaveAlters: 11,
            circleID: -1
        },
        {
            rawNoteStep: "F",
            rawNoteAlter: -1,
            mode: "major",
            actualNoteStep: "E",
            actualNoteAlter: 0,
            isTonicReplaced: true,
            isTonicNormal: false,
            isDoubleAlterIncluded: true,
            rawStaveAlters: -8,
            circleID: -1
        },
        {
            rawNoteStep: "F",
            rawNoteAlter: 0,
            mode: "major",
            actualNoteStep: "F",
            actualNoteAlter: 0,
            isTonicReplaced: false,
            isTonicNormal: true,
            isDoubleAlterIncluded: false,
            rawStaveAlters: -1,
            circleID: 11
        },
        {
            rawNoteStep: "F",
            rawNoteAlter: 1,
            mode: "major",
            actualNoteStep: "F",
            actualNoteAlter: 1,
            isTonicReplaced: false,
            isTonicNormal: true,
            isDoubleAlterIncluded: false,
            rawStaveAlters: 6,
            circleID: 6
        },
        {
            rawNoteStep: "G",
            rawNoteAlter: -1,
            mode: "major",
            actualNoteStep: "G",
            actualNoteAlter: -1,
            isTonicReplaced: false,
            isTonicNormal: true,
            isDoubleAlterIncluded: false,
            rawStaveAlters: -6,
            circleID: 6
        },
        {
            rawNoteStep: "G",
            rawNoteAlter: 0,
            mode: "major",
            actualNoteStep: "G",
            actualNoteAlter: 0,
            isTonicReplaced: false,
            isTonicNormal: true,
            isDoubleAlterIncluded: false,
            rawStaveAlters: 1,
            circleID: 1
        },
        {
            rawNoteStep: "G",
            rawNoteAlter: 1,
            mode: "major",
            actualNoteStep: "A",
            actualNoteAlter: -1,
            isTonicReplaced: true,
            isTonicNormal: true,
            isDoubleAlterIncluded: true,
            rawStaveAlters: 8,
            circleID: -1
        },
        {
            rawNoteStep: "A",
            rawNoteAlter: -1,
            mode: "major",
            actualNoteStep: "A",
            actualNoteAlter: -1,
            isTonicReplaced: false,
            isTonicNormal: true,
            isDoubleAlterIncluded: false,
            rawStaveAlters: -4,
            circleID: 8
        },
        {
            rawNoteStep: "A",
            rawNoteAlter: 0,
            mode: "major",
            actualNoteStep: "A",
            actualNoteAlter: 0,
            isTonicReplaced: false,
            isTonicNormal: true,
            isDoubleAlterIncluded: false,
            rawStaveAlters: 3,
            circleID: 3
        },
        {
            rawNoteStep: "A",
            rawNoteAlter: 1,
            mode: "major",
            actualNoteStep: "B",
            actualNoteAlter: -1,
            isTonicReplaced: true,
            isTonicNormal: true,
            isDoubleAlterIncluded: true,
            rawStaveAlters: 10,
            circleID: -1
        },
        {
            rawNoteStep: "B",
            rawNoteAlter: -1,
            mode: "major",
            actualNoteStep: "B",
            actualNoteAlter: -1,
            isTonicReplaced: false,
            isTonicNormal: true,
            isDoubleAlterIncluded: false,
            rawStaveAlters: -2,
            circleID: 10
        },
        {
            rawNoteStep: "B",
            rawNoteAlter: 0,
            mode: "major",
            actualNoteStep: "B",
            actualNoteAlter: 0,
            isTonicReplaced: false,
            isTonicNormal: true,
            isDoubleAlterIncluded: false,
            rawStaveAlters: 5,
            circleID: 5
        },
        {
            rawNoteStep: "B",
            rawNoteAlter: 1,
            mode: "major",
            actualNoteStep: "C",
            actualNoteAlter: 0,
            isTonicReplaced: true,
            isTonicNormal: false,
            isDoubleAlterIncluded: true,
            rawStaveAlters: 12,
            circleID: -1
        },
        {
            rawNoteStep: "C",
            rawNoteAlter: -1,
            mode: "minor",
            actualNoteStep: "B",
            actualNoteAlter: 0,
            isTonicReplaced: true,
            isTonicNormal: false,
            isDoubleAlterIncluded: true,
            rawStaveAlters: -10,
            circleID: -1
        },
        {
            rawNoteStep: "C",
            rawNoteAlter: 0,
            mode: "minor",
            actualNoteStep: "C",
            actualNoteAlter: 0,
            isTonicReplaced: false,
            isTonicNormal: true,
            isDoubleAlterIncluded: false,
            rawStaveAlters: -3,
            circleID: 9
        },
        {
            rawNoteStep: "C",
            rawNoteAlter: 1,
            mode: "minor",
            actualNoteStep: "C",
            actualNoteAlter: 1,
            isTonicReplaced: false,
            isTonicNormal: true,
            isDoubleAlterIncluded: false,
            rawStaveAlters: 4,
            circleID: 4
        },
        {
            rawNoteStep: "D",
            rawNoteAlter: -1,
            mode: "minor",
            actualNoteStep: "C",
            actualNoteAlter: 1,
            isTonicReplaced: true,
            isTonicNormal: true,
            isDoubleAlterIncluded: true,
            rawStaveAlters: -8,
            circleID: -1
        },
        {
            rawNoteStep: "D",
            rawNoteAlter: 0,
            mode: "minor",
            actualNoteStep: "D",
            actualNoteAlter: 0,
            isTonicReplaced: false,
            isTonicNormal: true,
            isDoubleAlterIncluded: false,
            rawStaveAlters: -1,
            circleID: 11
        },
        {
            rawNoteStep: "D",
            rawNoteAlter: 1,
            mode: "minor",
            actualNoteStep: "D",
            actualNoteAlter: 1,
            isTonicReplaced: false,
            isTonicNormal: true,
            isDoubleAlterIncluded: false,
            rawStaveAlters: 6,
            circleID: 6
        },
        {
            rawNoteStep: "E",
            rawNoteAlter: -1,
            mode: "minor",
            actualNoteStep: "E",
            actualNoteAlter: -1,
            isTonicReplaced: false,
            isTonicNormal: true,
            isDoubleAlterIncluded: false,
            rawStaveAlters: -6,
            circleID: 6
        },
        {
            rawNoteStep: "E",
            rawNoteAlter: 0,
            mode: "minor",
            actualNoteStep: "E",
            actualNoteAlter: 0,
            isTonicReplaced: false,
            isTonicNormal: true,
            isDoubleAlterIncluded: false,
            rawStaveAlters: 1,
            circleID: 1
        },
        {
            rawNoteStep: "E",
            rawNoteAlter: 1,
            mode: "minor",
            actualNoteStep: "F",
            actualNoteAlter: 0,
            isTonicReplaced: true,
            isTonicNormal: false,
            isDoubleAlterIncluded: true,
            rawStaveAlters: 8,
            circleID: -1
        },
        {
            rawNoteStep: "F",
            rawNoteAlter: -1,
            mode: "minor",
            actualNoteStep: "E",
            actualNoteAlter: 0,
            isTonicReplaced: true,
            isTonicNormal: false,
            isDoubleAlterIncluded: true,
            rawStaveAlters: -11,
            circleID: -1
        },
        {
            rawNoteStep: "F",
            rawNoteAlter: 0,
            mode: "minor",
            actualNoteStep: "F",
            actualNoteAlter: 0,
            isTonicReplaced: false,
            isTonicNormal: true,
            isDoubleAlterIncluded: false,
            rawStaveAlters: -4,
            circleID: 8
        },
        {
            rawNoteStep: "F",
            rawNoteAlter: 1,
            mode: "minor",
            actualNoteStep: "F",
            actualNoteAlter: 1,
            isTonicReplaced: false,
            isTonicNormal: true,
            isDoubleAlterIncluded: false,
            rawStaveAlters: 3,
            circleID: 3
        },
        {
            rawNoteStep: "G",
            rawNoteAlter: -1,
            mode: "minor",
            actualNoteStep: "F",
            actualNoteAlter: 1,
            isTonicReplaced: true,
            isTonicNormal: true,
            isDoubleAlterIncluded: true,
            rawStaveAlters: -9,
            circleID: -1
        },
        {
            rawNoteStep: "G",
            rawNoteAlter: 0,
            mode: "minor",
            actualNoteStep: "G",
            actualNoteAlter: 0,
            isTonicReplaced: false,
            isTonicNormal: true,
            isDoubleAlterIncluded: false,
            rawStaveAlters: -2,
            circleID: 10
        },
        {
            rawNoteStep: "G",
            rawNoteAlter: 1,
            mode: "minor",
            actualNoteStep: "G",
            actualNoteAlter: 1,
            isTonicReplaced: false,
            isTonicNormal: true,
            isDoubleAlterIncluded: false,
            rawStaveAlters: 5,
            circleID: 5
        },
        {
            rawNoteStep: "A",
            rawNoteAlter: -1,
            mode: "minor",
            actualNoteStep: "G",
            actualNoteAlter: 1,
            isTonicReplaced: true,
            isTonicNormal: true,
            isDoubleAlterIncluded: false,
            rawStaveAlters: -7,
            circleID: 5
        },
        {
            rawNoteStep: "A",
            rawNoteAlter: 0,
            mode: "minor",
            actualNoteStep: "A",
            actualNoteAlter: 0,
            isTonicReplaced: false,
            isTonicNormal: true,
            isDoubleAlterIncluded: false,
            rawStaveAlters: 0,
            circleID: 0
        },
        {
            rawNoteStep: "A",
            rawNoteAlter: 1,
            mode: "minor",
            actualNoteStep: "B",
            actualNoteAlter: -1,
            isTonicReplaced: true,
            isTonicNormal: true,
            isDoubleAlterIncluded: false,
            rawStaveAlters: 7,
            circleID: 7
        },
        {
            rawNoteStep: "B",
            rawNoteAlter: -1,
            mode: "minor",
            actualNoteStep: "B",
            actualNoteAlter: -1,
            isTonicReplaced: false,
            isTonicNormal: true,
            isDoubleAlterIncluded: false,
            rawStaveAlters: -5,
            circleID: 7
        },
        {
            rawNoteStep: "B",
            rawNoteAlter: 0,
            mode: "minor",
            actualNoteStep: "B",
            actualNoteAlter: 0,
            isTonicReplaced: false,
            isTonicNormal: true,
            isDoubleAlterIncluded: false,
            rawStaveAlters: 2,
            circleID: 2
        },
        {
            rawNoteStep: "B",
            rawNoteAlter: 1,
            mode: "minor",
            actualNoteStep: "C",
            actualNoteAlter: 0,
            isTonicReplaced: true,
            isTonicNormal: false,
            isDoubleAlterIncluded: true,
            rawStaveAlters: 9,
            circleID: -1
        }
    ]
);
const getStaveAlterByNote = (step, alter) => {
    const findObj = fifthMeta.where("rawNoteStep", step).where("rawNoteAlter", alter).all();
    if (isEmpty(findObj))
        throw new Error("No alter value found for the given note!");
    return findObj;
};
const getScaleByStaveAlters = (staveAlter) => {
    if (Math.abs(staveAlter) > 7)
        throw new Error("staveAlter must be between -7 and 7");
    if (Math.abs(staveAlter) <= 6)
        return fifthMeta.where("circleID", ">=", 0).where("circleID", "<=", 12).where("rawStaveAlters", staveAlter).where("isTonicReplaced", false).all();
    if (Math.abs(staveAlter) === 7)
        return fifthMeta.where("rawStaveAlters", staveAlter).all();
};
const li = ["F", "C", "G", "D", "A", "E", "B"];
const liReverse = li.reverse();
const getAlterStepListByNum = (num) => {
    if (num === 0)
        return [];
    if (num > 7 || num < -7)
        throw new Error("num must be between -7 and 7");
    if (num > 0) {
        return li.slice(0, num);
    }
    return liReverse.slice(0, Math.abs(num));
};
const stave = {
    getStaveAlterByNote: getStaveAlterByNote,
    getScaleByStaveAlters: getScaleByStaveAlters,
    getAlterStepListByNum: getAlterStepListByNum
};

class CircleOfFifths extends Base12Radix {
    constructor(i = 0) {
        if (!isInteger(i))
            throw new CircleOfFifthsError("given number must be integer");
        super(i);
    }

    get majCircle() {
        return fifthMeta.where("circleID", ">=", 0).where("circleID", "<=", 12).where("mode", "major").where("circleID", this.location).all();
    }

    get minCircle() {
        return fifthMeta.where("circleID", ">=", 0).where("circleID", "<=", 12).where("mode", "minor").where("circleID", this.location).all();
    }

    get location() {
        return this.twoDigitArray[1];
    }

    get circleNumber() {
        return this.twoDigitArray[0];
    }

    move(num) {
        if (!isInteger(num))
            throw new CircleOfFifthsError("num must be integer");
        if (num === 0)
            return this;
        return new CircleOfFifths(this.base10 + num);
    }

    get current() {
        return fifthMeta.where("circleID", ">=", 0).where("circleID", "<=", 12).where("circleID", this.location).all();
    }
}

const getFifthCircleByAlter = (alter) => {
    const obj = fifthMeta.where("staveAlters", alter).first();
    if (obj)
        return new CircleOfFifths(obj.circleID);
    throw new CircleOfFifthsError(`Cannot find the alter value of ${alter}.`);
};
const circleOfFifths = {CircleOfFifths, getFifthCircleByAlter};
const findChord = (locationList, isStrictlyMatch, rootNoteLocation, limitType) => {
    const isLimitType = isArray(limitType) && limitType.length > 0;
    const betterLocationList = locationList.slice().sort((x, y) => x - y);
    const isRootNoteLocationRequired = isNumber(rootNoteLocation) && rootNoteLocation >= 0 && rootNoteLocation <= 11;
    let handle = collect(findChordMeta);
    if (isRootNoteLocationRequired) {
        handle = handle.where("rootNoteLocation", rootNoteLocation);
    }
    if (isLimitType) {
        handle = handle.filter((x) => limitType.includes(x.type));
    }
    const isStrictlyMatchJudge = byDefault(isStrictlyMatch, false);
    if (isStrictlyMatchJudge) {
        const result2 = handle.filter((x) => isEqual(betterLocationList, x.notesLocationList)).all();
        if (isEmpty(result2))
            return [];
        return result2;
    }
    const result = handle.filter((x) => {
        if (isEqual(betterLocationList, x.notesLocationList))
            return true;
        if (x.orderedNotesLocationList.length > betterLocationList.length) {
            if (intersection(betterLocationList, x.orderedNotesLocationList).length === betterLocationList.length)
                return true;
        }
    }).all();
    if (isEmpty(result))
        return [];
    return result;
};
const findScale = [{
    "rootNoteLocation": 0,
    "mode": "MAJ",
    "notesLocationList": [0, 2, 4, 5, 7, 9, 11],
    "orderedNotesLocationList": [0, 2, 4, 5, 7, 9, 11],
    "n2L": 2,
    "n3L": 4,
    "n4L": 5,
    "n5L": 7,
    "n6L": 9,
    "n7L": 11
}, {
    "rootNoteLocation": 0,
    "mode": "MIN",
    "notesLocationList": [0, 2, 3, 5, 7, 8, 10],
    "orderedNotesLocationList": [0, 2, 3, 5, 7, 8, 10],
    "n2L": 2,
    "n3L": 3,
    "n4L": 5,
    "n5L": 7,
    "n6L": 8,
    "n7L": 10
}, {
    "rootNoteLocation": 0,
    "mode": "DOR",
    "notesLocationList": [0, 2, 3, 5, 7, 9, 10],
    "orderedNotesLocationList": [0, 2, 3, 5, 7, 9, 10],
    "n2L": 2,
    "n3L": 3,
    "n4L": 5,
    "n5L": 7,
    "n6L": 9,
    "n7L": 10
}, {
    "rootNoteLocation": 0,
    "mode": "PHR",
    "notesLocationList": [0, 1, 3, 5, 7, 8, 10],
    "orderedNotesLocationList": [0, 1, 3, 5, 7, 8, 10],
    "n2L": 1,
    "n3L": 3,
    "n4L": 5,
    "n5L": 7,
    "n6L": 8,
    "n7L": 10
}, {
    "rootNoteLocation": 0,
    "mode": "LYD",
    "notesLocationList": [0, 2, 4, 6, 7, 9, 11],
    "orderedNotesLocationList": [0, 2, 4, 6, 7, 9, 11],
    "n2L": 2,
    "n3L": 4,
    "n4L": 6,
    "n5L": 7,
    "n6L": 9,
    "n7L": 11
}, {
    "rootNoteLocation": 0,
    "mode": "MLY",
    "notesLocationList": [0, 2, 4, 5, 7, 9, 10],
    "orderedNotesLocationList": [0, 2, 4, 5, 7, 9, 10],
    "n2L": 2,
    "n3L": 4,
    "n4L": 5,
    "n5L": 7,
    "n6L": 9,
    "n7L": 10
}, {
    "rootNoteLocation": 0,
    "mode": "LOC",
    "notesLocationList": [0, 1, 3, 5, 6, 8, 10],
    "orderedNotesLocationList": [0, 1, 3, 5, 6, 8, 10],
    "n2L": 1,
    "n3L": 3,
    "n4L": 5,
    "n5L": 6,
    "n6L": 8,
    "n7L": 10
}, {
    "rootNoteLocation": 0,
    "mode": "HMIN",
    "notesLocationList": [0, 2, 3, 5, 7, 8, 11],
    "orderedNotesLocationList": [0, 2, 3, 5, 7, 8, 11],
    "n2L": 2,
    "n3L": 3,
    "n4L": 5,
    "n5L": 7,
    "n6L": 8,
    "n7L": 11
}, {
    "rootNoteLocation": 0,
    "mode": "HMAJ",
    "notesLocationList": [0, 2, 4, 5, 7, 8, 11],
    "orderedNotesLocationList": [0, 2, 4, 5, 7, 8, 11],
    "n2L": 2,
    "n3L": 4,
    "n4L": 5,
    "n5L": 7,
    "n6L": 8,
    "n7L": 11
}, {
    "rootNoteLocation": 0,
    "mode": "MMINASC",
    "notesLocationList": [0, 2, 3, 5, 7, 9, 11],
    "orderedNotesLocationList": [0, 2, 3, 5, 7, 9, 11],
    "n2L": 2,
    "n3L": 3,
    "n4L": 5,
    "n5L": 7,
    "n6L": 9,
    "n7L": 11
}, {
    "rootNoteLocation": 0,
    "mode": "MMAJDESC",
    "notesLocationList": [0, 2, 4, 5, 7, 8, 10],
    "orderedNotesLocationList": [0, 2, 4, 5, 7, 8, 10],
    "n2L": 2,
    "n3L": 4,
    "n4L": 5,
    "n5L": 7,
    "n6L": 8,
    "n7L": 10
}, {
    "rootNoteLocation": 1,
    "mode": "MAJ",
    "notesLocationList": [1, 3, 5, 6, 8, 10, 0],
    "orderedNotesLocationList": [0, 1, 3, 5, 6, 8, 10],
    "n2L": 3,
    "n3L": 5,
    "n4L": 6,
    "n5L": 8,
    "n6L": 10,
    "n7L": 0
}, {
    "rootNoteLocation": 1,
    "mode": "MIN",
    "notesLocationList": [1, 3, 4, 6, 8, 9, 11],
    "orderedNotesLocationList": [1, 3, 4, 6, 8, 9, 11],
    "n2L": 3,
    "n3L": 4,
    "n4L": 6,
    "n5L": 8,
    "n6L": 9,
    "n7L": 11
}, {
    "rootNoteLocation": 1,
    "mode": "DOR",
    "notesLocationList": [1, 3, 4, 6, 8, 10, 11],
    "orderedNotesLocationList": [1, 3, 4, 6, 8, 10, 11],
    "n2L": 3,
    "n3L": 4,
    "n4L": 6,
    "n5L": 8,
    "n6L": 10,
    "n7L": 11
}, {
    "rootNoteLocation": 1,
    "mode": "PHR",
    "notesLocationList": [1, 2, 4, 6, 8, 9, 11],
    "orderedNotesLocationList": [1, 2, 4, 6, 8, 9, 11],
    "n2L": 2,
    "n3L": 4,
    "n4L": 6,
    "n5L": 8,
    "n6L": 9,
    "n7L": 11
}, {
    "rootNoteLocation": 1,
    "mode": "LYD",
    "notesLocationList": [1, 3, 5, 7, 8, 10, 0],
    "orderedNotesLocationList": [0, 1, 3, 5, 7, 8, 10],
    "n2L": 3,
    "n3L": 5,
    "n4L": 7,
    "n5L": 8,
    "n6L": 10,
    "n7L": 0
}, {
    "rootNoteLocation": 1,
    "mode": "MLY",
    "notesLocationList": [1, 3, 5, 6, 8, 10, 11],
    "orderedNotesLocationList": [1, 3, 5, 6, 8, 10, 11],
    "n2L": 3,
    "n3L": 5,
    "n4L": 6,
    "n5L": 8,
    "n6L": 10,
    "n7L": 11
}, {
    "rootNoteLocation": 1,
    "mode": "LOC",
    "notesLocationList": [1, 2, 4, 6, 7, 9, 11],
    "orderedNotesLocationList": [1, 2, 4, 6, 7, 9, 11],
    "n2L": 2,
    "n3L": 4,
    "n4L": 6,
    "n5L": 7,
    "n6L": 9,
    "n7L": 11
}, {
    "rootNoteLocation": 1,
    "mode": "HMIN",
    "notesLocationList": [1, 3, 4, 6, 8, 9, 0],
    "orderedNotesLocationList": [0, 1, 3, 4, 6, 8, 9],
    "n2L": 3,
    "n3L": 4,
    "n4L": 6,
    "n5L": 8,
    "n6L": 9,
    "n7L": 0
}, {
    "rootNoteLocation": 1,
    "mode": "HMAJ",
    "notesLocationList": [1, 3, 5, 6, 8, 9, 0],
    "orderedNotesLocationList": [0, 1, 3, 5, 6, 8, 9],
    "n2L": 3,
    "n3L": 5,
    "n4L": 6,
    "n5L": 8,
    "n6L": 9,
    "n7L": 0
}, {
    "rootNoteLocation": 1,
    "mode": "MMINASC",
    "notesLocationList": [1, 3, 4, 6, 8, 10, 0],
    "orderedNotesLocationList": [0, 1, 3, 4, 6, 8, 10],
    "n2L": 3,
    "n3L": 4,
    "n4L": 6,
    "n5L": 8,
    "n6L": 10,
    "n7L": 0
}, {
    "rootNoteLocation": 1,
    "mode": "MMAJDESC",
    "notesLocationList": [1, 3, 5, 6, 8, 9, 11],
    "orderedNotesLocationList": [1, 3, 5, 6, 8, 9, 11],
    "n2L": 3,
    "n3L": 5,
    "n4L": 6,
    "n5L": 8,
    "n6L": 9,
    "n7L": 11
}, {
    "rootNoteLocation": 2,
    "mode": "MAJ",
    "notesLocationList": [2, 4, 6, 7, 9, 11, 1],
    "orderedNotesLocationList": [1, 2, 4, 6, 7, 9, 11],
    "n2L": 4,
    "n3L": 6,
    "n4L": 7,
    "n5L": 9,
    "n6L": 11,
    "n7L": 1
}, {
    "rootNoteLocation": 2,
    "mode": "MIN",
    "notesLocationList": [2, 4, 5, 7, 9, 10, 0],
    "orderedNotesLocationList": [0, 2, 4, 5, 7, 9, 10],
    "n2L": 4,
    "n3L": 5,
    "n4L": 7,
    "n5L": 9,
    "n6L": 10,
    "n7L": 0
}, {
    "rootNoteLocation": 2,
    "mode": "DOR",
    "notesLocationList": [2, 4, 5, 7, 9, 11, 0],
    "orderedNotesLocationList": [0, 2, 4, 5, 7, 9, 11],
    "n2L": 4,
    "n3L": 5,
    "n4L": 7,
    "n5L": 9,
    "n6L": 11,
    "n7L": 0
}, {
    "rootNoteLocation": 2,
    "mode": "PHR",
    "notesLocationList": [2, 3, 5, 7, 9, 10, 0],
    "orderedNotesLocationList": [0, 2, 3, 5, 7, 9, 10],
    "n2L": 3,
    "n3L": 5,
    "n4L": 7,
    "n5L": 9,
    "n6L": 10,
    "n7L": 0
}, {
    "rootNoteLocation": 2,
    "mode": "LYD",
    "notesLocationList": [2, 4, 6, 8, 9, 11, 1],
    "orderedNotesLocationList": [1, 2, 4, 6, 8, 9, 11],
    "n2L": 4,
    "n3L": 6,
    "n4L": 8,
    "n5L": 9,
    "n6L": 11,
    "n7L": 1
}, {
    "rootNoteLocation": 2,
    "mode": "MLY",
    "notesLocationList": [2, 4, 6, 7, 9, 11, 0],
    "orderedNotesLocationList": [0, 2, 4, 6, 7, 9, 11],
    "n2L": 4,
    "n3L": 6,
    "n4L": 7,
    "n5L": 9,
    "n6L": 11,
    "n7L": 0
}, {
    "rootNoteLocation": 2,
    "mode": "LOC",
    "notesLocationList": [2, 3, 5, 7, 8, 10, 0],
    "orderedNotesLocationList": [0, 2, 3, 5, 7, 8, 10],
    "n2L": 3,
    "n3L": 5,
    "n4L": 7,
    "n5L": 8,
    "n6L": 10,
    "n7L": 0
}, {
    "rootNoteLocation": 2,
    "mode": "HMIN",
    "notesLocationList": [2, 4, 5, 7, 9, 10, 1],
    "orderedNotesLocationList": [1, 2, 4, 5, 7, 9, 10],
    "n2L": 4,
    "n3L": 5,
    "n4L": 7,
    "n5L": 9,
    "n6L": 10,
    "n7L": 1
}, {
    "rootNoteLocation": 2,
    "mode": "HMAJ",
    "notesLocationList": [2, 4, 6, 7, 9, 10, 1],
    "orderedNotesLocationList": [1, 2, 4, 6, 7, 9, 10],
    "n2L": 4,
    "n3L": 6,
    "n4L": 7,
    "n5L": 9,
    "n6L": 10,
    "n7L": 1
}, {
    "rootNoteLocation": 2,
    "mode": "MMINASC",
    "notesLocationList": [2, 4, 5, 7, 9, 11, 1],
    "orderedNotesLocationList": [1, 2, 4, 5, 7, 9, 11],
    "n2L": 4,
    "n3L": 5,
    "n4L": 7,
    "n5L": 9,
    "n6L": 11,
    "n7L": 1
}, {
    "rootNoteLocation": 2,
    "mode": "MMAJDESC",
    "notesLocationList": [2, 4, 6, 7, 9, 10, 0],
    "orderedNotesLocationList": [0, 2, 4, 6, 7, 9, 10],
    "n2L": 4,
    "n3L": 6,
    "n4L": 7,
    "n5L": 9,
    "n6L": 10,
    "n7L": 0
}, {
    "rootNoteLocation": 3,
    "mode": "MAJ",
    "notesLocationList": [3, 5, 7, 8, 10, 0, 2],
    "orderedNotesLocationList": [0, 2, 3, 5, 7, 8, 10],
    "n2L": 5,
    "n3L": 7,
    "n4L": 8,
    "n5L": 10,
    "n6L": 0,
    "n7L": 2
}, {
    "rootNoteLocation": 3,
    "mode": "MIN",
    "notesLocationList": [3, 5, 6, 8, 10, 11, 1],
    "orderedNotesLocationList": [1, 3, 5, 6, 8, 10, 11],
    "n2L": 5,
    "n3L": 6,
    "n4L": 8,
    "n5L": 10,
    "n6L": 11,
    "n7L": 1
}, {
    "rootNoteLocation": 3,
    "mode": "DOR",
    "notesLocationList": [3, 5, 6, 8, 10, 0, 1],
    "orderedNotesLocationList": [0, 1, 3, 5, 6, 8, 10],
    "n2L": 5,
    "n3L": 6,
    "n4L": 8,
    "n5L": 10,
    "n6L": 0,
    "n7L": 1
}, {
    "rootNoteLocation": 3,
    "mode": "PHR",
    "notesLocationList": [3, 4, 6, 8, 10, 11, 1],
    "orderedNotesLocationList": [1, 3, 4, 6, 8, 10, 11],
    "n2L": 4,
    "n3L": 6,
    "n4L": 8,
    "n5L": 10,
    "n6L": 11,
    "n7L": 1
}, {
    "rootNoteLocation": 3,
    "mode": "LYD",
    "notesLocationList": [3, 5, 7, 9, 10, 0, 2],
    "orderedNotesLocationList": [0, 2, 3, 5, 7, 9, 10],
    "n2L": 5,
    "n3L": 7,
    "n4L": 9,
    "n5L": 10,
    "n6L": 0,
    "n7L": 2
}, {
    "rootNoteLocation": 3,
    "mode": "MLY",
    "notesLocationList": [3, 5, 7, 8, 10, 0, 1],
    "orderedNotesLocationList": [0, 1, 3, 5, 7, 8, 10],
    "n2L": 5,
    "n3L": 7,
    "n4L": 8,
    "n5L": 10,
    "n6L": 0,
    "n7L": 1
}, {
    "rootNoteLocation": 3,
    "mode": "LOC",
    "notesLocationList": [3, 4, 6, 8, 9, 11, 1],
    "orderedNotesLocationList": [1, 3, 4, 6, 8, 9, 11],
    "n2L": 4,
    "n3L": 6,
    "n4L": 8,
    "n5L": 9,
    "n6L": 11,
    "n7L": 1
}, {
    "rootNoteLocation": 3,
    "mode": "HMIN",
    "notesLocationList": [3, 5, 6, 8, 10, 11, 2],
    "orderedNotesLocationList": [2, 3, 5, 6, 8, 10, 11],
    "n2L": 5,
    "n3L": 6,
    "n4L": 8,
    "n5L": 10,
    "n6L": 11,
    "n7L": 2
}, {
    "rootNoteLocation": 3,
    "mode": "HMAJ",
    "notesLocationList": [3, 5, 7, 8, 10, 11, 2],
    "orderedNotesLocationList": [2, 3, 5, 7, 8, 10, 11],
    "n2L": 5,
    "n3L": 7,
    "n4L": 8,
    "n5L": 10,
    "n6L": 11,
    "n7L": 2
}, {
    "rootNoteLocation": 3,
    "mode": "MMINASC",
    "notesLocationList": [3, 5, 6, 8, 10, 0, 2],
    "orderedNotesLocationList": [0, 2, 3, 5, 6, 8, 10],
    "n2L": 5,
    "n3L": 6,
    "n4L": 8,
    "n5L": 10,
    "n6L": 0,
    "n7L": 2
}, {
    "rootNoteLocation": 3,
    "mode": "MMAJDESC",
    "notesLocationList": [3, 5, 7, 8, 10, 11, 1],
    "orderedNotesLocationList": [1, 3, 5, 7, 8, 10, 11],
    "n2L": 5,
    "n3L": 7,
    "n4L": 8,
    "n5L": 10,
    "n6L": 11,
    "n7L": 1
}, {
    "rootNoteLocation": 4,
    "mode": "MAJ",
    "notesLocationList": [4, 6, 8, 9, 11, 1, 3],
    "orderedNotesLocationList": [1, 3, 4, 6, 8, 9, 11],
    "n2L": 6,
    "n3L": 8,
    "n4L": 9,
    "n5L": 11,
    "n6L": 1,
    "n7L": 3
}, {
    "rootNoteLocation": 4,
    "mode": "MIN",
    "notesLocationList": [4, 6, 7, 9, 11, 0, 2],
    "orderedNotesLocationList": [0, 2, 4, 6, 7, 9, 11],
    "n2L": 6,
    "n3L": 7,
    "n4L": 9,
    "n5L": 11,
    "n6L": 0,
    "n7L": 2
}, {
    "rootNoteLocation": 4,
    "mode": "DOR",
    "notesLocationList": [4, 6, 7, 9, 11, 1, 2],
    "orderedNotesLocationList": [1, 2, 4, 6, 7, 9, 11],
    "n2L": 6,
    "n3L": 7,
    "n4L": 9,
    "n5L": 11,
    "n6L": 1,
    "n7L": 2
}, {
    "rootNoteLocation": 4,
    "mode": "PHR",
    "notesLocationList": [4, 5, 7, 9, 11, 0, 2],
    "orderedNotesLocationList": [0, 2, 4, 5, 7, 9, 11],
    "n2L": 5,
    "n3L": 7,
    "n4L": 9,
    "n5L": 11,
    "n6L": 0,
    "n7L": 2
}, {
    "rootNoteLocation": 4,
    "mode": "LYD",
    "notesLocationList": [4, 6, 8, 10, 11, 1, 3],
    "orderedNotesLocationList": [1, 3, 4, 6, 8, 10, 11],
    "n2L": 6,
    "n3L": 8,
    "n4L": 10,
    "n5L": 11,
    "n6L": 1,
    "n7L": 3
}, {
    "rootNoteLocation": 4,
    "mode": "MLY",
    "notesLocationList": [4, 6, 8, 9, 11, 1, 2],
    "orderedNotesLocationList": [1, 2, 4, 6, 8, 9, 11],
    "n2L": 6,
    "n3L": 8,
    "n4L": 9,
    "n5L": 11,
    "n6L": 1,
    "n7L": 2
}, {
    "rootNoteLocation": 4,
    "mode": "LOC",
    "notesLocationList": [4, 5, 7, 9, 10, 0, 2],
    "orderedNotesLocationList": [0, 2, 4, 5, 7, 9, 10],
    "n2L": 5,
    "n3L": 7,
    "n4L": 9,
    "n5L": 10,
    "n6L": 0,
    "n7L": 2
}, {
    "rootNoteLocation": 4,
    "mode": "HMIN",
    "notesLocationList": [4, 6, 7, 9, 11, 0, 3],
    "orderedNotesLocationList": [0, 3, 4, 6, 7, 9, 11],
    "n2L": 6,
    "n3L": 7,
    "n4L": 9,
    "n5L": 11,
    "n6L": 0,
    "n7L": 3
}, {
    "rootNoteLocation": 4,
    "mode": "HMAJ",
    "notesLocationList": [4, 6, 8, 9, 11, 0, 3],
    "orderedNotesLocationList": [0, 3, 4, 6, 8, 9, 11],
    "n2L": 6,
    "n3L": 8,
    "n4L": 9,
    "n5L": 11,
    "n6L": 0,
    "n7L": 3
}, {
    "rootNoteLocation": 4,
    "mode": "MMINASC",
    "notesLocationList": [4, 6, 7, 9, 11, 1, 3],
    "orderedNotesLocationList": [1, 3, 4, 6, 7, 9, 11],
    "n2L": 6,
    "n3L": 7,
    "n4L": 9,
    "n5L": 11,
    "n6L": 1,
    "n7L": 3
}, {
    "rootNoteLocation": 4,
    "mode": "MMAJDESC",
    "notesLocationList": [4, 6, 8, 9, 11, 0, 2],
    "orderedNotesLocationList": [0, 2, 4, 6, 8, 9, 11],
    "n2L": 6,
    "n3L": 8,
    "n4L": 9,
    "n5L": 11,
    "n6L": 0,
    "n7L": 2
}, {
    "rootNoteLocation": 5,
    "mode": "MAJ",
    "notesLocationList": [5, 7, 9, 10, 0, 2, 4],
    "orderedNotesLocationList": [0, 2, 4, 5, 7, 9, 10],
    "n2L": 7,
    "n3L": 9,
    "n4L": 10,
    "n5L": 0,
    "n6L": 2,
    "n7L": 4
}, {
    "rootNoteLocation": 5,
    "mode": "MIN",
    "notesLocationList": [5, 7, 8, 10, 0, 1, 3],
    "orderedNotesLocationList": [0, 1, 3, 5, 7, 8, 10],
    "n2L": 7,
    "n3L": 8,
    "n4L": 10,
    "n5L": 0,
    "n6L": 1,
    "n7L": 3
}, {
    "rootNoteLocation": 5,
    "mode": "DOR",
    "notesLocationList": [5, 7, 8, 10, 0, 2, 3],
    "orderedNotesLocationList": [0, 2, 3, 5, 7, 8, 10],
    "n2L": 7,
    "n3L": 8,
    "n4L": 10,
    "n5L": 0,
    "n6L": 2,
    "n7L": 3
}, {
    "rootNoteLocation": 5,
    "mode": "PHR",
    "notesLocationList": [5, 6, 8, 10, 0, 1, 3],
    "orderedNotesLocationList": [0, 1, 3, 5, 6, 8, 10],
    "n2L": 6,
    "n3L": 8,
    "n4L": 10,
    "n5L": 0,
    "n6L": 1,
    "n7L": 3
}, {
    "rootNoteLocation": 5,
    "mode": "LYD",
    "notesLocationList": [5, 7, 9, 11, 0, 2, 4],
    "orderedNotesLocationList": [0, 2, 4, 5, 7, 9, 11],
    "n2L": 7,
    "n3L": 9,
    "n4L": 11,
    "n5L": 0,
    "n6L": 2,
    "n7L": 4
}, {
    "rootNoteLocation": 5,
    "mode": "MLY",
    "notesLocationList": [5, 7, 9, 10, 0, 2, 3],
    "orderedNotesLocationList": [0, 2, 3, 5, 7, 9, 10],
    "n2L": 7,
    "n3L": 9,
    "n4L": 10,
    "n5L": 0,
    "n6L": 2,
    "n7L": 3
}, {
    "rootNoteLocation": 5,
    "mode": "LOC",
    "notesLocationList": [5, 6, 8, 10, 11, 1, 3],
    "orderedNotesLocationList": [1, 3, 5, 6, 8, 10, 11],
    "n2L": 6,
    "n3L": 8,
    "n4L": 10,
    "n5L": 11,
    "n6L": 1,
    "n7L": 3
}, {
    "rootNoteLocation": 5,
    "mode": "HMIN",
    "notesLocationList": [5, 7, 8, 10, 0, 1, 4],
    "orderedNotesLocationList": [0, 1, 4, 5, 7, 8, 10],
    "n2L": 7,
    "n3L": 8,
    "n4L": 10,
    "n5L": 0,
    "n6L": 1,
    "n7L": 4
}, {
    "rootNoteLocation": 5,
    "mode": "HMAJ",
    "notesLocationList": [5, 7, 9, 10, 0, 1, 4],
    "orderedNotesLocationList": [0, 1, 4, 5, 7, 9, 10],
    "n2L": 7,
    "n3L": 9,
    "n4L": 10,
    "n5L": 0,
    "n6L": 1,
    "n7L": 4
}, {
    "rootNoteLocation": 5,
    "mode": "MMINASC",
    "notesLocationList": [5, 7, 8, 10, 0, 2, 4],
    "orderedNotesLocationList": [0, 2, 4, 5, 7, 8, 10],
    "n2L": 7,
    "n3L": 8,
    "n4L": 10,
    "n5L": 0,
    "n6L": 2,
    "n7L": 4
}, {
    "rootNoteLocation": 5,
    "mode": "MMAJDESC",
    "notesLocationList": [5, 7, 9, 10, 0, 1, 3],
    "orderedNotesLocationList": [0, 1, 3, 5, 7, 9, 10],
    "n2L": 7,
    "n3L": 9,
    "n4L": 10,
    "n5L": 0,
    "n6L": 1,
    "n7L": 3
}, {
    "rootNoteLocation": 6,
    "mode": "MAJ",
    "notesLocationList": [6, 8, 10, 11, 1, 3, 5],
    "orderedNotesLocationList": [1, 3, 5, 6, 8, 10, 11],
    "n2L": 8,
    "n3L": 10,
    "n4L": 11,
    "n5L": 1,
    "n6L": 3,
    "n7L": 5
}, {
    "rootNoteLocation": 6,
    "mode": "MIN",
    "notesLocationList": [6, 8, 9, 11, 1, 2, 4],
    "orderedNotesLocationList": [1, 2, 4, 6, 8, 9, 11],
    "n2L": 8,
    "n3L": 9,
    "n4L": 11,
    "n5L": 1,
    "n6L": 2,
    "n7L": 4
}, {
    "rootNoteLocation": 6,
    "mode": "DOR",
    "notesLocationList": [6, 8, 9, 11, 1, 3, 4],
    "orderedNotesLocationList": [1, 3, 4, 6, 8, 9, 11],
    "n2L": 8,
    "n3L": 9,
    "n4L": 11,
    "n5L": 1,
    "n6L": 3,
    "n7L": 4
}, {
    "rootNoteLocation": 6,
    "mode": "PHR",
    "notesLocationList": [6, 7, 9, 11, 1, 2, 4],
    "orderedNotesLocationList": [1, 2, 4, 6, 7, 9, 11],
    "n2L": 7,
    "n3L": 9,
    "n4L": 11,
    "n5L": 1,
    "n6L": 2,
    "n7L": 4
}, {
    "rootNoteLocation": 6,
    "mode": "LYD",
    "notesLocationList": [6, 8, 10, 0, 1, 3, 5],
    "orderedNotesLocationList": [0, 1, 3, 5, 6, 8, 10],
    "n2L": 8,
    "n3L": 10,
    "n4L": 0,
    "n5L": 1,
    "n6L": 3,
    "n7L": 5
}, {
    "rootNoteLocation": 6,
    "mode": "MLY",
    "notesLocationList": [6, 8, 10, 11, 1, 3, 4],
    "orderedNotesLocationList": [1, 3, 4, 6, 8, 10, 11],
    "n2L": 8,
    "n3L": 10,
    "n4L": 11,
    "n5L": 1,
    "n6L": 3,
    "n7L": 4
}, {
    "rootNoteLocation": 6,
    "mode": "LOC",
    "notesLocationList": [6, 7, 9, 11, 0, 2, 4],
    "orderedNotesLocationList": [0, 2, 4, 6, 7, 9, 11],
    "n2L": 7,
    "n3L": 9,
    "n4L": 11,
    "n5L": 0,
    "n6L": 2,
    "n7L": 4
}, {
    "rootNoteLocation": 6,
    "mode": "HMIN",
    "notesLocationList": [6, 8, 9, 11, 1, 2, 5],
    "orderedNotesLocationList": [1, 2, 5, 6, 8, 9, 11],
    "n2L": 8,
    "n3L": 9,
    "n4L": 11,
    "n5L": 1,
    "n6L": 2,
    "n7L": 5
}, {
    "rootNoteLocation": 6,
    "mode": "HMAJ",
    "notesLocationList": [6, 8, 10, 11, 1, 2, 5],
    "orderedNotesLocationList": [1, 2, 5, 6, 8, 10, 11],
    "n2L": 8,
    "n3L": 10,
    "n4L": 11,
    "n5L": 1,
    "n6L": 2,
    "n7L": 5
}, {
    "rootNoteLocation": 6,
    "mode": "MMINASC",
    "notesLocationList": [6, 8, 9, 11, 1, 3, 5],
    "orderedNotesLocationList": [1, 3, 5, 6, 8, 9, 11],
    "n2L": 8,
    "n3L": 9,
    "n4L": 11,
    "n5L": 1,
    "n6L": 3,
    "n7L": 5
}, {
    "rootNoteLocation": 6,
    "mode": "MMAJDESC",
    "notesLocationList": [6, 8, 10, 11, 1, 2, 4],
    "orderedNotesLocationList": [1, 2, 4, 6, 8, 10, 11],
    "n2L": 8,
    "n3L": 10,
    "n4L": 11,
    "n5L": 1,
    "n6L": 2,
    "n7L": 4
}, {
    "rootNoteLocation": 7,
    "mode": "MAJ",
    "notesLocationList": [7, 9, 11, 0, 2, 4, 6],
    "orderedNotesLocationList": [0, 2, 4, 6, 7, 9, 11],
    "n2L": 9,
    "n3L": 11,
    "n4L": 0,
    "n5L": 2,
    "n6L": 4,
    "n7L": 6
}, {
    "rootNoteLocation": 7,
    "mode": "MIN",
    "notesLocationList": [7, 9, 10, 0, 2, 3, 5],
    "orderedNotesLocationList": [0, 2, 3, 5, 7, 9, 10],
    "n2L": 9,
    "n3L": 10,
    "n4L": 0,
    "n5L": 2,
    "n6L": 3,
    "n7L": 5
}, {
    "rootNoteLocation": 7,
    "mode": "DOR",
    "notesLocationList": [7, 9, 10, 0, 2, 4, 5],
    "orderedNotesLocationList": [0, 2, 4, 5, 7, 9, 10],
    "n2L": 9,
    "n3L": 10,
    "n4L": 0,
    "n5L": 2,
    "n6L": 4,
    "n7L": 5
}, {
    "rootNoteLocation": 7,
    "mode": "PHR",
    "notesLocationList": [7, 8, 10, 0, 2, 3, 5],
    "orderedNotesLocationList": [0, 2, 3, 5, 7, 8, 10],
    "n2L": 8,
    "n3L": 10,
    "n4L": 0,
    "n5L": 2,
    "n6L": 3,
    "n7L": 5
}, {
    "rootNoteLocation": 7,
    "mode": "LYD",
    "notesLocationList": [7, 9, 11, 1, 2, 4, 6],
    "orderedNotesLocationList": [1, 2, 4, 6, 7, 9, 11],
    "n2L": 9,
    "n3L": 11,
    "n4L": 1,
    "n5L": 2,
    "n6L": 4,
    "n7L": 6
}, {
    "rootNoteLocation": 7,
    "mode": "MLY",
    "notesLocationList": [7, 9, 11, 0, 2, 4, 5],
    "orderedNotesLocationList": [0, 2, 4, 5, 7, 9, 11],
    "n2L": 9,
    "n3L": 11,
    "n4L": 0,
    "n5L": 2,
    "n6L": 4,
    "n7L": 5
}, {
    "rootNoteLocation": 7,
    "mode": "LOC",
    "notesLocationList": [7, 8, 10, 0, 1, 3, 5],
    "orderedNotesLocationList": [0, 1, 3, 5, 7, 8, 10],
    "n2L": 8,
    "n3L": 10,
    "n4L": 0,
    "n5L": 1,
    "n6L": 3,
    "n7L": 5
}, {
    "rootNoteLocation": 7,
    "mode": "HMIN",
    "notesLocationList": [7, 9, 10, 0, 2, 3, 6],
    "orderedNotesLocationList": [0, 2, 3, 6, 7, 9, 10],
    "n2L": 9,
    "n3L": 10,
    "n4L": 0,
    "n5L": 2,
    "n6L": 3,
    "n7L": 6
}, {
    "rootNoteLocation": 7,
    "mode": "HMAJ",
    "notesLocationList": [7, 9, 11, 0, 2, 3, 6],
    "orderedNotesLocationList": [0, 2, 3, 6, 7, 9, 11],
    "n2L": 9,
    "n3L": 11,
    "n4L": 0,
    "n5L": 2,
    "n6L": 3,
    "n7L": 6
}, {
    "rootNoteLocation": 7,
    "mode": "MMINASC",
    "notesLocationList": [7, 9, 10, 0, 2, 4, 6],
    "orderedNotesLocationList": [0, 2, 4, 6, 7, 9, 10],
    "n2L": 9,
    "n3L": 10,
    "n4L": 0,
    "n5L": 2,
    "n6L": 4,
    "n7L": 6
}, {
    "rootNoteLocation": 7,
    "mode": "MMAJDESC",
    "notesLocationList": [7, 9, 11, 0, 2, 3, 5],
    "orderedNotesLocationList": [0, 2, 3, 5, 7, 9, 11],
    "n2L": 9,
    "n3L": 11,
    "n4L": 0,
    "n5L": 2,
    "n6L": 3,
    "n7L": 5
}, {
    "rootNoteLocation": 8,
    "mode": "MAJ",
    "notesLocationList": [8, 10, 0, 1, 3, 5, 7],
    "orderedNotesLocationList": [0, 1, 3, 5, 7, 8, 10],
    "n2L": 10,
    "n3L": 0,
    "n4L": 1,
    "n5L": 3,
    "n6L": 5,
    "n7L": 7
}, {
    "rootNoteLocation": 8,
    "mode": "MIN",
    "notesLocationList": [8, 10, 11, 1, 3, 4, 6],
    "orderedNotesLocationList": [1, 3, 4, 6, 8, 10, 11],
    "n2L": 10,
    "n3L": 11,
    "n4L": 1,
    "n5L": 3,
    "n6L": 4,
    "n7L": 6
}, {
    "rootNoteLocation": 8,
    "mode": "DOR",
    "notesLocationList": [8, 10, 11, 1, 3, 5, 6],
    "orderedNotesLocationList": [1, 3, 5, 6, 8, 10, 11],
    "n2L": 10,
    "n3L": 11,
    "n4L": 1,
    "n5L": 3,
    "n6L": 5,
    "n7L": 6
}, {
    "rootNoteLocation": 8,
    "mode": "PHR",
    "notesLocationList": [8, 9, 11, 1, 3, 4, 6],
    "orderedNotesLocationList": [1, 3, 4, 6, 8, 9, 11],
    "n2L": 9,
    "n3L": 11,
    "n4L": 1,
    "n5L": 3,
    "n6L": 4,
    "n7L": 6
}, {
    "rootNoteLocation": 8,
    "mode": "LYD",
    "notesLocationList": [8, 10, 0, 2, 3, 5, 7],
    "orderedNotesLocationList": [0, 2, 3, 5, 7, 8, 10],
    "n2L": 10,
    "n3L": 0,
    "n4L": 2,
    "n5L": 3,
    "n6L": 5,
    "n7L": 7
}, {
    "rootNoteLocation": 8,
    "mode": "MLY",
    "notesLocationList": [8, 10, 0, 1, 3, 5, 6],
    "orderedNotesLocationList": [0, 1, 3, 5, 6, 8, 10],
    "n2L": 10,
    "n3L": 0,
    "n4L": 1,
    "n5L": 3,
    "n6L": 5,
    "n7L": 6
}, {
    "rootNoteLocation": 8,
    "mode": "LOC",
    "notesLocationList": [8, 9, 11, 1, 2, 4, 6],
    "orderedNotesLocationList": [1, 2, 4, 6, 8, 9, 11],
    "n2L": 9,
    "n3L": 11,
    "n4L": 1,
    "n5L": 2,
    "n6L": 4,
    "n7L": 6
}, {
    "rootNoteLocation": 8,
    "mode": "HMIN",
    "notesLocationList": [8, 10, 11, 1, 3, 4, 7],
    "orderedNotesLocationList": [1, 3, 4, 7, 8, 10, 11],
    "n2L": 10,
    "n3L": 11,
    "n4L": 1,
    "n5L": 3,
    "n6L": 4,
    "n7L": 7
}, {
    "rootNoteLocation": 8,
    "mode": "HMAJ",
    "notesLocationList": [8, 10, 0, 1, 3, 4, 7],
    "orderedNotesLocationList": [0, 1, 3, 4, 7, 8, 10],
    "n2L": 10,
    "n3L": 0,
    "n4L": 1,
    "n5L": 3,
    "n6L": 4,
    "n7L": 7
}, {
    "rootNoteLocation": 8,
    "mode": "MMINASC",
    "notesLocationList": [8, 10, 11, 1, 3, 5, 7],
    "orderedNotesLocationList": [1, 3, 5, 7, 8, 10, 11],
    "n2L": 10,
    "n3L": 11,
    "n4L": 1,
    "n5L": 3,
    "n6L": 5,
    "n7L": 7
}, {
    "rootNoteLocation": 8,
    "mode": "MMAJDESC",
    "notesLocationList": [8, 10, 0, 1, 3, 4, 6],
    "orderedNotesLocationList": [0, 1, 3, 4, 6, 8, 10],
    "n2L": 10,
    "n3L": 0,
    "n4L": 1,
    "n5L": 3,
    "n6L": 4,
    "n7L": 6
}, {
    "rootNoteLocation": 9,
    "mode": "MAJ",
    "notesLocationList": [9, 11, 1, 2, 4, 6, 8],
    "orderedNotesLocationList": [1, 2, 4, 6, 8, 9, 11],
    "n2L": 11,
    "n3L": 1,
    "n4L": 2,
    "n5L": 4,
    "n6L": 6,
    "n7L": 8
}, {
    "rootNoteLocation": 9,
    "mode": "MIN",
    "notesLocationList": [9, 11, 0, 2, 4, 5, 7],
    "orderedNotesLocationList": [0, 2, 4, 5, 7, 9, 11],
    "n2L": 11,
    "n3L": 0,
    "n4L": 2,
    "n5L": 4,
    "n6L": 5,
    "n7L": 7
}, {
    "rootNoteLocation": 9,
    "mode": "DOR",
    "notesLocationList": [9, 11, 0, 2, 4, 6, 7],
    "orderedNotesLocationList": [0, 2, 4, 6, 7, 9, 11],
    "n2L": 11,
    "n3L": 0,
    "n4L": 2,
    "n5L": 4,
    "n6L": 6,
    "n7L": 7
}, {
    "rootNoteLocation": 9,
    "mode": "PHR",
    "notesLocationList": [9, 10, 0, 2, 4, 5, 7],
    "orderedNotesLocationList": [0, 2, 4, 5, 7, 9, 10],
    "n2L": 10,
    "n3L": 0,
    "n4L": 2,
    "n5L": 4,
    "n6L": 5,
    "n7L": 7
}, {
    "rootNoteLocation": 9,
    "mode": "LYD",
    "notesLocationList": [9, 11, 1, 3, 4, 6, 8],
    "orderedNotesLocationList": [1, 3, 4, 6, 8, 9, 11],
    "n2L": 11,
    "n3L": 1,
    "n4L": 3,
    "n5L": 4,
    "n6L": 6,
    "n7L": 8
}, {
    "rootNoteLocation": 9,
    "mode": "MLY",
    "notesLocationList": [9, 11, 1, 2, 4, 6, 7],
    "orderedNotesLocationList": [1, 2, 4, 6, 7, 9, 11],
    "n2L": 11,
    "n3L": 1,
    "n4L": 2,
    "n5L": 4,
    "n6L": 6,
    "n7L": 7
}, {
    "rootNoteLocation": 9,
    "mode": "LOC",
    "notesLocationList": [9, 10, 0, 2, 3, 5, 7],
    "orderedNotesLocationList": [0, 2, 3, 5, 7, 9, 10],
    "n2L": 10,
    "n3L": 0,
    "n4L": 2,
    "n5L": 3,
    "n6L": 5,
    "n7L": 7
}, {
    "rootNoteLocation": 9,
    "mode": "HMIN",
    "notesLocationList": [9, 11, 0, 2, 4, 5, 8],
    "orderedNotesLocationList": [0, 2, 4, 5, 8, 9, 11],
    "n2L": 11,
    "n3L": 0,
    "n4L": 2,
    "n5L": 4,
    "n6L": 5,
    "n7L": 8
}, {
    "rootNoteLocation": 9,
    "mode": "HMAJ",
    "notesLocationList": [9, 11, 1, 2, 4, 5, 8],
    "orderedNotesLocationList": [1, 2, 4, 5, 8, 9, 11],
    "n2L": 11,
    "n3L": 1,
    "n4L": 2,
    "n5L": 4,
    "n6L": 5,
    "n7L": 8
}, {
    "rootNoteLocation": 9,
    "mode": "MMINASC",
    "notesLocationList": [9, 11, 0, 2, 4, 6, 8],
    "orderedNotesLocationList": [0, 2, 4, 6, 8, 9, 11],
    "n2L": 11,
    "n3L": 0,
    "n4L": 2,
    "n5L": 4,
    "n6L": 6,
    "n7L": 8
}, {
    "rootNoteLocation": 9,
    "mode": "MMAJDESC",
    "notesLocationList": [9, 11, 1, 2, 4, 5, 7],
    "orderedNotesLocationList": [1, 2, 4, 5, 7, 9, 11],
    "n2L": 11,
    "n3L": 1,
    "n4L": 2,
    "n5L": 4,
    "n6L": 5,
    "n7L": 7
}, {
    "rootNoteLocation": 10,
    "mode": "MAJ",
    "notesLocationList": [10, 0, 2, 3, 5, 7, 9],
    "orderedNotesLocationList": [0, 2, 3, 5, 7, 9, 10],
    "n2L": 0,
    "n3L": 2,
    "n4L": 3,
    "n5L": 5,
    "n6L": 7,
    "n7L": 9
}, {
    "rootNoteLocation": 10,
    "mode": "MIN",
    "notesLocationList": [10, 0, 1, 3, 5, 6, 8],
    "orderedNotesLocationList": [0, 1, 3, 5, 6, 8, 10],
    "n2L": 0,
    "n3L": 1,
    "n4L": 3,
    "n5L": 5,
    "n6L": 6,
    "n7L": 8
}, {
    "rootNoteLocation": 10,
    "mode": "DOR",
    "notesLocationList": [10, 0, 1, 3, 5, 7, 8],
    "orderedNotesLocationList": [0, 1, 3, 5, 7, 8, 10],
    "n2L": 0,
    "n3L": 1,
    "n4L": 3,
    "n5L": 5,
    "n6L": 7,
    "n7L": 8
}, {
    "rootNoteLocation": 10,
    "mode": "PHR",
    "notesLocationList": [10, 11, 1, 3, 5, 6, 8],
    "orderedNotesLocationList": [1, 3, 5, 6, 8, 10, 11],
    "n2L": 11,
    "n3L": 1,
    "n4L": 3,
    "n5L": 5,
    "n6L": 6,
    "n7L": 8
}, {
    "rootNoteLocation": 10,
    "mode": "LYD",
    "notesLocationList": [10, 0, 2, 4, 5, 7, 9],
    "orderedNotesLocationList": [0, 2, 4, 5, 7, 9, 10],
    "n2L": 0,
    "n3L": 2,
    "n4L": 4,
    "n5L": 5,
    "n6L": 7,
    "n7L": 9
}, {
    "rootNoteLocation": 10,
    "mode": "MLY",
    "notesLocationList": [10, 0, 2, 3, 5, 7, 8],
    "orderedNotesLocationList": [0, 2, 3, 5, 7, 8, 10],
    "n2L": 0,
    "n3L": 2,
    "n4L": 3,
    "n5L": 5,
    "n6L": 7,
    "n7L": 8
}, {
    "rootNoteLocation": 10,
    "mode": "LOC",
    "notesLocationList": [10, 11, 1, 3, 4, 6, 8],
    "orderedNotesLocationList": [1, 3, 4, 6, 8, 10, 11],
    "n2L": 11,
    "n3L": 1,
    "n4L": 3,
    "n5L": 4,
    "n6L": 6,
    "n7L": 8
}, {
    "rootNoteLocation": 10,
    "mode": "HMIN",
    "notesLocationList": [10, 0, 1, 3, 5, 6, 9],
    "orderedNotesLocationList": [0, 1, 3, 5, 6, 9, 10],
    "n2L": 0,
    "n3L": 1,
    "n4L": 3,
    "n5L": 5,
    "n6L": 6,
    "n7L": 9
}, {
    "rootNoteLocation": 10,
    "mode": "HMAJ",
    "notesLocationList": [10, 0, 2, 3, 5, 6, 9],
    "orderedNotesLocationList": [0, 2, 3, 5, 6, 9, 10],
    "n2L": 0,
    "n3L": 2,
    "n4L": 3,
    "n5L": 5,
    "n6L": 6,
    "n7L": 9
}, {
    "rootNoteLocation": 10,
    "mode": "MMINASC",
    "notesLocationList": [10, 0, 1, 3, 5, 7, 9],
    "orderedNotesLocationList": [0, 1, 3, 5, 7, 9, 10],
    "n2L": 0,
    "n3L": 1,
    "n4L": 3,
    "n5L": 5,
    "n6L": 7,
    "n7L": 9
}, {
    "rootNoteLocation": 10,
    "mode": "MMAJDESC",
    "notesLocationList": [10, 0, 2, 3, 5, 6, 8],
    "orderedNotesLocationList": [0, 2, 3, 5, 6, 8, 10],
    "n2L": 0,
    "n3L": 2,
    "n4L": 3,
    "n5L": 5,
    "n6L": 6,
    "n7L": 8
}, {
    "rootNoteLocation": 11,
    "mode": "MAJ",
    "notesLocationList": [11, 1, 3, 4, 6, 8, 10],
    "orderedNotesLocationList": [1, 3, 4, 6, 8, 10, 11],
    "n2L": 1,
    "n3L": 3,
    "n4L": 4,
    "n5L": 6,
    "n6L": 8,
    "n7L": 10
}, {
    "rootNoteLocation": 11,
    "mode": "MIN",
    "notesLocationList": [11, 1, 2, 4, 6, 7, 9],
    "orderedNotesLocationList": [1, 2, 4, 6, 7, 9, 11],
    "n2L": 1,
    "n3L": 2,
    "n4L": 4,
    "n5L": 6,
    "n6L": 7,
    "n7L": 9
}, {
    "rootNoteLocation": 11,
    "mode": "DOR",
    "notesLocationList": [11, 1, 2, 4, 6, 8, 9],
    "orderedNotesLocationList": [1, 2, 4, 6, 8, 9, 11],
    "n2L": 1,
    "n3L": 2,
    "n4L": 4,
    "n5L": 6,
    "n6L": 8,
    "n7L": 9
}, {
    "rootNoteLocation": 11,
    "mode": "PHR",
    "notesLocationList": [11, 0, 2, 4, 6, 7, 9],
    "orderedNotesLocationList": [0, 2, 4, 6, 7, 9, 11],
    "n2L": 0,
    "n3L": 2,
    "n4L": 4,
    "n5L": 6,
    "n6L": 7,
    "n7L": 9
}, {
    "rootNoteLocation": 11,
    "mode": "LYD",
    "notesLocationList": [11, 1, 3, 5, 6, 8, 10],
    "orderedNotesLocationList": [1, 3, 5, 6, 8, 10, 11],
    "n2L": 1,
    "n3L": 3,
    "n4L": 5,
    "n5L": 6,
    "n6L": 8,
    "n7L": 10
}, {
    "rootNoteLocation": 11,
    "mode": "MLY",
    "notesLocationList": [11, 1, 3, 4, 6, 8, 9],
    "orderedNotesLocationList": [1, 3, 4, 6, 8, 9, 11],
    "n2L": 1,
    "n3L": 3,
    "n4L": 4,
    "n5L": 6,
    "n6L": 8,
    "n7L": 9
}, {
    "rootNoteLocation": 11,
    "mode": "LOC",
    "notesLocationList": [11, 0, 2, 4, 5, 7, 9],
    "orderedNotesLocationList": [0, 2, 4, 5, 7, 9, 11],
    "n2L": 0,
    "n3L": 2,
    "n4L": 4,
    "n5L": 5,
    "n6L": 7,
    "n7L": 9
}, {
    "rootNoteLocation": 11,
    "mode": "HMIN",
    "notesLocationList": [11, 1, 2, 4, 6, 7, 10],
    "orderedNotesLocationList": [1, 2, 4, 6, 7, 10, 11],
    "n2L": 1,
    "n3L": 2,
    "n4L": 4,
    "n5L": 6,
    "n6L": 7,
    "n7L": 10
}, {
    "rootNoteLocation": 11,
    "mode": "HMAJ",
    "notesLocationList": [11, 1, 3, 4, 6, 7, 10],
    "orderedNotesLocationList": [1, 3, 4, 6, 7, 10, 11],
    "n2L": 1,
    "n3L": 3,
    "n4L": 4,
    "n5L": 6,
    "n6L": 7,
    "n7L": 10
}, {
    "rootNoteLocation": 11,
    "mode": "MMINASC",
    "notesLocationList": [11, 1, 2, 4, 6, 8, 10],
    "orderedNotesLocationList": [1, 2, 4, 6, 8, 10, 11],
    "n2L": 1,
    "n3L": 2,
    "n4L": 4,
    "n5L": 6,
    "n6L": 8,
    "n7L": 10
}, {
    "rootNoteLocation": 11,
    "mode": "MMAJDESC",
    "notesLocationList": [11, 1, 3, 4, 6, 7, 9],
    "orderedNotesLocationList": [1, 3, 4, 6, 7, 9, 11],
    "n2L": 1,
    "n3L": 3,
    "n4L": 4,
    "n5L": 6,
    "n6L": 7,
    "n7L": 9
}];
const findChordInScale = (locationListOfChord, limitMode) => {
    let findScaleHandle = collect(findScale).filter((x) => {
        return intersection(x.notesLocationList, locationListOfChord).length === locationListOfChord.length;
    });
    if (isString(limitMode)) {
        findScaleHandle = findScaleHandle.filter((x) => {
            return x.mode === limitMode;
        });
    } else if (isArray(limitMode)) {
        findScaleHandle = findScaleHandle.filter((x) => {
            return limitMode.includes(x.mode);
        });
    }
    const findScaleObj = findScaleHandle.all();
    if (isEmpty(findScaleObj))
        return [];
    return findScaleObj;
};
const getChordSymbolByKey = (k) => {
    return collect(chordMeta).where("chordKey", k).first().scoreDisplay;
};
const getChordCnNameByKey = (k) => {
    return collect(chordMeta).where("chordKey", k).first().cnName;
};
const findNotesInChord = (notesList) => {
    let findHandle = collect(findChordMeta);
    for (const x of notesList) {
        if ([2, 9].includes(x.as)) {
            findHandle = findHandle.where("n9L", x.location);
        } else if ([3, 10].includes(x.as)) {
            findHandle = findHandle.where("n3L", x.location);
        } else if ([4, 11].includes(x.as)) {
            findHandle = findHandle.where("n11L", x.location);
        } else if ([5, 12].includes(x.as)) {
            findHandle = findHandle.where("n5L", x.location);
        } else if ([6, 13].includes(x.as)) {
            findHandle = findHandle.where("n13L", x.location);
        } else if ([6, 13].includes(x.as)) {
            findHandle = findHandle.where("n13L", x.location);
        } else if ([7, 14].includes(x.as)) {
            findHandle = findHandle.where("n7L", x.location);
        } else if ([8, 1].includes(x.as)) {
            findHandle = findHandle.where("rootNoteLocation", x.location);
        }
    }
    const findObj = findHandle.all();
    if (isEmpty(findObj))
        return [];
    return findObj;
};
const chord = {
    Chord,
    chordMeta,
    findChord,
    findChordInScale,
    getChordSymbolByKey,
    getChordCnNameByKey,
    findNotesInChord
};
const findNotesInScale = (notesList) => {
    let findHandle = collect(findScale);
    for (const x of notesList) {
        if ([0, 1, 8].includes(x.as)) {
            findHandle = findHandle.where("rootNoteLocation", x.location);
        } else if ([2, 9].includes(x.as)) {
            findHandle = findHandle.where("n2L", x.location);
        } else if ([3, 10].includes(x.as)) {
            findHandle = findHandle.where("n3L", x.location);
        } else if ([4, 11].includes(x.as)) {
            findHandle = findHandle.where("n4L", x.location);
        } else if ([5, 12].includes(x.as)) {
            findHandle = findHandle.where("n5L", x.location);
        } else if ([6, 13].includes(x.as)) {
            findHandle = findHandle.where("n6L", x.location);
        } else if ([7, 14].includes(x.as)) {
            findHandle = findHandle.where("n7L", x.location);
        }
    }
    const findObj = findHandle.all();
    if (isEmpty(findObj))
        return [];
    return findObj;
};
const find = {
    findChord,
    findNotesInChord,
    findNotesInScale
};
const index = {
    note,
    interval,
    scale,
    stave,
    Radix,
    circleOfFifths,
    factory,
    chord,
    find
};
export {chord, circleOfFifths, index as default, factory, interval, note, scale, stave};
