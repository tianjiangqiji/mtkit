// noinspection ES6PreferShortImport

const getAlterText = (alterNum: number) => {
	if (alterNum === 0) return ""
	if (alterNum === 1) return "#"
	if (alterNum === -1) return "b"
	throw new Error("alterNum must be 0, 1 or -1")
}

export default getAlterText
