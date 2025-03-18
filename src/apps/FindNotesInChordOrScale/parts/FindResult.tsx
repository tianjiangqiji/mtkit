/* eslint-disable no-mixed-spaces-and-tabs */
import {css} from "@emotion/react";
import useFindChord from "@/apps/FindNotesInChordOrScale/useFindChord.tsx";
import cssPresets from "@/assets/styles/cssPresets.ts";
import googleColors from "@/assets/colors/googleColors.ts";
import useFindChordConfig from "@/assets/stores/useFindChordConfig.ts";
import NoResult from "@/apps/FindNotesInChordOrScale/components/NoResult.tsx";
import FindOnlyChord from "@/apps/FindNotesInChordOrScale/components/FindOnlyChord.tsx";
import FindChordInScale from "@/apps/FindNotesInChordOrScale/components/FindChordInScale.tsx";


const FindResult = () => {
  const {findResult, findInScaleResult} = useFindChord()
  const {isFindChordInScale} = useFindChordConfig()
  if (isFindChordInScale) {
    if (findInScaleResult.length === 0) return <NoResult/>
    return <FindChordInScale/>
  }
  if (findResult.length === 0) return <NoResult/>
  return <FindOnlyChord/>
}

export default FindResult


