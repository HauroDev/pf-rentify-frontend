import axios from 'axios'
import { MCP_API } from '../utils/apiRoutes'

export const postOrdenPago = async (carrito) => {
	const { data } = await axios.post(`${MCP_API}/order`, carrito)
	return data
}

