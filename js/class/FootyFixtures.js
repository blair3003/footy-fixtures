export default class FootyFixtures {

	static instance = new FootyFixtures()

	constructor() {
		this._date = new Date().setUTCHours(0, 0, 0, 0)
		this._fixtures = null
	}

	get date() { return this._date }
	set date(date) { this._date = date }

	get fixtures() { return this._fixtures }
	set fixtures(fixtures) { this._fixtures = fixtures }

	update(offset = 0) {
		console.log('Updating FootyFixtures')
		const date = this._date + (offset * 24 * 60 * 60 * 1000)
		this._date = date
		const fixtures = JSON.parse(localStorage.getItem('footy-fixtures'))?.fixtures
		this._fixtures = fixtures?.filter(obj => date === new Date(obj.fixture.timestamp * 1000).setUTCHours(0, 0, 0, 0))
	}
}