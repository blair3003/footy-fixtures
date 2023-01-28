import TEST_DATA from '../data/test.js'
import { fetchFixtures } from './api.js'

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

export const getNewData = async () => {
	console.log('Getting new data')
	// const fixtures = await fetchFixtures()
	const fixtures = TEST_DATA
	const data = { ts: Date.now(), fixtures }
	setLocalData(data)
	return data
}

