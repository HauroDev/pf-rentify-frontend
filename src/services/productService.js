import axios from 'axios'
import { PRODUCTS_API } from '../utils/apiRoutes'

export const getAllProducts = async (url) => {
	const { data } = await axios.get(url)
	return data
}

export const getProductById = async (id) => {
	const { data } = await axios.get(`${PRODUCTS_API}/${id}`)
	console.log(data)
	return data
}

//create product
export const createProduct = async (productDetail) => {
	const { data } = await axios.post(PRODUCTS_API, productDetail)
	return data
}