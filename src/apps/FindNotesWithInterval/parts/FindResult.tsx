/* eslint-disable no-mixed-spaces-and-tabs */
import useFindChordConfig from "@/assets/stores/useFindChordConfig.ts";
import FindNotesOfChord from "@/apps/FindNotesWithInterval/components/FindNotesOfChord.tsx";
import FindNotesOfScale from "@/apps/FindNotesWithInterval/components/FindNotesOfScale.tsx";


const FindResult = () => {
  const {isFindChordInScale,} = useFindChordConfig()
  if (isFindChordInScale) return <FindNotesOfScale/>
  return <FindNotesOfChord/>
}

export default FindResult


