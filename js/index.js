import { API_FOOTBALL_KEY } from './funcs/api.js'
import {
	getLocalData,
	getNewData,
	isDataStale
} from './funcs/data.js'
import {
	fetchFixturesWithIds
} from './funcs/api.js'

console.log("%cFooty Fixtures ⚽", "color:blue; font-size:16px")
console.log("//////////////////")

console.log(`API Key: ${API_FOOTBALL_KEY}`)
console.log("//////////////////")

const app = () => {

	// Get the fixture list
	// 1. Get local data from storage
	let data = getLocalData()

	// 2. Check if local data is stale
	const stale = isDataStale(data)

	// 3. If no local data or data is stale, get new data
	if (!data || stale) {
		console.log('Data is missing or stale!')
		data = getNewData()
	}

	console.log(data)



	// Check todays fixtures



	// Filter fixtures to only those before todays date and time, and status set to NS

	const notStarted = data.fixtures.filter(
		obj =>
			obj.fixture.status.short === 'NS'
		// &&	obj.fixture.timestamp * 1000 < Date.now()
	)

	console.log('notStarted')
	console.log(notStarted)


	// If any not started before current time:
	//// Get todays fixtures

	////// Fixture ids

	const notStartedIds = notStarted.map(obj => obj.fixture.id)

	////// Call to api for fixtures

	// const updatedNotStartedFixtures = fetchFixturesWithIds(notStartedIds)
	const updatedNotStartedFixtures = notStarted

	// console.log('updatedNotStartedFixtures')
	// console.log(updatedNotStartedFixtures)


	//// Update fixture list

	const fixturesWithoutNotStarted = data.fixtures.filter(obj => !notStartedIds.includes(obj.fixture.id))

	console.log('fixturesWithoutNotStarted')
	console.log(fixturesWithoutNotStarted)


	const fixtures = [ ...fixturesWithoutNotStarted, ...updatedNotStartedFixtures ]
	data = { ts: Date.now(), fixtures }

	console.log('data')
	console.log(data)

	//// Save fixtures to local storage
	// setLocalData(data)




	// TODO: REFACTOR ABOVE






	// If any in play before current time:

	//// Get in play fixtures

	//// Update fixture list

	//// Save fixtures to local storage




	// Display the fixture list

	// ???
}

document.addEventListener("DOMContentLoaded", app);

