import axios from 'axios'
import { COUNTRIES_API } from '../utils/apiRoutes'

const API = (id) => `https://api-rentify.onrender.com/api-rentify/countries/childrens/${id}`

export const getAllCountries = async () => {
	const { data } = await axios.get(COUNTRIES_API)
	return data
}

export const getCountryStates = async (idApi) => {
	const { data } = await axios.get(API(idApi))
	return data.geonames
}
