export const API_FOOTBALL_KEY = "7cbad17648c89efc6f13563908adbac8"

export const fetchFixtures = async () => {
	console.log('Fetching data')
	const url = "https://v3.football.api-sports.io/fixtures?league=39&season=2022"
	const options = {
		headers: {
			'x-rapidapi-host': 'v3.football.api-sports.io',
			'x-rapidapi-key': API_FOOTBALL_KEY
		}
	}
	try {
		const fixturesStream = await fetch(url, options)
		const fixturesJson = await fixturesStream.json()
		return fixturesJson.response
	} catch (err) {
		console.error(err)
	}
}