import axios from 'axios'
import { MCP_API } from '../utils/apiRoutes'
import { getTokenConfig } from './tokenConfig'

export const membershipService = async (infoMembership) => {
	const config = getTokenConfig()
	const { data } = await axios.post(`${MCP_API}/suscription`, infoMembership, config)
	return data
}
