export default class FootyFixtures {

	constructor() {
		this._date = new Date()
		this._fixtures = null
	}

	get date() { return this._date }
	set date(date) { this._date = date }

	get fixtures() { return this._fixtures }
	set fixtures(fixtures) { this._fixtures = fixtures }
}