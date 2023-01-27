import { API_FOOTBALL_KEY } from './data/apiKey.js'

console.log("%cFooty Fixtures ⚽", "color:blue; font-size:16px")
console.log("//////////////////")

console.log(`API Key: ${API_FOOTBALL_KEY}`)


// Get the fixture list
// 1. Check local storage for data

// stored object structure => { date: timestamp, fixtures }

let data = JSON.parse(localStorage.getItem('footy-fixtures'))

if (!data) {

	// Get full season fixtures

	const fixtures = {
		fix1: "Gunners vs Spurs",
		fix2: "United vs City"
	}


	// Save fixtures to local storage

	data = { ts: Date.now(), fixtures }

	localStorage.setItem('footy-fixtures', JSON.stringify(data))

	console.log('Got new data')

} else { console.log('Got data from storage') }

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