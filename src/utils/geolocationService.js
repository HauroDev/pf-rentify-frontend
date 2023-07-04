import axios from 'axios'
import { GEOLOCATION_API, IP_API } from './apiRoutes'

export const getGeolocation = async () => {
	try {
		const resip = await axios.get(IP_API)

		const { data } = await axios.get(`${GEOLOCATION_API}/${resip.data}`)
		// const { data } = await axios.get(`${GEOLOCATION_API}/92.184.105.98`)

		localStorage.setItem('geolocation', JSON.stringify(data))
	} catch (error) {
		localStorage.setItem('geolocation', JSON.stringify({}))
	}
}
