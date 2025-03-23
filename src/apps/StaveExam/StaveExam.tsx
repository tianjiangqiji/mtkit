/* eslint-disable no-mixed-spaces-and-tabs */
import {css} from "@emotion/react";
import WelcomeTest from "@/apps/StaveExam/components/WelcomeTest.tsx";
import useExamConfig from "@/assets/stores/useExamConfig.ts";


const StaveExam = () => {
  const {isWelcome} = useExamConfig()
  return <>
    <div css={StaveExam_css}>
      {isWelcome && <WelcomeTest/>}

    </div>
  </>
}

export default StaveExam

const StaveExam_css = css({})
