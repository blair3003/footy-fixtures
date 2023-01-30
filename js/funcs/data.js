import TEST_DATA from '../data/test.js'
import {
	fetchFixtures,
	fetchFixturesWithIds
} from './api.js'
import {
	displayFixtures
} from './dom.js'
import {
	isDateToday,
	isMatchOngoing
} from './helper.js'
import FootyFixtures from "../class/FootyFixtures.js"

const footyFixtures = FootyFixtures.instance

const getLocalFixtures = () => {
	console.log('Getting local data')
	// Get data from local storage
	const data = JSON.parse(localStorage.getItem('footy-fixtures'))
	// If no data, timestamp or timestamp is before today, early return
	if (!data || !data?.ts || !isDateToday(data.ts)) return
	return data?.fixtures
}

const setLocalFixtures = (fixtures) => {
	console.log('Setting local data')
	// Set data object with timestamp and fixtures
	const data = { ts: Date.now(), fixtures }
	// Store data object locally
	localStorage.setItem('footy-fixtures', JSON.stringify(data))
}

const getNewFixtures = async () => {
	console.log('Getting new data')
	// Fetch fixtures list
	const fixtures = await fetchFixtures()
	// const fixtures = TEST_DATA
	// Set local data with fetched fixtures list
	setLocalFixtures(fixtures)
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
	if (!todays?.length) {
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
	return updatedFixtures
}

const getFixtures = async () => {
	// Get fixtures stored locally
	let fixtures = getLocalFixtures()
	// Check fixtures data
	if (!fixtures) {
		// If there is no data, get new data
		fixtures = await getNewFixtures()
	} else {
		// Else just update todays fixtures
		fixtures = await updateTodaysFixtures(fixtures)
	}
	return fixtures
}

export const loadFixtures = async () => {
	// Get fixtures
	const fixtures = await getFixtures()

	// Update state and display
	if (fixtures) {
		displayFixtures()
	}		
}
