import axios from 'axios'
import { PRODUCTS_API, USER_API } from '../utils/apiRoutes'
import { getTokenConfig } from './tokenConfig'

export const getUserProducts = async (id) => {
	const config = getTokenConfig()
	console.log(id)
	const { data } = await axios.get(`${PRODUCTS_API}/user/${id}`, config)

	return data
}

export const updateUserName = async (id, name) => {
	console.log(id)
	const config = getTokenConfig()
	const { data } = await axios.put(
		`${USER_API}/update-name`,
		{
			idUser: id, // Reemplaza "yourUserId" con el ID de usuario correcto
			name: name,
		},
		config
	)

	return data
}
export const updateUserPhone = async (id, phone) => {
	console.log(id)
	const config = getTokenConfig()

	const { data } = await axios.put(
		`${USER_API}/update-phone`,
		{
			idUser: id, // Reemplaza "yourUserId" con el ID de usuario correcto
			phone: phone,
		},
		config
	)

	return data
}

export const updateProductstatusPub = async (id, statusPub) => {
	console.log(id)
	const config = getTokenConfig()

	const { data } = await axios.put(
		`${PRODUCTS_API}/update-status`,
		{
			idProd: id, // Reemplaza "yourUserId" con el ID de usuario correcto
			statusPub: statusPub,
		},
		config
	)
	console.log(data)
	return data
}
