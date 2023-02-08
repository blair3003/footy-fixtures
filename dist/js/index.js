import { API_FOOTBALL_KEY } from './funcs/api.js'
import {
	loadFixtures
} from './funcs/data.js'
import {
	setDisplay,
	displayFixtures
} from './funcs/dom.js'

console.log("%cFooty Fixtures ⚽", "color:blue; font-size:16px")
console.log("//////////////////")

const app = () => {

	setDisplay()

	try {
		loadFixtures()
	} catch (err) {
		console.err(err)
	} finally {
		displayFixtures()
	}

}

document.addEventListener("DOMContentLoaded", app)

