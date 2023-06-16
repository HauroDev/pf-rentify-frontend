// servicios user
import axios from 'axios'
import { PRODUCTS_API } from '../utils/apiRoutes'

export const getProductByName = async (name) => {
	const { data } = await axios.post(`${PRODUCTS_API}`)
	return data
}
