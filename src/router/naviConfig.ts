// noinspection ES6PreferShortImport
import about_svg from "@/router/svgComps/about_svg.svg"
import scales_svg from "@/router/svgComps/scale_svg.svg"
import chord_svg from "@/router/svgComps/chord_svg.svg"
import find_notes_svg from "@/router/svgComps/findNotes_svg.svg"
import keys_svg from "@/router/svgComps/keys_svg.svg"
import find_notes_itv_svg from "@/router/svgComps/findNotesWithInterval_svg.svg"
import author_svg from "@/router/svgComps/author_svg.svg"
import series_svg from "@/router/svgComps/series_svg.svg"
import temp251_svg from "@/router/svgComps/temp251_svg.svg"
import midi_svg from "@/router/svgComps/midi_svg.svg"
import exam_svg from "@/router/svgComps/exam_svg.svg"
import score_svg from "@/router/svgComps/score_svg.svg"
import circle_svg from "@/router/svgComps/circle_svg.svg"
import interval_svg from "@/router/svgComps/interval_svg.svg"
import routerPath from "./routerPath.ts";

export default [
  {
    link: `/${routerPath.interval}`,
    title: "音程查询",
    subtitle: "给定音程查音符/查询两音音程",
    imgURL: find_notes_itv_svg,
    type: "all"
  },
  {
    link: `/${routerPath.tablet_scaleQuery}`,
    title: "音阶详情",
    subtitle: "调式音阶信息/通过调号查调式",
    imgURL: scales_svg,
    type: "tablet"
  },
  {
    link: `/${routerPath.mobile_ksQuery}`,
    title: "音阶升降号查询",
    subtitle: "给定升降号数量查询音阶/反查",
    imgURL: keys_svg,
    type: "mobile"
  },

  {
    link: `/${routerPath.mobile_scaleTable}`,
    title: "音阶详情",
    subtitle: "调式音阶信息/通过调号查调式",
    imgURL: scales_svg,
    type: "mobile"
  },
  {
    link: `/${routerPath.chordDisplay}`,
    title: "和弦详情",
    subtitle: "给定和弦类型查看和弦信息",
    type: "all",
    imgURL: chord_svg,
  },
  {
    link: `/${routerPath.mobile_scoreChecker}`,
    title: "识谱辅助",
    subtitle: "识别谱面并与钢琴键盘对应",
    imgURL: score_svg,
    type: "all"
  },
  {
    link: `/${routerPath.findNotes}`,
    title: "音符辞典",
    subtitle: "查找音符所在的和弦或音阶",
    type: "all",
    imgURL: find_notes_svg,
  },
  {
    link: `/${routerPath.findNotesWithInterval}`,
    title: "音程辞典",
    subtitle: "查找音程所在的和弦或音阶",
    imgURL: interval_svg,
    type: "all"
  },


  {
    link: `/${routerPath.circle}`,
    title: "五度圈",
    subtitle: "可带有指针或旋转功能",
    imgURL: circle_svg,
    type: "all"
  },
  {
    link: `/${routerPath.temp251}`,
    title: "251查询",
    subtitle: "给定任意音符给出251进行",
    imgURL: temp251_svg,
    type: "all"
  },
  {
    link: `/${routerPath.harmonicSeries}`,
    title: "泛音列",
    subtitle: "可比较多个音符的泛音列",
    imgURL: series_svg,
    type: "all"
  },
  // {
  //   link: `/${routerPath.staveExam}`,
  //   title: "识谱小测试",
  //   subtitle: "可用来随机出题巩固记忆",
  //   imgURL: exam_svg,
  //   type: "all"
  // },
  // {
  //   link: `/${routerPath.midi}`,
  //   title: "MIDI信号",
  //   subtitle: "收发MIDI信号(部分设备支持)",
  //   imgURL: midi_svg,
  //   type: "all"
  // },
  {
    link: `/${routerPath.about}`,
    title: "关于项目",
    subtitle: "项目介绍/引用库说明",
    imgURL: about_svg,
    type: "all"
  }, {
    link: `/${routerPath.author}`,
    title: "关于作者",
    subtitle: "作者介绍/联系开发者",
    imgURL: author_svg,
    type: "all"
  },
]
