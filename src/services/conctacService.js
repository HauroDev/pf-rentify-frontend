import axios from 'axios'
import { FORM_CONTACT_API } from '../utils/apiRoutes'

export const contactOwnerService = async ({
	userEmail,
	userName,
	userPhone,
	ownerEmail,
	product,
}) => {
	console.log({
		userEmail: userEmail,
		userName: userName || null,
		userPhone: userPhone || null,
		ownerEmail: ownerEmail,
		product: product,
		page: window.location.href,
	})

	// await axios.post(`${FORM_CONTACT_API}/`, {
	// 	emailUser: userEmail,
	// 	name: userName,
	// 	phone: userPhone,
	// 	owner: ownerEmail,
	// 	product,
	// })

	return true
}

export const contactContacUsService = async ({ name, email, message }) => {
	console.log({
		name,
		email,
		message,
	})

	// await axios.post(`${FORM_CONTACT_API}/`, {
	// 	name,
	// 	email,
	// 	message,
	// })

	return true
}
