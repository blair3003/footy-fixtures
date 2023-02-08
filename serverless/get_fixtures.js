import fetch from 'node-fetch'

const { API_FOOTBALL_KEY } = process.env

exports.handler = async (event, context) => {
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
		return {
			statusCode: 200,
			body: JSON.stringify(fixturesJson.response)
		}
	} catch (err) {
		return {
			statusCode: 422,
			body: err.stack
		}
	}
}