import { API_FOOTBALL_KEY } from './funcs/api.js'
import {
	loadFixtures
} from './funcs/data.js'

console.log("%cFooty Fixtures ⚽", "color:blue; font-size:16px")
console.log("//////////////////")

console.log(`API Key: ${API_FOOTBALL_KEY}`)
console.log("//////////////////")



const app = () => {

	const plus1 = document.getElementById("plus1")
	plus1.addEventListener("click", () => loadFixtures(1))

	loadFixtures(0)
}

document.addEventListener("DOMContentLoaded", app);

