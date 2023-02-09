import FootyFixtures from "../class/FootyFixtures.js";

// Get the singleton which stores the state
const footyFixtures = FootyFixtures.instance

export const setDisplay = () => {
	// Add event listeners
	document.getElementById("minus6").addEventListener("click", () => displayFixtures(-6))
	document.getElementById("minus5").addEventListener("click", () => displayFixtures(-5))
	document.getElementById("minus4").addEventListener("click", () => displayFixtures(-4))
	document.getElementById("minus3").addEventListener("click", () => displayFixtures(-3))
	document.getElementById("minus2").addEventListener("click", () => displayFixtures(-2))
	document.getElementById("minus1").addEventListener("click", () => displayFixtures(-1))
	document.getElementById("plus0").addEventListener("click", () => displayFixtures(0))
	document.getElementById("plus1").addEventListener("click", () => displayFixtures(1))
	document.getElementById("plus2").addEventListener("click", () => displayFixtures(2))
	document.getElementById("plus3").addEventListener("click", () => displayFixtures(3))
	document.getElementById("plus4").addEventListener("click", () => displayFixtures(4))
	document.getElementById("plus5").addEventListener("click", () => displayFixtures(5))
	document.getElementById("plus6").addEventListener("click", () => displayFixtures(6))
	// Add ability to drag date buttons horizontally
	addNavButtonsClickToDrag()
}

const addNavButtonsClickToDrag = () => {
	// Inspired by Ionut Daniel on CodePen https://codepen.io/thenutz
	const dateButtons = document.getElementById("date-buttons")
	let isDown = false
	let startX = null
	let scrollLeft = null
	dateButtons.addEventListener("mousedown", (e) => {
		isDown = true
		startX = e.pageX - dateButtons.offsetLeft
		scrollLeft = dateButtons.scrollLeft
	})
	dateButtons.addEventListener("mouseleave", () => {
		isDown = false
	})
	dateButtons.addEventListener("mouseup", () => {
		isDown = false
	})
	dateButtons.addEventListener("mousemove", (e) => {
		if(!isDown) return
		e.preventDefault()
		dateButtons.scrollLeft = startX + scrollLeft + dateButtons.offsetLeft - e.pageX
	})
}

export const displayFixtures = (offset = 0) => {
	// Update state for given date offset
	footyFixtures.update(offset)
	updateDisplay()
}

const updateDisplay = (e) => {
	console.log('Updating display')
	updateDateButtons()
	updateFixtureList()
}

const updateDateButtons = () => {
	// Update buttons text to new dates
	document.getElementById("minus6").textContent = setDateText(-6)
	document.getElementById("minus5").textContent = setDateText(-5)
	document.getElementById("minus4").textContent = setDateText(-4)
	document.getElementById("minus3").textContent = setDateText(-3)
	document.getElementById("minus2").textContent = setDateText(-2)
	document.getElementById("minus1").textContent = setDateText(-1)
	document.getElementById("plus0").textContent = setDateText(0)
	document.getElementById("plus1").textContent = setDateText(1)
	document.getElementById("plus2").textContent = setDateText(2)
	document.getElementById("plus3").textContent = setDateText(3)
	document.getElementById("plus4").textContent = setDateText(4)
	document.getElementById("plus5").textContent = setDateText(5)
	document.getElementById("plus6").textContent = setDateText(6)
	// Center buttons on selected date
	centerDateButtons()
}

const setDateText = (offset) => {
	// Get currently selected date from state
	const date = footyFixtures.date
	// Create new date by offsetting selected date
	const offsetDate = new Date(date + (offset * 24 * 60 * 60 * 1000))
	// If the offset date is yesterday, today, or tomorrow, return that specific text
	switch (offsetDate.setUTCHours(0, 0, 0, 0)) {
		case new Date().setUTCHours(0, 0, 0, 0):
			return 'Today'
			break
		case new Date().setUTCHours(0, 0, 0, 0) - (24 * 60 * 60 * 1000):
			return 'Yesterday'
			break
		case new Date().setUTCHours(0, 0, 0, 0) + (24 * 60 * 60 * 1000):
			return 'Tomorrow'
			break
		default:
			break
	}
	// Otherwise return the formatted date string
	return offsetDate.toLocaleDateString("en-US", { weekday: 'short', month: 'short', day: 'numeric' })
}

const centerDateButtons = () => {
	const dateButtons = document.getElementById("date-buttons")
	const centerButton = document.getElementById("plus0")
	const windowWidth = window.innerWidth
	// Set date buttons scroll to center selected date
	dateButtons.scrollLeft = centerButton.offsetLeft + (centerButton.offsetWidth / 2) - (windowWidth / 2)
}

const updateFixtureList = () => {
	// Get the fixtures container on the page
	const fixturesList = document.getElementById("fixtures")
	// Reset the content
	fixturesList.innerHTML = ''
	// Get current fixtures from state
	const fixtures = footyFixtures.fixtures	
	if (!fixtures?.length) {
		fixturesList.innerHTML = `<div class="no-fixtures">No fixtures today</div>`
	} else {
		const fragment = document.createDocumentFragment()
		fixtures.sort((a, b) => a.fixture.timestamp - b.fixture.timestamp)
		// Create a new element for each fixture and append to the fixtures container
		fixtures.forEach(fixture => {
			const div = document.createElement("div")
			div.className = "fixture"
			div.innerHTML = setFixtureText(fixture)
			fragment.append(div)
		})
		fixturesList.append(fragment)
	}
}

const setFixtureText = (fixture) => {
	// Set the display text for the given fixture
	let status = ''
	// If the fixture status is not started or postponed, display the date or PP, otherwise display the score
	switch (fixture.fixture.status.short) {
		case 'NS':
			status = new Date(fixture.fixture.timestamp * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
			break
		case 'PST':
			status = 'PP'
			break
		default:
			status = `${fixture.goals.home} - ${fixture.goals.away}`
	}
	return `<div class="home">${shortenTeamName(fixture.teams.home.name)}</div> 
			<img class="logo" src="${fixture.teams.home.logo}" /> 
			<div class="status">${status}</div> 
			<img class="logo" src="${fixture.teams.away.logo}" /> 
			<div class="away">${shortenTeamName(fixture.teams.away.name)}</div>`
}

const shortenTeamName = (name) => {
	switch (name) {
		case 'Manchester United':
			return 'Man United'
			break
		case 'Manchester City':
			return 'Man City'
			break
		case 'Nottingham Forest':
			return 'Nottm Forest'
			break
		default:
			return name
	}
}