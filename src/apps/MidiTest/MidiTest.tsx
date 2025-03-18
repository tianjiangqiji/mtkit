import React from 'react';
import {css} from "@emotion/react";
import cssPresets from "@/assets/styles/cssPresets.ts";
import googleColors from "@/assets/colors/googleColors.ts";


const MidiTest = () => {

  return <div css={miditest_css}>
    敬请期待...
  </div>;
};

export default MidiTest;

const miditest_css = css({
  ...cssPresets.flexCenter,
  fontSize:20,
  color:googleColors.gray600,
  height:"calc(20vh)"
})