import { API_FOOTBALL_KEY } from './funcs/api.js'
import {
	getLocalData,
	getNewData,
	isDataStale
} from './funcs/data.js'

console.log("%cFooty Fixtures ⚽", "color:blue; font-size:16px")
console.log("//////////////////")

console.log(`API Key: ${API_FOOTBALL_KEY}`)
console.log("//////////////////")


// Get the fixture list
// 1. Get local data from storage
let data = getLocalData()

// 2. Check if local data is stale
const dataIsStale = isDataStale(data)

// 3. If no local data or data is stale, get new data
if (!data || dataIsStale) {
	console.log('Data is missing or stale!')
	data = getNewData()
}

console.log(data)





// Get full season fixtures

// Save fixtures to local storage



// Check todays fixtures


// If any not started before current time:

//// Get todays fixtures

//// Update fixture list

//// Save fixtures to local storage


// If any in play before current time:

//// Get in play fixtures

//// Update fixture list

//// Save fixtures to local storage




// Display the fixture list

// ???