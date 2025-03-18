import {useMemo} from "react";
import getAlterText from "@/apps/MobileKSQuery/useMobileKs/getAlterText.ts";
import useScaleByStaveAlter from "@/apps/MobileKSQuery/useMobileKs/useScaleByStaveAlter.ts";
import {isEmpty} from "lodash";

const useKeySig = () => {
  const scaleByStaveAlter = useScaleByStaveAlter()
  console.log(scaleByStaveAlter)
  if (isEmpty(scaleByStaveAlter.maj)) throw new Error("Major scale is required.")
  if (isEmpty(scaleByStaveAlter.min)) throw new Error("Minor Scale is required.")
  return useMemo(() => {
    return `${scaleByStaveAlter.maj["rawNoteStep"]}${getAlterText(scaleByStaveAlter.maj["rawNoteAlter"])}`
  }, [scaleByStaveAlter])
}
export default useKeySig