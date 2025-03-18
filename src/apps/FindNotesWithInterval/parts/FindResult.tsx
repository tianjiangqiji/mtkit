/* eslint-disable no-mixed-spaces-and-tabs */
import {css} from "@emotion/react";
import useFindChord from "@/apps/FindNotesInChordOrScale/useFindChord.tsx";
import cssPresets from "@/assets/styles/cssPresets.ts";
import googleColors from "@/assets/colors/googleColors.ts";
import useFindChordConfig from "@/assets/stores/useFindChordConfig.ts";
import FindOnlyChord from "@/apps/FindNotesInChordOrScale/components/FindOnlyChord.tsx";
import NoResult from "@/apps/FindNotesWithInterval/components/NoResult.tsx";
import FindNotesOfChord from "@/apps/FindNotesWithInterval/components/FindNotesOfChord.tsx";
import FindNotesOfScale from "@/apps/FindNotesWithInterval/components/FindNotesOfScale.tsx";


const FindResult = () => {
  const {findResult, findInScaleResult} = useFindChord()
  const {isFindChordInScale,} = useFindChordConfig()
  if (isFindChordInScale) return <FindNotesOfScale/>
  // if (isFindChordInScale) {
  //   if (findInScaleResult.length === 0) return <NoResult/>
  //   return <FindChordInScale/>
  // }
  // if (findResult.length === 0) return <NoResult/>
  return <FindNotesOfChord/>
}

export default FindResult


