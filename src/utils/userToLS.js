export const userToLS = (user, token) => {
	return JSON.stringify({
		user,
		login: true,
		token,
	})
}
