import useScoreHelperConfig from "@/assets/stores/useScoreHelperConfig.ts";
import {useMemo} from "react";
import * as music12 from "@/music12";

const useScaleByStaveAlter = () => {
  const {staveAlters, isStaveSharp} = useScoreHelperConfig();
  return useMemo(() => {
    const staveAlter = isStaveSharp ? staveAlters : -1 * staveAlters
    const rawList = music12.stave.getScaleByStaveAlters(staveAlter);
    const result = {maj: {}, min: {}}
    rawList.map(x => {
      if (x.mode === "major") {
        result.maj = x
      } else {
        result.min = x
      }
    })
    return result
  }, [isStaveSharp, staveAlters])
}

export default useScaleByStaveAlter
