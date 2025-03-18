import NoteSymbol from "@/components/reNote/NoteSymbol/NoteSymbol.tsx";
import byDefault from "@/utils/byDefault.ts";
import googleColors from "@/assets/colors/googleColors.ts";
import ClefWindow from "@/components/reStave/ClefWindow/ClefWindow.tsx";
import {css} from "@emotion/react";
import cssPresets from "@/assets/styles/cssPresets.ts";
import NoteText from "@/components/reNote/NoteText/NoteText.tsx";
import {useMemo} from "react";
import music12 from "music12";
import useScoreHelperConfig from "@/assets/stores/useScoreHelperConfig.ts";

const AlterStaveWindow = (props: {
  staveAlters: number;
  isStaveSharp: boolean;
  color?: string;
  keySig?: number;
}) => {
  const staveAlters = byDefault(props.staveAlters, 0);
  const isStaveSharp = byDefault(props.isStaveSharp, true);
  const alterColor = byDefault(props.color, googleColors.blue800)
  const keySig = byDefault(props.keySig, 0)
  const {clef, setClef} = useScoreHelperConfig();
  const changeClef = () => {
    if (clef === "G") return setClef("M")
    if (clef === "M") return setClef("F")
    if (clef === "F") return setClef("G")
    setClef("G")
  }
  const alteredNotes = useMemo(() => {
    return music12.stave.getAlterStepListByNum(isStaveSharp ? staveAlters : -1 * staveAlters)
  }, [isStaveSharp, staveAlters])
  const alteredNotesFontSize = () => {
    if (alteredNotes.length < 5) return 25
    if (alteredNotes.length === 5) return 20
    if (alteredNotes.length === 6) return 18
    if (alteredNotes.length === 7) return 16
  }
  const alteredNotesGap = () => {
    if (alteredNotes.length <= 4) return 25
    if (alteredNotes.length === 5) return 20
    if (alteredNotes.length === 6) return 16
    if (alteredNotes.length === 7) return 14
  }

  return < div css={alter_stave_window_css}>
    <div className="description">
      {staveAlters === 0 && "无升/降号"}
      {staveAlters !== 0 && `${Math.abs(staveAlters)}个${isStaveSharp ? "升" : "降"}号`}
      <div className="alters">
        {(staveAlters !== 0 && isStaveSharp) && <NoteSymbol alter={1} color={alterColor}/>}
        {(staveAlters !== 0 && !isStaveSharp) && <NoteSymbol alter={-1} color={alterColor}/>}
        {(staveAlters === 0) && <NoteSymbol alter={0} color={alterColor}/>}
      </div>
    </div>
    <div className="stave_frame" onClick={changeClef}>
      <ClefWindow clef={clef} keySignature={keySig}/>
    </div>
    <div className="altered_notes_frame" style={{
      ...cssPresets.flexCenter, width: 220, flexWrap: "wrap",
      gap: alteredNotesGap()
    }}>
      {alteredNotes.length > 0 && alteredNotes.map((x, i) => {
        return <div className="each" key={i}>
          <NoteText step={x} alter={isStaveSharp ? 1 : -1} fontSize={alteredNotesFontSize()}
                    color={googleColors.gray600}/>
        </div>
      })}
      {alteredNotes.length === 0 && <div style={{fontFamily: "misans-m", color: googleColors.gray600}}>无升降</div>}
    </div>
  </div>
}
export default AlterStaveWindow;

const alter_stave_window_css = css({
  "& .description": {
    fontFamily: "misans-m",
    fontSize: 30,
    height: 40, marginBottom: 8,
    color: googleColors.blue800,
    textAlign: "center",
    ...cssPresets.flexCenter,
    "& .alters": {
      height: 25,
      width: 20,
      marginLeft: 15
    }
  },
  "& .stave_frame": {
    marginBottom: 20,
    width: "100%",
    ...cssPresets.flexCenter,
  },
  "& .altered_notes_frame": {
    fontFamily: "misans-m",
    // ...cssPresets.flexCenter,
    marginBottom: 20,
    // gap: 20,
  }
})