import axios from 'axios'
import { CATEGORIES_API } from '../utils/apiRoutes'

export const getAllCategories = async () => {
	const { data } = await axios.get(CATEGORIES_API)
	return data
}
