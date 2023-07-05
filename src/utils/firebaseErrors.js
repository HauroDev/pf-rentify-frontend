export const firebaseErrors = (error) => {
	const errorsList = {
		'auth/user-not-found': 'Email or password not valid',
		'auth/wrong-password': 'Email or password not valid',
		'auth/too-many-requests': 'Too many requests. Please, try later',
	}

	return errorsList[error] || 'Error in database'
}
