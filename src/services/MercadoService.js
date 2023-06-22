import axios from 'axios'
import { USER_API } from '../utils/apiRoutes'

export const postOrdenPago = async (carrito) => {
	const { data } = await axios.post(`${USER_API}/order`, carrito)
	return data
}