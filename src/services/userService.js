// servicios user
import axios from 'axios'
import { USER_API } from '../utils/apiRoutes'

export const postUsers = async (user) => {
	const { data } = await axios.post(`${USER_API}`, user)
	return data
}
