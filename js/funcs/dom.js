import FootyFixtures from "../class/FootyFixtures.js";

const footyFixtures = FootyFixtures.instance

const dateButtons = {
	minus3: document.getElementById("minus3"),
	minus2: document.getElementById("minus2"),
	minus1: document.getElementById("minus1"),
	plus0: document.getElementById("plus0"),
	plus1: document.getElementById("plus1"),
	plus2: document.getElementById("plus2"),
	plus3: document.getElementById("plus3"),
	plus4: document.getElementById("plus4"),
	plus5: document.getElementById("plus5"),
	plus6: document.getElementById("plus6")
}

export const setDisplay = () => {
	// Add event listeners
	dateButtons.minus3.addEventListener("click", () => displayFixtures(-3))
	dateButtons.minus2.addEventListener("click", () => displayFixtures(-2))
	dateButtons.minus1.addEventListener("click", () => displayFixtures(-1))
	dateButtons.plus0.addEventListener("click", () => displayFixtures(0))
	dateButtons.plus1.addEventListener("click", () => displayFixtures(1))
	dateButtons.plus2.addEventListener("click", () => displayFixtures(2))
	dateButtons.plus3.addEventListener("click", () => displayFixtures(3))
	dateButtons.plus4.addEventListener("click", () => displayFixtures(4))
	dateButtons.plus5.addEventListener("click", () => displayFixtures(5))
	dateButtons.plus6.addEventListener("click", () => displayFixtures(6))

	setNavButtonsClickToDrag()
}

export const displayFixtures = (offset = 0) => {
	footyFixtures.update(offset)
	updateDisplay()
}

const updateDisplay = (e) => {
	console.log('Updating display')
	console.log(new Date(footyFixtures.date))
	console.log(`${footyFixtures.fixtures.length} game(s) on this day`)
	console.log(footyFixtures.fixtures)
	updateDateButtons()
	centerDateButtons()
	updateFixtureList()
}

const updateDateButtons = () => {
	dateButtons.minus3.textContent = setDateText(-3)
	dateButtons.minus2.textContent = setDateText(-2)
	dateButtons.minus1.textContent = setDateText(-1)
	dateButtons.plus0.textContent = setDateText(0)
	dateButtons.plus1.textContent = setDateText(1)
	dateButtons.plus2.textContent = setDateText(2)
	dateButtons.plus3.textContent = setDateText(3)
	dateButtons.plus4.textContent = setDateText(4)
	dateButtons.plus5.textContent = setDateText(5)
	dateButtons.plus6.textContent = setDateText(6)
}

const setDateText = (offset) => {
	const date = footyFixtures.date
	const offsetDate = new Date(date + (offset * 24 * 60 * 60 * 1000))
	// If the date happens to be yesterday, today, or tomorrow, return that specific text
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

const updateFixtureList = () => {
	const fixturesList = document.getElementById("fixtures")
	fixturesList.innerHTML = ''
	const fixtures = footyFixtures.fixtures	
	if (!fixtures.length) {
		fixturesList.innerHTML = `<div class="no-fixtures">No fixtures today</div>`
	} else {
		const fragment = document.createDocumentFragment()
		fixtures.sort((a, b) => a.fixture.timestamp - b.fixture.timestamp)
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
	let timeOrScore = ''
	if (fixture.fixture.status.short === 'NS') {
		const date = new Date(fixture.fixture.timestamp * 1000)
		const time = date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
		timeOrScore = `<div class="time">${time}</div>`
	} else {
		const score = `${fixture.goals.home} - ${fixture.goals.away}`
		timeOrScore = `<div class="score">${score}</div>`
	}
	return `<div class="home">${fixture.teams.home.name}</div> 
			<img class="logo" src="${fixture.teams.home.logo}" /> 
			${timeOrScore} 
			<img class="logo" src="${fixture.teams.away.logo}" /> 
			<div class="away">${fixture.teams.away.name}</div>`
}

const setNavButtonsClickToDrag = () => {
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

const centerDateButtons = () => {
	console.log("centering date buttons")
	const dateButtons = document.getElementById("date-buttons")
	const centerButton = document.getElementById("plus0")
	const windowWidth = window.innerWidth
	// TODO
	dateButtons.scrollLeft = 100
}