import { localStorageItems } from '../utils/localStorageItems'

export const getTokenConfig = () => {
	const userAuth = localStorage.getItem(localStorageItems.userAuth)
		? JSON.parse(localStorage.getItem(localStorageItems.userAuth))
		: {}

	const token = userAuth.token || ''

	const config = {
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`,
		},
	}

	return config
}
