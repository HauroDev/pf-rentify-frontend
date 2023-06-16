// servicios user
import axios from 'axios'
import { USER_API } from '../utils/apiRoutes'

export const postUsers = async () => {
	const { data } = await axios.post(`${USER_API}`)
	return data
}
