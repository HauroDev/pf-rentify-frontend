import axios from 'axios'
import { COMMENT_API } from '../utils/apiRoutes'
import { getTokenConfig } from './tokenConfig'

export const postComment = async (comment) => {
	const config = getTokenConfig()
	const { data } = await axios.post(`${COMMENT_API}`, comment, config)
	return data
}

export const getComment = async (idProd) => {
	const { data } = await axios.get(`${COMMENT_API}/${idProd}`)
	return data
}
