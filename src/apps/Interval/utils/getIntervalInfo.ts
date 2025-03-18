const chineseNumList = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十"];
const getIntervalInfo = (prefix: string, num: number) => {
	return `${prefix}${chineseNumList[num]}度`;
}

export default getIntervalInfo;
