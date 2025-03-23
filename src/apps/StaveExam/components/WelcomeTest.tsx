/* eslint-disable no-mixed-spaces-and-tabs */
import {css} from "@emotion/react";
import {Button} from "antd-mobile";
import cssPresets from "@/assets/styles/cssPresets.ts";
import useGlobalSettings from "@/assets/stores/useGlobalSettings.ts";
import useExamConfig from "@/assets/stores/useExamConfig.ts";


const WelcomeTest = () => {
  const {naviBarHeight} = useGlobalSettings()
  const {setIsWelcome} = useExamConfig()
  return <>
    <div css={WelcomeTest_css(naviBarHeight)}>
      欢迎测试
      <Button onClick={() => setIsWelcome(false)}>开始测试</Button>
    </div>
  </>
}

export default WelcomeTest

const WelcomeTest_css = (naviBarHeight: number) => css({
  ...cssPresets.flexCenterTopColumn as any,
  width: "100%",
  height: `calc(100vh - ${naviBarHeight}px)`,
})
