import axios from 'axios'
import { MCP_API } from '../utils/apiRoutes'
import { getTokenConfig } from './tokenConfig'

export const membershipService = async (infoMembership) => {
	const config = getTokenConfig()
	const { data } = await axios.post(`${MCP_API}/suscription`, infoMembership, config)
	return data
}

export const cancelMembershipService = async (idUser) => {
	const config = getTokenConfig()
	const { data } = await axios.get(`${MCP_API}/cancel-suscription/${idUser}`,config)
	return data
}
