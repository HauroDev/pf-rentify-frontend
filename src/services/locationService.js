import axios from 'axios'
import { COUNTRIES_API } from '../utils/apiRoutes'

const API = (id) => `http://api.geonames.org/childrenJSON?geonameId=${id}&username=gabriel`

export const getAllCountries = async () => {
	const { data } = await axios.get(COUNTRIES_API)
	return data
}

export const getCountryStates = async (idApi) => {
	const { data } = await axios.get(API(idApi))
	return data.geonames
}
