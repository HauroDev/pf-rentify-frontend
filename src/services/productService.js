import axios from 'axios'
import { PRODUCTS_API } from '../utils/apiRoutes'
import { getTokenConfig } from './tokenConfig'

export const getAllProducts = async (url) => {
	const { data } = await axios.get(url)
	return data
}

export const getProductById = async (id) => {
	const { data } = await axios.get(`${PRODUCTS_API}/${id}`)
	return data
}

//create product
export const createProduct = async (productDetail) => {
	const config = getTokenConfig()
	const { data } = await axios.post(PRODUCTS_API, productDetail, config)
	console.log(data)
	return data
}
