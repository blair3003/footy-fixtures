import { API_FOOTBALL_KEY } from './apiKey.js'
import { FIXTURES } from './fixtures.js'

const getFixtures = () => {
	return FIXTURES
}

export const getLocalData = () => {
	console.log('Getting local data')
	return JSON.parse(localStorage.getItem('footy-fixtures'))
}

export const setLocalData = (data) => {
	console.log('Setting local data')
	localStorage.setItem('footy-fixtures', JSON.stringify(data))
}

export const isDataStale = (data) => {
	console.log('Checking data is from today')
	const today = new Date().setHours(0, 0, 0, 0)
	const dataDate = new Date(data?.ts).setHours(0, 0, 0, 0)
	return dataDate !== today
}

export const getNewData = () => {
	console.log('Getting new data')
	const fixtures = getFixtures()
	const data = { ts: Date.now(), fixtures }
	setLocalData(data)
	return data
}