export const isDateToday = (ts) => {
	const today = new Date().setHours(0, 0, 0, 0)
	const date = new Date(ts).setHours(0, 0, 0, 0)
	return date === today
}

export const isMatchOngoing = (status) => {
	const ongoingStatus = [
		"TBD",
		"NS",
		"1H",
		"HT",
		"2H",
		"ET",
		"BT",
		"P",
		"SUSP",
		"INT",
		"LIVE",
	]
	return ongoingStatus.includes(status)
}