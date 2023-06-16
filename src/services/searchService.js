import axios from 'axios'
import { PRODUCTS_API } from '../utils/apiRoutes'

export const getProductByName = async (name) => {
	const { data } = await axios.get(`${PRODUCTS_API}/?name=${name}`)
	return data
}
export const getMoreProductByName = async (url) => {
	const { data } = await axios.get(url)
	return data
}
