import axios from 'axios'
import { COMMENT_API } from '../utils/apiRoutes'
import { getTokenConfig } from './tokenConfig'
import { comment } from 'postcss'


export const postComment = async (comment) => {
	const config = getTokenConfig()
	const { data } = await axios.post(`${COMMENT_API}`, comment, config)
	return data
}

export const getComment = async (idProd) => {
	const { data } = await axios.get(`${COMMENT_API}/${idProd}`)
	return data
}

export const putComment=async(comment)=>{
	const config = getTokenConfig()
	const { data } = await axios.put(`${COMMENT_API}/edit`, comment, config)
	return data
}

export const deletComment= async (comment)=>{
	const config = getTokenConfig()
	const { data } = await axios.patch(`${COMMENT_API}/visual`, comment, config)
	return data
}