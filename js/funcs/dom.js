import FootyFixtures from "../class/FootyFixtures.js";

const footyFixtures = FootyFixtures.instance

export const setDisplay = () => {
	const minus1 = document.getElementById("minus1")
	minus1.addEventListener("click", () => displayFixtures(-1))
	const plus1 = document.getElementById("plus1")
	plus1.addEventListener("click", () => displayFixtures(1))
	const plus2 = document.getElementById("plus2")
	plus2.addEventListener("click", () => displayFixtures(2))
}

export const displayFixtures = (offset = 0) => {
	footyFixtures.update(offset)
	updateDisplay()
}

const updateDisplay = () => {
	console.log('Updating display')
	console.log(new Date(footyFixtures.date))
	console.log(`${footyFixtures.fixtures.length} game(s) on this day`)
	console.log(footyFixtures.fixtures)
}