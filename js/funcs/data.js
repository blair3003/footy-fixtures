import TEST_DATA from '../data/test.js'
import {
	fetchFixtures,
	fetchFixturesWithIds
} from './api.js'

const getLocalFixtures = () => {
	console.log('Getting local data')
	const data = JSON.parse(localStorage.getItem('footy-fixtures'))
	return data?.fixtures
}

const setLocalFixtures = (fixtures) => {
	console.log('Setting local data')
	const data = { ts: Date.now(), fixtures }
	localStorage.setItem('footy-fixtures', JSON.stringify(data))
}

const isDataStale = () => {
	console.log('Checking data is from today')
	const data = JSON.parse(localStorage.getItem('footy-fixtures'))
	if (!data?.ts) return true
	return !isDateToday(data.ts)
}

const isDateToday = (ts) => {
	const today = new Date().setHours(0, 0, 0, 0)
	const date = new Date(ts).setHours(0, 0, 0, 0)
	return date === today
}

const isMatchOngoing = (status) => {
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

const getFixtures = async () => {
	console.log('Getting new data')
	// Fetch fixtures list
	const fixtures = await fetchFixtures()
	// const fixtures = TEST_DATA
	// Set local data with fetched fixtures list
	setLocalFixtures(fixtures)
	// Return fixtures list
	return fixtures
}

const updateTodaysFixtures = async (fixtures) => {
	console.log('Updating todays fixtures')
	// Get list of todays ongoing fixtures
	const todays = fixtures.filter(
		obj =>
			isDateToday(obj.fixture.timestamp * 1000)
		&&	isMatchOngoing(obj.fixture.status.short)
	)
	// If no fixtures today, early return
	if (!todays.length) {
		console.log('No fixtures today')
		return fixtures
	}
	// Get list of ids of todays fixtures
	const todaysIds = todays.map(obj => obj.fixture.id).slice(0, 20) // Slice to 20 because api only allows query on 20 ids max
	console.log(`${todaysIds.length} fixture(s) to update`)
	// Fetch updated fixtures
	const todaysFixtures = await fetchFixturesWithIds(todaysIds)
	// Create list without todays fixtures
	const withoutTodays = fixtures.filter(obj => !todaysIds.includes(obj.fixture.id))
	// Spread without todays list with todays list into new fixtures list
	const updatedFixtures = [...withoutTodays, ...todaysFixtures]
	// Set local data with updated fixtures list
	setLocalFixtures(updatedFixtures)
	// Return updated fixtures list
	return updatedFixtures
}

export const loadFixtures = async () => {
	// Get fixtures stored locally
	let fixtures = getLocalFixtures()
	// Check data is at least from today
	const stale = isDataStale()
	// If there is no data, or data was last updated before today, get new data
	if (!fixtures || stale) {
		console.log('Data is missing or stale!')
		fixtures = await getFixtures()
	}
	// Update todays fixtures
	fixtures = await updateTodaysFixtures(fixtures)
}
