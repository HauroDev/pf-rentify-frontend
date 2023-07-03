import axios from 'axios'
import { MCP_API } from '../utils/apiRoutes'
import { getTokenConfig } from './tokenConfig'

export const postOrdenPago = async (carrito) => {
	const config = getTokenConfig()
	const { data } = await axios.post(`${MCP_API}/order`, carrito, config)
	return data
}
