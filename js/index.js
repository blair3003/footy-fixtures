import { API_FOOTBALL_KEY } from './funcs/api.js'
import {
	loadFixtures
} from './funcs/data.js'
import {
	setDisplay
} from './funcs/dom.js'

console.log("%cFooty Fixtures ⚽", "color:blue; font-size:16px")
console.log("//////////////////")

console.log(`API Key: ${API_FOOTBALL_KEY}`)
console.log("//////////////////")



const app = () => {

	setDisplay()

	loadFixtures()
}

document.addEventListener("DOMContentLoaded", app);

